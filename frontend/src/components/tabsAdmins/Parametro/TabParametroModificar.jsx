import React from 'react';

const TabParametroModificar = ({ registerModify, handleSubmitModify, errorsModify, isSubmittingModify, parametros = [], onSubmitModify }) => {
  return (
    <>
      <h2 className='titulo'>Modificar los parametros</h2>
      <form
        className="login-formReg"
        onSubmit={handleSubmitModify(onSubmitModify)}
        noValidate
      >
        <div className="form-group" id="uno">
          <label htmlFor="text">Parametro de Analisis</label>
          <select
            id="id"
            {...registerModify("id", {
              required: "Parametro de Analisis requerido",
            })}
            className="form-input"
          >
            <option value="">-</option>
            {parametros.map((pa, index) => (
              <option key={index} value={pa.id}>
                {pa.id} - {pa.nombre}
              </option>
            ))}

          </select>
          {errorsModify.id && (
            <div className="error-message">{errorsModify.id.message}</div>
          )}
        </div>

        <div className="form-group" id="dos">
          <label htmlFor="text">Nombre</label>
          <input
            type="text"
            id="nombre"
            {...registerModify("nombre")}
            className="form-input"
          />
          {errorsModify.nombre && (
            <div className="error-message">{errorsModify.nombre.message}</div>
          )}
        </div>

        <div className="form-group" id="tres">
          <label htmlFor="text">Referencia</label>
          <input
            type="text"
            id="referencia"
            {...registerModify("referencia")}
            className="form-input"
          />
          {errorsModify.referencia && (
            <div className="error-message">{errorsModify.referencia.message}</div>
          )}
        </div>
        <div className="form-group" style={{gridRow:"2", gridColumn:"2"}}>
          <label htmlFor="text">Unidad de Medición</label>
          <input
            type="text"
            id="unidad"
            {...registerModify("unidad")}
            className="form-input"
          />
          {errorsModify.unidad && (
            <div className="error-message">{errorsModify.unidad.message}</div>
          )}
        </div>

        <button id="login" type="submit" className="login-btn" disabled={isSubmittingModify} style={{gridRow:"3", gridColumn:"2"}}>
          {isSubmittingModify ? "Un momento..." : "Modificar"}
        </button>
      </form>
    </>
  );
};

export default TabParametroModificar;
