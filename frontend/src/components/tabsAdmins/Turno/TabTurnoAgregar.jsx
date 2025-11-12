import React from 'react';

const TabTurnoAgregar = ({ registerAdd, handleSubmitAdd, errorsAdd, isSubmittingAdd, tipos = [], centros = [], pacientes = [], horariosDisponibles = [], fechaHoraReserva }) => {
  return (
    <>
      <h2 className='titulo'>Registrar Turno</h2>
      <form encType="multipart/form-data" className="login-formReg" onSubmit={handleSubmitAdd} noValidate>
        <div className="form-group" id="uno">
          <label htmlFor="text">Tipo de Análisis</label>
          <select id="tipoAnalisis" {...registerAdd('tipoAnalisis')} className="form-input">
            <option value="">-</option>
            {tipos.map((ta, index) => (
              <option key={index} value={ta.id}>{ta.id} - {ta.nombre}</option>
            ))}
          </select>
          {errorsAdd.tipoAnalisis && <div className="error-message">{errorsAdd.tipoAnalisis.message}</div>}
        </div>

        <div id="dos" className="form-group">
          <label htmlFor="date">Fecha del Turno</label>
          <input type="date" id="fechaHoraReserva" {...registerAdd('fechaHoraReserva')} className="form-input" />
          {errorsAdd.fechaHoraReserva && <div className="error-message">{errorsAdd.fechaHoraReserva.message}</div>}
        </div>

        <div id="tres" className="form-group">
          {(fechaHoraReserva && errorsAdd.fechaHoraReserva == undefined) && (
            <>
              <label htmlFor="time">Hora del Turno</label>
              <select id="horaReserva" {...registerAdd('horaReserva')} className="form-input">
                <option value="">-</option>
                {horariosDisponibles.map((hora, index) => (
                  <option key={index} value={hora}>{hora}</option>
                ))}
              </select>
              {errorsAdd.horaReserva && <div className="error-message">{errorsAdd.horaReserva.message}</div>}
            </>
          )}
        </div>

        <div className="form-group" style={{gridColumn: "1", gridRow : "2"}} id="tres">
          <label htmlFor="text">Centro de Atención</label>
          <select id="centroAtencion" {...registerAdd('centroAtencion')} className="form-input">
            <option value="">-</option>
            {centros.map((ca, index) => (
              <option key={index} value={ca.id}>{ca.nombre + ' - ' + ca.localidad?.denominacion + ', ' + ca.domicilio}</option>
            ))}
          </select>
          {errorsAdd.centroAtencion && <div className="error-message">{errorsAdd.centroAtencion.message}</div>}
        </div>

        <div className="form-group" style={{gridColumn: "1", gridRow : "3"}} id="tres">
          <label htmlFor="text">Paciente</label>
          <select id="paciente" {...registerAdd('paciente')} className="form-input">
            <option value="">-</option>
            {pacientes.map((p, index) => (
              <option key={index} value={p.id}>{p.id + ' - ' + p.nombre + ', ' + p.apellido}</option>
            ))}
          </select>
          {errorsAdd.paciente && <div className="error-message">{errorsAdd.paciente.message}</div>}
        </div>

        <div className="form-group" style={{gridColumn: "2", gridRow : "3"}}>
          <label htmlFor="file">Receta</label>
          <input type="file" accept="image/*" name="receta" {...registerAdd('receta')} />
          {errorsAdd.receta && <div className="error-message">{errorsAdd.receta.message}</div>}
        </div>

        <div className="form-options" style={{gridColumn: "1", gridRow : "4"}}>
          <label className="checkbox-label">
            <input type="checkbox" {...registerAdd('recibeMail')} />
            <span>Deseo recibir Email recordatorio</span>
          </label>
        </div>

        <button id="turno" type="submit" className="login-btn" disabled={isSubmittingAdd} style={{gridColumn: "2", gridRow : "4"}}>
          {isSubmittingAdd ? 'Un momento...' : 'Registrar'}
        </button>
      </form>
    </>
  );
};

export default TabTurnoAgregar;
