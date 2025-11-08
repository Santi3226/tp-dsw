import React from 'react';

const TabTipoModificar = ({ registerModify, handleSubmitModify, errorsModify, isSubmittingModify, tipos = [], plantillaAnalisis = [] }) => {
  return (
    <>
      <h2 className='titulo'>Modificar los tipos</h2>
      <form className="login-formReg" onSubmit={handleSubmitModify} noValidate>
        <div className="form-group" id="uno">
          <label htmlFor="text">Tipo de Analisis</label>
          <select id="id" {...registerModify('id', { required: 'Tipo de Analisis requerido' })} className="form-input">
            <option value="">-</option>
            {tipos.map((ta, index) => (
              <option key={index} value={ta.id}>
                {ta.id} - {ta.nombre}
              </option>
            ))}
          </select>
          {errorsModify.id && <div className="error-message">{errorsModify.id.message}</div>}
        </div>

        <div className="form-group" id="dos">
          <label htmlFor="text">Nombre</label>
          <input type="text" id="nombre" {...registerModify('nombre')} className="form-input" />
          {errorsModify.nombre && <div className="error-message">{errorsModify.nombre.message}</div>}
        </div>

        <div className="form-group" id="tres">
          <label htmlFor="text">Importe</label>
          <input type="text" id="importe" {...registerModify('importe')} className="form-input" />
          {errorsModify.importe && <div className="error-message">{errorsModify.importe.message}</div>}
        </div>

        <div className="form-group" id="cuatro">
          <label htmlFor="text">Nro. de Plantilla</label>
          <select id="plantillaAnalisis" {...registerModify('plantillaAnalisis')} className="form-input">
            <option value="">-</option>
            {plantillaAnalisis.map((pa, index) => (
              <option key={index} value={pa.id}>
                {pa.id}
              </option>
            ))}
          </select>
          {errorsModify.plantillaAnalisis && <div className="error-message">{errorsModify.plantillaAnalisis.message}</div>}
        </div>

        <button id="login" type="submit" className="login-btn" disabled={isSubmittingModify}>
          {isSubmittingModify ? 'Un momento...' : 'Modificar'}
        </button>
      </form>
    </>
  );
};

export default TabTipoModificar;
