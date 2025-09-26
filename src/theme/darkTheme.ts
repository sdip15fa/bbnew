import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#82b1ff',
    },
    secondary: {
      main: '#ff8a80',
    },
    background: {
      default: '#121212',
      paper: 'rgba(18,18,18,0.8)',
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Montserrat', 'Segoe UI', sans-serif",
    h3: {
      letterSpacing: '-0.02em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});
