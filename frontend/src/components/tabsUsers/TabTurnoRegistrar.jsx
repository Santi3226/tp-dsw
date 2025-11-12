import React from 'react';

const TabTurnoRegistrar = ({ tipos = [], centros = [], registerAdd, handleSubmitAdd, onSubmitAdd, errorsAdd, isSubmittingAdd, horariosDisponibles, watchFecha }) => {
  return (
    <>
      <h2 className='titulo'>Registrar Turno</h2>
      <form
        encType="multipart/form-data"
        className="login-formReg"
        onSubmit={handleSubmitAdd(onSubmitAdd)}
        noValidate
      >
        <div className="form-group" id="uno">
          <label htmlFor="text">Tipo de Análisis</label>
          <select id="tipoAnalisis" {...registerAdd("tipoAnalisis", { required: "Tipo de Análisis requerido" })} className="form-input">
            <option value="">-</option>
            {tipos.map((ta, index) => (
              <option key={index} value={ta.id}>{ta.id} - {ta.nombre}</option>
            ))}
          </select>
          {errorsAdd.tipoAnalisis && (<div className="error-message">{errorsAdd.tipoAnalisis.message}</div>)}
        </div>

        <div id="dos" className="form-group">
          <label htmlFor="date">Fecha del Turno</label>
          <input type="date" id="fechaHoraReserva" {...registerAdd("fechaHoraReserva", { required: "Fecha requerida", validate: (value) => {
                const selectedDate = new Date(value);
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);
                if (selectedDate < currentDate) {
                  return "Fecha de turno inválida";
                }
                return true;
              }, })} className="form-input" />
          {errorsAdd.fechaHoraReserva && (<div className="error-message">{errorsAdd.fechaHoraReserva.message}</div>)}
        </div>

        <div id="tres" className="form-group">
          {(watchFecha && !errorsAdd.fechaHoraReserva) && (
            <>
              <label htmlFor="time">Hora del Turno</label>
              <select id="horaReserva" {...registerAdd("horaReserva", { required: "Hora requerida" })} className="form-input">
                <option value="">-</option>
                {horariosDisponibles.map((hora, index) => (
                  <option key={index} value={hora}>{hora}</option>
                ))}
              </select>
              {errorsAdd.horaReserva && (<div className="error-message">{errorsAdd.horaReserva.message}</div>)}
            </>
          )}
        </div>

        <div className="form-group" style={{gridColumn: "1", gridRow : "2"}} id="tres">
          <label htmlFor="text">Centro de Atención</label>
          <select id="centroAtencion" {...registerAdd("centroAtencion", { required: "Centro requerido" })} className="form-input">
            <option value="">-</option>
            {centros.map((ca, index) => (
              <option key={index} value={ca.id}>{ca.nombre + " - " + ca.localidad?.denominacion + ", " + ca.domicilio}</option>
            ))}
          </select>
          {errorsAdd.centroAtencion && (<div className="error-message">{errorsAdd.centroAtencion.message}</div>)}
        </div>

        <div className="form-group" style={{gridColumn: "1", gridRow : "3"}}>
          <label htmlFor="file">Receta</label>
          <input type="file" accept="image/*" name="receta" {...registerAdd("receta", {
            required: "Receta requerida",
            validate: {
              isImage: (value) => {
                if (!value[0]) return true;
                const fileType = value[0].type;
                const acceptedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp'];
                return acceptedImageTypes.includes(fileType) || "El archivo debe ser una imagen (JPG, PNG).";
              },
              isSize: (value) => {
                if (value[0].size < 10 * 1024 * 1024) return true;
                return "El archivo debe ser menor a 10mb.";
              }
            }
          })} />
          {errorsAdd.receta && (<div className="error-message">{errorsAdd.receta.message}</div>)}
        </div>

        <div className="form-options" style={{gridColumn: "2", gridRow : "3"}}>
          <label className="checkbox-label">
            <input type="checkbox" {...registerAdd("recibeMail")} />
            <span>Deseo recibir Email recordatorio</span>
          </label>
        </div>
        <button id="turno" type="submit" className="login-btn" disabled={isSubmittingAdd} style={{gridColumn: "2", gridRow : "4"}}>
          {isSubmittingAdd ? "Un momento..." : "Registrar"}
        </button>
      </form>
    </>
  );
};

export default TabTurnoRegistrar;
