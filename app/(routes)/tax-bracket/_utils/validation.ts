import * as Yup from "yup";

export const taxtBracketSchema = Yup.object().shape({
  incomeMin: Yup.number()
    .min(Yup.ref("incomeMax"), "Income min must be less than income max")
    .required("Income min is required"),
  incomeMax: Yup.number()
    .max(Yup.ref("incomeMin"), "Income max must be greater than income min")
    .required("Income max is required"),
  description: Yup.string().required("Description is required"),
  type: Yup.string().oneOf(["tax"]).required("Type is required"),
});

export type ItaxtBracketPayload = Yup.InferType<typeof taxtBracketSchema>;
