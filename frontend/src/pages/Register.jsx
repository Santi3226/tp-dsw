import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import "./Register.css";

const Register = () => {
  const { login, errorLogin } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    await login(data)
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Registro</h1>
          <p>Ingrese los datos de su nueva cuenta</p>
        </div>
        <form
          className="login-formReg"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="form-group" id="uno">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email es requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Expresión regular para validar formato de email
                  message: "Formato de email no válido",
                },
              })}
              placeholder="Ej: mail@mail.com"
              className="form-input"
              autoComplete="email"
            />
            {errors.email && (
              <div className="error-message">{errors.email.message}</div>
            )}
          </div>

          <div className="form-group" id="dos">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password es requerido" })}
              placeholder="Password"
              className="form-input"
              autoComplete="current-password"
            />
            {errors.password && (
              <div className="error-message">{errors.password.message}</div>
            )}
          </div>
          <div className="form-group" id="tres">
          <label htmlFor="text">Nombre</label>
          <input
              type="text"
              id="nombre"
              {...register("nombre", {
                required: "Nombre es requerido",
              })}
              placeholder="Nombre"
              className="form-input"
            />
            {errors.nombre && (
              <div className="error-message">{errors.nombre.message}</div>
            )}
            </div>
            <div className="form-group" id="cuatro">
            <label htmlFor="text">Apellido</label>
            <input
              type="text"
              id="apellido"
              {...register("apellido", {
                required: "Apellido es requerido",
                },
                )}
              placeholder="Apellido"
              className="form-input"
            />
            {errors.apellido && (
              <div className="error-message">{errors.apellido.message}</div>
            )}</div>
            <div className="form-group">
            <label htmlFor="number">DNI</label>
            <input
              type="text"
              id="dni"
              {...register("dni", {
                required: "Dni es requerido",
                pattern: {
                  value: /^\d{8}$/, // Expresión regular para validar dni
                  message: "Formato de dni no válido",
                },
              })}
              placeholder="DNI (Sin puntos o simbolos)"
              className="form-input"
            />
            {errors.dni && (
              <div className="error-message">{errors.dni.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="text">Direccion</label>
            <input
              type="text"
              id="direccion"
              {...register("direccion", {
                required: "Direccion es requerida",
              })}
              placeholder="Direccion"
              className="form-input"
            />
            {errors.direccion && (
              <div className="error-message">{errors.direccion.message}</div>
            )}
          </div>
          <div id="fechaNac" className="form-group">
            <label htmlFor="date">Fecha de Nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              {...register("fechaNacimiento", {
                required: "Fecha de Nacimiento es requerida",
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
            {errors.fechaNacimiento && (
              <div className="error-message">{errors.fechaNacimiento.message}</div>
            )}
          </div>
          
          <button id="login" type="submit" className="login-btn" disabled={isSubmitting}>
            {isSubmitting ? "Un momento..." : "Registrar"}
          </button>
          {errorLogin && <div className="error-message">{errorLogin}</div>}
          <Link to="/"id="return" className="login-btn">
              Inicio
            </Link>
        </form>
        <div className="login-footer">
          <p>
            Ya tiene una cuenta?{" "}
            <Link to="/login" className="register-link">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
