import { Box, Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        textAlign: "center",
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
