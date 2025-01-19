import * as yup from "yup";
import { typeValidation } from "../../utils";

export const industrySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  type: typeValidation,
});

export type IIndustryPayload = yup.InferType<typeof industrySchema>;
