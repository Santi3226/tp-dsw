import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>Acerca de DSWApp</h1>
        <p>Conoce más acerca de esta aplicación React</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Descripción general del proyecto</h2>
          <p>
            Este es un ejemplo completo de la implementación de React Router DOM
            que muestra los patrones modernos de React y las mejores prácticas
            para crear aplicaciones escalables.
          </p>
        </section>

        <section className="about-section">
          <h2>Características principales</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🔐 Sistema de autenticación</h3>
              <p>Autenticación basada en contexto con rutas protegidas</p>
            </div>
            <div className="feature-card">
              <h3>📱 Layouts</h3>
              <p>Layouts separados para páginas públicas y privadas</p>
            </div>
            <div className="feature-card">
              <h3>🛣️ Enrutamiento anidado</h3>
              <p>Organización de rutas limpias con relaciones padre-hijo</p>
            </div>
            <div className="feature-card">
              <h3>🎨 Diseño UI</h3>
              <p>Diseño responsive con CSS Grid and Flexbox</p>
            </div>
            <div className="feature-card">
              <h3>⫘ React Hook Form</h3>
              <p>Biblioteca para manejo de formularios basada en hooks</p>
            </div>
            <div className="feature-card">
              <h3>⏲ React Query</h3>
              <p>Biblioteca para manejo de estados asíncronos</p>
            </div>
          </div>
        </section>

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

export default About;
