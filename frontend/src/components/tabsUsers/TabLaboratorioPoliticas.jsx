import React, { useEffect, useState } from 'react';
import { usePolitica } from '../../hooks/usePolitica.js';
import axiosInstance from '../../helpers/api.js';

const TabLaboratorioPoliticas = () => {
const [politicas, setPoliticas] = useState([]);
useEffect(() => {
const getDatos = async () => {
  try {
    const politicas = await axiosInstance.get('/politica');
    setPoliticas(politicas.data.data);
  } catch (error) {
    console.error("Error al obtener las políticas:", error);
  }
};
getDatos();
}, []);

  return (
    <>
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
    </>
  );
};

export default TabLaboratorioPoliticas;
