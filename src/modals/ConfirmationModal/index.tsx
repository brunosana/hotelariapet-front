import { Actions, ConfirmButton, Content, Description, Modal, RejectButton, Title } from "./styles"

type ModalProps = {
    onConfirm: () => void;
    onReject: () => void;
}

export const ConfirmationModal = ({
    onConfirm,
    onReject
}: ModalProps): JSX.Element => {
    return (
        <Content>
            <Modal>
                <Title>Tem certeza?</Title>
                <Description>Ao clicar em Confirmar, pode ser que a ação seja irreversível. Deseja continuar?</Description>
                <Actions>
                    <ConfirmButton onClick={onConfirm}>Confirmar</ConfirmButton>
                    <RejectButton onClick={onReject}>Rejeitar</RejectButton>
                </Actions>
            </Modal>
        </Content>
    )
}