// Layout.jsx
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";


const FOOTER_HEIGHT = 64;
const NAVBAR_HEIGHT = 64;

export default function Layout({ children, darkMode, toggleDarkMode, handleLogout }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        bgcolor: darkMode ? "#000" : "#fff",
        color: darkMode ? "#fff" : "#000",
        overflowX: "hidden",
      }}
    >
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} handleLogout={handleLogout} />

      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          pt: `${NAVBAR_HEIGHT}px`,
          pb: `${FOOTER_HEIGHT}px`,
          boxSizing: "border-box",
          minHeight: `calc(100vh - ${NAVBAR_HEIGHT + FOOTER_HEIGHT}px)`,
        }}
      >
        {children}
      </Box>


      <Footer />
    </Box>
  );
}
