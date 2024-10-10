import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: 0.05s;
  }

  *:focus {
    outline: none;
  }
  
  html {
    background-color: ${({ theme }) => theme.colors.background };
  }
  @keyframes tooltipIn {
        from { opacity: 0; top: -5%; };
        to { opacity: 1; top: -18% };
  }

  @keyframes spin {
    from { transform:rotate(0deg); }
    to { transform:rotate(360deg); }
  }

  @keyframes dropdownIn {
        0% { display: none; opacity: 0; top: 108%; };
        1% { opacity: 0; top: 108% };
        100% { opacity: 1; top: 105%; };
  }
  @keyframes dropdownOut {
        0% { opacity: 1; top: 105%; };
        99% { opacity: 0; top: 108% };
        100% { opacity: 0; top: 108%; display: none; };
  }
`;

export default GlobalStyles;