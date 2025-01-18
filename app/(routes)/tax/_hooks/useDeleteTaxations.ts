import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taxApi } from "../_utils/api";

const useDeleteTaxations = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-taxation"],
    mutationFn: taxApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-taxationsa"],
      });
    },
  });
};

export default useDeleteTaxations;
