import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();

  const mockProfile = {
    name: user?.paciente?.nombre || "Admin",
    email: user?.email || "Error retriving mail",
    telefono: user?.paciente?.telefono || "Error retriving phone",
    avatar: "👤",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: mockProfile.name,
      email: mockProfile.email,
      phone: mockProfile.telefono,
    },
  });

  const onSubmit = async () => { // LLamada a axios put y actualizar?
    return new Promise((resolve) => {
      setTimeout(() => {
        // creo q va aca la llamada
        reset();
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Perfil</h1>
        <p>Administrar la configuración y preferencias de su cuenta</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <span className="avatar">{mockProfile.avatar}</span>
          </div>

          <div className="profile-info">
            <h2>{mockProfile.name}</h2>

            <div className="profile-details">
              <div className="detail-item">
                <label>Email:</label>
                <span>{mockProfile.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-sections">
          <div className="section-card">
            <h3>Información personal</h3>
            <form
              className="profile-form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="form-group">
                <label htmlFor="name">Nombre completo</label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="form-input"
                />
                {errors.name && (
                  <div className="error-message">{errors.name.message}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Expresión regular para validar formato de email
                      message: "Not valid email",
                    },
                  })}
                  className="form-input"
                />
                {errors.email && (
                  <div className="error-message">{errors.email.message}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  className="form-input"
                />
              </div>

              <button
                type="submit"
                className="save-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Guardando..." : "Guardar cambios"}
              </button>
            </form>
          </div>

          <div className="section-card">
            <h3>Configuraciones de seguridad</h3>
            <div className="security-options">
              <div className="security-item">
                <div className="security-info">
                  <h4>Cambiar password</h4>
                  <p>Actualiza la password de su cuenta</p>
                </div>
                <button className="security-btn">Cambiar</button>
              </div>

              <div className="security-item">
                <div className="security-info">
                  <h4>Autenticación por doble factor</h4>
                  <p>Agrega un nivel extra de seguridad</p>
                </div>
                <button className="security-btn">Habilitar</button>
              </div>

              <div className="security-item">
                <div className="security-info">
                  <h4>Historial</h4>
                  <p>Ver su actividad reciente</p>
                </div>
                <button className="security-btn">Ver</button>
              </div>
            </div>
          </div>

          <div className="section-card">
            <h3>Preferencias</h3>
            <div className="preferences">
              <div className="preference-item">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Notificaciones por email</span>
                </label>
              </div>

              <div className="preference-item">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Notificaciones push</span>
                </label>
              </div>

              <div className="preference-item">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Reportes semanales</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
