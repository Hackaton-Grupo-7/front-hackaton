import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",               // Ocupa todo el ancho de la pantalla
        backgroundColor: "#1976d2",
        color: "white",
        py: 2,
        px: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Proyecto 2025{" "}
        <Link
          href="https://factoriaf5.org/"
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="hover"
        >
          Factoria F5
        </Link>{" "}
        en colaboración con{" "}
        <Link
          href="https://www.sanitas.es/"
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="hover"
        >
          Sanitas
        </Link>
      </Typography>

      <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
        Made with ❤️ using React + Vite + MUI
      </Typography>
    </Box>
  );
};

export default Footer;
