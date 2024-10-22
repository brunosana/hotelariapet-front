import { api } from "../api";
import { exceptionMapper } from "../exception-mapper";

export async function requestDeleteTutor(id: string): Promise<void> {
    try {
        await api.delete(`/tutores/${id}`);
    } catch(err) {
        exceptionMapper(err);
    }
}