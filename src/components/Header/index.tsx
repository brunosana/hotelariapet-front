'use client';
import { usePathname, useRouter } from "next/navigation";
import { Content, LogoutButton, Title, UserArea, UserName } from "./styles"
import { FaRegUserCircle } from "react-icons/fa";
import { Routes } from "@/types";
import { useStorage } from "@/stores";
import { toastSuccess } from "@/toast";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";


export const Header = (): JSX.Element => {
    const path = usePathname();
    const router = useRouter();
    const route = Object.values(Routes).filter(key => key.path === path)[0];
    const { setToken, setUser } = useStorage(useShallow((state) => state.statesChange));
    const [user, token] = useStorage(useShallow((state) => [state.user, state.token]));

    const handleLogout = () => {
        toastSuccess('Logout feito com sucesso');
        setToken(null);
        setUser(null);
        router.push(Routes.LOGIN.path);
    }
    
    useEffect(() => {
        if(!token) {
            router.push(Routes.LOGIN.path);
        }
    }, [token]);

    return(
        <Content>
            <Title>{route.name}</Title>
            <UserArea>
                <FaRegUserCircle />
                <UserName>{user}</UserName>
                <LogoutButton onClick={handleLogout}>SAIR</LogoutButton>
            </UserArea>
        </Content>
    )
}