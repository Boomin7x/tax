import { useQuery } from "@tanstack/react-query";
import { IFilter } from "../../types";
import { taxBracketApi } from "../_utils/api";

const useGetAllTaxtBracket = (filter: IFilter) => {
  return useQuery({
    queryKey: ["all-tax-bracket", filter],
    queryFn: () => taxBracketApi.getAll(),
  });
};

export default useGetAllTaxtBracket;
