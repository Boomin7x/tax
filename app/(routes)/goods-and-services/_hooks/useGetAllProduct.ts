import { useQuery } from "@tanstack/react-query";
import { productApi } from "../_utils/api";
import { IFilter } from "../../types";

const useGetAllProduct = (filters: IFilter) => {
  return useQuery({
    queryKey: ["all-product"],
    queryFn: () => productApi.getAll(filters),
  });
};

export default useGetAllProduct;
