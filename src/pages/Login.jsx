// src/pages/Login.jsx
import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function Login({ darkMode }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        bgcolor: darkMode ? "#000" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
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
          bgcolor: darkMode ? "#333" : "#fff",
          color: darkMode ? "#fff" : "#000",
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" align="center">Iniciar Sesión</Typography>
        <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary">Entrar</Button>
      </Box>
    </Box>
  );
}
