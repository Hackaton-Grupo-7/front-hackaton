import { Box, Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const buttonStyle = {
    minWidth: 170,
    minHeight: 100,
    fontSize: "1.1rem",
    borderRadius: 2,
    boxShadow: 3,
    textTransform: "none",
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 124px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Panel de Salud
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 400 }}>
        <Grid item>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={() => navigate("/control/allergies")}
          >
            Alergias
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={() => navigate("/control/panel")}
          >
            Panel de Control
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={() => navigate("/control/medications")}
          >
            Medicaciones
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={() => navigate("/control/schedules")}
          >
            Horarios
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
