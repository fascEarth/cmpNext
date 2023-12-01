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
            {children}
      </Grid>

      </>

    );

  };
  
  export default DccLayout;