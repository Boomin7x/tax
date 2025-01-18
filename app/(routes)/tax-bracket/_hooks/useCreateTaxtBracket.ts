import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taxBracketApi } from "../_utils/api";
import { ItaxtBracketPayload } from "../_utils/validation";

const useCreateTaxBracket = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-tax-bracket"],
    mutationFn: (data: ItaxtBracketPayload) =>
      taxBracketApi.create(userId, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-tax-bracket"] }),
  });
};

export default useCreateTaxBracket;
