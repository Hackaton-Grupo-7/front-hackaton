// src/App.jsx
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";

const NAVBAR_HEIGHT = 64; // Altura del navbar
const FOOTER_HEIGHT = 60; // Altura aproximada del footer

function App() {
  const darkMode = false; // tu estado de darkMode

  return (
    <Router>
      {/* Navbar fijo */}
      <Navbar NAVBAR_HEIGHT={NAVBAR_HEIGHT} darkMode={darkMode} />

      {/* Contenedor central que mantiene las páginas centradas */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: `calc(100vh - ${NAVBAR_HEIGHT + FOOTER_HEIGHT}px)`,
          mt: `${NAVBAR_HEIGHT}px`, // para que no quede detrás del navbar
          px: 2, // margen lateral responsive
          textAlign: "center",
        }}
      >
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/login" element={<Login darkMode={darkMode} />} />
          <Route path="/create-user" element={<CreateUser darkMode={darkMode} />} />
        </Routes>
      </Box>

      {/* Footer fijo abajo */}
      <Footer />
    </Router>
  );
}

export default App;
