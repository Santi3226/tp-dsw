import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../helpers/api';

const getDatos = async () => {
  try {
    const turnos = await axiosInstance.get('/turno');
    return turnos.data.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

const addResultados = async (data) => {
  for(const i in data.resultados){
  let resultadoData = {
    turno: data.id,
    parametro: i === '' ? undefined : i,
    valor: data.resultados[i] === '' ? undefined : data.resultados[i],
  };
  try {
    const response = axiosInstance.post('/resultadoAnalisis', resultadoData);
  } catch (error) {
    console.error('Error en Hook:', error);
    if (error.response && error.response.data && error.response.data.message) {
      setErrorLogin(error.response.data.message);
    } else {
      setErrorLogin(
        'Error de red o del servidor. Por favor, inténtalo de nuevo.'
      );
    }
    throw error;
  }
};
if(!error) alert('Resultados cargados Correctamente!');
};

const getTurnosQuery = async (data) => {
  try {
    let [year, month, day] = data.fechaInicio.split('-').map(Number);
    const fechaInicioUTC = new Date(year, month - 1, day);
    [year, month, day] = data.fechaFin.split('-').map(Number);
    const fechaFinUTC = new Date(year, month - 1, day);
    const params = {
      estado: data.estado === '' ? undefined : data.estado,
      fechaInicio: data.fechaInicio === '' ? undefined : fechaInicioUTC,
      fechaFin: data.fechaFin === '' ? undefined : fechaFinUTC,
    };
    const response = await axiosInstance.get('/turno/filter', { params });
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};

function useTurnos() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['turno'],
    queryFn: getDatos,
  });
  return {
    turnos: data,
    isError,
    error,
    isLoading,
  };
}

export { useTurnos, addResultados, getTurnosQuery };
