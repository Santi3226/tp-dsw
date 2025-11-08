import React from 'react';

const TabTipoAgregar = ({ registerAdd, handleSubmitAdd, errorsAdd, isSubmittingAdd, plantillaAnalisis = [] }) => {
  return (
    <>
      <h2 className='titulo'>Agregar un tipo</h2>
      <form className="login-formReg" onSubmit={handleSubmitAdd} noValidate>
        <div className="form-group" id="uno">
          <label htmlFor="text">Nombre</label>
          <input type="text" id="nombreA" {...registerAdd('nombre', { required: 'Nombre requerido' })} className="form-input" />
          {errorsAdd.nombre && <div className="error-message">{errorsAdd.nombre.message}</div>}
        </div>

        <div className="form-group" id="dos">
          <label htmlFor="text">Importe</label>
          <input type="text" id="importe" {...registerAdd('importe', { required: 'Importe requerido' })} className="form-input" />
          {errorsAdd.importe && <div className="error-message">{errorsAdd.importe.message}</div>}
        </div>

        <div className="form-group" id="tres">
          <label htmlFor="text">Nro. de Plantilla</label>
          <select id="plantillaAnalisis" {...registerAdd('plantillaAnalisis')} className="form-input">
            <option value="">-</option>
            {plantillaAnalisis.map((pa, index) => (
              <option key={index} value={pa.id}>
                {pa.id} - {pa.hsAyuno} - {pa.tiempoPrevisto} dias - {new Date(pa.fechaDesde).toLocaleDateString()}
              </option>
            ))}
          </select>
          {errorsAdd.plantillaAnalisis && <div className="error-message">{errorsAdd.plantillaAnalisis.message}</div>}
        </div>

        <button id="login" type="submit" className="login-btn" disabled={isSubmittingAdd}>
          {isSubmittingAdd ? 'Un momento...' : 'Agregar'}
        </button>
      </form>
    </>
  );
};

export default TabTipoAgregar;
