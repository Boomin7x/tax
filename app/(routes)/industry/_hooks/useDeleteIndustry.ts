import { useMutation, useQueryClient } from "@tanstack/react-query";
import { industryApi } from "../_utils/api";

const useDeleteIndustry = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-industry"],
    mutationFn: industryApi.delete,
    onSuccess: () =>
      queryclient.invalidateQueries({ queryKey: ["all-industry"] }),
  });
};

export default useDeleteIndustry;
