import * as React from 'react';
import { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Carousel from 'better-react-carousel'
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';

import { useClientIP } from '../../../utils/context/ClientIPContext';

import styles from './Footer.module.css';


// Modal Popup Style
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width: 'auto',
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

// Carousel Styles 
const MyDot = ({ isActive }) => (
  <span
    style={{
      width: isActive ? '10px' : '6px',
      height: isActive ? '10px' : '6px',
      display: 'inline-block',
      background: '#015578',
      marginBottom: '15px',
      borderRadius: '30px',
    }}
  ></span>
)

function SurfaceFooter() {

  const { clientIP } = useClientIP();

  const preloadImages = (urls,cachData) => {
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
    console.log("entering")
    commonSelectData(cachData);
  };

 

  const router = useRouter();
  const [scachdata, setscachdata] = useState([]);
const cookies = Cookies.get('userData') 

useEffect(() => {
  
  
  const cachData = (cookies? JSON.parse(cookies) : false);
  console.log(cachData)
  if(cachData){
    const imageUrls = [
      '/images/pages/common/welcome/slide1.png',
      '/images/pages/common/welcome/slide2.png',
      '/images/pages/common/welcome/slide3.png',
    ];

    preloadImages(imageUrls,cachData);
    
  }
  
}, [cookies]);

const [welcomeCard,setWelcomeCard] = useState(false);
const cookieWelcome = Cookies.get('welcomeCard'); // Retrieve the cookie value inside the useEffect
useEffect(() => {
  

  if (cookieWelcome && cookieWelcome === "true") {
    handleClickOpen();
  }
}, [cookieWelcome,welcomeCard]); // Use an empty dependency array to ensure the useEffect runs only once


/*const [oneTimeShow, setoneTimeShow] = useState(false);
useEffect(() => {
  if(oneTimeShow){
    handleClickOpen()
  }
},[oneTimeShow])*/
const handleRoutePage = () => {
  Cookies.set("welcomeCard", "false");  
      setWelcomeCard(false); 

       //TR 01 get and set the role name from cookie
      const cachData = cookies ? JSON.parse(cookies) : true;
    // handleClose()
    if(cachData.role_name == 'operator') {
      router.replace(`/surface/clouds/elasticins/manage/list`);
    }
    else if(cachData.role_name == 'billing admin') {
      router.replace(`/surface/billing/currentusage`)
    }
    else {
      router.replace(`/surface/clouds/elasticins/create`)
    }
    setOpen(false);
}
const commonSelectData = async (tdata) => {


  const newData = {"tenantId": tdata.tenant_id, "userSerialId":tdata.user_serial_id,ipaddress: clientIP };
  const finalData = {data:newData,endPoint:"getCommonSelectInfo",  token:tdata.accessToken, ipaddress: clientIP }
  try {
    const { data } = await axios.post("/api/surface/clouds/elasticins/manage/detail", finalData); // call the new API route      
    console.log(data)
    if(data.data.length > 0){   
      Cookies.set("welcomeCard", "false");  
      setWelcomeCard(false); 
      //setoneTimeShow(false)
    }else{
      if(!Cookies.get('welcomeCard')){
        Cookies.set("welcomeCard", "true");  
      setWelcomeCard(true); 
      }
      
     // setoneTimeShow(true)
      
    }
  } catch (error) {      
   // toast.error('An error occurred');
  }


}

  /*useEffect(() => {
    handleClickOpen()
  }, []);*/
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    Cookies.set("welcomeCard", "false");  
    setOpen(false);
  };
  
    return (
      <>
       {/* Start Welcome Modal Design */}
       <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogContent>
          <Carousel containerStyle={{display:"grid"}} cols={1} rows={1} gap={15}  mobileBreakpoint={768} scrollSnap={true} showDots={true} 
          hideArrow={false} loop={true} dot={MyDot}>
            <Carousel.Item sx={{ overflow: 'auto'}}>
              <Box display={'flex'} justifyContent="center" alignItems='center'>
                <Box component="img" mt={1} mr={1} width={200} align="center" src="/images/pages/common/welcome/slide1.png" alt="welcome" />
              </Box>
              <Typography component="h4" variant="h5" align="center" alignItems='center' fontSize={26} sx={{mt: '16px', color: '#06597F'}}>
                Welcome to Detacloud
              </Typography>
              <Typography component="p" align="center" alignItems='center' fontSize={16} sx={{mt: '16px', color: '#6b6f82'}}>
                DETASAD (Detecon Al Saudia Co. Ltd.) has a consistent record of accomplishment as a key contributor to the development and evolution of 
                the ICT sector in the Kingdom of Saudi Arabia.
              </Typography>
            </Carousel.Item>
            <Carousel.Item sx={{ overflow: 'auto'}}>
              <Box display={'flex'} justifyContent="center" alignItems='center'>
                <Box component="img" mt={1} mr={1} width={200} align="center" src="/images/pages/common/welcome/slide2.png" alt="welcome" />
              </Box>
              <Typography component="h4" variant="h5" align="center" alignItems='center' fontSize={26} sx={{mt: '16px', color: '#06597F'}}>
                Secure Enterprise Cloud
              </Typography>
              <Typography component="p" align="center" alignItems='center' fontSize={16} sx={{mt: '16px', color: '#6b6f82'}}>
                Auto Scaling allows customer to scale the ECS capacity up or down automatically according to the defined conditions. You can build cloud 
                servers to meet your requirements from rich pre-configured instance types and resource flavors.
              </Typography>
            </Carousel.Item>
            <Carousel.Item sx={{ overflow: 'auto'}}>
              <Box display={'flex'} justifyContent="center" alignItems='center'>
                <Box component="img" mt={1} mr={1} width={200} align="center" src="/images/pages/common/welcome/slide3.png" alt="welcome" />
              </Box>
              <Typography component="h4" variant="h5" align="center" alignItems='center' fontSize={26} sx={{mt: '16px', color: '#06597F'}}>
                Showcase Cloud Features
              </Typography>
              <Grid container direction="row" rowSpacing={0} spacing={0}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton sx={{height: '35px'}}>
                        <ListItemIcon sx={{minWidth: '35px'}}>
                          <DoneOutlinedIcon className={styles.tickMarkIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Elastic Compute Server" sx={{fontSize: '14px'}} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton sx={{height: '35px'}}>
                        <ListItemIcon sx={{minWidth: '35px'}}>
                          <DoneOutlinedIcon className={styles.tickMarkIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Image Mgmt Service" sx={{fontSize: '14px'}} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton sx={{height: '35px'}}>
                        <ListItemIcon sx={{minWidth: '35px'}}>
                          <DoneOutlinedIcon className={styles.tickMarkIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Object Storage Service" sx={{fontSize: '14px'}} />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton sx={{height: '35px'}}>
                        <ListItemIcon sx={{minWidth: '35px'}}>
                          <DoneOutlinedIcon className={styles.tickMarkIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Auto-Scaling" sx={{fontSize: '14px'}} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton sx={{height: '35px'}}>
                        <ListItemIcon sx={{minWidth: '35px'}}>
                          <DoneOutlinedIcon className={styles.tickMarkIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Elastic Volume Service" sx={{fontSize: '14px'}} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton sx={{height: '35px'}}>
                        <ListItemIcon sx={{minWidth: '35px'}}>
                          <DoneOutlinedIcon className={styles.tickMarkIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Backup Service" sx={{fontSize: '14px'}} />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Button onClick={handleRoutePage} variant="contained" sx={{display: 'block', margin: '15px auto 0 auto', borderRadius: '20px', 
                  backgroundImage: 'linear-gradient(45deg, #0288d1, #26c6da) !important'}}>Get Started</Button>
                </Grid>
              </Grid>
            </Carousel.Item>
          </Carousel>
        </DialogContent>
      </BootstrapDialog>
      {/* End Welcome Modal Design */}
      </>
    );
  }
  
  export default SurfaceFooter;
  