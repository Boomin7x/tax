import { useQuery } from "@tanstack/react-query";
import React from "react";
import { locationApi } from "../_utils/api";

const useGetOneLocation = () => {
  return useQuery({
    queryKey: ["one-location"],
    queryFn: locationApi.getOne,
  });
};

export default useGetOneLocation;
