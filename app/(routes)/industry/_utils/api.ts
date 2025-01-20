// import axios from "@/config/axios.config";
import axios from "@/config/axios.config";
import { IFilter, IResponse } from "../../types";
import { paramsCheck } from "../../utils";
import { IIndustry } from "./types";
import { IIndustryPayload } from "./validation";

export const industryApi = {
  getAll: async (
    filter: IFilter
  ): Promise<{ data: IIndustry[] } & IResponse> => {
    try {
      const params = paramsCheck(filter);
      const result = await axios.post(`/industry/filter`, {}, { params });
      return result?.data;
    } catch (error: unknown) {
      throw error;
    }
  },
  getOne: async (industryId: string) => {
    try {
      const result = await axios.get(`/industry/details/${industryId}`);
      return result?.data;
    } catch (error) {
      console.error(error);
    }
  },
  create: async (userId: string, data: IIndustryPayload): Promise<unknown> => {
    try {
      const result = await axios.post(`/industry/create`, data, {
        params: { userId },
      });
      return result?.data;
    } catch (error) {
      console.error("API Request Error:", error);
    }
  },
  update: async (
    industryId: string,
    userId: string,
    data: IIndustryPayload
  ) => {
    try {
      const result = await axios.put(`/industry/${industryId}`, data, {
        params: userId,
      });
      return result?.data;
    } catch (error) {
      console.error(error);
    }
  },
  delete: async (industryId: string) => {
    try {
      const result = await axios.delete(`/industry/${industryId}`);
      return result?.data;
    } catch (error) {
      console.error(error);
    }
  },
};
