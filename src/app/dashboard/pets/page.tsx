'use client';
import { requestListPets } from "@/api/requests/list-pets";
import { ActionsArea, ButtonPage, Content, ItemsArea, ItemsHeader, ItemsTitle, Message } from "./styles";
import { Input } from "@/components/Input";
import { IoIosSearch } from "react-icons/io";
import { Dropdown } from "@/components/Dropdown";
import { Loading } from "@/components/Loading";
import { useStorage } from "@/stores";
import { toastError, toastSuccess } from "@/toast";
import { PetSchema, TutorSchema } from "@/types";
import { useEffect, useState } from "react";
import { PetRow } from "@/components/PetRow";
import { applyFilters } from "@/utils";
import { requestListTutores } from "@/api/requests/list-tutores";
import { PetModal } from "@/modals/Pet/Criar";
import { requestDeletePet } from "@/api/requests/delete-pet";
import { ConfirmationModal } from "@/modals/ConfirmationModal";
import { PetEditModal } from "@/modals/Pet/Alterar";

const statusPet = ['TODOS', 'ATIVO', 'BLOQUEADO', 'NO HOTEL'];
export default function Pets() {

    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [loadingTutores, setLoadingTutores] = useState(true);
    const setBlur = useStorage((state) => state.statesChange.setBlur);

    const [pets, setPets] = useState<Array<PetSchema>>([]);
    const [petDelete, setPetDelete] = useState<PetSchema>();
    const [petEdit, setPetEdit] = useState<PetSchema>();
    const [tutores, setTutores] = useState<Array<TutorSchema>>([]);

    const [filteredPets, setFilteredPets] = useState<Array<PetSchema>>([]);
    const [filter, setFilter] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterTutor, setFilterTutor] = useState<string>("TODOS");
    
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleFilterPets = () => applyFilters(pets, filter);

    async function handleStart() {
        try{

            setBlur(true);
            setLoading(true);
    
            const petsApi = await requestListPets()
            .catch(() => {
                toastError('Erro ao buscar pets')
                throw new Error();
            });
            setPets(petsApi);
            setFilteredPets(petsApi);

            const tutoresApi = await requestListTutores()
            .catch(() => {
                toastError('Erro ao buscar tutores')
                throw new Error();
            });
            setTutores(tutoresApi);


        } catch(err) {}
        finally {
            setBlur(false);
            setLoading(false);
            setLoadingTutores(false);
        }
    }

    useEffect(() => {
        handleStart();
    }, []);

    useEffect(() => {
        let finalFilter: Array<PetSchema> = handleFilterPets();
        if(filterStatus !== 'TODOS') {
            finalFilter = finalFilter.filter(h => h.status.toUpperCase().includes(filterStatus));
        }

        if(filterTutor !== 'TODOS') {
            const currentTutor = tutores.find(t => t.nome.toUpperCase() === filterTutor.toUpperCase())
            finalFilter = finalFilter.filter(h => h.tutorId === currentTutor?.id);
        }

        setFilteredPets(finalFilter);
    }, [filter, filterStatus, filterTutor]);

    const handleShowModal = () => {
        setShowModal(true);
        setBlur(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
        setBlur(false);
    }

    const handleShowDeleteModal = (pet: PetSchema) => {
        setPetDelete(pet);
        setShowDeleteModal(true);
        setBlur(true);
    }

    const handleDeletePet = () => {
        if(petDelete) {
            setActionLoading(true)
            requestDeletePet(petDelete.id)
            .then(() => {
                handleCloseDeleteModal();
                toastSuccess('Pet excluído')
            })
            .catch(() => toastError('Erro ao excluir pet'))
            .finally(() => setActionLoading(false));
        }
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

    return(
        <>
        { loading && <Loading /> }
        { showModal && <PetModal onClose={handleCloseModal} /> }
        { showDeleteModal &&
            <ConfirmationModal
                loading={actionLoading}
                onConfirm={handleDeletePet}
                onReject={handleCloseDeleteModal}
            />
        }
        {
            showEditModal && petEdit &&
            <PetEditModal
                pet={petEdit}
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
                    placeholder="Pesquise por código, pet, status..."
                    value={filter}
                    onChange={(e) => {
                        e.preventDefault();
                        setFilter(e.target.value);
                    }}
                 />
                 <div />
                 <Dropdown
                    label="status"
                    defaultOption={statusPet[0]}
                    items={statusPet}
                    value={filterStatus}
                    onUpdate={(st) => setFilterStatus(st)}
                />
                <Dropdown
                    active={!loadingTutores}
                    loading={loadingTutores}
                    label="Tutor"
                    defaultOption="TODOS"
                    items={["TODOS", ...tutores.map(t => t.nome.toUpperCase())]}
                    onUpdate={(t) => setFilterTutor(t)}
                    option={filterTutor}
                />
                <div />
                <ButtonPage onClick={handleShowModal} >CRIAR</ButtonPage>
            </ActionsArea>
            <ItemsArea>
                <ItemsHeader>
                    <ItemsTitle>Id</ItemsTitle>
                    <ItemsTitle>Nome</ItemsTitle>
                    <ItemsTitle>Tipo</ItemsTitle>
                    <ItemsTitle>Raça</ItemsTitle>
                    <ItemsTitle>Tutor</ItemsTitle>
                    <ItemsTitle>Status</ItemsTitle>
                </ItemsHeader>
                {!loading && pets.length == 0 ? <Message>Não foram encontrados pets no sistema</Message> : 
                <>
                {
                    filteredPets.map(pet => (
                        <PetRow
                            key={pet.id}
                            pet={pet}
                            onDelete={() => {
                                handleShowDeleteModal(pet);
                            }}
                            onEdit={() => {
                                setPetEdit(pet);
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