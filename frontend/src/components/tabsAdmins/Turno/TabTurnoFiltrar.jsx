import React from 'react';

const TabTurnoFiltrar = ({ registerFilter, handleSubmitFilter, errorsFilter, isSubmittingFilter, pacientes = [] }) => {
  return (
    <>
      <h2 className="titulo">Filtrar turnos</h2>
      <form className="login-formReg" onSubmit={handleSubmitFilter} noValidate>
        <div className="form-group" id="uno">
          <label htmlFor="text">Paciente</label>
          <select id="paciente" {...registerFilter('paciente')} className="form-input">
            <option value="">-</option>
            {pacientes.map((pa, index) => (
              <option key={index} value={pa.id}>
                {pa.id} - {pa.nombre} {pa.apellido}
              </option>
            ))}
          </select>
          {errorsFilter.paciente && <div className="error-message">{errorsFilter.paciente.message}</div>}
        </div>

        <div id="fechaNac" className="form-group">
          <label htmlFor="date">Fecha de Inicio</label>
          <input type="date" id="fechaInicio" {...registerFilter('fechaInicio')} className="form-input" />
          {errorsFilter.fechaInicio && <div className="error-message">{errorsFilter.fechaInicio.message}</div>}
        </div>

        <div id="fechaNac" className="form-group">
          <label htmlFor="date">Fecha de Fin</label>
          <input type="date" id="fechaFin" {...registerFilter('fechaFin')} className="form-input" />
          {errorsFilter.fechaFin && <div className="error-message">{errorsFilter.fechaFin.message}</div>}
        </div>

        <button id="login" type="submit" className="login-btn" disabled={isSubmittingFilter} style={{ alignSelf: 'center' }}>
          {isSubmittingFilter ? 'Un momento...' : 'Filtrar'}
        </button>
      </form>
    </>
  );
};

export default TabTurnoFiltrar;
