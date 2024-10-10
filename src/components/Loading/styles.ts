import styled from "styled-components";

export const Content = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;

    svg {
        font-size: 100px;
        color: ${({ theme }) => theme.colors.text};
        animation: spin 1s infinite;
    }
`;