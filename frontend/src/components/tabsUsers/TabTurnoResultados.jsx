import React, { useEffect, useState } from 'react';
import { useTurnos } from '../../hooks/useTurnos.js';
import { useAuth } from '../../hooks/useAuth.js';

const TabTurnoResultados = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [resultadosId, setResultadosId] = useState(null);
  const [turnosPaciente, setTurnosPaciente] = useState([]);
  const { isLoading, isError, error, turnos = [], refetch } = useTurnos();
  const [turnosFiltradosGestion, setTurnosFiltradosGestion] = useState([]);
  const [turnosFiltradosResultados, setTurnosFiltradosResultados] = useState([]);

  useEffect(() => {
      if (Array.isArray(turnos)) {
        setTurnosPaciente(turnos); //La primera vez llena el arreglo con todos los turnos, desp se actaliza con los filtros
      }
    else if (!isLoading) {
        setTurnosPaciente([]);
      }
    }, [turnos]); // Depende de turnos e isLoading
  
  // Agrega un nuevo useEffect para filtrar cuando turnosPaciente cambie:
  useEffect(() => {
    if (turnosPaciente.length > 0) 
      {
      const turnosGestion = turnosPaciente.filter(
        turno => (turno.estado === "Pendiente" || turno.estado === "Confirmado") 
        && turno.paciente.id === user.paciente.id
      );
      setTurnosFiltradosGestion(turnosGestion);
  
      const turnosResultados = turnosPaciente.filter(
        turno => turno.estado === "Resultado"
        && turno.paciente.id === user.paciente.id
      );
  
      setTurnosFiltradosResultados(turnosResultados);
    }
    if (!Array.isArray(turnosPaciente) || turnosPaciente.length === 0) {
      setTurnosFiltradosGestion([]);
      setTurnosFiltradosResultados([]);
    }
    
  }, [turnosPaciente]);

  const handleCerrarModal = () => {
    setShowModal(false);
    setResultadosId(null);
  };    
  const handleResultadosClick = (id) => {
    setResultadosId(id);
    setShowModal(true);
  };

  
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
                        onClick={() => handleResultadosClick(turno.id)}
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
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              textAlign: 'center',
              minWidth: '300px'
            }}>
              <h4 style={{fontWeight: 'bold', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'}}>
                Resultados</h4>
                {resultadosId && (
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: "50px", rowGap: "20px", marginTop: "20px"}}>
                    {turnosPaciente.find((t) => t.id === Number(resultadosId))
                      .resultados.map((resultado) => (
                        <div key={resultado.parametroAnalisis.id} className="form-group">
                          <label style={{fontWeight:"bold", fontSize:"1.2rem"}}>
                            {resultado.parametroAnalisis.nombre} ({resultado.parametroAnalisis.unidad})
                          </label>
                          <label style={{fontWeight:"bold", fontSize:"1.2rem"}}>{resultado.valor}</label>
                           <label>Referencia: {resultado.parametroAnalisis.referencia} {resultado.parametroAnalisis.unidad}</label>
                        </div>
                      ))}
                  </div>
              )}
              <div style={{ marginTop: '20px' }}>
                <button onClick={handleCerrarModal} className='login-btn' style={{ backgroundColor: 'red' }}>
                  Volver
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default TabTurnoResultados;
