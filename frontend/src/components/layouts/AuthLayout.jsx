import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./AuthLayout.css";

const AuthLayout = () => {

  return (
    <div className="auth-layout">
      <header className="auth-sidebar">
        <div className="sidebar-header">
        <nav className="sidebar-nav">
          <h2>Laboratorio Genérico</h2>
          <Link to="/dashboard" className="sidebar-link">
            <span className="icon">📊</span>
            Panel de Control
          </Link>
          <Link to="/dashboard/turno" className="sidebar-link">
            <span className="icon">👨‍🔬</span>
            Turnos
          </Link>
          <Link to="/dashboard/muestras" className="sidebar-link">
            <span className="icon">🧪</span>
            Muestras
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
          <Link to="/dashboard/parametroAnalisis" className="sidebar-link">
            <span className="icon">🩸</span>
            Parametros de Analisis
          </Link>
          <Link to="/dashboard/politica" className="sidebar-link">
            <span className="icon">🛠</span>
            Politicas
          </Link>
          <Link to="/dashboard/plantillaAnalisis" className="sidebar-link">
            <span className="icon">📄</span>
            Plantillas de Analisis
          </Link>
          <Link style={{ background: "rgba(231, 76, 60, 0.8)" }} to="/" className="sidebar-link">
            <span className="icon">🏠</span>
            Volver al Inicio
          </Link>
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
