import { api } from "../api";
import { exceptionMapper } from "../exception-mapper";

type CreateHospedagem = {
    inicio: Date;
    fim: Date;
    pet: string;
}

export async function requestCreateHospedagens(input: CreateHospedagem): Promise<void> {
    try {
        await api.post('/hospedagens', input);
    } catch(err) {
        exceptionMapper(err);
    }
}