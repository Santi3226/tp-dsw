import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./MainLayout.css";
import Drop from "../Dropdown.jsx";
import { LogOut } from 'lucide-react';

const MainLayout = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="main-layout">
      <header className="main-header">
        <div className="header-content">
          <Link to="/">
            <img className="logo" src="/logo.png" alt="Logo" />
          </Link>
          <Link style={{textDecoration:"none"}} className="titulo" to="/">
            <div className="titulo">
              <h1 >{"Laboratorio\nGenérico"}</h1>
            </div>
          </Link>

          <nav className="main-nav">
            <Link to="/paciente/gestiondepaciente" className="dashboard-btn">Paciente</Link>
            <Link to="/turno/gestiondeturnos" className="dashboard-btn">Turno</Link>
            <Link to="/laboratorio/centrosdeatencion" className="dashboard-btn">Laboratorio</Link>

            {(isAuthenticated() && user?.role === "admin") && (
              <Link to="/dashboard" className="dashboard-btn">Dashboard</Link>
            )}

            {isAuthenticated() ? (
              <button onClick={handleLogout} className="logout-btn" style={{marginRight:'20px'}}>
                <LogOut className="btn-icon" /> Cerrar sesión
              </button>
            ) : (
              <Link to="/login" className="nav-link login-btn">Iniciar Sesión</Link>
            )}
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="main-footer">
        <p>Laboratorio Generico © Todos los derechos reservados. | Sitio desarrollado por Santiago Dedich.</p>
      </footer>
    </div>
  );
};

/*
const MainLayout = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const checkNavOverflow = () => {
      if (navRef.current) {
        const hasOverflow = navRef.current.scrollWidth > navRef.current.clientWidth;
        setIsOverflowing(hasOverflow);
      }
    };

    checkNavOverflow();
    window.addEventListener('resize', checkNavOverflow);
    
    return () => window.removeEventListener('resize', checkNavOverflow);
  }, []);

  return (
    <div className="main-layout">
      <header className="main-header">
        <div className="header-content">
          <Link to="/">
            <img className="logo" src="/logo.png" alt="Logo" />
          </Link>
          <Link className="titulo" to="/">
            <div className="titulo">
              <h1 style={{textDecoration:"none"}}>{"Laboratorio\nGenérico"}</h1>
            </div>
          </Link>
          
          <nav ref={navRef} className="main-nav">
            {!isOverflowing ? (
              // Dropdowns sin overflow
              <>
                <Drop className="drop first-nav-item" titulo="paciente" uno="Preparacion" dos="Gestion de Paciente" tres="Consultas" />
                <Drop className="drop" titulo="turno" uno="Gestion de Turnos" dos="Registrar Turno" tres="Resultados"/>
                <Drop className="drop" titulo="laboratorio" uno="Centros de Atencion" dos="Presupuestos" tres="Politicas"/>
              </>
            ) : (
              // Botones con overflow
              <>
                <Link to="/paciente" className="nav-link overflow-btn first-nav-item">
                  Paciente
                </Link>
                <Link to="/turno" className="nav-link overflow-btn">
                  Turno
                </Link>
                <Link to="/laboratorio" className="nav-link overflow-btn">
                  Laboratorio
                </Link>
              </>
            )}
           
            {(isAuthenticated() && user.role === "admin") && (
              <Link to="/dashboard" className="dashboard-btn">
                Dashboard
              </Link>
            )}
           
            {isAuthenticated() ? (
              <button onClick={handleLogout} className="logout-btn" style={{'marginRight':'20px'}}>
                <LogOut className="btn-icon" />
                Cerrar sesión
              </button>
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
        <p>Laboratorio Generico © Todos los derechos reservados. | Sitio desarrollado por Santiago Dedich.</p>
      </footer>
    </div>
  );
};
*/
export default MainLayout;