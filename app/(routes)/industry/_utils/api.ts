import axios from "@/config/axios.config";
import { IFilter } from "../../types";
import { paramsCheck } from "../../utils";
import { IIndustryPayload } from "./validation";

export const industryApi = {
  getAll: async (filter: IFilter) => {
    const params = paramsCheck(filter);
    const result = await axios.post(`/industry/filter`, {}, { params });
    return result?.data;
  },
  getOne: async (industryId: string) => {
    const result = await axios.get(`/industry/details/${industryId}`);
    return result?.data;
  },
  create: async (userId: string, data: IIndustryPayload) => {
    const result = await axios.post(`/industry/create`, data, {
      params: userId,
    });
    return result?.data;
  },
  update: async (
    industryId: string,
    userId: string,
    data: IIndustryPayload
  ) => {
    const result = await axios.put(`/industry/${industryId}`, data, {
      params: userId,
    });
    return result?.data;
  },
  delete: async (industryId: string) => {
    const result = await axios.delete(`/industry/${industryId}`);
    return result?.data;
  },
};
