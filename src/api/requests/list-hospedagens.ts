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

export async function requestListHospedagens(): Promise<Array<HospedagemSchema>> {
    try {
        const { data } = await api.get<Output>('/hospedagens');
        return data.hospedagens.map(hospedagem => ({
            ...hospedagem,
            checkin: hospedagem.checkin ? new Date(hospedagem.checkin) : undefined,
            checkout: hospedagem.checkout ? new Date(hospedagem.checkout) : undefined,
            inicio: new Date(hospedagem.inicio),
            fim: new Date(hospedagem.fim),
        }));
    } catch(err) {
        exceptionMapper(err);
    }
}