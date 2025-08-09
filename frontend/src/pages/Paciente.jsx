import TabBar from "../components/Tab.jsx";
import "./Paciente.css";
import { useParams } from 'react-router-dom';

const Paciente = () => {
  let { tab } = useParams();
  return (
    <div className="about-page">
        <div className="about-content">
          <h1 className="h1">Pacientes</h1>
          <p className="p">Sección dedicada a nuestros pacientes, podras gestionar tu perfil, 
            ver resultados e incluso realizar consultas de análisis y temas particulares.</p>
    <div className="tabPaciente">
        <TabBar inicio={tab}/>         
      </div>
    </div>
    </div>
  );
};

export default Paciente;
