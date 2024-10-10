'use client';

import { Blur } from "@/components/Blur";
import { useStorage } from "@/stores";

export const LayoutClient = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>): JSX.Element => {

    const blur = useStorage((state) => state.blur);

    return (
        <>
            { blur && <Blur />}
            {children}
        </>
    )
}