'use client';
import { useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import Image from "next/image";
import { Container, Content, Form } from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema, loginSchemaValidator } from "@/schemas";
import { requestLogin } from "@/api";
import { toastError, toastSuccess } from "@/toast";
import { useState } from "react";
import { useStorage } from "@/stores";
import { Routes } from "@/types";
import { useRouter } from "next/navigation";

export default function Login() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setToken, setUser } = useStorage((state) => state.statesChange);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchemaValidator),
  });

  const onSubmit = (data: LoginSchema) => {
    setLoading(true);
    requestLogin(data)
    .then((token) => {
      toastSuccess('Login feito com sucesso');
      setToken(token);
      setUser(data.login);
      router.push(Routes.HOSPEDAGEM.path)
    })
    .catch(err => toastError(err.message))
    .finally(() => setLoading(false));
  };

  return (
    <Container>
      <Content>
        <Image
          src='/Logo.svg'
          width={195}
          height={40}
          alt="Logo Hotelaria Pet"
        />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              label="Usuário"
              register={register}
              registerName="login"
              placeholder="Digite o seu usuário..."
              error={errors.login}
            />
            <Input
              label="Senha"
              register={register}
              registerName="password"
              placeholder="Digite a sua senha..."
              type="password"
              error={errors.password}
            />
          </div>
          <Button loading={loading} type="submit">ENVIAR</Button>
        </Form>
      </Content>
    </Container>
  );
}
