import { useEffect, useState } from "react";
import {useTurnos, deleteTurnos, addTurnos, modifyTurnos, getTurnosQuery, useTurnosPendientes} from "../hooks/useTurnos";
import "./TurnoAdmin.css";
import { useForm } from "react-hook-form";
import { Tab } from "bootstrap";
import Tabs from "react-bootstrap/esm/Tabs";

function ResultadosAdmin() {
const [turnosFiltrados, setTurnosFiltrados] = useState([]); //Definicion del estado
const { isLoading, isError, error, turnos = [] } = useTurnosPendientes();

const { register: registerModify, handleSubmit: handleSubmitModify, formState: { errors: errorsModify, isSubmittingModify } } = useForm({ mode: "onBlur" });
const { register: registerAdd, handleSubmit: handleSubmitAdd, formState: { errors: errorsAdd, isSubmittingAdd } } = useForm({ mode: "onBlur" });
const { register: registerDelete, handleSubmit: handleSubmitDelete, formState: { errors: errorsDelete, isSubmittingDelete }, } = useForm({ mode: "onBlur" });
const { register: registerFilter, handleSubmit: handleSubmitFilter, formState: { errors: errorsFilter, isSubmittingFilter }, } = useForm({ mode: "onBlur" });

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
  await addTurnos(data);
  location.reload(); 
} 
catch (error) {
  console.error("Fallo al agregar:", error);
}
};

const onSubmitFilter = async (data) => {
  try {
    data.estado="Pendiente";
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
        <a href="">
        <button id="login" type="button" className="login-btn" onclick="window.location.reload();"> 
            Volver
        </button>
        </a>
      </div>
    );
  }

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.header}>Turnos Pendientes de Resultados</h1>
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
                  <td>{turno.paciente.apellido + ", " + turno.paciente.nombre}</td>
                  <td>{turno.tipoAnalisis.nombre}</td>
                  <td>{turno.centroAtencion.nombre}</td>
                  <td>{new Date(turno.fechaHoraReserva).toLocaleString()}</td>
                  <td>{new Date(turno.fechaHoraExtraccion).toLocaleString() !== "31/12/1969, 09:00:00" ? new Date(turno.fechaHoraExtraccion).toLocaleString() : "-"}</td>
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
      <h2 className='titulo'>Filtrar turnos</h2>
      <form
      className="login-formReg"
      onSubmit={handleSubmitFilter(onSubmitFilter)}
      noValidate
    >
      <div className="form-group" id="uno">
      <label htmlFor="text">Nombre</label>
      <input
          type="text"
          id="nombre"
          {...registerFilter("nombre")}
          className="form-input"
        />
        </div>

      <div className="form-group" id="dos">
      <label htmlFor="text">DNI</label>
      <input
          type="text"
          id="dni"
          {...registerFilter("dni")}
          className="form-input"
        />
      </div>

      <div className="form-group" id="tres">
      <label htmlFor="text">Edad</label>
      <input
          type="text"
          id="edad"
          {...registerFilter("edad")}
          className="form-input"
        />
        </div>

      <button id="login" type="submit" className="login-btn" disabled={isSubmittingFilter} style={{gridRow: 2}}>
            {isSubmittingFilter ? "Un momento..." : "Filtrar"}
      </button>
    </form>
      </Tab>

      <Tab eventKey="modificar" title="Modificar">
          <h2 className='titulo'>Modificar los datos del Paciente</h2>
          <form
          className="login-formReg"
          onSubmit={handleSubmitModify(onSubmitModify)}
          noValidate
        >
        <div className="form-group">
        <label htmlFor="text">Paciente</label>
        <select
          id="id"
          {...registerModify("id", {required:"Id requerido"})}
          className="form-input"
        >
        <option value="">-</option>
        {turnos.map((p, index) => (
        <option key={index} value={p.id}>
          {p.id}
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
         <h2 className='titulo'>Agregar un Paciente</h2>
          <form
          className="login-formReg"
          onSubmit={handleSubmitAdd(onSubmitAdd)}
          noValidate
        >
          <div className="form-group" id="tres">
          <label htmlFor="text">Nombre</label>
          <input
              type="text"
              id="nombre"
              {...registerAdd("nombre",{required:"Nombre requerido"})}
              className="form-input"
            />
            {errorsAdd.nombre && (
              <div className="error-message">{errorsAdd.nombre.message}</div>
            )}
            </div>
            <div className="form-group" id="cuatro">
            <label htmlFor="text">Apellido</label>
            <input
              type="text"
              id="apellido"
              {...registerAdd("apellido",{required:"Apellido requerido"})}
              className="form-input"
            />
            {errorsAdd.apellido && (
              <div className="error-message">{errorsAdd.apellido.message}</div>
            )}</div>
            <div className="form-group">
            <label htmlFor="number">DNI</label>
            <input
              type="text"
              id="dni"
              {...registerAdd("dni", {
                required:"DNI requerido",
                pattern: {
                  value: undefined||/^\d{8}$/, // Expresión regular para validar dni
                  message: "Formato de dni no válido",
                },
              })}
              className="form-input"
            />
            {errorsAdd.dni && (
              <div className="error-message">{errorsAdd.dni.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="text">Direccion</label>
            <input
              type="text"
              id="direccion"
              {...registerAdd("direccion",{required:"Direccion requerida"})}
              className="form-input"
            />
            {errorsAdd.direccion && (
              <div className="error-message">{errorsAdd.direccion.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="text">Telefono</label>
            <input
              type="text"
              id="telefono"
              {...registerAdd("telefono", {required:"Telefono requerido"
              })}
              className="form-input"
            />
            {errorsAdd.telefono && (
              <div className="error-message">{errorsAdd.telefono.message}</div>
            )}
          </div>
          <div id="fechaNac" className="form-group">
            <label htmlFor="date">Fecha de Nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              {...registerAdd("fechaNacimiento", {
                required:"Fecha de Nacimiento requerida",
                validate: (value) => {
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
            {errorsAdd.fechaNacimiento && (
              <div className="error-message">{errorsAdd.fechaNacimiento.message}</div>
            )}
          </div>
          
          <button id="login" type="submit" className="login-btn" disabled={isSubmittingAdd} style={{gridRow: 4}}>
            {isSubmittingAdd ? "Un momento..." : "Agregar"}
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
          {p.id}
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

export default ResultadosAdmin;
