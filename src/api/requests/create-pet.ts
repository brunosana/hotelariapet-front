import { api } from "../api";
import { exceptionMapper } from "../exception-mapper";

type CreatePet = {
    nome: string;
    dataNascimento: Date;
    raca: string;
    sexo: string;
    especie: string;
    peso: number;
    tutorId: string;
}

export async function requestCreatePet(input: CreatePet): Promise<void> {
    try {
        await api.post('/pets', input);
    } catch(err) {
        exceptionMapper(err);
    }
}