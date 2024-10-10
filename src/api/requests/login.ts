import { LoginSchema } from "@/schemas";
import { api } from "../api";
import { exceptionMapper } from "../exception-mapper";

type Output = {
    token: string;
}

export async function requestLogin(input: LoginSchema): Promise<string> {
    try {
        const { data } = await api.post<Output>('/login');
        return data.token;
    } catch(err) {
        exceptionMapper(err);
    }
}