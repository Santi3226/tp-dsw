import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./AuthLayout.css";

const AuthLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="auth-layout">
      <header className="auth-sidebar">
        <div className="sidebar-header">
        <nav className="sidebar-nav">
          <h2>Laboratorio Genérico</h2>
          <p>Bienvenido, {user?.paciente?.nombre || "Usuario"}!</p>
          <Link to="/dashboard" className="sidebar-link">
            <span className="icon">📊</span>
            Panel de Control
          </Link>
          <Link to="/dashboard/turno" className="sidebar-link">
            <span className="icon">👨‍🔬</span>
            Turnos
          </Link>
          <Link to="/dashboard/resultado" className="sidebar-link">
            <span className="icon">📄</span>
            Resultados
          </Link>
          <Link to="/dashboard/centro" className="sidebar-link">
            <span className="icon">🏥</span>
            Centros
          </Link>
          <Link to="/dashboard/paciente" className="sidebar-link">
            <span className="icon">🧍‍♂️</span>
            Pacientes
          </Link>
          <Link to="/dashboard/tipoAnalisis" className="sidebar-link">
            <span className="icon">💉</span>
            Tipos de Analisis
          </Link>
          <Link to="/dashboard/politica" className="sidebar-link">
            <span className="icon">🛠</span>
            Politicas
          </Link>
          <Link to="/dashboard/profile" className="sidebar-link">
            <span className="icon">👤</span>
            Perfil
          </Link>
          <Link to="/" className="sidebar-link">
            <span className="icon">🏠</span>
            Volver al Inicio
          </Link>
             <button onClick={handleLogout} className="logout-btn">
            <span className="icon">🚫 </span>
            Cerrar sesión
          </button>
        </nav>
     
      </div>
      </header>

      <main className="auth-content">

        <div className="auth-main">
          <Outlet />
        </div>
      </main>
        <footer className="main-footer">
        <p> Laboratorio Generico © Todos los derechos reservados. | Sitio desarrollado por Santiago Dedich.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
