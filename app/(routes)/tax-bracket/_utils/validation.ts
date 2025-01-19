import * as Yup from "yup";
import { typeValidation } from "../../utils";

export const taxtBracketSchema = Yup.object().shape({
  incomeMin: Yup.number()
    .max(Yup.ref("incomeMax"), "Income min must be less than income max")
    .required("Income min is required"),
  incomeMax: Yup.number()
    .min(Yup.ref("incomeMin"), "Income max must be greater than income min")
    .required("Income max is required"),

  description: Yup.string().required("Description is required"),
  type: typeValidation,
});
export type ItaxtBracketPayload = Yup.InferType<typeof taxtBracketSchema>;
