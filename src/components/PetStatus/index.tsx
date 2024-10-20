import { PetSchema } from "@/types";
import { Content } from './styles';

type PetStatusProps = {
  pet: PetSchema;
}

function statusPet(pet: PetSchema) {
  return pet.status;
}

export const PetStatus = ({ pet }: PetStatusProps): any => {
  const status = statusPet(pet);
  const backgroundColor = (() => {
    switch(status) {
      case 'Ativo': return '#65C51A';
      case 'Bloqueado': return '#FF3333';
      case 'No Hotel': return '#D89108';
      default: return '#111111';
    }
  })()
  return (
    <Content bgColor={backgroundColor}>
      {status} 
    </Content>)
    ;
}