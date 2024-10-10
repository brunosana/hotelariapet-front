import styled from "styled-components";

export const Container = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    width: 100%;
    padding: 11px 10px;
    background-color: ${({ theme }) => theme.colors.primary};
    border: none;
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.text};
    border: 2px solid ${({ theme }) => theme.colors.primary};

    &:hover {
        cursor: pointer;
        transform: scale(1.01);
    }
    
    &:active {
        transform: scale(0.995);
    }

    svg {
        font-size: 20px;
        animation: spin 1s infinite;
        animation-timing-function: linear;
        
    }
`;