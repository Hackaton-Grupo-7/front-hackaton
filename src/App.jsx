import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { useState } from "react";

import Layout from "./components/Layout"; // Navbar + Footer
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";

import Allergies from "./pages/control/Allergies";
import Medications from "./pages/control/Medications";
import Schedule from "./pages/control/Schedules";
import Alarms from "./pages/control/Alarms"; // <-- Importa Alarms

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <Layout darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)}>
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
            <Route path="/login" element={<Login darkMode={darkMode} />} />
            <Route path="/create-user" element={<CreateUser darkMode={darkMode} />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Control Pages */}
            <Route path="/control/allergies" element={<Allergies />} />
            <Route path="/control/medications" element={<Medications />} />
            <Route path="/control/schedules" element={<Schedule />} /> 
            <Route path="/control/alarms" element={<Alarms darkMode={darkMode} />} /> {/* <-- Nueva ruta */}
          </Routes>
        </Box>
      </Layout>
    </Router>
  );
}
