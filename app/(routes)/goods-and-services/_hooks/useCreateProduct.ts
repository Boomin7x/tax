import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-product"],
    mutationFn: productApi.create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-product"] }),
  });
};

export default useCreateProduct;
