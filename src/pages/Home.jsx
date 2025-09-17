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
        bgcolor: darkMode ? "#000" : "#fff",
        color: darkMode ? "#fff" : "#000",
        px: 2,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Bienvenido
      </Typography>
      <Typography variant="body1" gutterBottom>
        Prueba
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/login")}
      >
        Comenzar
      </Button>
    </Box>
  );
}
