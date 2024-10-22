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
import { requestEditPet } from "@/api/requests/edit-pet";

type ModalProps = {
    pet: PetSchema;
    onClose: () => void;
}

type FormProps = {
    nome: string;
    raca: string;
    peso: number;
    dataNascimento: Date;
}

export const PetEditModal = ({
    onClose,
    pet
}: ModalProps): JSX.Element => {
    const [tutores, setTutores] = useState<Array<TutorSchema>>([]);
    const [selectedTutor, setSelectedTutor] = useState<TutorSchema | null>();
    const [sexo, setSexo] = useState(pet.sexo);
    const [especie, setEspecie] = useState(pet.especie);

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const handleEditPet = (input: FormProps) => {
        setLoading(true);
        if(!selectedTutor) {
            toastError('Selecione um tutor');
            return;
        }

        if(!especie) {
            toastError('Selecione uma espécie');
            return;
        }

        requestEditPet({
            pet: {
                nome: input.nome,
                tutorId: selectedTutor.id,
                especie,
                peso: input.peso,
                raca: input.raca,
                sexo,
                id: pet.id,
                // TODO
                idade: pet.idade,
                status: pet.status,
            }
        })
        .then(() => {
            toastSuccess('Pet Alterado');
            onClose();
        })
        .catch(() => toastError('Erro ao alterar Pet'))
        .finally(() => setLoading(false));
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormProps>({
        resolver: yupResolver(petSchemaValidator),
        defaultValues: {
            // TODO
            // @ts-expect-error
            dataNascimento: new Date().toISOString().split('T')[0] as Date,
            nome: pet.nome,
            peso: pet.peso,
            raca: pet.raca
        }
      });

    useEffect(() => {
        requestListTutores().then((tutores) => {
            setTutores(tutores);
            setSelectedTutor(tutores.find(t => t.id === pet.tutorId));
        })
        .finally(() => setInitialLoading(false));
    },[])

    return (
        <Content>
            <Modal>
                <Actions>
                    <IoClose onClick={onClose} />
                </Actions>
                <Head>
                    <Title>Editar Pet {pet.id}</Title>
                    <Info>Preencha os dados corretamente para editar o Pet {pet.id}</Info>
                </Head>
                <Form
                    onSubmit={handleSubmit(handleEditPet)}
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
                        loading={initialLoading}
                        items={tutores.map(pet => pet.nome)}
                        option={selectedTutor?.nome}
                        onUpdate={(newTutor) => setSelectedTutor(tutores.find(tutor => tutor.nome === newTutor))}
                    />
                    <SpliterForm>
                        <Dropdown
                            label="Espécie"
                            option={especie}
                            items={['FELINO', 'AVE', 'ROEDOR', 'LAGOMORFO', 'CANÍDEO']}
                            onUpdate={(especie) => setEspecie(especie)}
                        />
                        <Dropdown
                            label="Sexo"
                            option={sexo}
                            items={["M", "F"]}
                            onUpdate={(sexo) => setSexo(sexo)}
                        />
                    </SpliterForm>
                    <SpliterForm>
                        <Input
                            register={register}
                            registerName="peso"
                            type="number"
                            step=".01"
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
                    <Button loading={loading} >Editar Pet</Button>
                </Form>
            </Modal>
        </Content>
    )
}