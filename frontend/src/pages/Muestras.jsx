import { useEffect, useState } from "react";
import {useTurnos, deleteTurnos, addTurnos, modifyTurnos, getTurnosQuery} from "../hooks/useTurnos.js";
import "./TurnoAdmin.css";
import { useForm, useWatch } from "react-hook-form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useTiposAnalisis } from "../hooks/useTiposAnalisis.js";
import { useCentros } from "../hooks/useCentros.js";
import { usePaciente } from "../hooks/usePacientes.js";

function Muestras() {
const [turnosFiltrados, setTurnosFiltrados] = useState([]); //Definicion del estado
const { isLoading, isError, error, turnos = [] } = useTurnos();
const {  pacientes = [] } = usePaciente();
const [showModal, setShowModal] = useState(false);

const { register: registerFilter, handleSubmit: handleSubmitFilter, formState: { errors: errorsFilter, isSubmitting: isSubmittingFilter } } = useForm({ mode: "onBlur" });


const handleRecetaClick = (id) => {
  const turno = turnos.find(t => t.id === id);
  if (turno && turno.receta) {
    const recetaWindow = window.open("", "_blank", "width=600,height=400");
    recetaWindow.document.write("<html><head><title>Receta</title></head><body>");
    recetaWindow.document.write("<h2>Receta para el turno n° " + id + "</h2>");
    recetaWindow.document.write(`<img src=\"http://localhost:3000/uploads/${turno.receta}\"/>`);
    recetaWindow.document.write("</body></html>");
    recetaWindow.document.close();
  }
};

const handleCerrarModal = () => {
    setShowModal(false);
  };

const handleMuestrasClick = async (id) => {
  const confirmacion = window.confirm("¿Estás seguro de que deseas registrar la muestra para el turno n° " + id + "?");
  if (confirmacion) {
    const data = { id:id, fechaHoraExtraccion: new Date().toISOString().slice(0, 19), estado: "Completado" };
    console.log("Datos para modificar el turno:", data);
    await modifyTurnos(data);
    //Abrir nueva pestaña para imprimir etiqueta
    location.reload();
  }
};

const handleConfirmarClick = async (id) => {
  const confirmacion = window.confirm("¿Estás seguro de que deseas confirmar el turno n° " + id + "?");
  if (confirmacion) {
    const data = { id:id, estado: "Confirmado" };
    console.log("Datos para modificar el turno:", data);
    await modifyTurnos(data);
    //Abrir nueva pestaña para imprimir etiqueta
    location.reload();
  }
};

const handleObservarClick = async (id) => {
  setShowModal(true);
};
const onSubmitFilter = async (data) => {
  try {
    data.estado = "Confirmado";
    const response = await getTurnosQuery(data); //Filtrado condicional
    setTurnosFiltrados(response || []); 
  } catch (error) {
    console.error("Fallo al filtrar:", error);
  }
};

const handleConfirmarObservacion = async (observacion) => {
  if (confirmacion) {
    const data = { id:id, estado: "Confirmado" };
    console.log("Datos para modificar el turno:", data);
    await modifyTurnos(data);
    //Abrir nueva pestaña para imprimir etiqueta
    location.reload();
  }
};

useEffect(() => {
    if (Array.isArray(turnos)) {
      setTurnosFiltrados(turnos); //La primera vez llena el arreglo con todos los turnos, desp se actaliza con los filtros
    }
  }, [turnos]);

  if (isLoading) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.message}>Cargando turnos...</p>
        <div style={pageStyles.spinner}></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.errorMessage}>Ha ocurrido un error y no se pudieron obtener los turnos: {error.message}</p>
      </div>
    );
  }

  if (turnosFiltrados.length === 0) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.message}>No se encontraron turnos.</p>
        <button id="login" type="button" className="login-btn" onClick={() => window.location.reload()}> 
            Volver
        </button>
      </div>
    );
  }

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.header}>Nuestros Turnos</h1>
      <Tabs
      defaultActiveKey="muestras"
      id="justify-tab-example"
      className="mb-3"
      justify
      style={{marginTop:"30px"}}
      >
    <Tab eventKey="muestras" title="Muestras">
          <div style={pageStyles.grid}>

      <table className="table">
              <thead>
                <tr>
                  <th>Numero de Turno</th>
                  <th>Paciente</th>
                  <th>Tipo de Analisis</th>
                  <th>Centro de Atencion</th>
                  <th>Fecha y Hora Reserva</th>
                  <th>Estado</th>
                  <th>Observación</th>
                  <th>Registrar Muestra </th>
                </tr>
              </thead>
              <tbody>
              {turnosFiltrados.map((turno) => (
                <tr key={turno.id}>
                  <td>{turno.id}</td>
                  <td>{turno.paciente?.apellido + ", " + turno.paciente?.nombre}</td>
                  <td>{turno.tipoAnalisis?.nombre}</td>
                  <td>{turno.centroAtencion?.nombre}</td>
                  <td>{new Date(turno.fechaHoraReserva).toLocaleString()}</td>
                  <td>{turno.estado}</td>
                  <td>{turno.observacion === "" ? "-" : turno.observacion}</td>
                  <td><button
                          onClick={() => handleMuestrasClick(turno.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'red',
                            cursor: 'pointer',
                            fontSize: '20px',
                            fontStyle: 'underline'
                          }}
                        >
                          ✔️ 
                        </button></td>
                </tr>
              ))}
            </tbody>
            </table>
      </div>      
          <form
            className="login-formReg"
            onSubmit={handleSubmitFilter(onSubmitFilter)}
            noValidate
          >
            <div className="form-group" id="uno">
            <label htmlFor="text">Paciente</label>
            <select
              id="paciente"
              {...registerFilter("paciente")}
              className="form-input"
            >
              <option value="">-</option>
              {pacientes.map((pa, index) => (
                <option key={index} value={pa.id}>
                  {pa.id} - {pa.nombre} {pa.apellido}
                </option>
              ))}
            </select>
            {errorsFilter.paciente && (
              <div className="error-message">{errorsFilter.paciente.message}</div>
            )}
          </div>

            <div id="fechaNac" className="form-group">
              <label htmlFor="date">Fecha de Inicio</label>
              <input
                type="date"
                id="fechaInicio"
                {...registerFilter('fechaInicio', {
                  validate: (value) => {},
                })}
                className="form-input"
              />
              {errorsFilter.fechaInicio && (
                <div className="error-message">
                  {errorsFilter.fechaInicio.message}
                </div>
              )}
            </div>
            <div id="fechaNac" className="form-group">
              <label htmlFor="date">Fecha de Fin</label>
              <input
                type="date"
                id="fechaFin"
                {...registerFilter('fechaFin', {
                  validate: (value) => {},
                })}
                className="form-input"
              />
              {errorsFilter.fechaFin && (
                <div className="error-message">
                  {errorsFilter.fechaFin.message}
                </div>
              )}
            </div>

            <button
              id="login"
              type="submit"
              className="login-btn"
              disabled={isSubmittingFilter}
              style={{ alignSelf: 'center' }}
            >
              {isSubmittingFilter ? 'Un momento...' : 'Filtrar'}
            </button>
          </form>
   
    </Tab>
    <Tab eventKey="confirmar" title="Confirmar">
          <div style={pageStyles.grid}>

      <table className="table">
              <thead>
                <tr>
                  <th>Numero de Turno</th>
                  <th>Paciente</th>
                  <th>Tipo de Analisis</th>
                  <th>Centro de Atencion</th>
                  <th>Fecha y Hora Reserva</th>
                  {<th>Receta</th>}
                  <th>Estado</th>
                  <th>Observación</th>
                  <th>Observar Turno</th>
                  <th>Confirmar Turno</th>
                </tr>
              </thead>
              <tbody style={{justifyItems:"center", textAlign:"center", alignItems:"center"}}>
              {turnosFiltrados.map((turno) => (
                <tr key={turno.id}>
                  <td>{turno.id}</td>
                  <td>{turno.paciente?.apellido + ", " + turno.paciente?.nombre}</td>
                  <td>{turno.tipoAnalisis?.nombre}</td>
                  <td>{turno.centroAtencion?.nombre}</td>
                  <td>{new Date(turno.fechaHoraReserva).toLocaleString()}</td>
                  {<td><button style={{background:"none", color:"blue", fontStyle:"underline"}} onClick={() => handleRecetaClick(turno.id)}>Ver Receta</button></td>}
                  <td>{turno.estado}</td>
                  <td>{turno.observacion === "" ? "-" : turno.observacion}</td>
                  <td><button
                  onClick={() => handleObservarClick(turno.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'red',
                    cursor: 'pointer',
                    fontSize: '20px',
                    fontStyle: 'underline'
                  }}
                >
                  X
                </button></td>
                  <td><button
                  onClick={() => handleConfirmarClick(turno.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'red',
                    cursor: 'pointer',
                    fontSize: '20px',
                    fontStyle: 'underline'
                  }}
                >
                  ✔️ 
                </button></td>
                </tr>
                
              ))}
            </tbody>
            </table>
      </div>      
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
              minWidth: '500px'
            }}>
              <h4 style={{fontWeight: 'bold', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'}}>
                Establecer Observacion</h4>
              <div style={{ marginTop: '20px' }}>
                 <textarea style={{ width: '100%', height: '100px' }} id="observacion" type="text" />
              </div>
              <div style={{ marginTop: '20px' }}>
                <button onClick={handleCerrarModal} className='login-btn' style={{ backgroundColor: 'red' }}>
                  Volver
                </button>
                 <button onClick={() => handleConfirmarObservacion(document.getElementById("observacion").value)} className='login-btn' style={{ marginLeft: '10px' }}>
                  Confirmar
                </button>

              </div>
            </div>
          </div>
        )}
          <form
            className="login-formReg"
            onSubmit={handleSubmitFilter(onSubmitFilter)}
            noValidate
          >
            <div className="form-group" id="uno">
            <label htmlFor="text">Paciente</label>
            <select
              id="paciente"
              {...registerFilter("paciente")}
              className="form-input"
            >
              <option value="">-</option>
              {pacientes.map((pa, index) => (
                <option key={index} value={pa.id}>
                  {pa.id} - {pa.nombre} {pa.apellido}
                </option>
              ))}
            </select>
            {errorsFilter.paciente && (
              <div className="error-message">{errorsFilter.paciente.message}</div>
            )}
          </div>

            <div id="fechaNac" className="form-group">
              <label htmlFor="date">Fecha de Inicio</label>
              <input
                type="date"
                id="fechaInicio"
                {...registerFilter('fechaInicio', {
                  validate: (value) => {},
                })}
                className="form-input"
              />
              {errorsFilter.fechaInicio && (
                <div className="error-message">
                  {errorsFilter.fechaInicio.message}
                </div>
              )}
            </div>
            <div id="fechaNac" className="form-group">
              <label htmlFor="date">Fecha de Fin</label>
              <input
                type="date"
                id="fechaFin"
                {...registerFilter('fechaFin', {
                  validate: (value) => {},
                })}
                className="form-input"
              />
              {errorsFilter.fechaFin && (
                <div className="error-message">
                  {errorsFilter.fechaFin.message}
                </div>
              )}
            </div>

            <button
              id="login"
              type="submit"
              className="login-btn"
              disabled={isSubmittingFilter}
              style={{ alignSelf: 'center' }}
            >
              {isSubmittingFilter ? 'Un momento...' : 'Filtrar'}
            </button>
          </form>
   
    </Tab>
    </Tabs>
     </div>
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
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Diseño responsivo en cuadrícula
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
    // Un spinner CSS simple
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

export default Muestras;