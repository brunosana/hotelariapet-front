import { TutorSchema } from "@/types";
import { HiOutlinePencil } from "react-icons/hi";
import { FaRegTrashCan } from "react-icons/fa6";
import { TutorAtivo } from "../TutorAtivo";
import { Actions, Content, Info } from "./styles";

type TutorProps = {
  tutor: TutorSchema,
  onEdit: () => void;
  onDelete: () => void;
}

export const TutorRow = ({
  tutor, 
  onDelete,
  onEdit,
} : TutorProps) : JSX.Element => {
  return (
    <Content>
      <Info>{tutor.id}</Info>
      <Info>{tutor.nome}</Info>
      <Info>{tutor.dataNascimento}</Info>
      <Info>{tutor.telefone}</Info>
      <Info>{tutor.email}</Info>
      <Info>
        <TutorAtivo tutor={tutor}/>
      </Info>
      <Actions>
        <HiOutlinePencil onClick={onEdit} />
        <FaRegTrashCan onClick={onDelete}></FaRegTrashCan>
      </Actions>
    </Content>

  )
}