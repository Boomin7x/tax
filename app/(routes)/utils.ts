import { IFilter } from "./types";
import * as yup from "yup";

export const paramsCheck = (filters: IFilter) => ({
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
});

export const typeValidation = yup
  .string()
  .oneOf([
    "tax",
    "industry",
    "product",
    "location",
    "tax bracket",
    "exemption",
    "tax",
  ])
  .required("Type is required");

export const filterOut = (a: string) => {
  return (
    a !== "createdBy" &&
    a !== "updatedBy" &&
    a !== "deletedAt" &&
    a !== "type" &&
    a !== "uuid"
  );
};

export const isValidISODate = (dateString: string): boolean => {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  return isoDateRegex.test(dateString);
};
