import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taxBracketApi } from "../_utils/api";

const useUpdateTaxtBracket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-tax-bracket"],
    mutationFn: taxBracketApi.update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-tax-bracket"] }),
  });
};

export default useUpdateTaxtBracket;
