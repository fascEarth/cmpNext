
import { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
// ** Next Import
import Link from 'next/link';
import  { useRouter } from "next/router";

// ** Third Party Imports
import DccLayout from "../../../components/layouts/dcc/Layout";
import { useAuth } from '../../../utils/context/authContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useForm, Controller } from 'react-hook-form';
import {  toast } from 'react-toastify';

// ** MUI Components
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText } from '@mui/material';

import { MuiOtpInput } from 'mui-one-time-password-input';

// ** Custom Style Imports
import styles from "./index.module.css";

// ** Third Party Style Imports
import 'react-toastify/dist/ReactToastify.css';

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

function Login() {

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingresend, setIsLoadingresend] = useState(false);

  
  const bCNameLoading = `${styles.loginBtn} ${isLoading ? 'loading' : ''}`;

  const bCNameLoadingResend = `${styles.LinkCss} ${isLoadingresend ? 'loading' : ''}`;


  const [passProp, setpassProp] = useState("");
  const [tftverify, settftverify] = useState(false);
  const [everify, seteverify] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState('')
  const [tftotp, setTftotp] = useState('')
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm();    

  //Password Show  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleEmailChange = (e) => setEmail(e.target.value.toLowerCase() );
  const handlePasswordChange = (e) => setPassword(e.target.value);

  useEffect(() => {
    reset(); // Reset form when component mounts
  }, [reset]);

  useEffect(() => {
    if(everify){
      sendCodeToUser();
    }
  }, [everify]);

  useEffect(() => {
    if(tftverify){
      sendCodeToUser();
    }
  }, [tftverify]);  

  const onSubmit = (data) => {
    console.log(data);
    if(everify){
      setIsLoading(true);    
      handleCreateNEmailVerify();
    }else if(tftverify){
      setIsLoading(true);    
      handleCreateNTft();
    }else{  
      setIsLoading(true);    
      handleCreateN();
    }    
  };

  async function handleCreateNTft(){    
    const newData = {"sms": { "email_id":email,"mobile_no":email,token:tftotp, "mfa_status":true, "user_serial_id":passProp.user_serial_id,"security_enabled":false}};
    const finalData = {data:newData,endPoint:"emailverifyuser"}
    try {
      const { data } = await axios.post('/api/dcc/login', finalData); // call the new API route      
      if( data.status_code == "600"){
        toast.success('Success');  
        const user = {name:"surface", role:"admin"}; 
          Cookies.set('userRole', JSON.stringify(user), 
          {
            expires: 7, // Cookie expiry time in days (adjust as needed)
            path: '/', // Adjust the cookie path as needed
            secure: true, // Set "secure" only in production
            sameSite: 'strict', // Adjust sameSite value based on your requirements
          }
          );
          login(user);
          router.replace("/surface/clouds/elasticins/manage/list");                
        }else if( data.status_code == "605"){      
          setIsLoading(false);    
          toast.error('Incorrect OTP');   
      }else if( data.status_code == "603"){  
        setIsLoading(false);    
        toast.error('Mobile number already registered');                
      }else if( data.status_code == "601"){   
        setIsLoading(false);           
        toast.error('SMS Verification Failed');        
      }  
    } catch (error) {
      setIsLoading(false);    
      toast.error('An Error Occured.');        
    }
  }

  async function handleCreateNEmailVerify(){
    const newData = {"email": { "email_id":email,"token":otp}};
    const finalData = {data:newData,endPoint:"emailverifyuser"}
    try {
      const { data } = await axios.post('/api/dcc/login', finalData); // call the new API route      
      if( data.status_code == "602"){
        toast.success('Success');        
        const user = {name:"surface", role:"admin"}; 
          Cookies.set('userRole', JSON.stringify(user),{
            expires: 7, // Cookie expiry time in days (adjust as needed)
            path: '/', // Adjust the cookie path as needed
            secure: true, // Set "secure" only in production
            sameSite: 'strict', // Adjust sameSite value based on your requirements
          });
          login(user);
          router.replace("/surface/clouds/elasticins/manage/list");                
      }else if( data.status_code == "603"){    
        setIsLoading(false);          
        toast.error('Invalid OTP');        
      }else if( data.status_code == "604" || data.status_code == "605"){  
        setIsLoading(false);            
        toast.error('Incorrect OTP');        
      }  
    } catch (error) {
      setIsLoading(false);    
      toast.error('An Error Occured.');        
    }
  }
    
  async function handleCreateN(){
    const npwd = Buffer.from(password).toString('base64');
    const newData = {"userName": email, "password": npwd, "social_login": "0"};
    const finalData = {data:newData,endPoint:"loginUser"}
    try {
      const { data } = await axios.post('/api/dcc/login', finalData); // call the new API route      
      if( data.status_code == "700"){        
        const sdata = JSON.parse(data.data);
        setpassProp(sdata);
        Cookies.set('userData', JSON.stringify(sdata),
        {
          expires: 7, // Cookie expiry time in days (adjust as needed)
          path: '/', // Adjust the cookie path as needed
          secure: true, // Set "secure" only in production
          sameSite: 'strict', // Adjust sameSite value based on your requirements
        });
        if (sdata.legal_status && sdata.completed_stepper == 5) {          
            if(!sdata.email_verify){
              setIsLoading(false);
              seteverify(true);              
              return;
            }    
            if(sdata.mfa_auth){
              setIsLoading(false);
              settftverify(true);              
              return;              
            }                        
            const user = {name:"surface", role:"admin"}; 
            Cookies.set('userRole', JSON.stringify(user),
            {
              expires: 7, // Cookie expiry time in days (adjust as needed)
              path: '/', // Adjust the cookie path as needed
              secure: true, // Set "secure" only in production
              sameSite: 'strict', // Adjust sameSite value based on your requirements
            });
            login(user);
            router.replace("/surface/clouds/elasticins/manage/list");                  
        }else{        
          const user = {name:"signup", role:"signupadmin"};
          Cookies.set('userRole', JSON.stringify(user),
          {
            expires: 7, // Cookie expiry time in days (adjust as needed)
            path: '/', // Adjust the cookie path as needed
            secure: true, // Set "secure" only in production
            sameSite: 'strict', // Adjust sameSite value based on your requirements
          });
          login(user);
          router.replace("/signup");          
        } 
        toast.success('Login successful');        
      }else {
        setIsLoading(false);
        if( data.status_code == "701"){  
          toast.error('Invalid Credentials');
        }else if( data.status_code == "702"){  
          toast.error('This account is not registered with our database');
        }else if( data.status_code == "703"){  
          toast.error('This account is not activated by the owner');  
        }else if( data.status_code == "707"){  
          toast.error('An error occurred');
        }else{
          toast.error('Error: ' + data.data);
        }          
        
      }
    } catch (error) {
      setIsLoading(false);      
      toast.error('An error occurred');
    }
  }

  function sendCodeToUser(){     
    setIsLoadingresend(true);       
    if(everify){      
      const newData = { "email_id":email,"mobile_no":"","reset_password":false, 'type':'loginEmail'};
      const finalData = {data:newData,endPoint:"sendCodeToUser"}
      try {
        const { data } =  axios.post('/api/dcc/login', finalData); // call the new API route                    
        setIsLoadingresend(false);       
        toast.error('OTP sent successfully!');        
      } catch (error) {     
        setIsLoadingresend(false);       
        toast.error('An Error Occured.');        
      }
    }else if(tftverify){      
      const newData = { "email_id":email, 'type':'logintfa'};
      const finalData = {data:newData,endPoint:"tftsendCodeToUser"}
      try {
        const { data } =  axios.post('/api/dcc/login', finalData); // call the new API route                    
        setIsLoadingresend(false);  
        toast.error('OTP sent successfully!');             
      } catch (error) {   
        setIsLoadingresend(false);            
        toast.error('An Error Occured.');        
      }
    }         
  }

  const handleComplete = (newValue) => {
    setOtp(newValue)  
  }

  const handleChange = (newValue) => {
    setTftotp(newValue)  
  }

  return (        
    <DccLayout>
      <>
        <Box component="img" align="center" className={styles.logo} sx={{pb: 2, }} alt="Logo" src="/images/pages/dcc/common/logo.png" />            
          <Typography component="h4" align="center" variant="h5" sx={{pt: 1, pb: 2, }}>
            {
              everify ?
                (
                  "Email Verification ✉️"
                ) 
              : tftverify ?
                (
                  "Two-Factor Authentication 💬"
                )
              :
                (
                  "Welcome to DETASAD 👋🏻"
                )
            }              
          </Typography>
          <Typography align="center" sx={{color: '#6b6f82' }}>
            {
              everify ?
                (
                  <>
                    We&apos;ve send you a verification code message. Please enter the 6-digit code below.
                  </>
                ) 
              : tftverify ?
                (
                  "Your account is protected with 2FA. We've sent you a verfication code message. Please enter the 6-digit code below."
                )
              :
                (
                  "Please sign-in to your account."
                )
            }
          </Typography>            
          <Box onSubmit={handleSubmit(onSubmit)} id="login_form" component="form" autoComplete='off' sx={{ mt: 1 }}>            
            {
              everify ?
                (
                  <>
                    <CssTextField disabled margin="normal" fullWidth autoFocus id="outlined-basic"  name="email" value={email} />
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1, lg:2, xl:3 }}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>              
                  
                      <CssFormControl margin="normal" fullWidth sx={{"& input": {textAlign: "center"} }}>
                        <Controller
                        name="otp"
                        control={control}
                        rules={{
                          required: 'OTP is required',
                          pattern: {
                            value: /^\d{6}$/,
                            message: 'OTP must be a 6-digit number',
                          },
                        }}
                        render={({ field,fieldState }) => (
                          <Box>
                            <MuiOtpInput                    
                            display="flex"
                            gap={1}
                            className={styles.otpnum} dividerprops={{textAlign:'center'}} TextFieldsProps={{ type:"number"  }}
                            length={6}
                            value={field.value}
                            onChange={(newValue) => {
                              field.onChange(newValue); // Manually trigger the field's onChange event
                              handleComplete(newValue); // Call your handleComplete function
                            }}
                            />
                            {fieldState.invalid && (
                              <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                            )}
                          </Box>  
                        )}
                        />  

</CssFormControl>
                      </Grid>
                    </Grid>
                  </>
                ) 
              : tftverify ?
                (
                  <>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1, lg:2, xl:3 }}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                      <CssFormControl margin="normal" fullWidth sx={{"& input": {textAlign: "center"} }}>
                        <Controller
                        name="tftotp"
                        control={control}
                        rules={{
                          required: 'OTP is required',
                          pattern: {
                            value: /^\d{6}$/,
                            message: 'OTP must be a 6-digit number',
                          },
                        }}
                        render={({ field,fieldState }) => (
                          <Box>
                            <MuiOtpInput                            
                            display="flex"
                            gap={1}
                            className={styles.otpnum} dividerprops={{textAlign:'center'}} TextFieldsProps={{ type:"number"  }}
                            length={6}
                            value={field.value}
                            onChange={(newValue) => {
                              field.onChange(newValue); // Manually trigger the field's onChange event
                              handleChange(newValue); // Call your handleComplete function
                            }}
                            />
                            {fieldState.invalid && (
                              <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                            )}
                          </Box>
                        )}
                        />    
                        </CssFormControl>


                      </Grid>
                    </Grid>                  
                  </>
                )
              :
                (
                  <>
                    <CssTextField margin="normal" autoFocus fullWidth  id="email"
                    name="email"  
                    autoComplete="username" // Add the autoComplete attribute here                    
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    value={email}
                    onChange={handleEmailChange} label="Email Address" 
                    error={errors.email ? true : false}              
                    />
                    {errors.email && (
                      <FormHelperText error>
                        {errors.email.message}
                      </FormHelperText>
                    )}
                    <CssFormControl margin="normal" fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput 
                      name="password"
                      label="Password"    
                      autoComplete="current-password" // Add the autoComplete attribute here        
                      {...register('password', {
                        required: 'Password is required',
                        
                        pattern: {
                          value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?!.*\s).{8,16}$/,
                          message: 'Please enter a valid password.',
                        },
                      })}
                      value={password}
                      onChange={handlePasswordChange}
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      error={errors.password ? true : false}                  
                      />
                      {errors.password && (
                        <FormHelperText error>
                          {errors.password.message}
                        </FormHelperText>
                      )}
                    </CssFormControl>                  
                  </>
                )
            }

            {
              (!everify && !tftverify) ?
                (
                  <>
                    <Grid container>
                      <Grid item xs>
                        <FormControlLabel sx={{color: '#6b6f82' }} control={<Checkbox value="remember" sx={{color: "#6b6f82",'&.Mui-checked': {color: '#6DCCDD',},}} />} label="Remember me"/>
                      </Grid>
                      <Grid item sx={{ mt: 1}}>
                        <Link href="fpwd" variant="body3" className={styles.LinkCss}>
                          {"Forgot password ?"}
                        </Link>
                      </Grid>
                    </Grid>
                  </>
                ) 
              : (
                  <></>
                )
            }              
            
            <Button disabled={isLoading} type="submit" fullWidth size='large' variant="contained" className={bCNameLoading} sx={{ mt: 3, mb: 3 }}>            
              {
                (everify || tftverify) ?
                  (
                    <>
                    {isLoading ? 'Loading...' : 'Verify'}
                      
                    </>
                  ) 
                : 
                  (
                    <>
                    {isLoading ? 'Loading...' : 'LOGIN'}
                      
                    </>
                  )
              }
            </Button>

            {
              (everify || tftverify) ?
                (
                  <>
                    <Grid container>
                      <Grid item align="center" xs sx={{ mt: 1,}}>
                        <Button disabled={isLoadingresend}  onClick={sendCodeToUser} type="button" variant="body3" className={styles.LinkCss} >
                          {isLoadingresend ? 'Loading...' : 'Resend Code'}
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                ) 
              :
                (
                  <>
                    <Typography align="center" sx={{color: '#6b6f82' }}>Do not have an account yet ? <Link href="register" variant="body3" className= 
                    {styles.LinkCss}>Create an account</Link></Typography>
                  </>
                )
            }               
        </Box>
      </>          
    </DccLayout>                        
  );
};

export default Login;


