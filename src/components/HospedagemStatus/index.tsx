import { HospedagemSchema } from "@/types";
import { Content } from "./styles";

type HospedagemStatusProps = {
    hospedagem: HospedagemSchema;
}

function statusHospedagem(hospedagem: HospedagemSchema) {
    if(hospedagem.checkout) {
        return 'FINALIZADA';
    }
    if(hospedagem.checkin) {
        return 'ATIVA';
    }
    if(Date.now() > hospedagem.fim.getTime()) {
        return 'CANCELADA'
    }
    if(Date.now() > hospedagem.inicio.getTime()) {
        return 'CHECKOUT LATE';
    }
    return 'RESERVA';
}

export const HospedagemStatus = ({ hospedagem }: HospedagemStatusProps): JSX.Element => {
    const status = statusHospedagem(hospedagem);
    const backgroundColor = (() => {
        switch(status) {
            case 'FINALIZADA': return '#868686';
            case 'ATIVA': return '#65C51A';
            case 'CANCELADA': return '#7B1FA2';
            case 'CHECKOUT LATE': return '#FF3333';
            case 'RESERVA': return '#D89108';
        }
    })()
    return (
        <Content
            color={backgroundColor}
        >
            {status}
        </Content>
    );
}