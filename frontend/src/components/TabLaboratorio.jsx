import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../pages/Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tab.css';
import './Mapa.css';
import axiosInstance from '../helpers/api.js';
import TabLaboratorioCentros from './tabsUsers/TabLaboratorioCentros';
import TabLaboratorioPresupuesto from './tabsUsers/TabLaboratorioPresupuesto';
import TabLaboratorioPoliticas from './tabsUsers/TabLaboratorioPoliticas';

// Componente TabBar principal
function TabBar(props) {

  const { inicio } = props;

  return (
    <Tabs defaultActiveKey={inicio} id="justify-tab-example" className="mb-3" justify>
      <Tab eventKey="centrosdeatencion" title="Centros de Atención">
        <TabLaboratorioCentros />
      </Tab>
      <Tab eventKey="presupuesto" title="Presupuestos">
        <TabLaboratorioPresupuesto />
      </Tab>
      <Tab eventKey="politicas" title="Políticas">
        <TabLaboratorioPoliticas />
      </Tab>
    </Tabs>
  );
}

export default TabBar;