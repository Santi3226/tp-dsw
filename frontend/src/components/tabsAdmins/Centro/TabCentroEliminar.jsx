import React from 'react';

const TabCentroEliminar = ({ registerDelete, handleSubmitDelete, errorsDelete, isSubmittingDelete, centros = [], onSubmitDelete }) => {
  return (
    <>
      <h2 className='titulo'>Eliminar un Centro</h2>
      <form
        className="login-formReg"
        onSubmit={handleSubmitDelete(onSubmitDelete)}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="text">Centro</label>
          <select
            id="id"
            {...registerDelete("id", { required: "Id requerido" })}
            className="form-input"
          >
            <option value="">-</option>
            {centros.map((p, index) => (
              <option key={index} value={p.id}>
                {p.id} - {p.nombre} - {p.localidad?.denominacion} - {p.domicilio}
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

export default TabCentroEliminar;
