import { InputHTMLAttributes, useState } from "react";
import { Container, Content, DropdownItems, Item, Label } from "./styles"
import { IoIosArrowDown } from "react-icons/io";
import { RiLoader3Line } from "react-icons/ri";
import { randomUUID } from "crypto";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    items: Array<string>;
    defaultOption?: string;
    option?: string;
    onUpdate?: (option: string) => void;
    loading?: boolean;
    active?: boolean;
}

export const Dropdown = ({
    label,
    defaultOption,
    items,
    onUpdate,
    loading = false,
    option: currentOption,
    active: activeComponent = true,
    ...input
}: InputProps): JSX.Element => {
    const [active, setActive] = useState<boolean | null>(false);
    const [option, setOption] = useState(currentOption ? currentOption : (defaultOption ?? 'Selecione'));

    const handleSelect = (option: string) => {
        setActive(false);
        setOption(option);
        onUpdate && onUpdate(option);
    }

    return (
        <Container>
            { label && <Label>{label}</Label> }
            <Content
                active={String(active)}
                onClick={() => {
                    activeComponent && setActive(!active);
                }}
            >
                {loading ? <RiLoader3Line id="loading-dropdown" /> : <>{currentOption ? currentOption: option}</>}
                <IoIosArrowDown />
            </Content>
            <DropdownItems
                active={String(active)}
            >
                {
                    items.map((item, id) => (
                        <Item
                            key={id}
                            onClick={() => handleSelect(item)}
                        >
                            {item}
                        </Item>
                    ))
                }
            </DropdownItems>
        </Container>
    )
}