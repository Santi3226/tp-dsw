import React from 'react';

const TabLocalidadAgregar = ({ registerAdd, handleSubmitAdd, errorsAdd, isSubmittingAdd, onSubmitAdd }) => {
  return (
    <>
      <h2 className='titulo'>Registrar Localidad</h2>
      <form
        encType="multipart/form-data"
        className="login-formReg"
        onSubmit={handleSubmitAdd(onSubmitAdd)}
        noValidate
      >
        <div className="form-group" id="uno">
          <label htmlFor="text">Denominación</label>
          <input
            type="text"
            id="denominacion"
            {...registerAdd("denominacion")}
            className="form-input"
          />
          {errorsAdd.denominacion && (
            <div className="error-message">{errorsAdd.denominacion.message}</div>
          )}
        </div>

        <div className="form-group" id="dos">
          <label htmlFor="text">Cod. Postal</label>
          <input
            type="text"
            id="codPostal"
            {...registerAdd("codPostal")}
            className="form-input"
          />
          {errorsAdd.codPostal && (
            <div className="error-message">{errorsAdd.codPostal.message}</div>
          )}
        </div>

        <button id="turno" type="submit" className="login-btn" disabled={isSubmittingAdd} style={{ gridColumn: "2", gridRow: "2" }}>
          {isSubmittingAdd ? "Un momento..." : "Registrar"}
        </button>
      </form>
    </>
  );
};

export default TabLocalidadAgregar;
