import { useForm } from "react-hook-form";
import "./TurnoAdmin.css";
import { useParametrosAnalisis, addParametros, deleteParametros, modifyParametros, addVinculo } from "../hooks/useParametrosAnalisis";
import Tabs from "react-bootstrap/esm/Tabs";
import { Tab } from "bootstrap";
import { useEffect, useState } from "react";
import axiosInstance from "../helpers/api";
import { useTiposAnalisis } from "../hooks/useTiposAnalisis";

function ParametrosAdmin() {
const { register: registerModify, handleSubmit: handleSubmitModify, formState: { errors: errorsModify, isSubmittingModify } } = useForm({ mode: "onBlur" });
const { register: registerAdd, handleSubmit: handleSubmitAdd, formState: { errors: errorsAdd, isSubmittingAdd } } = useForm({ mode: "onBlur" });
const { register: registerDelete, handleSubmit: handleSubmitDelete, formState: { errors: errorsDelete, isSubmittingDelete }, } = useForm({ mode: "onBlur" });
const { register: registerVinculo, handleSubmit: handleSubmitVinculo, formState: { errors: errorsVinculo, isSubmittingVinculo }, } = useForm({ mode: "onBlur" });
const { tipos = [] } = useTiposAnalisis();  
 
const [parametrosAnalisis, setParametrosAnalisis] = useState([]);
useEffect(() => {
    const getDatos = async () => {
      try {
        const parametrosAnalisis = await axiosInstance.get('/parametroAnalisis'); 
        setParametrosAnalisis(parametrosAnalisis.data.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    getDatos();
  }, []);

const onSubmitModify = async (data) => {
try { 
  await modifyParametros(data);
  refetch(); 
} 
catch (error) {
  console.error("Fallo al modificar:", error);
}
};

const onSubmitAdd = async (data) => {
try { 
  await addParametros(data);
  refetch(); 
} 
catch (error) {
  console.error("Fallo al agregar:", error);
}
};

const onSubmitDelete = async (data) => {
try { 
  await deleteParametros(data);
  refetch(); 
} 
catch (error) {
  console.error("Fallo al eliminar:", error);
}
};

const onSubmitVinculo = async (data) => {
try {
  await addVinculo(data);
  //refetch();
}
catch (error) {
  console.error("Fallo al vincular:", error);
}
};

  const { isLoading, isError, error, parametros = [] } = useParametrosAnalisis();


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

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.header}>Nuestros Parámetros de Análisis</h1>
       <Tabs
      defaultActiveKey="modificar"
      id="justify-tab-example"
      className="mb-3"
      justify
      style={{marginTop:"30px"}}
    >
      <Tab eventKey="modificar" title="Modificar">
          <h2 className='titulo'>Modificar los parametros</h2>
          <form
          className="login-formReg"
          onSubmit={handleSubmitModify(onSubmitModify)}
          noValidate
        >
        <div className="form-group" id="uno">
        <label htmlFor="text">Parametro de Analisis</label>
        <select
          id="id"
          
          {...registerModify("id", {
            required:"Parametro de Analisis requerido",
            pattern: {
            },
          })}
          className="form-input"
        >
        <option value="">-</option>
        {parametros.map((pa, index) => (
        <option key={index} value={pa.id}>
          {pa.id} - {pa.nombre}
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
            <label htmlFor="text">Referencia</label>
            <input
              type="text"
              id="referencia"
              {...registerModify("referencia")}
              className="form-input"
            />
            {errorsModify.referencia && (
              <div className="error-message">{errorsModify.referencia.message}</div>
            )}
          </div>
           <div className="form-group" style={{gridRow:"2", gridColumn:"2"}}>
            <label htmlFor="text">Unidad de Medición</label>
            <input
              type="text"
              id="unidad"
              {...registerModify("unidad")}
              className="form-input"
            />
            {errorsModify.unidad && (
              <div className="error-message">{errorsModify.unidad.message}</div>
            )}
          </div>

          <button id="login" type="submit" className="login-btn" disabled={isSubmittingModify} style={{gridRow:"3", gridColumn:"2"}}>
            {isSubmittingModify ? "Un momento..." : "Modificar"}
          </button>
        </form>
      </Tab>
      <Tab eventKey="agregar" title="Agregar">
          <h2 className='titulo'>Agregar un Parametro</h2>
          <form
          className="login-formReg"
          onSubmit={handleSubmitAdd(onSubmitAdd)}
          noValidate
        >
          <div className="form-group" id="uno">
            <label htmlFor="text">Nombre</label>
            <input
              type="text"
              id="nombre"
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
            <label htmlFor="text">Referencia</label>
            <input
              type="text"
              id="referencia"
              {...registerAdd("referencia", {
                required:"Referencia requerida",
              })}
              className="form-input"
            />
            {errorsAdd.referencia && (
              <div className="error-message">{errorsAdd.referencia.message}</div>
            )}
          </div>
          <div className="form-group" id="cuatro">
            <label htmlFor="text">Unidad de Medición</label>
            <input
              type="text"
              id="unidad"
              {...registerAdd("unidad")}
              className="form-input"
            />
            {errorsAdd.unidad && (
              <div className="error-message">{errorsAdd.unidad.message}</div>
            )}
          </div>

          <button id="login" type="submit" className="login-btn" disabled={isSubmittingAdd}>
            {isSubmittingAdd ? "Un momento..." : "Agregar"}
          </button>
        </form>
      </Tab>
      <Tab eventKey="eliminar" title="Eliminar">
        <h2 className='titulo'>Eliminar un Parametro</h2>
        <form
        className="login-formReg"
        onSubmit={handleSubmitDelete(onSubmitDelete)}
        noValidate
      >
      <div className="form-group">
        <label htmlFor="text">Parametro</label>
        <select
          id="id"
          {...registerDelete("id", {required:"Parametro requerido"})}
          className="form-input"
        >
        <option value="">-</option>
        {parametros.map((p, index) => (
        <option key={index} value={p.id}>
          {p.id} - {p.nombre}
        </option>
        ))}

        </select>
        {errorsDelete.parametroAnalisis && (
          <div className="error-message">{errorsDelete.parametroAnalisis.message}</div>
        )}
      </div>

      <button id="borrar" type="submit" className="login-btn" disabled={isSubmittingDelete}>
        {isSubmittingDelete ? "Un momento..." : "Eliminar"}
      </button>
      </form>
      </Tab>
    <Tab eventKey="vincular" title="Vincular">
        <h2 className='titulo'>Vincular un Parametro y un Tipo de Análisis</h2>
        <form
        className="login-formReg"
        onSubmit={handleSubmitVinculo(onSubmitVinculo)}
        noValidate
      >
      <div className="form-group">
        <label htmlFor="text">Parámetro de Análisis</label>
        <select
          id="parametroAnalisis"
          {...registerVinculo("parametroAnalisis", {required:"Parámetro de Análisis requerido"})}
          className="form-input"
        >
        <option value="">-</option>
        {parametros.map((p, index) => (
        <option key={index} value={p.id}>
          {p.id} - {p.nombre}
        </option>
        ))}

        </select>
        {errorsVinculo.parametroAnalisis && (
          <div className="error-message">{errorsVinculo.parametroAnalisis.message}</div>
        )}
      </div>
            <div className="form-group">
        <label htmlFor="text">Tipo de Análisis</label>
        <select
          id="tipoAnalisis"
          {...registerVinculo("tipoAnalisis", {required:"Tipo de Análisis requerido"})}
          className="form-input"
        >
        <option value="">-</option>
        {tipos.map((t, index) => (
        <option key={index} value={t.id}>
          {t.id} - {t.nombre}
        </option>
        ))}

        </select>
        {errorsVinculo.tipoAnalisis  && (
          <div className="error-message">{errorsVinculo.tipoAnalisis.message}</div>
        )}
      </div>

      <button id="vincular" type="submit" className="login-btn" disabled={isSubmittingVinculo}>
        {isSubmittingVinculo ? "Un momento..." : "Vincular"}
      </button>
      </form>
      </Tab>
    </Tabs>
      <div style={pageStyles.grid}>
        {parametros.length === 0 ? (
          <div style={pageStyles.containerCentered}>
            <p style={pageStyles.message}>No se encontraron parámetros.</p>
            <button id="login" type="button" className="login-btn" onClick={() => window.location.reload()}>  
              Reintentar
            </button>
          </div>
        ) : (
          <table className="table" style={{display: "block",
              
              maxWidth: "fit-content",
              margin: "0 auto",
              overflowX: "auto",
              whiteSpace: "nowrap"}}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                  <th>Referencia</th>
                  <th>Unidad</th>
                </tr>
              </thead>
              <tbody>
              {parametros.map((pa) => (
                <tr key={pa.id}>
                  <td>{pa.id}</td>
                  <td>{pa.nombre}</td>
                  <td>{pa.referencia}</td>
                  <td>{pa.unidad}</td>
                </tr>
              ))}
            </tbody>
            </table>
        )}
      </div>
     

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

export default ParametrosAdmin;
