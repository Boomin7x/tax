import { useQuery } from "@tanstack/react-query";
import { taxBreakApi } from "../_utils/api";

const useGetOneTaxBreak = (taxBreaksId: string) => {
  return useQuery({
    queryKey: ["one-tax-break"],
    queryFn: () => taxBreakApi.getOne(taxBreaksId),
  });
};

export default useGetOneTaxBreak;
