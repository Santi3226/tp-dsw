import { useForm } from "react-hook-form";
import {usePaciente, deletePaciente} from "../hooks/usePacientes";
import "./TurnoAdmin.css";

function PacienteAdmin() {

const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm({mode: "onBlur",});

const onSubmit = async (data) => {
try {
  const id = data.paciente; 
  await deletePaciente(id);
  location.reload(); 
} 
catch (error) {
  console.error("Fallo al registrar:", error);
}
};

const { isLoading, isError, error, pacientes = [] } = usePaciente();  
  if (isLoading) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.message}>Cargando pacientes...</p>
        <div style={pageStyles.spinner}></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.errorMessage}>Ha ocurrido un error y no se pudieron obtener los pacientes: {error.message}</p>
      </div>
    );
  }

  if (pacientes.length === 0) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.message}>No se encontraron pacientes.</p>
      </div>
    );
  }

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.header}>Nuestros Pacientes</h1>
      <div style={pageStyles.grid}>
      <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>DNI</th>
                  <th>Direccion</th>
                  <th>Telefono</th>
                  <th>Fecha de Nacimiento</th>
                </tr>
              </thead>
              <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.id}>
                  <td>{paciente.id}</td>
                  <td>{paciente.nombre +" "+ paciente.apellido}</td>
                  <td>{paciente.dni}</td>
                  <td>{paciente.direccion}</td>
                  <td>{paciente.telefono}</td>
                  <td>{new Date(paciente.fechaNacimiento).toLocaleString()/*Como corto el tiempo*/}</td> 
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
        <label htmlFor="text">Paciente</label>
        <select
          id="paciente"
          {...register("paciente", {required:"Paciente requerido"})}
          className="form-input"
        >
        <option value="">-</option>
        {pacientes.map((p, index) => (
        <option key={index} value={p.id}>
          {p.id}
        </option>
        ))}

        </select>
        {errors.paciente && (
          <div className="error-message">{errors.paciente.message}</div>
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

export default PacienteAdmin;
