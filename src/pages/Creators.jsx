import React from "react";
import { Box, Grid, Typography, Card, CardContent, Avatar, Link } from "@mui/material";
import adayAvatar from "../assets/avatars/aday.jpg";
import valentinaAvatar from "../assets/avatars/valentina.jpg";
import paulaAvatar from "../assets/avatars/paula.jpg";
import sabaAvatar from "../assets/avatars/saba.jpg";
import dmytroAvatar from "../assets/avatars/dmytro.jpg";
import efrenAvatar from "../assets/avatars/efren.jpg";

const frontend = [
  { name: "Aday Álvarez", avatar: adayAvatar, github: "https://github.com/Aday25", linkedin: "https://www.linkedin.com/in/adayasc/" },
  { name: "Valentina Montilla", avatar: valentinaAvatar, github: "https://github.com/ValenMontilla7", linkedin: "https://www.linkedin.com/in/valentina-montilla-493a7b380/" },
];

const backend = [
  { name: "Paula Calvo", avatar: paulaAvatar, github: "https://github.com/PCalvoGarcia", linkedin: "https://www.linkedin.com/in/paulacalvogarcia2001" },
  { name: "Saba Ur Rehman", avatar: sabaAvatar, github: "https://github.com/sab-gif", linkedin: null },
  { name: "Dmytro Belei", avatar: dmytroAvatar, github: "https://github.com/dmbiee", linkedin: "https://www.linkedin.com/in/dmytro-belei-factoriaf5/" },
  { name: "Efrén Campa", avatar: efrenAvatar, github: "https://github.com/EfrenTC", linkedin: "https://www.linkedin.com/in/efren-tomas-campa/" },
];

const cardWidth = 260; // ancho fijo para todas las tarjetas

const Creators = () => {
  const renderCard = (person, color, index) => (
    <Grid item xs={12} sm={6} md={2} key={index} sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: cardWidth,
          border: `3px solid ${color}`,
          borderRadius: "16px",
          textAlign: "center",
          transition: "all 0.4s ease",
          transform: "translateY(20px)",
          opacity: 0,
          animation: `fadeIn 0.6s forwards ${index * 0.1}s`,
          "&:hover": { transform: "translateY(-10px)", boxShadow: 6 },
        }}
      >
        <CardContent>
          <Avatar
            alt={person.name}
            src={person.avatar}
            sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {person.name}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Link
              href={person.github}
              target="_blank"
              sx={{ mr: 2, color: color, "&:hover": { color: "#000" } }}
            >
              GitHub
            </Link>
            {person.linkedin && (
              <Link
                href={person.linkedin}
                target="_blank"
                sx={{ color: color, "&:hover": { color: "#000" } }}
              >
                LinkedIn
              </Link>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#3b82f6" }}>
        Frontend Developers
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {frontend.map((person, index) => renderCard(person, "#3b82f6", index))}
      </Grid>

      <Typography variant="h4" sx={{ fontWeight: "bold", mt: 6, mb: 2, color: "#10b981" }}>
        Backend Developers
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {backend.map((person, index) => renderCard(person, "#10b981", index))}
      </Grid>

      <style>
        {`
          @keyframes fadeIn {
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Creators;
