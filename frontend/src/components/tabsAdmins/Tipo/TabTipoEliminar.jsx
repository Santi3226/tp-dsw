import React from 'react';

const TabTipoEliminar = ({ registerDelete, handleSubmitDelete, errorsDelete, isSubmittingDelete, tipos = [] }) => {
  return (
    <>
      <h2 className='titulo'>Eliminar un tipo</h2>
      <form className="login-formReg" onSubmit={handleSubmitDelete} noValidate>
        <div className="form-group">
          <label htmlFor="text">Tipo</label>
          <select id="id" {...registerDelete('id', { required: 'Id requerido' })} className="form-input">
            <option value="">-</option>
            {tipos.map((p, index) => (
              <option key={index} value={p.id}>
                {p.id} - {p.nombre}
              </option>
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

export default TabTipoEliminar;
