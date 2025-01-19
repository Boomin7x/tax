import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taxBreakApi } from "../_utils/api";

const useDeleteTaxBreak = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-tax-break"],
    mutationFn: taxBreakApi.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-tax-break"] }),
  });
};

export default useDeleteTaxBreak;
