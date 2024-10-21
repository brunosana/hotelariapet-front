import { IoClose } from "react-icons/io5";
import { Actions, Content, Divisor, Form, Head, Info, Modal, SpliterForm, Title } from "../styles"
import { Input } from "@/components/Input";
import { Dropdown } from "@/components/Dropdown";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import { PetSchema, TutorSchema } from "@/types";
import { requestListPets } from "@/api/requests/list-pets";
import { useForm } from "react-hook-form";
import { requestCreateHospedagens } from "@/api/requests/create-hospedagens";
import { toastError, toastSuccess } from "@/toast";
import { requestCreatePet } from "@/api/requests/create-pet";
import { requestListTutores } from "@/api/requests/list-tutores";
import { yupResolver } from "@hookform/resolvers/yup";
import { petSchemaValidator } from "@/schemas";

type ModalProps = {
    onClose: () => void;
}

type FormProps = {
    nome: string;
    raca: string;
    peso: number;
    dataNascimento: Date;
}

export const PetModal = ({
    onClose
}: ModalProps): JSX.Element => {
    const [tutores, setTutores] = useState<Array<TutorSchema>>([]);
    const [selectedTutor, setSelectedTutor] = useState<TutorSchema | null>();
    const [sexo, setSexo] = useState('M');
    const [especie, setEspecie] = useState('');

    const [loading, setLoading] = useState(false);

    const handleCreatePet = (input: FormProps) => {
        setLoading(true);
        if(!selectedTutor) {
            toastError('Selecione um tutor');
            return;
        }

        if(!especie) {
            toastError('Selecione uma espécie');
            return;
        }

        requestCreatePet({
            nome: input.nome,
            tutorId: selectedTutor.id,
            dataNascimento: input.dataNascimento,
            especie,
            peso: input.peso,
            raca: input.raca,
            sexo,
        })
        .then(() => {
            toastSuccess('Pet Criado');
            onClose();
        })
        .catch(() => toastError('Erro ao criar Pet'))
        .finally(() => setLoading(false));
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormProps>({
        resolver: yupResolver(petSchemaValidator),
      });

    useEffect(() => {
        requestListTutores().then((tutores) => setTutores(tutores));
    },[])

    return (
        <Content>
            <Modal>
                <Actions>
                    <IoClose onClick={onClose} />
                </Actions>
                <Head>
                    <Title>Registrar novo Pet</Title>
                    <Info>Preencha os dados corretamente para registrar um novo Pet</Info>
                </Head>
                <Form
                    onSubmit={handleSubmit(handleCreatePet)}
                >
                    <Input
                        registerName="nome"
                        register={register}
                        label="Nome do Pet"
                        theme="short"
                        error={errors.nome}
                    />
                    <Dropdown
                        label="Tutor"
                        items={tutores.map(pet => pet.nome)}
                        onUpdate={(newTutor) => setSelectedTutor(tutores.find(tutor => tutor.nome === newTutor))}
                    />
                    <SpliterForm>
                        <Dropdown
                            label="Espécie"
                            items={['FELINO', 'AVE', 'ROEDOR', 'LAGOMORFO', 'CANÍDEO']}
                            onUpdate={(especie) => setEspecie(especie)}
                        />
                        <Dropdown
                            label="Sexo"
                            defaultValue={'M'}
                            items={["M", "F"]}
                            onUpdate={(sexo) => setSexo(sexo)}
                        />
                    </SpliterForm>
                    <SpliterForm>
                        <Input
                            register={register}
                            registerName="peso"
                            type="number"
                            label="Peso"
                            theme="short"
                            error={errors.peso}
                        />
                        <Input
                            register={register}
                            registerName="raca"
                            label="Raça"
                            theme="short"
                            error={errors.raca}
                        />
                    </SpliterForm>
                    <Input
                        registerName="dataNascimento"
                        register={register}
                        label="Data de Nascimento"
                        type="date"
                        max={new Date().toISOString().split('T')[0]}
                        theme="short"
                        error={errors.dataNascimento}
                    />
                    <Divisor />
                    <Button loading={loading} >Criar novo Pet</Button>
                </Form>
            </Modal>
        </Content>
    )
}