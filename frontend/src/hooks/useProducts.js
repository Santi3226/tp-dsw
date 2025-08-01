import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../helpers/api";

const getProducts = async () => {
  const response = await axiosInstance.get("/productos");
  return response.data;
};

function useProducts() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return {
    products: data,
    isError,
    error,
    isLoading,
  };
}

export default useProducts;
