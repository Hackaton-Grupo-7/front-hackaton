import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',            // ocupa todo el ancho
        position: 'fixed',        // fijo en la parte inferior
        bottom: 0,
        left: 0,
        py: 2,
        px: 4,
        bgcolor: '#1976d2',       // mismo color que navbar
        color: '#fff',
        borderTop: '2px solid #000',
        textAlign: 'center',
        zIndex: 1200,             // encima de otros contenidos
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
