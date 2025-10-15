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
    const centro = await axiosInstance.delete("/centroAtencion/"+id); 
    alert("Centro n°:" + id +" eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar los datos:", error);
  }
};

const addCentros = async (data) => {
  const centrosData = {
    nombre: data.nombre,
    domicilio: data.domicilio,
    localidad: data.localidad,
  };
  try {
    const response = await axiosInstance.post("/centroAtencion", centrosData);
    console.log(response);
    alert("Centro n°:" + response.data.data.id + " creado correctamente");
  } catch (error) {
    console.error("Error al crear los datos:", error);
  }
};

const modifyCentros = async (data) => {
    const centrosData = {
      id: data.id,
      nombre: (data.nombre === "" ? undefined : data.nombre),
      domicilio: (data.domicilio === "" ? undefined : data.domicilio),
      localidad: (data.localidad === "" ? undefined : data.localidad),
    };
  try {
    await axiosInstance.put(
    "/centroAtencion/"+centrosData.id,
    centrosData
    ); 
    alert("Centro n°:" + centrosData.id +" modificado correctamente");
  } catch (error) {
    console.error("Error al modificar los datos:", error);
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

export {useCentros, deleteCentros, addCentros, modifyCentros};
