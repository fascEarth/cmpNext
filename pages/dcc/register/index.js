// ** React Imports
import { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
// ** Next Import
import Link from 'next/link';

// ** MUI Components
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

// ** Icons Imports
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ** Tab Imports
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// ** Custom Style Imports
import styles from "./index.module.css";
import DccLayout from '../../../components/layouts/dcc/Layout';

import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormHelperText } from '@mui/material';


import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../../../utils/context/authContext';
import { useRouter } from 'next/router';

// Tab function
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// TextField Custom Styles
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

// FormControl Custom Styles
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

//Privacy Policy Styles
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.8),
  textAlign: 'center',
}));

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const [captchaValue, setCaptchaValue] = useState('');

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    reset(); // Reset form when component mounts
/*
    const sdata = {
      "email": "raj.yaffy@gmail.com",
      "pwd":"Raju@1234",
      "account_type":"personal",
      "social_login":"0",
      "tenant_id":"123",
      "user_serial_id":"312",          
      "completed_stepper": "2",
      "payment_card_status": "",
      "legal_status": false          
    };  
    
    Cookies.set('userData', JSON.stringify(sdata));        

    const user = {name:"signup", role:"signupadmin"};
    Cookies.set('userRole', JSON.stringify(user));
    login(user);
    router.replace("/signup");
    */

  }, [reset]);

  const[accounttype,setaccounttype] = useState("personal");
  const [email, setEmail] = useState("");
  //Tab
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {    
    if(newValue === 1){
      setaccounttype("legal");
    }else{
      setaccounttype("personal");
    }
    
    setValue(newValue);
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  //Personal New Password Show

  const [newpassword, setNewPassword] = useState("");
  //Password Show
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

  const [confirmpassword, setConfirmPassword] = useState("");
  //Password Show
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);


  const onSubmit = (data) => {
        
    if (data.newpassword !== data.confirmpassword) {      
      toast.error("New password and confirm password should match");
      return;
    } 
    
    if (isCaptchaValid && Object.keys(errors).length === 0) {
      setIsLoading(true);      
      handleFinal();
    }   
    
   
  };
  async function handleFinal(){
    
    const npwd = Buffer.from(newpassword).toString('base64');
    const newData = {"email_id": email, "password": npwd,"account_type":accounttype, "social_login": "0"};
    const finalData = {data:newData,endPoint:"registerUser"}
    try {
      const { data } = await axios.post('/api/dcc/register', finalData); // call the new API route      
      
      if( data.status_code == "200"){        
        const sdata = {
          "email": email,
          "pwd":newpassword,
          "account_type":accounttype,
          "social_login":"0",
          "tenant_id":data.tenant_id,
          "user_serial_id":data.user_serial_id,          
          "completed_stepper": "2",
          "payment_card_status": "",
          "legal_status": false,
          "email_verify":false,
          "sms_verify":false          
        };  
        
        Cookies.set('userData', JSON.stringify(sdata));        

        const user = {name:"signup", role:"signupadmin"};
        Cookies.set('userRole', JSON.stringify(user));
        login(user);
        router.replace("/signup");

        toast.success('Signup successful');        
      }else {
        setIsLoading(false);              
        toast.error('Error: '+data.status_code+' ' + data.status_msg);
      }
    } catch (error) {
      setIsLoading(false);            
      toast.error('An error occurred');
    }

  }



  return (    
    <DccLayout>
       <Box component="img" align="center" className={styles.logo} sx={{pb: 2, }} alt="Logo" src="/images/pages/dcc/common/logo.png" />
            <Typography component="h4" align="center" variant="h5" sx={{pt: 1, pb: 2, }}>Create your account  🚀</Typography>
            <Box sx={{ width: '100%', mt: 1, }}>
              <Box className={styles.tabContainer} >
                <Tabs value={value} onChange={handleChange} aria-label="tabs" sx={{'& .MuiTabs-indicator': {display:'none'}, 
                "& .MuiTab-root.Mui-selected": { color: '#fff', backgroundColor: '#015578',} }}>
                  <Tab className={styles.tabFirst} label="Personal" {...a11yProps(0)} />
                  <Tab className={styles.tabSecond} label="Legal Entity" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <Box onSubmit={handleSubmit(onSubmit)} id="register_form" component="form" autoComplete='off' sx={{mt: 1}}>
                <CssTextField 
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address',
                    },
                  })}

                value={email}
              onChange={handleEmailChange} margin="normal" fullWidth id="email" label="Email Address" name="email" autoFocus 

              error={errors.email ? true : false}
              />

                {errors.email && (
                  <FormHelperText error>
                    {errors.email.message}
                  </FormHelperText>
                )}

<CssFormControl margin="normal" fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-newpassword">New Password</InputLabel>
                <OutlinedInput 
              name="newpassword"
              label="New Password"
              

              {...register('newpassword', {
                required: 'New Password is required',
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?!.*\s).{8,16}$/,
                  message: 'Please enter a valid password.',
                },
              })}


              value={newpassword}
              onChange={handleNewPasswordChange}
              id="outlined-adornment-newpassword"
                  type={showNewPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownNewPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }

                  error={errors.newpassword ? true : false}
                  
                />

                {errors.newpassword && (
                  <FormHelperText error>
                    {errors.newpassword.message}
                  </FormHelperText>
                )}


              </CssFormControl>

              <CssFormControl margin="normal" fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-confirmpassword">Confirm New Password</InputLabel>
                <OutlinedInput 
              name="confirmpassword"
              label="Confirm New Password"
              

              {...register('confirmpassword', {
                required: 'Confirm New Password is required',
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?!.*\s).{8,16}$/,
                  message: 'Please enter a valid password.',
                },
                validate: (value) => value === newpassword || 'Passwords do not match'
              })}


              value={confirmpassword}
              onChange={handleConfirmPasswordChange}
              id="outlined-adornment-confirmpassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }

                  error={errors.confirmpassword ? true : false}
                  
                />

                {errors.confirmpassword && (
                  <FormHelperText error>
                    {errors.confirmpassword.message}
                  </FormHelperText>
                )}


              </CssFormControl>
                  
                <ReCAPTCHA
                data-next="6Lc5io4hAAAAAKpevcsm1gYAMOrL_iR4uGOl76KO"
                  sitekey="6LdbqRMmAAAAAN8ooj6Sk5HP_yoVDtgVwGVxfPh7"
                  onChange={(value) => {
                    handleCaptchaChange(value);
                    setIsCaptchaValid(true);
                  }} // You can handle the reCAPTCHA response here

                  onExpired={() => setIsCaptchaValid(false)}

                  
                />


                <Button disabled={isLoading} type="submit" fullWidth variant="contained" size='large' className={styles.registerBtn} sx={{ mt: 3, mb: 2 }}>
                  
                  {isLoading ? 'Loading...' : 'CREATE ACCOUNT'}
                  </Button>
                <Grid item align="center">
                  <FormControlLabel sx={{color: '#6b6f82'}} control={<Checkbox  checked={true} disabled value="remember" sx={{color: "#6b6f82", '&.Mui-checked': 
                  {color:'#6DCCDD',},}} />}
                  label="I agree to the DETASAD Cloud" />
                </Grid>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0, sm: 1, md: 1, lg: 1, xl:2 }} mt={2} mb={2} justifyContent="center" 
                alignItems="center" divider={<Divider orientation="vertical" flexItem />}>
                  <Item sx={{boxShadow: "none"}}><Link href="#" variant="body3" className={styles.LinkCss}>Privacy Policy</Link></Item>
                  <Item sx={{boxShadow: "none"}}><Link href="#" variant="body3" className={styles.LinkCss}>Terms of Use</Link></Item>
                  <Item sx={{boxShadow: "none"}}><Link href="#" variant="body3" className={styles.LinkCss}>Cookie Policy</Link></Item>
                </Stack>
                <Typography align="center" sx={{color: '#6b6f82' }}>Already have an account ? <Link href="login" variant="body3" className= 
                {styles.LinkCss}>Login</Link></Typography>
              </Box>
            </Box>
            <ToastContainer />
    </DccLayout>
  );
};
  
export default Register;
  