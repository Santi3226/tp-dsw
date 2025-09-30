import React, { useEffect, useState, useRef } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../pages/Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tab.css';
import './Mapa.css';
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
const geocodeAddress = async (domicilio, localidad) => {
  try {
    const cacheKey = `${domicilio}_${localidad}`;
    
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      console.log(`Coordenadas obtenidas del cache para: ${cacheKey}`);
      return JSON.parse(cached);
    }

    console.log(`Geocodificando: ${domicilio}, ${localidad}`);
    
    const query = encodeURIComponent(`${domicilio} ${localidad} Argentina`);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`;

    const response = await fetch(url);
    const data = await response.json();

    if (data && data.length > 0 && data[0].lat && data[0].lon) {
      const coordinates = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
      
      sessionStorage.setItem(cacheKey, JSON.stringify(coordinates));
      return coordinates;
    } else {
      const fallbackCoords = {
        lat: -32.9468 + (Math.random() - 0.5) * 0.05,
        lng: -60.6393 + (Math.random() - 0.5) * 0.05,
      };
      
      console.warn(`No se encontraron coordenadas para: ${domicilio}, ${localidad}. Usando fallback.`);
      sessionStorage.setItem(cacheKey, JSON.stringify(fallbackCoords));
      return fallbackCoords;
    }
  } catch (error) {
    console.error('Error al obtener las coordenadas:', error);
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
    
    if (centrosConCoordenadas.has(centroId)) {
      return centrosConCoordenadas.get(centroId);
    }
    
    if (geocodingInProgress.has(centroId)) {
      return null;
    }

    setGeocodingInProgress(prev => new Set(prev).add(centroId));

    try {
      const coords = await geocodeAddress(centro.domicilio, centro.localidad.denominacion);
      const centroConCoordenadas = {
        ...centro,
        lat: coords.lat,
        lng: coords.lng
      };

      setCentrosConCoordenadas(prev => new Map(prev).set(centroId, centroConCoordenadas));
      return centroConCoordenadas;
    } catch (error) {
      console.error(`Error geocodificando centro ${centroId}:`, error);
      return null;
    } finally {
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
    const centrosAGeocodificar = centros.slice(0, 5);
    
    const promises = centrosAGeocodificar.map(async (centro) => {
      if (!centrosConCoordenadas.has(centro.id) && !geocodingInProgress.has(centro.id)) {
        return await geocodeCentroIfNeeded(centro);
      }
      return null;
    });

    await Promise.all(promises);
  };

  useEffect(() => {
    if (centros.length > 0) {
      geocodeVisibleCentros();
    }
  }, [centros]);

  if (isLoading) {
    return (
      <div className="minimapa-container-centered">
        <p className="minimapa-loading-message">Cargando centros...</p>
        <div className="minimapa-spinner"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="minimapa-container-centered">
        <p className="minimapa-error-message">
          Ha ocurrido un error y no se pudieron obtener los centros: {error?.message}
        </p>
      </div>
    );
  }

  const centrosParaMapa = Array.from(centrosConCoordenadas.values());

  return (
    <div className="minimapa-container">
      <div className="row">
        {/* Lista de centros */}
        <div className="col-lg-4 mb-4">
          <div className="card minimapa-card">
            <div className="card-header bg-primary text-white minimapa-card-header">
              <h5 className="mb-0">
                📋 Centros Disponibles
                <span className="badge bg-light text-primary ms-2 minimapa-badge">
                  {centros.length}
                </span>
              </h5>
            </div>
            <div className="card-body p-0 minimapa-centros-list">
              {centros.map((centro) => {
                const isGeocoding = geocodingInProgress.has(centro.id);
                const hasCoordinates = centrosConCoordenadas.has(centro.id);
                
                return (
                  <div
                    key={centro.id}
                    className={`list-group-item list-group-item-action minimapa-centro-item ${
                      selectedCentro?.id === centro.id ? 'active' : ''
                    }`}
                    onClick={() => handleCentroClick(centro)}
                  >
                    <div className="minimapa-flex-between">
                      <div className="minimapa-centro-content">
                        <h6 className="minimapa-centro-nombre">🏥 {centro.nombre}</h6>
                        <p className="minimapa-centro-direccion">📍 {centro.domicilio}</p>
                        <small className="minimapa-centro-localidad">
                          🏙️ {centro.localidad.denominacion}
                        </small>
                      </div>
                      
                      <div className="minimapa-status-indicator">
                        {isGeocoding && (
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Cargando ubicación...</span>
                          </div>
                        )}
                        {hasCoordinates && !isGeocoding && (
                          <span className="minimapa-status-geocoded">📍</span>
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
          <div className="card minimapa-card">
            <div className="card-body p-0">
              <MapContainer
                center={[-32.9468, -60.6393]}
                zoom={centrosParaMapa.length > 0 ? 12 : 10}
                className="minimapa-map-container"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {centrosParaMapa.map((centro) => (
                  <Marker
                    key={centro.id}
                    position={[centro.lat, centro.lng]}
                    eventHandlers={{
                      click: () => setSelectedCentro(centro)
                    }}
                  >
                    <Popup>
                      <div className="minimapa-popup-content">
                        <h6 className="minimapa-popup-title">
                          {centro.nombre}
                        </h6>
                        <p className="minimapa-popup-info">
                          <strong>📍 Dirección:</strong><br />
                          {centro.domicilio}
                        </p>
                        <p className="minimapa-popup-info">
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
          
          {centrosParaMapa.length === 0 && (
            <div className="card-footer text-muted minimapa-text-center">
              <small>
                🗺️ Haz clic en un centro de la lista para ver su ubicación en el mapa
              </small>
            </div>
          )}
        </div>
      </div>

      {/* Información del centro seleccionado */}
      {selectedCentro && (
        <div className="row mt-4 minimapa-fade-in">
          <div className="col">
            <div className="card minimapa-selected-centro">
              <div className="card-header minimapa-selected-header">
                <h5 className="minimapa-selected-title">📍 Centro Seleccionado</h5>
              </div>
              <div className="card-body minimapa-selected-content">
                <div className="row">
                  <div className="col-md-6">
                    <h6>{selectedCentro.nombre}</h6>
                    <p className="minimapa-centro-info">
                      <strong>Dirección:</strong> {selectedCentro.domicilio}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="minimapa-centro-info">
                      <strong>Localidad:</strong> {selectedCentro.localidad.denominacion}
                    </p>
                    {selectedCentro.lat && selectedCentro.lng && (
                      <p className="minimapa-centro-info">
                        <strong>Coordenadas:</strong> {selectedCentro.lat.toFixed(4)}, {selectedCentro.lng.toFixed(4)}
                      </p>
                    )}
                  </div>
                </div>
                
                {selectedCentro.lat && selectedCentro.lng && (
                  <div className="minimapa-action-buttons">
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedCentro.lat},${selectedCentro.lng}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="minimapa-btn-como-llegar"
                    >
                      🗺️ Cómo llegar
                    </a>
                    <button 
                      className="minimapa-btn-actualizar"
                      onClick={() => geocodeCentroIfNeeded(selectedCentro)}
                      disabled={geocodingInProgress.has(selectedCentro.id)}
                    >
                      {geocodingInProgress.has(selectedCentro.id) ? '⏳ Localizando...' : '🔄 Actualizar ubicación'}
                    </button>
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

// Componente TabBar principal
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
        
        <div className="instalaciones-content">
          <div className='divFoto'>
            <img className='foto' src="/frente-1.jpg" alt="centro1" />
          </div>
          <div className='columna'>
            Descubre nuestros modernos centros médicos equipados con la última tecnología 
            para brindarte la mejor atención médica en toda la región.
          </div>
        </div>

        <div className="minimapa-section">
          <h3 className="mb-3">Encuentra Nuestros Centros</h3>
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
          <div className="politicas-table-container">
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

export default TabBar;