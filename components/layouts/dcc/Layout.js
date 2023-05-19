import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// ** Custom Style Imports
import styles from "./index.module.css";

const DccLayout = ({ children }) => {
  
    return (
      <>
      
      <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={false} sm={false} md={7} lg={8} xl={9} className={styles.loginBg} />
      <Grid className={styles.ResMdDevice} item xs={12} sm={12} md={5} lg={4} xl={3} component={Paper} elevation={6} square>
        <Box className={styles.verticalCenter}>
          <Grid item xs={12} sm={12} md={12}>            
          {children}
          </Grid>
        </Box>
      </Grid>
    </Grid>

      </>

    );

  };
  
  export default DccLayout;