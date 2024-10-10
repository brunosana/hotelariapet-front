import { InputHTMLAttributes, useState } from "react";
import { Container, Content, InputElement, Label, Tooltip } from "./styles"
import { UseFormRegister } from "react-hook-form";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    Icon?: React.ElementType;
    error?: { message?: string; };
    label?: string;
    registerName: string;
    register?: UseFormRegister<any>;
    theme?: 'default' | 'short';
}

export const Input = ({
    Icon,
    label,
    error,
    register,
    registerName,
    theme = 'default',
    ...input
}: InputProps): JSX.Element => {
    const [focus, setFocus] = useState(false);
    const [hovering, setHovering] = useState(false);
    const outputs = register && register(registerName);

    return (
        <Container>
            { label && <Label themeStyle={theme} >{label}</Label> }
            { error?.message && hovering && <Tooltip hover={hovering} >{error?.message}</Tooltip>}
            <Content
                themeStyle={theme}
                error={String(!!error)}
                focus={String(focus)}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
            >
                {Icon && <Icon />}
                <InputElement
                    themeStyle={theme}
                    {...outputs}
                    {...input}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />
            </Content>
        </Container>
    )
}