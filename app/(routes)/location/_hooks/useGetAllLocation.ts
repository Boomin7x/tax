import { useQuery } from "@tanstack/react-query";
import { locationApi } from "../_utils/api";
import { IFilter } from "../../types";

const useGetAllLocation = (filter: IFilter) => {
  return useQuery({
    queryKey: ["all-location", filter],
    queryFn: () => locationApi.getAll(filter),
  });
};

export default useGetAllLocation;
