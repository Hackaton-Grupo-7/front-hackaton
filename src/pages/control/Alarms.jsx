import React, { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Stack, Switch, IconButton, Button, MenuItem, Select, TextField
} from "@mui/material";
import { Delete, AccessTime } from "@mui/icons-material";

// MOCK de medicamentos
const mockMedications = [
  { id: 1, name: "Paracetamol 500mg" },
  { id: 2, name: "Ibuprofeno 400mg" },
  { id: 3, name: "Omeprazol 20mg" },
];

// MOCK de alarmas
const mockAlarms = [
  { id: 1, medicationId: 1, time: "08:00", frequency: "every 8h", days: 5, active: true },
  { id: 2, medicationId: 2, time: "14:00", frequency: "every 12h", days: 3, active: false },
];

export default function Alarms({ darkMode }) {
  const [alarms, setAlarms] = useState([]);
  const [medications, setMedications] = useState([]);
  const [newAlarm, setNewAlarm] = useState({ medicationId: "", time: "", frequency: "", days: "" });

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
  }, []);

  const toggleAlarm = (id) => {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const deleteAlarm = (id) => {
    setAlarms(prev => prev.filter(a => a.id !== id));
  };

  const handleNewAlarmChange = (field, value) => {
    setNewAlarm(prev => ({ ...prev, [field]: value }));
  };

  const addAlarm = () => {
    if (!newAlarm.medicationId || !newAlarm.time || !newAlarm.frequency || !newAlarm.days) return;
    const nextId = alarms.length ? Math.max(...alarms.map(a => a.id)) + 1 : 1;
    setAlarms(prev => [...prev, { id: nextId, ...newAlarm, active: true }]);
    setNewAlarm({ medicationId: "", time: "", frequency: "", days: "" });
  };

  return (
    <Box sx={{ py: 4, px: 2, minHeight: "calc(100vh - 124px)", bgcolor: darkMode ? "#121212" : "#f9fafb" }}>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: textColor }}>
          Alarmas de Medicamentos
        </Typography>

        {/* Nuevo registro */}
        <Paper sx={{ p: 3, mb: 4, bgcolor: paperBg, border: paperBorder, borderRadius: 3 }}>
          <Typography sx={{ mb: 2, fontWeight: 600, color: textColor }}>Agregar Nueva Alarma</Typography>
          <Stack spacing={2}>
            <Select
              value={newAlarm.medicationId}
              onChange={(e) => handleNewAlarmChange("medicationId", e.target.value)}
              displayEmpty
            >
              <MenuItem value="">Selecciona medicamento</MenuItem>
              {medications.map(m => <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>)}
            </Select>
            <TextField
              type="time"
              value={newAlarm.time}
              onChange={(e) => handleNewAlarmChange("time", e.target.value)}
              label="Hora"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              value={newAlarm.frequency}
              onChange={(e) => handleNewAlarmChange("frequency", e.target.value)}
              label="Frecuencia (ej: cada 8h)"
            />
            <TextField
              type="number"
              value={newAlarm.days}
              onChange={(e) => handleNewAlarmChange("days", e.target.value)}
              label="Duración (días)"
            />
            <Button variant="contained" onClick={addAlarm}>Agregar</Button>
          </Stack>
        </Paper>

        {/* Lista de alarmas */}
        {alarms.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: "center", bgcolor: paperBg, border: paperBorder }}>
            <Typography color={textSecondary}>No tienes alarmas configuradas</Typography>
          </Paper>
        ) : (
          <Stack spacing={3}>
            {alarms.map(alarm => {
              const med = medications.find(m => m.id === alarm.medicationId);
              return (
                <Paper key={alarm.id} sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: paperBg, border: paperBorder, borderRadius: 3 }}>
                  <Box>
                    <Typography variant="h6" sx={{ color: textColor }}>{med ? med.name : "Sin medicamento"}</Typography>
                    <Typography variant="body2" sx={{ color: textSecondary, display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTime sx={{ fontSize: 16 }} /> {alarm.time} - {alarm.frequency} por {alarm.days} días
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Switch checked={alarm.active} onChange={() => toggleAlarm(alarm.id)} color="primary" />
                    <IconButton color="error" onClick={() => deleteAlarm(alarm.id)}>
                      <Delete />
                    </IconButton>
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
