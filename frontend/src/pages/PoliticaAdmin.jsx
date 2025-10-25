import { useForm } from "react-hook-form";
import "./TurnoAdmin.css";
import {usePolitica, modifyPoliticas} from "../hooks/usePolitica";

function PoliticaAdmin() {

const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm({mode: "onBlur",});

const onSubmit = async (data) => {
try { 
  data.id = 2; //Sugar 
  await modifyPoliticas(data);
  refetch(); 
} 
catch (error) {
  console.error("Fallo al eliminar:", error);
}
};

const { isLoading, isError, error, politicas = [] } = usePolitica();  
  if (isLoading) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.message}>Cargando politica...</p>
        <div style={pageStyles.spinner}></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.errorMessage}>Ha ocurrido un error y no se pudieron obtener las politicas: {error.message}</p>
      </div>
    );
  }

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.header}>Nuestras Politicas</h1>
      <div style={pageStyles.grid}>
        {politicas.length === 0 ? (
          <div style={pageStyles.containerCentered}>
            <p style={pageStyles.message}>No se encontraron políticas.</p>
          </div>
        ) : (
          <table className="table" style={{display: "block",
              
              maxWidth: "fit-content",
              margin: "0 auto",
              overflowX: "auto",
              whiteSpace: "nowrap"}}>
            <thead>
              <tr>
                <th>Dia Habilitacion</th>
                  <th>Hora Inicio</th>
                  <th>Hora Fin</th>
                </tr>
              </thead>
              <tbody>
              {politicas.map((politica) => (
                <tr key={politica.id}>
                  <td>{politica.diaHabilitacionTurnos}</td>
                  <td>{politica.horaInicioTurnos}</td>
                  <td>{politica.horaFinTurnos}</td>
                </tr>
              ))}
            </tbody>
            </table>
          )}
      </div>
    <h2 className='titulo'>Modificar las politicas</h2>
          <form
          className="login-formReg"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="form-group" id="uno">
            <label htmlFor="text">Dias Habilitacion de turnos</label>
            <input
              type="text"
              id="diaHabilitacionTurnos"
              {...register("diaHabilitacionTurnos")}
              className="form-input"
            />
            {errors.diaHabilitacionTurnos && (
              <div className="error-message">{errors.diaHabilitacionTurnos.message}</div>
            )}
          </div>

          <div className="form-group" id="dos">
            <label htmlFor="text">Hora Inicio de Turnos</label>
            <input
              type="time"
              id="horaInicioTurnos"
              {...register("horaInicioTurnos")}
              className="form-input"
            />
            {errors.horaInicioTurnos && (
              <div className="error-message">{errors.horaInicioTurnos.message}</div>
            )}
          </div>
          <div className="form-group" id="tres">
          <label htmlFor="text">Hora Fin de Turnos</label>
          <input
              type="time"
              id="horaFinTurnos"
              {...register("horaFinTurnos")}
              className="form-input"
            />
            {errors.horaFinTurnos && (
              <div className="error-message">{errors.horaFinTurnos.message}</div>
            )}
            </div>

          <button id="login" type="submit" className="login-btn" disabled={isSubmitting}>
            {isSubmitting ? "Un momento..." : "Modificar"}
          </button>
        </form>
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

export default PoliticaAdmin;
