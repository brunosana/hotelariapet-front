import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 440px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        margin-bottom: 3rem;
    }
`;

export const Form = styled.form`
    width: 100%;
    div {
        margin-bottom: 0.5rem;
    }
    & > div {
        margin-bottom: 1.7rem;
    }
`;
