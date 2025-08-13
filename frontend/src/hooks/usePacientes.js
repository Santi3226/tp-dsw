import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../helpers/api";

const getDatos = async () => {
  try {
    const paciente = await axiosInstance.get("/paciente"); 
    return(paciente.data.data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};

const deletePaciente = async (id) => {
  try {
    const paciente = await axiosInstance.delete("/paciente/"+id); 
    alert("Paciente n°:" + id +" eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar los datos:", error);
  }
};

function usePaciente() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["paciente"],
    queryFn: getDatos,
  });
  return {
    pacientes: data,
    isError,
    error,
    isLoading,
  };
}

export {usePaciente, deletePaciente};
