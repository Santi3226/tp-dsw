import React from 'react';

const TabParametroAgregar = ({ registerAdd, handleSubmitAdd, errorsAdd, isSubmittingAdd, onSubmitAdd }) => {
  return (
    <>
      <h2 className='titulo'>Agregar un Parametro</h2>
      <form
        className="login-formReg"
        onSubmit={handleSubmitAdd(onSubmitAdd)}
        noValidate
      >
        <div className="form-group" id="uno">
          <label htmlFor="text">Nombre</label>
          <input
            type="text"
            id="nombre"
            {...registerAdd("nombre", { required: "Nombre requerido" })}
            className="form-input"
          />
          {errorsAdd.nombre && (
            <div className="error-message">{errorsAdd.nombre.message}</div>
          )}
        </div>

        <div className="form-group" id="dos">
          <label htmlFor="text">Referencia</label>
          <input
            type="text"
            id="referencia"
            {...registerAdd("referencia", { required: "Referencia requerida" })}
            className="form-input"
          />
          {errorsAdd.referencia && (
            <div className="error-message">{errorsAdd.referencia.message}</div>
          )}
        </div>
        <div className="form-group" id="cuatro">
          <label htmlFor="text">Unidad de Medición</label>
          <input
            type="text"
            id="unidad"
            {...registerAdd("unidad")}
            className="form-input"
          />
          {errorsAdd.unidad && (
            <div className="error-message">{errorsAdd.unidad.message}</div>
          )}
        </div>

        <button id="login" type="submit" className="login-btn" disabled={isSubmittingAdd}>
          {isSubmittingAdd ? "Un momento..." : "Agregar"}
        </button>
      </form>
    </>
  );
};

export default TabParametroAgregar;
