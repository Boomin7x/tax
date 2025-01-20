export type IFilter = {
  page: number;
  limit: number;
  sortBy?: {
    createdAt?: "DESC" | "ASC";
    updatedAt?: "DESC" | "ASC";
  };
  search?: string;
  searchBy?: string;
};

export interface IModal {
  isOpen: boolean;
  onClose: () => void;
  data?: object;
}

export type Imeta = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: [string, string][];
};

export type IResponse = {
  links: { current: string };
  meta: Imeta;
};
