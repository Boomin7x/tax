import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../_utils/api";

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-products"],
    mutationFn: productApi.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-product"] }),
  });
};

export default useDeleteProduct;
