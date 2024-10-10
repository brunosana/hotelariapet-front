import { ButtonHTMLAttributes } from "react"
import { Container } from "./styles"
import { AiOutlineLoading } from "react-icons/ai";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
}

export const Button = ({ children, loading, ...props }: ButtonProps): JSX.Element => {
    return (
        <Container {...props} >
            { loading ?
                <AiOutlineLoading /> :
                <>{children}</>
            }
        </Container>
    )
}