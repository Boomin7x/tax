import { useQuery } from "@tanstack/react-query";
import { locationApi } from "../_utils/api";

const useGetOneLocation = (locationId: string) => {
  return useQuery({
    queryKey: ["one-location"],
    queryFn: () => locationApi.getOne(locationId),
  });
};

export default useGetOneLocation;
