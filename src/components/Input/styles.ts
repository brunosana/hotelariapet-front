import styled, { css } from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
`;

type ThemeProps = {
    themeStyle: 'default' | 'short';
}

type ContentProps =  ThemeProps & {
    focus: string;
    error: string;
}

export const Content = styled.div<ContentProps>`
    width: 100%;
    padding: 11px 10px;
    background-color: ${({ theme }) => theme.colors.component_background};
    border: 2px solid;
    border-radius: 4px;
    ${({ theme, focus, error }) => error === "true" ?
        css`border-color: ${theme.colors.error};`:
        focus === "true" ?
        css`border-color: ${theme.colors.primary};`:
        css`border-color: ${theme.colors.component_background};`
    }
    svg {
        ${({ theme, focus, error }) => error === 'true' ?
            css`border-color: ${theme.colors.error};`:
            focus === 'true' ?
            css`color: ${theme.colors.primary};`:
            css`color: ${theme.colors.text};`
        }
        font-size: 24px;
        margin-right: 15px;
    }
    display: flex;
    align-items: center;

    ${({ themeStyle }) => themeStyle === 'short' &&
        css`
            padding: 6px 8px;
            svg {
                font-size: 22px;
            }
        `
    };
`;

export const InputElement = styled.input<ThemeProps>`
    color: ${({ theme }) => theme.colors.text};
    
    &::placeholder {
        color: ${({ theme }) => theme.colors.component_background_alternative};
    }
    font-size: 18px;
    border: none;
    background: none;
    width: 100%;
    height: auto;

    &[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }
    ${({ themeStyle }) => themeStyle === 'short' &&
        css`
            font-size: 15px;
        `
    };
`;

export const Label = styled.span<ThemeProps>`
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
    padding-bottom: .5rem;

    ${({ themeStyle }) => themeStyle === 'short' &&
        css`
            font-size: 14px;
            padding-bottom: .2rem;
            font-weight: 400;
        `
    };
`;

type TooltipProps= {
    hover: boolean;
}
export const Tooltip = styled.span<TooltipProps>`
    background-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.text};
    position: absolute;
    left: 25%;
    top: -18%;
    padding: 0.5rem;
    text-align: center;
    border-radius: 4px;
    
    &:after {
        content:'';
        top: 98%;
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 0;
        height: 0;
        border-top: 8px solid ${({ theme }) => theme.colors.error};
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
    }

    ${({ hover }) => hover && css`
        animation: tooltipIn 0.1s forwards;
    `}
`;