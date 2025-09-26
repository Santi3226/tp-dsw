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
    if (selectedCentro) {
      map.setView([selectedCentro.lat, selectedCentro.lng], 15);
    }
  }, [selectedCentro, map]);
  
  return null;
};

// Servicio de geocodificación gratuito usando Nominatim
const geocodeAddress = async (direccion, localidad) => {
  try {
    const query = encodeURIComponent(`${direccion}, ${localidad}, Argentina`);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
    
    // Fallback a coordenadas de Rosario con offset aleatorio
    return {
      lat: -32.9468 + (Math.random() - 0.5) * 0.02,
      lng: -60.6393 + (Math.random() - 0.5) * 0.02
    };
  } catch (error) {
    console.error('Error geocoding:', error);
    return {
      lat: -32.9468 + (Math.random() - 0.5) * 0.02,
      lng: -60.6393 + (Math.random() - 0.5) * 0.02
    };
  }
};

// Componente del Minimapa con Leaflet
const MinimapaCentros = () => {
  const [centros, setCentros] = useState([]);
  const [centrosConCoordenadas, setCentrosConCoordenadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCentro, setSelectedCentro] = useState(null);

  // Datos mock - reemplazar con datos reales de la API
  const mockCentros = [
    {
      id: 1,
      nombre: "Centro Médico Central",
      direccion: "Av. Córdoba 1234",
      telefono: "+54341234567",
      email: "central@centromedico.com",
      localidad: {
        nombre: "Rosario",
        provincia: "Santa Fe"
      }
    },
    {
      id: 2,
      nombre: "Clínica Norte",
      direccion: "Bv. Oroño 567",
      telefono: "+54341234568",
      email: "info@clinicanorte.com",
      localidad: {
        nombre: "Rosario",
        provincia: "Santa Fe"
      }
    },
    {
      id: 3,
      nombre: "Hospital Regional",
      direccion: "San Martín 890",
      telefono: "+54341234569",
      email: "contacto@hospitalregional.com",
      localidad: {
        nombre: "Villa Gobernador Gálvez",
        provincia: "Santa Fe"
      }
    },
    {
      id: 4,
      nombre: "Centro de Especialidades",
      direccion: "Pellegrini 432",
      telefono: "+54341234570",
      email: "especialidades@centro.com",
      localidad: {
        nombre: "Rosario",
        provincia: "Santa Fe"
      }
    }
  ];

  // Cargar centros y obtener coordenadas
  const loadCentros = async () => {
    try {
      setLoading(true);
      
      // TODO: Reemplazar con llamada real a la API
      // const response = await axiosInstance.get('/centroAtencion');
      // const centrosData = response.data.data;
      
      const centrosData = mockCentros;
      setCentros(centrosData);

      // Geocodificar direcciones
      const centrosGeocodificados = await Promise.all(
        centrosData.map(async (centro) => {
          const coords = await geocodeAddress(centro.direccion, centro.localidad.nombre);
          return {
            ...centro,
            lat: coords.lat,
            lng: coords.lng
          };
        })
      );

      setCentrosConCoordenadas(centrosGeocodificados);
      
    } catch (err) {
      setError('Error al cargar los centros de atención');
      console.error('Error loading centros:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCentros();
  }, []);

  const handleCentroClick = (centro) => {
    setSelectedCentro(centro);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Cargando centros de atención...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h5 className="alert-heading">Error</h5>
        <p>{error}</p>
      </div>
    );
  }

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
              {centrosConCoordenadas.map((centro) => (
                <div
                  key={centro.id}
                  className={`list-group-item list-group-item-action ${
                    selectedCentro?.id === centro.id ? 'active' : ''
                  }`}
                  onClick={() => handleCentroClick(centro)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="mb-1">🏥 {centro.nombre}</h6>
                      <p className="mb-1 small">📍 {centro.direccion}</p>
                      <p className="mb-1 small">📱 {centro.telefono}</p>
                      <small className="text-muted">
                        🏙️ {centro.localidad.nombre}, {centro.localidad.provincia}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body p-0">
              <MapContainer
                center={[-32.9468, -60.6393]} // Rosario, Santa Fe
                zoom={12}
                style={{ height: '400px', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {centrosConCoordenadas.map((centro) => (
                  <Marker
                    key={centro.id}
                    position={[centro.lat, centro.lng]}
                    eventHandlers={{
                      click: () => handleCentroClick(centro)
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
                          <strong>📱 Teléfono:</strong><br />
                          {centro.telefono}
                        </p>
                        {centro.email && (
                          <p style={{ margin: '4px 0', fontSize: '14px' }}>
                            <strong>✉️ Email:</strong><br />
                            {centro.email}
                          </p>
                        )}
                        <p style={{ margin: '4px 0', fontSize: '14px' }}>
                          <strong>🏙️ Localidad:</strong><br />
                          {centro.localidad.nombre}, {centro.localidad.provincia}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                
                <MapController selectedCentro={selectedCentro} />
              </MapContainer>
            </div>
          </div>
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
                    <p><strong>Teléfono:</strong> {selectedCentro.telefono}</p>
                    {selectedCentro.email && (
                      <p><strong>Email:</strong> {selectedCentro.email}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <p><strong>Localidad:</strong> {selectedCentro.localidad.nombre}</p>
                    <p><strong>Provincia:</strong> {selectedCentro.localidad.provincia}</p>
                    <p><strong>Coordenadas:</strong> {selectedCentro.lat.toFixed(4)}, {selectedCentro.lng.toFixed(4)}</p>
                  </div>
                </div>
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
                    <a 
                      href={`tel:${selectedCentro.telefono}`}
                      className="btn btn-outline-success btn-sm"
                    >
                      📞 Llamar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Información adicional */}
      <div className="row mt-3">
        <div className="col">
          <div className="alert alert-info" role="alert">
            <small>
              <strong>💡 Información:</strong> Este mapa utiliza OpenStreetMap, un servicio gratuito y de código abierto. 
              Las ubicaciones son aproximadas basadas en las direcciones proporcionadas.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente TabBar actualizado con Leaflet
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
        
        {/* Sección de imágenes existente */}
        <div style={{ display: "block", marginBottom: "2rem" }}>
          <div className='divFoto'>
            <img className='foto' src="/frente-1.jpg" alt="centro1" />
          </div>
          <div className='columna'>
            Descubre nuestros modernos centros médicos equipados con la última tecnología 
            para brindarte la mejor atención médica en toda la región.
          </div>
        </div>

        {/* Nueva sección del minimapa */}
        <div className="mt-4">
          <h3 className="mb-3">🗺️ Encuentra Nuestros Centros</h3>
          <p className="text-muted mb-4">
            Explora la ubicación de nuestros centros médicos. Haz clic en los marcadores 
            o en la lista para obtener más información y direcciones.
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

export default TabBar;