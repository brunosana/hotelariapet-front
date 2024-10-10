import styled, { css } from "styled-components";
import { Button } from "../Button";

export const Content = styled.div`
    width: 100%;
    max-width: 270px;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
    border-right: 2px solid ${({ theme }) => theme.colors.input_background};
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const NavArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

type NavProps = {
    activePage: string;
}

export const NavItem = styled.div<NavProps>`
    display: flex;
    width: 100%;
    max-width: 214px;
    align-items: center;
    justify-content: flex-start;

    padding: 10px 25px;
    border-radius: 10px;

    ${({ theme, activePage }) => activePage === 'true' && css`svg { color: ${theme.colors.primary}; }`}

    svg {
        font-size: 20px;
    }

    &:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.component_hover};
        svg {
            color: ${({ theme }) => theme.colors.primary};
        }
        span {
            font-weight: 700;
        }
    }
    color: ${({ theme }) => theme.colors.text};
`;
export const NavInfo = styled.span`
    font-weight: 300;
    font-size: 18px;
    margin-left: 15px;
`;

export const LogoArea = styled.div`
    margin-top: 20px;
    margin-bottom: 40px;
`;
