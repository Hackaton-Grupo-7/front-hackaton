// Footer.jsx
import { Box, Typography, Link } from '@mui/material';

export default function Footer({ darkMode }) {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto', // empuja el footer al final si el contenido es pequeño
        py: 2,
        px: 4,
        bgcolor: darkMode ? '#1a1a1a' : '#1976d2',
        color: '#fff',
        borderTop: darkMode ? '2px solid #333' : '2px solid #000',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        Proyecto 2025{' '}
        <Link
          href="https://factoriaf5.org/"
          target="_blank"
          rel="noopener"
          underline="hover"
          sx={{ color: '#fff', fontWeight: 'bold' }}
        >
          Factoria F5
        </Link>{' '}
        en colaboración con{' '}
        <Link
          href="https://www.sanitas.es/"
          target="_blank"
          rel="noopener"
          underline="hover"
          sx={{ color: '#fff', fontWeight: 'bold' }}
        >
          Sanitas
        </Link>
      </Typography>
      <Typography variant="body2">Hackaton 8ª Edición</Typography>
    </Box>
  );
}
