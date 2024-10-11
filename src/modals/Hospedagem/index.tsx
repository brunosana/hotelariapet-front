import { IoClose } from "react-icons/io5";
import { Actions, Content, Divisor, Form, Head, Info, Modal, SpliterForm, Title } from "./styles"
import { Input } from "@/components/Input";
import { Dropdown } from "@/components/Dropdown";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import { PetSchema } from "@/types";
import { requestListPets } from "@/api/requests/list-pets";
import { useForm } from "react-hook-form";
import { requestCreateHospedagens } from "@/api/requests/create-hospedagens";
import { toastError, toastSuccess } from "@/toast";

type ModalProps = {
    onClose: () => void;
}

type FormProps = {
    dataInicio: Date;
    dataFim: Date;
}

export const HospedagemModal = ({
    onClose
}: ModalProps): JSX.Element => {
    const [pets, setPets] = useState<Array<PetSchema>>([]);
    const [selectedPed, setSelectedPet] = useState<PetSchema | null>();

    const [loading, setLoading] = useState(false);

    const handleCreateHospedagem = (input: FormProps) => {
        setLoading(true);
        if(!selectedPed) {
            toastError('Selecione um pet');
            return;
        }
        requestCreateHospedagens({
            inicio: input.dataInicio,
            fim: input.dataFim,
            pet: selectedPed.id,
        })
        .then(() => {
            toastSuccess('Hospedagem Criada');
            onClose();
        })
        .catch(() => toastError('Erro ao criar hospedagem'))
        .finally(() => setLoading(false));
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormProps>();

    useEffect(() => {
        requestListPets().then((pets) => setPets(pets));
    },[])

    return (
        <Content>
            <Modal>
                <Actions>
                    <IoClose onClick={onClose} />
                </Actions>
                <Head>
                    <Title>Registrar nova hospedagem</Title>
                    <Info>Preencha os dados corretamente para registrar uma nova hospedagem</Info>
                </Head>
                <Form
                    onSubmit={handleSubmit(handleCreateHospedagem)}
                >
                    <Dropdown
                        label="Hóspede"
                        defaultOption={pets[0]?.nome ?? '--'}
                        items={pets.map(pet => pet.nome)}
                        onUpdate={(newPet) => setSelectedPet(pets.find(pet => pet.nome === newPet))}
                    />
                    <SpliterForm>
                        <Input
                            label="Data Inicio"
                            register={register}
                            registerName="dataInicio"
                            theme="short"
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                        />
                        <Input
                            label="Data Fim"
                            register={register}
                            registerName="dataFim"
                            theme="short"
                            type="date"
                        />
                    </SpliterForm>
                    <Divisor />
                    <Button loading={loading} >Criar nova Hospedagem</Button>
                </Form>
            </Modal>
        </Content>
    )
}