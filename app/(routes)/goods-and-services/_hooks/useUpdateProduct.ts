import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-product"],
    mutationFn: productApi.update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-product"] }),
  });
};

export default useUpdateProduct;
