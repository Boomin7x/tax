import { industryApi } from "../_utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IIndustryPayload } from "../_utils/validation";

const useUpdateIndustry = (industryid: string, userId: string) => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: ["update-industry"],
    mutationFn: (data: IIndustryPayload) =>
      industryApi.update(industryid, userId, data),
    onSuccess: () =>
      queryclient.invalidateQueries({ queryKey: ["all-industry"] }),
  });
};

export default useUpdateIndustry;
