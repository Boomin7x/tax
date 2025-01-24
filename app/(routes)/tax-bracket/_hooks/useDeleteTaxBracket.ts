import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taxBracketApi } from "../_utils/api";

const useDeleteTaxBracket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-tax-bracket"],
    mutationFn: taxBracketApi.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-tax-bracket"] }),
  });
};

export default useDeleteTaxBracket;
