import axios from "@/config/axios.config";
import { ITaxBreakPayload } from "./validation";
import { IFilter, IResponse } from "../../types";
import { paramsCheck } from "../../utils";
import { ITaxBreak } from "./type";

export const taxBreakApi = {
  create: async (userId: string, data: ITaxBreakPayload) => {
    const result = await axios.post(`/tax-breaks/create`, data, {
      params: userId,
    });
    return result?.data;
  },
  getAll: async (
    filter: IFilter
  ): Promise<IResponse & { data: ITaxBreak[] }> => {
    const params = paramsCheck(filter);
    const result = await axios.post(`/tax-breaks/filter`, {}, { params });
    return result?.data;
  },
  getOne: async (taxBreaksId: string) => {
    const result = await axios.get(`/tax-breaks/details/${taxBreaksId}`);
    return result?.data;
  },
  update: async (
    taxBreaksId: string,
    userId: string,
    data: ITaxBreakPayload
  ) => {
    const result = await axios.put(`/tax-breaks/${taxBreaksId}`, data, {
      params: userId,
    });
    return result?.data;
  },
  delete: async (taxBreaksId: string) => {
    const result = await axios.delete(`/tax-breaks/${taxBreaksId}`);
    return result?.data;
  },
};
