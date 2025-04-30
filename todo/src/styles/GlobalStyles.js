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

export const darkTheme = {
  body: '#1a1a1a',
  text: '#f0f0f0',
  primary: '#6a8fc5',
  secondary: '#3a7ca5',
  accent: '#81d4fa',
  cardBg: '#2d2d2d',
  inputBg: '#3d3d3d',
  border: '#444',
  completedText: '#aaa',
  important: '#ff6b6b'
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

  // Добавьте другие глобальные стили по необходимости
`;