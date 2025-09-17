import { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import Medications from "./pages/control/Medications"; // tu nueva página

function App() {
  const NAVBAR_HEIGHT = 64;
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: darkMode ? "#000" : "#fff",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        {/* Navbar con toggle dark mode */}
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* Contenido principal centrado */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            pt: `${NAVBAR_HEIGHT}px`, // evita que quede oculto por el navbar
            width: "100%",
            px: 2, // padding horizontal para móviles
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/medications" element={<Medications />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>

        {/* Footer */}
        <Footer darkMode={darkMode} />
      </Box>
    </Router>
  );
}

export default App;
