import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import "./App.css";

function App() {
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
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
