import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#f5f5f5',
  text: '#333',
  primary: '#4a6fa5',
  secondary: '#166088',
  accent: '#4fc3f7',
  cardBg: '#fff',
  inputBg: '#fff',
  border: '#ddd',
  completedText: '#888',
  important: '#ff5252'
};


export const GlobalStyles = createGlobalStyle`
  body {
    background: ${props => props.theme.body};
    color: ${props => props.theme.text};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    transition: all 0.3s ease;
    margin: 0;
    padding: 0;
  }

  .app-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  button {
    cursor: pointer;
    transition: all 0.2s;
  }

`;