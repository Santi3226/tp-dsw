import React from 'react';

const TabLocalidadModificar = ({ registerModify, handleSubmitModify, errorsModify, isSubmittingModify, localidades = [], onSubmitModify }) => {
  return (
    <>
      <h2 className='titulo'>Modificar los datos de la Localidad</h2>
      <form
        className="login-formReg"
        onSubmit={handleSubmitModify(onSubmitModify)}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="text">Localidad</label>
          <select
            id="id"
            {...registerModify("id", { required: "Id requerido" })}
            className="form-input"
          >
            <option value="">-</option>
            {localidades.map((p, index) => (
              <option key={index} value={p.id}>
                {p.id} - {p.denominacion} - {p.codPostal}
              </option>
            ))}
          </select>
          {errorsModify.id && (
            <div className="error-message">{errorsModify.id.message}</div>
          )}
        </div>
        <div className="form-group" id="uno">
          <label htmlFor="text">Denominación</label>
          <input
            type="text"
            id="denominacion"
            {...registerModify("denominacion")}
            className="form-input"
          />
          {errorsModify.denominacion && (
            <div className="error-message">{errorsModify.denominacion.message}</div>
          )}
        </div>

        <div className="form-group" id="dos">
          <label htmlFor="text">Cod. Postal</label>
          <input
            type="text"
            id="codPostal"
            {...registerModify("codPostal")}
            className="form-input"
          />
          {errorsModify.codPostal && (
            <div className="error-message">{errorsModify.codPostal.message}</div>
          )}
        </div>

        <button type="submit" className="login-btn" disabled={isSubmittingModify} style={{ gridColumn: "2", gridRow: "2" }}>
          {isSubmittingModify ? "Un momento..." : "Registrar"}
        </button>
      </form>
    </>
  );
};

export default TabLocalidadModificar;
