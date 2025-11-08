import React from 'react';

const TabParametroVincular = ({ registerVinculo, handleSubmitVinculo, errorsVinculo, isSubmittingVinculo, parametros = [], tipos = [], onSubmitVinculo }) => {
  return (
    <>
      <h2 className='titulo'>Vincular un Parametro y un Tipo de Análisis</h2>
      <form
        className="login-formReg"
        onSubmit={handleSubmitVinculo(onSubmitVinculo)}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="text">Parámetro de Análisis</label>
          <select
            id="parametroAnalisis"
            {...registerVinculo("parametroAnalisis", { required: "Parámetro de Análisis requerido" })}
            className="form-input"
          >
            <option value="">-</option>
            {parametros.map((p, index) => (
              <option key={index} value={p.id}>
                {p.id} - {p.nombre}
              </option>
            ))}

          </select>
          {errorsVinculo.parametroAnalisis && (
            <div className="error-message">{errorsVinculo.parametroAnalisis.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="text">Tipo de Análisis</label>
          <select
            id="tipoAnalisis"
            {...registerVinculo("tipoAnalisis", { required: "Tipo de Análisis requerido" })}
            className="form-input"
          >
            <option value="">-</option>
            {tipos.map((t, index) => (
              <option key={index} value={t.id}>
                {t.id} - {t.nombre}
              </option>
            ))}

          </select>
          {errorsVinculo.tipoAnalisis && (
            <div className="error-message">{errorsVinculo.tipoAnalisis.message}</div>
          )}
        </div>

        <button id="vincular" type="submit" className="login-btn" disabled={isSubmittingVinculo}>
          {isSubmittingVinculo ? "Un momento..." : "Vincular"}
        </button>
      </form>
    </>
  );
};

export default TabParametroVincular;
