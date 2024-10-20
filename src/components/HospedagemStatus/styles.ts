import styled from "styled-components";

type Props = {
    bgColor: string;
}
export const Content = styled.div<Props>`
    background-color: ${({ bgColor }) => bgColor};
    color: ${({ theme }) => theme.colors.text};

    padding: 7px;
    max-width: 70%;
    text-align: center;
    cursor: default;
    border-radius: 8px;

    font-weight: 500;
`;
