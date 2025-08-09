import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Drop from './Dropdown.jsx';
import axiosInstance from '../helpers/api'
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth.js";
import '../pages/Register.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tab.css';
import { useEffect, useState } from 'react';

function TabBar(props) {
  const {user} = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm({mode: "onBlur",});
  const [errorLogin, setErrorLogin] = useState(null);
  
  const onSubmit = async (data) => {
  try {
    await registturno(data);
  } 
  catch (error) {
    console.error("Fallo al registrar:", error);
  }
  };

  const [centros, setCentros] = useState([]);
  const [tiposAnalisis, setTiposAnalisis] = useState([]); 
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const getDatos = async () => {
      try {
        const centros = await axiosInstance.get('/centroAtencion');
        setCentros(centros.data.data); 
        const tipos = await axiosInstance.get('/tipoAnalisis'); 
        setTiposAnalisis(tipos.data.data);
        const turnos = await axiosInstance.get('/tipoAnalisis'); //Filtrar por usuario?
        setTurnos(tipos.data.data);

      } catch (error) {
        console.error("Error al obtener los centros de atención:", error);
      }
    };
    getDatos();
  }, []); //Recolector de datos

  const registturno = async (data) => {
    console.log(data.receta);
    setErrorLogin(null);
    const formData = new FormData();
    formData.append('receta', data.receta[0]);
    formData.append('recibeMail', data.recibeMail);
    formData.append('estado', 'Pendiente');
    formData.append('observacion', '');
    formData.append('fechaHoraExtraccion', data.fechaHoraExtraccion);
    formData.append('paciente', user.paciente.id);
    formData.append('centroAtencion', data.centroAtencion);
    formData.append('tipoAnalisis', data.tipoAnalisis);
    try {
      const route = "/turno";
      const response = await axiosInstance.post(
        route,
        formData
      );
      alert("Turno creado Correctamente!");
    } catch (error) {
        console.error("Error en AuthProvider:", error);
        if (error.response && error.response.data && error.response.data.message) {
            setErrorLogin(error.response.data.message);
        } else {
            setErrorLogin("Error de red o del servidor. Por favor, inténtalo de nuevo.");
        }
         throw error;
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
      <Tab eventKey="gestiondeturnos" title="Gestion de Turnos">
          <h2 className='titulo'>Gestionar turnos</h2>
          <p>Mis Turnos</p>
          
          <div className='prep'>
              <p>Horas de Ayuno</p> <p>Dummy 2hs</p>
              <p>Tiempo Espera Previsto</p> <p>Dummy 2hs</p>
              <p>Preparación</p> <p>Dummy Text</p>
          </div>
      </Tab>
      <Tab eventKey="registrarturno" title="Registrar Turno">
          <h2 className='titulo'>Registrar Turno</h2>
          <form
          enctype="multipart/form-data"
          className="login-formReg"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >

          <div className="form-group" id="uno">
            <label htmlFor="text">Tipo de Analisis</label>
            <select
              id="tipoAnalisis"
              
              {...register("tipoAnalisis", {
                required:"Tipo de Analisis requerido",
                pattern: {
                },
              })}
              className="form-input"
            >
            <option value="">-</option>
            {tiposAnalisis.map((ta, index) => (
            <option key={index} value={ta.id}>
              {ta.nombre}
            </option>
            ))}

            </select> 
            {errors.tipoAnalisis && (
              <div className="error-message">{errors.tipoAnalisis.message}</div>
            )}
          </div>

            <div id="dos" className="form-group">
            <label htmlFor="date">Fecha del Turno</label>
            <input
              type="datetime-local"
              id="fechaHoraExtraccion"
              {...register("fechaHoraExtraccion", { //Necesito ingresar un date time
                required:"Fecha requerida",
                validate: (value) => {
                  const selectedDate = new Date(value); //Aca puedo validar la disponibilidad
                  const currentDate = new Date();
                  currentDate.setHours(0, 0, 0, 0);
                  if (selectedDate < currentDate) {
                    return "Fecha de turno inválida";
                  }
                  return true;
                },
              })}
              className="form-input"
            />
          </div>
            {errors.fechaHoraExtraccion && (
              <div className="error-message">{errors.fechaHoraExtraccion.message}</div>
            )}
          <div className="form-group">
            <label htmlFor="text">Centro de Atencion</label>
            <select
              id="centroAtencion"
              
              {...register("centroAtencion", {
                required:"Centro requerido",
                pattern: {
                },
              })}
              className="form-input"
            >
            <option value="">-</option>
            {centros.map((ca, index) => (
            <option key={index} value={ca.id}>
              {ca.nombre+" - "+ca.localidad.denominacion+", "+ca.domicilio}
            </option>
            ))}

            </select>
            {errors.centroAtencion && (
              <div className="error-message">{errors.centroAtencion.message}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="file">Receta</label> 
            <input type="file"
            accept="image/*" 
            name="receta" 
            {...register("receta",
              {
                required:"Receta requerida",
                validate:{
                isImage: (value) => {
                // Si no se seleccionó ningún archivo, la validación pasa (será manejada por 'required')
                if (!value[0]) {
                  return true;
                }
                const fileType = value[0].type;
                const acceptedImageTypes = ['image/jpeg','image/jpg','image/png'];
                return acceptedImageTypes.includes(fileType) || "El archivo debe ser una imagen (JPG, PNG).";
              }
            }
          })}
            />
            {errors.receta && (
              <div className="error-message">{errors.receta.message}</div>
            )}
          </div>
          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" {...register("recibeMail")} />
              <span>Deseo recibir Email recordatorio</span>
            </label>
          </div>
          <button id="turno" type="submit" className="login-btn" disabled={isSubmitting}>
            {isSubmitting ? "Un momento..." : "Registrar"}
          </button>
          {errorLogin && <div className="error-message">{errorLogin}</div>}
        </form>
      </Tab>
      <Tab eventKey="resultados" title="Resultados">
        <h2 className='titulo'>Resultados disponibles</h2>
      </Tab>
    </Tabs>
  );
}

export default TabBar;