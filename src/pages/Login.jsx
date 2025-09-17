import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { useState } from "react";

export default function Login({ darkMode, NAVBAR_HEIGHT }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
  };

  return (
    <Box
      sx={{
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
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
            width: "100%",
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
      </Container>
    </Box>
  );
}
