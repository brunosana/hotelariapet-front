import { Button } from "@/components/Button";
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
    max-height: 250px;
    height: 100%;
    border-radius: 17px;

    padding: 20px 30px;

    border: 2px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.background};

    color: ${({ theme }) => theme.colors.text};

    display: flex;
    flex-direction: column;
`;

export const Title = styled.span`
    font-size: 30px;
    font-weight: 700;
    display: block;
`;

export const Description = styled.span`
    display: block;
    margin-top: 1rem;
`;

export const Actions = styled.div`
    display: flex;
    margin-top: auto;
    justify-content: space-between;
`;

export const ConfirmButton = styled(Button)`
    font-size: 18px;
    font-weight: 600;
    width: 45%;
    height: 85%;
`;

export const RejectButton = styled(Button)`
    font-size: 18px;
    font-weight: 600;
    width: 45%;
    height: 85%;
    background-color: ${({ theme }) => theme.colors.error};
    border-color: ${({ theme }) => theme.colors.error};
`;