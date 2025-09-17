import React, { useState } from "react";
import { Box, Typography, Grid, Paper, Button, IconButton } from "@mui/material";
import { Pill, Bell, AlertTriangle, Clock, ChevronRight, Activity, Shield, Calendar, Users } from "lucide-react";

const menuOptions = [
  {
    id: "medicamentos",
    title: "Medicamentos",
    description: "Gestiona tu lista de medicamentos y dosis",
    icon: Pill,
    color: "#3b82f6",
    gradient: "linear-gradient(90deg,#3b82f6,#2563eb)",
    bgGradient: "linear-gradient(90deg,#dbeafe,#e0f2fe)",
    features: ["Lista de medicamentos", "Control de dosis", "Historial de tomas"]
  },
  {
    id: "alarmas",
    title: "Alarmas",
    description: "Configura recordatorios para tus medicamentos",
    icon: Bell,
    color: "#10b981",
    gradient: "linear-gradient(90deg,#10b981,#059669)",
    bgGradient: "linear-gradient(90deg,#d1fae5,#d9f99d)",
    features: ["Recordatorios automáticos", "Notificaciones push", "Horarios personalizados"]
  },
  {
    id: "alergias",
    title: "Alergias",
    description: "Registra y controla tus alergias a medicamentos",
    icon: AlertTriangle,
    color: "#ef4444",
    gradient: "linear-gradient(90deg,#ef4444,#dc2626)",
    bgGradient: "linear-gradient(90deg,#fee2e2,#fecaca)",
    features: ["Registro de alergias", "Tipos de reacciones", "Niveles de severidad"]
  },
  {
    id: "horarios",
    title: "Horarios",
    description: "Organiza tus horarios de medicación",
    icon: Clock,
    color: "#8b5cf6",
    gradient: "linear-gradient(90deg,#8b5cf6,#7c3aed)",
    bgGradient: "linear-gradient(90deg,#ede9fe,#e0e7ff)",
    features: ["Calendario médico", "Planificación semanal", "Seguimiento diario"]
  }
];

export default function Dashboard({ darkMode }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardClick = (option) => {
    alert(`Navegando a ${option.title}...`);
  };

  return (
    <Box sx={{ py: 4, px: 2, minHeight: "calc(100vh - 124px)", bgcolor: darkMode ? "#121212" : "#f9fafb" }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Box sx={{
            display: "inline-flex", justifyContent: "center", alignItems: "center",
            width: 80, height: 80, borderRadius: "50%", bgcolor: "#3b82f6", mx: "auto", mb: 2, boxShadow: 3
          }}>
            <Activity style={{ color: "#fff", width: 32, height: 32 }} />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>Centro de Salud</Typography>
          <Typography variant="body1" sx={{ color: darkMode ? "#ccc" : "#4b5563", maxWidth: 800, mx: "auto" }}>
            Tu plataforma integral para el control y seguimiento de medicamentos, alergias y horarios de tratamiento
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {menuOptions.map((option, idx) => {
            const Icon = option.icon;
            return (
              <Grid item xs={12} md={3} key={option.id}>
                <Paper
                  sx={{
                    p: 2, borderRadius: 3, border: "1px solid #d1d5db", boxShadow: 2,
                    display: "flex", alignItems: "center", gap: 2,
                    cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": { transform: "scale(1.05)", boxShadow: 6 }
                  }}
                  onClick={() => handleCardClick(option)}
                >
                  <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: option.bgGradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon style={{ color: option.color, width: 24, height: 24 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 500, color: "#6b7280" }}>{option.title}</Typography>
                    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>{0}</Typography>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* Main Menu Cards */}
        <Grid container spacing={4}>
          {menuOptions.map(option => {
            const Icon = option.icon;
            return (
              <Grid item xs={12} md={6} key={option.id}>
                <Paper
                  onMouseEnter={() => setHoveredCard(option.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleCardClick(option)}
                  sx={{
                    position: "relative", p: 4, borderRadius: 3, boxShadow: 3, cursor: "pointer",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
                    overflow: "hidden"
                  }}
                >
                  {/* Background Gradient */}
                  <Box sx={{
                    position: "absolute", inset: 0, borderRadius: 3, opacity: 0.2,
                    background: option.bgGradient
                  }} />
                  {/* Content */}
                  <Box sx={{ position: "relative" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                      <Box sx={{ p: 2, borderRadius: 2, background: option.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon style={{ color: "#fff", width: 28, height: 28 }} />
                      </Box>
                      <ChevronRight style={{
                        color: hoveredCard === option.id ? "#374151" : "#9ca3af",
                        transition: "all 0.3s"
                      }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{option.title}</Typography>
                    <Typography sx={{ color: "#6b7280", mb: 2 }}>{option.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", color: "#6b7280", mb: 1 }}>Características</Typography>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {option.features.map((f, i) => (
                          <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: option.color }} />
                            <Typography sx={{ fontSize: 14 }}>{f}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <Box sx={{
                      mt: 3, py: 1.5, textAlign: "center", fontWeight: 600,
                      border: `2px solid ${option.color}`, borderRadius: 2,
                      color: option.color,
                      transition: "all 0.3s",
                      "&:hover": { boxShadow: 3 }
                    }}>
                      Acceder a {option.title}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* Footer Info */}
        <Box sx={{ mt: 12, textAlign: "center" }}>
          <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
              <Users style={{ width: 24, height: 24, color: "#3b82f6", marginRight: 6 }} />
              <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Información Importante</Typography>
            </Box>
            <Typography sx={{ color: "#6b7280", maxWidth: 800, mx: "auto" }}>
              Esta plataforma está diseñada para ayudarte a gestionar tu medicación de forma segura y eficiente. Siempre consulta con tu médico antes de realizar cambios en tu tratamiento. En caso de emergencia médica, contacta inmediatamente a los servicios de emergencia de tu localidad.
            </Typography>
            <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2, color: "#9ca3af", fontSize: 14 }}>
              <span>📱 Disponible en móvil</span>
              <span>🔒 Datos seguros</span>
              <span>⏰ Recordatorios inteligentes</span>
              <span>📊 Seguimiento detallado</span>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
