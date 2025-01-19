import { useQuery } from "@tanstack/react-query";

const useGetOneTaxBreak = () => {
  return useQuery({
    queryKey: ["one-tax-break"],
    queryFn: taxBreakApi.getOne,
  });
};

export default useGetOneTaxBreak;
