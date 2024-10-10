import * as yup from "yup"

export type LoginSchema = {
  login: string;
  password: string;
}

export const loginSchemaValidator = yup
  .object({
    login: yup.string().required(),
    password: yup.string().required().min(4),
  })
  .required()