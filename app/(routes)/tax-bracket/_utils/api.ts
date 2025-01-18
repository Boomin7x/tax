import axios from "@/config/axios.config";
import { ItaxtBracketPayload } from "./validation";
import { IFilter } from "../../types";
import { paramsCheck } from "../../utils";

export const taxBracketApi = {
  create: async (userId: string, data: ItaxtBracketPayload) => {
    const result = await axios.post(`/tax-bracket/create`, data, {
      params: userId,
    });
    return result?.data;
  },
  getAll: async (filters: IFilter) => {
    const params = paramsCheck(filters);
    const result = await axios.post(`/tax-bracket/filter`, {}, { params });
    return result?.data;
  },
  getOne: async (taxBraketId: string) => {
    const result = await axios.get(`/tax-bracket/details/${taxBraketId}`);
    return result?.data;
  },
  update: async (
    taxBracketId: string,
    userId: string,
    data: ItaxtBracketPayload
  ) => {
    const result = await axios.put(`/tax-bracket/${taxBracketId}`, data, {
      params: userId,
    });
    return result?.data;
  },
  delete: async (taxBracketId: string) => {
    const result = await axios.delete(`/tax-bracket/${taxBracketId}`);
    return result?.data;
  },
};
