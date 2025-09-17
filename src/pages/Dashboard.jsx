import React, { useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { Pill, Bell, AlertTriangle, Clock, ChevronRight, Activity, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuOptions = [
  {
    id: "medicamentos",
    title: "Medicamentos",
    description: "Gestiona tu lista de medicamentos y dosis",
    icon: Pill,
    color: "#3b82f6",
    gradient: "linear-gradient(90deg,#3b82f6,#2563eb)",
    bgGradient: "linear-gradient(90deg,#dbeafe,#e0f2fe)",
    bgGradientDark: "linear-gradient(90deg,#1e3a8a,#1e40af)",
    features: ["Lista de medicamentos", "Control de dosis", "Historial de tomas"],
    route: "/control/medications"
  },
  {
    id: "alarmas",
    title: "Alarmas",
    description: "Configura recordatorios para tus medicamentos",
    icon: Bell,
    color: "#10b981",
    gradient: "linear-gradient(90deg,#10b981,#059669)",
    bgGradient: "linear-gradient(90deg,#d1fae5,#d9f99d)",
    bgGradientDark: "linear-gradient(90deg,#065f46,#047857)",
    features: ["Recordatorios automáticos", "Notificaciones push", "Horarios personalizados"],
    route: "/control/alarms"
  },
  {
    id: "alergias",
    title: "Alergias",
    description: "Registra y controla tus alergias a medicamentos",
    icon: AlertTriangle,
    color: "#ef4444",
    gradient: "linear-gradient(90deg,#ef4444,#dc2626)",
    bgGradient: "linear-gradient(90deg,#fee2e2,#fecaca)",
    bgGradientDark: "linear-gradient(90deg,#991b1b,#b91c1c)",
    features: ["Registro de alergias", "Tipos de reacciones", "Niveles de severidad"],
    route: "/control/allergies"
  },
  {
    id: "horarios",
    title: "Horarios",
    description: "Organiza tus horarios de medicación",
    icon: Clock,
    color: "#8b5cf6",
    gradient: "linear-gradient(90deg,#8b5cf6,#7c3aed)",
    bgGradient: "linear-gradient(90deg,#ede9fe,#e0e7ff)",
    bgGradientDark: "linear-gradient(90deg,#5b21b6,#6d28d9)",
    features: ["Calendario médico", "Planificación semanal", "Seguimiento diario"],
    route: "/control/schedules"
  }
];

export default function Dashboard({ darkMode }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const textColor = darkMode ? "#e5e7eb" : "#111827";
  const textSecondary = darkMode ? "#9ca3af" : "#6b7280";
  const paperBg = darkMode ? "#1f2937" : "#fff";
  const paperBorder = darkMode ? "1px solid #374151" : "1px solid #d1d5db";

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
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: textColor }}>Centro de Salud</Typography>
          <Typography variant="body1" sx={{ color: textSecondary, maxWidth: 800, mx: "auto" }}>
            Tu plataforma integral para el control y seguimiento de medicamentos, alergias y horarios de tratamiento
          </Typography>
        </Box>

        {/* Main Menu Cards */}
        <Grid container spacing={4}>
          {menuOptions.map(option => {
            const Icon = option.icon;
            const bgGradient = darkMode ? option.bgGradientDark : option.bgGradient;
            return (
              <Grid item xs={12} md={6} key={option.id}>
                <Paper
                  onMouseEnter={() => setHoveredCard(option.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => navigate(option.route)}
                  sx={{
                    position: "relative", p: 4, borderRadius: 3, boxShadow: 3, cursor: "pointer",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
                    overflow: "hidden",
                    bgcolor: paperBg, border: paperBorder
                  }}
                >
                  {/* Background Gradient */}
                  <Box sx={{
                    position: "absolute", inset: 0, borderRadius: 3, opacity: 0.2,
                    background: bgGradient
                  }} />
                  {/* Content */}
                  <Box sx={{ position: "relative" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                      <Box sx={{
                        p: 2, borderRadius: 2, background: option.gradient,
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        <Icon style={{ color: "#fff", width: 28, height: 28 }} />
                      </Box>
                      <ChevronRight style={{
                        color: hoveredCard === option.id ? "#d1d5db" : "#9ca3af",
                        transition: "all 0.3s"
                      }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: textColor }}>{option.title}</Typography>
                    <Typography sx={{ color: textSecondary, mb: 2 }}>{option.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", color: textSecondary, mb: 1 }}>Características</Typography>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {option.features.map((f, i) => (
                          <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: option.color }} />
                            <Typography sx={{ fontSize: 14, color: textColor }}>{f}</Typography>
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
      </Box>
    </Box>
  );
}
