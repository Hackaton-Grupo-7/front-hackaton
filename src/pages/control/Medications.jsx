import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Card,
  Grid,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Medication as MedicationIcon,
  AccessTime as ClockIcon,
  Notifications as BellIcon,
  NotificationsOff as BellOffIcon,
  Delete as TrashIcon,
  Replay as RotateCcwIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const medicamentosDisponibles = [
  'Paracetamol',
  'Ibuprofeno',
  'Amoxicilina',
  'Omeprazol',
  'Aspirina',
  'Loratadina',
  'Metformina',
  'Atorvastatina',
];

function Medications({ darkMode }) {
  const [medicamento, setMedicamento] = useState('');
  const [frecuencia, setFrecuencia] = useState('');
  const [alarma, setAlarma] = useState(false);
  const [listaMedicamentos, setListaMedicamentos] = useState([]);
  const [notificacionPermitida, setNotificacionPermitida] = useState(false);
  const navigate = useNavigate();

  // Colores según dark mode
  const bgPrimary = darkMode ? '#121212' : 'linear-gradient(to bottom right, #e0f2ff, #c5cae9)';
  const cardBg = darkMode ? '#1f2937' : '#fff';
  const cardBorder = darkMode ? '1px solid #374151' : '1px solid #d1d5db';
  const textPrimary = darkMode ? '#e5e5e5' : '#111827';
  const textSecondary = darkMode ? '#9ca3af' : '#6b7280';
  const iconColor = darkMode ? '#10b981' : 'primary.main';

  useEffect(() => {
    const datosGuardados = localStorage.getItem('medicamentos');
    if (datosGuardados) setListaMedicamentos(JSON.parse(datosGuardados));
    if ('Notification' in window) setNotificacionPermitida(Notification.permission === 'granted');
  }, []);

  useEffect(() => {
    localStorage.setItem('medicamentos', JSON.stringify(listaMedicamentos));
  }, [listaMedicamentos]);

  const solicitarPermisoNotificaciones = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        setNotificacionPermitida(permission === 'granted');
        if (permission === 'granted') {
          mostrarNotificacion('Permiso concedido', 'Ahora recibirás recordatorios de tus medicamentos.');
        }
      });
    }
  };

  const mostrarNotificacion = (titulo, mensaje) => {
    if (notificacionPermitida) {
      new Notification(titulo, {
        body: mensaje,
        icon: '/pill-icon.png',
      });
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
      proximaToma: new Date(Date.now() + parseInt(frecuencia) * 60 * 60 * 1000),
    };
    setListaMedicamentos([...listaMedicamentos, nuevoMedicamento]);
    setMedicamento('');
    setFrecuencia('');
    setAlarma(false);
    if (alarma && notificacionPermitida) {
      mostrarNotificacion('Medicamento agregado', `Recordatorio activado para ${medicamento} cada ${frecuencia} horas.`);
    }
  };

  const handleEliminar = (id) => {
    const med = listaMedicamentos.find((m) => m.id === id);
    setListaMedicamentos(listaMedicamentos.filter((m) => m.id !== id));
    if (med.alarma && notificacionPermitida) {
      mostrarNotificacion('Medicamento eliminado', `Se eliminó ${med.nombre} de tu lista.`);
    }
  };

  const registrarToma = (id) => {
    setListaMedicamentos(
      listaMedicamentos.map((med) => {
        if (med.id === id) {
          const ahora = new Date();
          const nuevaProximaToma = new Date(ahora.getTime() + med.horas * 60 * 60 * 1000);
          if (med.alarma && notificacionPermitida) {
            mostrarNotificacion(
              'Toma registrada',
              `Has tomado ${med.nombre}. Próxima dosis a las ${nuevaProximaToma.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`
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
    if (diferencia <= 0) return '¡Ahora!';
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    return `${horas}h ${minutos}m`;
  };

  return (
    <Box sx={{ py: 5, minHeight: '100vh', background: bgPrimary }}>
      <Container maxWidth="md">
        {/* Navegación */}
        <Box display="flex" justifyContent="space-between" mb={4}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} variant="outlined" sx={{ color: textPrimary, borderColor: textSecondary }}>
            Atrás
          </Button>
          <Button startIcon={<HomeIcon />} onClick={() => navigate('/dashboard')} variant="outlined" sx={{ color: textPrimary, borderColor: textSecondary }}>
            Inicio
          </Button>
          <Button onClick={() => navigate('/login')} variant="outlined" sx={{ color: textPrimary, borderColor: textSecondary }}>
            Cerrar Sesión
          </Button>
        </Box>

        {/* Header */}
        <Box textAlign="center" mb={5}>
          <Box display="inline-flex" alignItems="center" justifyContent="center" sx={{ width: 64, height: 64, bgcolor: iconColor, borderRadius: '50%', mb: 2 }}>
            <MedicationIcon sx={{ color: '#fff', fontSize: 32 }} />
          </Box>
          <Typography variant="h3" gutterBottom sx={{ color: textPrimary }}>
            Control de Medicamentos
          </Typography>
          <Typography variant="body1" color={textSecondary}>
            Gestiona tu medicación de forma sencilla y segura
          </Typography>
          {!notificacionPermitida && (
            <Button variant="outlined" color="primary" sx={{ mt: 2 }} onClick={solicitarPermisoNotificaciones}>
              Activar recordatorios
            </Button>
          )}
        </Box>

        {/* Formulario */}
        <Card sx={{ mb: 5, p: 3, bgcolor: cardBg, border: cardBorder }}>
          <Typography variant="h5" gutterBottom display="flex" alignItems="center">
            <AddIcon sx={{ mr: 1 }} /> Agregar Medicamento
          </Typography>
          <Stack spacing={2}>
            <Select
              value={medicamento}
              onChange={(e) => setMedicamento(e.target.value)}
              displayEmpty
              fullWidth
              sx={{ bgcolor: cardBg, color: textPrimary }}
            >
              <MenuItem value="">-- Selecciona un medicamento --</MenuItem>
              {medicamentosDisponibles.map((med) => (
                <MenuItem key={med} value={med}>{med}</MenuItem>
              ))}
            </Select>
            <TextField
              type="number"
              label="Cada cuántas horas"
              value={frecuencia}
              onChange={(e) => setFrecuencia(e.target.value)}
              inputProps={{ min: 1, max: 24 }}
              fullWidth
              sx={{ bgcolor: cardBg, color: textPrimary }}
            />
            <FormControlLabel
              control={<Checkbox checked={alarma} onChange={(e) => setAlarma(e.target.checked)} />}
              label={alarma ? <><BellIcon sx={{ mr: 1, color: iconColor }} /> Activar recordatorio</> : <><BellOffIcon sx={{ mr: 1, color: iconColor }} /> Sin recordatorio</>}
            />
            <Button
              variant="contained"
              color={darkMode ? 'success' : 'primary'}
              startIcon={<AddIcon />}
              onClick={handleAgregar}
              disabled={!medicamento || !frecuencia}
              fullWidth
            >
              Agregar Medicamento
            </Button>
          </Stack>
        </Card>

        {/* Lista de Medicamentos */}
        <Card sx={{ p: 3, bgcolor: cardBg, border: cardBorder }}>
          <Typography variant="h5" gutterBottom display="flex" alignItems="center">
            <MedicationIcon sx={{ mr: 1, color: iconColor }} /> Mis Medicamentos ({listaMedicamentos.length})
          </Typography>

          {listaMedicamentos.length === 0 ? (
            <Box textAlign="center" py={5}>
              <Box sx={{ width: 64, height: 64, bgcolor: 'grey.200', borderRadius: '50%', mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MedicationIcon sx={{ fontSize: 32, color: 'grey.400' }} />
              </Box>
              <Typography color="text.secondary">No hay medicamentos agregados</Typography>
              <Typography color="text.disabled" variant="body2">Agrega tu primer medicamento usando el formulario de arriba</Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {listaMedicamentos.map((item) => (
                <Card key={item.id} sx={{ p: 2, border: '1px solid', borderColor: textSecondary, bgcolor: cardBg }}>
                  <Grid container spacing={2} alignItems="flex-start">
                    <Grid item xs={12} md={9}>
                      <Typography variant="h6" display="flex" alignItems="center" mb={1} sx={{ color: textPrimary }}>
                        <MedicationIcon sx={{ mr: 1, color: iconColor }} /> {item.nombre}
                      </Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={6} display="flex" alignItems="center" sx={{ color: textSecondary }}>
                          <ClockIcon sx={{ mr: 1 }} />
                          Cada {item.horas} {item.horas === 1 ? 'hora' : 'horas'}
                        </Grid>
                        <Grid item xs={6} display="flex" alignItems="center">
                          {item.alarma ? (
                            <Box display="flex" alignItems="center" sx={{ color: 'success.main' }}>
                              <BellIcon sx={{ mr: 1 }} /> Recordatorio activado
                            </Box>
                          ) : (
                            <Box display="flex" alignItems="center" sx={{ color: textSecondary }}>
                              <BellOffIcon sx={{ mr: 1 }} /> Sin recordatorio
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                      <Box mt={1} p={1} sx={{ bgcolor: darkMode ? '#374151' : 'grey.100', borderRadius: 1, border: '1px solid', borderColor: textSecondary }}>
                        <Typography variant="caption" sx={{ color: textSecondary }}>Próxima dosis:</Typography>
                        <Box display="flex" justifyContent="space-between">
                          <Typography color="primary" fontWeight="bold">
                            {item.proximaToma.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Typography>
                          <Typography variant="caption" sx={{ bgcolor: 'primary.light', color: 'primary.dark', px: 1, borderRadius: 1 }}>
                            {calcularTiempoRestante(item.proximaToma)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={3} display="flex" flexDirection="column" gap={1}>
                      <IconButton color="success" onClick={() => registrarToma(item.id)}>
                        <RotateCcwIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleEliminar(item.id)}>
                        <TrashIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Stack>
          )}
        </Card>
      </Container>
    </Box>
  );
}

export default Medications;
