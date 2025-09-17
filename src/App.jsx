import { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import "./App.css";

// Página de bienvenida
function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Bienvenido a nuestra Hackathon!
      </Typography>
      <Button href="#/login" variant="contained" color="primary" sx={{ m: 1 }}>
        Iniciar sesión
      </Button>
      <Button href="#/register" variant="outlined" color="secondary" sx={{ m: 1 }}>
        Registrarse
      </Button>
    </Box>
  );
}

// Página de login
function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 8, mb: 2, display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          padding: 4,
          border: "1px solid #ccc",
          borderRadius: 2,
          backgroundColor: "white",
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" align="center">Iniciar Sesión</Typography>
        <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary">Entrar</Button>
      </Box>
    </Container>
  );
}

// Página de registro
function Register() {
  const [formData, setFormData] = useState({ username: "", name: "", email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register data:", formData);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 8, mb: 2, display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          padding: 4,
          border: "1px solid #ccc",
          borderRadius: 2,
          backgroundColor: "white",
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" align="center">Registrarse</Typography>
        <TextField label="Username" name="username" value={formData.username} onChange={handleChange} required />
        <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
        <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary">Crear cuenta</Button>
      </Box>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />

        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </Router>
  );
}

export default App;
