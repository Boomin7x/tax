import { useQuery } from "@tanstack/react-query";
import { IFilter } from "../../types";
import { taxBreakApi } from "../_utils/api";

const useGetAllTaxBreak = (filter: IFilter) => {
  return useQuery({
    queryKey: ["all-tax-break"],
    queryFn: () => taxBreakApi.getAll(filter),
  });
};

export default useGetAllTaxBreak;
