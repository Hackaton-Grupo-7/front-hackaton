import React, { useState, useEffect } from "react";
import {
  Box, Container, Typography, Button, Card, CardContent,
  Grid, IconButton, Stack, Paper, Chip, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Alert
} from "@mui/material";
import {
  Medication as MedicationIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
  Schedule as ScheduleIcon,
  Description as DescriptionIcon,
  LocalPharmacy as PharmacyIcon
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { clearAuth } from "../../services/authStorage";
import {
  getMedicationById,
  deleteMedication,
  markMedicationTaken
} from "../../services/medicationService";

// Componente CountdownTimer - DECLARADO FUERA DEL JSX
const CountdownTimer = ({ targetTime, darkMode }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isNextDay, setIsNextDay] = useState(false);

  useEffect(() => {
    if (!targetTime) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const today = new Date();

      // Parsear la hora objetivo (formato HH:mm:ss)
      const [hours, minutes, seconds = 0] = targetTime.split(':').map(Number);

      // Crear fecha objetivo para hoy
      let targetDate = new Date(today);
      targetDate.setHours(hours, minutes, seconds || 0, 0);

      // Si la hora ya pasó hoy, calcular para mañana
      if (now > targetDate) {
        targetDate.setDate(targetDate.getDate() + 1);
        setIsNextDay(true);
      } else {
        setIsNextDay(false);
      }

      const difference = targetDate - now;

      if (difference > 0) {
        const hoursLeft = Math.floor(difference / (1000 * 60 * 60));
        const minutesLeft = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          hours: hoursLeft,
          minutes: minutesLeft,
          seconds: secondsLeft
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calcular inmediatamente
    calculateTimeLeft();

    // Actualizar cada segundo
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  if (!targetTime) return null;

  const formatTimeCount = (value) => value.toString().padStart(2, '0');

  return (
    <Card sx={{
      bgcolor: darkMode ? "#2a2a2a" : "#f8f9fa",
      border: darkMode ? "1px solid #444" : "1px solid #e9ecef",
      background: `linear-gradient(135deg, ${darkMode ? '#2a2a2a' : '#e3f2fd'}, ${darkMode ? '#1e1e1e' : '#f8f9fa'})`
    }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: darkMode ? '#fff' : 'primary.main'
        }}>
          <ScheduleIcon color="primary" />
          Próxima Toma
        </Typography>

        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Typography variant="h4" fontWeight="bold" sx={{
            color: timeLeft.hours === 0 && timeLeft.minutes < 30 ? 'warning.main' : 'primary.main',
            fontFamily: 'monospace'
          }}>
            {formatTimeCount(timeLeft.hours)}:{formatTimeCount(timeLeft.minutes)}:{formatTimeCount(timeLeft.seconds)}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" align="center">
          {isNextDay ? 'Mañana' : 'Hoy'} a las {targetTime.substring(0, 5)}
        </Typography>

        {/* Indicador visual del tiempo restante */}
        <Box sx={{ mt: 2 }}>
          {timeLeft.hours === 0 && timeLeft.minutes < 30 && timeLeft.minutes > 0 && (
            <Chip
              label="¡Próxima dosis!"
              color="warning"
              size="small"
              sx={{ width: '100%' }}
            />
          )}
          {timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
            <Chip
              label="¡Es hora de tomar el medicamento!"
              color="error"
              size="small"
              sx={{ width: '100%' }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

function MedicationDetails({ darkMode }) {
  const [medication, setMedication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchMedicationDetails();
  }, [id, navigate]);

  const fetchMedicationDetails = async () => {
    try {
      setLoading(true);
      const data = await getMedicationById(id);
      setMedication(data);
      setError(null);
    } catch (error) {
      console.error("Failed to load medication details", error);
      setError("Error al cargar los detalles del medicamento");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkTaken = async () => {
    try {
      await markMedicationTaken(id);
      await fetchMedicationDetails();
    } catch (error) {
      console.error("Failed to mark medication as taken", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMedication(id);
      navigate("/medications");
    } catch (error) {
      console.error("Failed to delete medication", error);
    }
  };

  const formatTime = (time) => {
    if (!time) return "No especificada";
    // Convertir formato HH:mm:ss a HH:mm
    return time.substring(0, 5);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No especificada";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <Typography>Cargando detalles del medicamento...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Box mt={2}>
          <Button onClick={() => navigate("/medications")} variant="contained">
            Volver a Medicamentos
          </Button>
        </Box>
      </Container>
    );
  }

  if (!medication) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">Medicamento no encontrado</Alert>
        <Box mt={2}>
          <Button onClick={() => navigate("/medications")} variant="contained">
            Volver a Medicamentos
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        bgcolor: darkMode ? "#121212" : "#f9f9f9",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh"
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box sx={{
          width: 80, height: 80,
          bgcolor: "primary.main", color: "white",
          borderRadius: "50%",
          display: "inline-flex", alignItems: "center", justifyContent: "center", mb: 3
        }}>
          <MedicationIcon sx={{ fontSize: 40 }} />
        </Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Detalles del Medicamento
        </Typography>
      </Box>

      {/* Información principal del medicamento */}
      <Paper sx={{
        mb: 4,
        p: 3,
        bgcolor: darkMode ? "#1e1e1e" : "#fff",
        color: darkMode ? "#fff" : "#000",
        border: darkMode ? "1px solid #333" : "1px solid #e0e0e0"
      }}>
        <Stack spacing={3}>
          {/* Nombre y estado */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h5" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <PharmacyIcon color="primary" />
              {medication.name}
            </Typography>
            <Stack direction="row" spacing={1}>
              {medication.taken ? (
                <Chip
                  icon={<CheckIcon />}
                  label="Tomado"
                  color="success"
                  variant="filled"
                />
              ) : (
                <Chip
                  icon={<CancelIcon />}
                  label="Pendiente"
                  color="warning"
                  variant="filled"
                />
              )}
              {medication.active ? (
                <Chip label="Activo" color="primary" variant="outlined" />
              ) : (
                <Chip label="Inactivo" color="default" variant="outlined" />
              )}
            </Stack>
          </Box>

          <Divider sx={{ borderColor: darkMode ? "#333" : "#e0e0e0" }} />

          {/* Información detallada */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{
                bgcolor: darkMode ? "#2a2a2a" : "#f8f9fa",
                border: darkMode ? "1px solid #444" : "1px solid #e9ecef"
              }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <MedicationIcon color="primary" />
                    Dosificación
                  </Typography>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {medication.dose}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Dosis prescrita
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{
                bgcolor: darkMode ? "#2a2a2a" : "#f8f9fa",
                border: darkMode ? "1px solid #444" : "1px solid #e9ecef"
              }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ScheduleIcon color="primary" />
                    Horario
                  </Typography>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {formatTime(medication.hour)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hora de toma
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <CountdownTimer targetTime={medication.hour} darkMode={darkMode} />
            </Grid>
          </Grid>

          {/* Descripción */}
          {medication.description && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <DescriptionIcon color="primary" />
                Descripción
              </Typography>
              <Paper sx={{
                p: 2,
                bgcolor: darkMode ? "#2a2a2a" : "#f8f9fa",
                border: darkMode ? "1px solid #444" : "1px solid #e9ecef"
              }}>
                <Typography>{medication.description}</Typography>
              </Paper>
            </Box>
          )}

          {/* Alergias relacionadas */}
          {medication.allergies && medication.allergies.length > 0 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WarningIcon color="error" />
                Alergias Relacionadas
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {medication.allergies.map((allergy, index) => (
                  <Chip
                    key={index}
                    label={allergy}
                    color="error"
                    variant="outlined"
                    icon={<WarningIcon />}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {/* Información adicional */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Información del Sistema
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>ID:</strong> {medication.id}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Creado:</strong> {formatDate(medication.createdAt)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Paper>

      {/* Acciones */}
      <Paper sx={{
        p: 3,
        mb: 4,
        bgcolor: darkMode ? "#1e1e1e" : "#fff",
        color: darkMode ? "#fff" : "#000",
        border: darkMode ? "1px solid #333" : "1px solid #e0e0e0"
      }}>
        <Typography variant="h6" gutterBottom>
          Acciones
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          {!medication.taken && (
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckIcon />}
              onClick={handleMarkTaken}
            >
              Marcar como Tomado
            </Button>
          )}
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setDeleteDialogOpen(true)}
          >
            Eliminar
          </Button>
        </Stack>
      </Paper>

      {/* Botones de navegación */}
      <Box display="flex" justifyContent="space-between">
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} variant="outlined">
          Volver a Medicamentos
        </Button>
      </Box>

      {/* Dialog de confirmación de eliminación */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: darkMode ? "#1e1e1e" : "#fff",
            color: darkMode ? "#fff" : "#000"
          }
        }}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que quieres eliminar el medicamento "{medication.name}"?
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default MedicationDetails;