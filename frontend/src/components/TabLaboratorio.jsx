import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth.js";
import '../pages/Register.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tab.css';
import { useEffect, useState } from 'react';
import axiosInstance from '../helpers/api.js';

function TabBar(props) {
  const { modify , user, errorLogin } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm({mode: "onBlur",});
  
  const onSubmitModify = async (data) => {
    const finalData = { ...user };
    finalData.paciente = { ...user.paciente };
    for (const key in data) {
        const value = data[key];
        if (value !== "" && value !== null && value !== undefined) {
            if (['email', 'contraseña'].includes(key)) {
                finalData[key] = value;
            } else {
                finalData.paciente[key] = value;
            }
        }
    }
  try {
    finalData.id=user.id;
    finalData.paciente.id=user.paciente.id;
    await modify(finalData);
    navigate("/login");
  } 
  catch (error) {
    console.error("Fallo al modificar:", error);
  }
  };

  const [politicas, setPoliticas] = useState([]); 

  useEffect(() => {
    const getDatos = async () => {
      try {
        const politicas = await axiosInstance.get('/politica'); 
        setPoliticas(politicas.data.data);
        console.log(politicas.data.data);
      } catch (error) {
        console.error("Error al obtener los centros de atención:", error);
      }
    };
    getDatos();
  }, []); //Recolector de datos

  const onSubmitConsult = async (data) => {
    try {
    alert("En teoria, mandaste una consulta, felicitaciones crack!");
  } 
  catch (error) {
    console.error("Fallo al consultar:", error);
  }
  };
  
  const {inicio} = props; 
  return (
    <Tabs
      defaultActiveKey={inicio}
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="centrosdeatencion" title="Centros de Atencion">
          <h2 className='titulo'>Nuestras instalaciones</h2>
         <div style={{display:"block"}}>
         <div className='divFoto'><img className='foto' src="/frente-1.jpg" alt="centro1" /></div>
         <div className='columna'>Yapp yapp yappiti yapp
        </div>
         </div>
        
        
      </Tab>

      <Tab eventKey="presupuesto" title="Presupuestos">
        <h2 className='titulo'>Presupuestos</h2>
        

      </Tab>

      <Tab eventKey="politicas" title="Politicas">
        <h2 className='titulo'>Politicas de la Empresa</h2>
            {politicas && (
            <div style={{ marginTop: '20px' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Dias de Habilitacion de Turnos</th>
                    <th>Hora de Inicio para Turnos</th>
                    <th>Hora de Fin para Turnos</th>
                  </tr>
                </thead>
                <tbody>
                  {politicas.map((politicas) => {
                return (
                <tr key={politicas.id}>
                  <td>{politicas.diaHabilitacionTurnos.toString() + " dias posteriores"}</td>
                  <td>{politicas.horaInicioTurnos}</td>
                  <td>{politicas.horaFinTurnos}</td>
                </tr>
              );
              })}
                </tbody>
              </table>
            </div>
            )}
      </Tab>

    </Tabs>
  );
}

export default TabBar;