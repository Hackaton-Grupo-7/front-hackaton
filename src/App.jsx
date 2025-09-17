import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} NAVBAR_HEIGHT={NAVBAR_HEIGHT} />} />
            <Route path="/login" element={<Login darkMode={darkMode} NAVBAR_HEIGHT={NAVBAR_HEIGHT} />} />
            <Route path="/create-user" element={<CreateUser darkMode={darkMode} NAVBAR_HEIGHT={NAVBAR_HEIGHT} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>

        <Footer darkMode={darkMode} />
      </Box>
    </Router>
  );
}

export default App;
