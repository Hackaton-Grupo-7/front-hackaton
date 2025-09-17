// src/components/Layout.jsx
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";

const NAVBAR_HEIGHT = 64;
const FOOTER_HEIGHT = 60;

export default function Layout({ children, darkMode }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar NAVBAR_HEIGHT={NAVBAR_HEIGHT} darkMode={darkMode} />

      <Box
        sx={{
          flex: 1,
          mt: `${NAVBAR_HEIGHT}px`,
          mb: `${FOOTER_HEIGHT}px`,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
}
