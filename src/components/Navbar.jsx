import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import logo from "../assets/logo.png"; // Pon tu logo aquí

const Navbar = ({ darkMode, toggleDarkMode, isLoggedIn }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" color={darkMode ? "default" : "primary"}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo + Título */}
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => navigate("/")}>
          <img src={logo} alt="Sanimed Logo" style={{ height: 70, marginRight: 10 }} />
          <Typography variant="h3" sx={{ fontFamily: "'Segoe UI', Roboto, sans-serif", fontWeight: 'bold' }}>
            Sanimed
          </Typography>
        </Box>

        {/* Botones escritorio */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
          <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
          <Button color="inherit" onClick={() => navigate("/about")}>About</Button>

          {isLoggedIn && (
            <>
              <Button color="inherit" onClick={() => navigate("/dashboard")}>Dashboard</Button>
              <Button color="inherit" onClick={() => navigate("/control/allergies")}>Allergies</Button>
              <Button color="inherit" onClick={() => navigate("/control/medications")}>Medications</Button>
              <Button color="inherit" onClick={() => navigate("/control/panel")}>Control Panel</Button>
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
            <MenuItem onClick={() => { navigate("/"); handleMenuClose(); }}>Home</MenuItem>
            <MenuItem onClick={() => { navigate("/about"); handleMenuClose(); }}>About</MenuItem>

            {isLoggedIn && (
              <>
                <MenuItem onClick={() => { navigate("/dashboard"); handleMenuClose(); }}>Dashboard</MenuItem>
                <MenuItem onClick={() => { navigate("/control/allergies"); handleMenuClose(); }}>Allergies</MenuItem>
                <MenuItem onClick={() => { navigate("/control/medications"); handleMenuClose(); }}>Medications</MenuItem>
                <MenuItem onClick={() => { navigate("/control/panel"); handleMenuClose(); }}>Control Panel</MenuItem>
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
