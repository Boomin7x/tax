import { useMutation, useQueryClient } from "@tanstack/react-query";
import { locationApi } from "../_utils/api";

const useUpdateLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-location"],
    mutationFn: locationApi.update,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [""] }),
  });
};

export default useUpdateLocation;
