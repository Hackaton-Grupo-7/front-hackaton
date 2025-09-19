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
      {/* Contenido centrado único */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 1
          }}
        >
          Proyecto 2025{' '}
          <Link
            href="https://factoriaf5.org/"
            target="_blank"
            rel="noopener"
            underline="none"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              '&:hover': {
                opacity: 0.8,
                transform: 'scale(1.05)',
                transition: 'all 0.2s ease'
              }
            }}
          >
            <Box
              component="img"
              src="src/assets/logo-factoria.png"
              alt="Factoria F5"
              sx={{
                height: 32,
                mx: 0.5,
                verticalAlign: 'middle'
              }}
            />
          </Link>
          {' '}en colaboración con{' '}
          <Link
            href="https://www.sanitas.es/"
            target="_blank"
            rel="noopener"
            underline="none"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              '&:hover': {
                opacity: 0.8,
                transform: 'scale(1.05)',
                transition: 'all 0.2s ease'
              }
            }}
          >
            <Box
              component="img"
              src="src/assets/LogoSanitas.png"
              alt="Sanitas"
              sx={{
                height: 34,
                mx: 0.5,
                verticalAlign: 'middle'
              }}
            />
          </Link>
        </Typography>
        <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
          Hackaton 8ª Edición
        </Typography>
      </Box>
    </Box>
  );
}