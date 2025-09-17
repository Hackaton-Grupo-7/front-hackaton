import { Box, Typography, Button } from "@mui/material";

export default function Home({ darkMode }) {
  return (
    <Box
      sx={{
        flex: 1, // Toma todo el espacio disponible del contenedor padre
        width: "100%", // Ocupa todo el ancho disponible
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: darkMode ? "#000" : "#fff",
        color: darkMode ? "#fff" : "#000",
        px: 2,
        py: 4, // Padding vertical para mejor espaciado
        boxSizing: "border-box", // Incluye padding en el cálculo del tamaño
        minHeight: "calc(100vh - 64px)", // Altura mínima menos la altura del navbar
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