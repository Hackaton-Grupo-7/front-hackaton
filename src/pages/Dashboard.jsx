import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 124px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Panel de Salud
      </Typography>
      <Button variant="contained" onClick={() => navigate("/control/allergies")}>
        Alergias
      </Button>
      <Button variant="contained" onClick={() => navigate("/control/panel")}>
        Panel de Control
      </Button>
      <Button variant="contained" onClick={() => navigate("/control/medications")}>
        Medicaciones
      </Button>
      <Button variant="contained" onClick={() => navigate("/control/schedule")}>
        Horarios
      </Button>
    </Box>
  );
}
