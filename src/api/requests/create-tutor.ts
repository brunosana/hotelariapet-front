import { api } from "../api";
import { exceptionMapper } from "../exception-mapper";

type CreateTutor = {
    nome: string;
    email: string;
    telefone: string;
    dataNascimento: string;
    cep: string;
    rua: string;
    bairro: string;
    numero: number;
}

export async function requestCreatePet(input: CreateTutor): Promise<void> {
    try {
        await api.post('/tutores', input);
    } catch(err) {
        exceptionMapper(err);
    }
}