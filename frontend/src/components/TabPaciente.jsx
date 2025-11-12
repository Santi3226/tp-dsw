import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../pages/Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tab.css';
import TabPreparacion from './tabsUsers/TabPacientePreparacion';
import TabGestionPaciente from './tabsUsers/TabPacienteGestion';
import TabConsultas from './tabsUsers/TabPacienteConsultas';

function TabBar(props) {
  const { inicio } = props;

  return (
    <Tabs defaultActiveKey={inicio} id="justify-tab-example" className="mb-3" justify>
      <Tab eventKey="preparacion" title="Preparación">
        <TabPreparacion />
      </Tab>
      <Tab eventKey="gestiondepaciente" title="Gestión de Paciente">
        <TabGestionPaciente />
      </Tab>
      <Tab eventKey="consultas" title="Consultas">
        <TabConsultas />
      </Tab>
    </Tabs>
  );
}

export default TabBar;