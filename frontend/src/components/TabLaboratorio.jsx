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
import MinimapaCentros from './MinimapaCentros.jsx';

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