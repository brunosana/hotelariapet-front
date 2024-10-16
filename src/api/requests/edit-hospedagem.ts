import { HospedagemSchema } from "@/types";
import { api } from "../api";
import { exceptionMapper } from "../exception-mapper";

type EditHospedagem = {
    hospedagem: HospedagemSchema
}

export async function requestEditHospedagem(input: EditHospedagem): Promise<void> {
    try {
        await api.put(`/hospedagens/${input.hospedagem.id}`, input.hospedagem);
    } catch(err) {
        exceptionMapper(err);
    }
}