import React from 'react';

const TabPacienteFiltrar = ({ registerFilter, handleSubmitFilter, errorsFilter, isSubmittingFilter }) => {
  return (
    <>
      <h2 className='titulo'>Filtrar pacientes</h2>
      <form className="login-formReg" onSubmit={handleSubmitFilter} noValidate>
        <div className="form-group" id="uno">
          <label htmlFor="text">Nombre</label>
          <input type="text" id="nombre" {...registerFilter('nombre')} className="form-input" />
        </div>

        <div className="form-group" id="dos">
          <label htmlFor="text">DNI</label>
          <input type="text" id="dni" {...registerFilter('dni')} className="form-input" />
        </div>

        <div className="form-group" id="tres">
          <label htmlFor="text">Edad</label>
          <input type="text" id="edad" {...registerFilter('edad')} className="form-input" />
        </div>

        <button id="login" type="submit" className="login-btn" disabled={isSubmittingFilter} style={{gridRow: 2}}>
          {isSubmittingFilter ? 'Un momento...' : 'Filtrar'}
        </button>
      </form>
    </>
  );
};

export default TabPacienteFiltrar;
