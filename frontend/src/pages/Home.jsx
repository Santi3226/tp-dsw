import Carrousel from "../components/Carrousel";
import Placehold from "../components/Placeholder.jsx";
import axiosInstance from "../helpers/api.js";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">

      <div className="hero-section">
        <Carrousel />
        <p></p>
        <p style={{color:"black",fontWeight:"bold", backgroundColor:"yellow"}}>Aviso! Netlify y Render pueden tumbar el sitio por inactividad, en caso de inactividad prolongada, 
          puede que el sitio no esté disponible temporalmente (El tiempo de carga de los servicios en teoria es de 40seg)</p>   
        <h1>Laboratorio Genérico</h1>
        <p>
          Somos una empresa dedicada al diagnóstico clínico y al desarrollo de soluciones biotecnológicas, 
          con presencia en diversas localidades y más de 30 años de trayectoria en el sector de la salud. 
          Nuestro equipo está conformado por más de 300 profesionales altamente capacitados, distribuidos en múltiples Centros de Atención al Paciente, 
          así como en nuestras unidades especializadas de Producción, Investigación y Logística. Trabajamos con tecnología de vanguardia, procesos estandarizados y un 
          sistema de gestión integral que asegura precisión, eficiencia y confianza. 
          Cada uno de nuestros servicios representa nuestro compromiso con la salud y el bienestar.
        </p>
        <div className="hero-features">
          <Placehold link="laboratorio/centrosdeatencion" titulo="Novedad" boton="Leer Mas" texto="Nuevo centro de atencion disponible en Rosario." image="/centro.jpg" />
          <Placehold link="turno/registrarturno" titulo="Turnos" boton="Conseguir Turno" texto="Turnos disponibles para todas las especialidades." image="/turno.jpg" />
          <Placehold link="paciente/consultas" titulo="Contacto" boton="Consultar" texto="Tenes dudas acerca de tus turnos? Consulta las 24hs." image="/consulta.png" />
        </div>
      </div>
    </div>
  );
};

export default Home;
