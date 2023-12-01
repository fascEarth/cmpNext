// ** React Imports
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import SurfaceLayout from '../../../../../components/layouts/surface/Layout';
import Link from 'next/link';

// ** MUI Components
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Popover from '@mui/material/Popover';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FirewallDataTable from './FirewallTable';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

// ** MUI ICON Components
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import CloseIcon from '@mui/icons-material/Close';

// ** Custom CSS 
import styles from './index.module.css';

// ** Table Skeleton CSS 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#e1f3f6',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
}));

// ** Table Skeleton Function
function TableSkeletonData(id, disk, type, size, cost, action) {
    return { id, disk, type, size, cost, action };
}
const Skeletonrows = [
    TableSkeletonData(),
    TableSkeletonData(),
    TableSkeletonData(),
    TableSkeletonData(),
    TableSkeletonData(),
];


function Firewall() { 

    return (
        <SurfaceLayout currentPage={13} setBackgrd={true} >

            {/* Start Breadcrumbs Here */}
            <Breadcrumbs aria-label="breadcrumb">
                <Typography component="h4" variant="h5" align="left" color="#fff" fontSize={20}>Firewall Rules</Typography>
            </Breadcrumbs>
            {/* END Breadcrumbs Here */}
            {/* Start Breadcrumbs Skeleton Here */}
            <Stack spacing={1} sx={{display: 'none'}}>
                <Skeleton variant="text" animation="wave" width={180} height={25} />
            </Stack>
            {/* END Breadcrumbs Skeleton Here */}
            
            <Card sx={{mt:2, borderRadius:'7px'}} className={styles.InvoiceTableCard}>
                <CardContent sx={{ padding: '24px'}}>

                    {/* Start Invoice Table Design Here */}
                    <Box > 
                        <FirewallDataTable/>
                    </Box>
                    {/* Start Invoice Table Design Here */}

                    {/* Start Invoice Table Skeleton Here */}
                    {
                    //     !hideSkeletonTbl && <Box hidden>
                    //     <Box sx={{position: 'relative'}}>
                    //         <Typography component="p" variant="p" color={'#6b6f82'} align="left">
                    //             <Skeleton variant="text" animation="wave" width={200} height={25} />
                    //         </Typography>
                    //         <Box className={styles.SkeletonSearchContainer}>
                    //             <Skeleton variant="rounded" animation="wave" width={200} height={35} 
                    //             sx={{ mr:'15px', borderRadius: '20px' }} className={styles.SerachSkeleton} />
                    //             <Skeleton variant="circular" animation="wave" width={30} height={30} className={styles.SkeletonAddIcon} />
                    //         </Box>
                    //     </Box>
                    //     <Grid sx={{mt:'20px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={2}>
                    //         <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{paddingTop: '0!important'}}> 
                    //             <TableContainer component={Paper} variant="outlined">
                    //             <Table aria-label="simple table" sx={{ overflowX: 'scroll' }}>
                    //                 <TableHead sx={{ height: '55px'}}>
                    //                     <TableRow>
                    //                         <StyledTableCell></StyledTableCell>
                    //                         <StyledTableCell></StyledTableCell>
                    //                         <StyledTableCell></StyledTableCell>
                    //                         <StyledTableCell></StyledTableCell>
                    //                         <StyledTableCell></StyledTableCell>
                    //                     </TableRow>
                    //                 </TableHead>
                    //                 <TableBody>
                    //                 {Skeletonrows.map((row) => (
                    //                     <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    //                         <TableCell scope="row" sx={{ p: '20px'}}>
                    //                             <Skeleton variant="rounded" animation="wave" width={'100%'} height={15} /> 
                    //                         </TableCell>
                    //                         <TableCell sx={{ p: '20px'}}>
                    //                             <Skeleton variant="rounded" animation="wave" width={'100%'} height={15} />
                    //                         </TableCell>
                    //                         <TableCell sx={{ p: '20px'}}>
                    //                             <Skeleton variant="rounded" animation="wave" width={'100%'} height={15} />
                    //                         </TableCell>
                    //                         <TableCell sx={{ p: '20px'}}>
                    //                             <Skeleton variant="rounded" animation="wave" width={'100%'} height={15} />
                    //                         </TableCell>
                    //                         <TableCell align='center' sx={{ p: '20px'}}>
                    //                             <Skeleton variant="rounded" animation="wave" width={'100%'} height={15} />
                    //                         </TableCell>
                    //                     </TableRow>
                    //                 ))}
                    //                 </TableBody>
                    //             </Table>
                    //             </TableContainer>
                    //         </Grid>
                    //     </Grid>
                    // </Box>
                    }
                    
                    {/* End Invoice Table Skeleton Here */}

                </CardContent>
            </Card>

        </SurfaceLayout>
    );       

}

export default Firewall;