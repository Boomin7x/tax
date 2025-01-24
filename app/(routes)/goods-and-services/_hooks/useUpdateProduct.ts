import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../_utils/api";
import { IProductPayload } from "../_utils/validation";

const useUpdateProduct = (productId: string, userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-product"],
    mutationFn: (data: IProductPayload) =>
      productApi.update(productId, userId, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-product"] }),
  });
};

export default useUpdateProduct;
