import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        mt: "auto",
        textAlign: "center",
        backgroundColor: "#1976d2",
        color: "white",
      }}
    >
      <Typography variant="body1">© 2025 Mi Proyecto</Typography>
      <Typography variant="body2">Made with ❤️ using React + Vite + MUI</Typography>
    </Box>
  )
}

export default Footer