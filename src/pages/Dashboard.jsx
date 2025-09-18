import React, { useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { Pill, Bell, AlertTriangle, Clock, ChevronRight, Activity } from "lucide-react";
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
    route: "/control/medications",
    count: 12
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
    route: "/control/alarms",
    count: 5
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
    route: "/control/allergies",
    count: 3
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
    route: "/control/schedules",
    count: 8
  }
];

export default function Dashboard({ darkMode }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const colors = {
    textPrimary: darkMode ? "#e5e7eb" : "#111827",
    textSecondary: darkMode ? "#9ca3af" : "#6b7280",
    paperBg: darkMode ? "#1f2937" : "#fff",
    paperBorder: darkMode ? "1px solid #374151" : "1px solid #d1d5db",
    pageBg: darkMode ? "#121212" : "#f9fafb",
  };

  return (
    <Box sx={{ py: 4, px: 2, minHeight: "100vh", bgcolor: colors.pageBg }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Box sx={{
            display: "inline-flex", justifyContent: "center", alignItems: "center",
            width: 80, height: 80, borderRadius: "50%", bgcolor: "#3b82f6", mx: "auto", mb: 2, boxShadow: 3
          }}>
            <Activity style={{ color: "#fff", width: 32, height: 32 }} />
          </Box>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 1, color: darkMode ? "#e5e5e5" : "#111827" }}
          >
            Mi Control de Medicación
          </Typography>
          <Typography variant="body1" sx={{ color: colors.textSecondary, maxWidth: 800, mx: "auto" }}>
            Tu plataforma integral para el control y seguimiento de medicamentos, alergias y horarios de tratamiento
          </Typography>
        </Box>

        {/* Main Menu Cards */}
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {menuOptions.map(option => {
            const Icon = option.icon;
            const bgGradient = darkMode ? option.bgGradientDark : option.bgGradient;
            return (
              <Grid item xs={12} sm={6} md={3} key={option.id}>
                <Paper
                  onMouseEnter={() => setHoveredCard(option.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => navigate(option.route)}
                  sx={{
                    position: "relative",
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                    cursor: "pointer",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
                    overflow: "visible",
                    bgcolor: colors.paperBg,
                    border: colors.paperBorder,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: 350,
                    color: colors.textPrimary
                  }}
                >
                  {/* Contador dentro de la tarjeta */}
                  <Box sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    bgcolor: option.color,
                    color: "#fff",
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: 14,
                    boxShadow: 1
                  }}>
                    {option.count}
                  </Box>

                  {/* Background Gradient */}
                  <Box sx={{ position: "absolute", inset: 0, borderRadius: 3, opacity: 0.15, background: bgGradient }} />

                  {/* Contenido */}
                  <Box sx={{ position: "relative", display: "flex", flexDirection: "column", height: "100%" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                      <Box sx={{ p: 2, borderRadius: 2, background: option.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon style={{ color: "#fff", width: 28, height: 28 }} />
                      </Box>
                      <ChevronRight style={{ color: hoveredCard === option.id ? "#d1d5db" : "#9ca3af", transition: "all 0.3s" }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: colors.textPrimary }}>{option.title}</Typography>
                      <Typography sx={{ color: colors.textSecondary, mb: 2 }}>{option.description}</Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", color: colors.textSecondary, mb: 1 }}>Características</Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                          {option.features.map((f, i) => (
                            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: option.color }} />
                              <Typography sx={{ fontSize: 14, color: colors.textPrimary }}>{f}</Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 3, py: 1.5, textAlign: "center", fontWeight: 600, border: `2px solid ${option.color}`, borderRadius: 2, color: option.color, transition: "all 0.3s", "&:hover": { boxShadow: 3 } }}>
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
