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

// ** MUI ICON Components
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import InfoIcon from '@mui/icons-material/Info';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CloseIcon from '@mui/icons-material/Close';

// ** Owl Carousel Components 
import Carousel from 'better-react-carousel'

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

// Instance FormControl Custom Style
const PasswordFormControl = styled(FormControl)({
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

// ** Switch Function
const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#6DCCDD',
    '&:hover': {
      backgroundColor: 'rgb(109, 204, 221, 0.08)',
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#6DCCDD',
  },
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

// Select Field CheckBox Names
const names = [
  'Default',
  'Admin',
  'User',
];

// Carousel Styles 
const MyDot = ({ isActive }) => (
  <span
    style={{
      width: isActive ? '10px' : '6px',
      height: isActive ? '10px' : '6px',
      display: 'inline-block',
      background: '#015578',
      marginTop: '25px',
      borderRadius: '30px',
    }}
  ></span>
)

function Cintstance() {

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

  
  // ** Type of Cloud Server Tab Function
  const [value, setValue] = useState('1')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  // ** Profile Tab Function
  const [Profilevalue, setProfileValue] = useState('General')
  const handleProfileChange = (event, newProfileValue) => {
    setProfileValue(newProfileValue)
  }
  // ** Choose an image Tab Function
  const [ChooseImgvalue, setChooseImgValue] = useState('Operating')
  const handleChooseImgChange = (event, newChooseImgValue) => {
    setChooseImgValue(newChooseImgValue)
  }
  // ** Authentication Tab Function
  const [Authvalue, setAuthValue] = useState('Password')
  const handleAuthChange = (event, newAuthValue) => {
    setAuthValue(newAuthValue)
  }

  //Password Show
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    <SurfaceLayout currentPage={1} setBackgrd={true} >
      
      {/* Start Breadcrumbs Here */}
      <Breadcrumbs aria-label="breadcrumb">
        <Typography component="h4" variant="h5" align="left" color="#fff" fontSize={20}>Create Elastic Instance</Typography>
      </Breadcrumbs>
      {/* Start Platform Here */}
      <Card sx={{mt:2, borderRadius:'7px'}}>
        <CardContent sx={{ padding: '24px'}}>
          <Typography component="h4" variant="h5" align="left" fontSize={20}>Platform</Typography>
          <Typography component="p" variant="p" color={'#6b6f82'} align="left" sx={{pt: 1}}>Choose detacloud’s enterprise grade cloud platform. 
            </Typography>
          <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Card sx={{position:'relative', borderRadius:'7px', overflow: 'initial',}} className={styles.cardActive}>
                <CardContent sx={{ padding: '16px !important'}}>
                  <Box sx={{ display: 'flex', alignItems: 'center', }}>
                    <Avatar variant="square" sx={{ width: '100px', height: '75px' }} alt="VMwareCloud" 
                      src="/images/pages/surface/clouds/elasticins/create/VMwareCloud.png"></Avatar>
                    <Typography component="h4" variant="h5" align="left" fontSize={16} sx={{pl:3}}>Enterprise-Grade VMware Cloud</Typography>
                    <Box component="img" width={35} height={35} align="center" className={styles.cardActiveCheck} alt="ActiveCheck" 
                      src="/images/pages/surface/clouds/elasticins/create/ActiveCheck.png" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Card sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                <CardContent sx={{ padding: '16px !important'}}>
                  <Box sx={{ display: 'flex', alignItems: 'center', }}>
                    <Avatar variant="square" sx={{ width: '75px', height: '75px' }} alt="OpenstackCloud" 
                      src="/images/pages/surface/clouds/elasticins/create/OpenstackCloud.png"></Avatar>
                    <Typography component="h4" variant="h5" align="left" fontSize={16} sx={{pl:3}}>RHEV-Openstack Cloud</Typography>
                    <Typography component="span" align="right" fontSize={14} color={'red'} className={styles.commingSoon}>Coming 
                      Soon</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* Start Datacenter/Region Here */}
      <Card sx={{mt:2, borderRadius:'7px'}}>
        <CardContent sx={{ padding: '24px'}}>
          <Typography component="h4" variant="h5" align="left" fontSize={20}>Datacenter/Region</Typography>
          <Typography component="p" variant="p" color={'#6b6f82'} align="left" sx={{pt: 1}}>Decide the best region for your instance, check our 
            latency report to find suitable datacenter for your current region. 
            </Typography>
          <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Card sx={{position:'relative', borderRadius:'7px', overflow: 'initial',}} className={styles.cardActive}>
                <CardContent sx={{ padding: '16px !important'}}>
                  <Box sx={{ display: 'flex', alignItems: 'center', }}>
                    <Avatar variant="square" sx={{ width: '75px', height: '75px' }} alt="riyadh" 
                      src="/images/pages/surface/clouds/elasticins/create/riyadh.png"></Avatar>
                    <Typography component="h4" variant="h5" align="left" fontSize={16} sx={{pl:3}}>Riyadh</Typography>
                    <Box component="img" width={35} height={35} align="center" className={styles.cardActiveCheck} alt="ActiveCheck" 
                      src="/images/pages/surface/clouds/elasticins/create/ActiveCheck.png" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Card sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                <CardContent sx={{ padding: '16px !important'}}>
                  <Box sx={{ display: 'flex', alignItems: 'center', }}>
                    <Avatar variant="square" sx={{ width: '75px', height: '75px' }} alt="riyadh" 
                      src="/images/pages/surface/clouds/elasticins/create/riyadh.png"></Avatar>
                    <Typography component="h4" variant="h5" align="left" fontSize={16} sx={{pl:3}}>RHEV-Openstack Cloud</Typography>
                    <Typography component="span" align="right" fontSize={14} color={'red'} className={styles.commingSoon}>Coming 
                      Soon</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* Start Type of Cloud Server Here */}
      <Card sx={{mt:2, borderRadius:'7px'}}>
        <CardContent sx={{ padding: '24px' }}>
          <Typography component="h4" variant="h5" align="left" fontSize={20}>Type of Cloud Server</Typography>
          <Typography component="p" variant="p" color={'#6b6f82'} align="left" sx={{pt: 1}}>Dedicated CPU instances are best for production 
          workloads and high intensive workloads</Typography>
          <TabContext value={value} >
            <TabList onChange={handleChange} className={styles.tabContainer} aria-label='simple tabs example' TabIndicatorProps={{style: {
            backgroundColor: "#6DCCDD"} }} sx={{"& .MuiTab-root.Mui-selected": {color: '#015578', backgroundColor: '#e1f3f6'} }}>
              <Tab value='1' label='Shared Server' />
              <Tab value='2' label='Reserved Server' disabled />
              <Tab value='3' label='Private Server' disabled />
            </TabList>
            <TabPanel value='1' sx={{ padding: '24px 0px', mt: '35px' }} >
              <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                    <CardContent sx={{ padding: '24px' }}>
                      <Box component="img" align="center" alt="High Intensive" className={`${styles.CarouselImg} ${styles.CarouselImgMargin}`} 
                        src="/images/pages/surface/clouds/elasticins/create/CloudServer/highintensive.png" />
                      <Typography component="h4" variant="h5" align="center" fontSize={18} sx={{ mt: '25px'}}>High Intensive</Typography>
                      <Typography component="p" variant="p" color={'#6b6f82'} fontSize={14} align="center" sx={{pt: 1}}>All day high work- 
                       loads</Typography>
                      <Box color={'#6b6f82'} sx={{ mt: '55px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Starting from <Box color={'#000'} fontWeight={400} ml={1}>SR 399.00/mo</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard} ${styles.CardAnimation}`}>
                    <CardContent sx={{ padding: '24px' }}>
                      <Box component="img" align="center" alt="Intensive" className={`${styles.CarouselImg} ${styles.CarouselImgMargin}`} 
                        src="/images/pages/surface/clouds/elasticins/create/CloudServer/intensive.png" />
                      <Typography component="h4" variant="h5" align="center" fontSize={18} sx={{ mt: '25px'}}>Intensive</Typography>
                      <Typography component="p" variant="p" color={'#6b6f82'} fontSize={14} align="center" sx={{pt: 1}}>Production 
                       Workloads</Typography>
                      <Box color={'#6b6f82'} sx={{ mt: '55px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Starting from <Box color={'#000'} fontWeight={400} ml={1}>SR 299.00/mo</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard} ${styles.CardAnimation} 
                    ${styles.CarouselActiveSelect}`}>
                    <CardContent sx={{ padding: '24px' }}>
                      <Box component="img" width={35} height={35} align="center" className={styles.CarouselActiveCheck} alt="ActiveCheck" 
                      src="/images/pages/surface/clouds/elasticins/create/ActiveCheck.png" />
                      <Box component="img" align="center" alt="Moderate Intensive" className={`${styles.CarouselImg} ${styles.CarouselImgMargin}`} 
                        src="/images/pages/surface/clouds/elasticins/create/CloudServer/moderateintensive.png" />
                      <Typography component="h4" variant="h5" align="center" fontSize={18} sx={{ mt: '25px'}}>Moderate Intensive</Typography>
                      <Typography component="p" variant="p" color={'#6b6f82'} fontSize={14} align="center" sx={{pt: 1}}>Medium Duty 
                        Workloads</Typography>
                       <Box color={'#6b6f82'} sx={{ mt: '55px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Starting from <Box color={'#000'} fontWeight={400} ml={1}>SR 153.75/mo</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value='2'>
              <Typography>
                Chocolate bar carrot cake candy canes sesame snaps. Cupcake pie gummi bears jujubes candy canes. Chupa chups
                sesame snaps halvah.
              </Typography>
            </TabPanel>
            <TabPanel value='3'>
              <Typography>
                Danish tiramisu jujubes cupcake chocolate bar cake cheesecake chupa chups. Macaroon ice cream tootsie roll
                carrot cake gummi bears.
              </Typography>
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
      {/* Start Profile Here */}
      <Card sx={{mt:2, borderRadius:'7px'}}>
        <CardContent sx={{ padding: '24px'}}>
          <Typography component="h4" variant="h5" align="left" fontSize={20}>Profile</Typography>
          <Typography component="p" variant="p" color={'#6b6f82'} align="left" sx={{pt: 1}}>High performance virtual machines with a good balance 
            of memory and dedicated hyper-threads from best in class Intel processors.</Typography>
          <TabContext value={Profilevalue} >
            <TabList onChange={handleProfileChange} className={styles.tabContainer} aria-label='simple tabs example' TabIndicatorProps={{style: {
            backgroundColor: "#6DCCDD"} }} sx={{"& .MuiTab-root.Mui-selected": {color: '#015578', backgroundColor: '#e1f3f6'} }}>
              <Tab value='General' label='General Purpose' />
              <Tab value='CPU' label='CPU Optimized' disabled />
              <Tab value='Memory' label='Memory Optimized' disabled />
              <Tab value='Storage' label='Storage Optimized' disabled />
            </TabList>
            <TabPanel value='General' sx={{ padding: '24px 0px' }}>
              <Carousel containerStyle={{display:"grid"}} cols={5} rows={1} gap={15}  mobileBreakpoint={768} scrollSnap={true} showDots={true} 
                hideArrow={true} loop={true} dot={MyDot}>
                <Carousel.Item sx={{ overflow: 'auto'}}>
                  <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard} ${styles.cardActive}`}>
                    <CardHeader className={styles.ProfileCardHeader} title={ <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 
                      'center', fontSize: '20px', fontWeight: '450' }}> SAR 169.13 <Box sx={{ ml: '5px', mt: '5px', fontSize: '12px', fontWeight: 
                      '400'}}> /mo</Box> </Box> }  />
                    <CardContent sx={{ padding: '24px' }}>
                      <Box component="img" width={35} height={35} align="center" className={styles.cardActiveCheck} alt="ActiveCheck" 
                      src="/images/pages/surface/clouds/elasticins/create/ActiveCheck.png" />
                      <Box color={'#000'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      2 <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> vCPUs</Box>
                      </Box>
                      <Box color={'#000'} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      4GB <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> Memory</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Carousel.Item>
                <Carousel.Item sx={{ overflow: 'auto'}}>
                  <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                    <CardHeader className={styles.ProfileCardHeader} title={ <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 
                      'center', fontSize: '20px', fontWeight: '450' }}> SAR 169.13 <Box sx={{ ml: '5px', mt: '5px', fontSize: '12px', fontWeight: 
                      '400'}}> /mo</Box> </Box> }  />
                    <CardContent sx={{ padding: '24px' }}>
                      <Box color={'#000'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      2 <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> vCPUs</Box>
                      </Box>
                      <Box color={'#000'} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      4GB <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> Memory</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Carousel.Item>
                <Carousel.Item sx={{ overflow: 'auto'}}>
                  <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                    <CardHeader className={styles.ProfileCardHeader} title={ <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 
                      'center', fontSize: '20px', fontWeight: '450' }}> SAR 169.13 <Box sx={{ ml: '5px', mt: '5px', fontSize: '12px', fontWeight: 
                      '400'}}> /mo</Box> </Box> }  />
                    <CardContent sx={{ padding: '24px' }}>
                      <Box color={'#000'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      2 <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> vCPUs</Box>
                      </Box>
                      <Box color={'#000'} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      4GB <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> Memory</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Carousel.Item>
                <Carousel.Item sx={{ overflow: 'auto'}}>
                  <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                    <CardHeader className={styles.ProfileCardHeader} title={ <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 
                      'center', fontSize: '20px', fontWeight: '450' }}> SAR 169.13 <Box sx={{ ml: '5px', mt: '5px', fontSize: '12px', fontWeight: 
                      '400'}}> /mo</Box> </Box> }  />
                    <CardContent sx={{ padding: '24px' }}>
                      <Box color={'#000'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      2 <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> vCPUs</Box>
                      </Box>
                      <Box color={'#000'} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      4GB <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> Memory</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Carousel.Item>
                <Carousel.Item sx={{ overflow: 'auto'}}>
                  <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                    <CardHeader className={styles.ProfileCardHeader} title={ <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 
                      'center', fontSize: '20px', fontWeight: '450' }}> SAR 169.13 <Box sx={{ ml: '5px', mt: '5px', fontSize: '12px', fontWeight: 
                      '400'}}> /mo</Box> </Box> }  />
                    <CardContent sx={{ padding: '24px' }}>
                      <Box color={'#000'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      2 <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> vCPUs</Box>
                      </Box>
                      <Box color={'#000'} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      4GB <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> Memory</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Carousel.Item>
                <Carousel.Item sx={{ overflow: 'auto'}}>
                  <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                    <CardHeader className={styles.ProfileCardHeader} title={ <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 
                      'center', fontSize: '20px', fontWeight: '450' }}> SAR 169.13 <Box sx={{ ml: '5px', mt: '5px', fontSize: '12px', fontWeight: 
                      '400'}}> /mo</Box> </Box> }  />
                    <CardContent sx={{ padding: '24px' }}>
                      <Box color={'#000'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      2 <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> vCPUs</Box>
                      </Box>
                      <Box color={'#000'} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      4GB <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> Memory</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Carousel.Item>
              </Carousel>
            </TabPanel>
            <TabPanel value='CPU'>
              <Typography>CPU</Typography>
            </TabPanel>
            <TabPanel value='Memory'>
              <Typography>Storage</Typography>
            </TabPanel>
            <TabPanel value='Storage'>
              <Typography>Storage</Typography>
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
      {/* Start Choose an image Here */}
      <Card sx={{mt:2, borderRadius:'7px'}}>
        <CardContent sx={{ padding: '24px'}}>
          <Typography component="h4" variant="h5" align="left" fontSize={20}>Choose an image</Typography>
          <TabContext value={ChooseImgvalue} >
            <TabList onChange={handleChooseImgChange} className={styles.tabContainer} aria-label='simple tabs example' TabIndicatorProps={{style: {
            backgroundColor: "#6DCCDD"} }} sx={{"& .MuiTab-root.Mui-selected": {color: '#015578', backgroundColor: '#e1f3f6'} }}>
              <Tab value='Operating' label='Operating System' />
              <Tab value='Market' label='Market Place' disabled />
              <Tab value='Custom' label='Custom Images' disabled />
            </TabList>
            <TabPanel value='Operating'>
              <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}} className={styles.cardActive}>
                    <CardContent sx={{ padding: '16px !important', textAlign: 'center'}}>
                      <Box component="img" width={50} height={50} align="center" alt="ubundu" 
                      src="/images/pages/surface/clouds/elasticins/create/chooseImages/ubundu.png" />
                      <Typography component="h6" variant="h6" align="center" fontSize={16} pt={1}>Ubuntu</Typography>
                      <Box component="img" width={35} height={35} align="center" className={styles.cardActiveCheck} alt="ActiveCheck" 
                      src="/images/pages/surface/clouds/elasticins/create/ActiveCheck.png" />
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <CssFormControl fullWidth size="small">
                        <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                          {MenuProps}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value={1}>22.04 (LTS) x64</MenuItem>
                          <MenuItem value={2}>20.04 (LTS) x64</MenuItem>
                        </Select>
                      </CssFormControl>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}} >
                    <CardContent sx={{ padding: '16px !important', textAlign: 'center'}}>
                      <Box component="img" width={50} height={50} align="center" alt="Centos" 
                      src="/images/pages/surface/clouds/elasticins/create/chooseImages/centos.png" />
                      <Typography component="h6" variant="h6" align="center" fontSize={16} pt={1}>Centos</Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <CssFormControl fullWidth size="small">
                        <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                          {MenuProps}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value={1}>22.04 (LTS) x64</MenuItem>
                          <MenuItem value={2}>20.04 (LTS) x64</MenuItem>
                        </Select>
                      </CssFormControl>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                    <CardContent sx={{ padding: '16px !important', textAlign: 'center'}}>
                      <Box component="img" width={50} height={50} align="center" alt="Fedora" 
                      src="/images/pages/surface/clouds/elasticins/create/chooseImages/fedora.png" />
                      <Typography component="h6" variant="h6" align="center" fontSize={16} pt={1}>Fedora</Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <CssFormControl fullWidth size="small">
                        <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                         {MenuProps}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value={1}>22.04 (LTS) x64</MenuItem>
                          <MenuItem value={2}>20.04 (LTS) x64</MenuItem>
                        </Select>
                      </CssFormControl>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                    <CardContent sx={{ padding: '16px !important', textAlign: 'center'}}>
                      <Box component="img" width={50} height={50} align="center" alt="RockyLinux" 
                      src="/images/pages/surface/clouds/elasticins/create/chooseImages/rockyLinux.png" />
                      <Typography component="h6" variant="h6" align="center" fontSize={16} pt={1}>RockyLinux</Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <CssFormControl fullWidth size="small">
                        <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                          {MenuProps}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value={1}>22.04 (LTS) x64</MenuItem>
                          <MenuItem value={2}>20.04 (LTS) x64</MenuItem>
                        </Select>
                      </CssFormControl>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                    <CardContent sx={{ padding: '16px !important', textAlign: 'center'}}>
                      <Box component="img" width={50} height={50} align="center" alt="Debian" 
                      src="/images/pages/surface/clouds/elasticins/create/chooseImages/debian.png" />
                      <Typography component="h6" variant="h6" align="center" fontSize={16} pt={1}>Debian</Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <CssFormControl fullWidth size="small">
                        <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                          {MenuProps}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value={1}>22.04 (LTS) x64</MenuItem>
                          <MenuItem value={2}>20.04 (LTS) x64</MenuItem>
                        </Select>
                      </CssFormControl>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                    <CardContent sx={{ padding: '16px !important', textAlign: 'center'}}>
                      <Box component="img" width={50} height={50} align="center" alt="AlmaLinux" 
                      src="/images/pages/surface/clouds/elasticins/create/chooseImages/almaLinux.png" />
                      <Typography component="h6" variant="h6" align="center" fontSize={16} pt={1}>AlmaLinux</Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <CssFormControl fullWidth size="small">
                        <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                          {MenuProps}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value={1}>22.04 (LTS) x64</MenuItem>
                          <MenuItem value={2}>20.04 (LTS) x64</MenuItem>
                        </Select>
                      </CssFormControl>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                    <CardContent sx={{ padding: '16px !important', textAlign: 'center'}}>
                      <Box component="img" width={50} height={50} align="center" alt="ArchLinux" 
                      src="/images/pages/surface/clouds/elasticins/create/chooseImages/archLinux.png" />
                      <Typography component="h6" variant="h6" align="center" fontSize={16} pt={1}>ArchLinux</Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <CssFormControl fullWidth size="small">
                        <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                          {MenuProps}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value={1}>22.04 (LTS) x64</MenuItem>
                          <MenuItem value={2}>20.04 (LTS) x64</MenuItem>
                        </Select>
                      </CssFormControl>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                    <CardContent sx={{ padding: '16px !important', textAlign: 'center'}}>
                      <Box component="img" width={50} height={50} align="center" alt="Rancher" 
                      src="/images/pages/surface/clouds/elasticins/create/chooseImages/rancher.png" />
                      <Typography component="h6" variant="h6" align="center" fontSize={16} pt={1}>Rancher</Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <CssFormControl fullWidth size="small">
                        <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                          {MenuProps}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value={1}>22.04 (LTS) x64</MenuItem>
                          <MenuItem value={2}>20.04 (LTS) x64</MenuItem>
                        </Select>
                      </CssFormControl>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                    <CardContent sx={{ padding: '16px !important', textAlign: 'center'}}>
                      <Box component="img" width={50} height={50} align="center" alt="MS Windows" 
                      src="/images/pages/surface/clouds/elasticins/create/chooseImages/mswindows.png" />
                      <Typography component="h6" variant="h6" align="center" fontSize={16} pt={1}>MS Windows</Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <CssFormControl fullWidth size="small">
                        <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                          {MenuProps}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value={1}>22.04 (LTS) x64</MenuItem>
                          <MenuItem value={2}>20.04 (LTS) x64</MenuItem>
                        </Select>
                      </CssFormControl>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value='Market'>
              <Typography>Market Place</Typography>
            </TabPanel>
            <TabPanel value='Custom'>
              <Typography>Custom Images</Typography>
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
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
      {/* Start Instance Here */}
      <Card sx={{mt:2, borderRadius:'7px', position: 'relative', overflow: 'initial'}}>
        <CardContent sx={{ padding: '24px'}}>
          <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={4} lg={4} xl={4}>
              <Typography component="h4" variant="h5" align="left" fontSize={20}>Instance Label / Hostname</Typography>
              <Box className={styles.InstanceInfoIcon}>
                <InfoIcon sx={{ width: '30px', height: '30px' }} ></InfoIcon>
                <Card sx={{mt:2, borderRadius:'7px', overflow: 'initial'}} className={styles.InstanceInfoDetail}>
                  <CardContent sx={{ padding: '24px'}}>
                    <Typography component="p" variant="p" align="left" fontSize={16}>Hostname must contain only alphanumeric characters and 
                    hyphens.</Typography>
                    <Typography component="p" variant="p" align="left" pt={1} fontSize={16}>Length can be 3 to 15 characters long.</Typography>
                  </CardContent>
                </Card>
              </Box>
              <CssTextField margin="normal" fullWidth value='Ubuntu-338556' id="instance" name="instance" />
            </Grid>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={4} lg={4} xl={4}>
              <Typography component="h4" variant="h5" align="left" fontSize={20}>Team</Typography>
              <InstanceFormControl margin="normal" fullWidth >
                <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                  {MenuProps}>
                  <MenuItem value="">Select Team</MenuItem>
                  <MenuItem value={1}>Default</MenuItem>
                  <MenuItem value={2}>Admin</MenuItem>
                </Select>
              </InstanceFormControl>
            </Grid>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={4} lg={4} xl={4}>
              <Typography component="h4" variant="h5" align="left" fontSize={20}>Tags</Typography>
              <InstanceFormControl margin="normal" fullWidth >
                <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                  {MenuProps}>
                  <MenuItem value="">Select Tags</MenuItem>
                  <MenuItem value={1}>Default</MenuItem>
                  <MenuItem value={2}>Network</MenuItem>
                </Select>
              </InstanceFormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
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
      {/* Start Network Bandwidth Speed Here */}
      <Card sx={{mt:2, borderRadius:'7px', position: 'relative', overflow: 'initial'}}>
        <CardContent sx={{ padding: '24px'}}>
          <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={9} lg={7} xl={7}>
              <Typography component="h4" variant="h5" align="left" fontSize={20}>Network</Typography>
              <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className={styles.IpRequired}>Public / Elastic IP Required</Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Box align="center" alignItems={'center'} mt={'13px'}>No <PinkSwitch {...label} defaultChecked color="secondary" /> Yes</Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Box align="center" className={styles.IpRequired}>110.73</Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={3} lg={5} xl={5}>
              <Typography component="h4" variant="h5" align="left" fontSize={20}>Bandwidth Speed</Typography>
              <CssTextField margin="normal" fullWidth value='2 Mbps' id="bandwidth" name="bandwidth" aria-readonly />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* Start Authentication Here */}
      <Card sx={{mt:2, borderRadius:'7px',}}>
        <CardContent sx={{ padding: '24px'}}>
          <Typography component="h4" variant="h5" align="left" fontSize={20}>Authentication</Typography>
          <TabContext value={Authvalue} >
            <TabList onChange={handleAuthChange} className={styles.tabContainer} aria-label='simple tabs example' TabIndicatorProps={{style: {
            backgroundColor: "#6DCCDD"} }} sx={{"& .MuiTab-root.Mui-selected": {color: '#015578', backgroundColor: '#e1f3f6'} }}>
              <Tab value='Password' label='Password' />
              <Tab value='SSH' label='SSH Key' disabled />
            </TabList>
            <TabPanel value='Password'>
              <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
                <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={6} lg={6} xl={6}>
                  <PasswordFormControl margin="normal" fullWidth variant="outlined" sx={{mt: '45px'}}>
                    <InputLabel htmlFor="outlined-adornment-password">Create Root Password </InputLabel>
                    <OutlinedInput id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown= 
                           {handleMouseDownPassword} edge="end" > {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Create Root Password"
                    />
                  </PasswordFormControl>
                </Grid>
                <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box sx={{ display: 'flex'}}>
                    <InfoIcon sx={{ fontSize: '35px', color: '#015578', mt: '55px'}} />
                    <List>
                      <Typography component="h6" variant="h5" align="left" fontSize={14} sx={{paddingLeft: '18px', color: '#000', 
                      fontWeight: '400'}}>PASSWORD REQUIREMENTS</Typography>
                      <ListItem sx={{color: '#6b6f82', fontSize: '10px!important', pt: 0, pb: 0}}>
                        <ListItemText><FiberManualRecordIcon sx={{ fontSize: '10px'}} /> Must be at least 8 characters long</ListItemText>
                      </ListItem>
                      <ListItem sx={{color: '#6b6f82', fontSize: '10px!important', pt: 0, pb: 0}}>
                        <ListItemText><FiberManualRecordIcon sx={{ fontSize: '10px'}} /> Must contain 1 uppercase letter</ListItemText>
                      </ListItem>
                      <ListItem sx={{color: '#6b6f82', fontSize: '10px!important', pt: 0, pb: 0}}>
                        <ListItemText><FiberManualRecordIcon sx={{ fontSize: '10px'}} /> Must contain 1 number</ListItemText>
                      </ListItem>
                      <ListItem sx={{color: '#6b6f82', fontSize: '10px!important', pt: 0, pb: 0}}>
                        <ListItemText><FiberManualRecordIcon sx={{ fontSize: '10px'}} /> Must contain 1 special character</ListItemText>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value='SSH'>
              <Typography>SSH</Typography>
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
      {/* Start Fixed Footer Here */}
      <Box className={styles.Footer}>
        <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Grid container direction="row" rowSpacing={1} spacing={0}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <Typography component="h4" variant="h5" align="center" alignItems={'center'} fontSize={20} color={'#fff'} 
                sx={{mt: '20px'}}>Summary</Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                <Typography component="p" variant="p" color={'#6DCCDD'} fontSize={14} align="left" sx={{pt: 1, pb:2}}>Operating System</Typography>
                <Typography component="h4" variant="h5" align="left" alignItems={'left'} fontSize={16} color={'#fff'} className={styles.textnowrap} 
                title={'Ubuntu 22.04 (LTS) x64'}>Ubuntu 22.04 (LTS) x64</Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                <Typography component="p" variant="p" color={'#6DCCDD'} fontSize={14} align="left" sx={{pt: 1, pb:2, pl: 2}}>Location</Typography>
                <Box sx={{display: 'flex', pl: 2}}>
                  <Box component="img" width={20} height={20} mr={1} align="center" alt="ubundu" 
                    src="/images/pages/surface/clouds/elasticins/create/riyadh.png" />
                  <Typography component="h4" variant="h5" align="left" alignItems={'left'} fontSize={16} color={'#fff'} 
                  className={styles.textnowrap}>Riyadh</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Grid container direction="row" rowSpacing={1} spacing={0}>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={4} align="center" alignItems={'center'}>
                <Typography component="p" variant="p" color={'#6DCCDD'} fontSize={14} align="left" sx={{pt: 1, pb: 2}}>Specification</Typography>
                <Typography component="h4" variant="h5" align="left" alignItems={'left'} fontSize={16} color={'#fff'} 
                className={styles.textnowrap}>2vCPU/4GB/20G</Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={4} align="center" alignItems={'center'}>
                <Typography component="p" variant="p" color={'#6DCCDD'} fontSize={14} align="left" sx={{pt: 1, pb:2}}>Estimated Cost</Typography>
                <Typography component="h4" variant="h5" align="left" alignItems={'left'} fontSize={16} color={'#fff'} sx={{display: 'flex'}}
                className={styles.textnowrap}><Box sx={{fontSize: '10px', pr:1, marginTop: '7px'}}>SAR</Box> 178.33 <Box sx={{fontSize: '10px', 
                pl:1, marginTop: '7px'}}>/Month</Box> 
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} align="center" alignItems={'center'}>
                <Button size="md" variant="solid" sx={{ color:'#fff', backgroundImage: 'linear-gradient(45deg, #0288d1, #26c6da) !important', 
                mt: 2, }}>Deploy</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

    </SurfaceLayout>
  );
};

export default Cintstance;
