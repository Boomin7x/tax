import { useMutation, useQueryClient } from "@tanstack/react-query";

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
