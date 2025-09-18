import React, { useState, useEffect } from "react";
import {
  Box, Container, Typography, Button, TextField,
  Checkbox, FormControlLabel, Select, MenuItem,
  Card, CardContent, CardHeader, Grid, IconButton,
  Stack, Paper, Chip
} from "@mui/material";
import {
  Add as AddIcon, Medication as MedicationIcon,
  AccessTime as ClockIcon, Notifications as BellIcon,
  NotificationsOff as BellOffIcon, Delete as TrashIcon,
  Replay as RotateCcwIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const medicamentosDisponibles = [
  "Paracetamol", "Ibuprofeno", "Amoxicilina",
  "Omeprazol", "Aspirina", "Loratadina",
  "Metformina", "Atorvastatina"
];

function Medications() {
  const [medicamento, setMedicamento] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [alarma, setAlarma] = useState(false);
  const [listaMedicamentos, setListaMedicamentos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [notificacionPermitida, setNotificacionPermitida] = useState(false);
  const navigate = useNavigate();

  // Cargar datos guardados
  useEffect(() => {
    const datosGuardados = localStorage.getItem("medicamentos");
    if (datosGuardados) {
      const arr = JSON.parse(datosGuardados);
      arr.forEach(m => {
        m.proximaToma = new Date(m.proximaToma);
        if (m.ultimaToma) m.ultimaToma = new Date(m.ultimaToma);
      });
      setListaMedicamentos(arr);
    }
    if ("Notification" in window)
      setNotificacionPermitida(Notification.permission === "granted");
  }, []);

  useEffect(() => {
    localStorage.setItem("medicamentos", JSON.stringify(listaMedicamentos));
  }, [listaMedicamentos]);

  const solicitarPermisoNotificaciones = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        setNotificacionPermitida(permission === "granted");
        if (permission === "granted") {
          mostrarNotificacion("Permiso concedido", "Ahora recibirás recordatorios de tus medicamentos.");
        }
      });
    }
  };

  const mostrarNotificacion = (titulo, mensaje) => {
    if (notificacionPermitida) {
      new Notification(titulo, { body: mensaje, icon: "/pill-icon.png" });
    }
  };

  const handleAgregar = () => {
    if (!medicamento || !frecuencia) return;
    const nuevoMedicamento = {
      id: Date.now(),
      nombre: medicamento,
      horas: parseInt(frecuencia),
      alarma: alarma,
      fechaCreacion: new Date(),
      ultimaToma: null,
      proximaToma: new Date(Date.now() + parseInt(frecuencia) * 60 * 60 * 1000)
    };
    setListaMedicamentos(prev => [...prev, nuevoMedicamento]);
    setMedicamento("");
    setFrecuencia("");
    setAlarma(false);
    setMostrarFormulario(false);
    if (alarma && notificacionPermitida) {
      mostrarNotificacion("Medicamento agregado", `Recordatorio activado para ${medicamento} cada ${frecuencia} horas.`);
    }
  };

  const handleEliminar = (id) => {
    const med = listaMedicamentos.find((m) => m.id === id);
    setListaMedicamentos(listaMedicamentos.filter((m) => m.id !== id));
    if (med?.alarma && notificacionPermitida) {
      mostrarNotificacion("Medicamento eliminado", `Se eliminó ${med.nombre} de tu lista.`);
    }
  };

  const registrarToma = (id) => {
    setListaMedicamentos(prev =>
      prev.map((med) => {
        if (med.id === id) {
          const ahora = new Date();
          const nuevaProximaToma = new Date(ahora.getTime() + med.horas * 60 * 60 * 1000);
          if (med.alarma && notificacionPermitida) {
            mostrarNotificacion(
              "Toma registrada",
              `Has tomado ${med.nombre}. Próxima dosis a las ${nuevaProximaToma.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.`
            );
          }
          return { ...med, ultimaToma: ahora, proximaToma: nuevaProximaToma };
        }
        return med;
      })
    );
  };

  const calcularTiempoRestante = (proximaToma) => {
    const ahora = new Date();
    const diferencia = proximaToma - ahora;
    if (diferencia <= 0) return "¡Ahora!";
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    return `${horas}h ${minutos}m`;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Box sx={{
          width: 80, height: 80,
          bgcolor: "primary.main", color: "white",
          borderRadius: "50%",
          display: "inline-flex", alignItems: "center", justifyContent: "center", mb: 3
        }}>
          <MedicationIcon sx={{ fontSize: 40 }} />
        </Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Control de Medicamentos
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Gestiona tu medicación de forma sencilla y segura
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
            Agregar Medicamento
          </Button>
        </Box>
      )}

      {/* Formulario */}
      {mostrarFormulario && (
        <Paper sx={{ mb: 4, p: 2 }}>
          <CardHeader
            title="Nuevo Medicamento"
            action={<IconButton onClick={() => setMostrarFormulario(false)}><TrashIcon /></IconButton>}
          />
          <CardContent>
            <Stack spacing={2}>
              <Select fullWidth value={medicamento} displayEmpty
                onChange={(e) => setMedicamento(e.target.value)}>
                <MenuItem value="">-- Selecciona medicamento --</MenuItem>
                {medicamentosDisponibles.map((m) => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </Select>
              <TextField
                type="number" label="Cada cuántas horas"
                value={frecuencia}
                onChange={(e) => setFrecuencia(e.target.value)}
                inputProps={{ min: 1, max: 24 }}
                fullWidth
              />
              <FormControlLabel
                control={
                  <Checkbox checked={alarma} onChange={(e) => setAlarma(e.target.checked)} />
                }
                label={alarma ? "Activar recordatorio" : "Sin recordatorio"}
              />
              <Box textAlign="right">
                <Button onClick={() => setMostrarFormulario(false)} sx={{ mr: 1 }}>Cancelar</Button>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAgregar}>
                  Guardar
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Paper>
      )}

      {/* Lista de medicamentos */}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MedicationIcon /> Mis Medicamentos ({listaMedicamentos.length})
        </Typography>

        {listaMedicamentos.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <MedicationIcon sx={{ fontSize: 60, color: "grey.400", mb: 2 }} />
            <Typography>No hay medicamentos agregados</Typography>
          </Paper>
        ) : (
          <Stack spacing={2}>
            {listaMedicamentos.map((item) => (
              <Card key={item.id}>
                <CardContent>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs>
                      <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }} fontWeight="bold">
                        <MedicationIcon /> {item.nombre}
                      </Typography>
                      <Typography color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <ClockIcon /> Cada {item.horas} {item.horas === 1 ? "hora" : "horas"}
                      </Typography>
                      {item.alarma && <Chip icon={<BellIcon />} label="Recordatorio activo" color="primary" sx={{ mt: 1 }} />}
                      <Box mt={1}>
                        <Typography variant="caption" color="text.secondary">Próxima dosis:</Typography>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography color="primary.main" fontWeight="bold">
                            {item.proximaToma.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </Typography>
                          <Chip size="small" label={calcularTiempoRestante(item.proximaToma)} />
                        </Stack>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Stack direction="row" spacing={1}>
                        <IconButton color="success" onClick={() => registrarToma(item.id)}>
                          <RotateCcwIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleEliminar(item.id)}>
                          <TrashIcon />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Box>

      <Box mt={6} display="flex" justifyContent="space-between">
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} variant="outlined">
          Atrás
        </Button>
        <Button startIcon={<HomeIcon />} onClick={() => navigate('/dashboard')} variant="outlined">
          Inicio
        </Button>
        <Button onClick={() => navigate('/login')} variant="outlined" color="error">
          Cerrar Sesión
        </Button>
      </Box>
    </Container>
  );
}

export default Medications;
