import { TutorSchema } from "@/types";
import { Content } from './styles';

type TutorAtivoProps = {
  tutor: TutorSchema;
}

function statusTutor(tutor: TutorSchema) {
  if (tutor.ativo) {
    return 'Ativo'
  } else {
    return 'Inativo'
  }
}

export const TutorAtivo = ({ tutor }: TutorAtivoProps): any => {
  const status = statusTutor(tutor);
  const backgroundColor = (() => {
    switch(status) {
      case 'Ativo': return '#65C51A';
      case 'Inativo': return '#FF3333';
    }
  })()
  return (
    <Content bgColor={backgroundColor}>
      {status} 
    </Content>)
    ;
}