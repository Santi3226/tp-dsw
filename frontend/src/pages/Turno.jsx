import TabBar from "../components/TabTurno.jsx";
import "./Turno.css";
import { useParams } from 'react-router-dom';

const Paciente = () => {
  let { tab } = useParams();
  return (
    <div className="about-page">
        <div className="about-content">
          <h1 className="h1">Turno</h1>
          <p className="p">Sección dedicada a nuestros turnos, solicita tu proximo turno en Example Brand Laboratorios, 
            o consulta aquellos ya reservados.</p>
    <div className="tabPaciente">
        <TabBar inicio={tab}/>         
      </div>
    </div>
    </div>
  );
};

export default Paciente;
