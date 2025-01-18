import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taxApi } from "../_utils/api";

const useCreateTaxation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-taxation"],
    mutationFn: taxApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-taxationsa"],
      });
    },
  });
};

export default useCreateTaxation;
