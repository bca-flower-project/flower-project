import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *,
    *::after,
    *::before {
        box-sizing: border-box
    }


body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
}

button {
    color: ${({ theme }) => theme.button};
    background-color: ${({ theme }) => theme.color};
}`;
