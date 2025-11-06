import React from 'react';
import MinimapaCentros from '../MinimapaCentros.jsx';

const TabLaboratorioCentros = () => {
  return (
    <>
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
    </>
  );
};

export default TabLaboratorioCentros;
