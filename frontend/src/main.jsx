import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';

const theme = createTheme({
  spacing: 8,
  palette: {
    background: {
      default: '#000',
    },
    text: {
      primary: '#424242',
      secondary: '#E8EAED',
    },
  },
  typography: {
    body1: {
      color:'#E8EAED'
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
);
