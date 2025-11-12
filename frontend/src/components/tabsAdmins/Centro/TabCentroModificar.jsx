import React from 'react';

const TabCentroModificar = ({ registerModify, handleSubmitModify, errorsModify, isSubmittingModify, centros = [], localidades = [], onSubmitModify }) => {
  return (
    <>
      <h2 className='titulo'>Modificar los datos del Centro</h2>
      <form
        className="login-formReg"
        onSubmit={handleSubmitModify(onSubmitModify)}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="text">Centro</label>
          <select
            id="id"
            {...registerModify("id", { required: "Id requerido" })}
            className="form-input"
          >
            <option value="">-</option>
            {centros.map((p, index) => (
              <option key={index} value={p.id}>
                {p.id} - {p.nombre} - {p.localidad?.denominacion} - {p.domicilio}
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
          <label htmlFor="text">Domicilio</label>
          <input
            type="text"
            id="domicilio"
            {...registerModify("domicilio")}
            className="form-input"
          />
          {errorsModify.domicilio && (
            <div className="error-message">{errorsModify.domicilio.message}</div>
          )}
        </div>

        <div className="form-group" style={{ gridColumn: "2", gridRow: "2" }} id="tres">
          <label htmlFor="text">Localidad</label>
          <select
            id="localidad"
            {...registerModify("localidad", {})}
            className="form-input"
          >
            <option value="">-</option>
            {localidades.map((p, index) => (
              <option key={index} value={p.id}>
                {p.id + " - " + p.denominacion}
              </option>
            ))}
          </select>
          {errorsModify.localidad && (
            <div className="error-message">{errorsModify.localidad.message}</div>
          )}
        </div>
        <button type="submit" className="login-btn" disabled={isSubmittingModify} style={{ gridColumn: "2", gridRow: "3" }}>
          {isSubmittingModify ? "Un momento..." : "Registrar"}
        </button>
      </form>
    </>
  );
};

export default TabCentroModificar;
