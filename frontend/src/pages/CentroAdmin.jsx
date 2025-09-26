import { useForm } from "react-hook-form";
import {useCentros, deleteCentros } from "../hooks/useCentros";
import "./TurnoAdmin.css";

function CentroAdmin() {

const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm({mode: "onBlur",});

const onSubmit = async (data) => {
try {
  const id = data.centro; 
  await deleteCentros(id);
  location.reload(); 
} 
catch (error) {
  console.error("Fallo al eliminar:", error);
}
};
const { isLoading, isError, error, centros = [] } = useCentros();  
  if (isLoading) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.message}>Cargando centros...</p>
        <div style={pageStyles.spinner}></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.errorMessage}>Ha ocurrido un error y no se pudieron obtener los centros: {error.message}</p>
      </div>
    );
  }

  if (centros.length === 0) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.message}>No se encontraron centros.</p>
      </div>
    );
  }

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.header}>Nuestros Centros</h1>
      <div style={pageStyles.grid}>
      <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Localidad</th>
                  <th>Direccion</th>
                </tr>
              </thead>
              <tbody>
              {centros.map((centro) => (
                <tr key={centro.id}>
                  <td>{centro.id}</td>
                  <td>{centro.nombre}</td>
                  <td>{centro.localidad?.denominacion}</td>
                  <td>{centro.domicilio}</td>
                </tr>
              ))}
            </tbody>
            </table>
      </div>
      <form
        className="login-formReg"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
      <div className="form-group">
        <label htmlFor="text">Centro</label>
        <select
          id="centro"
          {...register("centro", {required:"Centro requerido"})}
          className="form-input"
        >
        <option value="">-</option>
        {centros.map((p, index) => (
        <option key={index} value={p.id}>
          {p.id}
        </option>
        ))}

        </select>
        {errors.centro && (
          <div className="error-message">{errors.centro.message}</div>
        )}
      </div>

      <button id="borrar" type="submit" className="login-btn" disabled={isSubmitting}>
        {isSubmitting ? "Un momento..." : "Eliminar"}
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

export default CentroAdmin;
