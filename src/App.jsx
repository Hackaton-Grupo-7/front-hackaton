import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { useState } from "react";

import Layout from "./components/Layout"; // contiene Navbar + Footer

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";

import Allergies from "./pages/control/Allergies";
import ControlPanel from "./pages/control/ControlPanel";
import Medications from "./pages/control/Medications";
import Schedule from "./pages/control/Schedules"; // <-- Importa Schedule (el componente)

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <Layout darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)}>
        {/* Contenedor central de páginas */}
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
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} />} />
            <Route path="/login" element={<Login darkMode={darkMode} />} />
            <Route path="/create-user" element={<CreateUser darkMode={darkMode} />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Control Pages */}
            <Route path="/control/allergies" element={<Allergies />} />
            <Route path="/control/panel" element={<ControlPanel />} />
            <Route path="/control/medications" element={<Medications />} />
            <Route path="/control/schedules" element={<Schedule />} /> 
          </Routes>
        </Box>
      </Layout>
    </Router>
  );
}
