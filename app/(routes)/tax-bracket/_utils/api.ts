import axios from "@/config/axios.config";
import { ItaxtBracketPayload } from "./validation";
import { IFilter, IResponse } from "../../types";
import { paramsCheck } from "../../utils";
import { ITaxBracket } from "./type";

export const taxBracketApi = {
  create: async (userId: string, data: ItaxtBracketPayload) => {
    try {
      const result = await axios.post(`/tax-bracket/create`, data, {
        params: userId,
      });
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
  getAll: async (
    filters: IFilter
  ): Promise<IResponse & { data: ITaxBracket[] }> => {
    try {
      const params = paramsCheck(filters);
      const result = await axios.post(`/tax-bracket/filter`, {}, { params });
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
  getOne: async (taxBraketId: string) => {
    try {
      const result = await axios.get(`/tax-bracket/details/${taxBraketId}`);
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
  update: async (
    taxBracketId: string,
    userId: string,
    data: ItaxtBracketPayload
  ) => {
    try {
      const result = await axios.put(`/tax-bracket/${taxBracketId}`, data, {
        params: userId,
      });
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
  delete: async (taxBracketId: string) => {
    try {
      const result = await axios.delete(`/tax-bracket/${taxBracketId}`);
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
};
