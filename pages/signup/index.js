// ** React Imports
import { useState } from 'react';
import Cards from 'react-credit-cards-2';

import Cookies from 'js-cookie';
import { useAuth } from '../../utils/context/authContext';

// ** Next Import

// ** MUI Components
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tab from '@mui/material/Tab';
import Modal from '@mui/material/Modal';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { MuiFileInput } from 'mui-file-input';

// ** Accordion Imports
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

// ** Date Pickers Imports
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// ** Icons Imports
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import InfoIcon from '@mui/icons-material/Info';
import BlurCircularOutlinedIcon from '@mui/icons-material/BlurCircularOutlined';
import DetailsOutlinedIcon from '@mui/icons-material/DetailsOutlined';
import FilterCenterFocusOutlinedIcon from '@mui/icons-material/FilterCenterFocusOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LockIcon from '@mui/icons-material/Lock';

// ** Custom Style Imports
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import styles from './index.module.css';
import StepperCustomDot from './steppercustom.js'
import StepperWrapper from './steppertheme.js';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext  from '@mui/lab/TabContext';



// ** Header Menu Styles
const StyledMenu = styled((props) => (
  <Menu elevation={0} anchorOrigin={{ 
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 7,
    marginTop: theme.spacing(1),
    minWidth: 130,
    color: '#000',
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 10px 15px -3px, rgba(0, 0, 0, 0.02) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '10px 0',
    },
  },
  '& .MuiMenuItem-root': {
    '& .MuiSvgIcon-root': {
      fontSize: 22,
      color: '#757575',
      marginRight: theme.spacing(1.5),
    },
  },
}));

// ** Select Field Styles
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

// FormControl Custom Style
const CssFormControl = styled(FormControl)({
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

// Modal Style 
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  bgcolor: '#fafafa',
  border: '0px solid #000',
  borderRadius: '7px',
  boxShadow: 24,
  p: 4,
};

// Accordion Style
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: '#fff',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  backgroundColor: '#fafafa',
}));

//** Steeper 
const steps = [
  {
    title: 'Account Creation',
  },
  {
    title: 'Contact Validation',
  },
  {
    title: 'Personal / Org Information',
  },
  {
    title: 'Payment Methods'
  },
  {
    title: 'Submit'
  }
]

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Signup() {
  
  // START Header Account Dropdown function
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { logout } = useAuth();
  const logoutSurHead =() => {
    
    
    logout();
    
  }


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <StyledMenu sx={{top:'52px'}} anchorEl={anchorEl} anchorOrigin={{vertical: 'top', horizontal: 'right',}}
      id={menuId} keepMounted transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen} onClose={handleMenuClose} >
      <MenuItem onClick={handleMenuClose} sx={{color:'#757575'}}><Person2OutlinedIcon /> Profile</MenuItem>
      <MenuItem onClick={logoutSurHead} sx={{color:'#757575'}}><LogoutOutlinedIcon />  Logout</MenuItem>
    </StyledMenu>
  );
  // END Header Account Dropdown function

  // OTP Function
  const [otp, setOtp] = useState('')
  const handleOtpChange = (newValue) => {
    setOtp(newValue)
  } 
  const [otpmobile, setmobileOtp] = useState('')
  const handleOtpmobileChange = (newValue) => {
    setmobileOtp(newValue)
  }

  // File Upload Function
  const [file, setFile] = useState(null)
  const handleFileChange = (newFile) => {
    setFile(newFile)
  }

  // Tab Function
  const [value, setValue] = useState('personalInfo');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Accordion Function
  const [expanded, setExpanded] = useState(false);
  const handleAccChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Modal Function
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Credit Cards
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }


  // Select Function
  const [age, setAge] = useState('');
  const handleChangeSelect = (event) => {
    setAge(event.target.value);
  };

  // Stepper Function
  // ** States
  const [activeStep, setActiveStep] = useState(0)

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }


  


  const  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Container maxWidth="xl" component="main">
            <Card variant="outlined" sx={{mb:3, borderRadius:'7px'}}>
              <CardContent>
                <Typography component="h4" variant="h4">Account Creation</Typography>
                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', mt:3, }}>
                  <Button size='large' variant='contained' className={styles.stepperBtn} onClick={handleBack} disabled>Back</Button>
                  <Button size='large' variant='contained' className={styles.stepperBtn} type='submit' onClick={onSubmit}>Next</Button>
                </Grid>
              </CardContent>
            </Card>
          </Container>
        )
      case 1:
        return (
          
          <Container maxWidth="xl" component="main">
            <Card variant="outlined" sx={{mb:3, borderRadius:'7px'}}>
              <CardContent>
                <Grid item xs={12} sx={{mt:2,}}>
                  <Typography component="h4" variant="h6" align='center' className={styles.contactHeading}>Please confirm your email address & phone 
                   number.</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="p" align='center' className={styles.contactP}>We sent 6-digit verification code to following contact. 
                  </Typography>
                </Grid>
                <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} spacing={2}>
                  <Grid item xs={12} sx={{mt:3}}>
                    <Grid container direction="row" rowSpacing={1} spacing={0}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={`${styles.rowp} ${styles.mailBorderRight}`}>
                        <Box component="img" align="center" width={80} height={80} className={styles.mailIcon} alt="mail" 
                        src="/images/pages/signup/mail.png" />
                        <Box component="form" autoComplete='off' sx={{ mt: 1 }}>
                          <CssTextField margin="normal" autoFocus fullWidth id="email" label="Email Address" name="email" />
                          <Typography align='left' className={styles.verifiLabel}>Enter Verification Code</Typography>
                          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1, lg:2, xl:3 }}>
                            <Grid item xs={12}>
                              <CssFormControl margin="normal" fullWidth sx={{"& input": {textAlign: "center"} }}>
                                <MuiOtpInput display="flex" gap={1} className={styles.otpnum} dividerprops={{textAlign:'center'}} TextFieldsProps={{ type:"number"  }}  
                                 length={6} value={otp} onChange={handleOtpChange} />
                              </CssFormControl>
                            </Grid> 
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{mt:2, pb:3}}>
                              <Button fullWidth size='large' variant='contained' className={styles.commonBtn}>Resend Code</Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{mt:2, pb:3}}>
                              <Button fullWidth size='large' variant='contained' className={styles.commonBtn}>Verify</Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                              <Box component="img" align="center" width={60} height={60} className={styles.mailIcon} alt="mail" 
                              src="/images/pages/signup/verify.png" />
                              <Typography component="h4" variant="h6" align="center" sx={{fontSize:'18px', fontWeight:"400px"}}>Verified</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={`${styles.rowp} ${styles.xsTop}`}>
                        <Box component="img" align="center" width={80} height={80} className={styles.mobileIcon}  alt="mobile" 
                         src="/images/pages/signup/mobile.png" />
                        <Box component="form" autoComplete='off' sx={{ mt: 1 }}>
                          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1, lg:2, xl:3 }}>
                            <Grid item xs={3}>
                              <CssTextField margin="normal" fullWidth  value="+911" id="code" name="code" sx={{"& input": {textAlign: "center"} }} />
                            </Grid>
                            <Grid item xs={9}>
                              <CssTextField margin="normal" fullWidth id="mobile" label="Mobile Number" name="mobile" />
                            </Grid>
                          </Grid>
                          <Typography align='left' className={styles.verifiLabel}>Enter Verification Code</Typography>
                          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1, lg:2, xl:3 }}>
                            <Grid item xs={12}>
                              <CssFormControl margin="normal" fullWidth sx={{"& input": {textAlign: "center"} }}>
                                <MuiOtpInput display="flex" gap={1} className={styles.otpnum} dividerprops={{textAlign:'center'}} TextFieldsProps={{ type:"number"  }}  
                                 length={6} value={otpmobile} onChange={handleOtpmobileChange} />
                              </CssFormControl>
                            </Grid> 
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{mt:2, pb:3}}>
                              <Button fullWidth size='large' variant='contained' className={styles.commonBtn}>Resend Code</Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{mt:2, pb:3}}>
                              <Button fullWidth size='large' variant='contained' className={styles.commonBtn}>Verify</Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                              <Box component="img" align="center" width={60} height={60} className={styles.mailIcon} alt="mail" 
                              src="/images/pages/signup/verify.png" />
                              <Typography component="h4" variant="h6" align="center" sx={{fontSize:'18px', fontWeight:"400px"}}>Verified</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sx={{mt:3, color:'#6DCCDD'}}>
                        <Typography component="p" align='center'>The OTP will be expire in 5 minutes. On expiry of time, please resend it. 
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', mt:3, }}>
                  <Button size='large' variant='contained' className={styles.stepperBtn} onClick={handleBack}>Back</Button>
                  <Button size='large' variant='contained' className={styles.stepperBtn} type='submit' onClick={onSubmit}>Next</Button>
                </Grid>
              </CardContent>
            </Card>
          </Container>
        )     
      case 2:
        return (
          <Container maxWidth="xl" component="main">
            <Card variant="outlined" sx={{mb:3, borderRadius:'7px'}}>
              <CardContent>
              <Box sx={{ width: '100%' }}>
                <TabContext value={value}>

                <TabList  onChange={handleChange} aria-label="Personal / Org Information Tabs" TabIndicatorProps={{style: {
                      backgroundColor: "#6DCCDD"} }} sx={{"& .MuiTab-root.Mui-selected": {color: '#000'}, borderBottom: 1, borderColor: 'divider' }}>

                    
                      <Tab sx={{color:'#000'}} label="PERSONAL INFO" value='personalInfo' {...a11yProps(0)}  />
                      <Tab sx={{color:'#000'}} label="BILLING ADDRESS" value='billingAddr' {...a11yProps(1)} />
                      <Tab sx={{color:'#000'}} label="ORGANIZATION INFO" value='organizationInfo' {...a11yProps(2)} />
                    </TabList>
                    

                  
                  <TabPanel value='personalInfo' index={0} >
                  
    <Box component="form" autoComplete='off' sx={{ mt: 1 }}>
                      <Grid container direction="row" rowSpacing={1} spacing={5}>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssTextField margin="normal" fullWidth autoFocus id="family" label="Family Name" name="family" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssTextField margin="normal" fullWidth id="first" label="First Name" name="first" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssTextField margin="normal" fullWidth id="middle" label="Middle Name" name="middle" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssFormControl margin="normal" fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Nationality</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Select Nationality" onChange= 
                             {handleChangeSelect} MenuProps={MenuProps} >
                              <MenuItem value={1}>India</MenuItem>
                              <MenuItem value={2}>Belize</MenuItem>
                              <MenuItem value={3}>Korea, Democratic People&apos;s Republic of Korea</MenuItem>
                            </Select>
                          </CssFormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Grid container direction="row" rowSpacing={0} spacing={{xs: 2, sm:5, md: 2, lg:2, xl:2}} >
                            <Grid item xs={12} sm={6} md={5} lg={5} xl={5}>
                              <CssFormControl margin="normal" fullWidth>
                                <InputLabel id="demo-simple-select-label">Proof of ID</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Proof of ID" onChange= 
                                {handleChangeSelect} MenuProps={MenuProps} >
                                  <MenuItem value={1}>National ID</MenuItem>
                                  <MenuItem value={2}>Iqama</MenuItem>
                                  <MenuItem value={3}>Passport</MenuItem>
                                </Select>
                              </CssFormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={7} lg={7} xl={7}>
                              <CssTextField margin="normal" fullWidth id="idnumber" label="ID Number" name="idnumber" />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssTextField margin="normal" fullWidth id="issuance" label="Place of Issuance" name="issuance" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssFormControl components={['DatePicker']} margin="normal" fullWidth  variant="outlined">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker label="Date of issue" defaultValue={dayjs('04-08-2022')} />
                            </LocalizationProvider>
                          </CssFormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssFormControl components={['DatePicker']} margin="normal" fullWidth  variant="outlined">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker label="Date of expiry" defaultValue={dayjs('04-08-2022')} />
                            </LocalizationProvider>
                          </CssFormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssFormControl components={['DatePicker']} margin="normal" fullWidth  variant="outlined">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker label="Date of Birth" defaultValue={dayjs('04-08-2022')} />
                            </LocalizationProvider>
                          </CssFormControl>
                        </Grid>
                      </Grid>
                    </Box>

                    
                  </TabPanel>
                  <TabPanel value='billingAddr' index={1}  >
                    <Box component="form" autoComplete='off' sx={{ mt: 1 }}>
                      <Grid container direction="row" rowSpacing={1} spacing={5}>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssTextField margin="normal" fullWidth autoFocus id="building" label="Building Number" name="building" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssTextField margin="normal" fullWidth id="street" label="Street / Road" name="street" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssTextField margin="normal" fullWidth id="postal" label="Postal / Zip Code" name="postal" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssTextField margin="normal" fullWidth id="postbox" label="P.O.Box" name="postbox" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssFormControl margin="normal" fullWidth>
                            <InputLabel id="demo-simple-select-label">City</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="City" onChange= 
                             {handleChangeSelect} MenuProps={MenuProps} >
                              <MenuItem value={1}>Riyadh</MenuItem>
                              <MenuItem value={2}>Jeddah</MenuItem>
                              <MenuItem value={3}>Makkah</MenuItem>
                              <MenuItem value={4}>Others</MenuItem>
                            </Select>
                          </CssFormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssFormControl margin="normal" fullWidth>
                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Country" onChange= 
                             {handleChangeSelect} MenuProps={MenuProps} >
                              <MenuItem value={1}>Saudi Arabia (KSA)</MenuItem>
                            </Select>
                          </CssFormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6} hidden>
                          <CssTextField margin="normal" fullWidth id="othercity" label="Others City" name="othercity" />
                        </Grid>
                      </Grid>
                    </Box>
                  </TabPanel>
                  <TabPanel value='organizationInfo' index={2} >
                    <Box component="form" autoComplete='off' sx={{ mt: 1 }}>
                      <Grid container direction="row" rowSpacing={1} spacing={5}>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssTextField margin="normal" fullWidth autoFocus id="company" label="Company Name" name="company" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssFormControl margin="normal" fullWidth>
                            <InputLabel id="demo-simple-select-label">Industry</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Industry" onChange= 
                             {handleChangeSelect} MenuProps={MenuProps} >
                              <MenuItem value={1}>Consumer & Industrial Products</MenuItem>
                              <MenuItem value={2}>Public Sector</MenuItem>
                              <MenuItem value={3}>Others</MenuItem>
                            </Select>
                          </CssFormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6} hidden>
                          <CssTextField margin="normal" fullWidth id="otherindustry" label="Others Industry" name="otherindustry" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssTextField margin="normal" fullWidth id="commercial" label="Commercial Registration (CR)" name="commercial" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssFormControl margin="normal" fullWidth  variant="outlined">
                            <MuiFileInput className={styles.fileLabel} value={file} onChange={handleFileChange} label="File Upload" placeholder='Allowed - 
                             *.jpeg, *.jpg, *.png, *.pdf' />
                          </CssFormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssFormControl components={['DatePicker']} margin="normal" fullWidth  variant="outlined">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker label="Issue Date" defaultValue={dayjs('04-08-2022')} />
                            </LocalizationProvider>
                          </CssFormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssFormControl components={['DatePicker']} margin="normal" fullWidth  variant="outlined">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker label="Expire Date" defaultValue={dayjs('04-08-2022')} />
                            </LocalizationProvider>
                          </CssFormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <CssFormControl margin="normal" fullWidth>
                              <InputLabel id="demo-simple-select-label">Data Classification</InputLabel>
                              <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Data Classification" onChange= 
                              {handleChangeSelect} MenuProps={MenuProps} >
                                <MenuItem value={1}>Public</MenuItem>
                                <MenuItem value={2}>Restricted</MenuItem>
                                <MenuItem value={3}>Confidential</MenuItem>
                              </Select>
                            </CssFormControl>
                            <InfoIcon onClick={handleOpen} sx={{fontSize: '40px', color: "#015578",  ml: 1, my: 2, cursor:'pointer'}} />
                          </Box>
                        </Grid>
                        {/* START Data Classification Info Modal */}
                        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                          <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">Data Classification</Typography>
                            <Typography id="modal-modal-description" component="p" color={'#6b6f82'} sx={{ mt: 2 }}>Based on the Cloud Computing 
                              Regulatory Framework, issued by the Saudi Communication, Information, and Technology Commission; Cloud customers need to 
                              choose the appropriate classification of their data as follows:
                            </Typography>
                            <Accordion sx={{mt:3}} expanded={expanded === 'panel1'} onChange={handleAccChange('panel1')}>
                              <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
                                <Typography variant="h6" component="h4" fontWeight={400} color={'#6b6f82'} fontSize={16}><BlurCircularOutlinedIcon sx= 
                                 {{fontSize: '25px', color: "#6b6f82", marginRight: '15px', position:'relative', display:"inline-block", top:'6px'}} /> 
                                 Extremely Confidential
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography component="p" color={'#6b6f82'} paddingLeft={1}>
                                  Data is classified as (Extremely Confidential) if unauthorized access to this data or its disclosure or its content 
                                   leads to serious and exceptional damage that cannot be remedied or repaired on:
                                </Typography>
                                <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                                  <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> National interests, including breaching agreements and treaties, 
                                   harming the Kingdom&apos;s reputation, diplomatic relations and political affiliations, or the operational efficiency of 
                                  security or military operations, the national economy, national infrastructure, or government business.
                                </Typography>
                                <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                                  <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> The performance of government agencies, which is harmful to the 
                                   national interest.
                                </Typography>
                                <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                                  <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> Broader individual health and safety and the privacy of senior 
                                   officials. Environmental or natural resources
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel2'} onChange={handleAccChange('panel2')}>
                              <AccordionSummary aria-controls="panel2bh-content" id="panel2bh-header">
                                <Typography variant="h6" component="h4" fontWeight={400} color={'#6b6f82'} fontSize={16}><DetailsOutlinedIcon sx= 
                                 {{fontSize: '25px', color: "#6b6f82", marginRight: '15px', position:'relative', display:"inline-block", top:'6px'}} /> 
                                 Confidential
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography component="p" color={'#6b6f82'} paddingLeft={1}>
                                 Data is classified as (Confidential) if unauthorized access to this data or its disclosure or its content leads to 
                                  serious and exceptional damage that cannot be remedied or repaired on:
                                </Typography>
                                <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                                  <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> National interests, including partially harming the Kingdom&apos;s 
                                   reputation, diplomatic relations and political affiliations, or the operational efficiency of security or military 
                                    operations, the national economy, national infrastructure, or government business.
                                </Typography>
                                <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                                  <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> Causes a financial loss at the organizational level that leads to 
                                   bankruptcy, the inability of the entities to perform their duties, a serious loss of competitiveness, or both.
                                </Typography>
                                <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                                  <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> Causes serious harm or injury that affects the life of a group of 
                                   individuals.
                                </Typography>
                                <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                                  <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> Leads to long-term damage to environmental or natural resources. 
                                   Investigating major cases as specified by law, such as terrorism financing cases.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel3'} onChange={handleAccChange('panel3')}>
                              <AccordionSummary aria-controls="panel3bh-content" id="panel3bh-header">
                                <Typography variant="h6" component="h4" fontWeight={400} color={'#6b6f82'} fontSize={16}><FilterCenterFocusOutlinedIcon 
                                 sx={{fontSize: '25px', color: "#6b6f82", marginRight: '15px', position:'relative', display:"inline-block", top:'6px'}} /> 
                                 Restricted
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography component="p" color={'#6b6f82'} paddingLeft={1}>
                                  Data is classified as (Restricted): If unauthorized access to or disclosure of this data or its content leads to:
                                </Typography>
                                <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                                  <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> A limited negative impact on the work of government agencies or 
                                   economic activities in the Kingdom, or on the work of a specific person
                                </Typography>
                                <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                                  <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> Limited damage to any entity&apos;s assets and limited loss on its 
                                   financial and competitive position. Limited damage in the short term to environmental or natural resources.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel4'} onChange={handleAccChange('panel4')}>
                              <AccordionSummary aria-controls="panel4bh-content" id="panel4bh-header">
                                <Typography variant="h6" component="h4" fontWeight={400} color={'#6b6f82'} fontSize={16}><PublicOutlinedIcon sx= 
                                 {{fontSize: '25px', color: "#6b6f82", marginRight: '15px', position:'relative', display:"inline-block", top:'6px'}} /> 
                                 Public
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography component="p" color={'#6b6f82'} paddingLeft={1}>
                                  Data is classified as (Public) when unauthorized access to or disclosure of this data or its content does not result in 
                                  any of the effects mentioned above - in the event that there is no effect on the following:
                                </Typography>
                                <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                                  <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> National interest
                                </Typography>
                                <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                                  <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> Entity activities
                                </Typography>
                                <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                                  <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> Interests of individuals Environmental resources
                                </Typography>
                                <Typography component="p" color={'#6b6f82'} paddingLeft={1} paddingTop={2}>
                                  For more information regarding the Cloud Computing Regulatory Framework please visit CITC website.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          </Box>
                        </Modal>
                        {/* END Data Classification Info Modal */}
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <CssFormControl margin="normal" fullWidth>
                            <InputLabel id="demo-simple-select-label">Purpose</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Purpose" onChange= 
                             {handleChangeSelect} MenuProps={MenuProps} >
                              <MenuItem value={1}>Resale</MenuItem>
                              <MenuItem value={2}>Live support system</MenuItem>
                              <MenuItem value={3}>Others</MenuItem>
                            </Select>
                          </CssFormControl>
                        </Grid> 
                      </Grid>
                    </Box>
                  </TabPanel>
                  

                
                </TabContext>

                </Box>
                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', mt:3, }}>
                  <Button size='large' variant='contained' className={styles.stepperBtn} onClick={handleBack}>Back</Button>
                  <Button size='large' variant='contained' className={styles.stepperBtn} type='submit' onClick={onSubmit}>Next</Button>
                </Grid>
              </CardContent>
            </Card>
          </Container>
        )
        case 3: 
         return(
          <Container maxWidth="xl" component="main">
            <Card variant="outlined" sx={{mb:3, borderRadius:'7px'}}>
              <CardContent>
                <Box >
                  <Grid item xs={12} sx={{mt:2,}}>
                    <Typography component="h4" variant="h6" align='center' sx={{mb:3}} className={styles.contactHeading}>Add your card for future 
                    billings</Typography>
                    <Box component="img" align="center" className={styles.creditCard} alt="credit card" src="/images/pages/signup/creditCard.png" />
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Button size='large' variant='contained' sx={{mt:3, mb:4}} className={styles.commonBtn} onClick={handleOpen}>ADD CARD</Button>
                  </Grid>
                  {/* START Credit Card Add Here */}
                  <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">Add Credit Card</Typography>
                      <Typography id="modal-modal-description" component="p" color={'#6b6f82'} sx={{ mt: 2 }}>Based on the Cloud Computing 
                        Regulatory Framework, issued by the Saudi Communication, Information, and Technology Commission; Cloud customers need to 
                        choose the appropriate classification of their data as follows:
                      </Typography>
                    </Box>
                  </Modal>
                  {/* END Credit Card Add Here */}
                </Box>
                {/* START Credit Card Form Design */}
                <form autoComplete='off' hidden>
                  <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} spacing={2} sx={{mt:4}}>
                    <Grid item xs={12} sm={8} md={7} lg={5} xl={5}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Cards number={state.number} expiry={state.expiry} cvc={state.cvc} name={state.name} focused={state.focus} />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{mt:4}}>
                        {/* <CssTextField margin="normal" fullWidth id="cardnumber" label="Card Numbar" type="number" name="cardnumber" /> */}
                        <CssTextField margin="normal" fullWidth type="number" name="number" label="Card Number" value={state.number} onChange= 
                         {handleInputChange} onFocus={handleInputFocus} />
                      </Grid>
                      <Grid container direction="row" rowSpacing={1} spacing={2}>
                        <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
                          <CssTextField margin="normal" fullWidth type="text" name="name" label="Name on Card" value={state.name} onChange= 
                         {handleInputChange} onFocus={handleInputFocus} />
                        </Grid>
                        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                          <CssTextField margin="normal" fullWidth type="tel" name="expiry" label="Expiry" pattern="\d\d/\d\d" value={state.expiry} 
                           onChange={handleInputChange} onFocus={handleInputFocus} inputProps={{ maxLength: 4 }} />
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} align="center">
                        <Button size='large' variant='contained' sx={{mt:3, mb:4}} className={styles.commonBtn} type='text'><LockIcon sx={{fontSize: 
                          '18px', mr:1}} /> Saved</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
                 {/* END Credit Card Form Design */}
                <Grid item xs={12} align="center">
                  <Box className={styles.creditCardContent}>
                    <Typography component="p" variant="h6" color={'#6DCCDD'} sx={{fontSize:'14px', fontWeight:"400px"}}>
                      Detacloud charges your card SAR 1 as part of the credit card verification process.
                    </Typography>
                    <Typography component="p" variant="h6" color={'#6DCCDD'} sx={{fontSize:'14px', fontWeight:"400px"}}>
                      We will refunds the SAR 1 after verification is complete.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', mt:3, }}>
                  <Button size='large' variant='contained' className={styles.stepperBtn} onClick={handleBack}>Back</Button>
                  <Button size='large' variant='contained' className={styles.stepperBtn} type='submit' onClick={onSubmit}>Next</Button>
                </Grid>
              </CardContent>
            </Card>
          </Container>
         )
         case 4: 
         return(     
          <Container maxWidth="xl" component="main">
            <Card variant="outlined" sx={{mb:3, borderRadius:'7px'}}>
              <CardContent>
                <Box>
                  <Grid item xs={12} sx={{mt:5,}}>
                    <Box component="img" align="center" width={200} height={200} className={styles.creditCard} alt="success" 
                    src="/images/pages/signup/success.png" />
                    <Typography component="h3" variant="h3" align='center' sx={{mt:5, mb:3, fontSize: '24px'}}>
                      You’ve successfully completed your KYC process !
                    </Typography>
                    <Typography component="p"  align='center' sx={{mt:4, mb:2,}}>
                      You can now log in to your account and order detacloud platform.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Button size='large' variant='contained' sx={{mt:3, mb:4}} className={styles.commonBtn} type='submit' onClick= 
                     {onSubmit}>Finish</Button>
                  </Grid>
                </Box> 
                {/* START KYC Document Verification */}
                <Box hidden>
                  <Grid item xs={12} sx={{mt:5,}}>
                    <Box component="img" align="center" width={200} height={200} className={styles.creditCard} alt="success" 
                    src="/images/pages/signup/kyc.png" />
                    <Typography component="h3" variant="h3" align='center' sx={{mt:5, mb:3, fontSize: '24px'}}>
                      KYC Document Verification !
                    </Typography>
                  </Grid>
                  <Grid container direction="row" justifyContent="center" alignItems="center" rowSpacing={1} spacing={2}>
                    <Grid item xs={12} sm={9} md={7} lg={6} xl={6}>
                      <Typography component="p"  align='center' sx={{mt:1, mb:2,}}>
                        Detasad Legal team is reviewing your documents provided, to confirm your account sign-up status. This process may take upto 3 
                        Days, we will notify you of the outcome via email address.
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Button size='large' variant='contained' sx={{mt:3, mb:4}} className={styles.commonBtn} type='submit' onClick= 
                     {onSubmit}>Finish</Button>
                  </Grid>
                </Box>
                {/* END KYC Document Verification */}
              </CardContent>
            </Card>
          </Container>
         )
      default:
        return null
      
    }
  }

  const onSubmit = () => {
    setActiveStep(activeStep + 1)
  }

  const renderContent = () => {
    return getStepContent(activeStep)
  }
  
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{backgroundColor:'#F7F7F9'}}>
        <Toolbar>
          <Box component="img" variant="h6" alt="Logo" src="/images/pages/dcc/common/logo.png" width={110} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{marginTop:'3px'}}>
            <IconButton size="large" aria-label="show 17 new notifications" color="#616377">
              <NotificationsIcon />
            </IconButton>
            <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick= 
             {handleProfileMenuOpen} color="#616377">
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar> 
      {renderMenu}

      {/* Start Steeper Here  */}
      <Container maxWidth="xl" component="main" sx={{mt:13, mb:5,}}>
        <StepperWrapper >
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps = {}
              if (index === activeStep) {
                labelProps.error = false
              }
              return (
                <Step  key={index} >
                  <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </Container>
      {renderContent()}

    </Box>
  );
};

export default Signup;
