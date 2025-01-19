import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateTaxBreak = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-tax-break"],
    mutationFn: taxBreakApi.create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-tax-break"] }),
  });
};

export default useCreateTaxBreak;
