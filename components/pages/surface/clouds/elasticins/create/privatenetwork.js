
import * as React from 'react';
import { useState } from 'react';
import styles from '../../../../../../pages/surface/clouds/elasticins/create/index.module.css';
import { styled } from '@mui/material/styles';
import { Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';

import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import OutlinedInput from '@mui/material/OutlinedInput';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


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

  // Instance FormControl Custom Style
const InstanceFormControl = styled(FormControl)({
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

  // Modal Popup Style
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      // width: '600px',
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


// Select Field CheckBox Names
const names = [
  'Default',
  'Admin',
  'User',
];


const PrivateNetworks = ({  }) => {


    // ** Modal Popup Function
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // ** Popover Function
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const Popopen = Boolean(anchorEl);
  const id = Popopen ? 'simple-popover' : undefined;
   
  // Gateway CIDR Popover Function
  const [anchorGatewayEl, setAnchorGatewayEl] = React.useState(null);
  const GatehandleClick = (event) => {
    setAnchorGatewayEl(event.currentTarget);
  };
  const GatewayhandlePopoverClose = () => {
    setAnchorGatewayEl(null);
  };
  const GatewayPopopen = Boolean(anchorGatewayEl);

  // Static IP Pools Popover Function
  const [anchorIppoolsEl, setAnchorIppoolsEl] = React.useState(null);
  const IppoolshandleClick = (event) => {
    setAnchorIppoolsEl(event.currentTarget);
  };
  const IppoolshandlePopoverClose = () => {
    setAnchorIppoolsEl(null);
  };
  const IppoolsPopopen = Boolean(anchorIppoolsEl);


    // Select Field CheckBox Function
    const [personName, setPersonName] = React.useState([]);
    const handleSelectCheckChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    return (
        <>
        {/* Start Private Network Here */}
      <Card sx={{mt:2, borderRadius:'7px', position: 'relative', overflow: 'initial'}}>
        <CardContent sx={{ padding: '24px'}}>
          <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={4} lg={4} xl={4}>
              <Typography component="h4" variant="h5" align="left" fontSize={20} sx={{ position: 'relative' }}>Private Network 
              <AddCircleOutlinedIcon className={styles.AddNetworkIcon} onClick={handleClickOpen} /> </Typography>
              <InstanceFormControl margin="normal" fullWidth >
                <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} 
                  MenuProps={MenuProps}>
                  <MenuItem value="">Select Network</MenuItem>
                  <MenuItem value={1}>ECCADE-ORGROU-DFNW01</MenuItem>
                </Select>
              </InstanceFormControl>
              {/* Start Add Private Network Modal Popup Here */}
              <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <BootstrapDialogTitle id="customized-dialog-title" align='center' onClose={handleClose}>Add Network</BootstrapDialogTitle>
                <DialogContent dividers>
                  <Box component="form" autoComplete='off'>
                    <CssTextField margin="normal" autoFocus fullWidth id="name" label="Name" name="name" />
                    <CssTextField margin="normal" fullWidth id="description" label="Description" name="description" />
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <ModalFormControl margin="normal" fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Nationality</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Select Nationality" MenuProps={MenuProps} >
                          <MenuItem value={11}>Routed</MenuItem>
                          <MenuItem value={12}>Org Isolated</MenuItem>
                          <MenuItem value={13}>Team Isolated</MenuItem>
                        </Select>
                      </ModalFormControl>
                      <InfoOutlinedIcon sx={{ml: 1, my: 2.5}} className={styles.fieldInfoIcon} onClick={handleClick} />
                      <Popover id={id} open={Popopen} anchorEl={anchorEl} onClose={handlePopoverClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }} transformOrigin={{vertical: 'top',horizontal: 'right',}} >
                        <Box className={styles.PopoveBoxContainer}>
                          <Typography component="h4" variant="h5" align="left" fontSize={16} className={styles.PopoverHeader}>Routed</Typography>
                          <Typography component="p" variant="p" color={'#6b6f82'} fontSize={14} align="center" sx={{pt: 1}} className= 
                            {styles.PopoverContent}>
                            This type of network provides controlled access to machines and networks outside of the VDC through an edge gateway.
                          </Typography>
                          <Typography component="h4" variant="h5" align="left" fontSize={16} className={styles.PopoverHeader} sx={{mt: 
                             '0px!important'}}>Org Isolated</Typography>
                          <Typography component="p" variant="p" color={'#6b6f82'} fontSize={14} align="center" sx={{pt: 1}} className= 
                            {styles.PopoverContent}>
                            This type of network provides a fully isolated environment, which is accessible only by this organization VDC.
                          </Typography>
                          <Typography component="h4" variant="h5" align="left" fontSize={16} className={styles.PopoverHeader} sx={{mt: 
                             '0px!important'}}>Team Isolated</Typography>
                          <Typography component="p" variant="p" color={'#6b6f82'} fontSize={14} align="center" sx={{pt: 1}} className= 
                            {styles.PopoverContent}>
                            This type of network provides a completely isolated environment, which is accessible only by this Team.
                          </Typography>
                        </Box>
                      </Popover>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <CssTextField margin="normal" fullWidth id="gateway" label="Gateway CIDR" name="gateway" />
                      <InfoOutlinedIcon sx={{ml: 1, my: 2.5}} className={styles.fieldInfoIcon} onClick={GatehandleClick} />
                      <Popover id={id} open={GatewayPopopen} anchorEl={anchorGatewayEl} onClose={GatewayhandlePopoverClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }} transformOrigin={{vertical: 'top',horizontal: 'right',}} >
                        <Box className={styles.PopoveBoxContainer}>
                          <Typography component="h4" variant="h5" align="left" fontSize={16} className={styles.PopoverHeader}>Gateway 
                          CIDR</Typography>
                          <Typography component="p" variant="p" color={'#6b6f82'} fontSize={14} align="center" sx={{pt: 1}} className= 
                            {styles.PopoverContent}>
                            The CIDR includes the IP address of the gateway, e.g. 192.168.1.254/24 represents the gateway address 192.168.1.254 and 
                            its associated routing prefix 192.168.1.0, or equivalently, its subnet mask 255.255.255.0. The CIDR value cannot be 
                            changed once it is provided.
                          </Typography>
                        </Box>
                      </Popover>
                    </Box>
                    <Box className={styles.StaticIpContainer}>
                      <Typography component="h4" variant="h5" align="left" fontSize={16}>Static IP Pools <InfoOutlinedIcon sx={{ml: 1}} 
                      className={styles.StaticIpInfoIcon} onClick={IppoolshandleClick} /> <AddCircleOutlinedIcon className= 
                      {styles.StaticIpAddIcon} /></Typography>
                      <Popover id={id} open={IppoolsPopopen} anchorEl={anchorIppoolsEl} onClose={IppoolshandlePopoverClose}
                      anchorOrigin={{ vertical: 'top', horizontal: 'left', }} transformOrigin={{vertical: 'top',horizontal: 'left',}}>
                        <Box className={styles.PopoveBoxContainer}>
                          <Typography component="h4" variant="h5" align="left" fontSize={16} className={styles.PopoverHeader}>Static IP 
                          Range</Typography>
                          <Typography component="p" variant="p" color={'#6b6f82'} fontSize={14} align="center" sx={{pt: 1}} className= 
                          {styles.PopoverContent}>Enter an IP range (format: 192.168.1.2-192.168.1.100)</Typography>
                        </Box>
                      </Popover>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <CssTextField margin="normal" fullWidth id="iprange" name="iprange" placeholder='Enter an IP range (format: 192.168.1.2- 
                        192.168.1.100)' />
                        <RemoveCircleIcon sx={{ ml: 1, my: 2.5 }} className={styles.IpRangeClose} />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <CssTextField margin="normal" fullWidth id="iprange" name="iprange" placeholder='Enter an IP range (format: 192.168.1.2- 
                        192.168.1.100)' />
                        <RemoveCircleIcon sx={{ ml: 1, my: 2.5 }} className={styles.IpRangeClose} />
                      </Box>
                    </Box>
                    <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
                      <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={6} lg={6} xl={6}>
                        <CssTextField margin="normal" fullWidth id="primarydns" label="Primary DNS" name="primarydns" />
                      </Grid>
                      <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={6} lg={6} xl={6}>
                        <CssTextField margin="normal" fullWidth id="secondarydns" label="Secondary DNS" name="secondarydns" />
                      </Grid>
                    </Grid>
                    <CssTextField margin="normal" fullWidth id="dnssuffix" label="DNS Suffix" name="dnssuffix" />
                    <ModalFormControl margin="normal" fullWidth>
                      <InputLabel id="demo-multiple-checkbox-label">Select Team</InputLabel>
                      <Select labelId="demo-multiple-checkbox-label" id="demo-multiple-checkbox" multiple value={personName}
                        onChange={handleSelectCheckChange} input={<OutlinedInput label="Select Team" />} renderValue={(selected) => 
                        selected.join(', ')} MenuProps={MenuProps} >
                          {names.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox sx={{color: '#6b6f82', '&.Mui-checked': {color: '#6DCCDD',}, }} checked={personName.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                      </Select>
                    </ModalFormControl>    
                  </Box>
                </DialogContent>
                <DialogActions>
                  <ModalButton variant="contained" size="medium" sx={{ position: 'absolute', left: '45%' }}>ADD</ModalButton>
                  <Button onClick={handleClose} sx={{ color: '#6DCCDD'}}>Close</Button>
                </DialogActions>
              </BootstrapDialog>
              {/* END Add Private Network Modal Popup Here */}
            </Grid> 
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={4} lg={4} xl={4}>
              <Typography component="h4" variant="h5" align="left" fontSize={20}>IP Mode</Typography>
              <InstanceFormControl margin="normal" fullWidth >
                <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                  {MenuProps}>
                  <MenuItem value="">Select Mode</MenuItem>
                  <MenuItem value={1}>Static IP Pools</MenuItem>
                  <MenuItem value={2}>Static Manual</MenuItem>
                </Select>
              </InstanceFormControl>
            </Grid>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={4} lg={4} xl={4}>
              <Typography component="h4" variant="h5" align="left" fontSize={20}>IP Address</Typography>
              <CssTextField margin="normal" fullWidth id="address" name="address" placeholder='192.168.101.1' />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* END Private Network Here */}
      {/* Start Private Network Skeleton Here */}
      <Card sx={{mt:2, borderRadius:'7px', position: 'relative', overflow: 'initial'}} hidden>
        <CardContent sx={{ padding: '24px'}}>
          <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={4} lg={4} xl={4}>
              <Skeleton variant="text" width={'100%'} height={25} />
              <Skeleton variant="rounded" width={'100%'} height={58} sx={{mt:2}} />
            </Grid> 
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={4} lg={4} xl={4}>
              <Skeleton variant="text" width={'100%'} height={25} />
              <Skeleton variant="rounded" width={'100%'} height={58} sx={{mt:2}} />
            </Grid>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={4} lg={4} xl={4}>
              <Skeleton variant="text" width={'100%'} height={25} />
              <Skeleton variant="rounded" width={'100%'} height={58} sx={{mt:2}} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* END Private Network Skeleton Here */}
        </>
    );
};

export default PrivateNetworks;