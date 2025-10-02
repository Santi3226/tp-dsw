import { useEffect, useState } from "react";
import {useTurnos, deleteTurnos, addTurnos, modifyTurnos, getTurnosQuery} from "../hooks/useTurnos";
import "./TurnoAdmin.css";
import { useForm, useWatch } from "react-hook-form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useTiposAnalisis } from "../hooks/useTiposAnalisis.js";
import { useCentros } from "../hooks/useCentros.js";
import { usePaciente } from "../hooks/usePacientes.js";

function TurnoAdmin() {
const [turnosFiltrados, setTurnosFiltrados] = useState([]); //Definicion del estado
const { isLoading, isError, error, turnos = [] } = useTurnos();
const {  pacientes = [] } = usePaciente();
const {  tipos = [] } = useTiposAnalisis();
const {  centros = [] } = useCentros();
const [horariosDisponibles, setHorariosDisponibles] = useState([]);

const { register: registerModify, handleSubmit: handleSubmitModify, formState: { errors: errorsModify, isSubmitting: isSubmittingModify } } = useForm({ mode: "onBlur" });
const { register: registerAdd, handleSubmit: handleSubmitAdd, formState: { errors: errorsAdd, isSubmitting: isSubmittingAdd }, control } = useForm({ mode: "onBlur" });
const { register: registerDelete, handleSubmit: handleSubmitDelete, formState: { errors: errorsDelete, isSubmitting: isSubmittingDelete } } = useForm({ mode: "onBlur" });
const { register: registerFilter, handleSubmit: handleSubmitFilter, formState: { errors: errorsFilter, isSubmitting: isSubmittingFilter } } = useForm({ mode: "onBlur" });

const fechaHoraReserva = useWatch({
    control,
    name: "fechaHoraReserva"
  });

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

const onSubmitDelete = async (data) => {
try {
  const id = data.id; 
  await deleteTurnos(id);
  location.reload(); 
} 
catch (error) {
  console.error("Fallo al registrar:", error);
}
};

const onSubmitModify = async (data) => {
try { 
  await modifyTurnos(data);
  location.reload(); 
} 
catch (error) {
  console.error("Fallo al modificar:", error);
}
};

const onSubmitAdd = async (data) => {
try {
  data.fechaHoraReserva = `${data.fechaHoraReserva}T${data.horaReserva}:00`;
  console.log("Datos del formulario:", data);
  await addTurnos(data);
  location.reload(); 
} 
catch (error) {
  console.error("Fallo al agregar:", error);
}
};

const onSubmitFilter = async (data) => {
  try {
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
      <div style={pageStyles.grid}>
      <table className="table">
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
                </tr>
              ))}
            </tbody>
            </table>
      </div>
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
            {errorsAdd.paciente && (
              <div className="error-message">{errorsAdd.paciente.message}</div>
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
        {turnosFiltrados.map((p, index) => (
        <option key={index} value={p.id}>
          {p.id} - {p.paciente?.apellido}, {p.paciente?.nombre} - {p.tipoAnalisis?.nombre}
        </option>
        ))}
        </select>
        {errorsModify.id && (
          <div className="error-message">{errorsModify.id.message}</div>
        )}
      </div>

          <div className="form-group" id="tres">
          <label htmlFor="text">Nombre</label>
          <input
              type="text"
              id="nombre"
              {...registerModify("nombre")}
              className="form-input"
            />
            {errorsModify.nombre && (
              <div className="error-message">{errorsModify.nombre.message}</div>
            )}
            </div>
            <div className="form-group" id="cuatro">
            <label htmlFor="text">Apellido</label>
            <input
              type="text"
              id="apellido"
              {...registerModify("apellido")}
              className="form-input"
            />
            {errorsModify.apellido && (
              <div className="error-message">{errorsModify.apellido.message}</div>
            )}</div>
            <div className="form-group">
            <label htmlFor="number">DNI</label>
            <input
              type="text"
              id="dni"
              {...registerModify("dni", {
                pattern: {
                  value: undefined||/^\d{8}$/, // Expresión regular para validar dni
                  message: "Formato de dni no válido",
                },
              })}
              className="form-input"
            />
            {errorsModify.dni && (
              <div className="error-message">{errorsModify.dni.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="text">Direccion</label>
            <input
              type="text"
              id="direccion"
              {...registerModify("direccion")}
              className="form-input"
            />
            {errorsModify.direccion && (
              <div className="error-message">{errorsModify.direccion.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="text">Telefono</label>
            <input
              type="text"
              id="telefono"
              {...registerModify("telefono", {
              })}
              className="form-input"
            />
            {errorsModify.telefono && (
              <div className="error-message">{errorsModify.telefono.message}</div>
            )}
          </div>
          <div id="fechaNac" className="form-group">
            <label htmlFor="date">Fecha de Nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              {...registerModify("fechaNacimiento", {
                validate: (value) => {
                  if (!value) return true;
                  const selectedDate = new Date(value);
                  const currentDate = new Date();
                  currentDate.setHours(0, 0, 0, 0);
                  if (selectedDate > currentDate) {
                    return "Fecha de nacimiento inválida";
                  }
                  return true;
                },
              })}
              className="form-input"
            />
            {errorsModify.fechaNacimiento && (
              <div className="error-message">{errorsModify.fechaNacimiento.message}</div>
            )}
          </div>
          
          <button id="login" type="submit" className="login-btn" disabled={isSubmittingModify} style={{gridRow: 4}}>
            {isSubmittingModify ? "Un momento..." : "Modificar"}
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
              style={{ width: "40%" }}
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

export default TurnoAdmin;