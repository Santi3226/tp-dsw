import React from 'react';

const TabResultadoCargar = ({ registerAdd, handleSubmitAdd, errorsAdd, isSubmittingAdd, turnosFiltrados = [], idSeleccionado, onSubmitAdd }) => {
  return (
    <>
      <h2 className="titulo" style={{ marginTop: '40px', marginBottom: '40px' }}>Cargar Resultados</h2>
      <form
        className="login-formReg"
        onSubmit={handleSubmitAdd(onSubmitAdd)}
        noValidate
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <label htmlFor="text">Turno</label>
        <select id="id" {...registerAdd('id', { required: 'Id requerido' })} className="form-input">
          <option value="">-</option>
          {turnosFiltrados.map((turno) => (
            <option key={turno.id} value={turno.id}>
              {turno.id} - {turno.paciente.apellido}, {turno.paciente.nombre} - {turno.tipoAnalisis.nombre}
            </option>
          ))}
        </select>
        {errorsAdd.id && <div className="error-message">{errorsAdd.id.message}</div>}

        {idSeleccionado && (
          <div className="parametros">
            {turnosFiltrados
              .find((t) => t.id === Number(idSeleccionado))
              ?.tipoAnalisis.parametros.map((parametro) => (
                <div key={parametro.parametroAnalisis.id} className="form-group">
                  <label htmlFor={`parametro-${parametro.parametroAnalisis.id}`}>
                    {parametro.parametroAnalisis.nombre} ({parametro.parametroAnalisis.unidad})
                  </label>
                  <input
                    type="text"
                    id={`parametro-${parametro.parametroAnalisis.id}`}
                    className="form-input"
                    {...registerAdd(`resultados.${parametro.parametroAnalisis.id}`, { required: true })}
                  />
                </div>
              ))}
          </div>
        )}

        <button id="login" type="submit" className="login-btn" disabled={isSubmittingAdd} style={{ gridRow: 1, marginTop: '30px' }}>
          {isSubmittingAdd ? 'Un momento...' : 'Registrar'}
        </button>
      </form>
    </>
  );
};

export default TabResultadoCargar;
