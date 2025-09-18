import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Grid, Typography, Tabs, Tab, Button,
  Select, MenuItem, Card, CardContent, CardHeader,
  Checkbox, FormControlLabel, Container, Paper,
  Stack, Chip, IconButton
} from "@mui/material";
import {
  CalendarToday, AccessTime, Notifications,
  Add, NotificationsActive, Delete,
  CheckCircle, Medication, NotificationsNone,
  Schedule as ScheduleIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon
} from "@mui/icons-material";

const medicamentosEjemplo = [
  "Paracetamol", "Ibuprofeno", "Amoxicilina",
  "Omeprazol", "Aspirina", "Loratadina"
];

const horasDelDia = [
  "06:00","07:00","08:00","09:00","10:00","11:00",
  "12:00","13:00","14:00","15:00","16:00","17:00",
  "18:00","19:00","20:00","21:00","22:00"
];

const diasSemana = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

function Schedule() {
  const navigate = useNavigate();
  const [vistaActual, setVistaActual] = useState("semanal");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [horarios, setHorarios] = useState([]);
  const [nuevoHorario, setNuevoHorario] = useState({
    medicamento: "", hora: "", dias: [], alarma: true, activo: true
  });

  // Cargar horarios guardados
  useEffect(() => {
    const datos = localStorage.getItem("horarios");
    if (datos) setHorarios(JSON.parse(datos));
  }, []);

  // Guardar horarios
  useEffect(() => {
    localStorage.setItem("horarios", JSON.stringify(horarios));
  }, [horarios]);

  const handleTabChange = (_, newValue) => setVistaActual(newValue);

  const handleAgregarHorario = () => {
    if (!nuevoHorario.medicamento || !nuevoHorario.hora) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }
    setHorarios(prev => [
      ...prev,
      { id: Date.now(), ...nuevoHorario, fechaCreacion: new Date().toISOString() }
    ]);
    setNuevoHorario({ medicamento:"", hora:"", dias:[], alarma:true, activo:true });
    setMostrarFormulario(false);
  };

  const handleEliminarHorario = (id) => setHorarios(prev => prev.filter(h => h.id !== id));

  const handleToggleDia = (dia) => setNuevoHorario(prev => ({
    ...prev,
    dias: prev.dias.includes(dia)
      ? prev.dias.filter(d => d !== dia)
      : [...prev.dias, dia]
  }));

  const marcarTomado = (id) => {
    setHorarios(prev => prev.map(h => h.id === id ? { ...h, activo: false } : h));
  };

  // --- Vistas ---
  const renderVistaSemanal = () => (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CalendarToday /> Programación Semanal
      </Typography>

      {horarios.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <ScheduleIcon sx={{ fontSize: 60, color: "grey.400", mb: 2 }} />
          <Typography>No hay horarios programados</Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {diasSemana.map(dia => (
            <Grid item xs={12} md={6} lg={4} key={dia}>
              <Card>
                <CardHeader title={dia} sx={{ pb: 1 }} />
                <CardContent sx={{ pt: 0 }}>
                  {horarios
                    .filter(h => h.dias.includes(dia) || h.dias.length === 0)
                    .sort((a, b) => a.hora.localeCompare(b.hora))
                    .map(horario => (
                      <Paper key={horario.id} sx={{ p: 2, mb: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Medication fontSize="small" /> {horario.medicamento}
                            </Typography>
                            <Typography color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <AccessTime sx={{ fontSize: 16 }} /> {horario.hora}
                            </Typography>
                            {horario.alarma && <Chip label="Alarma" size="small" color="primary" sx={{ mt: 1 }} />}
                            {!horario.activo && <Chip label="Tomado" size="small" color="success" sx={{ mt: 1 }} />}
                          </Box>
                          <Stack direction="row" spacing={1}>
                            <IconButton size="small" color="success" onClick={() => marcarTomado(horario.id)}>
                              <CheckCircle />
                            </IconButton>
                            <IconButton size="small" color="error" onClick={() => handleEliminarHorario(horario.id)}>
                              <Delete />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Paper>
                    ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );

  const renderVistaDiaria = () => {
    const hoy = new Date().toLocaleDateString("es-ES", { weekday: "long" });
    const horariosHoy = horarios
      .filter(h => h.dias.includes(hoy) || h.dias.length === 0)
      .sort((a,b) => a.hora.localeCompare(b.hora));

    return (
      <Box mt={4}>
        <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTime /> Horarios de Hoy - {hoy}
        </Typography>

        {horariosHoy.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <CheckCircle sx={{ fontSize: 60, color: "success.main", mb: 2 }} />
            <Typography>No hay medicamentos programados para hoy</Typography>
          </Paper>
        ) : (
          <Stack spacing={2}>
            {horariosHoy.map(horario => (
              <Card key={horario.id}>
                <CardContent>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs>
                      <Typography sx={{ display:"flex", alignItems:"center", gap:1 }}>
                        <Medication /> {horario.medicamento}
                      </Typography>
                      <Typography color="text.secondary" sx={{ display:"flex", alignItems:"center", gap:1 }}>
                        <AccessTime /> {horario.hora}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Stack direction="row" spacing={1}>
                        {horario.alarma && <Chip icon={<NotificationsActive />} label="Alarma activa" color="primary" variant="outlined" />}
                        {!horario.activo && <Chip label="Tomado" color="success" variant="filled" />}
                        <Button size="small" variant="contained" onClick={() => marcarTomado(horario.id)}>Marcar como tomado</Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    );
  };

  const renderProximasAlarmas = () => (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Notifications /> Próximas Alarmas
      </Typography>

      {horarios.filter(h => h.alarma && h.activo).length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <NotificationsNone sx={{ fontSize: 60, color: "info.main", mb:2 }} />
          <Typography>No hay alarmas activas</Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {horarios.filter(h => h.alarma && h.activo).sort((a,b) => a.hora.localeCompare(b.hora)).map(horario => (
            <Card key={horario.id}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography>{horario.medicamento} - {horario.hora}</Typography>
                  <Button size="small" variant="contained" onClick={() => marcarTomado(horario.id)}>Marcar como tomado</Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py:4 }}>
      <Box sx={{ textAlign:"center", mb:6 }}>
        <Box sx={{ width:80, height:80, bgcolor:"primary.main", color:"white", borderRadius:"50%", display:"inline-flex", alignItems:"center", justifyContent:"center", mb:3 }}>
          <CalendarToday sx={{ fontSize:40 }} />
        </Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>Horarios y Programación</Typography>
        <Typography variant="h6" color="text.secondary">Organiza tus medicamentos por días and horarios</Typography>
      </Box>

      <Paper sx={{ mb:4 }}>
        <Tabs value={vistaActual} onChange={handleTabChange} centered textColor="primary" indicatorColor="primary">
          <Tab icon={<CalendarToday />} iconPosition="start" label="Vista Semanal" value="semanal" />
          <Tab icon={<AccessTime />} iconPosition="start" label="Vista Diaria" value="diaria" />
          <Tab icon={<Notifications />} iconPosition="start" label="Próximas Alarmas" value="alarmas" />
        </Tabs>
      </Paper>

      {!mostrarFormulario && (
        <Box textAlign="center" mb={4}>
          <Button variant="contained" size="large" startIcon={<Add />} onClick={() => setMostrarFormulario(true)}>
            Programar Nuevo Horario
          </Button>
        </Box>
      )}

      {mostrarFormulario && (
        <Paper sx={{ mb:4, p:2 }}>
          <CardHeader title="Programar Medicamento" action={<IconButton onClick={()=>setMostrarFormulario(false)}><Delete /></IconButton>} />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Select fullWidth value={nuevoHorario.medicamento} displayEmpty onChange={e => setNuevoHorario(prev => ({...prev, medicamento: e.target.value}))}>
                  <MenuItem value="">-- Selecciona medicamento --</MenuItem>
                  {medicamentosEjemplo.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                </Select>
              </Grid>
              <Grid item xs={12} md={6}>
                <Select fullWidth value={nuevoHorario.hora} displayEmpty onChange={e => setNuevoHorario(prev => ({...prev, hora: e.target.value}))}>
                  <MenuItem value="">-- Selecciona hora --</MenuItem>
                  {horasDelDia.map(h => <MenuItem key={h} value={h}>{h}</MenuItem>)}
                </Select>
              </Grid>
            </Grid>

            <Box mt={2}>
              <Typography>Días de la semana (opcional):</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {diasSemana.map(dia => (
                  <Chip key={dia} label={dia} onClick={() => handleToggleDia(dia)}
                    color={nuevoHorario.dias.includes(dia)?"primary":"default"}
                    variant={nuevoHorario.dias.includes(dia)?"filled":"outlined"} />
                ))}
              </Stack>
            </Box>

            <Box mt={2}>
              <FormControlLabel control={<Checkbox checked={nuevoHorario.alarma} onChange={e=>setNuevoHorario(prev=>({...prev, alarma:e.target.checked}))} color="primary"/>} label="Activar recordatorio"/>
            </Box>

            <Box mt={2} textAlign="right">
              <Button onClick={()=>setMostrarFormulario(false)} sx={{mr:1}}>Cancelar</Button>
              <Button variant="contained" startIcon={<Add />} onClick={handleAgregarHorario}>Programar</Button>
            </Box>
          </CardContent>
        </Paper>
      )}

      {vistaActual==="semanal" && renderVistaSemanal()}
      {vistaActual==="diaria" && renderVistaDiaria()}
      {vistaActual==="alarmas" && renderProximasAlarmas()}

    
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

export default Schedule;