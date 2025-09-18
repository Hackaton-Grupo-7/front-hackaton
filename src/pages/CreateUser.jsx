// CreateUser.jsx
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateUser({ darkMode }) {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Simulated registration:", formData);
    // Simulación: redirige al login
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 124px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: darkMode ? "#121212" : "#f5f5f5",
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
            width: "100%",
            padding: 4,
            borderRadius: 2,
            bgcolor: darkMode ? "#1f2937" : "#ffffff",
            color: darkMode ? "#fff" : "#000",
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" align="center">Crear cuenta</Typography>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            InputLabelProps={{ style: { color: darkMode ? "#ccc" : "#333" } }}
            InputProps={{ style: { color: darkMode ? "#fff" : "#000" } }}
          />
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            InputLabelProps={{ style: { color: darkMode ? "#ccc" : "#333" } }}
            InputProps={{ style: { color: darkMode ? "#fff" : "#000" } }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            InputLabelProps={{ style: { color: darkMode ? "#ccc" : "#333" } }}
            InputProps={{ style: { color: darkMode ? "#fff" : "#000" } }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            InputLabelProps={{ style: { color: darkMode ? "#ccc" : "#333" } }}
            InputProps={{ style: { color: darkMode ? "#fff" : "#000" } }}
          />
          <Button type="submit" variant="contained" sx={{ bgcolor: "#3ecf8e", "&:hover": { bgcolor: "#10b981" } }}>
            Crear cuenta
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
