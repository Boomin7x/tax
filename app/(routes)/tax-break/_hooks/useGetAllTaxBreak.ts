import { useQuery } from "@tanstack/react-query";
import React from "react";
import { taxBreakApi } from "../_utils/api";
import { IFilter } from "../../types";

const useGetAllTaxBreak = (filter: IFilter) => {
  return useQuery({
    queryKey: ["all-tax-break"],
    queryFn: () => taxBreakApi.getAll(filter),
  });
};

export default useGetAllTaxBreak;
