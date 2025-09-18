import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";

import Layout from "./components/Layout"; // Navbar + Footer
import ScrollToTop from "./components/ScrollToTop";
import { getUser } from "./services/authStorage";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";
import Creators from "./pages/Creators";

import Allergies from "./pages/control/Allergies";
import Medications from "./pages/control/Medications";
import Schedule from "./pages/control/Schedules";
import Alarms from "./pages/control/Alarms"; // <-- Importa Alarms

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificar estado de login al cargar la app
  useEffect(() => {
    const user = getUser();
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!(user && token));
  }, []);

  return (
    <Router>
      <Layout
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            px: 2,
          }}
        >
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} />} />
            <Route path="/login" element={<Login darkMode={darkMode} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/create-user" element={<CreateUser darkMode={darkMode} />} />
            <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
            <Route path="/creators" element={<Creators darkMode={darkMode}/>} />

            {/* Control Pages */}
            <Route path="/control/allergies" element={<Allergies darkMode={darkMode} />} />
            <Route path="/control/medications" element={<Medications darkMode={darkMode} />} />
            <Route path="/control/schedules" element={<Schedule darkMode={darkMode} />} />
            <Route path="/control/alarms" element={<Alarms darkMode={darkMode} />} /> {/* <-- Nueva ruta */}
          </Routes>
        </Box>
      </Layout>
    </Router>
  );
}
