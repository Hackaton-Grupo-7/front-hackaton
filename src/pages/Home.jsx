// src/pages/Home.jsx
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home({ darkMode }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 124px)", // respeta navbar + footer
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: darkMode ? "#121212" : "#f9f9f9",
        color: darkMode ? "#fff" : "#000",
        px: 3,
        py: 4,
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 2,
          letterSpacing: 1,
          color: darkMode ? "#4fc3f7" : "#1976d2"  // azul claro en oscuro, azul principal en claro
        }}
      >
        Bienvenid@s a Sanimed
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        sx={{ maxWidth: 600, mb: 4, lineHeight: 1.6 }}
      >
        Gestiona tus medicamentos y cuida tu salud de manera fácil y segura.
        Proyecto desarrollado en la <strong>Hackathon Factoria F5</strong> en colaboración con <strong>Sanitas</strong>.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ px: 5, py: 1.5, fontSize: "1.1rem", borderRadius: 2 }}
        onClick={() => navigate("/login")}
      >
        Comenzar
      </Button>
    </Box>
  );
}