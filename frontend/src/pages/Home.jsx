import Carrousel from "../components/Carrousel";
import "./Home.css";


const Home = () => {
  return (
    <div className="home-page">

      <div className="hero-section">
        <Carrousel />
        <p></p>
        <h1>Laboratorio Generico</h1>
        <p>
          Somos una empresa dedicada al diagnóstico clínico y al desarrollo de soluciones biotecnológicas, 
          con presencia en diversas localidades y más de 30 años de trayectoria en el sector de la salud. 
          Nuestro equipo está conformado por más de 300 profesionales altamente capacitados, distribuidos en múltiples Centros de Atención al Paciente, 
          así como en nuestras unidades especializadas de Producción, Investigación y Logística. Trabajamos con tecnología de vanguardia, procesos estandarizados y un 
          sistema de gestión integral que asegura precisión, eficiencia y confianza. 
          Cada uno de nuestros servicios representa nuestro compromiso con la salud y el bienestar.
        </p>
        <div className="hero-features">
          <div className="feature">
            <p>Aca quiero sacar esto y poner alguno de las imagenes con link</p>
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
      </div>
    </div>
  );
};

export default Home;
