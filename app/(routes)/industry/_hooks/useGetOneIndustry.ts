import { useQuery } from "@tanstack/react-query";
import { industryApi } from "../_utils/api";

const useGetOneIndustry = (industryId: string) => {
  return useQuery({
    queryKey: ["one-industry"],
    queryFn: () => industryApi.getOne(industryId),
  });
};

export default useGetOneIndustry;
