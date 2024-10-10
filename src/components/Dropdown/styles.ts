import styled, { css } from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
`;

type DropdownProps = {
    active: string;
}

export const Content = styled.div<DropdownProps>`
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;

    width: 100%;
    padding: 6px 8px;
    background-color: ${({ theme }) => theme.colors.component_background};
    border: 2px solid;
    border-radius: 4px;
    border-color: ${({ theme }) => theme.colors.component_background};
    svg {
        color: ${({ theme }) => theme.colors.text};
        font-size: 22px;
        transition: 0.2s;
    }
    display: flex;
    align-items: center;

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        svg {
            color: ${({ theme }) => theme.colors.primary};
        }
    }
    color: ${({ theme }) => theme.colors.text};
    &:hover {
        cursor: pointer;
        svg {
            color: ${({ theme }) => theme.colors.primary};
        }
    }

    ${({ active }) => active === 'true' && css`svg { transform: rotate(180deg);}`}
    ${({ active }) => active === 'false' && css`svg { transform: rotate(0); }`}
`;

export const Label = styled.span`
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
    padding-bottom: .5rem;
    font-size: 14px;
    padding-bottom: .2rem;
    font-weight: 400;
`;

export const DropdownItems = styled.div<DropdownProps>`
    width: 100%;
    position: absolute;
    top: 105%;
    border-radius: 4px;
    overflow: hidden;
    opacity: 0;
    ${({ active }) => active === 'true' && css`animation: dropdownIn 0.2s forwards;`}
    ${({ active }) => active === 'false' && css`animation: dropdownOut 0.2s forwards;`}
    ${({ active }) => active === null && css`display: none;`}
`;

export const Item = styled.span`
    display: flex;
    align-items: center;
    padding: 0 8px;
    width: 100%;
    height: 35px;
    background-color: ${({ theme }) => theme.colors.input_background};
    color: ${({ theme }) => theme.colors.text};

    &:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.component_hover};
    }
`;