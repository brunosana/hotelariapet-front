import { defaultTheme } from "@/styles";

type Theme = typeof defaultTheme

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}