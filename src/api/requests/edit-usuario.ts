import { UsuarioSchema } from "@/types";
import { api } from "../api";
import { exceptionMapper } from "../exception-mapper";

type EditUsuario = {
    usuario: UsuarioSchema
}

export async function requestEditUsuario(input: EditUsuario): Promise<void> {
    try {
        await api.put(`/usuarios/${input.usuario.id}`, input.usuario);
    } catch(err) {
        exceptionMapper(err);
    }
}