import { HospedagemSchema } from "@/types"
import { Actions, Content, Info } from "./styles";
import { HiOutlinePencil } from "react-icons/hi";
import { FaRegTrashCan } from "react-icons/fa6";
import { HospedagemStatus } from "../HospedagemStatus";

type HospedagemProps = {
    hospedagem: HospedagemSchema,
    onEdit: (id: HospedagemSchema['id']) => void;
    onDelete: (id: HospedagemSchema['id']) => void;
}

export const HospedagemRow = ({
    hospedagem,
    onDelete,
    onEdit,
}: HospedagemProps): JSX.Element => {
    return (
        <Content>
            <Info>{hospedagem.id}</Info>
            <Info>{hospedagem.inicio.toLocaleDateString('pt-br')}</Info>
            <Info>{hospedagem.fim.toLocaleDateString('pt-br')}</Info>
            <Info>{hospedagem.pet}</Info>
            <Info>{hospedagem.checkin?.toLocaleDateString('pt-br') ?? ''}</Info>
            <Info>{hospedagem.checkout?.toLocaleDateString('pt-br') ?? ''}</Info>
            <Info>
                <HospedagemStatus hospedagem={hospedagem} />
            </Info>
            <Actions>
                <HiOutlinePencil />
                <FaRegTrashCan />
            </Actions>
        </Content>
    )
}