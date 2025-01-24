import * as yup from "yup";

export const taxationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  rateType: yup
    .string()
    .oneOf(["percentage", "flat"])
    .required("Rate type is required"),
  taxRate: yup.number().required("Tax rate is required"),
  flatRate: yup.number().required("Flat rate is required"),
  applicableToLocations: yup
    .string()
    .required("Applicable locations are required"),
  applicableToBrackets: yup
    .string()
    .required("Applicable brackets are required"),
  applicableToProductService: yup
    .string()
    .required("Applicable product/service is required"),
  applicableToBreaks: yup.string().required("Applicable breaks are required"),
  validityStartDate: yup.date().required("Validity start date is required"),
  validityEndDate: yup.date().required("Validity end date is required"),
});

export type ITaxationPayload = yup.InferType<typeof taxationSchema>;
