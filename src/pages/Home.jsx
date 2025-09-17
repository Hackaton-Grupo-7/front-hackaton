import { Box, Typography, Button } from "@mui/material";

export default function Home({ darkMode, NAVBAR_HEIGHT }) {
  return (
    <Box
      sx={{
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
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
      <Button href="#/login" variant="contained" color="primary" sx={{ m: 1 }}>
        Iniciar sesión
      </Button>
      <Button href="#/create-user" variant="outlined" color="secondary" sx={{ m: 1 }}>
        Crear cuenta
      </Button>
    </Box>
  );
}