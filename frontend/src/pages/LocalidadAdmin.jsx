import { useForm, useWatch } from "react-hook-form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./TurnoAdmin.css";
import { useLocalidad, deleteLocalidad, addLocalidad, modifyLocalidad } from "../hooks/useLocalidad";

function LocalidadAdmin() {

const { register: registerAdd, handleSubmit: handleSubmitAdd, formState: { errors: errorsAdd, isSubmitting: isSubmittingAdd } } = useForm({ mode: "onBlur" });
const { register: registerModify, handleSubmit: handleSubmitModify, formState: { errors: errorsModify, isSubmitting: isSubmittingModify } } = useForm({ mode: "onBlur" });
const { register: registerDelete, handleSubmit: handleSubmitDelete, formState: { errors: errorsDelete, isSubmitting: isSubmittingDelete } } = useForm({ mode: "onBlur" });


const { isLoading, isError, error, localidades = [] , refetch } = useLocalidad();

const onSubmitDelete = async (data) => {
try {
  const id = data.id; 
  await deleteLocalidad(id);
  refetch(); 
} 
catch (error) {
  console.error("Fallo al registrar:", error);
}
};

const onSubmitModify = async (data) => {
try { 
  await modifyLocalidad(data);
  refetch(); 
} 
catch (error) {
  console.error("Fallo al modificar:", error);
}
};

const onSubmitAdd = async (data) => {
try {
  await addLocalidad(data);
  refetch(); 
} 
catch (error) {
  console.error("Fallo al agregar:", error);
}
};

  if (isLoading) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.message}>Cargando localidades...</p>
        <div style={pageStyles.spinner}></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.errorMessage}>Ha ocurrido un error y no se pudieron obtener las localidades: {error.message}</p>
      </div>
    );
  }

 return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.header}>Nuestras Localidades</h1>
            <Tabs
      defaultActiveKey="modificar"
      id="justify-tab-example"
      className="mb-3"
      justify
      style={{marginTop:"30px"}}
    >
      <Tab eventKey="modificar" title="Modificar">
          <h2 className='titulo'>Modificar los datos de la Localidad</h2>
          <form
          className="login-formReg"
          onSubmit={handleSubmitModify(onSubmitModify)}
          noValidate
        >
        <div className="form-group">
        <label htmlFor="text">Localidad</label>
        <select
          id="id"
          {...registerModify("id", {required:"Id requerido"})}
          className="form-input"
        >
        <option value="">-</option>
        {localidades.map((p, index) => (
        <option key={index} value={p.id}>
          {p.id} - {p.denominacion} - {p.codPostal}
        </option>
        ))}
        </select>
        {errorsModify.id && (
          <div className="error-message">{errorsModify.id.message}</div>
        )}
      </div>
         <div className="form-group" id="uno">
          <label htmlFor="text">Denominación</label>
          <input
              type="text"
              id="denominacion"
              {...registerModify("denominacion")}
              className="form-input"
            />
            {errorsModify.denominacion && (
              <div className="error-message">{errorsModify.denominacion.message}</div>
            )}
            </div>

            <div className="form-group" id="dos">
          <label htmlFor="text">Cod. Postal</label>
          <input
              type="text"
              id="codPostal"
              {...registerModify("codPostal")}
              className="form-input"
            />
            {errorsModify.codPostal && (
              <div className="error-message">{errorsModify.codPostal.message}</div>
            )}
            </div>

          <button type="submit" className="login-btn" disabled={isSubmittingModify} style={{gridColumn: "2", gridRow : "2"}}>
            {isSubmittingModify ? "Un momento..." : "Registrar"}
          </button>
        </form>
      </Tab>
      <Tab eventKey="agregar" title="Agregar">
         <h2 className='titulo'>Registrar Localidad</h2>
        <form
          encType="multipart/form-data"
          className="login-formReg"
          onSubmit={handleSubmitAdd(onSubmitAdd)}
          noValidate
        >
          <div className="form-group" id="uno">
          <label htmlFor="text">Denominación</label>
          <input
              type="text"
              id="denominacion"
              {...registerAdd("denominacion")}
              className="form-input"
            />
            {errorsAdd.denominacion && (
              <div className="error-message">{errorsAdd.denominacion.message}</div>
            )}
            </div>

            <div className="form-group" id="dos">
            <label htmlFor="text">Cod. Postal</label>
            <input
                type="text"
                id="codPostal"
                {...registerAdd("codPostal")}
                className="form-input"
              />
              {errorsAdd.codPostal && (
                <div className="error-message">{errorsAdd.codPostal.message}</div>
              )}
            </div>

          <button id="turno" type="submit" className="login-btn" disabled={isSubmittingAdd} style={{gridColumn: "2", gridRow : "2"}}>
            {isSubmittingAdd ? "Un momento..." : "Registrar"}
          </button>
        </form>
      </Tab>
      <Tab eventKey="eliminar" title="Eliminar">
        <h2 className='titulo'>Eliminar una Localidad</h2>
        <form
        className="login-formReg"
        onSubmit={handleSubmitDelete(onSubmitDelete)}
        noValidate
      >
      <div className="form-group">
        <label htmlFor="text">Localidad</label>
        <select
          id="id"
          {...registerDelete("id", {required:"Id requerido"})}
          className="form-input"
        >
        <option value="">-</option>
        {localidades.map((p, index) => (
        <option key={index} value={p.id}>
          {p.id} - {p.denominacion} - {p.codPostal}
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
        {localidades.length === 0 ? (
          <div style={pageStyles.containerCentered}>
            <p style={pageStyles.message}>No se encontraron localidades.</p>
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
                  <th>Denominación</th>
                  <th>Cod. Postal</th>
                </tr>
              </thead>
              <tbody>
              {localidades.map((localidad) => (
                <tr key={localidad.id}>
                  <td>{localidad.id}</td>
                  <td>{localidad.denominacion}</td>
                  <td>{localidad.codPostal}</td>
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

export default LocalidadAdmin;
