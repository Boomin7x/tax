import * as Yup from "yup";

export const taxBreakSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  documentRequired: Yup.string().required("Document required is required"),
  eligilityCriteria: Yup.string().required("Eligibility criteria is required"),
  applicableTo: Yup.string()
    .oneOf(["PER"])
    .required("Applicable to must be PER"),
  type: Yup.string().oneOf(["industry"]).required("Type is required"),
});

export type ITaxBreakPayload = Yup.InferType<typeof taxBreakSchema>;
