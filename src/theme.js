import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1B3A5C", light: "#2A5A8C", dark: "#0F2440" },
    secondary: { main: "#E8A838", light: "#F0C060", dark: "#C88A20" },
    background: { default: "#F8F6F2", paper: "#FFFFFF" },
    text: { primary: "#2C2C2C", secondary: "#5A5A5A" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, fontSize: "3.5rem", lineHeight: 1.1 },
    h2: { fontWeight: 700, fontSize: "2.5rem" },
    h3: { fontWeight: 600, fontSize: "1.75rem" },
    h4: { fontWeight: 600, fontSize: "1.25rem" },
    body1: { fontSize: "1.05rem", lineHeight: 1.7 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", borderRadius: 8, fontWeight: 600 },
      },
    },
    MuiCard: {
      styleOverrides: { root: { borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" } },
    },
  },
});

export default theme;
