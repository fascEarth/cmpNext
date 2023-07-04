
import SurfaceLayout from '../../../../../../components/layouts/surface/Layout';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import styles from './index.module.css';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

//import CollectCommonDataTable from '../../../../../../components/pages/datatable/collect';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import MinsDataTable from './minsDatatable';
import CollDataTable from '../../../../../../components/pages/datatable/model/collectTable';
function MinstanceList() {

  return (
    <SurfaceLayout currentPage={0} setBackgrd={true}>
      <Box className={styles.contentWrapper}></Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography component="h4" variant="h5" align="left" color="#fff" fontSize={20}>
          Manage Instance
        </Typography>
      </Breadcrumbs>
      <Paper sx={{ width: '100%', mt:3, mb: 2, borderRadius: '7px' }}>
        
        <MinsDataTable />
        
      </Paper>
    </SurfaceLayout>
  );
}

export default MinstanceList;
