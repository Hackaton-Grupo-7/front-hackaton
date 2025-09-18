// src/components/BottomNav.jsx
import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BottomNav({ darkMode, handleLogout }) {
  const navigate = useNavigate();

  const bgColor = darkMode ? "#1f2937" : "#f3f4f6";
  const textColor = darkMode ? "#e5e7eb" : "#111827";

  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        width: "100%",
        bgcolor: bgColor,
        py: 2,
        px: 4,
        boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
        mt: 4,
        zIndex: 10,
      }}
    >
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Inicio
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate(-1)}
        >
          Atrás
        </Button>
        {handleLogout && (
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        )}
      </Stack>
    </Box>
  );
}
