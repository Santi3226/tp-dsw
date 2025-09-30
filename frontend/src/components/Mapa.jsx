import React, { useEffect, useState, useRef } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../pages/Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tab.css';
import axiosInstance from '../helpers/api.js';
import { useCentros } from '../hooks/useCentros.js';

// Configurar iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente para centrar el mapa cuando se selecciona un centro
const MapController = ({ selectedCentro }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedCentro && selectedCentro.lat && selectedCentro.lng) {
      map.setView([selectedCentro.lat, selectedCentro.lng], 15);
    }
  }, [selectedCentro, map]);
  
  return null;
};

// Servicio de geocodificación optimizado con cache
const geocodeAddress = async (direccion, localidad) => {
  try {
    // Crear una clave única para el cache
    const cacheKey = `${direccion}_${localidad}`;
    
    // Verificar si ya tenemos las coordenadas en cache (localStorage o memoria)
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      console.log(`Coordenadas obtenidas del cache para: ${cacheKey}`);
      return JSON.parse(cached);
    }

    console.log(`Geocodificando: ${direccion}, ${localidad}`);
    
    const query = encodeURIComponent(`${direccion} ${localidad} Argentina`);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`;

    const response = await fetch(url);
    const data = await response.json();

    if (data && data.length > 0 && data[0].lat && data[0].lon) {
      const coordinates = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
      
      // Guardar en cache para futuras consultas
      sessionStorage.setItem(cacheKey, JSON.stringify(coordinates));
      
      return coordinates;
    } else {
      // Fallback con coordenadas de la región con offset aleatorio
      const fallbackCoords = {
        lat: -32.9468 + (Math.random() - 0.5) * 0.05,
        lng: -60.6393 + (Math.random() - 0.5) * 0.05,
      };
      
      console.warn(`No se encontraron coordenadas para: ${direccion}, ${localidad}. Usando fallback.`);
      
      // También guardamos el fallback en cache para evitar repetir requests
      sessionStorage.setItem(cacheKey, JSON.stringify(fallbackCoords));
      
      return fallbackCoords;
    }
  } catch (error) {
    console.error('Error al obtener las coordenadas:', error);
    
    // En caso de error, devolver coordenadas de fallback
    return {
      lat: -32.9468 + (Math.random() - 0.5) * 0.05,
      lng: -60.6393 + (Math.random() - 0.5) * 0.05,
    };
  }
};

// Componente del Minimapa optimizado
const MinimapaCentros = () => {
  const { isLoading, isError, error, centros = [] } = useCentros();  
  const [centrosConCoordenadas, setCentrosConCoordenadas] = useState(new Map());
  const [selectedCentro, setSelectedCentro] = useState(null);
  const [geocodingInProgress, setGeocodingInProgress] = useState(new Set());

  // Función para geocodificar un centro específico on-demand
  const geocodeCentroIfNeeded = async (centro) => {
    const centroId = centro.id;
    
    // Si ya tenemos las coordenadas, no hacer nada
    if (centrosConCoordenadas.has(centroId)) {
      return centrosConCoordenadas.get(centroId);
    }
    
    // Si ya está en progreso, esperar
    if (geocodingInProgress.has(centroId)) {
      return null;
    }

    // Marcar como en progreso
    setGeocodingInProgress(prev => new Set(prev).add(centroId));

    try {
      const coords = await geocodeAddress(centro.direccion, centro.localidad.denominacion);
      const centroConCoordenadas = {
        ...centro,
        lat: coords.lat,
        lng: coords.lng
      };

      // Actualizar el estado con las nuevas coordenadas
      setCentrosConCoordenadas(prev => new Map(prev).set(centroId, centroConCoordenadas));
      
      return centroConCoordenadas;
    } catch (error) {
      console.error(`Error geocodificando centro ${centroId}:`, error);
      return null;
    } finally {
      // Remover de la lista de en progreso
      setGeocodingInProgress(prev => {
        const newSet = new Set(prev);
        newSet.delete(centroId);
        return newSet;
      });
    }
  };

  // Manejar click en centro (geocodificar si es necesario)
  const handleCentroClick = async (centro) => {
    setSelectedCentro(centro);
    
    // Geocodificar el centro si no tiene coordenadas
    if (!centrosConCoordenadas.has(centro.id)) {
      const centroConCoordenadas = await geocodeCentroIfNeeded(centro);
      if (centroConCoordenadas) {
        setSelectedCentro(centroConCoordenadas);
      }
    } else {
      setSelectedCentro(centrosConCoordenadas.get(centro.id));
    }
  };

  // Geocodificar centros visibles en el mapa de forma lazy
  const geocodeVisibleCentros = async () => {
    // Solo geocodificar los primeros 3-5 centros para mostrar en el mapa inicialmente
    const centrosAGeocodificar = centros.slice(0, 5);
    
    const promises = centrosAGeocodificar.map(async (centro) => {
      if (!centrosConCoordenadas.has(centro.id) && !geocodingInProgress.has(centro.id)) {
        return await geocodeCentroIfNeeded(centro);
      }
      return null;
    });

    await Promise.all(promises);
  };

  // Efecto para geocodificar algunos centros iniciales (opcional)
  useEffect(() => {
    if (centros.length > 0) {
      // Geocodificar solo algunos centros iniciales para mostrar en el mapa
      geocodeVisibleCentros();
    }
  }, [centros]);

  if (isLoading) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.message}>Cargando centros...</p>
        <div style={pageStyles.spinner}></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.errorMessage}>
          Ha ocurrido un error y no se pudieron obtener los centros: {error?.message}
        </p>
      </div>
    );
  }

  // Obtener solo los centros que ya tienen coordenadas para mostrar en el mapa
  const centrosParaMapa = Array.from(centrosConCoordenadas.values());

  return (
    <div>
      <div className="row">
        {/* Lista de centros */}
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                📋 Centros Disponibles
                <span className="badge bg-light text-primary ms-2">{centros.length}</span>
              </h5>
            </div>
            <div className="card-body p-0" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {centros.map((centro) => {
                const isGeocoding = geocodingInProgress.has(centro.id);
                const hasCoordinates = centrosConCoordenadas.has(centro.id);
                
                return (
                  <div
                    key={centro.id}
                    className={`list-group-item list-group-item-action ${
                      selectedCentro?.id === centro.id ? 'active' : ''
                    }`}
                    onClick={() => handleCentroClick(centro)}
                    style={{ cursor: 'pointer', position: 'relative' }}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div style={{ flex: 1 }}>
                        <h6 className="mb-1">🏥 {centro.nombre}</h6>
                        <p className="mb-1 small">📍 {centro.direccion}</p>
                        <small className="text-muted">
                          🏙️ {centro.localidad.denominacion}
                        </small>
                      </div>
                      
                      {/* Indicador de estado de geocodificación */}
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {isGeocoding && (
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Cargando ubicación...</span>
                          </div>
                        )}
                        {hasCoordinates && !isGeocoding && (
                          <span style={{ color: '#28a745' }}>📍</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body p-0">
              <MapContainer
                center={[-32.9468, -60.6393]} // Rosario, Santa Fe
                zoom={centrosParaMapa.length > 0 ? 12 : 10}
                style={{ height: '400px', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Solo mostrar marcadores de centros que ya tienen coordenadas */}
                {centrosParaMapa.map((centro) => (
                  <Marker
                    key={centro.id}
                    position={[centro.lat, centro.lng]}
                    eventHandlers={{
                      click: () => setSelectedCentro(centro)
                    }}
                  >
                    <Popup>
                      <div style={{ minWidth: '200px' }}>
                        <h6 style={{ color: '#007bff', marginBottom: '8px' }}>
                          {centro.nombre}
                        </h6>
                        <p style={{ margin: '4px 0', fontSize: '14px' }}>
                          <strong>📍 Dirección:</strong><br />
                          {centro.direccion}
                        </p>
                        <p style={{ margin: '4px 0', fontSize: '14px' }}>
                          <strong>🏙️ Localidad:</strong><br />
                          {centro.localidad.denominacion}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                
                <MapController selectedCentro={selectedCentro} />
              </MapContainer>
            </div>
          </div>
          
          {/* Estado del mapa */}
          {centrosParaMapa.length === 0 && (
            <div className="card-footer text-muted text-center">
              <small>
                🗺️ Haz clic en un centro de la lista para ver su ubicación en el mapa
              </small>
            </div>
          )}
        </div>
      </div>

      {/* Información del centro seleccionado */}
      {selectedCentro && (
        <div className="row mt-4">
          <div className="col">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">📍 Centro Seleccionado</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>{selectedCentro.nombre}</h6>
                    <p><strong>Dirección:</strong> {selectedCentro.direccion}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Localidad:</strong> {selectedCentro.localidad.denominacion}</p>
                    {selectedCentro.lat && selectedCentro.lng && (
                      <p><strong>Coordenadas:</strong> {selectedCentro.lat.toFixed(4)}, {selectedCentro.lng.toFixed(4)}</p>
                    )}
                  </div>
                </div>
                
                {/* Botones de acción solo si tenemos coordenadas */}
                {selectedCentro.lat && selectedCentro.lng && (
                  <div className="row mt-2">
                    <div className="col">
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${selectedCentro.lat},${selectedCentro.lng}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-sm me-2"
                      >
                        🗺️ Cómo llegar
                      </a>
                      <button 
                        className="btn btn-outline-info btn-sm"
                        onClick={() => geocodeCentroIfNeeded(selectedCentro)}
                        disabled={geocodingInProgress.has(selectedCentro.id)}
                      >
                        {geocodingInProgress.has(selectedCentro.id) ? '⏳ Localizando...' : '🔄 Actualizar ubicación'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function TabBar(props) {
  const [politicas, setPoliticas] = useState([]);
  
  useEffect(() => {
    const getDatos = async () => {
      try {
        const politicas = await axiosInstance.get('/politica');
        setPoliticas(politicas.data.data);
        console.log(politicas.data.data);
      } catch (error) {
        console.error("Error al obtener las políticas:", error);
      }
    };
    getDatos();
  }, []);

  const { inicio } = props;
  
  return (
    <Tabs
      defaultActiveKey={inicio}
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="centrosdeatencion" title="Centros de Atención">
        <h2 className='titulo'>Nuestras Instalaciones</h2>
        
          <div style={{ display: "block", marginBottom: "2rem" }}>
          <div className='divFoto'>
            <img className='foto' src="/frente-1.jpg" alt="centro1" />
          </div>
          <div className='columna'>
            Descubre nuestros modernos centros médicos equipados con la última tecnología 
            para brindarte la mejor atención médica en toda la región.
          </div>
        </div>

          <div className="mt-4">
          <h3 className="mb-3">🗺️ Encuentra Nuestros Centros</h3>
          <p className="text-muted mb-4">
            Explora la ubicación de nuestros centros médicos. Haz clic en los centros 
            de la lista para ver su ubicación exacta en el mapa.
          </p>
          <MinimapaCentros />
        </div>
      </Tab>
      
      <Tab eventKey="presupuesto" title="Presupuestos">
        <h2 className='titulo'>Presupuestos</h2>
        <p>A implementar...</p>
      </Tab>
      
      <Tab eventKey="politicas" title="Políticas">
        <h2 className='titulo'>Políticas de la Empresa</h2>
        {politicas && (
          <div style={{ marginTop: '20px' }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Días de Habilitación de Turnos</th>
                  <th>Hora de Inicio para Turnos</th>
                  <th>Hora de Fin para Turnos</th>
                </tr>
              </thead>
              <tbody>
                {politicas.map((politica) => (
                  <tr key={politica.id}>
                    <td>{politica.diaHabilitacionTurnos.toString() + " días posteriores"}</td>
                    <td>{politica.horaInicioTurnos}</td>
                    <td>{politica.horaFinTurnos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Tab>
    </Tabs>
  );
}

const pageStyles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
  },
  table: {
    justifyItems:"center"
  },
  containerCentered: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
  },
  header: {
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: "0.5rem",
  },
  grid: {
    marginTop:"50px",
    display: "flex",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    justifyItems: "center",
  },
  message: {
    fontSize: "1.2em",
    color: "#666",
    padding: "50px 0",
  },
  errorMessage: {
    fontSize: "1.2em",
    color: "#e74c3c",
    padding: "50px 0",
  },
  spinner: {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderLeftColor: "#007bff",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
    margin: "30px auto",
  },
  retryButton: {
    backgroundColor: "#ffc107",
    color: "black",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    fontSize: "1em",
    transition: "background-color 0.2s ease-in-out",
  },
};

export default TabBar;