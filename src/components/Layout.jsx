// Layout.jsx
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";


const FOOTER_HEIGHT = 64;
const NAVBAR_HEIGHT = 64;

export default function Layout({ children, darkMode, toggleDarkMode, isLoggedIn, setIsLoggedIn }) {
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
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

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
          bgcolor: darkMode ? "#121212" : "#f9f9f9",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        {children}
      </Box>


      <Footer darkMode={darkMode} />
    </Box>
  );
}
