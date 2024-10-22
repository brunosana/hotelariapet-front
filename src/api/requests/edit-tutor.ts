import { TutorSchema } from "@/types";
import { api } from "../api";
import { exceptionMapper } from "../exception-mapper";

type EditTutor = {
    tutor: TutorSchema
}

export async function requestEditTutor(input: EditTutor): Promise<void> {
    try {
        await api.put(`/tutores/${input.tutor.id}`, input.tutor);
    } catch(err) {
        exceptionMapper(err);
    }
}