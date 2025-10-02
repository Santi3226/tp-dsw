import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axiosInstance from '../helpers/api';
import { useForm, useWatch } from "react-hook-form";
import { useAuth } from "../hooks/useAuth.js";
import '../pages/Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tab.css';
import { useEffect, useState } from 'react';
import { getTurnosQuery, modifyTurnos } from '../hooks/useTurnos.js';
import { usePolitica } from '../hooks/usePolitica.js';

function TabBar(props) {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting }, control } = useForm({ mode: "onBlur" });
  const [errorLogin, setErrorLogin] = useState(null);
  
  // Utiliza useWatch para observar los cambios en el campo de fecha
  const fechaHoraReserva = useWatch({
    control,
    name: "fechaHoraReserva"
  });

  const onSubmit = async (data) => {
    try {
      // Combina la fecha y la hora para el envío
      data.fechaHoraReserva = `${data.fechaHoraReserva}T${data.horaReserva}:00`;
      await registturno(data);
    } catch (error) {
      console.error("Fallo al registrar:", error);
    }
  };

  const [centros, setCentros] = useState([]);
  const { isLoading, isError, error, politicas = [] } = usePolitica();
  const [tiposAnalisis, setTiposAnalisis] = useState([]);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [turnoAEliminarId, setTurnoAEliminarId] = useState(null);
  const [resultadosId, setResultadosId] = useState(null);
  const [turnosPaciente, setTurnosPaciente] = useState([]);

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

  // Función para generar todos los horarios posibles
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

  // Generamos una lista estática de todos los horarios posibles
  const allTimeSlots = generateTimeSlots(7, 19, 15); // Deberia invocar politica pero no anda
  
  // Efecto para cargar los horarios disponibles cuando se selecciona una fecha
  useEffect(() => {
    if (fechaHoraReserva) {
      const turnosFecha = async () => {
        try {
          const data = { fechaHoraReserva: fechaHoraReserva };
          const response = await getTurnosQuery(data);
          console.log('Turnos de la fecha seleccionada:', response);
          
          // Extrae los horarios ocupados de los turnos recibidos
          const occupiedTimes = response
            .filter(turno => turno.estado !== "Anulado")
            .map(turno => {
              const date = new Date(turno.fechaHoraReserva);
              const hour = String(date.getHours()).padStart(2, '0');
              const minute = String(date.getMinutes()).padStart(2, '0');
              return `${hour}:${minute}`;
            });

          // Filtra todos los horarios para quitar los que ya están ocupados
          const availableSlots = allTimeSlots.filter(
            slot => !occupiedTimes.includes(slot)
          );
          setHorariosDisponibles(availableSlots);
        } catch (error) {
          console.error("Error al obtener los turnos:", error);
        }
      };
      turnosFecha();
    }
  }, [fechaHoraReserva]);

  // Efecto para obtener todos los datos iniciales
  useEffect(() => {
    const getDatos = async () => {
      try {
        const centros = await axiosInstance.get('/centroAtencion');
        setCentros(centros.data.data);
        const tipos = await axiosInstance.get('/tipoAnalisis');
        setTiposAnalisis(tipos.data.data);
        const data = { paciente: user.paciente.id };
        const response = await getTurnosQuery(data);
        setTurnosPaciente(response);
        console.log("Turnos del paciente:", response);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    getDatos();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  const registturno = async (data) => {
    setErrorLogin(null);
    const formData = new FormData();
    formData.append('receta', data.receta[0]);
    formData.append('recibeMail', data.recibeMail);
    formData.append('estado', 'Pendiente');
    formData.append('observacion', '');
    formData.append('fechaHoraReserva', data.fechaHoraReserva);
    formData.append('paciente', user.paciente.id);
    formData.append('email', user.email);
    formData.append('centroAtencion', data.centroAtencion);
    formData.append('tipoAnalisis', data.tipoAnalisis);
    
    try {
      const route = "/turno";
      const response = await axiosInstance.post(route, formData);
      alert("Turno creado Correctamente!");
      location.reload(); // Recarga la página después de un registro exitoso
    } catch (error) {
      console.error("Error en AuthProvider:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorLogin(error.response.data.message);
      } else {
        setErrorLogin("Error de red o del servidor. Por favor, inténtalo de nuevo.");
      }
      throw error;
    }
  };

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
        {turnosPaciente.length > 0 ? (
          <div style={{ marginTop: '20px' }}>
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
                {turnosPaciente.map((turno) => {
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
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="form-group" id="uno">
            <label htmlFor="text">Tipo de Análisis</label>
            <select
              id="tipoAnalisis"
              {...register("tipoAnalisis", {
                required: "Tipo de Análisis requerido",
              })}
              className="form-input"
            >
              <option value="">-</option>
              {tiposAnalisis.map((ta, index) => (
                <option key={index} value={ta.id}>
                  {ta.id} - {ta.nombre}
                </option>
              ))}
            </select>
            {errors.tipoAnalisis && (
              <div className="error-message">{errors.tipoAnalisis.message}</div>
            )}
          </div>

          <div id="dos" className="form-group">
            <label htmlFor="date">Fecha del Turno</label>
            <input
              style={{ width: "40%" }}
              type="date"
              id="fechaHoraReserva"
              {...register("fechaHoraReserva", {
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
            {errors.fechaHoraReserva && (
              <div className="error-message">{errors.fechaHoraReserva.message}</div>
            )}
            </div>
              <div id="tres" className="form-group">
            {(fechaHoraReserva && errors.fechaHoraReserva == undefined) && (
              <>
                <label htmlFor="time">Hora del Turno</label>
                <select 
                  id="horaReserva"
                  {...register("horaReserva", {
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
                {errors.horaReserva && (
                  <div className="error-message">{errors.horaReserva.message}</div>
                )}
              </>
            )}
          </div>

          <div className="form-group" style={{gridColumn: "1", gridRow : "2"}} id="tres">
            <label htmlFor="text">Centro de Atención</label>
            <select
              id="centroAtencion"
              {...register("centroAtencion", {
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
            {errors.centroAtencion && (
              <div className="error-message">{errors.centroAtencion.message}</div>
            )}
          </div>

          <div className="form-group" style={{gridColumn: "1", gridRow : "3"}}>
            <label htmlFor="file">Receta</label>
            <input type="file"
              accept="image/*"
              name="receta"
              {...register("receta",
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
            {errors.receta && (
              <div className="error-message">{errors.receta.message}</div>
            )}
          </div>
          <div className="form-options" style={{gridColumn: "2", gridRow : "3"}}>
            <label className="checkbox-label">
              <input type="checkbox" {...register("recibeMail")} />
              <span>Deseo recibir Email recordatorio</span>
            </label>
          </div>
          <button id="turno" type="submit" className="login-btn" disabled={isSubmitting} style={{gridColumn: "2", gridRow : "4"}}>
            {isSubmitting ? "Un momento..." : "Registrar"}
          </button>
          {errorLogin && <div className="error-message">{errorLogin}</div>}
        </form>
      </Tab>
      <Tab eventKey="resultados" title="Resultados">
        <h2 className='titulo'>Resultados disponibles</h2>
        {turnosPaciente.length > 0 ? (
          <div style={{ marginTop: '20px' }}>
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
                {turnosPaciente.map((turno) => {
                  if (turno.estado !== "Completado") {
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

export default TabBar;