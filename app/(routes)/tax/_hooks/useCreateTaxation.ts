import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taxApi } from "../_utils/api";
import { ITaxationPayload } from "../_utils/validation";

const useCreateTaxation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-taxation", userId],
    mutationFn: (data: ITaxationPayload) => taxApi.create(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-taxations"],
      });
    },
  });
};

export default useCreateTaxation;
