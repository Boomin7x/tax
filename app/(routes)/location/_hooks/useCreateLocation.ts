import { useMutation, useQueryClient } from "@tanstack/react-query";
import { locationApi } from "../_utils/api";

const useCreateLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-location"],
    mutationFn: locationApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [""] }),
  });
};

export default useCreateLocation;
