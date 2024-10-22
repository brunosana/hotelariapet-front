import { UsuarioSchema } from "@/types";
import { api } from "../api";
import { exceptionMapper } from "../exception-mapper";

type Output = {
    usuarios: Array<{
        id: string;
        nome: string;
        cpf: string;
        dataNascimento: string;
        admin: boolean;
    }>;
}

export async function requestListUsuarios(): Promise<Array<UsuarioSchema>> {
    try {
        const { data } = await api.get<Output>('/usuarios');
        return data.usuarios.map(u => ({
            ...u,
            dataNascimento: new Date(u.dataNascimento),
        }));
    } catch(err) {
        exceptionMapper(err);
    }
}