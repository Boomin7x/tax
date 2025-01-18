import { useQuery } from "@tanstack/react-query";
import { locationApi } from "../_utils/api";

const useGetAllLocation = () => {
  return useQuery({
    queryKey: ["all-location"],
    queryFn: locationApi.getAll,
  });
};

export default useGetAllLocation;
