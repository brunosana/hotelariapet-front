import { api } from "../api";
import { exceptionMapper } from "../exception-mapper";

type CreateHospedagem = {
    nome: string;
    cpf: string;
    dataNascimento: Date;
    admin: boolean;
}

export async function requestCreateUsuario(input: CreateHospedagem): Promise<void> {
    try {
        await api.post('/usuarios', input);
    } catch(err) {
        exceptionMapper(err);
    }
}