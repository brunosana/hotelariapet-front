import { HospedagemSchema } from "@/types";
import { Content } from "./styles";

type HospedagemStatusProps = {
    hospedagem: HospedagemSchema;
}

export const HospedagemStatus = ({ hospedagem }: HospedagemStatusProps): JSX.Element => {
    const backgroundColor = (() => {
        switch(hospedagem.status) {
            case 'FINALIZADA': return '#868686';
            case 'ATIVA': return '#65C51A';
            case 'CANCELADA': return '#7B1FA2';
            case 'CHECKOUT LATE': return '#FF3333';
            case 'RESERVA':
            default: return '#D89108';
        }
    })()
    return (
        <Content
            color={backgroundColor}
        >
            {hospedagem.status}
        </Content>
    );
}