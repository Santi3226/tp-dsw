import React from 'react';

const TabTurnoEliminar = ({ registerDelete, handleSubmitDelete, errorsDelete, isSubmittingDelete, turnos = [] }) => {
  return (
    <>
      <h2 className='titulo'>Eliminar un Turno</h2>
      <form className="login-formReg" onSubmit={handleSubmitDelete} noValidate>
        <div className="form-group">
          <label htmlFor="text">Turno</label>
          <select id="id" {...registerDelete('id', { required: 'Id requerido' })} className="form-input">
            <option value="">-</option>
            {turnos.map((p, index) => (
              <option key={index} value={p.id}>
                {p.id} - {p.paciente?.apellido}, {p.paciente?.nombre} - {p.tipoAnalisis?.nombre}
              </option>
            ))}
          </select>
          {errorsDelete.id && <div className="error-message">{errorsDelete.id.message}</div>}
        </div>

        <button id="borrar" type="submit" className="login-btn" disabled={isSubmittingDelete}>
          {isSubmittingDelete ? 'Un momento...' : 'Eliminar'}
        </button>
      </form>
    </>
  );
};

export default TabTurnoEliminar;
