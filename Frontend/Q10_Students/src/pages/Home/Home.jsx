import { Box, Grid} from '@mui/material';
import HomeCard from './HomeCard';
import img1 from '../../assets/ayuda.jpg'
import img2 from '../../assets/dinamico.jpg'
import img3 from '../../assets/social.jpg'
import '../../../style.css';

function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box p={2}>
            <h1 className='title'>
              Bienvenido a Q10
            </h1>
            <p className='text'> 
              Q10 es una aplicación diseñada para simplificar y mejorar el proceso de registro de notas de estudiantes. Nuestro objetivo es proporcionarte una herramienta fácil de usar y eficiente para mantener un seguimiento detallado del progreso académico de los estudiantes.
            </p>
            <h2 className='subtitle'>
              Beneficios de Q10:
            </h2>
            <ul>
              <li>Accesibilidad: Interfaz sencilla e intuitiva para una navegación sin complicaciones.</li>
              <li>Organización: Facilita la gestión y organización de la información de los estudiantes y sus calificaciones.</li>
              <li>Análisis: Proporciona herramientas para analizar y evaluar el rendimiento académico de manera más eficiente.</li>
            </ul>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <img src={img1} alt="Ayuda" style={{ width: '100%', height: 'auto' }} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <img src={img2} alt="Dinamico" style={{ width: '100%', height: 'auto' }} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <img src={img3} alt="social" style={{ width: '100%', height: 'auto' }} />
                </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box p={2} marginTop={10}>
            <HomeCard />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
  