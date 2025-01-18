import { useQuery } from "@tanstack/react-query";
import { industryApi } from "../_utils/api";

const useGetAllIndustry = () => {
  return useQuery({
    queryKey: ["all-industry"],
    queryFn: industryApi.getAll,
  });
};

export default useGetAllIndustry;
