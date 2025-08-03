import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Drop from './Dropdown.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tab.css';

function TabBar(props) {
  return (
    <Tabs
      defaultActiveKey="preparacion"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="preparacion" title="Preparación">
          <h2>Consultar preparación</h2>
          <p>Seleccionar tipo de análisis</p>
          <Drop titulo="paciente" uno="Preparacion" dos="Gestion de Paciente" tres="Resultados" cuatro="Consultas"/>
          <div className='prep'>
              <p>Horas de Ayuno</p> <p>Dummy 2hs</p>
              <p>Tiempo Espera Previsto</p> <p>Dummy 2hs</p>
              <p>Preparación</p> <p>Dummy Text</p>
          </div>
      </Tab>
      <Tab eventKey="gestion" title="Gestión de Paciente">
        Tab content for Profile
      </Tab>
      <Tab eventKey="resultado" title="Resultados">
        Tab content for Loooonger Tab
      </Tab>
      <Tab eventKey="consulta" title="Consultas">
        Tab content for Contact
      </Tab>
    </Tabs>
  );
}

export default TabBar;