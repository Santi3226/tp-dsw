import { useEffect, useState } from 'react';
import {
  useTurnos,
  addResultados,
  getTurnosQuery,
} from '../hooks/useResultados';
import {modifyTurnos} from "../hooks/useTurnos";
import './TurnoAdmin.css';
import { useForm } from 'react-hook-form';
import { Tab } from 'bootstrap';
import Tabs from 'react-bootstrap/esm/Tabs';
import { usePaciente } from '../hooks/usePacientes';

function ResultadosAdmin() {
  const [turnosFiltrados, setTurnosFiltrados] = useState([]); //Definicion del estado
  const { isLoading, isError, error, turnos = [] } = useTurnos();
  const { pacientes = [] } = usePaciente();
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    watch,
    formState: { errors: errorsAdd, isSubmittingAdd },
  } = useForm({ mode: 'onBlur' });
  const {
    register: registerFilter,
    handleSubmit: handleSubmitFilter,
    formState: { errors: errorsFilter, isSubmittingFilter },
  } = useForm({ mode: 'onBlur' });
  
  const idSeleccionado = watch('id');

  const onSubmitAdd = async (data) => {
    try {
      console.log('Datos a enviar:', data);
      await addResultados(data);
      data.estado = "Completado";
      await modifyTurnos(data);
      location.reload();
    } catch (error) {
      console.error('Fallo al agregar:', error);
    }
  };

  const onSubmitFilter = async (data) => {
    try {
      data.estado = 'Confirmado';
      const response = await getTurnosQuery(data); //Filtrado condicional
      setTurnosFiltrados(response || []);
    } catch (error) {
      console.error('Fallo al filtrar:', error);
    }
  };

  useEffect(() => {
    // Filtrar turnos pendientes al cargar el componente
    const fetchPendientes = async () => {
      try {
        const data = { estado: 'Confirmado', fechaInicio: '', fechaFin: '' };
        const response = await getTurnosQuery(data);
        setTurnosFiltrados(response || []);
      } catch (error) {
        console.error('Error al filtrar turnos pendientes:', error);
      }
    };
    fetchPendientes();
  }, []);

  if (isLoading) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.message}>Cargando turnos...</p>
        <div style={pageStyles.spinner}></div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.message}>Cargando turnos...</p>
        <div style={pageStyles.spinner}></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.errorMessage}>
          Ha ocurrido un error y no se pudieron obtener los turnos:{' '}
          {error.message}
        </p>
      </div>
    );
  }

  if (turnosFiltrados.length === 0) {
    return (
      <div style={pageStyles.containerCentered}>
        <p style={pageStyles.message}>No se encontraron turnos.</p>
        <a href="">
          <button
            id="login"
            type="button"
            className="login-btn"
            onClick={() => window.location.reload()}
          >
            Volver
          </button>
        </a>
      </div>
    );
  }

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.header}>Turnos Pendientes de Resultados</h1>
      <div style={pageStyles.grid}>
        <table className="table">
          <thead>
            <tr>
              <th>Numero de Turno</th>
              <th>Paciente</th>
              <th>Tipo de Analisis</th>
              <th>Centro de Atencion</th>
              <th>Fecha y Hora Reserva</th>
              <th>Fecha y Hora Extraccion</th>
              <th>Estado</th>
              <th>Observación</th>
              <th>Recibe Mail</th>
            </tr>
          </thead>
          <tbody>
            {turnosFiltrados.map((turno) => (
              <tr key={turno.id}>
                <td>{turno.id}</td>
                <td>
                  {turno.paciente.apellido + ', ' + turno.paciente.nombre}
                </td>
                <td>{turno.tipoAnalisis.nombre}</td>
                <td>{turno.centroAtencion.nombre}</td>
                <td>{new Date(turno.fechaHoraReserva).toLocaleString()}</td>
                <td>
                  {new Date(turno.fechaHoraExtraccion).toLocaleString() !==
                  '31/12/1969, 09:00:00'
                    ? new Date(turno.fechaHoraExtraccion).toLocaleString()
                    : '-'}
                </td>
                <td>{turno.estado}</td>
                <td>{turno.observacion === '' ? '-' : turno.observacion}</td>
                <td>{turno.recibeMail ? 'Si' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Tabs
        defaultActiveKey="resultado"
        id="justify-tab-example"
        className="mb-3"
        justify
        style={{ marginTop: '30px' }}
      >
        <Tab eventKey="filtrar" title="Filtrar">
      <h2 className="titulo">Filtrar turnos</h2>
          <form
            className="login-formReg"
            onSubmit={handleSubmitFilter(onSubmitFilter)}
            noValidate
          >
            <div className="form-group" id="uno">
            <label htmlFor="text">Paciente</label>
            <select
              id="paciente"
              {...registerFilter("paciente")}
              className="form-input"
            >
              <option value="">-</option>
              {pacientes.map((pa, index) => (
                <option key={index} value={pa.id}>
                  {pa.id} - {pa.nombre} {pa.apellido}
                </option>
              ))}
            </select>
            {errorsFilter.paciente && (
              <div className="error-message">{errorsFilter.paciente.message}</div>
            )}
          </div>

            <div id="fechaNac" className="form-group">
              <label htmlFor="date">Fecha de Inicio</label>
              <input
                type="date"
                id="fechaInicio"
                {...registerFilter('fechaInicio', {
                  validate: (value) => {},
                })}
                className="form-input"
              />
              {errorsFilter.fechaInicio && (
                <div className="error-message">
                  {errorsFilter.fechaInicio.message}
                </div>
              )}
            </div>
            <div id="fechaNac" className="form-group">
              <label htmlFor="date">Fecha de Fin</label>
              <input
                type="date"
                id="fechaFin"
                {...registerFilter('fechaFin', {
                  validate: (value) => {},
                })}
                className="form-input"
              />
              {errorsFilter.fechaFin && (
                <div className="error-message">
                  {errorsFilter.fechaFin.message}
                </div>
              )}
            </div>

            <button
              id="login"
              type="submit"
              className="login-btn"
              disabled={isSubmittingFilter}
              style={{ alignSelf: 'center' }}
            >
              {isSubmittingFilter ? 'Un momento...' : 'Filtrar'}
            </button>
          </form>
        </Tab>

        <Tab eventKey="resultado" title="Resultado">
          <h2 className="titulo" style={{marginTop: '40px', marginBottom: '40px'}}>Cargar Resultados</h2>
          <form
            className="login-formReg"
            onSubmit={handleSubmitAdd(onSubmitAdd)}
            noValidate
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <select
              id="id"
              {...registerAdd('id', { required: 'Id requerido' })}
              className="form-input"
            >
              <option value="">-</option>
              {turnosFiltrados.map((turno) => (
                <option key={turno.id} value={turno.id}>
                  {turno.id} - {turno.paciente.apellido}, {turno.paciente.nombre} - {turno.tipoAnalisis.nombre}
                </option>
              ))}
            </select>
            {errorsAdd.id && (
              <div className="error-message">{errorsAdd.id.message}</div>
            )}

            {idSeleccionado && (
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: "50px", rowGap: "20px", marginTop: "20px"}}>
                {turnosFiltrados.find((t) => t.id === Number(idSeleccionado))
                  ?.tipoAnalisis.parametros.map((parametro) => (
                    <div key={parametro.parametroAnalisis.id} className="form-group">
                      <label htmlFor={`parametro-${parametro.parametroAnalisis.id}`}>
                        {parametro.parametroAnalisis.nombre} ({parametro.parametroAnalisis.unidad})
                      </label>
                      <input
                        type="text"
                        id={`parametro-${parametro.parametroAnalisis.id}`}
                        className="form-input"
                        {...registerAdd(
                          `resultados.${parametro.parametroAnalisis.id}`,
                          { required: true }
                        )}
                      />
                    </div>
                  ))}
              </div>
          )}

            <button
              id="login"
              type="submit"
              className="login-btn"
              disabled={isSubmittingAdd}
              style={{ gridRow: 1, marginTop: '30px' }}
            >
              {isSubmittingAdd ? 'Un momento...' : 'Registrar'}
            </button>
          </form>
        </Tab>
      </Tabs>
    </div>
  );
}

const pageStyles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  table: {
    justifyItems: 'center',
  },
  containerCentered: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  header: {
    fontSize: '2.2rem',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '0.5rem',
  },
  grid: {
    marginTop: '50px',
    display: 'flex',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Diseño responsivo en cuadrícula
    justifyItems: 'center',
  },
  message: {
    fontSize: '1.2em',
    color: '#666',
    padding: '50px 0',
  },
  errorMessage: {
    fontSize: '1.2em',
    color: '#e74c3c',
    padding: '50px 0',
  },
  spinner: {
    // Un spinner CSS simple
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeftColor: '#007bff',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
    margin: '30px auto',
  },
  retryButton: {
    backgroundColor: '#ffc107',
    color: 'black',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    fontSize: '1em',
    transition: 'background-color 0.2s ease-in-out',
  },
};

export default ResultadosAdmin;
