import { useEffect, useState } from 'react';
import axiosInstance from '../../helpers/api.js';

const TabPreparacion = () => {
  const [tiposAnalisis, setTiposAnalisis] = useState([]);
  const [tipoAnalisisSeleccionado, setTipoAnalisisSeleccionado] = useState('');

  useEffect(() => {
    const getDatos = async () => {
      try {
        const tipos = await axiosInstance.get('/tipoAnalisis');
        setTiposAnalisis(tipos.data.data || []);
      } catch (error) {
        console.error('Error al obtener los tipos de análisis:', error);
      }
    };
    getDatos();
  }, []);

  const handleSelectChange = (event) => {
    setTipoAnalisisSeleccionado(event.target.value);
  };

  const analisisElegido = tiposAnalisis.find(
    (ta) => ta.id === Number(tipoAnalisisSeleccionado)
  );

  return (
    <>
      <h2 className="titulo">Consultar preparación</h2>
      <p>Seleccionar tipo de análisis</p>
      <select
        id="tipoAnalisis"
        className="form-input"
        value={tipoAnalisisSeleccionado}
        onChange={handleSelectChange}
      >
        <option value="">-</option>
        {tiposAnalisis.map((ta, index) => (
          <option key={index} value={ta.id}>
            {ta.id} - {ta.nombre}
          </option>
        ))}
      </select>

      {analisisElegido && analisisElegido.plantillaAnalisis && (
        <div style={{ marginTop: '20px' }}>
          <table
            className="table"
            style={{
              display: 'block',
              fontSize: '16px',
              maxWidth: 'fit-content',
              margin: '0 auto',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
            }}
          >
            <thead />
            <tbody>
              {Object.entries(analisisElegido.plantillaAnalisis).map(
                ([key, value]) => {
                  if (key === 'tiempoPrevisto') {
                    return (
                      <tr key={key}>
                        <td style={{ fontWeight: 'bold' }}>Tiempo Previsto</td>
                        <td>{value.toString() + ' días'}</td>
                      </tr>
                    );
                  } else if (
                    key !== 'id' &&
                    typeof value !== 'object' &&
                    key !== 'fechaDesde'
                  ) {
                    return (
                      <tr key={key}>
                        <td style={{ fontWeight: 'bold' }}>
                          {key === 'hsAyuno' ? 'Horas de Ayuno' : 'Observación'}
                        </td>
                        <td>{value.toString()}</td>
                      </tr>
                    );
                  }
                  return null;
                }
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TabPreparacion;
