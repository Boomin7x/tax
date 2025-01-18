import { industryApi } from "../_utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateIndustry = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: ["update-industry"],
    mutationFn: industryApi.update,
    onSuccess: () =>
      queryclient.invalidateQueries({ queryKey: ["all-industry"] }),
  });
};

export default useUpdateIndustry;
