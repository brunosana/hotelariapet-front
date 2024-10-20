import { TutorSchema } from "@/types";
import { api } from "../api";
import { exceptionMapper } from "../exception-mapper";

type Output = {
    tutores: Array<{
        id: string;
        nome: string;
        email: string;
        telefone: string;
        dataNascimento: string;
        cep: string;
        rua: string;
        bairro: string;
        numero: number;
    }>;
}

export async function requestListTutores(): Promise<Array<TutorSchema>> {
    try {
        const { data } = await api.get<Output>('/tutores');
        return data.tutores;
    } catch(err) {
        exceptionMapper(err);
    }
}