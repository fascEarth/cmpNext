// ** React Imports
import { useState, useEffect } from 'react';

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


  const [captchaValue, setCaptchaValue] = useState('');

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    reset(); // Reset form when component mounts
  }, [reset]);


  const [email, setEmail] = useState("");
  //Tab
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  //Personal New Password Show
  const [showPnewPassword, setShowPnewPassword] = useState(false);
  const handleClickShowPnewPassword = () => setShowPnewPassword((show) => !show);
  const handleMouseDownPnewPassword = (event) => {
    event.preventDefault();
  };
  //Personal Confirm Password Show
  const [showPconfirmPassword, setShowPconfirmPassword] = useState(false);
  const handleClickShowPconfirmPassword = () => setShowPconfirmPassword((show) => !show);
  const handleMouseDownPconfirmPassword = (event) => {
    event.preventDefault();
  };


  const onSubmit = (data) => {
    console.log(data.newpassword, data.confirmpassword);
    if (data.newpassword !== data.confirmpassword) {
      console.log(data.newpassword, data.confirmpassword);
      toast.error("New password and confirm password should match");
      return;
    } 
    console.log(data.email, data.newpassword, data.confirmpassword);
    console.log(isCaptchaValid);
    console.log(Object.keys(errors));
    if (isCaptchaValid && Object.keys(errors).length === 0) {
      console.log(data.email, data.newpassword);
      handleFinal();
    }   
    
   
  };
  async function handleFinal(){
    console.log("coming");
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
              <Box onSubmit={handleSubmit(onSubmit)}  component="form" autoComplete='off' sx={{mt: 1}}>
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
                  <InputLabel htmlFor="outlined-adornment-Pnewpassword">New Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-Pnewpassword"
                    type={showPnewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPnewPassword}
                          onMouseDown={handleMouseDownPnewPassword}
                          edge="end"
                        >
                          {showPnewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="New Password"
                    name="newpassword"

                    {...register('newpassword', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters long',
                      },
                    })}

                    error={errors.newpassword ? true : false}


                  />

                {errors.newpassword && (
                  <FormHelperText error>
                    {errors.newpassword.message}
                  </FormHelperText>
                )}


                </CssFormControl>
                <CssFormControl margin="normal" fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-Pconfirmpassword">Confirm New Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-Pconfirmpassword"
                    type={showPconfirmPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPconfirmPassword}
                          onMouseDown={handleMouseDownPconfirmPassword}
                          edge="end"
                        >
                          {showPconfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    name="confirmpassword"
                    label="Confirm New Password"
                    {...register('confirmpassword', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters long',
                      },
                    })}

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


                <Button type="submit" fullWidth variant="contained" size='large' className={styles.registerBtn} sx={{ mt: 3, mb: 2 }}>CREATE 
                ACCOUNT</Button>
                <Grid item align="center">
                  <FormControlLabel sx={{color: '#6b6f82'}} control={<Checkbox value="remember" sx={{color: "#6b6f82", '&.Mui-checked': 
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
  