import { useQuery } from "@tanstack/react-query";
import { taxApi } from "../_utils/api";

const useGetOneTaxations = (taxId: string) => {
  return useQuery({
    queryKey: ["one-taxations", taxId],
    queryFn: () => taxApi.getOne(taxId),
  });
};

export default useGetOneTaxations;
