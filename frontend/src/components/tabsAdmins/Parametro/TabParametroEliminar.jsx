import React from 'react';

const TabParametroEliminar = ({ registerDelete, handleSubmitDelete, errorsDelete, isSubmittingDelete, parametros = [], onSubmitDelete }) => {
  return (
    <>
      <h2 className='titulo'>Eliminar un Parametro</h2>
      <form
        className="login-formReg"
        onSubmit={handleSubmitDelete(onSubmitDelete)}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="text">Parametro</label>
          <select
            id="id"
            {...registerDelete("id", { required: "Parametro requerido" })}
            className="form-input"
          >
            <option value="">-</option>
            {parametros.map((p, index) => (
              <option key={index} value={p.id}>
                {p.id} - {p.nombre}
              </option>
            ))}

          </select>
          {errorsDelete.parametroAnalisis && (
            <div className="error-message">{errorsDelete.parametroAnalisis.message}</div>
          )}
        </div>

        <button id="borrar" type="submit" className="login-btn" disabled={isSubmittingDelete}>
          {isSubmittingDelete ? "Un momento..." : "Eliminar"}
        </button>
      </form>
    </>
  );
};

export default TabParametroEliminar;
