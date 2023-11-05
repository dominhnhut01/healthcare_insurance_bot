import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';

const theme = createTheme({
  spacing: 8,
  palette: {
    background: {
      default: '#D2EEFC',
      secondary: '#FFF',
    },
    text: {
      primary: '#44b8f3',
      secondary: '#1A3673',
    },
  },
  typography: {
    body1: {
      color:'#E8EAED'
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
);
