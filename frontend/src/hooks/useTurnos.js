import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../helpers/api";

const getDatos = async () => {
  try {
    const turnos = await axiosInstance.get("/turno"); 
    return(turnos.data.data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};

function useTurnos() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["turno"],
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

export default useTurnos;
