import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./MainLayout.css";

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
          <div className="logo">
            <h1>Laboratorio Generico</h1>
          </div>
          <nav className="main-nav">
            <Link to="/" className="nav-link">
              Inicio
            </Link>
            <Link to="/about" className="nav-link">
              Paciente              
            </Link>
            {isAuthenticated() ? (
              <>
                <Link to="/dashboard" className="nav-link">
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
        <p>&copy; 2025 DSWApp. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
