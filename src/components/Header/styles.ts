import styled from "styled-components";
import { Button } from "../Button";

export const Content = styled.div`
    width: 100%;
    min-height: 80px;
    background-color: ${({ theme }) => theme.colors.background};
    border-bottom: 2px solid ${({ theme }) => theme.colors.input_background};
    display: flex;
    align-items: center;
    padding: 0 40px;
    justify-content: space-between;
`;

export const Title = styled.span`
    font-size: 30px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
`;

export const UserArea = styled.div`
    display: flex;
    align-items: center;

    svg {
        min-width: 24px;
        font-size: 24px;
        color: ${({ theme }) => theme.colors.primary};
    }
`;

export const UserName = styled.span`
    margin: 0 8px;
    font-size: 16px;
    font-weight: 500;
    min-width: 78px;
    color: ${({ theme }) => theme.colors.text};
`;

export const LogoutButton = styled(Button)`
    font-size: 12px;
    padding: 7px 10px;
    background-color: ${({ theme }) => theme.colors.input_background};
    border-color: ${({ theme }) => theme.colors.input_background};
    border: none;
    width: 78px;
`;
