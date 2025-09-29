// NotFound.jsx
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="lab-background">
        <div className="beaker beaker-1"></div>
        <div className="beaker beaker-2"></div>
        <div className="microscope"></div>
        <div className="test-tube test-tube-1"></div>
        <div className="test-tube test-tube-2"></div>
      </div>
      <div className="content-wrapper">
        <h1 className="error-code">404</h1>
        <p className="error-message">¡Oh, no! La página que buscas no fue encontrada.</p>
        <p className="lab-quote">Parece que este analisis no salió como esperabamos.</p>
        <button className="back-button" onClick={() => window.history.back()}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default NotFound;