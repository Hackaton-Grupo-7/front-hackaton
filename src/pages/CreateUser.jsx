import { Box, Typography, TextField, Button, Paper } from "@mui/material";

function CreateUser() {
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
        Crear cuenta
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField label="Username" name="username" required />
        <TextField label="Name" name="name" required />
        <TextField label="Email" name="email" type="email" required />
        <TextField label="Password" name="password" type="password" required />
        <Button type="submit" variant="contained" color="primary">
          Registrarse
        </Button>
      </Box>
    </Paper>
  );
}

export default CreateUser;
