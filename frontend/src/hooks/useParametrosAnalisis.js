import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../helpers/api';

const getDatos = async () => {
  try {
    const parametrosAnalisis = await axiosInstance.get('/parametroAnalisis');
    return parametrosAnalisis.data.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

const deleteParametros = async (data) => {
  try {
    const id = data.id;
    await axiosInstance.delete('/parametroAnalisis/' + id);
    alert('Parametro de Analisis n°:' + id + ' eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar los datos:', error);
  }
};

const addParametros = async (data) => {
  const parametrosData = {
    nombre: data.nombre === '' ? undefined : data.nombre,
    referencia: data.referencia === '' ? undefined : data.referencia,
    unidad: data.unidad === '' ? undefined : data.unidad,
  };
  try {
    const response = await axiosInstance.post(
      '/parametroAnalisis',
      parametrosData
    );
    alert(
      'Parametro de Analisis n°:' +
        response.data.data.id +
        ' creado correctamente'
    );
  } catch (error) {
    console.error('Error al crear los datos:', error);
  }
};

const addVinculo = async (data) => {
  const vinculoData = {
    parametroAnalisis:
      Number(data.parametroAnalisis) === 0
        ? undefined
        : Number(data.parametroAnalisis),
    tipoAnalisis:
      Number(data.tipoAnalisis) === 0 ? undefined : Number(data.tipoAnalisis),
  };
  try {
    const response = await axiosInstance.post(
      '/tipoAnalisis/vincular/',
      vinculoData
    );
    alert('Vinculo creado correctamente');
  } catch (error) {
    console.error('Error al crear el vinculo:', error);
  }
};

const modifyParametros = async (data) => {
  const parametrosData = {
    id: data.id,
    nombre: data.nombre === '' ? undefined : data.nombre,
    referencia: data.referencia === '' ? undefined : data.referencia,
    unidad: data.unidad === '' ? undefined : data.unidad,
  };
  try {
    await axiosInstance.put(
      '/parametroAnalisis/' + parametrosData.id,
      parametrosData
    );
    alert(
      'Parametro de Analisis n°:' +
        parametrosData.id +
        ' modificado correctamente'
    );
  } catch (error) {
    console.error('Error al modificar los datos:', error);
  }
};
function useParametrosAnalisis() {
  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ['parametroAnalisis'],
    queryFn: getDatos,
  });
  return {
    parametros: data,
    isError,
    refetch,
    error,
    isLoading,
  };
}

export {
  useParametrosAnalisis,
  deleteParametros,
  addParametros,
  modifyParametros,
  addVinculo,
};
