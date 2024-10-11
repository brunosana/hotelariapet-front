import { Input } from "@/components/Input";
import styled from "styled-components";

export const Content = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Modal = styled.div`
    z-index: 4;
    width: 520px;
    max-height: 770px;
    height: 100%;
    border-radius: 17px;

    padding: 20px 30px;

    background-color: ${({ theme }) => theme.colors.background};
`;

export const Actions = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    svg {
        color: ${({ theme }) => theme.colors.text};
        font-size: 30px;
        
        &:hover {
            transform: scale(1.05);
            cursor: pointer;
            color: ${({ theme }) => theme.colors.primary};
        }
    }
`;

export const Head = styled.div``;
export const Title = styled.span`
    display: block;
    font-weight: 600;
    font-size: 23px;
    color: ${({ theme }) => theme.colors.text};
`;
export const Info = styled.span`
    margin-top: 0.3rem;
    display: block;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 250;
    font-size: 12px;
`;

export const Form = styled.form`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    height: 100%;

    button {
        margin-top: calc(100% - 100px);
    }
`;

export const SpliterForm = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    & > div {
        max-width: 45%;
    }
`;

export const Divisor = styled.div`
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    margin: 2rem 0;
`;

export const Footer = styled.div``;