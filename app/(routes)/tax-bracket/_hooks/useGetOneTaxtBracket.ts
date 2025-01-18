import { useQuery } from "@tanstack/react-query";
import { taxBracketApi } from "../_utils/api";

const useGetOneTaxtBracket = () => {
  return useQuery({
    queryKey: ["one-tax-bracket"],
    queryFn: taxBracketApi.getOne,
  });
};

export default useGetOneTaxtBracket;
