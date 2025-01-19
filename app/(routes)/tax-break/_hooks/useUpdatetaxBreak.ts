import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdatetaxBreak = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-tax-break"],
    mutationFn: taxBreakApi.update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-tax-break"] }),
  });
};

export default useUpdatetaxBreak;
