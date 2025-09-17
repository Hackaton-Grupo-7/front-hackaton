import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";

const FOOTER_HEIGHT = 64; // ajusta según tu footer

export default function Layout({ children, darkMode, toggleDarkMode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        bgcolor: darkMode ? "#000" : "#fff",
        color: darkMode ? "#fff" : "#000",
        overflowX: "hidden", // evita scroll horizontal
      }}
    >
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          px: 2,
          mt: "64px", // espacio para navbar
          pb: `${FOOTER_HEIGHT}px`, // espacio para footer
          boxSizing: "border-box",
        }}
      >
        {children}
      </Box>

      <Box sx={{ height: `${FOOTER_HEIGHT}px`, flexShrink: 0 }}>
        <Footer />
      </Box>
    </Box>
  );
}
