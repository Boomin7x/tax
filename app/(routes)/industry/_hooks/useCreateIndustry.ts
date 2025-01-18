import { useMutation, useQueryClient } from "@tanstack/react-query";
import { industryApi } from "../_utils/api";

const useCreateIndustry = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: ["create-industry"],
    mutationFn: industryApi.create,
    onSuccess: () =>
      queryclient.invalidateQueries({ queryKey: ["all-industry"] }),
  });
};

export default useCreateIndustry;
