import React, { useState, useEffect, useCallback } from "react";
import {
  Box, Container, Typography, Button, TextField,
  Card, CardContent, CardHeader, Grid, IconButton,
  Stack, Paper, Chip
} from "@mui/material";
import {
  Add as AddIcon, Medication as MedicationIcon,
  Delete as TrashIcon,
  CheckCircle as CheckIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { clearAuth, getUser } from "../../services/authStorage";
import {
  listMedicationsByUser,
  createMedication,
  deleteMedication,
  markMedicationTaken,
  getMedicationSuggestions,
} from "../../services/medicationService";

const medicamentosDisponiblesBase = [
  "Paracetamol", "Ibuprofeno", "Amoxicilina",
  "Omeprazol", "Aspirina", "Loratadina",
  "Metformina", "Atorvastatina"
];

function Medications() {
  const [medicamento, setMedicamento] = useState("");
  const [nombrePersonalizado, setNombrePersonalizado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [dosis, setDosis] = useState("");
  const [hora, setHora] = useState("");
  const [listaMedicamentos, setListaMedicamentos] = useState([]);
  const [opcionesMedicamentos, setOpcionesMedicamentos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const navigate = useNavigate();

  const fetchMedications = useCallback(async () => {
    const currentUser = getUser();
    const meds = await listMedicationsByUser(currentUser?.id);
    if (Array.isArray(meds)) {
      const mapped = meds.map((m) => ({
        id: m.id ?? m?.medicationId ?? Date.now() + Math.random(),
        nombre: m.name || m.nombre || "Medicamento",
        dosis: m.dose || 0,
        hora: m.hour || null,
        tomado: m.taken || false,
      }));
      setListaMedicamentos(mapped);
    }
  }, []);

  // Cargar datos desde backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    (async () => {
      try {
        await fetchMedications();
      } catch (error) {
        console.error("Failed to load medications", error);
      }
      try {
        const suggestions = await getMedicationSuggestions();
        if (Array.isArray(suggestions)) {
          const names = suggestions.map((s) => s.name).filter(Boolean);
          setOpcionesMedicamentos(names.length ? names : medicamentosDisponiblesBase);
        } else {
          setOpcionesMedicamentos(medicamentosDisponiblesBase);
        }
      } catch (error) {
        console.error("Failed to load medication suggestions", error);
        setOpcionesMedicamentos(medicamentosDisponiblesBase);
      }
    })();
  }, [fetchMedications, navigate]);

  const handleAgregar = async () => {
    if (!medicamento || !dosis) return;
    try {
      // Convertir la hora al formato que espera el backend (HH:mm:ss)
      const hourForApi = hora ? `${hora}:00` : null;
      
      // Usar nombre personalizado si se seleccionó "Otro", sino usar el medicamento seleccionado
      const nombreMedicamento = medicamento === "Otro" ? nombrePersonalizado : medicamento;
      
      if (medicamento === "Otro" && !nombrePersonalizado.trim()) {
        alert("Por favor ingresa el nombre del medicamento");
        return;
      }
      
      const created = await createMedication({
        name: nombreMedicamento,
        dose: parseInt(dosis),
        hour: hourForApi,
        description: descripcion,
      });
      if (created) {
        await fetchMedications();
      }
    } catch (error) {
      console.error("Failed to create medication", error);
    } finally {
      setMedicamento("");
      setNombrePersonalizado("");
      setDescripcion("");
      setDosis("");
      setHora("");
      setMostrarFormulario(false);
    }
  };

  const handleEliminar = async (id) => {
    try {
      if (id) await deleteMedication(id);
      await fetchMedications();
    } catch (error) {
      console.error("Failed to delete medication", error);
    }
  };

  const registrarToma = async (id) => {
    try {
      if (id) await markMedicationTaken(id);
      await fetchMedications();
    } catch (error) {
      console.error("Failed to mark medication as taken", error);
    }
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
              <TextField
                select
                fullWidth
                value={medicamento}
                onChange={(e) => setMedicamento(e.target.value)}
                slotProps={{
                  select: {
                    native: true,
                  }
                }}
              >
                <option value="">-- Selecciona medicamento --</option>
                {opcionesMedicamentos.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
                <option value="Otro">Otro</option>
              </TextField>
              
              {medicamento === "Otro" && (
                <TextField
                  fullWidth
                  label="Nombre del medicamento"
                  value={nombrePersonalizado}
                  onChange={(e) => setNombrePersonalizado(e.target.value)}
                  placeholder="Ingresa el nombre del medicamento"
                />
              )}
              <TextField
                label="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                multiline
                minRows={2}
                fullWidth
              />
              <TextField
                type="number" 
                label="Dosis"
                value={dosis}
                onChange={(e) => setDosis(e.target.value)}
                slotProps={{ input: { min: 0 } }}
                fullWidth
              />
              <TextField
                type="time" 
                label="Hora"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                slotProps={{ 
                  inputLabel: { shrink: true } 
                }}
                fullWidth
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
                      
                      <Typography color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                        Dosis: {item.dosis}
                      </Typography>
                      
                      {item.hora && (
                        <Typography color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                          Hora: {item.hora}
                        </Typography>
                      )}
                      
                      {item.tomado && (
                        <Chip 
                          icon={<CheckIcon />} 
                          label="Tomado" 
                          color="success" 
                          sx={{ mt: 1 }} 
                        />
                      )}
                    </Grid>
                    <Grid item>
                      <Stack direction="row" spacing={1}>
                        {!item.tomado && (
                          <IconButton color="success" onClick={() => registrarToma(item.id)}>
                            <CheckIcon />
                          </IconButton>
                        )}
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

      {/* Botones de navegación */}
      <Box mt={6} display="flex" justifyContent="space-between">
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} variant="outlined">
          Atrás
        </Button>
        <Button startIcon={<HomeIcon />} onClick={() => navigate('/dashboard')} variant="outlined">
          Inicio
        </Button>
        <Button onClick={() => { clearAuth(); navigate('/login'); }} variant="outlined" color="error">
          Cerrar Sesión
        </Button>
      </Box>
    </Container>
  );
}

export default Medications;