import { Button } from "@/components/Button";
import styled from "styled-components";

export const Content = styled.div`
    padding: 15px 25px;
`;

export const ActionsArea = styled.div`
    display: grid;
    grid-template-columns: 3fr 0.2fr 1fr 1fr 0.1fr 1fr;
    gap: 15px;
    align-items: center;
`;

export const ItemsArea = styled.div`
    margin-top: 3rem;
`;

export const ItemsHeader = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 2fr 1.5fr 1.5fr 1fr 2fr 2fr;
    gap: 15px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.input_background};
    padding: 0 15px;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
`;

export const ItemsTitle = styled.span`
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    font-size: 14px;
    cursor: default;
`;

export const ButtonPage = styled(Button)`
    padding: 7px 8px;
    margin-top: auto;
    margin-bottom: 2px;
    font-size: 15px;
`;

export const Message = styled.span`
    margin-top: 25px;
    display: block;
    width: 100%;
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
    cursor: default;
`;