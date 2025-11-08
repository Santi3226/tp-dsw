import React from 'react';

const TabPlantillaEliminar = ({ registerDelete, handleSubmitDelete, errorsDelete, isSubmittingDelete, plantillas = [], onSubmitDelete }) => {
  return (
    <>
      <h2 className='titulo'>Eliminar una plantilla</h2>
      <form
        className="login-formReg"
        onSubmit={handleSubmitDelete(onSubmitDelete)}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="text">Plantilla</label>
          <select
            id="id"
            {...registerDelete("id", { required: "Id requerido" })}
            className="form-input"
          >
            <option value="">-</option>
            {plantillas.map((p, index) => (
              <option key={index} value={p.id}>{p.id}</option>
            ))}
          </select>
          {errorsDelete.plantilla && (
            <div className="error-message">{errorsDelete.plantilla.message}</div>
          )}
        </div>

        <button id="borrar" type="submit" className="login-btn" disabled={isSubmittingDelete}>
          {isSubmittingDelete ? "Un momento..." : "Eliminar"}
        </button>
      </form>
    </>
  );
};

export default TabPlantillaEliminar;
