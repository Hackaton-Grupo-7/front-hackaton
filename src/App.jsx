import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import { Box } from "@mui/material";

function App() {
  return (
    <Router>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Navbar siempre arriba */}
        <Navbar />

        {/* Contenido principal crece y empuja Footer abajo */}
        <Box sx={{ flex: 1, mt: { xs: 7, sm: 8 } }}> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>

        {/* Footer full-width al final */}
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
