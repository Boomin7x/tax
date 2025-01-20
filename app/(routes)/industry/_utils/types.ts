import * as yup from "yup";
import { typeValidation } from "../../utils";
export type IIndustry = {
  uuid: string;
  createdAt: string;
  createdBy: string;
  updatedBy: string | null;
  deletedAt: string | null;
  updatedAt: string;
  industryId: string;
  name: string;
  type: yup.InferType<typeof typeValidation>;
  industryCode: string;
  description: string;
};
