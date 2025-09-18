import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, TextField, Select, MenuItem, FormControl,
  InputLabel, RadioGroup, FormControlLabel, Radio, Paper, Grid, IconButton
} from "@mui/material";
import { 
  Plus, AlertTriangle, Trash2, Shield, Eye,
  ArrowLeft as ArrowBackIcon, Home as HomeIcon 
} from "lucide-react";

const medicamentosDisponibles = [
  "Paracetamol", "Ibuprofeno", "Amoxicilina", "Omeprazol",
  "Aspirina", "Loratadina", "Metformina", "Atorvastatina",
  "Penicilina", "Cefalexina", "Ciprofloxacino", "Diclofenaco",
  "Naproxeno", "Prednisona", "Insulina", "Warfarina"
];

const tiposReaccion = [
  "Erupción cutánea","Urticaria","Picazón","Hinchazón facial",
  "Dificultad respiratoria","Náuseas y vómitos","Diarrea",
  "Mareos","Dolor de cabeza","Shock anafiláctico",
  "Fiebre","Dolor abdominal","Confusión mental",
  "Palpitaciones","Otro"
];

const severidad = [
  { valor: "leve", label: "Leve", color: "#facc15" },
  { valor: "moderada", label: "Moderada", color: "#f97316" },
  { valor: "severa", label: "Severa", color: "#ef4444" }
];

export default function App({ darkMode }) {
  const navigate = useNavigate();
  const [medicamento, setMedicamento] = useState("");
  const [medicamentoPersonalizado, setMedicamentoPersonalizado] = useState("");
  const [reaccion, setReaccion] = useState("");
  const [reaccionPersonalizada, setReaccionPersonalizada] = useState("");
  const [nivelSeveridad, setNivelSeveridad] = useState("");
  const [notas, setNotas] = useState("");
  const [listaAlergias, setListaAlergias] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem("alergiasMedicamentos") || "[]");
    setListaAlergias(datosGuardados);
  }, []);

  useEffect(() => {
    localStorage.setItem("alergiasMedicamentos", JSON.stringify(listaAlergias));
  }, [listaAlergias]);

  const handleAgregar = () => {
    const medicamentoFinal = medicamento === "Otro" ? medicamentoPersonalizado : medicamento;
    const reaccionFinal = reaccion === "Otro" ? reaccionPersonalizada : reaccion;
    if (!medicamentoFinal || !reaccionFinal || !nivelSeveridad) return;

    const yaExiste = listaAlergias.some(a => a.medicamento.toLowerCase() === medicamentoFinal.toLowerCase());
    if (yaExiste) {
      alert("Ya existe un registro de alergia para este medicamento.");
      return;
    }

    const nuevaAlergia = {
      id: Date.now(),
      medicamento: medicamentoFinal,
      reaccion: reaccionFinal,
      severidad: nivelSeveridad,
      notas,
      fechaRegistro: new Date().toISOString()
    };

    setListaAlergias([...listaAlergias, nuevaAlergia]);
    setMedicamento(""); setMedicamentoPersonalizado("");
    setReaccion(""); setReaccionPersonalizada("");
    setNivelSeveridad(""); setNotas(""); setMostrarFormulario(false);
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Eliminar este registro de alergia?")) {
      setListaAlergias(prev => prev.filter(a => a.id !== id));
    }
  };

  const getSeveridadColor = (valor) => {
    const config = { leve: "#fef3c7", moderada: "#ffedd5", severa: "#fee2e2" };
    return config[valor] || "#e5e7eb";
  };

  const getSeveridadIcon = (valor) => {
    if (valor === "severa") return <AlertTriangle style={{ width: 16, height: 16, marginRight: 4, color: "#ef4444" }} />;
    if (valor === "moderada") return <AlertTriangle style={{ width: 16, height: 16, marginRight: 4, color: "#f97316" }} />;
    return <Eye style={{ width: 16, height: 16, marginRight: 4, color: "#facc15" }} />;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: darkMode ? "#121212" : "#f9fafb",
        color: darkMode ? "#e5e7eb" : "#111827",
        py: 6,
        px: 4
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Box
          sx={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            width: 64,
            height: 64,
            borderRadius: "50%",
            bgcolor: "#ef4444",
            mb: 2
          }}
        >
          <AlertTriangle style={{ color: "#fff", width: 32, height: 32 }} />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Control de Alergias
        </Typography>
        <Typography sx={{ color: darkMode ? "#9ca3af" : "#4b5563" }}>
          Registra y gestiona tus alergias a medicamentos
        </Typography>
      </Box>

      {/* Botón mostrar formulario */}
      {!mostrarFormulario && (
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<Plus />}
            onClick={() => setMostrarFormulario(true)}
            sx={{ py: 1.5, px: 4 }}
          >
            Registrar Nueva Alergia
          </Button>
        </Box>
      )}

      {/* Formulario */}
      {mostrarFormulario && (
        <Paper sx={{ p: 4, mb: 6, borderRadius: 3, boxShadow: 4, bgcolor: darkMode ? "#1f2937" : "#fff" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}>
              <Plus style={{ marginRight: 8 }} /> Registrar Alergia a Medicamento
            </Typography>
            <Button onClick={() => setMostrarFormulario(false)}>✕</Button>
          </Box>

          <Grid container spacing={3}>
            {/* Medicamento */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="medicamento-label">Medicamento *</InputLabel>
                <Select
                  labelId="medicamento-label"
                  id="medicamento"
                  value={medicamento}
                  onChange={(e) => setMedicamento(e.target.value)}
                  label="Medicamento *"
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>-- Selecciona un medicamento --</em>
                  </MenuItem>
                  {medicamentosDisponibles.map(m => (
                    <MenuItem key={m} value={m}>{m}</MenuItem>
                  ))}
                  <MenuItem value="Otro">Otro (especificar)</MenuItem>
                </Select>
              </FormControl>
              {medicamento === "Otro" && (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Especifica el medicamento"
                  value={medicamentoPersonalizado}
                  onChange={(e) => setMedicamentoPersonalizado(e.target.value)}
                  sx={{ mt: 2 }}
                />
              )}
            </Grid>

            {/* Reacción */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="reaccion-label">Tipo de Reacción *</InputLabel>
                <Select
                  labelId="reaccion-label"
                  id="reaccion"
                  value={reaccion}
                  onChange={(e) => setReaccion(e.target.value)}
                  label="Tipo de Reacción *"
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>-- Selecciona la reacción --</em>
                  </MenuItem>
                  {tiposReaccion.map(r => (
                    <MenuItem key={r} value={r}>{r}</MenuItem>
                  ))}
                  <MenuItem value="Otro">Otro (especificar)</MenuItem>
                </Select>
              </FormControl>
              {reaccion === "Otro" && (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Describe la reacción"
                  value={reaccionPersonalizada}
                  onChange={(e) => setReaccionPersonalizada(e.target.value)}
                  sx={{ mt: 2 }}
                />
              )}
            </Grid>

            {/* Severidad */}
            <Grid item xs={12}>
              <FormControl>
                <Typography sx={{ mb: 1, fontWeight: 500 }}>Nivel de Severidad *</Typography>
                <RadioGroup value={nivelSeveridad} onChange={(e) => setNivelSeveridad(e.target.value)} row>
                  {severidad.map(n => (
                    <FormControlLabel
                      key={n.valor}
                      value={n.valor}
                      control={<Radio sx={{ color: n.color }} />}
                      label={(
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          {getSeveridadIcon(n.valor)}
                          <Typography>{n.label}</Typography>
                        </Box>
                      )}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Notas */}
            <Grid item xs={12}>
              <TextField
                label="Notas adicionales"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
              />
            </Grid>
          </Grid>

          {/* Botones */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
            <Button variant="outlined" onClick={() => setMostrarFormulario(false)}>Cancelar</Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<Plus />}
              onClick={handleAgregar}
              disabled={!medicamento || (medicamento==="Otro" && !medicamentoPersonalizado) || !reaccion || (reaccion==="Otro" && !reaccionPersonalizada) || !nivelSeveridad}
            >
              Registrar Alergia
            </Button>
          </Box>
        </Paper>
      )}

      {/* Lista */}
      <Box sx={{ display: "grid", gap: 3, mb: 4 }}>
        {listaAlergias.length === 0 ? (
          <Paper sx={{ textAlign: "center", py: 6, borderRadius: 3, bgcolor: darkMode ? "#1f2937" : "#f3f4f6" }}>
            <Shield style={{ fontSize: 40, color: "#9ca3af", marginBottom: 8 }} />
            <Typography sx={{ color: "#6b7280" }}>No hay alergias registradas</Typography>
            <Typography sx={{ color: "#9ca3af", fontSize: 14 }}>Registra tus alergias para evitar reacciones adversas</Typography>
          </Paper>
        ) : (
          listaAlergias.map(item => (
            <Paper
              key={item.id}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: darkMode ? "#1f2937" : "#fff",
                boxShadow: 4
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <AlertTriangle style={{ marginRight: 8, color: "#ef4444" }} />
                    <Typography sx={{ fontWeight: 600 }}>{item.medicamento}</Typography>
                    <Box
                      sx={{
                        ml: 2,
                        display: "inline-flex",
                        alignItems: "center",
                        px: 1,
                        py: 0.5,
                        bgcolor: getSeveridadColor(item.severidad),
                        borderRadius: 1
                      }}
                    >
                      {getSeveridadIcon(item.severidad)}
                      <Typography sx={{ fontSize: 12, textTransform: "capitalize" }}>
                        {item.severidad}
                      </Typography>
                    </Box>
                  </Box>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                      <Typography sx={{ fontWeight: 500 }}>Reacción:</Typography>
                      <Typography>{item.reaccion}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography sx={{ fontWeight: 500 }}>Fecha:</Typography>
                      <Typography>{new Date(item.fechaRegistro).toLocaleDateString()}</Typography>
                    </Grid>
                  </Grid>
                  {item.notas && (
                    <Box sx={{ mt: 2, p: 2, borderRadius: 1, border: "1px solid #d1d5db" }}>
                      <Typography sx={{ fontWeight: 500, fontSize: 14 }}>Notas:</Typography>
                      <Typography sx={{ fontSize: 14 }}>{item.notas}</Typography>
                    </Box>
                  )}
                </Box>
                <IconButton onClick={() => handleEliminar(item.id)} color="error">
                  <Trash2 />
                </IconButton>
              </Box>
            </Paper>
          ))
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
    </Box>
  );
}