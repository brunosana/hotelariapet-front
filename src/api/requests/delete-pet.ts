import { api } from "../api";
import { exceptionMapper } from "../exception-mapper";

export async function requestDeletePet(id: string): Promise<void> {
    try {
        await api.delete(`/pets/${id}`);
    } catch(err) {
        exceptionMapper(err);
    }
}