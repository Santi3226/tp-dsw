import React from 'react';

const TabLocalidadEliminar = ({ registerDelete, handleSubmitDelete, errorsDelete, isSubmittingDelete, localidades = [], onSubmitDelete }) => {
  return (
    <>
      <h2 className='titulo'>Eliminar una Localidad</h2>
      <form
        className="login-formReg"
        onSubmit={handleSubmitDelete(onSubmitDelete)}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="text">Localidad</label>
          <select
            id="id"
            {...registerDelete("id", { required: "Id requerido" })}
            className="form-input"
          >
            <option value="">-</option>
            {localidades.map((p, index) => (
              <option key={index} value={p.id}>
                {p.id} - {p.denominacion} - {p.codPostal}
              </option>
            ))}
          </select>
          {errorsDelete.id && (
            <div className="error-message">{errorsDelete.id.message}</div>
          )}
        </div>

        <button id="borrar" type="submit" className="login-btn" disabled={isSubmittingDelete}>
          {isSubmittingDelete ? "Un momento..." : "Eliminar"}
        </button>
      </form>
    </>
  );
};

export default TabLocalidadEliminar;
