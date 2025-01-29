import { IProduct } from "../../goods-and-services/_utils/types";
import { ILocation } from "../../location/_utils/types";
import { ITaxBracket } from "../../tax-bracket/_utils/type";
import { ITaxBreak } from "../../tax-break/_utils/type";

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
  applicableToLocations: ILocation[]; // You can specify the possible values for these fields
  applicableToBrackets: ITaxBracket[];
  applicableToProductService: IProduct[];
  applicableToBreaks: ITaxBreak[];
  validityStartDate: string;
  validityEndDate: string | null;
  type: "tax";
};
