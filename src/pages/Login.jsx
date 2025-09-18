// src/pages/Login.jsx
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import { getMyUser } from "../services/userService";

export default function Login({ darkMode }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    setError("")
    try {
      const data = await login({ username: formData.username, password: formData.password })
      if (data?.token) {
        localStorage.setItem('token', data.token)
      }
      if (data?.tokenType) {
        localStorage.setItem('tokenType', data.tokenType)
      } else {
        localStorage.setItem('tokenType', 'Bearer')
      }
      if (data?.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken)
      }
      try {
        const me = await getMyUser()
        if (me) localStorage.setItem('user', JSON.stringify(me))
      } catch (e) {
        // ignore
      }
      navigate("/dashboard");
    } catch (err) {
      setError("Usuario o contraseña inválidos")
    } finally {
      setSubmitting(false)
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 124px)", // Navbar + Footer
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: darkMode ? "#000" : "#f9fafb",
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
            bgcolor: darkMode ? "#333" : "#fff",
            color: darkMode ? "#fff" : "#000",
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" align="center">
            Iniciar Sesión
          </Typography>

          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            sx={{
              input: { color: darkMode ? "#fff" : "#000" },
              label: { color: darkMode ? "#ccc" : "#6b7280" },
            }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{
              input: { color: darkMode ? "#fff" : "#000" },
              label: { color: darkMode ? "#ccc" : "#6b7280" },
            }}
          />

          {error && (
            <Typography color="error" variant="body2">{error}</Typography>
          )}

          <Button type="submit" variant="contained" color="primary" disabled={submitting}>
            {submitting ? 'Entrando...' : 'Entrar'}
          </Button>

          <Button
            component={Link}
            to="/create-user"
            variant="contained"
            color="secondary"
          >
            Registrarse
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
