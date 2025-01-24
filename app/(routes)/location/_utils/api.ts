import axios from "@/config/axios.config";
import { ILocationPayload } from "./validation";
import { IFilter, IResponse } from "../../types";
import { paramsCheck } from "../../utils";
import { ILocation } from "./types";

export const locationApi = {
  getAll: async (
    filters: IFilter
  ): Promise<IResponse & { data: ILocation[] }> => {
    try {
      const params = paramsCheck(filters);
      const result = await axios.post(`/location/filter`, {}, { params });
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
  getOne: async (locationId: string) => {
    try {
      const result = await axios.get(`/location/details/${locationId}`);
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
  create: async (data: ILocationPayload, userId: string) => {
    try {
      const newData = {
        ...data,
        isTaxable: data?.isTaxable === "true",
      };
      const result = await axios.post(`/location/create`, newData, {
        params: { userId },
      });
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
  update: async (
    locationId: string,
    userId: string,
    data: ILocationPayload
  ) => {
    try {
      const newData = {
        ...data,
        isTaxable: data?.isTaxable === "true",
      };
      const result = await axios.put(`/location/${locationId}`, newData, {
        params: { userId },
      });
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
  delete: async (locationId: string) => {
    try {
      const result = await axios.delete(`/location/${locationId}`);
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
};
