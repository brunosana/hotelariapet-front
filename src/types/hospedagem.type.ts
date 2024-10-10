export type HospedagemSchema = {
    id: string;
    status: string;
    inicio: Date;
    fim: Date;
    pet: string;
    checkin?: Date;
    checkout?: Date;
}