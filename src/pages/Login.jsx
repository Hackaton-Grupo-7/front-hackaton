import { Box, Typography, TextField, Button, Paper } from "@mui/material";

function Login() {
  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Iniciar sesión
      </Typography>
      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Email" type="email" required />
        <TextField label="Password" type="password" required />
        <Button type="submit" variant="contained" color="primary">
          Entrar
        </Button>
      </Box>
    </Paper>
  );
}

export default Login;
