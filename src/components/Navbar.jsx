// Navbar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import logo from "../assets/logo.png";

const Navbar = ({ darkMode, toggleDarkMode, isLoggedIn, userName, handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const appBarBg = darkMode ? "#1c1c1e" : "#f9f9f9";
  const textColor = darkMode ? "#fff" : "#1d1d1f";
  const buttonHover = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";

  return (
    <AppBar position="fixed" sx={{ bgcolor: appBarBg, boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo + Título */}
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => navigate("/")}>
          <img src={logo} alt="Sanimed Logo" style={{ height: 50, marginRight: 10 }} />
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontWeight: 700,
              letterSpacing: 1,
              color: textColor,
            }}
          >
            Sanimed
          </Typography>
        </Box>

        {/* Botones escritorio */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
          {!isLoggedIn && (
            <>
              <Button
                sx={{ color: textColor, "&:hover": { backgroundColor: buttonHover } }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                sx={{ color: textColor, "&:hover": { backgroundColor: buttonHover } }}
                onClick={() => navigate("/createuser")}
              >
                Registro
              </Button>
            </>
          )}

          {isLoggedIn && (
            <>
              <Typography sx={{ color: textColor, mr: 2 }}>Hola, {userName}!</Typography>
              <Button sx={{ color: textColor, "&:hover": { backgroundColor: buttonHover } }} onClick={() => navigate("/dashboard")}>Dashboard</Button>
              <Button sx={{ color: textColor, "&:hover": { backgroundColor: buttonHover } }} onClick={() => navigate("/control/medications")}>Medicamentos</Button>
              <Button sx={{ color: textColor, "&:hover": { backgroundColor: buttonHover } }} onClick={() => navigate("/control/allergies")}>Alergias</Button>
              <Button sx={{ color: textColor, "&:hover": { backgroundColor: buttonHover } }} onClick={() => navigate("/control/panel")}>Panel de Control</Button>
              <Button sx={{ color: textColor, "&:hover": { backgroundColor: buttonHover } }} onClick={handleLogout}>Cerrar Sesión</Button>
            </>
          )}

          <IconButton sx={{ color: textColor }} onClick={toggleDarkMode}>
            <Brightness4Icon />
          </IconButton>
        </Box>

        {/* Menú móvil */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton sx={{ color: textColor }} onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {!isLoggedIn && (
              <>
                <MenuItem onClick={() => { navigate("/login"); handleMenuClose(); }}>Login</MenuItem>
                <MenuItem onClick={() => { navigate("/createuser"); handleMenuClose(); }}>Registro</MenuItem>
              </>
            )}
            {isLoggedIn && (
              <>
                <MenuItem disabled>Hola, {userName}!</MenuItem>
                <MenuItem onClick={() => { navigate("/dashboard"); handleMenuClose(); }}>Dashboard</MenuItem>
                <MenuItem onClick={() => { navigate("/control/medications"); handleMenuClose(); }}>Medicamentos</MenuItem>
                <MenuItem onClick={() => { navigate("/control/allergies"); handleMenuClose(); }}>Alergias</MenuItem>
                <MenuItem onClick={() => { navigate("/control/panel"); handleMenuClose(); }}>Panel de Control</MenuItem>
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
