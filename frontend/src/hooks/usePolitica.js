import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../helpers/api";

const getDatos = async () => {
  try {
    const politica = await axiosInstance.get("/politica"); 
    return(politica.data.data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};

const modifyPoliticas = async (data) => {
    const politicaData = 
    {
    id:(data.id),
    diaHabilitacionTurnos: (Number(data.diaHabilitacionTurnos)===0 ? undefined : Number(data.diaHabilitacionTurnos)),
    horaInicioTurnos: (data.horaInicioTurnos==="" ? undefined : data.horaInicioTurnos),
    horaFinTurnos: (data.horaInicioTurnos==="" ? undefined : data.horaFinTurnos)
    };
  try {
    await axiosInstance.put(
    "/politica/"+politicaData.id,
    politicaData
    ); 
    alert("Las politicas han sido modificadas");
  } catch (error) {
    console.error("Error al modificar los datos:", error);
  }
};

function usePolitica() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["politica"],
    queryFn: getDatos,
  });
  console.log(data);
  return {
    politicas: data,
    isError,
    error,
    isLoading,
  };
}

export {usePolitica, modifyPoliticas};
