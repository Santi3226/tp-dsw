import { use, useEffect, useState } from "react";
import {useTurnos, deleteTurnos, addTurnos, modifyTurnos, getTurnosQuery} from "../hooks/useTurnos";
import "./TurnoAdmin.css";
import { useForm, useWatch } from "react-hook-form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useTiposAnalisis } from "../hooks/useTiposAnalisis.js";
import { useCentros } from "../hooks/useCentros.js";
import { usePaciente } from "../hooks/usePacientes.js";
import axiosInstance from '../helpers/api';

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

function TurnoAdmin() {
const [turnosFiltrados, setTurnosFiltrados] = useState([]); //Definicion del estado
const { isLoading, isError, error, turnos = [] } = useTurnos();
const {  pacientes = [] } = usePaciente();
const {  tipos = [] } = useTiposAnalisis();
const {  centros = [] } = useCentros();
const [turnoDetalleId, setTurnoDetalleId] = useState(null);
const [showModal, setShowModal] = useState(false);
const [horariosDisponibles, setHorariosDisponibles] = useState([]);

const { register: registerAdd, handleSubmit: handleSubmitAdd, formState: { errors: errorsAdd, isSubmitting: isSubmittingAdd }, control: controlAdd } = useForm({ mode: "onBlur" });
const { register: registerModify, handleSubmit: handleSubmitModify, formState: { errors: errorsModify, isSubmitting: isSubmittingModify }, control: controlModify } = useForm({ mode: "onBlur" });
const { register: registerDelete, handleSubmit: handleSubmitDelete, formState: { errors: errorsDelete, isSubmitting: isSubmittingDelete } } = useForm({ mode: "onBlur" });
const { register: registerFilter, handleSubmit: handleSubmitFilter, formState: { errors: errorsFilter, isSubmitting: isSubmittingFilter } } = useForm({ mode: "onBlur" });

const fechaHoraReserva = useWatch({
    control: controlAdd,
    name: "fechaHoraReserva"
});


const fechaHoraReservaModify = useWatch({
    control: controlModify, 
    name: "fechaHoraReserva"
});
  
const handleDetalleClick = async (id) => {
  setTurnoDetalleId(id);
  setShowModal(true);
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
  }, [fechaHoraReserva, fechaHoraReservaModify]); 

const onSubmitDelete = async (data) => {
try {
  const id = data.id; 
  await deleteTurnos(id);
  refetch(); 
} 
catch (error) {
  console.error("Fallo al registrar:", error);
}
};

const onSubmitModify = async (data) => {
try { 
  await modifyTurnos(data);
  refetch(); 
} 
catch (error) {
  console.error("Fallo al modificar:", error);
}
};

const onSubmitAdd = async (data) => {
try {
  data.fechaHoraReserva = `${data.fechaHoraReserva}T${data.horaReserva}:00`;
  const response = await axiosInstance.get("paciente/"+data.paciente);
  const email = await axiosInstance.get("usuario/"+response.data.data.usuario);
  data.email = email.data.data.email;
  console.log("Datos del formulario:", data);
  await addTurnos(data);
  refetch(); 
} 
catch (error) {
  console.error("Fallo al agregar:", error);
}
};

const onSubmitFilter = async (data) => {
  try {
    console.log(data);
    const response = await getTurnosQuery(data); //Filtrado condicional
    setTurnosFiltrados(response || []); 
  } catch (error) {
    console.error("Fallo al filtrar:", error);
  }
};

useEffect(() => {
    if (Array.isArray(turnos)) {
      setTurnosFiltrados(turnos); //La primera vez llena el arreglo con todos los turnos, desp se actaliza con los filtros
    }
  else if (!isLoading) {
      setTurnosFiltrados([]);
    }
  }, [turnos, isLoading]); // Depende de turnos e isLoading

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

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.header}>Nuestros Turnos</h1>
      
      <Tabs
      defaultActiveKey="filtrar"
      id="justify-tab-example"
      className="mb-3"
      justify
      style={{marginTop:"30px"}}
    >
    <Tab eventKey="filtrar" title="Filtrar">
      <h2 className="titulo">Filtrar turnos</h2>
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
      <Tab eventKey="modificar" title="Modificar">
          <h2 className='titulo'>Modificar los datos del Turno</h2>
          <form
          className="login-formReg"
          onSubmit={handleSubmitModify(onSubmitModify)}
          noValidate
        >
        <div className="form-group">
        <label htmlFor="text">Turno</label>
        <select
          id="id"
          {...registerModify("id", {required:"Id requerido"})}
          className="form-input"
        >
        <option value="">-</option>
        {turnos.map((p, index) => (
        <option key={index} value={p.id}>
          {p.id} - {p.paciente?.apellido}, {p.paciente?.nombre} - {p.tipoAnalisis?.nombre}
        </option>
        ))}
        </select>
        {errorsModify.id && (
          <div className="error-message">{errorsModify.id.message}</div>
        )}
      </div>

       <div className="form-group" id="uno">
            <label htmlFor="text">Tipo de Análisis</label>
            <select
              id="tipoAnalisis"
              {...registerModify("tipoAnalisis", {
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
            {errorsModify.tipoAnalisis && (
              <div className="error-message">{errorsModify.tipoAnalisis.message}</div>
            )}
          </div>

          <div id="dos" className="form-group">
            <label htmlFor="date">Fecha del Turno</label>
            <input
              type="date"
              id="fechaHoraReserva"
              {...registerModify("fechaHoraReserva", {
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
            {errorsModify.fechaHoraReserva && (
              <div className="error-message">{errorsModify.fechaHoraReserva.message}</div>
            )}
            </div>
              <div id="tres" className="form-group">
            {(fechaHoraReservaModify && errorsModify.fechaHoraReserva == undefined) && (
              <>
                <label htmlFor="time">Hora del Turno</label>
                <select 
                  id="horaReserva"
                  {...registerModify("horaReserva", {
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
                {errorsModify.horaReserva && (
                  <div className="error-message">{errorsModify.horaReserva.message}</div>
                )}
              </>
            )}
          </div>

          <div className="form-group" style={{gridColumn: "1", gridRow : "2"}} id="tres">
            <label htmlFor="text">Centro de Atención</label>
            <select
              id="centroAtencion"
              {...registerModify("centroAtencion", {
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
            {errorsModify.centroAtencion && (
              <div className="error-message">{errorsModify.centroAtencion.message}</div>
            )}
          </div>

          <div className="form-group" style={{gridColumn: "1", gridRow : "3"}} id="tres">
            <label htmlFor="text">Paciente</label>
            <select
              id="paciente"
              {...registerModify("paciente", {
              })}
              className="form-input"
            >
              <option value="">-</option>
              {pacientes.map((p, index) => (
                <option key={index} value={p.id}>
                  {p.id + " - " + p.nombre + ", " + p.apellido}
                </option>
              ))}
            </select>
            {errorsModify.paciente && (
              <div className="error-message">{errorsModify.paciente.message}</div>
            )}
          </div>

          <div className="form-options" style={{gridColumn: "1", gridRow : "4"}}>
            <label className="checkbox-label">
              <input type="checkbox" {...registerModify("recibeMail")} />
              <span>Deseo recibir Email recordatorio</span>
            </label>
          </div>
          <button id="turno" type="submit" className="login-btn" disabled={isSubmittingModify} style={{gridColumn: "2", gridRow : "4"}}>
            {isSubmittingModify ? "Un momento..." : "Registrar"}
          </button>
        </form>
      </Tab>
      <Tab eventKey="agregar" title="Agregar">
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

          <div className="form-group" style={{gridColumn: "1", gridRow : "3"}} id="tres">
            <label htmlFor="text">Paciente</label>
            <select
              id="paciente"
              {...registerAdd("paciente", {
                required: "Paciente requerido",
              })}
              className="form-input"
            >
              <option value="">-</option>
              {pacientes.map((p, index) => (
                <option key={index} value={p.id}>
                  {p.id + " - " + p.nombre + ", " + p.apellido}
                </option>
              ))}
            </select>
            {errorsAdd.paciente && (
              <div className="error-message">{errorsAdd.paciente.message}</div>
            )}
          </div>

          <div className="form-group" style={{gridColumn: "2", gridRow : "3"}}>
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
          <div className="form-options" style={{gridColumn: "1", gridRow : "4"}}>
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
      <Tab eventKey="eliminar" title="Eliminar">
        <h2 className='titulo'>Eliminar un Turno</h2>
        <form
        className="login-formReg"
        onSubmit={handleSubmitDelete(onSubmitDelete)}
        noValidate
      >
      <div className="form-group">
        <label htmlFor="text">Turno</label>
        <select
          id="id"
          {...registerDelete("id", {required:"Id requerido"})}
          className="form-input"
        >
        <option value="">-</option>
        {turnos.map((p, index) => (
        <option key={index} value={p.id}>
          {p.id} - {p.paciente?.apellido}, {p.paciente?.nombre} - {p.tipoAnalisis?.nombre}
        </option>
        ))}
        </select>
        {errorsDelete.id && (
          <div className="error-message">{errorsDelete.id.message}</div>
        )}
      </div>

      <button id="borrar" type="submit" className="login-btn" disabled={isSubmittingDelete}>
        {isSubmittingDelete ? "Un momento..." : "Eliminar"}
      </button>
      </form>
      </Tab>
    </Tabs>

      <div style={pageStyles.grid}>
      {turnosFiltrados.length === 0 ? (
        <div style={pageStyles.containerCentered}>
          <p style={pageStyles.message}>No se encontraron turnos.</p>
          <button id="login" type="button" className="login-btn" onClick={() => window.location.reload()}>
            Limpiar Filtros
          </button>
        </div>
      ) : (
        <table className="table responsive-table">
          <thead>
            <tr>
              <th>Numero de Turno</th>
              <th>Paciente</th>
                  <th>Tipo de Analisis</th>
                  <th>Centro de Atencion</th>
                  <th>Fecha y Hora Reserva</th>
                  <th>Fecha y Hora Extraccion</th>
                  <th>Estado</th>
                  <th>Observación</th>
                  <th>Recibe Mail</th>
                  <th>Detalle</th>
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
                  <td>{turno.fechaHoraExtraccion && new Date(turno.fechaHoraExtraccion).toLocaleString() !== "31/12/1969, 09:00:00" ? new Date(turno.fechaHoraExtraccion).toLocaleString() : "-"}</td>
                  <td>{turno.estado}</td>
                  <td>{turno.observacion === "" ? "-" : turno.observacion}</td>
                  <td>{turno.recibeMail ? "Si" : "No"}</td>
                  {<td><button style={{background:"none", color:"blue", fontStyle:"underline"}} onClick={() => handleDetalleClick(turno.id)}>Ver Detalle</button></td>}
                </tr>
              ))}
            </tbody>
            </table>
          )}
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
            <div className="detalle-modal">
              <h4 style={{fontWeight: 'bold', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'}}>
                Detalles del turno</h4>
              <div style={{ marginTop: '20px' }}>
                {turnoDetalleId && (() => {
                const turno = turnosFiltrados.find((t) => t.id === Number(turnoDetalleId));
                if (!turno) return null;
                return (
                  <div className="turno-detalle-grid">
                    <div className="form-group">
                      <label>
                        Paciente: {turno.paciente?.nombre}, {turno.paciente?.apellido}
                      </label>
                      <label>
                        DNI: {turno.paciente?.dni} 
                      </label>
                      <label>
                        Fecha Nac: {turno.paciente?.fechaNacimiento ? new Date(turno.paciente.fechaNacimiento).toLocaleDateString() : "-"}
                      </label>
                      <label>
                        Dirección: {turno.paciente?.direccion}
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                      Tel: {turno.paciente?.telefono}
                      </label>
                      <label>
                        Tipo de Análisis: {turno.tipoAnalisis?.nombre} 
                      </label>
                      <label>
                        Importe: {turno.tipoAnalisis?.importe}
                      </label>
                      <label>
                      Plantilla: {turno.tipoAnalisis?.plantillaAnalisis}
                      </label>
                    </div>
                  </div>
                );
              })()}
                <button onClick={() => setShowModal(false)} className='login-btn' style={{ backgroundColor: 'red', marginTop: '20px' }}>
                  Volver
                </button>
              </div>
            </div>
          </div>
        )}
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
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
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

export default TurnoAdmin;