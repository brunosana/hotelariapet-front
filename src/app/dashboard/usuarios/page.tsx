'use client';
import { ActionsArea, ButtonPage, Content, ItemsArea, ItemsHeader, ItemsTitle, Message } from "./styles";
import { Input } from "@/components/Input";
import { IoIosSearch } from "react-icons/io";
import { Dropdown } from "@/components/Dropdown";
import { Loading } from "@/components/Loading";
import { useStorage } from "@/stores";
import { toastError, toastSuccess } from "@/toast";
import { UsuarioSchema } from "@/types";
import { useEffect, useState } from "react";
import { applyFilters } from "@/utils";
import { requestListUsuarios } from "@/api/requests/list-usuarios";
import { UsuarioRow } from "@/components/UsuarioRow";
import { ConfirmationModal } from "@/modals/ConfirmationModal";
import { requestDeleteUsuario } from "@/api/requests/delete-usuario";
import { UsuarioModal } from "@/modals/Usuario/Criar";
import { UsuarioEditModal } from "@/modals/Usuario/Alterar";

export default function Usuarios() {

    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const setBlur = useStorage((state) => state.statesChange.setBlur);

    const [usuarios, setUsuarios] = useState<Array<UsuarioSchema>>([]);
    const [usuarioDelete, setUsuarioDelete] = useState<UsuarioSchema>();
    const [usuarioEdit, setUsuarioEdit] = useState<UsuarioSchema>();

    const [filteredUsuarios, setFilteredUsuarios] = useState<Array<UsuarioSchema>>([]);
    const [filter, setFilter] = useState('');
    const [filterNivel, setFilterNivel] = useState<string>("TODOS");
    
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleFilterPets = () => applyFilters(usuarios, filter);

    async function handleStart() {
        try{

            setBlur(true);
            setLoading(true);
    
            const usuariosApi = await requestListUsuarios()
            .catch(() => {
                toastError('Erro ao buscar usuários');
                throw new Error();
            });
            setUsuarios(usuariosApi);
            setFilteredUsuarios(usuariosApi);

        } catch(err) {}
        finally {
            setBlur(false);
            setLoading(false);
        }
    }

    useEffect(() => {
        handleStart();
    }, []);

    useEffect(() => {
        let finalFilter: Array<UsuarioSchema> = handleFilterPets();
        console.log('filtro Inicial', finalFilter);

        if(filterNivel !== "TODOS") {
            const check = filterNivel === "ADMIN";
            finalFilter = finalFilter.filter(us => us.admin === check);
        }

        console.log('filtro Final', finalFilter);
        setFilteredUsuarios(finalFilter);
    }, [filter, filterNivel]);

    const handleShowModal = () => {
        setShowModal(true);
        setBlur(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
        setBlur(false);
    }

    const handleShowDeleteModal = (usuario: UsuarioSchema) => {
        setUsuarioDelete(usuario);
        setShowDeleteModal(true);
        setBlur(true);
    }

    const handleShowEditModal = () => {
        setShowEditModal(true);
        setBlur(true);
    }
    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setBlur(false);
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setBlur(false);
    }

    const handleDeletePet = () => {
        if(usuarioDelete) {
            setActionLoading(true)
            requestDeleteUsuario(usuarioDelete.id)
            .then(() => {
                handleCloseDeleteModal();
                toastSuccess('Usuário excluído')
            })
            .catch(() => toastError('Erro ao excluir usuário'))
            .finally(() => setActionLoading(false));
        }
    }

    return(
        <>
        { loading && <Loading /> }
        { showModal && <UsuarioModal onClose={handleCloseModal} /> }
        { showDeleteModal &&
            <ConfirmationModal
                loading={actionLoading}
                onConfirm={handleDeletePet}
                onReject={handleCloseDeleteModal}
            />
        }
        {
            showEditModal && usuarioEdit &&
            <UsuarioEditModal
                usuario={usuarioEdit}
                onClose={handleCloseEditModal}
            />
        }
        <Content>
            <ActionsArea>
                <Input
                    label="Buscar" 
                    theme="short" 
                    registerName="search" 
                    Icon={IoIosSearch} 
                    placeholder="Pesquise por nome, cnpj, etc."
                    value={filter}
                    onChange={(e) => {
                        e.preventDefault();
                        setFilter(e.target.value);
                    }}
                 />
                 <div />
                <Dropdown
                    label="Nivel"
                    defaultOption="TODOS"
                    items={["TODOS", "ADMIN", "NORMAL"]}
                    onUpdate={(t) => setFilterNivel(t)}
                    option={filterNivel}
                />
                <div />
                <ButtonPage onClick={handleShowModal} >CRIAR</ButtonPage>
            </ActionsArea>
            <ItemsArea>
                <ItemsHeader>
                    <ItemsTitle>Id</ItemsTitle>
                    <ItemsTitle>Nome</ItemsTitle>
                    <ItemsTitle>Cpf</ItemsTitle>
                    <ItemsTitle>Data de Nascimento</ItemsTitle>
                    <ItemsTitle>Admin</ItemsTitle>
                </ItemsHeader>
                {!loading && usuarios.length == 0 ? <Message>Não foram encontrados usuários no sistema</Message> : 
                <>
                {
                    filteredUsuarios.map(usuario => (
                        <UsuarioRow
                            key={usuario.id}
                            usuario={usuario}
                            onDelete={() => {
                                handleShowDeleteModal(usuario);
                            }}
                            onEdit={() => {
                                setUsuarioEdit(usuario);
                                handleShowEditModal();
                            }}
                        />
                    ))
                }
            </>
                }
            </ItemsArea>
        </Content>
        </>
    )
}