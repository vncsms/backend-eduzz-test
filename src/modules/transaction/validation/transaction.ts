import * as yup from "yup";

export const createTransactionValidation = yup.object().shape({
  value: yup.number().required().moreThan(0),
});
