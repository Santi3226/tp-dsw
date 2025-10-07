import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./MainLayout.css";
import Drop from "../Dropdown.jsx";
import { Menu, X, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';

const MainLayout = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const {user} = useAuth();

  return (
    <div className="main-layout">
      <header className="main-header">
        <div className="header-content">
          <Link to="/">
          <img className="logo" src="/logo.png" alt="Logo" href="/"/>
          </Link>
          <div className="titulo">
            <h1>{"Laboratorio\nGenérico"}</h1>
          </div>
          <nav className="main-nav">
            <Drop className="drop" titulo="paciente" uno="Preparacion" dos="Gestion de Paciente" tres="Consultas" />
            <Drop className="drop" titulo="turno" uno="Gestion de Turnos" dos="Registrar Turno" tres="Resultados"/>
            <Drop className="drop" titulo="laboratorio" uno="Centros de Atencion" dos="Presupuestos" tres="Politicas"/>
            {(isAuthenticated() && user.role==="admin")  && (
              <>
                <Link to="/dashboard" className="dashboard-btn">
                Dashboard
              </Link>
            </>)}
            
            {isAuthenticated()  ? (
              <>
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut className="btn-icon" />
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link to="/login" className="nav-link login-btn">
                Iniciar Sesión
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
