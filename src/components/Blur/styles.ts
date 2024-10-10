import styled from "styled-components";

export const Content = styled.div`
    position: absolute;
    z-index: 3;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.overlay_background};
    backdrop-filter: blur(1px);
`;