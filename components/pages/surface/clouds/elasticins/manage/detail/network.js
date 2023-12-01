// ** React Imports
import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import Script from 'next/script';

import Link from 'next/link';

// ** MUI Components
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import NetworkDataTable from './collectTable';

// ** MUI ICON Components
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import CloseIcon from '@mui/icons-material/Close';

import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';
// ** Custom CSS 
import styles from './index.module.css';



// TextField Custom Style
const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#015578',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    "& fieldset": {
      borderRadius: "7px"
    },
    '&:hover fieldset': {
      border:"2px solid",
      borderColor: '#6DCCDD',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#015578',
    },
  },
});

// Breadcrumb Select FormControl Custom Style
const BreadcrumbFormControl = styled(FormControl)({
  '& label.Mui-focused': {
    color: '#2183AF',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    color: '#FFF',
    "& fieldset": {
      borderRadius: "7px"
    },
    '&:hover fieldset': {
      border:"2px solid",
      borderColor: '#2183AF',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2183AF',
    },
    '& .MuiSvgIcon-root': {
      color: '#FFF',
    },
  },
});

// FormControl Custom Style
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

// FormControl Custom Style
const ModalFormControl = styled(FormControl)({
  '& label.Mui-focused': {
    color: '#015578',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    "& fieldset": {
      borderRadius: "7px"
    },
    '&:hover fieldset': {
      border:"2px solid",
      borderColor: '#6DCCDD',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#015578',
    },
    // '& .MuiSvgIcon-root': {
    //   right: '45px',
    // },
  },
});

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

// Top Card Table
function createData(name, detail) {
  return { name, detail};
}
const rows = [
  createData('Created On', '08/10/2022, 04:36:17 PM'),
  createData('Created By', 'Senthilraj'),
  createData('Team', 'Default'),
  createData('OS', 'Ubuntu Linux (64-bit)'),
];

// ** Additional Storage Table CSS 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#e1f3f6',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

// ** Additional Storage Table Function
function createDiskData(id, disk, type, size, cost, action) {
  return { id, disk, type, size, cost, action };
}

const Diskrows = [
  createDiskData(
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
  
  createDiskData(
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

// Modal Popup Style
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width: '600px',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const ModalButton = styled(Button)(({ theme }) => ({
  color: '#FFF',
  backgroundImage: 'linear-gradient(45deg, #0288d1, #26c6da) !important',
  '&:hover': {
    backgroundImage: 'linear-gradient(45deg, #0288d1, #26c6da) !important',
  },
}));

function MinstanceDetailNetworks(sslugId) {

    const [scachdata, setscachdata] = useState([]);
const cookies = Cookies.get('userData') 

const slugId = sslugId.sslugId;

useEffect(() => {
  
  const cachData = (cookies? JSON.parse(cookies) : false);
  
  if(cachData &&  slugId){
    
    setscachdata(cachData);  
   // loadAllOverview(cachData);
  }
  
}, [cookies,slugId]);
   



  // ** OverAll Tab Function
  const [ManageDetailValue, setManageDetailValue] = useState('Overview')
  const handleManageDetailValue = (event, newManageDetailValue) => {
    setManageDetailValue(newManageDetailValue)
  }

  // ** VM Console Modal Popup Function
  const [vmopen, setvmOpen] = React.useState(false);
  const vmhandleClickOpen = () => {
    setvmOpen(true);
  };
  const vmhandleClose = () => {
    setvmOpen(false);
  };

  // ** Additional NIC Modal Popup Function
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
    <Box >
                <Box sx={{position: 'relative'}}>
                  <Chip icon={<ReportProblemOutlinedIcon color='error' />} label="Power off the VM instance before 
                  adding additional NICs" sx={{background: '#fff3e0', fontSize: '14px', color: '#ff9800', padding:'0 10px'}} />
                  <Box className={styles.StorageAddDisk} onClick={handleClickOpen} sx={{top: '-2px !important'}}>
                    <AddCircleOutlinedIcon className={styles.StorageAddIcon} /> 
                    <Typography sx={{ mt: '6px', mr:'15px', color: '#6DCCDD', fontWeight: '500' }}>Additional NIC</Typography>
                  </Box>
                </Box>
                {/* Start Here Additional NIC Modal  */}
                <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                  <BootstrapDialogTitle id="customized-dialog-title" align='center' onClose={handleClose}>Add NIC</BootstrapDialogTitle>
                  <DialogContent dividers>
                    <Box component="form" autoComplete='off'>
                      <Grid sx={{mt: '1px', mb: '15px'}} container direction="row" rowSpacing={2} spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{paddingTop: '0!important'}}>
                          <CssTextField margin="normal" autoFocus fullWidth id="name" label="Name" name="name" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <ModalFormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">IP Type</InputLabel>
                            <Select defaultValue="" id="grouped-select" label="IP Type" MenuProps={MenuProps}>
                              <MenuItem value="" disabled>Choose your option</MenuItem>
                              <MenuItem value={1}>IPv4</MenuItem>
                            </Select>
                          </ModalFormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <FormControlLabel sx={{color: '#6b6f82' }} control={<Checkbox value="Primary" sx={{color: "#6b6f82",'&.Mui-checked': 
                          {color: '#015578',},}} />} label="Primary NIC" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <FormControlLabel sx={{color: '#6b6f82' }} control={<Checkbox value="Connected" sx={{color: "#6b6f82",'&.Mui-checked': 
                          {color: '#015578',},}} />} label="Connected" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <ModalFormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Network</InputLabel>
                            <Select defaultValue="" id="grouped-select" label="Network" MenuProps={MenuProps}>
                              <MenuItem value="" disabled>Choose your option</MenuItem>
                              <MenuItem value={1}>ECCADE-ORGROU-DFNW01</MenuItem>
                              <MenuItem value={2}>Iprotecs</MenuItem>
                            </Select>
                          </ModalFormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <ModalFormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">IP Mode</InputLabel>
                            <Select defaultValue="" id="grouped-select" label="IP Mode" MenuProps={MenuProps}>
                              <MenuItem value="" disabled>Choose your option</MenuItem>
                              <MenuItem value={1}>Static IP Pools</MenuItem>
                              <MenuItem value={2}>Static Manual</MenuItem>
                            </Select>
                          </ModalFormControl>
                        </Grid>
                      </Grid>
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <ModalButton variant="contained" size="medium" sx={{ position: 'absolute', left: '45%' }}>ADD</ModalButton>
                    <Button onClick={handleClose} sx={{ color: '#6DCCDD'}}>Close</Button>
                  </DialogActions>
                </BootstrapDialog>
                {/* End Here Additional NIC Modal  */}
                <Grid sx={{mt:'20px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{paddingTop: '0!important'}}> 
                    <NetworkDataTable slugId={slugId} />
                  </Grid>
                </Grid>
              </Box>
              {/* Start Network Skeleton Here */}
              <Box hidden>
                <Box sx={{position: 'relative'}}>
                  <Skeleton variant="rounded" animation="wave" width={'40%'} height={35} sx={{borderRadius: '20px'}} />
                  <Box className={styles.StorageAddDisk} onClick={handleClickOpen}>
                    <Skeleton variant="circular" animation="wave" width={30} height={30} className={styles.StorageAddIcon} />
                    <Skeleton variant="text" animation="wave" width={150} height={25} sx={{ mt: '6px', mr:'15px' }} />
                  </Box>
                </Box>
                <Grid sx={{mt:'20px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{paddingTop: '0!important'}}> 
                    <TableContainer component={Paper} variant="outlined">
                      <Table aria-label="simple table" sx={{ overflowX: 'scroll' }}>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell><Skeleton variant="text" animation="wave" width={80} height={25} /></StyledTableCell>
                            <StyledTableCell><Skeleton variant="text" animation="wave" width={80} height={25} /></StyledTableCell>
                            <StyledTableCell><Skeleton variant="text" animation="wave" width={80} height={25} /></StyledTableCell>
                            <StyledTableCell><Skeleton variant="text" animation="wave" width={80} height={25} /></StyledTableCell>
                            <StyledTableCell><Skeleton variant="text" animation="wave" width={80} height={25} sx={{margin: '0 auto'}} /> 
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Diskrows.map((row) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                              <TableCell scope="row" sx={{ p: '10px 16px'}}><Skeleton variant="text" animation="wave" width={80} height={25} /> 
                              </TableCell>
                              <TableCell sx={{ p: '10px 16px'}}><Skeleton variant="text" animation="wave" width={80} height={25} /></TableCell>
                              <TableCell sx={{ p: '10px 16px'}}><Skeleton variant="text" animation="wave" width={80} height={25} /></TableCell>
                              <TableCell sx={{ p: '10px 16px'}}><Skeleton variant="text" animation="wave" width={80} height={25} /></TableCell>
                              <TableCell align='center' sx={{ p: '10px 16px'}}><Skeleton variant="circular" animation="wave" width={30} height={30} 
                              sx={{margin: '0 auto'}} /></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Box>
              {/* Start Network Skeleton Here */}
    </>
  );
};



export default MinstanceDetailNetworks;
