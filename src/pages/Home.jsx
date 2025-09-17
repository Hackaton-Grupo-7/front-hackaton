// src/pages/Home.jsx
import { Box, Typography, Button } from "@mui/material";

export default function Home({ darkMode }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
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
        Bienvenido a nuestra Hackathon!
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap", justifyContent: "center" }}>
        <Button href="#/login" variant="contained" color="primary">
          Iniciar sesión
        </Button>
        <Button href="#/create-user" variant="outlined" color="secondary">
          Crear cuenta
        </Button>
      </Box>
    </Box>
  );
}
