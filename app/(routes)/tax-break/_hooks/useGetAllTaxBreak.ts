import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetAllTaxBreak = () => {
  return useQuery({
    queryKey: ["all-tax-break"],
    queryFn: taxBreakApi.getAll,
  });
};

export default useGetAllTaxBreak;
