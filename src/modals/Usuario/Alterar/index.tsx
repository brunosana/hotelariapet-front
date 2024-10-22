import { IoClose } from "react-icons/io5";
import { Actions, Content, Divisor, Form, Head, Info, Modal, Title } from "../styles"
import { Input } from "@/components/Input";
import { Dropdown } from "@/components/Dropdown";
import { Button } from "@/components/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toastError, toastSuccess } from "@/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { usuarioSchemaValidator } from "@/schemas/usuario.schema";
import { UsuarioSchema } from "@/types";
import { requestEditUsuario } from "@/api/requests/edit-usuario";

type ModalProps = {
    usuario: UsuarioSchema;
    onClose: () => void;
}

type FormProps = {
    nome: string;
    cpf: string;
    dataNascimento: Date;
}

export const UsuarioEditModal = ({
    usuario,
    onClose
}: ModalProps): JSX.Element => {
    const [admin, setAdmin] = useState(usuario.admin ? "SIM" : "NÃO");
    const [loading, setLoading] = useState(false);

    const handleCreateUsuario = (input: FormProps) => {
        setLoading(true);
        requestEditUsuario({
            usuario: {
                id: usuario.id,
                nome: input.nome,
                cpf: input.cpf,
                dataNascimento: input.dataNascimento,
                admin: admin === "SIM"
            }
        })
        .then(() => {
            toastSuccess('Usuário Alterado');
            onClose();
        })
        .catch(() => toastError('Erro ao alterado Usuário'))
        .finally(() => setLoading(false));
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormProps>({
        resolver: yupResolver(usuarioSchemaValidator),
      });

    return (
        <Content>
            <Modal>
                <Actions>
                    <IoClose onClick={onClose} />
                </Actions>
                <Head>
                    <Title>Editar Usuário {usuario.id}</Title>
                    <Info>Preencha os dados corretamente para editar o Usuário {usuario.id}</Info>
                </Head>
                <Form
                    onSubmit={handleSubmit(handleCreateUsuario)}
                >
                    <Input
                        registerName="nome"
                        register={register}
                        label="Nome do Usuário"
                        theme="short"
                        defaultValue={usuario.nome}
                        error={errors.nome}
                    />
                    <Input
                        registerName="cpf"
                        register={register}
                        label="CPF"
                        theme="short"
                        defaultValue={usuario.cpf}
                        error={errors.cpf}
                    />
                    <Dropdown
                        label="Admin"
                        defaultOption={admin}
                        items={["SIM", "NÃO"]}
                        onUpdate={(newAdmin) => setAdmin(newAdmin)}
                    />
                    <Input
                        registerName="dataNascimento"
                        register={register}
                        label="Data de Nascimento"
                        type="date"
                        max={new Date().toISOString().split('T')[0]}
                        defaultValue={usuario.dataNascimento.toISOString().split('T')[0]}
                        theme="short"
                        error={errors.dataNascimento}
                    />
                    <Divisor />
                    <Button loading={loading} >Editar Usuário</Button>
                </Form>
            </Modal>
        </Content>
    )
}