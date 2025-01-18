import { useQuery } from "@tanstack/react-query";
import { taxApi } from "../_utils/api";
import { IGetAllTaxation } from "../_utils/types";

const useGetAllTaxations = (filter: IGetAllTaxation) => {
  return useQuery({
    queryKey: ["all-taxations", filter],
    queryFn: () => taxApi.getAll(filter),
  });
};

export default useGetAllTaxations;
