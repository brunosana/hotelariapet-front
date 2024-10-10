export type HospedagemSchema = {
    id: string;
    inicio: Date;
    fim: Date;
    pet: string;
    checkin?: Date;
    checkout?: Date;
}