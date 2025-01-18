import * as yup from "yup";

export const industrySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  type: yup.string().oneOf(["tax bracket"]).required("Type is required"),
});

export type IIndustryPayload = yup.InferType<typeof industrySchema>;
