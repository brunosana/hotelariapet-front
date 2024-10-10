'use client';
import Image from "next/image";
import { Content, LogoArea, NavArea, NavInfo, NavItem } from "./styles"
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaHelmetSafety } from "react-icons/fa6";
import { Routes } from "@/types";
import { usePathname, useRouter } from "next/navigation";




export const Menu = (): JSX.Element => {

    const pathName = usePathname();
    const router = useRouter();

    const handlePush = (input: { path: string; name: string }) => {
        if(pathName !== input.path) {
            router.push(input.path);
        }
    }

    return(
        <Content>
            <LogoArea>
                <Image
                    src='/Logo.svg'
                    width={195}
                    height={40}
                    alt="Logo"
                />
            </LogoArea>
            <NavArea>
                <NavItem
                    activePage={String(pathName === Routes.HOSPEDAGEM.path)}
                    onClick={() => handlePush(Routes.HOSPEDAGEM)}
                >
                    <IoNewspaperOutline />
                    <NavInfo>Hospedagens</NavInfo>
                </NavItem>

                <NavItem
                    activePage={String(pathName === Routes.PETS.path)}
                    onClick={() => handlePush(Routes.PETS)}
                >
                    <MdOutlinePets />
                    <NavInfo>Pets</NavInfo>
                </NavItem>

                <NavItem
                    activePage={String(pathName === Routes.TUTORES.path)}
                    onClick={() => handlePush(Routes.TUTORES)}
                >
                    <FaRegUser />
                    <NavInfo>Tutores</NavInfo>
                </NavItem>

                <NavItem
                    activePage={String(pathName === Routes.USUARIOS.path)}
                    onClick={() => handlePush(Routes.USUARIOS)}
                >
                    <FaHelmetSafety />
                    <NavInfo>Usuários</NavInfo>
                </NavItem>
            </NavArea>
        </Content>
    )
}