import React, { useState, useEffect, useCallback } from "react";
import {
  Box, Container, Typography, Button, TextField,
  Card, CardContent, CardHeader, Grid, IconButton,
  Stack, Paper
} from "@mui/material";
import {
  Add as AddIcon, Warning as WarningIcon,
  Delete as TrashIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { clearAuth, getUser  } from "../../services/authStorage";
import {
  listAllMyAllergies,
  createAllergy,
  deleteAllergy,
  getAllergySuggestions,
} from "../../services/allergyService";

const alergiasDisponiblesBase = [
  "Penicilina", "Sulfamidas", "Aspirina", "Ibuprofeno",
  "Paracetamol", "Codeína", "Morfina", "Insulina"
];

function Allergies({ darkMode }) {
  const [nombre, setNombre] = useState("");
  const [nombrePersonalizado, setNombrePersonalizado] = useState("");
  const [listaAlergias, setListaAlergias] = useState([]);
  const [opcionesAlergias, setOpcionesAlergias] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const navigate = useNavigate();

  const fetchAllergies = useCallback(async () => {
    try {
            const currentUser = getUser();
      const data = await listAllMyAllergies(currentUser?.id);
      if (Array.isArray(data)) {
        const mapped = data.map((a) => ({
          id: a.id || Date.now() + Math.random(),
          nombre: a.name || "Alergia",
        }));
        setListaAlergias(mapped);
      }
    } catch (error) {
      console.error("Failed to load allergies", error);
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
        await fetchAllergies();
      } catch (error) {
        console.error("Failed to load allergies", error);
      }
      try {
        const suggestions = await getAllergySuggestions();
        if (Array.isArray(suggestions)) {
          const names = suggestions.map((s) => s.name).filter(Boolean);
          setOpcionesAlergias(names.length ? names : alergiasDisponiblesBase);
        } else {
          setOpcionesAlergias(alergiasDisponiblesBase);
        }
      } catch (error) {
        console.error("Failed to load allergy suggestions", error);
        setOpcionesAlergias(alergiasDisponiblesBase);
      }
    })();
  }, [fetchAllergies, navigate]);

  const handleAgregar = async () => {
    if (!nombre) return;
    try {
      const nombreFinal = nombre === "Otro" ? nombrePersonalizado : nombre;

      if (nombre === "Otro" && !nombrePersonalizado.trim()) {
        alert("Por favor ingresa el nombre de la alergia");
      return;
    }

      const created = await createAllergy({ name: nombreFinal });
      if (created) {
        await fetchAllergies();
      }
    } catch (error) {
      console.error("Failed to create allergy", error);
    } finally {
      setNombre("");
      setNombrePersonalizado("");
      setMostrarFormulario(false);
    }
  };

  const handleEliminar = async (id) => {
    try {
      if (id) await deleteAllergy(id);
      await fetchAllergies();
    } catch (error) {
      console.error("Failed to delete allergy", error);
    }
  };

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
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Box sx={{
          width: 80, height: 80,
          bgcolor: "error.main", color: "white",
            borderRadius: "50%",
          display: "inline-flex", alignItems: "center", justifyContent: "center", mb: 3
        }}>
          <WarningIcon sx={{ fontSize: 40 }} />
        </Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Control de Alergias
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: darkMode ? '#fff' : 'text.secondary'
          }}
        >
          Gestiona tus alergias de forma sencilla y segura
        </Typography>
      </Box>

      {/* Botón agregar */}
      {!mostrarFormulario && (
        <Box textAlign="center" mb={4}>
          <Button
            variant="contained" size="large" color="error"
            startIcon={<AddIcon />}
            onClick={() => setMostrarFormulario(true)}
          >
            Agregar Alergia
          </Button>
        </Box>
      )}

      {/* Formulario */}
      {mostrarFormulario && (
        <Paper sx={{
          mb: 4,
          p: 2,
          bgcolor: darkMode ? "#1e1e1e" : "#fff",
          color: darkMode ? "#fff" : "#000",
          border: darkMode ? "1px solid #333" : "1px solid #e0e0e0"
        }}>
          <CardHeader
            title="Nueva Alergia"
            sx={{
              color: darkMode ? "#fff" : "#000"
            }}
            action={
              <IconButton
                onClick={() => setMostrarFormulario(false)}
                sx={{ color: darkMode ? "#fff" : "#000" }}
              >
                <TrashIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Stack spacing={2}>
              <TextField
                select
                fullWidth
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: darkMode ? '#fff' : '#000',
                  },
                  '& .MuiOutlinedInput-root': {
                    color: darkMode ? '#fff' : '#000',
                    '& fieldset': {
                      borderColor: darkMode ? '#fff' : '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: darkMode ? '#fff' : '#000',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: darkMode ? '#fff' : '#1976d2',
                    },
                  },
                  '& .MuiSelect-select': {
                    color: darkMode ? '#fff' : '#000',
                  },
                  '& .MuiSelect-icon': {
                    color: darkMode ? '#fff' : '#000',
                  }
                }}
                slotProps={{
                  select: {
                    native: true,
                  }
                }}
              >
                <option value="" style={{
                  backgroundColor: darkMode ? '#1e1e1e' : '#fff',
                  color: darkMode ? '#fff' : '#000'
                }}>
                  -- Selecciona alergia --
                </option>
                {opcionesAlergias.map((a) => (
                  <option key={a} value={a} style={{
                    backgroundColor: darkMode ? '#1e1e1e' : '#fff',
                    color: darkMode ? '#fff' : '#000'
                  }}>
                    {a}
                  </option>
                ))}
                <option value="Otro" style={{
                  backgroundColor: darkMode ? '#1e1e1e' : '#fff',
                  color: darkMode ? '#fff' : '#000'
                }}>
                  Otro
                </option>
              </TextField>

              {nombre === "Otro" && (
                <TextField
                  fullWidth
                  label="Nombre de la alergia"
                  value={nombrePersonalizado}
                  onChange={(e) => setNombrePersonalizado(e.target.value)}
                  placeholder="Ingresa el nombre de la alergia"
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: darkMode ? '#fff' : '#000',
                    },
                    '& .MuiOutlinedInput-root': {
                      color: darkMode ? '#fff' : '#000',
                      '& fieldset': {
                        borderColor: darkMode ? '#fff' : '#e0e0e0',
                      },
                      '&:hover fieldset': {
                        borderColor: darkMode ? '#fff' : '#000',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: darkMode ? '#fff' : '#1976d2',
                      },
                      '& input::placeholder': {
                        color: darkMode ? '#bbb' : '#666',
                        opacity: 1,
                      },
                    },
                  }}
                />
              )}

              <Box textAlign="right">
                <Button
                  onClick={() => setMostrarFormulario(false)}
                  sx={{
                    mr: 1,
                    color: darkMode ? '#fff' : '#1976d2',
                    '&:hover': {
                      backgroundColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(25,118,210,0.04)'
                    }
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<AddIcon />}
                  onClick={handleAgregar}
                  sx={{
                    backgroundColor: darkMode ? '#f44336' : undefined,
                    color: darkMode ? '#fff' : undefined,
                    '&:hover': {
                      backgroundColor: darkMode ? '#d32f2f' : undefined
                    }
                  }}
                >
                  Guardar
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Paper>
      )}

      {/* Lista de alergias */}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningIcon /> Mis Alergias ({listaAlergias.length})
        </Typography>

        {listaAlergias.length === 0 ? (
          <Paper sx={{
            p: 4,
            textAlign: "center",
            bgcolor: darkMode ? "#1e1e1e" : "#fff",
            color: darkMode ? "#fff" : "#000",
            border: darkMode ? "1px solid #333" : "1px solid #e0e0e0"
          }}>
            <WarningIcon sx={{ fontSize: 60, color: darkMode ? "#666" : "grey.400", mb: 2 }} />
            <Typography>No hay alergias agregadas</Typography>
          </Paper>
        ) : (
          <Stack spacing={2}>
            {listaAlergias.map((item) => (
              <Card key={item.id} sx={{
                bgcolor: darkMode ? "#1e1e1e" : "#fff",
                color: darkMode ? "#fff" : "#000",
                border: darkMode ? "1px solid #333" : "1px solid #e0e0e0"
              }}>
                <CardContent>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs>
                      <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }} fontWeight="bold">
                        <WarningIcon /> {item.nombre}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton color="error" onClick={() => handleEliminar(item.id)}>
                        <TrashIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </Container>
  );
}

export default Allergies;
