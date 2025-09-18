import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Container, Typography, Button, TextField,
  Checkbox, FormControlLabel, Select, MenuItem,
  Card, CardContent, CardHeader, Grid, IconButton,
  Stack, Paper, Chip, Switch
} from "@mui/material";
import {
  Add as AddIcon, 
  Medication as MedicationIcon,
  AccessTime as ClockIcon, 
  Notifications as BellIcon,
  NotificationsOff as BellOffIcon, 
  Delete as TrashIcon,
  Replay as RotateCcwIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon
} from "@mui/icons-material";

// MOCK de medicamentos
const mockMedications = [
  { id: 1, name: "Paracetamol 500mg" },
  { id: 2, name: "Ibuprofeno 400mg" },
  { id: 3, name: "Omeprazol 20mg" },
];

// MOCK de alarmas
const mockAlarms = [
  { id: 1, medicationId: 1, time: "08:00", frequency: "cada 8h", days: 5, active: true },
  { id: 2, medicationId: 2, time: "14:00", frequency: "cada 12h", days: 3, active: false },
];

export default function Alarms({ darkMode }) {
  const navigate = useNavigate();
  const [alarms, setAlarms] = useState([]);
  const [medications, setMedications] = useState([]);
  const [newAlarm, setNewAlarm] = useState({ medicationId: "", time: "", frequency: "", days: "", active: true });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [notificacionPermitida, setNotificacionPermitida] = useState(false);

  const textColor = darkMode ? "#e5e7eb" : "#111827";
  const textSecondary = darkMode ? "#9ca3af" : "#6b7280";
  const paperBg = darkMode ? "#1f2937" : "#fff";
  const paperBorder = darkMode ? "1px solid #374151" : "1px solid #d1d5db";

  // Simular carga de datos del backend
  useEffect(() => {
    setTimeout(() => {
      setMedications(mockMedications);
      setAlarms(mockAlarms);
    }, 500); // delay de 0.5s para simular fetch
    
    if ("Notification" in window)
      setNotificacionPermitida(Notification.permission === "granted");
  }, []);

  const solicitarPermisoNotificaciones = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        setNotificacionPermitida(permission === "granted");
        if (permission === "granted") {
          mostrarNotificacion("Permiso concedido", "Ahora recibirás recordatorios de tus alarmas.");
        }
      });
    }
  };

  const mostrarNotificacion = (titulo, mensaje) => {
    if (notificacionPermitida) {
      new Notification(titulo, { body: mensaje, icon: "/pill-icon.png" });
    }
  };

  const toggleAlarm = (id) => {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const deleteAlarm = (id) => {
    const alarm = alarms.find((a) => a.id === id);
    setAlarms(prev => prev.filter(a => a.id !== id));
    if (alarm?.active && notificacionPermitida) {
      const med = medications.find(m => m.id === alarm.medicationId);
      mostrarNotificacion("Alarma eliminada", `Se eliminó la alarma para ${med ? med.name : "el medicamento"}.`);
    }
  };

  const handleNewAlarmChange = (field, value) => {
    setNewAlarm(prev => ({ ...prev, [field]: value }));
  };

  const addAlarm = () => {
    if (!newAlarm.medicationId || !newAlarm.time || !newAlarm.frequency || !newAlarm.days) return;
    const nextId = alarms.length ? Math.max(...alarms.map(a => a.id)) + 1 : 1;
    const med = medications.find(m => m.id === parseInt(newAlarm.medicationId));
    
    setAlarms(prev => [...prev, { id: nextId, ...newAlarm }]);
    
    if (newAlarm.active && notificacionPermitida && med) {
      mostrarNotificacion(
        "Alarma agregada", 
        `Recordatorio activado para ${med.name} a las ${newAlarm.time} ${newAlarm.frequency} durante ${newAlarm.days} días.`
      );
    }
    
    setNewAlarm({ medicationId: "", time: "", frequency: "", days: "", active: true });
    setMostrarFormulario(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, bgcolor: darkMode ? "#121212" : "#f9fafb", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Box sx={{
          width: 80, height: 80,
          bgcolor: "primary.main", color: "white",
          borderRadius: "50%",
          display: "inline-flex", alignItems: "center", justifyContent: "center", mb: 3
        }}>
          <BellIcon sx={{ fontSize: 40 }} />
        </Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: textColor }}>
          Alarmas de Medicamentos
        </Typography>
        <Typography variant="h6" sx={{ color: textSecondary }}>
          Programa recordatorios para no olvidar tus medicamentos
        </Typography>
        {!notificacionPermitida && (
          <Button variant="contained" sx={{ mt: 2 }} onClick={solicitarPermisoNotificaciones}>
            Activar recordatorios
          </Button>
        )}
      </Box>

      {/* Botón agregar */}
      {!mostrarFormulario && (
        <Box textAlign="center" mb={4}>
          <Button
            variant="contained" size="large"
            startIcon={<AddIcon />}
            onClick={() => setMostrarFormulario(true)}
          >
            Agregar Alarma
          </Button>
        </Box>
      )}

      {/* Formulario */}
      {mostrarFormulario && (
        <Paper sx={{ mb: 4, p: 2, bgcolor: paperBg, border: paperBorder }}>
          <CardHeader
            title="Nueva Alarma"
            sx={{ color: textColor }}
            action={<IconButton onClick={() => setMostrarFormulario(false)}><TrashIcon /></IconButton>}
          />
          <CardContent>
            <Stack spacing={2}>
              <Select 
                fullWidth 
                value={newAlarm.medicationId} 
                displayEmpty
                onChange={(e) => handleNewAlarmChange("medicationId", e.target.value)}
                sx={{ mb: 2 }}
              >
                <MenuItem value="">-- Selecciona medicamento --</MenuItem>
                {medications.map((m) => (
                  <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>
                ))}
              </Select>
              
              <TextField
                type="time"
                label="Hora"
                value={newAlarm.time}
                onChange={(e) => handleNewAlarmChange("time", e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                sx={{ mb: 2 }}
              />
              
              <TextField
                value={newAlarm.frequency}
                onChange={(e) => handleNewAlarmChange("frequency", e.target.value)}
                label="Frecuencia (ej: cada 8h)"
                fullWidth
                sx={{ mb: 2 }}
              />
              
              <TextField
                type="number"
                value={newAlarm.days}
                onChange={(e) => handleNewAlarmChange("days", e.target.value)}
                label="Duración (días)"
                inputProps={{ min: 1 }}
                fullWidth
                sx={{ mb: 2 }}
              />
              
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={newAlarm.active} 
                    onChange={(e) => handleNewAlarmChange("active", e.target.checked)} 
                  />
                }
                label={newAlarm.active ? "Activar recordatorio" : "Sin recordatorio"}
                sx={{ color: textColor, mb: 2 }}
              />
              
              <Box textAlign="right">
                <Button onClick={() => setMostrarFormulario(false)} sx={{ mr: 1 }}>Cancelar</Button>
                <Button variant="contained" startIcon={<AddIcon />} onClick={addAlarm}>
                  Guardar
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Paper>
      )}

      {/* Lista de alarmas */}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1, color: textColor }}>
          <BellIcon /> Mis Alarmas ({alarms.length})
        </Typography>

        {alarms.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center", bgcolor: paperBg, border: paperBorder }}>
            <BellIcon sx={{ fontSize: 60, color: "grey.400", mb: 2 }} />
            <Typography sx={{ color: textSecondary }}>No hay alarmas configuradas</Typography>
          </Paper>
        ) : (
          <Stack spacing={2}>
            {alarms.map((alarm) => {
              const med = medications.find(m => m.id === alarm.medicationId);
              return (
                <Card key={alarm.id} sx={{ bgcolor: paperBg, border: paperBorder }}>
                  <CardContent>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs>
                        <Typography sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: "bold", color: textColor }}>
                          <MedicationIcon /> {med ? med.name : "Medicamento no encontrado"}
                        </Typography>
                        <Typography sx={{ display: "flex", alignItems: "center", gap: 1, color: textSecondary, mt: 1 }}>
                          <ClockIcon /> {alarm.time} - {alarm.frequency} durante {alarm.days} días
                        </Typography>
                        {alarm.active && (
                          <Chip 
                            icon={<BellIcon />} 
                            label="Recordatorio activo" 
                            color="primary" 
                            sx={{ mt: 1 }} 
                          />
                        )}
                      </Grid>
                      <Grid item>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Switch 
                            checked={alarm.active} 
                            onChange={() => toggleAlarm(alarm.id)} 
                            color="primary" 
                          />
                          <IconButton color="error" onClick={() => deleteAlarm(alarm.id)}>
                            <TrashIcon />
                          </IconButton>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        )}
      </Box>
      
      <Box mt={6} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(-1)} 
          variant="outlined"
          sx={{ flex: { xs: '1 0 100%', sm: '0 0 auto' } }}
        >
          Atrás
        </Button>
        <Button 
          startIcon={<HomeIcon />} 
          onClick={() => navigate('/dashboard')} 
          variant="outlined"
          sx={{ flex: { xs: '1 0 100%', sm: '0 0 auto' } }}
        >
          Inicio
        </Button>
        <Button 
          onClick={() => navigate('/login')} 
          variant="outlined" 
          color="error"
          sx={{ flex: { xs: '1 0 100%', sm: '0 0 auto' } }}
        >
          Cerrar Sesión
        </Button>
      </Box>
    </Container>
  );
}