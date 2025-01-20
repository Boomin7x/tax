import { IIndustry } from "../../industry/_utils/types";

export type IProduct = {
  uuid: string;
  createdAt: string;
  createdBy: string;
  updatedBy: null | string;
  deletedAt: null | string;
  updatedAt: string;
  productId: string;
  productCode: string;
  name: string;
  description: string;
  type: string;
  isTaxable: boolean;
  industry: IIndustry;
};
