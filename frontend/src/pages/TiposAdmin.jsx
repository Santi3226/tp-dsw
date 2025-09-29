import { useForm } from "react-hook-form";
import "./TurnoAdmin.css";
import { addTipos, deleteTipos, modifyTipos, useTiposAnalisis } from "../hooks/useTiposAnalisis";
import Tabs from "react-bootstrap/esm/Tabs";
import { Tab } from "bootstrap";
import { useEffect, useState } from "react";
import axiosInstance from "../helpers/api";

function TiposAdmin() {
const { register: registerModify, handleSubmit: handleSubmitModify, formState: { errors: errorsModify, isSubmittingModify } } = useForm({ mode: "onBlur" });
const { register: registerAdd, handleSubmit: handleSubmitAdd, formState: { errors: errorsAdd, isSubmittingAdd } } = useForm({ mode: "onBlur" });
const { register: registerDelete, handleSubmit: handleSubmitDelete, formState: { errors: errorsDelete, isSubmittingDelete }, } = useForm({ mode: "onBlur" });
//3 forms distintos pq se solapan los errores y los botones
const [plantillaAnalisis, setPlantillaAnalisis] = useState([]);

useEffect(() => {
    const getDatos = async () => {
      try {
        const plantillaAnalisis = await axiosInstance.get('/plantillaAnalisis'); 
        setPlantillaAnalisis(plantillaAnalisis.data.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    getDatos();
  }, []);

const onSubmitModify = async (data) => {
try { 
  await modifyTipos(data);
  location.reload(); 
} 
catch (error) {
  console.error("Fallo al modificar:", error);
}
};

const onSubmitAdd = async (data) => {
try { 
  await addTipos(data);
  location.reload(); 
} 
catch (error) {
  console.error("Fallo al agregar:", error);
}
};

const onSubmitDelete = async (data) => {
try { 
  await deleteTipos(data);
  location.reload(); 
} 
catch (error) {
  console.error("Fallo al eliminar:", error);
}
};

const { isLoading, isError, error, tipos = [] } = useTiposAnalisis();  

  if (isLoading) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.message}>Cargando tipos...</p>
        <div style={pageStyles.spinner}></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.errorMessage}>Ha ocurrido un error y no se pudieron obtener los tipos: {error.message}</p>
      </div>
    );
  }

  if (tipos.length === 0) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.message}>No se encontraron tipos.</p>
      </div>
    );
  }

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.header}>Nuestros Tipos de Análisis</h1>
      <div style={pageStyles.grid}>
      <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Importe</th>
                  <th>Plantilla</th>
                </tr>
              </thead>
              <tbody>
              {tipos.map((ta) => (
                <tr key={ta.id}>
                  <td>{ta.id}</td>
                  <td>{ta.nombre}</td>
                  <td>{ta.importe}</td>
                  <td>{ta.plantillaAnalisis.id}</td>
                </tr>
              ))}
            </tbody>
            </table>
      </div>
      
      <Tabs
      defaultActiveKey="modificar"
      id="justify-tab-example"
      className="mb-3"
      justify
      style={{marginTop:"30px"}}
    >
      <Tab eventKey="modificar" title="Modificar">
          <h2 className='titulo'>Modificar los tipos</h2>
          <form
          className="login-formReg"
          onSubmit={handleSubmitModify(onSubmitModify)}
          noValidate
        >
        <div className="form-group" id="uno">
        <label htmlFor="text">Id Tipo de Analisis</label>
        <select
          id="id"
          
          {...registerModify("id", {
            required:"Id del Tipo de Analisis requerido",
            pattern: {
            },
          })}
          className="form-input"
        >
        <option value="">-</option>
        {tipos.map((ta, index) => (
        <option key={index} value={ta.id}>
          {ta.id}
        </option>
              ))}

        </select> 
        {errorsModify.id && (
          <div className="error-message">{errorsModify.id.message}</div>
        )}
        </div>

          <div className="form-group" id="dos">
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

          <div className="form-group" id="tres">
            <label htmlFor="text">Importe</label>
            <input
              type="text"
              id="importe"
              {...registerModify("importe")}
              className="form-input"
            />
            {errorsModify.importe && (
              <div className="error-message">{errorsModify.importe.message}</div>
            )}
          </div>
          <div className="form-group" id="cuatro">
          <label htmlFor="text">Nro. de Plantilla</label>
          <select
              id="plantillaAnalisis"
              
              {...registerModify("plantillaAnalisis")}
              className="form-input"
            >
            <option value="">-</option>
            {plantillaAnalisis.map((pa, index) => (
            <option key={index} value={pa.id}>
              {pa.id} 
            </option>
            ))}

            </select> 
            {errorsModify.plantillaAnalisis && (
              <div className="error-message">{errorsModify.plantillaAnalisis.message}</div>
            )}
            </div>

          <button id="login" type="submit" className="login-btn" disabled={isSubmittingModify}>
            {isSubmittingModify ? "Un momento..." : "Modificar"}
          </button>
        </form>
      </Tab>
      <Tab eventKey="agregar" title="Agregar">
          <h2 className='titulo'>Agregar un tipo</h2>
          <form
          className="login-formReg"
          onSubmit={handleSubmitAdd(onSubmitAdd)}
          noValidate
        >
          <div className="form-group" id="uno">
            <label htmlFor="text">Nombre</label>
            <input
              type="text"
              id="nombreA"
              {...registerAdd("nombre", {
                required:"Nombre requerido",
              })}
              className="form-input"
            />
            {errorsAdd.nombre && (
              <div className="error-message">{errorsAdd.nombre.message}</div>
            )}
          </div>

          <div className="form-group" id="dos">
            <label htmlFor="text">Importe</label>
            <input
              type="text"
              id="importe"
              {...registerAdd("importe", {
                required:"Importe requerido",
              })}
              className="form-input"
            />
            {errorsAdd.importe && (
              <div className="error-message">{errorsAdd.importe.message}</div>
            )}
          </div>
          <div className="form-group" id="tres">
          <label htmlFor="text">Nro. de Plantilla</label>
          <select
              id="plantillaAnalisis"
              
              {...registerAdd("plantillaAnalisis")}
              className="form-input"
            >
            <option value="">-</option>
            {plantillaAnalisis.map((pa, index) => (
            <option key={index} value={pa.id}>
              {pa.id} 
            </option>
            ))}

            </select> 
            {errorsAdd.plantillaAnalisis && (
              <div className="error-message">{errorsAdd.plantillaAnalisis.message}</div>
            )}
            </div>

          <button id="login" type="submit" className="login-btn" disabled={isSubmittingAdd}>
            {isSubmittingAdd ? "Un momento..." : "Agregar"}
          </button>
        </form>
      </Tab>
      <Tab eventKey="eliminar" title="Eliminar">
        <h2 className='titulo'>Eliminar un tipo</h2>
        <form
        className="login-formReg"
        onSubmit={handleSubmitDelete(onSubmitDelete)}
        noValidate
      >
      <div className="form-group">
        <label htmlFor="text">Tipo</label>
        <select
          id="id"
          {...registerDelete("id", {required:"Id requerido"})}
          className="form-input"
        >
        <option value="">-</option>
        {tipos.map((p, index) => (
        <option key={index} value={p.id}>
          {p.id}
        </option>
        ))}

        </select>
        {errorsDelete.tipoAnalisis && (
          <div className="error-message">{errorsDelete.tipoAnalisis.message}</div>
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

export default TiposAdmin;
