import { useQuery } from "@tanstack/react-query";
import { industryApi } from "../_utils/api";
import { IFilter } from "../../types";

const useGetAllIndustry = (filter: IFilter) => {
  return useQuery({
    queryKey: ["all-industry", filter],
    queryFn: () => industryApi.getAll(filter),
  });
};

export default useGetAllIndustry;
