import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taxBreakApi } from "../_utils/api";
import { ITaxBreakPayload } from "../_utils/validation";

const useUpdatetaxBreak = (taxBreaksId: string, userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-tax-break"],
    mutationFn: (data: ITaxBreakPayload) =>
      taxBreakApi.update(taxBreaksId, userId, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-tax-break"] }),
  });
};

export default useUpdatetaxBreak;
