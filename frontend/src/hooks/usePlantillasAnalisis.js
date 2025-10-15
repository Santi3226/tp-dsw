import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../helpers/api";

const getDatos = async () => {
  try {
    const plantillasAnalisis = await axiosInstance.get("/plantillaAnalisis"); 
    return(plantillasAnalisis.data.data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};

const deletePlantillas = async (data) => {
try {
    const id = data.id;
    await axiosInstance.delete("/plantillaAnalisis/"+id); 
    alert("Plantilla de Analisis n°:" + id +" eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar los datos:", error);
  }
};

const addPlantillas = async (data) => {
  const plantillasData = 
    {
    hsAyuno: (data.hsAyuno==="" ? "Sin ayuno" : data.hsAyuno),
    preparacion: (data.preparacion==="" ? "Sin preparación especial" : data.preparacion),
    tiempoPrevisto: (Number(data.tiempoPrevisto)===0 ? undefined : Number(data.tiempoPrevisto)),
    fechaDesde: Date.now()
    };
try {
    const response = await axiosInstance.post("/plantillaAnalisis", plantillasData); 
    console.log(response);
    alert("Plantilla de Analisis n°:" + response.data.data.id +" creado correctamente");
  } catch (error) {
    console.error("Error al crear los datos:", error);
  }
};

const modifyPlantillas = async (data) => {
    const plantillasData = 
    {
    id:(data.id),
    hsAyuno: (data.hsAyuno==="" ? "Sin ayuno" : data.hsAyuno),
    preparacion: (data.preparacion==="" ? "Sin preparación especial" : data.preparacion),
    tiempoPrevisto: (Number(data.tiempoPrevisto)===0 ? undefined : Number(data.tiempoPrevisto)),
    fechaDesde: Date.now()
    };
  try {
    await axiosInstance.put(
    "/plantillaAnalisis/"+plantillasData.id,
    plantillasData
    ); 
    alert("Plantilla de Analisis n°:" + plantillasData.id +" modificado correctamente");
  } catch (error) {
    console.error("Error al modificar los datos:", error);
  }
};
function usePlantillasAnalisis() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["plantillaAnalisis"],
    queryFn: getDatos,
  });
  return {
    plantillas: data,
    isError,
    error,
    isLoading,
  };
}

export {usePlantillasAnalisis, deletePlantillas, addPlantillas, modifyPlantillas};
