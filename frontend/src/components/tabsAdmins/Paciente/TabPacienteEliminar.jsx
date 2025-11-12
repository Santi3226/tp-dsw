import React from 'react';

const TabPacienteEliminar = ({ registerDelete, handleSubmitDelete, errorsDelete, isSubmittingDelete, pacientes = [], onSubmitDelete }) => {
  return (
    <>
      <h2 className='titulo'>Eliminar un Paciente</h2>
      <form className="login-formReg" onSubmit={handleSubmitDelete(onSubmitDelete)} noValidate>
        <div className="form-group">
          <label htmlFor="text">Paciente</label>
          <select id="id" {...registerDelete('id', { required: 'Id requerido' })} className="form-input">
            <option value="">-</option>
            {pacientes.map((p, index) => (
              <option key={index} value={p.id}>{p.id} - {p.nombre} {p.apellido}</option>
            ))}
          </select>
          {errorsDelete.tipoAnalisis && <div className="error-message">{errorsDelete.tipoAnalisis.message}</div>}
        </div>

        <button id="borrar" type="submit" className="login-btn" disabled={isSubmittingDelete}>
          {isSubmittingDelete ? 'Un momento...' : 'Eliminar'}
        </button>
      </form>
    </>
  );
};

export default TabPacienteEliminar;
