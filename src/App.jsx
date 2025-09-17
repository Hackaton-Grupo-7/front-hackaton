import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: darkMode ? "#000" : "#fff",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        {/* Navbar Fixed */}
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* Contenido principal con padding-top para compensar navbar fixed */}
        <Box 
          component="main"
          sx={{ 
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            paddingTop: "64px", // Altura del navbar para evitar que el contenido quede debajo
            minHeight: "100vh", // Altura mínima total de la ventana
          }}
        >
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} />} />
            <Route path="/login" element={<Login darkMode={darkMode} />} />
            <Route path="/create-user" element={<CreateUser darkMode={darkMode} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>

        {/* Footer (si lo tienes) */}
        <Footer darkMode={darkMode} />
      </Box>
    </Router>
  );
}

export default App;