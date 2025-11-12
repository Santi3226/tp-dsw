import React from 'react';

const TabPlantillaAgregar = ({ registerAdd, handleSubmitAdd, errorsAdd, isSubmittingAdd, onSubmitAdd }) => {
  return (
    <>
      <h2 className='titulo'>Agregar una plantilla</h2>
      <form
        className="login-formReg"
        onSubmit={handleSubmitAdd(onSubmitAdd)}
        noValidate
      >
        <div className="form-group" id="uno">
          <label htmlFor="text">Hs. Ayuno</label>
          <input type="text" id="hsAyuno" {...registerAdd("hsAyuno")} className="form-input" />
          {errorsAdd.hsAyuno && <div className="error-message">{errorsAdd.hsAyuno.message}</div>}
        </div>

        <div className="form-group" id="dos">
          <label htmlFor="text">Preparacion</label>
          <input type="text" id="preparacion" {...registerAdd("preparacion")} className="form-input" />
          {errorsAdd.preparacion && <div className="error-message">{errorsAdd.preparacion.message}</div>}
        </div>
        <div className="form-group" id="tres">
          <label htmlFor="number">Tiempo Previsto (en Dias)</label>
          <input type="number" id="tiempoPrevisto" {...registerAdd("tiempoPrevisto", { required: "Tiempo previsto es requerido" })} className="form-input" />
          {errorsAdd.tiempoPrevisto && <div className="error-message">{errorsAdd.tiempoPrevisto.message}</div>}
        </div>

        <button id="login" type="submit" className="login-btn" disabled={isSubmittingAdd}>
          {isSubmittingAdd ? "Un momento..." : "Agregar"}
        </button>
      </form>
    </>
  );
};

export default TabPlantillaAgregar;
