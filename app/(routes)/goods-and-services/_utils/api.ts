import axios from "@/config/axios.config";
import { IProductPayload } from "./validation";
import { IFilter } from "../../types";
import { paramsCheck } from "../../utils";

export const productApi = {
  create: async (userId: string, data: IProductPayload) => {
    const result = await axios.post(`/product/create`, data, {
      params: userId,
    });
    return result?.data;
  },
  getAll: async (filters: IFilter) => {
    const params = paramsCheck(filters);
    const result = await axios.post(`/product/filter`, {}, { params });
    return result?.data;
  },
  getOne: async (productId: string) => {
    const result = await axios.get(`/product/details/${productId}`);
    return result?.data;
  },
  update: async (productId: string, userId: string, data: IProductPayload) => {
    const result = await axios.put(`/product/${productId}`, data, {
      params: { userId },
    });
    return result?.data;
  },
  delete: async (productId: string) => {
    const result = await axios.delete(`/product/${productId}`);
    return result?.data;
  },
};
