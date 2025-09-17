import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { useState } from "react";

export default function CreateUser({ darkMode, NAVBAR_HEIGHT }) {
  const [formData, setFormData] = useState({ username: "", name: "", email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("CreateUser data:", formData);
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
          <Typography variant="h5" align="center">Crear cuenta</Typography>
          <TextField label="Username" name="username" value={formData.username} onChange={handleChange} required />
          <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
          <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
          <Button type="submit" variant="contained" color="primary">Crear cuenta</Button>
        </Box>
      </Container>
    </Box>
  );
}
