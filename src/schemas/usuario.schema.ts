import * as yup from "yup"

export const usuarioSchemaValidator = yup
  .object({
    nome: yup.string().required(),
    cpf: yup.string().required(),
    dataNascimento: yup.date().required(),
  })
  .required()