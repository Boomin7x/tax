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
