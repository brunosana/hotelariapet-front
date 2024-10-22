import { api } from "../api";
import { exceptionMapper } from "../exception-mapper";

export async function requestDeleteUsuario(id: string): Promise<void> {
    try {
        await api.delete(`/usuarios/${id}`);
    } catch(err) {
        exceptionMapper(err);
    }
}