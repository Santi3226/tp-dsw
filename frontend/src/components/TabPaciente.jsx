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

  const [tiposAnalisis, setTiposAnalisis] = useState([]); 
  const [tipoAnalisisSeleccionado, setTipoAnalisisSeleccionado] = useState('');

  useEffect(() => {
    const getDatos = async () => {
      try {
        const tipos = await axiosInstance.get('/tipoAnalisis'); 
        setTiposAnalisis(tipos.data.data);

      } catch (error) {
        console.error("Error al obtener los centros de atención:", error);
      }
    };
    getDatos();
  }, []); //Recolector de datos

const handleSelectChange = (event) => {
  setTipoAnalisisSeleccionado(event.target.value);
}; 

const analisisElegido = tiposAnalisis.find(ta => ta.id === Number(tipoAnalisisSeleccionado));

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
      <Tab eventKey="preparacion" title="Preparación">
          <h2 className='titulo'>Consultar preparación</h2>
          <p>Seleccionar tipo de análisis</p>
            <select
              id="tipoAnalisis"
              className="form-input"
              value={tipoAnalisisSeleccionado} // Esto controla el valor del select
              onChange={handleSelectChange} 
            >
            <option value="">-</option>
            {tiposAnalisis.map((ta, index) => (
            <option key={index} value={ta.id}>
              {ta.nombre}
            </option>
            ))}
            </select>
            
            {analisisElegido && analisisElegido.plantillaAnalisis && (
            <div style={{ marginTop: '20px' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Atributo</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                {Object.entries(analisisElegido.plantillaAnalisis).map(([key, value]) => {
                  if (key === 'tiempoPrevisto') {
                    return (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{value.toString() + " días"}</td>
                      </tr>
                    );
                  } else if (key !== 'id' && typeof value !== 'object' && key !== 'fechaDesde') {
                    return (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{value.toString()}</td>
                      </tr>
                    );
                  }
                  return null;
                })}
                </tbody>
              </table>
            </div>
          )}

      </Tab>
      <Tab eventKey="gestiondepaciente" title="Gestión de Paciente">
        <h2 className='titulo'>Modificar los datos del Paciente</h2>
          <form
          className="login-formReg"
          onSubmit={handleSubmit(onSubmitModify)}
          noValidate
        >
          <div className="form-group" id="uno">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                pattern: {
                  value: undefined||/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Expresión regular para validar formato de email
                  message: "Formato de email no válido",
                },
              })}
              placeholder={user?.email}
              className="form-input"
            />
            {errors.email && (
              <div className="error-message">{errors.email.message}</div>
            )}
          </div>

          <div className="form-group" id="dos">
            <label htmlFor="contraseña">Password</label>
            <input
              type="password"
              id="password"
              {...register("contraseña")}
              placeholder="**********"
              className="form-input"
            />
            {errors.password && (
              <div className="error-message">{errors.password.message}</div>
            )}
          </div>
          <div className="form-group" id="tres">
          <label htmlFor="text">Nombre</label>
          <input
              type="text"
              id="nombre"
              {...register("nombre")}
              placeholder={user?.paciente?.nombre}
              className="form-input"
            />
            {errors.nombre && (
              <div className="error-message">{errors.nombre.message}</div>
            )}
            </div>
            <div className="form-group" id="cuatro">
            <label htmlFor="text">Apellido</label>
            <input
              type="text"
              id="apellido"
              {...register("apellido")}
              placeholder={user?.paciente?.apellido}
              className="form-input"
            />
            {errors.apellido && (
              <div className="error-message">{errors.apellido.message}</div>
            )}</div>
            <div className="form-group">
            <label htmlFor="number">DNI</label>
            <input
              type="text"
              id="dni"
              {...register("dni", {
                pattern: {
                  value: undefined||/^\d{8}$/, // Expresión regular para validar dni
                  message: "Formato de dni no válido",
                },
              })}
              placeholder={user?.paciente?.dni}
              className="form-input"
            />
            {errors.dni && (
              <div className="error-message">{errors.dni.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="text">Direccion</label>
            <input
              type="text"
              id="direccion"
              {...register("direccion")}
              placeholder={user?.paciente?.direccion}
              className="form-input"
            />
            {errors.direccion && (
              <div className="error-message">{errors.direccion.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="text">Telefono</label>
            <input
              type="text"
              id="telefono"
              {...register("telefono", {
              })}
              placeholder={user?.paciente?.telefono}
              className="form-input"
            />
            {errors.direccion && (
              <div className="error-message">{errors.direccion.message}</div>
            )}
          </div>
          <div id="fechaNac" className="form-group">
            <label htmlFor="date">Fecha de Nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              {...register("fechaNacimiento", {
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const currentDate = new Date();
                  currentDate.setHours(0, 0, 0, 0);
                  if (selectedDate > currentDate) {
                    return "Fecha de nacimiento inválida";
                  }
                  return true;
                },
              })}
              className="form-input"
            />
            {errors.fechaNacimiento && (
              <div className="error-message">{errors.fechaNacimiento.message}</div>
            )}
          </div>
          
          <button id="login" type="submit" className="login-btn" disabled={isSubmitting} style={{gridRow: 5}}>
            {isSubmitting ? "Un momento..." : "Modificar"}
          </button>
          {errorLogin && <div className="error-message">{errorLogin}</div>}
        </form>

      </Tab>
      <Tab eventKey="consultas" title="Consultas">
        <h2 className='titulo'>Consultas generales</h2>
        <form
          className="login-formReg"
          onSubmit={handleSubmit(onSubmitConsult)}
          noValidate
        >
          <div className="form-group" id="uno">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Expresión regular para validar formato de email
                  message: "Formato de email no válido",
                },
              })}
              defaultValue={user?.email}
              className="form-input"
            />
            {errors.email && (
              <div className="error-message">{errors.email.message}</div>
            )}
          </div>
          <div className="form-group" id="tres">
          <label htmlFor="text">Nombre</label>
          <input
              type="text"
              id="nombre"
              {...register("nombre",{
                required:"Nombre requerido",
              })}
              defaultValue={user?.paciente?.nombre}
              className="form-input"
            />
            {errors.nombre && (
              <div className="error-message">{errors.nombre.message}</div>
            )}
            </div>
            <div className="form-group" id="cuatro">
            <label htmlFor="text">Apellido</label>
            <input
              type="text"
              id="apellido"
              {...register("apellido",{
                required:"Apellido requerido",
              })}
              defaultValue={user?.paciente?.apellido}
              className="form-input"
            />
            {errors.apellido && (
              <div className="error-message">{errors.apellido.message}</div>
            )}</div>
            <div className="form-group">
            <label htmlFor="text">DNI</label>
            <input
              type="text"
              id="dni"
              {...register("dni", {
                required: "DNI requerido",
                pattern: {
                  value: /^\d{8}$/, // Expresión regular para validar dni
                  message: "Formato de dni no válido",
                },
              })}
              defaultValue={user?.paciente?.dni}
              className="form-input"
            />
            {errors.dni && (
              <div className="error-message">{errors.dni.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="text">Consulta</label>
            <textarea
              type="text"
              id="consulta"
              {...register("consulta", {
                required:"Consulta requerida",
              })}
              placeholder='Constatá tu consulta aquí:'
              className="form-input"
            />
            {errors.consulta && (
              <div className="error-message">{errors.consulta.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="text">Telefono</label>
            <input
              type="text"
              id="telefono"
              {...register("telefono", {
                required:"Telefono requerido",
              })}
              defaultValue={user?.paciente?.telefono}
              className="form-input"
            />
            {errors.telefono && (
              <div className="error-message">{errors.telefono.message}</div>
            )}
          </div>
          <button id="login" type="submit" className="login-btn" style={{gridRow: 4}} disabled={isSubmitting}>
            {isSubmitting ? "Un momento..." : "Consultar"}
          </button>
          {errorLogin && <div className="error-message">{errorLogin}</div>}
        </form>
      </Tab>
    </Tabs>
  );
}

export default TabBar;