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

export interface ISheet<I> {
  isOpen: boolean;
  onClose: () => void;
  data?: I;
}

export interface ISheetState<I> {
  data?: I;
  isopen: boolean;
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

export interface IColumnProps<T> {
  onDetails: (data: T) => void;
  onEdit: (data: T) => void;
  onDelete: (data: T) => void;
}

export interface IDeleteModalState {
  open: boolean;
  id: string;
}
