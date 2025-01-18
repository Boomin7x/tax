import { useMutation, useQueryClient } from "@tanstack/react-query";
import { industryApi } from "../_utils/api";
import { IIndustryPayload } from "../_utils/validation";

const useCreateIndustry = (userId: string) => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: ["create-industry"],
    mutationFn: (data: IIndustryPayload) => industryApi.create(userId, data),
    onSuccess: () =>
      queryclient.invalidateQueries({ queryKey: ["all-industry"] }),
  });
};

export default useCreateIndustry;
