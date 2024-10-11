import { api } from "../api";
import { exceptionMapper } from "../exception-mapper";
import { HospedagemSchema } from "@/types";

type Output = {
    hospedagens: Array<{
        id: string;
        inicio: string;
        fim: string;
        pet: string;
        checkin?: string;
        checkout?: string;
    }>;
}

function statusHospedagem(hospedagem: Omit<HospedagemSchema, 'status'>) {
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

export async function requestListHospedagens(): Promise<Array<HospedagemSchema>> {
    try {
        const { data } = await api.get<Output>('/hospedagens');
        const output = data.hospedagens.map(hospedagem => ({
            ...hospedagem,
            checkin: hospedagem.checkin ? new Date(hospedagem.checkin) : undefined,
            checkout: hospedagem.checkout ? new Date(hospedagem.checkout) : undefined,
            inicio: new Date(hospedagem.inicio),
            fim: new Date(hospedagem.fim),
        }));
        return output.map(hospedagem => ({
            ...hospedagem,
            status: statusHospedagem(hospedagem),
        }));
    } catch(err) {
        exceptionMapper(err);
    }
}