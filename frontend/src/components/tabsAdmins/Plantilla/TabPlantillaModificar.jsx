import React from 'react';

const TabPlantillaModificar = ({ registerModify, handleSubmitModify, errorsModify, isSubmittingModify, plantillas = [], onSubmitModify }) => {
  return (
    <>
      <h2 className='titulo'>Modificar las plantillas</h2>
      <form
        className="login-formReg"
        onSubmit={handleSubmitModify(onSubmitModify)}
        noValidate
      >
        <div className="form-group" id="uno">
          <label htmlFor="text">Id Plantilla de Analisis</label>
          <select
            id="id"
            {...registerModify("id", { required: "Id del Plantilla de Analisis requerido" })}
            className="form-input"
          >
            <option value="">-</option>
            {plantillas.map((ta, index) => (
              <option key={index} value={ta.id}>{ta.id}</option>
            ))}
          </select>
          {errorsModify.id && (
            <div className="error-message">{errorsModify.id.message}</div>
          )}
        </div>

        <div className="form-group" id="dos">
          <label htmlFor="text">Hs Ayuno</label>
          <input type="text" id="hsAyuno" {...registerModify("hsAyuno")} className="form-input" />
          {errorsModify.hsAyuno && <div className="error-message">{errorsModify.hsAyuno.message}</div>}
        </div>

        <div className="form-group" id="tres">
          <label htmlFor="text">Preparacion</label>
          <input type="text" id="preparacion" {...registerModify("preparacion")} className="form-input" />
          {errorsModify.preparacion && <div className="error-message">{errorsModify.preparacion.message}</div>}
        </div>
        <div className="form-group" style={{gridRow:"2", gridColumn:"2"}}>
          <label htmlFor="number">Tiempo Previsto (en Dias)</label>
          <input type="number" id="tiempoPrevisto" {...registerModify("tiempoPrevisto")} className="form-input" />
          {errorsModify.tiempoPrevisto && <div className="error-message">{errorsModify.tiempoPrevisto.message}</div>}
        </div>

        <button id="login" type="submit" className="login-btn" disabled={isSubmittingModify} style={{gridRow:"3", gridColumn:"2"}}>
          {isSubmittingModify ? "Un momento..." : "Modificar"}
        </button>
      </form>
    </>
  );
};

export default TabPlantillaModificar;
