import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import HomeCard from './HomeCard';

function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        p: { xs: 2, md: 4 }
      }}
    >
      <Grid container spacing={4}>

        {/* LEFT */}
        <Grid item xs={12} md={8}>
          
          {/* HERO */}
          <Box mb={5}>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{ color: '#1e293b' }}
            >
              Bienvenido a Q10
            </Typography>

            <Typography
              variant="h6"
              sx={{ color: '#64748b', maxWidth: 600 }}
            >
              Gestiona estudiantes, calificaciones y análisis académico
              de forma simple, rápida y eficiente.
            </Typography>
          </Box>

          {/* BENEFITS */}
          <Grid container spacing={3}>
            {[
              {
                title: 'Accesibilidad',
                desc: 'Interfaz intuitiva y fácil de usar'
              },
              {
                title: 'Organización',
                desc: 'Administra estudiantes y notas sin complicaciones'
              },
              {
                title: 'Análisis',
                desc: 'Evalúa el rendimiento académico fácilmente'
              }
            ].map((item, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Card
                  sx={{
                    borderRadius: 3,
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    height: '100%',
                    transition: '0.25s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.08)'
                    }
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: '#3a3a3b', mb: 1 }}
                    >
                      {item.title}
                    </Typography>

                    <Typography sx={{ color: '#475569' }}>
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

        </Grid>

        {/* RIGHT */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',   // centra horizontal
              alignItems: { xs: 'flex-start', md: 'center' } // centra vertical en desktop
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 420,
                p: 3,
                borderRadius: 3,
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}
            >
              <HomeCard />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;