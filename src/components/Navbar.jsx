import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useNavigate } from "react-router-dom"; // <--- Importamos navigate

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); // <--- Hook para navegar programáticamente

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" color={darkMode ? "default" : "primary"}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Sanitas</Typography>

        {/* Botones grandes en escritorio */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
          <Button color="inherit" onClick={() => navigate("/")}>Inicio</Button>
          <Button color="inherit" onClick={() => navigate("/medications")}>Medications</Button> {/* Nuevo botón */}
          <IconButton color="inherit" onClick={toggleDarkMode}>
            <Brightness4Icon />
          </IconButton>
        </Box>

        {/* Menú hamburguesa en móvil */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={handleMenu}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => { navigate("/"); handleClose(); }}>Inicio</MenuItem>
            <MenuItem onClick={() => { navigate("/medications"); handleClose(); }}>Medications</MenuItem> {/* Nuevo item */}
            <MenuItem
              onClick={() => {
                toggleDarkMode();
                handleClose();
              }}
            >
              {darkMode ? "Modo Claro" : "Modo Oscuro"}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
