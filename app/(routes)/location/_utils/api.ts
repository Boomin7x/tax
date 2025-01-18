import axios from "@/config/axios.config";
import { ILocationPayload } from "./validation";
import { IFilter } from "../../types";
import { paramsCheck } from "../../utils";

export const locationApi = {
  getAll: async (filters: IFilter) => {
    const params = paramsCheck(filters);
    const result = await axios.post(`/location/filter`, {}, { params });
    return result?.data;
  },
  getOne: async (locationId: string) => {
    const result = await axios.get(`/location/details/${locationId}`);
    return result?.data;
  },
  create: async (data: ILocationPayload, userId: string) => {
    const result = await axios.post(`/location/create`, data, {
      params: { userId },
    });
    return result?.data;
  },
  update: async (
    locationId: string,
    userId: string,
    data: ILocationPayload
  ) => {
    const result = await axios.put(`/location/${locationId}`, data, {
      params: userId,
    });
    return result?.data;
  },
  delete: async (locationId: string) => {
    const result = await axios.delete(`/location/${locationId}`);
    return result?.data;
  },
};
