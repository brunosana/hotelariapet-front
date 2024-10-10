import { InputHTMLAttributes, useState } from "react";
import { Container, Content, InputElement, Label, Tooltip } from "./styles"
import { UseFormRegister } from "react-hook-form";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    Icon?: React.ElementType;
    error?: { message?: string; };
    label?: string;
    registerName: string;
    register: UseFormRegister<any>;
}

export const Input = ({ Icon, label, error, register, registerName, ...input }: InputProps): JSX.Element => {
    const [focus, setFocus] = useState(false);
    const [hovering, setHovering] = useState(false);

    return (
        <Container>
            { label && <Label>{label}</Label> }
            { error?.message && hovering && <Tooltip hover={hovering} >{error?.message}</Tooltip>}
            <Content
                error={String(!!error)}
                focus={String(focus)}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
            >
                {Icon && <Icon />}
                <InputElement
                    {...register(registerName)}
                    {...input}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />
            </Content>
        </Container>
    )
}