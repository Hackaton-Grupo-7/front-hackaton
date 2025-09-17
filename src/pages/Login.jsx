// src/pages/Login.jsx
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ darkMode }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    // Simulación login correcto
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 124px)", // Navbar + Footer
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: darkMode ? "#000" : "#fff",
        color: darkMode ? "#fff" : "#000",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 4,
            border: "1px solid #ccc",
            borderRadius: 2,
            bgcolor: darkMode ? "#333" : "#fff",
            color: darkMode ? "#fff" : "#000",
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" align="center">
            Iniciar Sesión
          </Typography>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>
          <Button
            component={Link}
            to="/create-user"
            variant="outlined"
            color="secondary"
          >
            Registrarse
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
