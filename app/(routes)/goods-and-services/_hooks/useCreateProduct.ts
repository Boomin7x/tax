import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../_utils/api";
import { IProductPayload } from "../_utils/validation";

const useCreateProduct = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-product", userId],
    mutationFn: (data: IProductPayload) => productApi.create(userId, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-product"] }),
  });
};

export default useCreateProduct;
