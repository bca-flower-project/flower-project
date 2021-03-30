//import React from 'react';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    *,
    *::after, 
    *::before {
        box-sizing: border-box
    }
    

body {
    background: ${({theme}) => theme.body};
    color: ${({theme }) => theme.text};
}`