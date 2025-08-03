import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./MainLayout.css";
import Drop from "../Dropdown.jsx";

const MainLayout = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="main-layout">
      <header className="main-header">
        <div className="header-content">
          <img className="logo" src="/logo.png" alt="Logo" href="/home"/>
          <div className="titulo">
            <h1>Laboratorio Generico</h1>
          </div>
          <nav className="main-nav">
            <Drop titulo="paciente" uno="Preparacion" dos="Gestion de Paciente" tres="Resultados" cuatro="Consultas" />
            <Drop titulo="turno" uno="Gestion de Turnos" dos="Resultados"/>
            <Drop titulo="algo mas?" uno="-" dos="-"/>
            {isAuthenticated() ? (
              <>
              <Link to="/dashboard" className="dashboard-btn">
                Dashboard
              </Link>
                <button onClick={handleLogout} className="logout-btn">
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link to="/login" className="nav-link login-btn">
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="main-footer">
        <p> Laboratorio Generico © Todos los derechos reservados. | Sitio desarrollado por Santiago Dedich.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
