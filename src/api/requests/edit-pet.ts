import { PetSchema } from "@/types";
import { api } from "../api";
import { exceptionMapper } from "../exception-mapper";

type EditHospedagem = {
    pet: PetSchema
}

export async function requestEditPet(input: EditHospedagem): Promise<void> {
    try {
        await api.put(`/pets/${input.pet.id}`, input.pet);
    } catch(err) {
        exceptionMapper(err);
    }
}