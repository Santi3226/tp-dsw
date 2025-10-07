import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../helpers/api";

const getDatos = async () => {
  try {
    const localidad = await axiosInstance.get("/localidad"); 
    return(localidad.data.data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};

const deleteLocalidad = async (id) => {
  try {
    const localidad = await axiosInstance.delete("/localidad/"+id); 
    alert("Localidad n°:" + id +" eliminada correctamente");
  } catch (error) {
    console.error("Error al eliminar los datos:", error);
  }
};

const addLocalidad = async (data) => {
  const localidadData = {
    denominacion: data.denominacion,
    codPostal: data.codPostal,
  };
  try {
    const response = await axiosInstance.post("/localidad", localidadData);
    console.log(response);
    alert("Localidad n°:" + response.data.data.id + " creada correctamente");
  } catch (error) {
    console.error("Error al crear los datos:", error);
  }
};

const modifyLocalidad = async (data) => {
    const localidadData = {
      id: data.id,
      denominacion: (data.denominacion === "" ? undefined : data.denominacion),
      codPostal: (data.codPostal === "" ? undefined : data.codPostal),
    };
  try {
    await axiosInstance.put(
    "/localidad/"+localidadData.id,
    localidadData
    ); 
    alert("Localidad n°:" + localidadData.id +" modificada correctamente");
  } catch (error) {
    console.error("Error al modificar los datos:", error);
  }
};


function useLocalidad() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["localidad"],
    queryFn: getDatos,
  });
  return {
    localidades: data,
    isError,
    error,
    isLoading,
  };
}

export {useLocalidad, deleteLocalidad, addLocalidad, modifyLocalidad};
