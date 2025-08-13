import ProductCard from "../components/ProductCard";
import useTurnos from "../hooks/useTurnos";
import "./TurnoAdmin.css";

function TurnoAdmin() {
const { isLoading, isError, error, turnos = [] } = useTurnos();  
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

  if (turnos.length === 0) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.message}>No se encontraron turnos.</p>
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
                  <th>Tipo de Analisis</th>
                  <th>Centro de Atencion</th>
                  <th>Fecha y Hora</th>
                  <th>Estado</th>
                  <th>Observación</th>
                  <th>Recibe Mail</th>
                </tr>
              </thead>
              <tbody>
              {turnos.map((turno) => (
                <tr key={turno.id}>
                  <td>{turno.id}</td>
                  <td>{turno.tipoAnalisis.nombre}</td>
                  <td>{turno.centroAtencion.nombre}</td>
                  <td>{new Date(turno.fechaHoraExtraccion).toLocaleString()}</td>
                  <td>{turno.estado}</td>
                  <td>{turno.observacion === "" ? "-" : turno.observacion}</td>
                  <td>{turno.recibeMail ? "Si" : "No"}</td>
                </tr>
              ))}
            </tbody>
            </table>
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

export default TurnoAdmin;
