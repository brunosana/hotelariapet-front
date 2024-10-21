import * as yup from "yup"

export const petSchemaValidator = yup
  .object({
    nome: yup.string().required(),
    raca: yup.string().required(),
    peso: yup.number().min(0.1).required(),
    dataNascimento: yup.date().required(),
  })
  .required()