import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../helpers/api";

const getDatos = async () => {
  try {
    const turnos = await axiosInstance.get("/centroAtencion"); 
    return(turnos.data.data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};

const deleteCentros = async (id) => {
  try {
    const centro = await axiosInstance.delete("/centro/"+id); 
    alert("Centro n°:" + id +" eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar los datos:", error);
  }
};


function useCentros() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["centroAtencion"],
    queryFn: getDatos,
  });
  return {
    centros: data,
    isError,
    error,
    isLoading,
  };
}

export {useCentros, deleteCentros};
