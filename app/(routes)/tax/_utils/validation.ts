import * as yup from "yup";

export const taxationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  rateType: yup
    .string()
    .oneOf(["percentage", "flat"])
    .required("Rate type is required"),
  taxRate: yup.number().required("Tax rate is required"),
  flatRate: yup.number(),

  applicableToLocations: yup
    .array()
    .of(yup.object().shape({ value: yup.string(), label: yup.string() })),
  // .required("Applicable locations are required"),
  applicableToBrackets: yup
    .array()
    .of(yup.object().shape({ value: yup.string(), label: yup.string() })),
  // .required("Applicable brackets are required"),
  applicableToBreaks: yup
    .array()
    .of(yup.object().shape({ value: yup.string(), label: yup.string() })),
  // .required("Applicable breaks are required"),
  applicableToProductServices: yup
    .array()
    .of(yup.object().shape({ value: yup.string(), label: yup.string() })),
  // .required("Applicable product/services are required"),

  validityStartDate: yup
    .date()
    .typeError(`Validity start date is required`)
    .required("Validity start date is required"),
  validityEndDate: yup.date().typeError(`Validity end date is not valid`),
});

export type ITaxationPayload = yup.InferType<typeof taxationSchema>;
