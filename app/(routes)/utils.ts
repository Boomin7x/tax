import { IFilter } from "./types";

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
