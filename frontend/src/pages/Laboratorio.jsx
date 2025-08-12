import TabBar from "../components/TabLaboratorio.jsx";
import "./Paciente.css";
import { useParams } from 'react-router-dom';

const Laboratorio = () => {
  let { tab } = useParams();
  return (
    <div className="about-page">
        <div className="about-content">
          <h1 className="h1">Laboratorio</h1>
          <p className="p">Sección dedicada a nuestra marca, descubre todos nuestras instalaciones
            y detalles particulares como políticas y presupuestos.</p>
    <div className="tabPaciente">
        <TabBar inicio={tab}/>         
      </div>
    </div>
    </div>
  );
};

export default Laboratorio;
