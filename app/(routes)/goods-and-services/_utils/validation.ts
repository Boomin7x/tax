import * as Yup from "yup";
import { typeValidation } from "../../utils";

export const productSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  isTaxable: Yup.string()
    .oneOf(["true", "false"], "must be true or false")
    .required(),
  industryId: Yup.string()
    .required("Industry  is required")
    .matches(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      "Industry ID must be a valid UUID"
    ),
  type: typeValidation,
});

export type IProductPayload = Yup.InferType<typeof productSchema>;
