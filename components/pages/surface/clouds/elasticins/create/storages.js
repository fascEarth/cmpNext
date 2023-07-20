import * as React from 'react';
import { useState } from 'react';
import styles from '../../../../../../pages/surface/clouds/elasticins/create/index.module.css';
import { styled } from '@mui/material/styles';
import { Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import MenuItem from '@mui/material/MenuItem';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

// ** Select Field Styles
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 205,
    },
  },
};

// ** Table CSS 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#e1f3f6',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }));

  // Choose an image FormControl Custom Style
const CssFormControl = styled(FormControl)({
    '& label.Mui-focused': {
      color: 'none',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'none',
    },
    '& .MuiOutlinedInput-root': {
      "& fieldset": {
        border: '0',
        borderRadius: "0",
      },
      '&:hover fieldset': {
        border:"0px solid",
        borderColor: 'none',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'none',
      },
    },
  });

  // ** Table Function
function createData(id, disk, type, size, cost, action) {
    return { id, disk, type, size, cost, action };
  }
  
  const rows = [
    createData(
      "0",
    <Box variant="text" align="left" className={styles.diskBox}><Box className={styles.tableScrollBox}>Boot Disk</Box></Box>, 
    <CssFormControl className={styles.diskSizeBox} size="small">
      <Select className={styles.tableScrollSelect} defaultValue="" id="grouped-select-0"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps={MenuProps}>
        <MenuItem value="">Select</MenuItem>
        <MenuItem value={1}>NVMe</MenuItem>
      </Select>
    </CssFormControl>, 
    <Box variant="text" align="center" className={styles.diskBox}><Box className={styles.tableScrollBox}><RemoveCircleIcon className={styles.DiskSizeMinus} /> 20 GB <AddCircleOutlinedIcon className={styles.DiskSizePlus} /> </Box></Box>, 
    <Box variant="text" align="left" className={styles.diskBox}><Box className={styles.tableScrollBox}>9.20</Box></Box>, 
    <Box sx={{marginTop: '10px',}}><RemoveCircleIcon sx={{ cursor: 'pointer', color: '#b0b0b0'}} /></Box>),
    
    createData(
      "1",
      <Box variant="text" align="left" className={styles.diskBox}>Boot Disk</Box>, 
      <CssFormControl className={styles.diskSizeBox} size="small">
        <Select defaultValue="" id="grouped-select-1"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps={MenuProps}>
          <MenuItem value="">Select</MenuItem>
          <MenuItem value={1}>NVMe</MenuItem>
        </Select>
      </CssFormControl>, 
      <Box variant="text" align="center" className={styles.diskBox}><RemoveCircleIcon className={styles.DiskSizeMinus} /> 20 GB 
       <AddCircleOutlinedIcon className={styles.DiskSizePlus} /></Box>, 
      <Box variant="text" align="left" className={styles.diskBox}>9.20</Box>, 
      <Box sx={{marginTop: '10px',}}><RemoveCircleIcon sx={{ cursor: 'pointer', color: '#b0b0b0'}} /></Box>),
  ];

const Storages = ({  }) => {

    return (
        <>
        {/* Start Add Storage Here */}
      <Card sx={{mt:2, borderRadius:'7px'}}>
        <CardHeader action={ <Box sx={{ display: 'flex', color: '#6DCCDD', cursor: 'pointer' }}><AddCircleOutlinedIcon sx={{ color: '#015578', mr: 
         '5px', mt: '3px', fontSize: '30px'}} /> <Typography sx={{ mt: '6px', mr: '15px' }}>Additional Disk</Typography> </Box> } title= 
        {<Typography component="h4" variant="h5" align="left" fontSize={20}>Add Storage</Typography>} />
        <CardContent sx={{ padding: '0 24px 24px 24px '}}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TableContainer component={Paper} variant="outlined">
              <Table aria-label="simple table" sx={{ overflowX: 'scroll' }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Disk</StyledTableCell>
                    <StyledTableCell>Type</StyledTableCell>
                    <StyledTableCell>Size</StyledTableCell>
                    <StyledTableCell>Cost (SAR)</StyledTableCell>
                    <StyledTableCell align='center'>Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell scope="row" sx={{ p: '5px'}}>{row.disk}</TableCell>
                      <TableCell sx={{ p: '5px'}}>{row.type}</TableCell>
                      <TableCell sx={{ p: '5px'}}>{row.size}</TableCell>
                      <TableCell sx={{ p: '5px'}}>{row.cost}</TableCell>
                      <TableCell align='center' sx={{ p: '5px'}}>{row.action}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </CardContent>
      </Card>
      {/* END Add Storage Here */}
      {/* Start Add Storage Skeleton Here */}
      <Card sx={{mt:2, borderRadius:'7px'}} hidden>
        <CardHeader action={ <Box sx={{ display: 'flex'}}>
          <Skeleton variant="circular" width={30} height={30} sx={{mr:1}} /> <Skeleton variant="text" width={150} height={25} /></Box> } title= 
          {<Skeleton variant="text" width={'20%'} height={25} /> } />
        <CardContent sx={{ padding: '0 24px 24px 24px '}}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TableContainer component={Paper} variant="outlined">
              <Table aria-label="simple table" sx={{ overflowX: 'scroll' }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell><Skeleton variant="text" width={'100%'} height={25} /></StyledTableCell>
                    <StyledTableCell><Skeleton variant="text" width={'100%'} height={25} /></StyledTableCell>
                    <StyledTableCell><Skeleton variant="text" width={'100%'} height={25} /></StyledTableCell>
                    <StyledTableCell><Skeleton variant="text" width={'100%'} height={25} /></StyledTableCell>
                    <StyledTableCell align='center'><Skeleton variant="text" width={'100%'} height={25} /></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell scope="row" sx={{ p: '5px'}}><Skeleton variant="text" width={'100%'} height={65} /></TableCell>
                      <TableCell sx={{ p: '5px'}}><Skeleton variant="text" width={'100%'} height={65} /></TableCell>
                      <TableCell sx={{ p: '5px'}}><Skeleton variant="text" width={'100%'} height={65} /></TableCell>
                      <TableCell sx={{ p: '5px'}}><Skeleton variant="text" width={'100%'} height={65} /></TableCell>
                      <TableCell align='center' sx={{ p: '5px'}}><Skeleton variant="circular" width={20} height={20} sx={{margin: '0 auto'}} /> 
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </CardContent>
      </Card>
      {/* END Add Storage Skeleton Here */}
        </>
    );
};

export default Storages;