import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../helpers/api";

const getDatos = async () => {
  try {
    const tiposAnalisis = await axiosInstance.get("/tipoAnalisis"); 
    return(tiposAnalisis.data.data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};
const deleteTipos = async (data) => {
try {
    const id = data.id;
    await axiosInstance.delete("/tipoAnalisis/"+id); 
    alert("Tipo de Analisis n°:" + id +" eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar los datos:", error);
  }
};

const addTipos = async (data) => {
  const tiposData = 
    {
    nombre: (data.nombre==="" ? undefined : data.nombre),
    importe: (Number(data.importe)===0 ? undefined : Number(data.importe)),
    plantillaAnalisis: Number(data.plantillaAnalisis)
    };
try {
    const response = await axiosInstance.post("/tipoAnalisis", tiposData); 
    alert("Tipo de Analisis n°:" + response.id +" creado correctamente");
  } catch (error) {
    console.error("Error al crear los datos:", error);
  }
};

const modifyTipos = async (data) => {
    const tiposData = 
    {
    id:(data.id),
    nombre: (data.nombre==="" ? undefined : data.nombre),
    importe: (Number(data.importe)===0 ? undefined : Number(data.importe)),
    plantilaAnalisis: (Number(data.plantilaAnalisis)===0 ? undefined : Number(data.plantilaAnalisis))
    };
  try {
    await axiosInstance.put(
    "/tipoAnalisis/"+tiposData.id,
    tiposData
    ); 
    alert("Tipo de Analisis n°:" + tiposData.id +" modificado correctamente");
  } catch (error) {
    console.error("Error al modificar los datos:", error);
  }
};
function useTiposAnalisis() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["tipoAnalisis"],
    queryFn: getDatos,
  });
  return {
    tipos: data,
    isError,
    error,
    isLoading,
  };
}

export {useTiposAnalisis, deleteTipos, addTipos, modifyTipos};
