// Footer.jsx
import { Box, Typography, Link } from '@mui/material';

export default function Footer({ darkMode }) {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 4,
        px: 4,
        bgcolor: darkMode ? '#1a1a1a' : '#1976d2',
        color: '#fff',
        borderTop: darkMode ? '2px solid #333' : '2px solid #000',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between', // imágenes a izquierda/derecha
        }}
      >

        <Box
          component="img"
          src="src\assets\logo-factoria.png"
          alt="Logo izquierda"
          sx={{ height: 60 }}
        />

        {/* Texto centrado */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 1, fontSize: '1.1rem' }}>
            Proyecto 2025{' '}
            <Link
              href="https://factoriaf5.org/"
              target="_blank"
              rel="noopener"
              underline="hover"
              sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Factoria F5
            </Link>{' '}
            en colaboración con{' '}
            <Link
              href="https://www.sanitas.es/"
              target="_blank"
              rel="noopener"
              underline="hover"
              sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Sanitas
            </Link>
          </Typography>
          <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
            Hackaton 8ª Edición
          </Typography>
        </Box>


        <Box
          component="img"
          src="src\assets\LogotipoSanitas.png"
          alt="Logo derecha"
          sx={{ height: 70 }}
        />
      </Box>
    </Box>
  );
}
