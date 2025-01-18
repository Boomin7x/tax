import axios from "@/config/axios.config";
import { IGetAllTaxation } from "./types";
import { ITaxationPayload } from "./validation";

export const taxApi = {
  getAll: async (filters: IGetAllTaxation) => {
    const params = {
      limit: filters?.limit,
      page: filters?.page,
      ...(filters?.search && { search: filters.search }),
      ...(filters?.searchBy && { searchBy: filters.searchBy }),
      ...(filters?.sortBy && {
        sortBy: {
          ...(filters.sortBy?.createdAt && {
            createdAt: filters.sortBy?.createdAt,
          }),
          ...(filters.sortBy?.updatedAt && {
            updatedAt: filters.sortBy?.updatedAt,
          }),
        },
      }),
    };
    const result = await axios.post("/taxation/filter", {}, { params });
    return result?.data;
  },
  getOne: async (taxId: string) => {
    const result = await axios.get(`/taxation/details/${taxId}`);
    return result?.data;
  },
  create: async (data: ITaxationPayload) => {
    const result = await axios.post(`/taxation/create`, data);
    return result?.data;
  },
  update: async (taxId: string, userId: string, data: ITaxationPayload) => {
    const params = {
      userId,
    };
    const result = await axios.put(`/taxation/${taxId}`, data, { params });
    return result?.data;
  },
  delete: async (taxId: string) => {
    const result = await axios.delete(`/taxation/${taxId}`);
    return result?.data;
  },
};
