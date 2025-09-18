import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { clearAuth } from "../services/authStorage";
import logo from "../assets/logo.png"; // Pon tu logo aquí

const Navbar = ({ darkMode, toggleDarkMode, isLoggedIn, setIsLoggedIn }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  const handleInicioClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    clearAuth();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <AppBar position="fixed" color={darkMode ? "default" : "primary"}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo + Título */}
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleLogoClick}>
          <img src={logo} alt="Sanimed Logo" style={{ height: 70, marginRight: 10 }} />
          <Typography variant="h3" sx={{ fontFamily: "'Segoe UI', Roboto, sans-serif", fontWeight: 'bold' }}>
            Sanimed
          </Typography>
        </Box>

        {/* Botones escritorio */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
          <Button color="inherit" onClick={handleInicioClick}>Inicio</Button>
          <Button color="inherit" onClick={() => navigate("/creators")}>Contacto</Button>

          {isLoggedIn && (
            <>
              <Button color="inherit" onClick={() => navigate("/control/alarms")}>Alarmas</Button>
              <Button color="inherit" onClick={() => navigate("/control/schedules")}>Horarios</Button>
              <Button color="inherit" onClick={() => navigate("/control/allergies")}>Alergias</Button>
              <Button color="inherit" onClick={() => navigate("/control/medications")}>Medicacion</Button>
              <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
            </>
          )}

          <IconButton color="inherit" onClick={toggleDarkMode}>
            <Brightness4Icon />
          </IconButton>
        </Box>

        {/* Menú móvil */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() => { handleInicioClick(); handleMenuClose(); }}>Inicio</MenuItem>
            <MenuItem onClick={() => { navigate("/creators"); handleMenuClose(); }}>Contacto</MenuItem>

            {isLoggedIn && (
              <>
                <MenuItem onClick={() => { navigate("/dashboard"); handleMenuClose(); }}>Dashboard</MenuItem>
                <MenuItem onClick={() => { navigate("/control/allergies"); handleMenuClose(); }}>Allergies</MenuItem>
                <MenuItem onClick={() => { navigate("/control/medications"); handleMenuClose(); }}>Medications</MenuItem>
                <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>Cerrar Sesión</MenuItem>
              </>
            )}

            <MenuItem onClick={() => { toggleDarkMode(); handleMenuClose(); }}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
