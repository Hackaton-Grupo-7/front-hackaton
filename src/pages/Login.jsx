import { useState } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
        <Typography variant="h5" align="center">
          Iniciar Sesión
        </Typography>
        <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary">
          Entrar
        </Button>
      </Box>
    </Container>
  );
}
