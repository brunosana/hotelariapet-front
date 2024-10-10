import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import StyledComponentsRegistry from "@/lib/styled-registry";
import ThemeClient from "@/lib/theme-client";
import ToastClient from "@/lib/toast-client";
import 'react-toastify/dist/ReactToastify.css';
import Hydration from "@/lib/zustand-hydratation";

const roboto = Roboto({ weight: ["100","300","400","500","700","900"], subsets: ['latin']  });

export const metadata: Metadata = {
  title: "Hotelaria Pet",
  description: "Sem Decricao",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <Hydration />
        <ThemeClient>
          <ToastClient />
            <StyledComponentsRegistry>
              {children}
            </StyledComponentsRegistry>
        </ThemeClient>
      </body>
    </html>
  );
}
