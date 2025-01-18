import { useQuery } from "@tanstack/react-query";

const useGetAllProduct = () => {
  return useQuery({
    queryKey: ["all-product"],
    queryFn: productApi.getAll,
  });
};

export default useGetAllProduct;
