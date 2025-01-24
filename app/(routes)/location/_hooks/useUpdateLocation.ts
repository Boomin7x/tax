import { useMutation, useQueryClient } from "@tanstack/react-query";
import { locationApi } from "../_utils/api";
import { ILocationPayload } from "../_utils/validation";

const useUpdateLocation = (locationId: string, userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-location"],
    mutationFn: (data: ILocationPayload) =>
      locationApi.update(locationId, userId, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["all-location"] }),
  });
};

export default useUpdateLocation;
