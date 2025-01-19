import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taxBreakApi } from "../_utils/api";
import { IFilter } from "../../types";
import { ITaxBreakPayload } from "../_utils/validation";

const useCreateTaxBreak = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-tax-break"],
    mutationFn: (data: ITaxBreakPayload) => taxBreakApi.create(userId, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-tax-break"] }),
  });
};

export default useCreateTaxBreak;
