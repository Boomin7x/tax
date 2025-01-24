export interface IGetAllTaxation {
  page: number;
  limit: number;
  sortBy?: {
    createdAt?: "DESC" | "ASC";
    updatedAt?: "DESC" | "ASC";
  };
  search?: string;
  searchBy?: string;
}

export type ITaxations = {
  uuid: string;
  createdAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  deletedAt: string | null;
  updatedAt: string;
  taxId: string;
  taxCode: string;
  name: string;
  description: string;
  rateType: "flat" | "percentage"; // You can specify the possible values for rateType
  taxRate: number;
  flatRate: number | null;
  applicableToLocations: string; // You can specify the possible values for these fields
  applicableToBrackets: string;
  applicableToProductService: string;
  applicableToBreaks: string;
  validityStartDate: string;
  validityEndDate: string | null;
  type: "tax";
};
