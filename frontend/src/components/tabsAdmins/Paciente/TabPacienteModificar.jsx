import React from 'react';

const TabPacienteModificar = ({ registerModify, handleSubmitModify, errorsModify, isSubmittingModify, pacientes = [], onSubmitModify }) => {
  return (
    <>
      <h2 className='titulo'>Modificar los datos del Paciente</h2>
      <form className="login-formReg" onSubmit={handleSubmitModify(onSubmitModify)} noValidate>
        <div className="form-group">
          <label htmlFor="text">Paciente</label>
          <select id="id" {...registerModify('id', { required: 'Id requerido' })} className="form-input">
            <option value="">-</option>
            {pacientes.map((p, index) => (
              <option key={index} value={p.id}>{p.id} - {p.nombre} {p.apellido}</option>
            ))}
          </select>
          {errorsModify.id && <div className="error-message">{errorsModify.id.message}</div>}
        </div>

        <div className="form-group" id="tres">
          <label htmlFor="text">Nombre</label>
          <input type="text" id="nombre" {...registerModify('nombre')} className="form-input" />
          {errorsModify.nombre && <div className="error-message">{errorsModify.nombre.message}</div>}
        </div>

        <div className="form-group" id="cuatro">
          <label htmlFor="text">Apellido</label>
          <input type="text" id="apellido" {...registerModify('apellido')} className="form-input" />
          {errorsModify.apellido && <div className="error-message">{errorsModify.apellido.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="number">DNI</label>
          <input type="text" id="dni" {...registerModify('dni')} className="form-input" />
          {errorsModify.dni && <div className="error-message">{errorsModify.dni.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="text">Direccion</label>
          <input type="text" id="direccion" {...registerModify('direccion')} className="form-input" />
          {errorsModify.direccion && <div className="error-message">{errorsModify.direccion.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="text">Telefono</label>
          <input type="text" id="telefono" {...registerModify('telefono')} className="form-input" />
          {errorsModify.telefono && <div className="error-message">{errorsModify.telefono.message}</div>}
        </div>

        <div id="fechaNac" className="form-group">
          <label htmlFor="date">Fecha de Nacimiento</label>
          <input type="date" id="fechaNacimiento" {...registerModify('fechaNacimiento')} className="form-input" />
          {errorsModify.fechaNacimiento && <div className="error-message">{errorsModify.fechaNacimiento.message}</div>}
        </div>

        <button id="login" type="submit" className="login-btn" disabled={isSubmittingModify} style={{gridRow: 4}}>
          {isSubmittingModify ? 'Un momento...' : 'Modificar'}
        </button>
      </form>
    </>
  );
};

export default TabPacienteModificar;
