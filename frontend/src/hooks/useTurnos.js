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

const addTurnos = async (data) => {
  const turnoData = {};
  try {
    const response = await axiosInstance.post('/turno', turnoData);
    alert('Turno creado Correctamente!');
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

const modifyTurnos = async (data) => {
  const turnoData = {
    id: data.id,
    nombre: data.nombre === '' ? undefined : data.nombre,
    apellido: data.apellido === '' ? undefined : data.apellido,
    dni: data.dni === '' ? undefined : data.dni,
    telefono: data.telefono === '' ? undefined : data.telefono,
    direccion: data.direccion === '' ? undefined : data.direccion,
    fechaNacimiento:
      data.fechaNacimiento === '' ? undefined : data.fechaNacimiento,
  };
  try {
    await axiosInstance.put('/turno/' + turnoData.id, turnoData);
    alert('Turno n°:' + turnoData.id + ' modificado correctamente');
  } catch (error) {
    console.error('Error al modificar los datos:', error);
  }
};

const getTurnosQuery = async (data) => {
  try {
    const params = {
      estado: data.estado === '' ? undefined : data.estado,
      fechaInicio: data.fechaInicio === '' ? undefined : data.fechaInicio,
      fechaFin: data.fechaFin === '' ? undefined : data.fechaFin,
    };
    const response = await axiosInstance.get('/turno/filter', { params });
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};

const deleteTurnos = async (id) => {
  try {
    const turno = await axiosInstance.delete('/turno/' + id);
    alert('Turno n°:' + id + ' eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar los datos:', error);
  }
};

function useTurnos() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['turno'],
    queryFn: getDatos,
  });
  console.log(data);
  return {
    turnos: data,
    isError,
    error,
    isLoading,
  };
}

export { useTurnos, deleteTurnos, addTurnos, modifyTurnos, getTurnosQuery };
