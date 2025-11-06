import React from 'react';

const TabTurnoResultados = ({ turnosFiltradosResultados = [], onResultadosClick }) => {
  return (
    <>
      <h2 className='titulo'>Resultados disponibles</h2>
      {turnosFiltradosResultados.length > 0 ? (
        <div style={{ marginTop: '20px' , overflowX: 'scroll'}}>
          <table className="table" style={{ verticalAlign: 'middle' }}>
            <thead>
              <tr>
                <th>Número de Turno</th>
                <th>Tipo de Análisis</th>
                <th>Centro de Atención</th>
                <th>Fecha y Hora</th>
                <th>Estado</th>
                <th>Observación</th>
                <th>Recibe Mail</th>
                <th>Mostrar Resultados</th>
              </tr>
            </thead>
            <tbody>
              {turnosFiltradosResultados.map((turno) => {
                if (turno.estado !== "Resultado") {
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
                        onClick={() => onResultadosClick(turno.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'green',
                          cursor: 'pointer',
                          fontSize: '20px',
                          fontStyle: 'underline'
                        }}
                      >
                        ✔️
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ marginTop: "30px" }}>No tienes resultados disponibles.</p>
      )}
    </>
  );
};

export default TabTurnoResultados;
