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
    const formData = new FormData();
    formData.append('receta', data.receta[0]);
    formData.append('recibeMail', data.recibeMail);
    formData.append('estado', 'Pendiente');
    formData.append('observacion', '-');
    formData.append('fechaHoraReserva', data.fechaHoraReserva);
    formData.append('paciente', data.paciente);
    formData.append('centroAtencion', data.centroAtencion);
    formData.append('tipoAnalisis', data.tipoAnalisis);
  try {
    const response = await axiosInstance.post('/turno', formData);
    alert('Turno creado Correctamente!');
  } catch (error) {
    console.error('Error en Hook:', error);
    throw error;
  }
};

const modifyTurnos = async (data) => {
  const turnoData = {
    /*Cambiar*/
    id: data.id,
    nombre: data.nombre === '' ? undefined : data.nombre,
    apellido: data.apellido === '' ? undefined : data.apellido,
    dni: data.dni === '' ? undefined : data.dni,
    telefono: data.telefono === '' ? undefined : data.telefono,
    direccion: data.direccion === '' ? undefined : data.direccion,
    estado: data.estado === '' ? undefined : data.estado,
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
    const params = {};

    // Si solo se proporciona fechaHoraReserva (para buscar turnos de un día específico)
    if (data.fechaHoraReserva && !data.fechaInicio && !data.fechaFin) {
      params.fechaHoraReserva = data.fechaHoraReserva;
    } 
    // Si se proporcionan fechas de rango (filtrado por rango de fechas)
    else if (data.fechaInicio && data.fechaFin) {
      let [year, month, day] = data.fechaInicio.split('-').map(Number);
      const fechaInicioUTC = new Date(year, month - 1, day);
      
      [year, month, day] = data.fechaFin.split('-').map(Number);
      const fechaFinUTC = new Date(year, month - 1, day);
      
      params.fechaInicio = fechaInicioUTC;
      params.fechaFin = fechaFinUTC;
    }

    // Agregar estado si está presente
    if (data.estado && data.estado !== '') {
      params.estado = data.estado;
    }
    if (data.paciente && data.paciente !== '') {
      params.paciente = data.paciente;
    }

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
  return {
    turnos: data,
    isError,
    error,
    isLoading,
  };
}

export { useTurnos, deleteTurnos, addTurnos, modifyTurnos, getTurnosQuery };