import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taxApi } from "../_utils/api";
import { ITaxationPayload } from "../_utils/validation";

const useUpdateTaxations = (taxId: string, userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-taxation"],
    mutationFn: (data: ITaxationPayload) => taxApi.update(taxId, userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-taxationsa"],
      });
    },
  });
};

export default useUpdateTaxations;
