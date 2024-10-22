'use client'
import { useEffect, useState } from 'react'
import { useStorage } from "@/stores";
import { Loading } from "@/components/Loading";
import { Dropdown } from "@/components/Dropdown";
import { IoIosSearch } from 'react-icons/io';
import { toastError, toastSuccess } from "@/toast";
import { ActionsArea, ButtonPage, Content, ItemsArea, ItemsHeader, ItemsTitle, Message } from "./styles";
import { Input } from "@/components/Input";
import { TutorSchema } from '@/types';
import { TutorRow } from '@/components/TutorRow';
import { requestListTutores } from '@/api/requests/list-tutores';
import { ConfirmationModal } from "@/modals/ConfirmationModal";
import { TutorModal } from '@/modals/Tutor/Criar';

const statusTutor = ['TODOS', 'ATIVO', 'INATIVO']
export default function Hospedagens() {
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [tutorDelete, setTutorDelete] = useState<TutorSchema>();
    const [tutorEdit, setTutorEdit] = useState<TutorSchema>();
    const [loadingTutores, setLoadingTutores] = useState(true);
    const [filterStatus, setFilterStatus] = useState('');
    const setBlur = useStorage((state) => state.statesChange.setBlur);
    const [tutores, setTutores] = useState<Array<TutorSchema>>([]);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
        setBlur(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
        setBlur(false);
    }

    const handleShowDeleteModal = (tutor: TutorSchema) => {
        setTutorDelete(tutor);
        setShowDeleteModal(true);
        setBlur(true);
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setBlur(false);
    }

    const handleShowEditModal = () => {
        setShowEditModal(true);
        setBlur(true);
    }
    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setBlur(false);
    }

    async function handleStart() {
        try {
            setBlur(true);
            setLoading(true);

            const tutoresApi = await requestListTutores()
            .catch(() => {
                toastError('Erro ao buscar tutores')
                throw new Error();
            });
            setTutores(tutoresApi);
        } catch(err) {

        }
        finally {
            setBlur(false);
            setLoading(false);
            setLoadingTutores(false);
        }
    }

    useEffect(() => {
        handleStart();
    }, [])

    return(
        <>
            { loading && <Loading/> }
            {showModal && <TutorModal onClose={handleCloseModal}/>}
            { showDeleteModal &&
            <ConfirmationModal
                loading={actionLoading}
                onConfirm={() => {}}
                onReject={handleCloseDeleteModal}
            />
        }
            <div style={{ display: 'flex' }} >tutores</div>
            <Content>
                <ActionsArea>
                    <Input
                        label="Buscar"
                        theme="short"
                        registerName="search"
                        Icon={IoIosSearch}
                        placeholder="Pesquise por código, tutor, status..."
                        // value={filter}
                        // onChange={(e) => {
                        //     e.preventDefault();
                        //     setFilter(e.target.value);
                        // }}
                    >
                    </Input>
                    <Dropdown
                        label="status"
                        defaultOption={'Todos'}
                        items={statusTutor}
                        value={filterStatus}
                        onUpdate={(e) => {
                           
                        }}
                    >
                    </Dropdown>
                    <ButtonPage onClick={handleShowModal} >CRIAR</ButtonPage>
                </ActionsArea>
                <ItemsArea>
                    <ItemsHeader>
                        <ItemsTitle>Id</ItemsTitle>
                        <ItemsTitle>Nome</ItemsTitle>
                        <ItemsTitle>Data de Nascimento</ItemsTitle>
                        <ItemsTitle>Telefone</ItemsTitle>
                        <ItemsTitle>Email</ItemsTitle>
                        <ItemsTitle>Ativo</ItemsTitle>
                    </ItemsHeader>
                    {!loading && tutores.length == 0 ? <Message>Não foram encontrados tutores no sistema</Message>  : 
                    <>
                    {
                    tutores.map(tutor => (
                        <TutorRow
                            key={tutor.id}
                            tutor={tutor}
                            onDelete={() => {handleShowDeleteModal(tutor);}}
                            onEdit={() => {setTutorEdit(tutor);
                                handleShowEditModal();}}
                        />
                    ))
                }
                    </>}
                </ItemsArea>
            </Content>
        </>
    )
}