import { useMutation, useQueryClient } from "@tanstack/react-query";
import { locationApi } from "../_utils/api";
import { ILocationPayload } from "../_utils/validation";

const useCreateLocation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-location"],
    mutationFn: (data: ILocationPayload) => locationApi.create(data, userId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-location"] }),
  });
};

export default useCreateLocation;
