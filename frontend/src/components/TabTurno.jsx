import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axiosInstance from '../helpers/api';
import { useForm, useWatch } from "react-hook-form";
import { useAuth } from "../hooks/useAuth.js";
import '../pages/Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tab.css';
import { useEffect, useState } from 'react';
import {useTurnos, deleteTurnos, addTurnos, modifyTurnos, getTurnosQuery} from "../hooks/useTurnos";
import { usePolitica } from '../hooks/usePolitica.js';
import { useCentros } from '../hooks/useCentros.js';
import { useTiposAnalisis } from '../hooks/useTiposAnalisis.js';

const generateTimeSlots = (horaInicio, horaFin, intervalo) => {
  const horarios = [];
  let horaActual = horaInicio;
  let minutoActual = 0;
  while (horaActual < horaFin || (horaActual === horaFin && minutoActual === 0)) {
    horarios.push(`${String(horaActual).padStart(2, '0')}:${String(minutoActual).padStart(2, '0')}`);
    minutoActual += intervalo;
    if (minutoActual >= 60) {
      minutoActual = 0;
      horaActual += 1;
    }
  }
  return horarios;
};

const allTimeSlots = generateTimeSlots(7, 19, 15); // Deberia invocar politica pero no anda

function TabTurno(props) {
  const { user } = useAuth();
const { register: registerAdd, handleSubmit: handleSubmitAdd, formState: { errors: errorsAdd, isSubmitting: isSubmittingAdd }, control } = useForm({ mode: "onBlur" });
  const {  centros = [] } = useCentros();
  const {  tipos = [] } = useTiposAnalisis();
  const { isLoading, isError, error, turnos = [] } = useTurnos();
  const { politicas = [] } = usePolitica();
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [turnoAEliminarId, setTurnoAEliminarId] = useState(null);
  const [resultadosId, setResultadosId] = useState(null);
  const [turnosPaciente, setTurnosPaciente] = useState([]);
  const [turnosFiltradosGestion, setTurnosFiltradosGestion] = useState([]);
  const [turnosFiltradosResultados, setTurnosFiltradosResultados] = useState([]);

  // Utiliza useWatch para observar los cambios en el campo de fecha
  const fechaHoraReserva = useWatch({
    control,
    name: "fechaHoraReserva"
  });

  const onSubmitAdd = async (data) => {
    try {
      data.fechaHoraReserva = `${data.fechaHoraReserva}T${data.horaReserva}:00`;
      data.paciente = user.paciente.id;
      data.email = user.email;
      await addTurnos(data);
      location.reload(); 
    } catch (error) {
      console.error("Fallo al registrar:", error);
    }
  };

  const handleEliminarClick = (id) => {
    setTurnoAEliminarId(id);
    setShowModal(true);
  };

  const handleResultadosClick = (id) => {
    setResultadosId(id);
    console.log("Resultados del turno seleccionado:", turnosPaciente.find((t) => t.id === Number(id)).resultados);
    setShowModal(true);
  };

  const handleCerrarModal = () => {
    setShowModal(false);
    setTurnoAEliminarId(null);
  };

  const handleConfirmarEliminacion = async () => {
    const data = {
      id: turnoAEliminarId,
      estado: "Anulado",
    };
    await modifyTurnos(data);
    location.reload();
    handleCerrarModal();
  };

  useEffect(() => {
     if (!fechaHoraReserva) return; // Early return si no hay fecha
     
     const turnosFecha = async () => {
       try {
         const data = { fechaHoraReserva: fechaHoraReserva ? fechaHoraReserva : fechaHoraReservaModify };
         const response = await getTurnosQuery(data);
         
         const occupiedTimes = response
           .filter(turno => turno.estado !== "Anulado")
           .map(turno => {
             const date = new Date(turno.fechaHoraReserva);
             const hour = String(date.getHours()).padStart(2, '0');
             const minute = String(date.getMinutes()).padStart(2, '0');
             return `${hour}:${minute}`;
           });
 
         const availableSlots = allTimeSlots.filter(
           slot => !occupiedTimes.includes(slot)
         );
         setHorariosDisponibles(availableSlots);
       } catch (error) {
         console.error("Error al obtener los turnos:", error);
       }
     };
     turnosFecha();
  }, [fechaHoraReserva]);

useEffect(() => {
    if (Array.isArray(turnos)) {
      setTurnosPaciente(turnos); //La primera vez llena el arreglo con todos los turnos, desp se actaliza con los filtros
    }
  else if (!isLoading) {
      setTurnosPaciente([]);
    }
  }, [turnos, isLoading]); // Depende de turnos e isLoading

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
    console.log("Turnos filtrados para resultados:", turnosFiltradosResultados);
  }
  if (!Array.isArray(turnosPaciente) || turnosPaciente.length === 0) {
    setTurnosFiltradosGestion([]);
    setTurnosFiltradosResultados([]);
  }
  
}, [turnosPaciente]);



  const { inicio } = props;
  return (
    <Tabs
      defaultActiveKey={inicio}
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="gestiondeturnos" title="Gestión de Turnos">
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
                          onClick={() => handleEliminarClick(turno.id)}
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
                Confirmar Cancelación</h4>
              <p>
                ¿Estás seguro de que quieres cancelar este turno?</p>
              <div style={{ marginTop: '20px' }}>
                <button onClick={handleCerrarModal} className='login-btn' style={{ backgroundColor: 'red' }}>
                  Volver
                </button>
                 <button onClick={handleConfirmarEliminacion} className='login-btn' style={{ marginLeft: '10px' }}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </Tab>
      <Tab eventKey="registrarturno" title="Registrar Turno">
        <h2 className='titulo'>Registrar Turno</h2>
        <form
          encType="multipart/form-data"
          className="login-formReg"
          onSubmit={handleSubmitAdd(onSubmitAdd)}
          noValidate
        >
          <div className="form-group" id="uno">
            <label htmlFor="text">Tipo de Análisis</label>
            <select
              id="tipoAnalisis"
              {...registerAdd("tipoAnalisis", {
                required: "Tipo de Análisis requerido",
              })}
              className="form-input"
            >
              <option value="">-</option>
              {tipos.map((ta, index) => (
                <option key={index} value={ta.id}>
                  {ta.id} - {ta.nombre}
                </option>
              ))}
            </select>
            {errorsAdd.tipoAnalisis && (
              <div className="error-message">{errorsAdd.tipoAnalisis.message}</div>
            )}
          </div>

          <div id="dos" className="form-group">
            <label htmlFor="date">Fecha del Turno</label>
            <input
              type="date"
              id="fechaHoraReserva"
              {...registerAdd("fechaHoraReserva", {
                required: "Fecha requerida",
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const currentDate = new Date();
                  currentDate.setHours(0, 0, 0, 0);
                  if (selectedDate < currentDate) {
                    return "Fecha de turno inválida";
                  }
                  return true;
                },
              })}
              className="form-input"
            />
            {errorsAdd.fechaHoraReserva && (
              <div className="error-message">{errorsAdd.fechaHoraReserva.message}</div>
            )}
            </div>
              <div id="tres" className="form-group">
            {(fechaHoraReserva && errorsAdd.fechaHoraReserva == undefined) && (
              <>
                <label htmlFor="time">Hora del Turno</label>
                <select 
                  id="horaReserva"
                  {...registerAdd("horaReserva", {
                    required: "Hora requerida",
                  })}
                  className="form-input"
                >
                  <option value="">-</option>
                  {horariosDisponibles.map((hora, index) => (
                    <option key={index} value={hora}>
                      {hora}
                    </option>
                  ))}
                </select>
                {errorsAdd.horaReserva && (
                  <div className="error-message">{errorsAdd.horaReserva.message}</div>
                )}
              </>
            )}
          </div>

          <div className="form-group" style={{gridColumn: "1", gridRow : "2"}} id="tres">
            <label htmlFor="text">Centro de Atención</label>
            <select
              id="centroAtencion"
              {...registerAdd("centroAtencion", {
                required: "Centro requerido",
              })}
              className="form-input"
            >
              <option value="">-</option>
              {centros.map((ca, index) => (
                <option key={index} value={ca.id}>
                  {ca.nombre + " - " + ca.localidad?.denominacion + ", " + ca.domicilio}
                </option>
              ))}
            </select>
            {errorsAdd.centroAtencion && (
              <div className="error-message">{errorsAdd.centroAtencion.message}</div>
            )}
          </div>

          <div className="form-group" style={{gridColumn: "1", gridRow : "3"}}>
            <label htmlFor="file">Receta</label>
            <input type="file"
              accept="image/*"
              name="receta"
              {...registerAdd("receta",
                {
                  required: "Receta requerida",
                  validate: {
                    isImage: (value) => {
                      if (!value[0]) {
                        return true;
                      }
                      const fileType = value[0].type;
                      const acceptedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp'];
                      return acceptedImageTypes.includes(fileType) || "El archivo debe ser una imagen (JPG, PNG).";
                    },
                    isSize: (value) => {
                      if (value[0].size < 10 * 1024 * 1024) {
                        return true;
                      }
                      return "El archivo debe ser menor a 10mb.";
                    }
                  }
                })}
            />
            {errorsAdd.receta && (
              <div className="error-message">{errorsAdd.receta.message}</div>
            )}
          </div>
          <div className="form-options" style={{gridColumn: "2", gridRow : "3"}}>
            <label className="checkbox-label">
              <input type="checkbox" {...registerAdd("recibeMail")} />
              <span>Deseo recibir Email recordatorio</span>
            </label>
          </div>
          <button id="turno" type="submit" className="login-btn" disabled={isSubmittingAdd} style={{gridColumn: "2", gridRow : "4"}}>
            {isSubmittingAdd ? "Un momento..." : "Registrar"}
          </button>
        </form>
      </Tab>
      <Tab eventKey="resultados" title="Resultados">
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
                          <label>
                            {resultado.parametroAnalisis.nombre} ({resultado.parametroAnalisis.unidad})
                          </label>
                          <label>{resultado.valor}</label>
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
      </Tab>
    </Tabs>
  );
}

export { TabTurno };