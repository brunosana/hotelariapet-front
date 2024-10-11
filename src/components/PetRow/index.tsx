import { PetSchema } from "@/types";
import { HiOutlinePencil } from "react-icons/hi";
import { FaRegTrashCan } from "react-icons/fa6";
import { PetStatus } from "../PetStatus";
import { Actions, Content, Info } from "./styles";

type PetProps = {
  pet: PetSchema,
  onEdit: (id: PetSchema['id']) => void;
  onDelete: (id: PetSchema['id']) => void;
}

export const PetRow = ({
  pet, 
  onDelete,
  onEdit,
}: PetProps) : JSX.Element => {
  return (
    <Content> 
      <Info>{pet.id}</Info>
      <Info>{pet.nome}</Info>
      <Info>{pet.especie}</Info>
      <Info>{pet.raca}</Info>
      <Info>{pet.tutorId}</Info>
      <Info>
        <PetStatus pet={pet}/>
      </Info>
      <Actions>
          <HiOutlinePencil/>
          <FaRegTrashCan/>
      </Actions>
    </Content>      
  )
}