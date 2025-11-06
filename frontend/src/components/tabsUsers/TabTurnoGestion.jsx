import React from 'react';

const TabTurnoGestion = ({ turnosFiltradosGestion = [], onEliminarClick }) => {
  return (
    <>
      <h2 className='titulo'>Mis turnos</h2>
      {turnosFiltradosGestion.length > 0 ? (
        <div style={{ marginTop: '20px', overflowX: 'scroll' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Número de Turno</th>
                <th>Tipo de Análisis</th>
                <th>Centro de Atención</th>
                <th>Fecha y Hora</th>
                <th>Estado</th>
                <th>Observación</th>
                <th>Recibe Mail</th>
                <th>Cancelar Turno</th>
              </tr>
            </thead>
            <tbody style={{ verticalAlign: 'middle' }}>
              {turnosFiltradosGestion.map((turno) => {
                if (turno.estado === "Anulado") {
                  return null;
                }
                return (
                  <tr key={turno.id}>
                    <td>{turno.id}</td>
                    <td>{turno.tipoAnalisis?.nombre || '-'}</td>
                    <td>{turno.centroAtencion?.nombre || '-'}</td>
                    <td>{new Date(turno.fechaHoraReserva).toLocaleString()}</td>
                    <td>{turno.estado}</td>
                    <td>{turno.observacion === "" ? "-" : turno.observacion}</td>
                    <td>{turno.recibeMail ? "Sí" : "No"}</td>
                    <td>
                      <button
                        onClick={() => onEliminarClick(turno.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'red',
                          cursor: 'pointer',
                          fontSize: '20px',
                          fontStyle: 'underline'
                        }}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ marginTop: "30px" }}>No tienes turnos registrados.</p>
      )}
    </>
  );
};

export default TabTurnoGestion;
