import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import "./App.css";
import medications from "./pages/medications"
function App() {
<<<<<<< HEAD
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
=======
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar />

      {/* Contenedor central de ancho máximo, igual que Navbar y Footer */}
      <Container maxWidth="lg" sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", mt: 8, mb: 4 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: 400,
            padding: 4,
            border: "1px solid #ccc",
            borderRadius: 2,
            backgroundColor: "white",
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" align="center">
            Sign Up
          </Typography>

          <TextField label="Username" name="username" value={formData.username} onChange={handleChange} required />
          <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
          <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
>>>>>>> ff5a044025f3bb443380c947dcb7fff71eef4fdf
        </Box>
      </Container>

<<<<<<< HEAD
        {/* Footer (si lo tienes) */}
        <Footer darkMode={darkMode} />
      </Box>
    </Router>
=======
      {/* Footer */}
      <Footer />
    </div>
>>>>>>> ff5a044025f3bb443380c947dcb7fff71eef4fdf
  );
}

export default App;