import { useQuery } from "@tanstack/react-query";
import { industryApi } from "../_utils/api";

const useGetOneIndustry = () => {
  return useQuery({
    queryKey: ["one-industry"],
    queryFn: industryApi.getOne,
  });
};

export default useGetOneIndustry;
