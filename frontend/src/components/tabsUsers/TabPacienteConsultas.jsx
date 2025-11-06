import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth.js';
import '../../pages/Register.css';
import '../Tab.css';

const TabConsultas = (props) => {
  const { user, errorLogin } = useAuth();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    // No implementado
    console.log('Consulta enviada', data);
  };

  return (
    <>
      <h2 className="titulo">Consultas generales (Fuera del alcance - no implementado)</h2>
      <form className="login-formReg" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group" id="uno">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register('email')} 
          defaultValue={user?.email} className="form-input" />
        </div>

        <div className="form-group" id="tres">
          <label htmlFor="text">Nombre</label>
          <input type="text" id="nombre" {...register('nombre')} 
          defaultValue={user?.paciente?.nombre} className="form-input" />
        </div>

        <div className="form-group" id="cuatro">
          <label htmlFor="text">Apellido</label>
          <input type="text" id="apellido" {...register('apellido')} 
          defaultValue={user?.paciente?.apellido} className="form-input" />
        </div>

        <div className="form-group">
          <label htmlFor="text">DNI</label>
          <input type="text" id="dni" {...register('dni')} 
          defaultValue={user?.paciente?.dni} className="form-input" />
        </div>

        <div className="form-group">
          <label htmlFor="text">Consulta</label>
          <textarea id="consulta" {...register('consulta')} 
          placeholder='Constatá tu consulta aquí:' className="form-input" />
        </div>

        <div className="form-group">
          <label htmlFor="text">Telefono</label>
          <input type="text" id="telefono" {...register('telefono')} 
          defaultValue={user?.paciente?.telefono} className="form-input" />
        </div>

        <button id="login" type="submit" className="login-btn" style={{ gridRow: 4 }} disabled={isSubmitting}>
          {isSubmitting ? 'Un momento...' : 'Consultar'}
        </button>
        {errorLogin && <div className="error-message">{errorLogin}</div>}
      </form>
    </>
  );
};

export default TabConsultas;
