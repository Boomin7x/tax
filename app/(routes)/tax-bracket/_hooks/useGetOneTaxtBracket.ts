import { useQuery } from "@tanstack/react-query";
import { taxBracketApi } from "../_utils/api";

const useGetOneTaxtBracket = (taxBracketId: string) => {
  return useQuery({
    queryKey: ["one-tax-bracket", taxBracketId],
    queryFn: () => taxBracketApi.getOne(taxBracketId),
  });
};

export default useGetOneTaxtBracket;
