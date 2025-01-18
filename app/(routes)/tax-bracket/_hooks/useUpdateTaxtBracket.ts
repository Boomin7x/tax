import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taxBracketApi } from "../_utils/api";
import { ItaxtBracketPayload } from "../_utils/validation";

const useUpdateTaxtBracket = (taxBracketId: string, userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-tax-bracket"],
    mutationFn: (data: ItaxtBracketPayload) =>
      taxBracketApi.update(taxBracketId, userId, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-tax-bracket"] }),
  });
};

export default useUpdateTaxtBracket;
