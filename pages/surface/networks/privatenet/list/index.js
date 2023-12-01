import SurfaceLayout from '../../../../../components/layouts/surface/Layout';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import PrivateNetworkListDataTable from '../../../../../components/pages/surface/networks/privatenet/list/table/collectTable';

// Custom CSS
import styles from './index.module.css';

// progress Start
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#2ed69b' : '#308fe8',
  },
}));
// progress End


function ListOfNetwork() {
  return (
    <SurfaceLayout currentPage={2} setBackgrd={true} >

        <Breadcrumbs aria-label="breadcrumb">
            <Typography component="h4" variant="h5" align="left" color="#fff" fontSize={20}>Private Networks</Typography>
        </Breadcrumbs>

        <Card sx={{mt:2, borderRadius:'7px'}}>
          <CardContent sx={{ padding: '24px'}}>
            <PrivateNetworkListDataTable  />  
          </CardContent>
        </Card>
            
    </SurfaceLayout>
  );
}

export default ListOfNetwork;