import React from 'react';

const TabCentroAgregar = ({ registerAdd, handleSubmitAdd, errorsAdd, isSubmittingAdd, localidades = [], onSubmitAdd }) => {
  return (
    <>
      <h2 className='titulo'>Registrar Centro</h2>
      <form
        encType="multipart/form-data"
        className="login-formReg"
        onSubmit={handleSubmitAdd(onSubmitAdd)}
        noValidate
      >
        <div className="form-group" id="dos">
          <label htmlFor="text">Nombre</label>
          <input
            type="text"
            id="nombre"
            {...registerAdd("nombre")}
            className="form-input"
          />
          {errorsAdd.nombre && (
            <div className="error-message">{errorsAdd.nombre.message}</div>
          )}
        </div>

        <div className="form-group" id="tres">
          <label htmlFor="text">Domicilio</label>
          <input
            type="text"
            id="domicilio"
            {...registerAdd("domicilio")}
            className="form-input"
          />
          {errorsAdd.domicilio && (
            <div className="error-message">{errorsAdd.domicilio.message}</div>
          )}
        </div>

        <div className="form-group" style={{ gridColumn: "1", gridRow: "2" }} id="tres">
          <label htmlFor="text">Localidad</label>
          <select
            id="localidad"
            {...registerAdd("localidad", {})}
            className="form-input"
          >
            <option value="">-</option>
            {localidades.map((p, index) => (
              <option key={index} value={p.id}>
                {p.id + " - " + p.denominacion}
              </option>
            ))}
          </select>
          {errorsAdd.localidad && (
            <div className="error-message">{errorsAdd.localidad.message}</div>
          )}
        </div>
        <button id="turno" type="submit" className="login-btn" disabled={isSubmittingAdd} style={{ gridColumn: "2", gridRow: "2" }}>
          {isSubmittingAdd ? "Un momento..." : "Registrar"}
        </button>
      </form>
    </>
  );
};

export default TabCentroAgregar;
