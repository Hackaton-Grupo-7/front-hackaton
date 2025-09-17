import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 8,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Bienvenid@ a nuestro proyecto 🚀
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Este es el punto de partida. Elige una opción para continuar.
      </Typography>
      <Button
        component={Link}
        to="/login"
        variant="contained"
        color="primary"
        sx={{ mr: 2 }}
      >
        Iniciar sesión
      </Button>
      <Button
        component={Link}
        to="/register"
        variant="outlined"
        color="secondary"
      >
        Registrarse
      </Button>
    </Box>
  );
}

export default Home;
