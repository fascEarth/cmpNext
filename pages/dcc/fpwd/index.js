// ** React Imports
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// ** Next Import
import Link from 'next/link';

// ** MUI Components
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ** Custom Style Imports
import styles from "./index.module.css";
import DccLayout from '../../../components/layouts/dcc/Layout';
import { MuiOtpInput } from 'mui-one-time-password-input';

import { useForm, Controller } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormHelperText } from '@mui/material';

import axios from 'axios';

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

function ForgotPassword() {
  const router = useRouter();
  const [resetPwd,setResetPwd] = useState(false);
  const [allowotp,setAllowOtp] = useState(false)
  const [otp, setOtp] = useState('')
  const handleComplete = (newValue) => {
    console.log(newValue);
    setOtp(newValue)
    
  }

  const { register, handleSubmit, formState: { errors }, reset, control } = useForm();

  useEffect(() => {
    reset(); // Reset form when component mounts
  }, [reset]);

  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => setEmail(e.target.value);



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
    
    //setOtp(data.otp)

    
    if(allowotp){
      if(resetPwd){
        setConfirmPassword(data.confirmpassword)
      console.log(data.confirmpassword);
      setNewPassword(data.newpassword)
      console.log(data.newpassword);
        console.log("coming");
        resetPwdUser();
      }else{
        setOtp(data.otp)
      console.log(data.otp);
      verifyTokenpwd();
      }
      
    }else{
      setEmail(data.email)
      console.log(data.email);
      sendTokenFpwd();
    }
    
  };
  async function resetPwdUser(){

    const newData = {"reset_password":{"email_id": email, "new_password":newpassword}};
    const finalData = {data:newData,endPoint:"resetPwdUser"}
    try {
      const { data } = await axios.post('/api/dcc/fpwd', finalData); // call the new API route
      console.log(data);
      if( data.status_code == "1000"){
        
        toast.success(data.message);

        setTimeout(() => {
          router.replace("/dcc/login"); 
        }, 5000);
      }else if( data.status_code == "1001"){
        toast.error('Error: ' + data.message);
      }else{
        toast.error('Error: ' + data.message);
      }
  
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
    
  }
  async function verifyTokenpwd(){
    const newData = {"email":{"email_id": email, "token":otp}};
    const finalData = {data:newData,endPoint:"verifyUserCode"}
    try {
      const { data } = await axios.post('/api/dcc/fpwd', finalData); // call the new API route
      console.log(data);
      if( data.status_code == "602"){
        setResetPwd(true);
        toast.success(data.message);
      }else if( data.status_code == "603"){
        toast.error('Error: ' + data.message);
      }else{password
        toast.error('Error: ' + data.message);
      }
  
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  }

  async function sendTokenFpwd(){

    const newData = {"email_id": email, "mobile_no": "", "reset_password": true};
  const finalData = {data:newData,endPoint:"sendCodeToUser"}
  try {
    const { data } = await axios.post('/api/dcc/fpwd', finalData); // call the new API route
    console.log(data);
    if( data.status_code == "612"){
      setAllowOtp(true);
      toast.success(data.message);
    }else if( data.status_code == "614"){
      toast.error('Error: ' + data.message);
    }else{
      toast.error('Error: ' + data.message);
    }

  } catch (error) {
    console.error(error);
    toast.error('An error occurred');
  }

  }

  return (    
    <DccLayout>
      <Box component="img" align="center" className={styles.logo} sx={{pb: 2, }} alt="Logo" src="/images/pages/dcc/common/logo.png" />
            <Typography component="h4" align="center" variant="h5" sx={{pt: 1, pb: 2, }}>Forgot your password ? 🔒</Typography>
            <Typography align="left" sx={{color: '#6b6f82' }}>Enter your email address that you used to register. We&apos;ll send you an email with a link 
              to reset your password.</Typography>
            <Box onSubmit={handleSubmit(onSubmit)}  component="form" autoComplete='off' sx={{ mt: 1 }}>

            {
            allowotp ? 
            (

              <CssTextField margin="normal" fullWidth autoFocus id="outlined-basic" 
              
              
              

              disabled={true}
              value={email}
              
              label="Email Address" 

              

              />

              

            ) 
            : 
            (

              <>
              <CssTextField margin="normal" fullWidth autoFocus id="outlined-basic" 
              name="email" 
              
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              })}


              value={email}
              onChange={handleEmailChange} 
              label="Email Address" 

              error={errors.email ? true : false}

              />

              {errors.email && (
                <FormHelperText error>
                  {errors.email.message}
                </FormHelperText>
              )}

              </>


            ) 
            }

              
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1, lg:2, xl:3 }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                
            {resetPwd ? 
            
            (
              <>
              

              <CssFormControl margin="normal" fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-newpassword">New Password</InputLabel>
                <OutlinedInput 
              name="newpassword"
              label="New Password"
              

              {...register('newpassword', {
                required: 'New Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
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
              name="newpassword"
              label="Confirm New Password"
              

              {...register('confirmpassword', {
                required: 'Confirm New Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
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

              
              </>
            ) 
            : 
            
            (
              <>
              {allowotp ? (
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
              ) :

              (
                <MuiOtpInput
                    
                    display="flex"
                    gap={1}
                    className={styles.otpnum} dividerprops={{textAlign:'center'}} TextFieldsProps={{ disabled:true,type:"number"  }}
                    length={6}
                    
                    
                  />
              )
  
  }
              </>
              
            )
            
          }
              
              
            

              

              </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" size='large' className={styles.forgotpasswordBtn} sx={{ mt: 3, mb: 2 }}>
                {
                  allowotp ? (
                    <>
                    {
                      resetPwd ? ( "Submit" ) : ( "Verify" )
                    }
                    </>
                  ) : (
                    "Send Verification Code"
                  )
                }
                </Button>
              <Grid container>
                <Grid item xs sx={{ mt: 1}}>
                  <Link href="login" variant="body3" className={styles.LinkCss}>
                    {"Back to login"}
                  </Link>
                </Grid>
                <Grid item sx={{ mt: 1}}>
                  <Link href="register" variant="body3" className={styles.LinkCss}>
                    {"Create your account"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
    </DccLayout>
  );
};
  
export default ForgotPassword;
  