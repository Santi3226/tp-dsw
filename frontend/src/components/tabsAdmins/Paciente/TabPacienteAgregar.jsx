import React from 'react';

const TabPacienteAgregar = ({ registerAdd, handleSubmitAdd, errorsAdd, isSubmittingAdd, onSubmitAdd }) => {
  return (
    <>
      <h2 className='titulo'>Agregar un Paciente</h2>
      <form className="login-formReg" onSubmit={handleSubmitAdd(onSubmitAdd)} noValidate>
        <div className="form-group" id="tres">
          <label htmlFor="text">Nombre</label>
          <input type="text" id="nombre" {...registerAdd('nombre', { required: 'Nombre requerido' })} className="form-input" />
          {errorsAdd.nombre && <div className="error-message">{errorsAdd.nombre.message}</div>}
        </div>

        <div className="form-group" id="cuatro">
          <label htmlFor="text">Apellido</label>
          <input type="text" id="apellido" {...registerAdd('apellido', { required: 'Apellido requerido' })} className="form-input" />
          {errorsAdd.apellido && <div className="error-message">{errorsAdd.apellido.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="number">DNI</label>
          <input type="text" id="dni" {...registerAdd('dni', { required: 'DNI requerido' })} className="form-input" />
          {errorsAdd.dni && <div className="error-message">{errorsAdd.dni.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="text">Domicilio</label>
          <input type="text" id="domicilio" {...registerAdd('domicilio', { required: 'Domicilio requerido' })} className="form-input" />
          {errorsAdd.domicilio && <div className="error-message">{errorsAdd.domicilio.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="text">Telefono</label>
          <input type="text" id="telefono" {...registerAdd('telefono', { required: 'Telefono requerido' })} className="form-input" />
          {errorsAdd.telefono && <div className="error-message">{errorsAdd.telefono.message}</div>}
        </div>

        <div id="fechaNac" className="form-group">
          <label htmlFor="date">Fecha de Nacimiento</label>
          <input type="date" id="fechaNacimiento" {...registerAdd('fechaNacimiento', { required: 'Fecha de Nacimiento requerida' })} className="form-input" />
          {errorsAdd.fechaNacimiento && <div className="error-message">{errorsAdd.fechaNacimiento.message}</div>}
        </div>

        <button id="login" type="submit" className="login-btn" disabled={isSubmittingAdd} style={{gridRow: 4}}>
          {isSubmittingAdd ? 'Un momento...' : 'Agregar'}
        </button>
      </form>
    </>
  );
};

export default TabPacienteAgregar;
