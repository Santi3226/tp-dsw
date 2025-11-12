import { use, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { usePaciente } from '../hooks/usePacientes.js';
import './Dashboard.css';
import { useTurnos, getTurnosQuery } from '../hooks/useTurnos.js';
import { Link } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';

const Dashboard = () => {
  const { register, handleSubmit, formState: { errors: errorsAdd, isSubmittingAdd }, control } = useForm({ mode: 'onBlur' });
  const { user } = useAuth();
  const [turnosFiltrados, setTurnosFiltrados] = useState([]);
  const { pacientes = [] } = usePaciente();
  const { turnos = [] } = useTurnos();
  
  const fechaInicio = useWatch({
    control,
    name: "fechaInicio"
  });
  const fechaFin = useWatch({
    control,
    name: "fechaFin"
  });

  useEffect(() => {
    if (!fechaInicio && !fechaFin) {
      setTurnosFiltrados(turnos);
    }
  }, [turnos.length]); // Solo cuando cambia la cantidad de turnos

  useEffect(() => {
    if (!fechaInicio && !fechaFin) {
      return; 
    }
    
    const turnosFecha = async () => {
      try {
        const data = { fechaInicio, fechaFin };
        const response = await getTurnosQuery(data);
        setTurnosFiltrados(response || []);
      } catch (error) {
        console.error("Error al obtener los turnos:", error);
        setTurnosFiltrados([]);
      }
    };
    
    turnosFecha();
  }, [fechaInicio, fechaFin]);

  // useMemo trabaja tipo effect cada vez que cambia turnosFiltrados
  const { total, porcentajeMail } = useMemo(() => {
    let totalCalculado = 0;
    let totalMail = 0;
    turnosFiltrados.forEach(t => {
      totalCalculado += t.tipoAnalisis?.importe || 0;
      if (t.recibeMail === true) {
        totalMail++;
      }
    });
    const porcentaje = turnosFiltrados.length > 0 ? ((totalMail * 100) / turnosFiltrados.length).toFixed(2) : 0;
    return {
      total: totalCalculado,
      porcentajeMail: porcentaje
    };
  }, [turnosFiltrados]);

  const data = {
    totalUsers: pacientes.length,
    revenue: total,
    mail: porcentajeMail,
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Panel de control</h1>
        <p>Bienvenido nuevamente, {user?.paciente?.nombre || 'User'}!</p>
      </div>

      <form className="login-formReg" noValidate style={{ marginBottom: "40px" }}>
        <div id="fechaIni" className="form-group">
          <label htmlFor="fechaIni">Fecha de Inicio</label>
          <input
            type="date"
            id="fechaIni"
            {...register("fechaInicio")}
            className="form-input"
          />
        </div>
        <div id="fechaFin" className="form-group">
          <label htmlFor="fechaFin">Fecha de Fin</label>
          <input
            type="date"
            {...register("fechaFin")}
            id="fechaFin"
            className="form-input"
          />
        </div>
      </form>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Pacientes registrados</h3>
            <p className="stat-number">{data.totalUsers.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Ganancias registradas</h3>
            <p className="stat-number">${data.revenue.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Preferencia de Recepcion por Mails</h3>
            <p className="stat-number">{data.mail}%</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="content-card">
          <h2>Acciones</h2>
          <div className="quick-actions">
            <button className="action-btn">📊 Ver reportes</button>
            <Link className="action-btn" to="/dashboard/paciente">👥 Manejo de usuarios</Link>
            <Link className="action-btn" to="/dashboard/politica">⚙️ Configuraciones</Link>
            <a className="action-btn" href={"https://mail.google.com/mail/u/0/"}>📧 Enviar email</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;