import { use } from 'react';
import { useAuth } from '../hooks/useAuth';
import { usePaciente } from '../hooks/usePacientes.js';
import './Dashboard.css';
import { useTurnos } from '../hooks/useTurnos.js';
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const { user } = useAuth();
  const { pacientes = [] } = usePaciente();
  const { turnos = [] } = useTurnos();
  
  let total = 0;
  let mail = 0;
  
  turnos.forEach(t => {
    total += t.tipoAnalisis.importe;
    if (t.recibeMail === true) {
      mail++;
    }
  });


  const mockData = {
    totalUsers: pacientes.length,
    revenue: total,
    mail: (mail*100/turnos.length).toFixed(2) || 0,
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Panel de control</h1>
        <p>Bienvenido nuevamente, {user?.paciente?.nombre || 'User'}!</p>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total de Pacientes registrados</h3>
            <p className="stat-number">{mockData.totalUsers.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Ganancias historicas registradas</h3>
            <p className="stat-number">${mockData.revenue.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Preferencia de Recepcion por Mails</h3>
            <p className="stat-number">{mockData.mail}%</p>
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