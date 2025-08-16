import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../helpers/api';

const getDatos = async () => {
  try {
    const paciente = await axiosInstance.get('/paciente');
    return paciente.data.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

const getPacienteQuery = async (data) => {
  try {
    const params = {
      nombre: data.nombre === '' ? undefined : data.nombre,
      dni: data.dni === '' ? undefined : data.dni,
      edad: data.edad === '' ? undefined : data.dni,
    };
    const response = await axiosInstance.get('/paciente/filter', { params });
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};

const deletePaciente = async (id) => {
  try {
    const paciente = await axiosInstance.delete('/paciente/' + id);
    alert('Paciente n°:' + id + ' eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar los datos:', error);
  }
};

function usePaciente() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['paciente'],
    queryFn: getDatos,
  });
  return {
    pacientes: data,
    isError,
    error,
    isLoading,
  };
}

const addPaciente = async (data) => {
  const pacienteData = {
    nombre: data.nombre,
    apellido: data.apellido,
    dni: data.dni,
    telefono: data.telefono,
    direccion: data.domicilio,
    fechaNacimiento: data.fechaNacimiento,
  };
  try {
    const response = await axiosInstance.post('/paciente', pacienteData);
    alert('Usuario creado Correctamente!');
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

const modifyPaciente = async (data) => {
  const pacienteData = {
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
    await axiosInstance.put('/paciente/' + pacienteData.id, pacienteData);
    alert('Paciente n°:' + pacienteData.id + ' modificado correctamente');
  } catch (error) {
    console.error('Error al modificar los datos:', error);
  }
};

export {
  usePaciente,
  deletePaciente,
  addPaciente,
  modifyPaciente,
  getPacienteQuery,
};
