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
      <aside className="auth-sidebar">
        <div className="sidebar-header">
          <h2>Laboratorio Genérico</h2>
          <p>Bienvenido, {user?.paciente?.nombre || "Usuario"}!</p>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="sidebar-link">
            <span className="icon">📊</span>
            Panel de Control
          </Link>
          {user?.role === "admin" && (
            <Link to="/dashboard/products" className="sidebar-link">
              <span className="icon">🧴</span>
              Productos
            </Link>
          )}
          <Link to="/dashboard/profile" className="sidebar-link">
            <span className="icon">👤</span>
            Perfil
          </Link>
          <Link to="/" className="sidebar-link">
            <span className="icon">🏠</span>
            Volver al Inicio
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <span className="icon">🚪</span>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="auth-content">
        <header className="auth-header">
          <h1>Area Protegida</h1>
        </header>

        <div className="auth-main">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
