import { PetSchema } from "@/types";
import { api } from "../api";
import { exceptionMapper } from "../exception-mapper";

type Output = {
    pets: Array<{
        id: string;
        nome: string;
        idade?: number;
        raca?: string;
        sexo: string;
        especie?: string;
        fotoUrl?: string;
        peso: number;
        tutorId?: string;
        status: string;
    }>;
}

export async function requestListPets(): Promise<Array<PetSchema>> {
    try {
        const { data } = await api.get<Output>('/pets');
        return data.pets;
    } catch(err) {
        exceptionMapper(err);
    }
}