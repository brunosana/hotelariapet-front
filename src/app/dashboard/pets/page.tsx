'use client';
import { requestListPets } from "@/api/requests/list-pets";
import { ActionsArea, ButtonPage, Content, ItemsArea, ItemsHeader, ItemsTitle, Message } from "./styles";
import { Input } from "@/components/Input";
import { IoIosSearch } from "react-icons/io";
import { Dropdown } from "@/components/Dropdown";
import { Loading } from "@/components/Loading";
import { useStorage } from "@/stores";
import { toastError } from "@/toast";
import { PetSchema } from "@/types";
import { useEffect, useState } from "react";
import { PetRow } from "@/components/PetRow";

export default function Pets() {
    const [loading, setLoading] = useState(false);
    const setBlur = useStorage((state) => state.statesChange.setBlur);
    const [pets, setPets] = useState<Array<PetSchema>>([]);

    useEffect(() => {
        setBlur(true);
        setLoading(true);

        requestListPets().then((data) => {
            setPets(data);
            console.log(pets)

        })
        .catch(() => toastError('Erro ao buscar pets'))
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
                 <Dropdown 
                    label="status"
                    defaultOption="TODOS"
                    items={['Ativo', 'Bloqueado', 'No Hotel']}
                    onSelect={() => ({})}
                />
                <Dropdown
                    label="Tutor"
                    defaultOption="TODOS"
                    items={['Teste', 'Teste2']}
                    onSelect={() => ({})}
                />
                <ButtonPage>CRIAR</ButtonPage>
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
                    pets.map(pet => (
                        <PetRow
                            key={pet.id}
                            pet={pet}
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