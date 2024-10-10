import { AxiosError } from "axios";

export function exceptionMapper(error: Error | any): never {
    if(error instanceof AxiosError) {
        throw new Error(error.message);
    }
    throw new Error('ocorreu um erro')
}