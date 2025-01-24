import * as yup from "yup";
import { typeValidation } from "../../utils";

export const locationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  town: yup.string().required("Town is required"),
  city: yup.string().required("City is required"),
  region: yup.string().required("Region is required"),
  country: yup.string().required("Country is required"),
  description: yup.string().required("Description is required"),
  isTaxable: yup
    .string()
    .oneOf(["true", "false"], "must be either true or false")
    .required("Taxable status is required"),

  type: typeValidation,
});

export type ILocationPayload = yup.InferType<typeof locationSchema>;
