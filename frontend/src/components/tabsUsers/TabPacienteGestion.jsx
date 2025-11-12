import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth.js';
import '../../pages/Register.css';
import '../Tab.css';

const TabGestionPaciente = () => {
  const { modify, user, errorLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' });

  const onSubmitModify = async (data) => {
    const finalData = { ...user };
    finalData.paciente = { ...user.paciente };
    for (const key in data) {
      const value = data[key];
      if (value !== '' && value !== null && value !== undefined) {
        if (['email', 'contraseña'].includes(key)) {
          finalData[key] = value;
        } else {
          finalData.paciente[key] = value;
        }
      }
    }

    try {
      finalData.id = user.id;
      finalData.paciente.id = user.paciente.id;
      await modify(finalData);
    } catch (error) {
      console.error('Fallo al modificar:', error);
    }
  };

  return (
    <>
      <h2 className="titulo">Modificar los datos del Paciente</h2>
      <form className="login-formReg" onSubmit={handleSubmit(onSubmitModify)} noValidate>
        <div className="form-group" id="uno">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              pattern: {
                value: undefined || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Formato de email no válido',
              },
            })}
            placeholder={user?.email}
            className="form-input"
          />
          {errors.email && <div className="error-message">{errors.email.message}</div>}
        </div>

        <div className="form-group" id="dos">
          <label htmlFor="contraseña">Password</label>
          <input type="password" id="password" {...register('contraseña')} placeholder="**********" className="form-input" />
          {errors.password && <div className="error-message">{errors.password.message}</div>}
        </div>

        <div className="form-group" id="tres">
          <label htmlFor="text">Nombre</label>
          <input type="text" id="nombre" {...register('nombre')} placeholder={user?.paciente?.nombre} className="form-input" />
          {errors.nombre && <div className="error-message">{errors.nombre.message}</div>}
        </div>

        <div className="form-group" id="cuatro">
          <label htmlFor="text">Apellido</label>
          <input type="text" id="apellido" {...register('apellido')} placeholder={user?.paciente?.apellido} className="form-input" />
          {errors.apellido && <div className="error-message">{errors.apellido.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="number">DNI</label>
          <input
            type="text"
            id="dni"
            {...register('dni', {
              pattern: {
                value: undefined || /^\d{8}$/, // Expresión regular para validar dni
                message: 'Formato de dni no válido',
              },
            })}
            placeholder={user?.paciente?.dni}
            className="form-input"
          />
          {errors.dni && <div className="error-message">{errors.dni.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="text">Direccion</label>
          <input type="text" id="direccion" {...register('direccion')} placeholder={user?.paciente?.direccion} className="form-input" />
          {errors.direccion && <div className="error-message">{errors.direccion.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="text">Telefono</label>
          <input type="text" id="telefono" {...register('telefono')} placeholder={user?.paciente?.telefono} className="form-input" />
          {errors.direccion && <div className="error-message">{errors.direccion.message}</div>}
        </div>

        <div id="fechaNac" className="form-group">
          <label htmlFor="date">Fecha de Nacimiento</label>
          <input
            type="date"
            id="fechaNacimiento"
            {...register('fechaNacimiento', {
              validate: (value) => {
                const selectedDate = new Date(value);
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);
                if (selectedDate > currentDate) {
                  return 'Fecha de nacimiento inválida';
                }
                return true;
              },
            })}
            className="form-input"
          />
          {errors.fechaNacimiento && <div className="error-message">{errors.fechaNacimiento.message}</div>}
        </div>

        <button id="login" type="submit" className="login-btn" disabled={isSubmitting} style={{ gridRow: 5 }}>
          {isSubmitting ? 'Un momento...' : 'Modificar'}
        </button>
        {errorLogin && <div className="error-message">{errorLogin}</div>}
      </form>
    </>
  );
};

export default TabGestionPaciente;
