import { useMutation, useQueryClient } from "@tanstack/react-query";
import { locationApi } from "../_utils/api";

const useDeleteLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-location"],
    mutationFn: locationApi.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [""] }),
  });
};

export default useDeleteLocation;
