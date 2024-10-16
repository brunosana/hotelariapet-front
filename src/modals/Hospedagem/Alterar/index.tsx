import { IoClose } from "react-icons/io5";
import { Actions, Content, Divisor, Form, Head, Info, Modal, SpliterForm, Title } from "../styles"
import { Input } from "@/components/Input";
import { Dropdown } from "@/components/Dropdown";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import { HospedagemSchema, PetSchema } from "@/types";
import { requestListPets } from "@/api/requests/list-pets";
import { useForm } from "react-hook-form";
import { toastError, toastSuccess } from "@/toast";
import { Loading } from "@/components/Loading";
import { requestEditHospedagem } from "@/api/requests/edit-hospedagem";

type ModalProps = {
    onClose: () => void;
    hospedagem: HospedagemSchema;
}

type FormProps = {
    dataInicio: Date;
    dataFim: Date;
}

export const HospedagemEditModal = ({
    onClose,
    hospedagem,
}: ModalProps): JSX.Element => {
    const [pets, setPets] = useState<Array<PetSchema>>([]);
    const [selectedPet, setSelectedPet] = useState<PetSchema | null>();

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInicialLoading] = useState(true);

    const handleEditHospedagem = (input: FormProps) => {
        setLoading(true);
        if(!selectedPet) {
            toastError('Selecione um pet');
            return;
        }
        
        requestEditHospedagem({
            hospedagem: {
                inicio: input.dataInicio,
                fim: input.dataFim,
                id: hospedagem.id,
                pet: selectedPet.nome,
                status: hospedagem.status,
            }
        })
        .then(() => {
            toastSuccess('Hospedagem Editada');
            onClose();
        })
        .catch(() => toastError('Erro ao editar hospedagem'))
        .finally(() => setLoading(false));
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormProps>();

    useEffect(() => {
        console.log(hospedagem);
        requestListPets()
        .then((pets) => {
            setPets(pets);
            setSelectedPet(pets.find(pet => pet.nome === hospedagem.pet));
        })
        .finally(() => setInicialLoading(false));
    },[]);

    return (
        <Content>
            <Modal>
                { initialLoading && <Loading /> }
                <Actions>
                    <IoClose onClick={onClose} />
                </Actions>
                <Head>
                    <Title>Editar hospedagem {hospedagem.id }</Title>
                    <Info>Preencha os dados corretamente para registrar uma nova hospedagem</Info>
                </Head>
                <Form
                    onSubmit={handleSubmit(handleEditHospedagem)}
                >
                    <Dropdown
                        label="Hóspede"
                        loading={initialLoading}
                        defaultOption={pets.find(pet => pet.nome === hospedagem.pet)?.nome ?? '--'}
                        option={selectedPet?.nome}
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
                            defaultValue={hospedagem.inicio.toISOString().split('T')[0]}
                            min={new Date().toISOString().split('T')[0]}
                        />
                        <Input
                            label="Data Fim"
                            register={register}
                            registerName="dataFim"
                            theme="short"
                            type="date"
                            defaultValue={hospedagem.fim.toISOString().split('T')[0]}
                        />
                    </SpliterForm>
                    <Divisor />
                    <Button loading={loading} >Editar Hospedagem</Button>
                </Form>
            </Modal>
        </Content>
    )
}