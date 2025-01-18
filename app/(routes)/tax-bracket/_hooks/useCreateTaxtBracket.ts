import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taxBracketApi } from "../_utils/api";

const useCreateTaxBracket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-tax-bracket"],
    mutationFn: taxBracketApi.create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-tax-bracket"] }),
  });
};

export default useCreateTaxBracket;
