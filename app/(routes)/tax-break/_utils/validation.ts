import * as Yup from "yup";
import { typeValidation } from "../../utils";

export const taxBreakSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  documentRequired: Yup.string().required("Document required is required"),
  eligilityCriteria: Yup.string().required("Eligibility criteria is required"),
  applicableTo: Yup.string()
    .oneOf(["personal", "corporate"])
    .required("Applicable to must be PER"),
  type: typeValidation,
});

export type ITaxBreakPayload = Yup.InferType<typeof taxBreakSchema>;
