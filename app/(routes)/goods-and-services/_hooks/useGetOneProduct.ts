import { useQuery } from "@tanstack/react-query";

const useGetOneProduct = () => {
  return useQuery({
    queryKey: ["one-product"],
    queryFn: productApi.getOne,
  });
};

export default useGetOneProduct;
