import UncontrolledExample from "../components/Carrousel";
import "./Home.css";


const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Bienvenido a DSWApp</h1>
        <p>
          Un ejemplo completo de React Router con autenticación y gestión de
          sesión de usuario
        </p>
        <div className="hero-features">
          <div className="feature">
            <h3>🔐 Authenticación</h3>
            <p>Rutas protegidas con funcionalidad de inicio y cierre de sesión</p>
          </div>
          <div className="feature">
            <h3>📱 Uso de Layouts </h3>
            <p>Diferentes layouts para áreas públicas y protegidas</p>
          </div>
          <div className="feature">
            <h3>🛣️ Organización de rutas</h3>
            <p>Estructura de enrutamiento anidado</p>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Empezando</h2>
        <p>
          Esta aplicación demuestra cómo implementar React Router DOM con:
        </p>
        <ul>
          <li>Rutas públicas (Home, About)</li>
          <li>Rutas protegidas (Dashboard, Profile)</li>
          <li>Layout contenedor para rutas, usando Outlet</li>
          <li>Uso de contexto para manejo de lógica asociada a autenticación</li>
          <li>Diseño responsive y barra de navegación</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
