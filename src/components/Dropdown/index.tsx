import { InputHTMLAttributes, useState } from "react";
import { Container, Content, DropdownItems, Item, Label } from "./styles"
import { IoIosArrowDown } from "react-icons/io";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    items: Array<string>;
    defaultOption: string;
    onSelect: (option: string) => void;
}

export const Dropdown = ({
    label,
    defaultOption,
    items,
    onSelect,
    ...input
}: InputProps): JSX.Element => {
    const [active, setActive] = useState<boolean | null>();
    const [option, setOption] = useState(defaultOption);

    const handleSelect = (option: string) => {
        setActive(false);
        setOption(option);
        onSelect(option);
    }

    return (
        <Container>
            { label && <Label>{label}</Label> }
            <Content
                active={String(active)}
                onClick={() => setActive(!active)}
            >
                {option}
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