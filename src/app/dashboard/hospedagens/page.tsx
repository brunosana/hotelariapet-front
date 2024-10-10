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
import { toastError } from "@/toast";
import { HospedagemRow } from "@/components/HospedagemRow";

export default function Hospedagens() {

    const setBlur = useStorage((state) => state.statesChange.setBlur);
    const [hospedagens, setHospedagens] = useState<Array<HospedagemSchema>>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setBlur(true);
        setLoading(true);

        requestListHospedagens()
        .then((data) => {
            setHospedagens(data);
        })
        .catch(() => toastError('Erro ao buscar hospedagens'))
        .finally(() => {
            setBlur(false);
            setLoading(false);
        })
    }, [])

    return(
        <>
        { loading && <Loading /> }
        <Content>
            <ActionsArea>
                <Input
                    label="Buscar"
                    theme="short"
                    registerName="search"
                    Icon={IoIosSearch}
                    placeholder="Pesquise por código, pet, status..."
                />
                <div />
                <Dropdown
                    label="Status"
                    defaultOption="TODAS"
                    items={['teste', 'legal']}
                    onSelect={() => ({})}
                />
                <Input
                    label="Data início"
                    theme="short"
                    registerName="Data"
                    type='date'
                    placeholder="Pesquise por código, pet, status..."
                />
                <Input
                    label="Data Fim"
                    theme="short"
                    registerName="Data"
                    type='date'
                    placeholder="Pesquise por código, pet, status..."
                />
                <div />
                <ButtonPage>CRIAR</ButtonPage>
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
                            hospedagens.map(hospedagem => (
                                <HospedagemRow
                                    key={hospedagem.id}
                                    hospedagem={hospedagem}
                                    onDelete={() => {}}
                                    onEdit={() => {}}
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