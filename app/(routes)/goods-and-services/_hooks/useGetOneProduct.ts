import { useQuery } from "@tanstack/react-query";
import { productApi } from "../_utils/api";

const useGetOneProduct = (productId: string) => {
  return useQuery({
    queryKey: ["one-product"],
    queryFn: () => productApi.getOne(productId),
  });
};

export default useGetOneProduct;
