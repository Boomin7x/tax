import axios from "@/config/axios.config";
import { IGetAllTaxation, ITaxations } from "./types";
import { ITaxationPayload } from "./validation";
import { paramsCheck } from "../../utils";
import { IResponse } from "../../types";

export const taxApi = {
  getAll: async (
    filters: IGetAllTaxation
  ): Promise<IResponse & { data: ITaxations[] }> => {
    const params = paramsCheck(filters);
    const result = await axios.post("/taxation/filter", {}, { params });
    return result?.data;
  },
  getOne: async (taxId: string) => {
    const result = await axios.get(`/taxation/details/${taxId}`);
    return result?.data;
  },
  create: async (userId: string, data: ITaxationPayload) => {
    const newInputs = {
      ...data,
      ...(data?.applicableToLocations?.length
        ? {
            applicableToLocations: data?.applicableToLocations?.map(
              (item) => item?.value
            ),
          }
        : {}),
      ...(data?.applicableToBrackets?.length
        ? {
            applicableToBrackets: data?.applicableToBrackets?.map(
              (item) => item?.value
            ),
          }
        : {}),
      ...(data?.applicableToProductServices?.length
        ? {
            applicableToProductServices: data?.applicableToProductServices?.map(
              (item) => item?.value
            ),
          }
        : {}),
      ...(data?.applicableToBreaks?.length
        ? {
            applicableToBreaks: data?.applicableToBreaks?.map(
              (item) => item?.value
            ),
          }
        : {}),
    };
    const result = await axios.post(`/taxation/create`, newInputs, {
      params: { userId },
    });
    return result?.data;
  },
  update: async (taxId: string, userId: string, data: ITaxationPayload) => {
    const newInputs = {
      ...data,
      ...(data?.applicableToLocations?.length
        ? {
            applicableToLocations: data?.applicableToLocations?.map(
              (item) => item?.value
            ),
          }
        : {}),
      ...(data?.applicableToBrackets?.length
        ? {
            applicableToBrackets: data?.applicableToBrackets?.map(
              (item) => item?.value
            ),
          }
        : {}),
      ...(data?.applicableToProductServices?.length
        ? {
            applicableToProductServices: data?.applicableToProductServices?.map(
              (item) => item?.value
            ),
          }
        : {}),
      ...(data?.applicableToBreaks?.length
        ? {
            applicableToBreaks: data?.applicableToBreaks?.map(
              (item) => item?.value
            ),
          }
        : {}),
    };
    const params = {
      userId,
    };
    const result = await axios.put(`/taxation/${taxId}`, newInputs, { params });
    return result?.data;
  },
  delete: async (taxId: string) => {
    const result = await axios.delete(`/taxation/${taxId}`);
    return result?.data;
  },
};
