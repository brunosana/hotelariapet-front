import { UsuarioSchema } from "@/types";
import { HiOutlinePencil } from "react-icons/hi";
import { FaRegTrashCan } from "react-icons/fa6";
import { PetStatus } from "../PetStatus";
import { Actions, Content, Info } from "./styles";

type PetProps = {
  usuario: UsuarioSchema,
  onEdit: () => void;
  onDelete: () => void;
}

export const UsuarioRow = ({
  usuario, 
  onDelete,
  onEdit,
}: PetProps) : JSX.Element => {
  return (
    <Content> 
      <Info>{usuario.id}</Info>
      <Info>{usuario.nome}</Info>
      <Info>{usuario.cpf}</Info>
      <Info>{usuario.dataNascimento.toLocaleDateString('pt-br')}</Info>
      <Info>{usuario.admin ? "SIM" : "NÃO"}</Info>
      <Actions>
          <HiOutlinePencil onClick={onEdit} />
          <FaRegTrashCan onClick={onDelete} />
      </Actions>
    </Content>      
  )
}