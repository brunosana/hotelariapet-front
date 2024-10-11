import { api } from "../api";
import { exceptionMapper } from "../exception-mapper";

export async function requestDeleteHospedagen(id: string): Promise<void> {
    try {
        await api.delete(`/hospedagens/${id}`);
    } catch(err) {
        exceptionMapper(err);
    }
}