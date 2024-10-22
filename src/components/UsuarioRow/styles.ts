import styled from "styled-components";

export const Content = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 2fr 2fr 2fr 1fr 2fr;
    gap: 15px;
    padding: 15px 15px;
    border-radius: 5px;
    align-items: center;

    &:hover {
        background-color: ${({ theme }) => theme.colors.component_hover};
    }
`;

export const Info = styled.span`
    color: ${({ theme }) => theme.colors.text};
    font-size: 12px;
    cursor: default;
`;

export const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    color: ${({ theme }) => theme.colors.text};
    svg {
        margin-left: 10px;

        &:hover {
            color: ${({ theme }) => theme.colors.primary};
            cursor: pointer;
        }
    }
`;