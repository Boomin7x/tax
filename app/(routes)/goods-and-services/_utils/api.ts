import axios from "@/config/axios.config";
import { IProductPayload } from "./validation";
import { IFilter, IResponse } from "../../types";
import { paramsCheck } from "../../utils";
import { IProduct } from "./types";

export const productApi = {
  create: async (userId: string, data: IProductPayload) => {
    try {
      const result = await axios.post(`/product/create`, data, {
        params: userId,
      });
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
  getAll: async (
    filters: IFilter
  ): Promise<IResponse & { data: IProduct[] }> => {
    try {
      const params = paramsCheck(filters);
      const result = await axios.post(`/product/filter`, {}, { params });
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
  getOne: async (productId: string) => {
    try {
      const result = await axios.get(`/product/details/${productId}`);
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
  update: async (productId: string, userId: string, data: IProductPayload) => {
    try {
      const result = await axios.put(`/product/${productId}`, data, {
        params: { userId },
      });
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
  delete: async (productId: string) => {
    try {
      const result = await axios.delete(`/product/${productId}`);
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
};
