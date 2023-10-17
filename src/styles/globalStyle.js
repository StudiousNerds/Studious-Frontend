import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    
      html,
      body {
        width: 100%;
        height: 100%;
      }
    
      :root{
        --vh: 100%;
    
      }
      
      #root {
        margin: 0 auto;
      }
      
      html {
        font-size: 62.5%;
      }

      * {
        box-sizing: border-box;
      }
      
      button {
        cursor: pointer;
        border: none;
        outline: none;
        background-color: transparent;
        -webkit-tap-highlight-color : transparent;
        &:disabled {
          cursor: not-allowed
        }
      }
    
      input {
        outline: none;
      }
      
      a, a:visited {
        text-decoration: none;
        color: black;
      }
    
      input[type='number']::-webkit-outer-spin-button,
      input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
`;

export default GlobalStyle;
