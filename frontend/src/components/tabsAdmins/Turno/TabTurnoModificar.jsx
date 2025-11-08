import React from 'react';

const TabTurnoModificar = ({ registerModify, handleSubmitModify, errorsModify, isSubmittingModify, turnos = [], tipos = [], centros = [], pacientes = [], horariosDisponibles = [], fechaHoraReservaModify }) => {
  return (
    <>
      <h2 className='titulo'>Modificar los datos del Turno</h2>
      <form className="login-formReg" onSubmit={handleSubmitModify} noValidate>
        <div className="form-group">
          <label htmlFor="text">Turno</label>
          <select id="id" {...registerModify('id', { required: 'Id requerido' })} className="form-input">
            <option value="">-</option>
            {turnos.map((p, index) => (
              <option key={index} value={p.id}>
                {p.id} - {p.paciente?.apellido}, {p.paciente?.nombre} - {p.tipoAnalisis?.nombre}
              </option>
            ))}
          </select>
          {errorsModify.id && <div className="error-message">{errorsModify.id.message}</div>}
        </div>

        <div className="form-group" id="uno">
          <label htmlFor="text">Tipo de Análisis</label>
          <select id="tipoAnalisis" {...registerModify('tipoAnalisis')} className="form-input">
            <option value="">-</option>
            {tipos.map((ta, index) => (
              <option key={index} value={ta.id}>{ta.id} - {ta.nombre}</option>
            ))}
          </select>
          {errorsModify.tipoAnalisis && <div className="error-message">{errorsModify.tipoAnalisis.message}</div>}
        </div>

        <div id="dos" className="form-group">
          <label htmlFor="date">Fecha del Turno</label>
          <input type="date" id="fechaHoraReserva" {...registerModify('fechaHoraReserva')} className="form-input" />
          {errorsModify.fechaHoraReserva && <div className="error-message">{errorsModify.fechaHoraReserva.message}</div>}
        </div>

        <div id="tres" className="form-group">
          {(fechaHoraReservaModify && errorsModify.fechaHoraReserva == undefined) && (
            <>
              <label htmlFor="time">Hora del Turno</label>
              <select id="horaReserva" {...registerModify('horaReserva')} className="form-input">
                <option value="">-</option>
                {horariosDisponibles.map((hora, index) => (
                  <option key={index} value={hora}>{hora}</option>
                ))}
              </select>
              {errorsModify.horaReserva && <div className="error-message">{errorsModify.horaReserva.message}</div>}
            </>
          )}
        </div>

        <div className="form-group" style={{gridColumn: "1", gridRow : "2"}} id="tres">
          <label htmlFor="text">Centro de Atención</label>
          <select id="centroAtencion" {...registerModify('centroAtencion')} className="form-input">
            <option value="">-</option>
            {centros.map((ca, index) => (
              <option key={index} value={ca.id}>{ca.nombre + ' - ' + ca.localidad?.denominacion + ', ' + ca.domicilio}</option>
            ))}
          </select>
          {errorsModify.centroAtencion && <div className="error-message">{errorsModify.centroAtencion.message}</div>}
        </div>

        <div className="form-group" style={{gridColumn: "1", gridRow : "3"}} id="tres">
          <label htmlFor="text">Paciente</label>
          <select id="paciente" {...registerModify('paciente')} className="form-input">
            <option value="">-</option>
            {pacientes.map((p, index) => (
              <option key={index} value={p.id}>{p.id + ' - ' + p.nombre + ', ' + p.apellido}</option>
            ))}
          </select>
          {errorsModify.paciente && <div className="error-message">{errorsModify.paciente.message}</div>}
        </div>

        <div className="form-options" style={{gridColumn: "1", gridRow : "4"}}>
          <label className="checkbox-label">
            <input type="checkbox" {...registerModify('recibeMail')} />
            <span>Deseo recibir Email recordatorio</span>
          </label>
        </div>

        <button id="turno" type="submit" className="login-btn" disabled={isSubmittingModify} style={{gridColumn: "2", gridRow : "4"}}>
          {isSubmittingModify ? 'Un momento...' : 'Registrar'}
        </button>
      </form>
    </>
  );
};

export default TabTurnoModificar;
