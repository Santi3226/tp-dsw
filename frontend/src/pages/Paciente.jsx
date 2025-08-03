import TabBar from "../components/Tab.jsx";
import "./Paciente.css";

const Paciente = () => {
  return (
    <div className="about-page">
        <div className="about-content">
          <h1 className="h1">Pacientes</h1>
          <p className="p">Sección dedicada a nuestros pacientes, podras gestionar tu perfil, 
            ver resultados e incluso realizar consultas de análisis y temas particulares.</p>

        <TabBar/>          

        <section className="about-section">
          <h2>Stack de tecnologías</h2>
          <ul>
            <li>
              <strong>
                <a href="https://react.dev/">React 19</a>
              </strong>
              - Librería React
            </li>
            <li>
              <strong>
                <a href="https://reactrouter.com/home">React Router DOM 7</a>
              </strong>
              - Librería para manejo de ruteo
            </li>
            <li>
              <strong>
                <a href="https://react-hook-form.com/">React Hook Form</a>
              </strong>
              - Librería para manejo de formularios
            </li>
            <li>
              <strong>
                <a href="https://tanstack.com/query/latest">React Query</a>
              </strong>
              - Librería para manejo de estados asíncronos
            </li>
            <li>
              <strong>
                <a href="https://vite.dev/">Vite</a>
              </strong>
              - Herramienta de compilación rápida y servidor de desarrollo
            </li>
            <li>
              <strong>
                <a href="https://developer.mozilla.org/es/docs/Web/CSS">CSS3</a>
              </strong>
              - Hojas de estilo en cascada
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Paciente;
