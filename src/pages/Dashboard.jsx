import React, { useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import {
  Pill,
  Bell,
  AlertTriangle,
  Clock,
  ChevronRight,
  Activity
} from "lucide-react";
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
    features: [
      "Recordatorios automáticos",
      "Notificaciones push",
      "Horarios personalizados"
    ],
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

/**
 * Dashboard component for medication control
 * @param {Object} props - Component props
 * @param {boolean} props.darkMode - Whether dark mode is enabled
 */
export default function Dashboard({ darkMode }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const colors = {
    textPrimary: darkMode ? "#fff" : "#000",
    textSecondary: darkMode ? "#b0b0b0" : "#666",
    paperBg: darkMode ? "#1e1e1e" : "#fff",
    paperBorder: darkMode ? "1px solid #333" : "1px solid #e0e0e0",
    pageBg: darkMode ? "#121212" : "#f9f9f9"
  };

  return (
    <Box sx={{ py: 4, px: 2, minHeight: "100vh", bgcolor: colors.pageBg }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "#3b82f6",
              mx: "auto",
              mb: 2,
              boxShadow: 3
            }}
          >
            <Activity style={{ color: "#fff", width: 32, height: 32 }} />
          </Box>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 1, color: colors.textPrimary }}
          >
            Mi Control de Medicación
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: colors.textSecondary, maxWidth: 800, mx: "auto" }}
          >
            Tu plataforma integral para el control y seguimiento de medicamentos,
            alergias y horarios de tratamiento
          </Typography>
        </Box>

        {/* Tarjetas */}
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="stretch"
          sx={{
            flexWrap: "wrap",
            "@media (min-width:1200px)": {
              flexWrap: "nowrap"
            }
          }}
        >
          {menuOptions.map((option) => {
            const Icon = option.icon;
            const bgGradient = darkMode ? option.bgGradientDark : option.bgGradient;

            return (
              <Grid
                item
                key={option.id}
                sx={{
                  flex: "1 1 23%",
                  maxWidth: "23%",
                  display: "flex",
                  "@media (max-width:1199px)": {
                    flex: "1 1 45%",
                    maxWidth: "45%"
                  },
                  "@media (max-width:600px)": {
                    flex: "1 1 100%",
                    maxWidth: "100%"
                  }
                }}
              >
                <Paper
                  onMouseEnter={() => setHoveredCard(option.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => navigate(option.route)}
                  sx={{
                    position: "relative",
                    p: 2,
                    borderRadius: 3,
                    boxShadow: hoveredCard === option.id ? 6 : 3,
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                    transform:
                      hoveredCard === option.id
                        ? "translateY(-6px) scale(1.02)"
                        : "none",
                    overflow: "hidden",
                    bgcolor: colors.paperBg,
                    border: colors.paperBorder,
                    display: "flex",
                    flexDirection: "column",
                    height: 340,
                    color: colors.textPrimary,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: option.gradient,
                      transform:
                        hoveredCard === option.id ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.3s ease-in-out"
                    }
                  }}
                >
                  {/* Contador */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      bgcolor: option.color,
                      color: "#fff",
                      width: 28,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      fontWeight: 700,
                      fontSize: 13,
                      boxShadow: 2,
                      zIndex: 2
                    }}
                  >
                    {option.count}
                  </Box>

                  {/* Fondo gradiente */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 3,
                      opacity: 0.1,
                      background: bgGradient,
                      transition: "opacity 0.3s ease-in-out",
                      "&:hover": { opacity: 0.2 }
                    }}
                  />

                  {/* Contenido */}
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      zIndex: 1
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          background: option.gradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: `0 4px 12px ${option.color}40`
                        }}
                      >
                        <Icon style={{ color: "#fff", width: 24, height: 24 }} />
                      </Box>
                      <ChevronRight
                        style={{
                          color:
                            hoveredCard === option.id
                              ? option.color
                              : colors.textSecondary,
                          transition: "all 0.3s",
                          transform:
                            hoveredCard === option.id ? "translateX(4px)" : "none"
                        }}
                      />
                    </Box>

                    <Box sx={{ flex: 1, mb: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, mb: 0.5 }}
                      >
                        {option.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.textSecondary,
                          mb: 1.5,
                          minHeight: "36px",
                          fontSize: "0.85rem"
                        }}
                      >
                        {option.description}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 11,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          color: colors.textSecondary,
                          mb: 0.5
                        }}
                      >
                        Características
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                        {option.features.map((f) => (
                          <Box key={`${option.id}-${f.replace(/\s+/g, '-').toLowerCase()}`} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                bgcolor: option.color,
                                boxShadow: `0 0 6px ${option.color}`,
                                flexShrink: 0
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: "0.75rem",
                                lineHeight: 1.2
                              }}
                            >
                              {f}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        mt: "auto",
                        py: 1,
                        textAlign: "center",
                        fontWeight: 600,
                        border: `2px solid ${option.color}30`,
                        background:
                          hoveredCard === option.id ? `${option.color}15` : "transparent",
                        borderRadius: 2,
                        color: option.color,
                        transition: "all 0.3s",
                        fontSize: "0.85rem"
                      }}
                    >
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

