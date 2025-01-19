import * as Yup from "yup";

export const productSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  isTaxable: Yup.boolean().required(),
  industryId: Yup.string()
    .required("Industry ID is required")
    .matches(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      "Industry ID must be a valid UUID"
    ),
  type: Yup.string()
    .oneOf(["exemption", "non-exemption"])
    .required("Type is required"),
});

export type IProductPayload = Yup.InferType<typeof productSchema>;
