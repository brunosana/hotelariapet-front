'use client';
import { Input } from "@/components/Input";
import { ActionsArea, ButtonPage, Content, ItemsArea, ItemsHeader, ItemsTitle, Message } from "./styles";
import { IoIosSearch } from "react-icons/io";
import { Dropdown } from "@/components/Dropdown";
import { Loading } from "@/components/Loading";
import { useStorage } from "@/stores";
import { useEffect, useState } from "react";
import { HospedagemSchema } from "@/types";
import { requestListHospedagens } from "@/api/requests/list-hospedagens";
import { toastError, toastSuccess } from "@/toast";
import { HospedagemRow } from "@/components/HospedagemRow";
import { applyFilters } from "@/utils";
import { HospedagemModal } from "@/modals/Hospedagem/Criar";
import { ConfirmationModal } from "@/modals/ConfirmationModal";
import { requestDeleteHospedagen } from "@/api/requests/delete-hospedagens";
import { HospedagemEditModal } from "@/modals/Hospedagem/Alterar";

const status = ['TODAS', 'FINALIZADA', 'ATIVA', 'CANCELADA', 'CHECKOUT', 'RESERVA'];

export default function Hospedagens() {

    const setBlur = useStorage((state) => state.statesChange.setBlur);
    const [hospedagens, setHospedagens] = useState<Array<HospedagemSchema>>([]);
    const [hospedagemEdit, setHospedagemEdit] = useState<HospedagemSchema>();
    const [filteredHospedagens, setFilteredHospedagens] = useState<Array<HospedagemSchema>>([]);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [filter, setFilter] = useState('');
    const [filterStatus, setFilterStatus] = useState('TODAS');
    const [filterDataInicio, setFilterDataInicio] = useState<undefined | string>(undefined);
    const [filterDataFim, setFilterDataFim] = useState<undefined | string>(undefined);

    const handleFilterHospedagens = () => applyFilters(hospedagens, filter);

    const [hospedagemDelete, setHospedagemDelete] = useState<HospedagemSchema>();
    const handleShowDeleteModal = (hospedagem: HospedagemSchema) => {
        setHospedagemDelete(hospedagem);
        setShowDeleteModal(true);
        setBlur(true);
    }

    const handleDeleteHospedagem = () => {
        if(hospedagemDelete) {
            setActionLoading(true)
            requestDeleteHospedagen(hospedagemDelete.id)
            .then(() => {
                handleCloseDeleteModal();
                toastSuccess('Hospedagem excluída')
            })
            .catch(() => toastError('Erro ao excluir hospedagem'))
            .finally(() => setActionLoading(false));
        }
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setBlur(false);
    }

    const handleShowModal = () => {
        setShowModal(true);
        setBlur(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
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

    useEffect(() => {
        let finalFilter: Array<HospedagemSchema> = handleFilterHospedagens();
        if(filterStatus !== 'TODAS') {
            finalFilter = finalFilter.filter(h => h.status.includes(filterStatus));
        }

        if(filterDataInicio) {
            finalFilter = finalFilter.filter(h => h.inicio.getTime() >= new Date(filterDataInicio).getTime());
        }

        if(filterDataFim) {
            finalFilter = finalFilter.filter(h => new Date(filterDataFim).getTime() >= h.inicio.getTime());
        }

        setFilteredHospedagens(finalFilter);
    }, [filter, hospedagens, filterStatus, filterDataInicio, filterDataFim]);

    async function handleStart() {
        setBlur(true);
        setLoading(true);
        try {
            const response = await requestListHospedagens();
            setHospedagens(response);
            setFilteredHospedagens(response);
        } catch(err) {
            toastError('Erro ao buscar hospedagens')
        } finally {
            setBlur(false);
            setLoading(false);
        }
    }
    useEffect(() => {
        handleStart();
    }, []);

    return(
        <>
        { showDeleteModal &&
            <ConfirmationModal
                loading={actionLoading}
                onConfirm={handleDeleteHospedagem}
                onReject={handleCloseDeleteModal}
            />
        }
        { showEditModal && hospedagemEdit &&
            <HospedagemEditModal
                hospedagem={hospedagemEdit}
                onClose={handleCloseEditModal}
            />
        }
        { showModal && <HospedagemModal onClose={handleCloseModal} /> }
        { loading && <Loading /> }
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
                    label="Status"
                    defaultOption="TODAS"
                    items={status}
                    onUpdate={(st) => setFilterStatus(st)}
                />
                <Input
                    label="Data início"
                    theme="short"
                    registerName="Data"
                    type='date'
                    placeholder="Pesquise por código, pet, status..."
                    value={filterDataInicio}
                    onChange={(e) => {
                        e.preventDefault();
                        setFilterDataInicio(e.target.value);
                    }}
                />
                <Input
                    label="Data Fim"
                    theme="short"
                    registerName="Data"
                    type='date'
                    placeholder="Pesquise por código, pet, status..."
                    value={filterDataFim}
                    onChange={(e) => {
                        e.preventDefault();
                        setFilterDataFim(e.target.value);
                    }}
                />
                <div />
                <ButtonPage onClick={handleShowModal} >CRIAR</ButtonPage>
            </ActionsArea>
            <ItemsArea>
                <ItemsHeader>
                    <ItemsTitle>Id</ItemsTitle>
                    <ItemsTitle>Início</ItemsTitle>
                    <ItemsTitle>Fim</ItemsTitle>
                    <ItemsTitle>Pet</ItemsTitle>
                    <ItemsTitle>Checkin</ItemsTitle>
                    <ItemsTitle>Checkout</ItemsTitle>
                    <ItemsTitle>Status</ItemsTitle>
                    <div />
                </ItemsHeader>
                {
                    !loading && hospedagens.length == 0 ?
                    <Message>Não foram encontradas hospedagens no sistema</Message>
                    :
                    <>
                        {
                            filteredHospedagens.map(hospedagem => (
                                <HospedagemRow
                                    key={hospedagem.id}
                                    hospedagem={hospedagem}
                                    onDelete={() => {
                                        handleShowDeleteModal(hospedagem);
                                    }}
                                    onEdit={() => {
                                        setHospedagemEdit(hospedagem);
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