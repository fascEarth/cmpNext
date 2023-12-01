import { useState, useEffect } from "react";
import { Buffer } from "buffer";

import Link from "next/link";
import { useRouter } from "next/router";

import { useClientIP } from "../../../utils/context/ClientIPContext";

import DccLayout from "../../../components/layouts/dcc/Layout";
import { useAuth } from "../../../utils/context/authContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";

import AutorenewIcon from "@mui/icons-material/Autorenew";
import { MuiOtpInput } from "mui-one-time-password-input";
import Paper from "@mui/material/Paper";

import styles from "./index.module.css";

import "react-toastify/dist/ReactToastify.css";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#015578",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "7px",
    },
    "&:hover fieldset": {
      border: "2px solid",
      borderColor: "#6DCCDD",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#015578",
    },
  },
});

const CssFormControl = styled(FormControl)({
  "& label.Mui-focused": {
    color: "#015578",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "7px",
    },
    "&:hover fieldset": {
      border: "2px solid",
      borderColor: "#6DCCDD",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#015578",
    },
  },
});

function Login() {
  const { clientIP } = useClientIP();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingresend, setIsLoadingresend] = useState(false);

  const bCNameLoading = `${styles.loginBtn} ${isLoading ? "loading" : ""}`;

  const bCNameLoadingResend = `${styles.LinkCss} ${
    isLoadingresend ? "loading" : ""
  }`;

  const [passProp, setpassProp] = useState("");
  const [tftverify, settftverify] = useState(false);
  const [everify, seteverify] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [tftotp, setTftotp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailErr, setEmailErr] = useState(false);
  const [pwdErr, setPwdErr] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    emailERROR: "",
    passwordErrorMsg: "",
  });
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value.toLowerCase());
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
      setEmailErr(true);
      setErrorMsg({ ...errorMsg, emailERROR: "Please enter the valid email" });
    } else {
      setEmailErr(false);
      errors.email = { message: "" };
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/.test(
        e.target.value
      )
    ) {
      setPwdErr(true);
      setErrorMsg({
        ...errorMsg,
        passwordErrorMsg:
          "Minimum 8 characters long, number, uppercase & symbol without empty spaces",
      });
    } else {
      setPwdErr(false);
      setErrorMsg({ ...errorMsg, passwordErrorMsg: "" });
    }
  };

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (everify) {
      sendCodeToUser();
    }
  }, [everify]);

  useEffect(() => {
    if (tftverify) {
      sendCodeToUser();
    }
  }, [tftverify]);

  const onSubmit = (data) => {
    if (!email || !email.trim() || !password || !password.trim()) {
      setEmailErr(!email && true);
      setPwdErr(!password && true);
      setErrorMsg({
        ...errorMsg,
        emailERROR: "Please enter the email",
        passwordErrorMsg: "Please enter the password",
      });
      return;
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/.test(
        password
      )
    ) {
      setPwdErr(true);
      setErrorMsg({
        ...errorMsg,
        passwordErrorMsg:
          "Minimum 8 characters long, number, uppercase & symbol without empty spaces",
      });
      return;
    }
    if (everify) {
      setIsLoading(true);
      handleCreateNEmailVerify();
    } else if (tftverify) {
      setIsLoading(true);
      handleCreateNTft();
    } else {
      setIsLoading(true);
      handleCreateN();
    }
  };
  const handleKeyPress = (e) => {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  };

  const [roleName, setRoleName] = useState("");
  async function handleCreateNTft() {
    const newData = {
      sms: {
        email_id: email,
        mobile_no: email,
        token: tftotp,
        mfa_status: true,
        user_serial_id: passProp.user_serial_id,
        security_enabled: false,
      },
    };
    const finalData = { data: newData, endPoint: "emailverifyuser" };
    try {
      const { data } = await axios.post("/api/dcc/login", finalData);
      if (data.status_code == "600") {
        toast.success("Success");

        const user = { name: "surface", role: roleName };
        Cookies.set("userRole", JSON.stringify(user));
        login(user);
        if (roleName === "billing admin") {
          router.replace("/surface/billing/currentusage");
        } else {
          router.replace("/surface/clouds/elasticins/manage/list");
        }
      } else if (data.status_code == "605") {
        setIsLoading(false);
        toast.error("Incorrect OTP");
      } else if (data.status_code == "603") {
        setIsLoading(false);
        toast.error("Mobile number already registered");
      } else if (data.status_code == "601") {
        setIsLoading(false);
        toast.error("SMS Verification Failed");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An Error Occured.");
    }
  }

  async function handleCreateNEmailVerify() {
    const newData = { email: { email_id: email, token: otp } };
    const finalData = { data: newData, endPoint: "emailverifyuser" };
    try {
      const { data } = await axios.post("/api/dcc/login", finalData);
      if (data.status_code == "602") {
        toast.success("Success");

        const user = { name: "surface", role: roleName };
        Cookies.set("userRole", JSON.stringify(user));
        login(user);
        if (roleName === "billing admin") {
          router.replace("/surface/billing/currentusage");
        } else {
          router.replace("/surface/clouds/elasticins/manage/list");
        }
      } else if (data.status_code == "603") {
        setIsLoading(false);
        toast.error("Invalid OTP");
      } else if (data.status_code == "604" || data.status_code == "605") {
        setIsLoading(false);
        toast.error("Incorrect OTP");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An Error Occured.");
    }
  }

  async function handleCreateN() {
    const npwd = Buffer.from(password).toString("base64");
    const newData = {
      userName: email,
      password: npwd,
      social_login: "0",
      ipAddress: clientIP,
    };
    const finalData = { data: newData, endPoint: "loginUser" };
    try {
      const { data } = await axios.post("/api/dcc/login", finalData);
      if (data.status_code == "700") {
        const sdata = JSON.parse(data.data);
        setpassProp(sdata);
        Cookies.set("userData", JSON.stringify(sdata));
        if (
          sdata.tenant_active_status &&
          sdata.legal_status &&
          sdata.completed_stepper == 5
        ) {
          setRoleName(sdata.role_name);
          if (!sdata.email_verify) {
            setIsLoading(false);
            seteverify(true);
            return;
          } else if (sdata.mfa_auth) {
            setIsLoading(false);
            settftverify(true);
            return;
          } else {
            const user = { name: "surface", role: sdata.role_name };
            Cookies.set("userRole", JSON.stringify(user));

            login(user);
            if (sdata.role_name === "billing admin") {
              router.replace("/surface/billing/currentusage");
            } else {
              router.replace("/surface/clouds/elasticins/manage/list");
            }
          }
        } else {
          const user = { name: "signup", role: "signupadmin" };
          Cookies.set("userRole", JSON.stringify(user));
          login(user);
          router.replace("/signup");
        }
        toast.success("Login successful");
      } else {
        setIsLoading(false);
        if (data.status_code == "701") {
          toast.error("Invalid Credentials");
        } else if (data.status_code == "702") {
          toast.error("This account is not registered with our database");
        } else if (data.status_code == "703") {
          toast.error("This account is not activated by the owner");
        } else if (data.status_code == "707") {
          toast.error(
            "You have improperly logged out more than 100 times. Please contact admin."
          );
        } else {
          toast.error("Error: " + data.data);
        }
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred");
    }
  }

  function sendCodeToUser() {
    setIsLoadingresend(true);
    if (everify) {
      const newData = {
        email_id: email,
        mobile_no: "",
        reset_password: false,
        type: "loginEmail",
      };
      const finalData = { data: newData, endPoint: "sendCodeToUser" };
      try {
        const { data } = axios.post("/api/dcc/login", finalData);
        setIsLoadingresend(false);
        toast.success("OTP sent successfully!");
      } catch (error) {
        setIsLoadingresend(false);
        toast.error("An Error Occured.");
      }
    } else if (tftverify) {
      const newData = { email_id: email, type: "logintfa" };
      const finalData = { data: newData, endPoint: "tftsendCodeToUser" };
      try {
        const { data } = axios.post("/api/dcc/login", finalData);
        setIsLoadingresend(false);
        toast.success("OTP sent successfully!");
      } catch (error) {
        setIsLoadingresend(false);
        toast.error("An Error Occured.");
      }
    }
  }

  const handleComplete = (newValue) => {
    setOtp(newValue);
  };

  const handleChange = (newValue) => {
    setTftotp(newValue);
  };

  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const Rcookies = localStorage.getItem("userLoginData");
    const cachData = Rcookies ? JSON.parse(Rcookies) : null;
    if (cachData) {
      setRememberMe(true);
      if (cachData.email) {
        setEmail(cachData.email);
      }

      if (cachData.pwd) {
        setPassword(cachData.pwd);
      }
    }
  }, []);

  const handleRememberMe = async (rememberMeVal) => {
    setRememberMe(rememberMeVal);
    if (rememberMeVal) {
      const sdata = {
        email: email,
        pwd: password,
      };
      localStorage.setItem("userLoginData", JSON.stringify(sdata));
    } else {
      localStorage.removeItem("userLoginData");
    }
  };

  return (
    <DccLayout>
      <Grid className={styles.pageWrapper}>
        <Grid item xs={false} sm={false} md={7} lg={8} xl={9}>
          {" "}
          <Box className={styles.loginBg}></Box>
        </Grid>

        <Grid
          className={styles.ResMdDevice}
          item
          xs={12}
          sm={12}
          md={5}
          lg={4}
          xl={3}
          component={Paper}
          elevation={6}
          square
        >
          <Box className={styles.verticalCenter}>
            <Grid item xs={12} sm={12} md={12}>
              <Box
                component="img"
                align="center"
                className={styles.logo}
                sx={{ pb: 2 }}
                alt="Logo"
                src="/images/pages/dcc/common/logo.png"
              />
              <Typography
                component="h4"
                className={styles.headingTag}
                align="center"
                variant="h5"
                sx={{ pt: 1, pb: 2 }}
              >
                {everify
                  ? "Email Verification ✉️"
                  : tftverify
                  ? "Two-Factor Authentication 💬"
                  : "Welcome to DETASAD 👋🏻"}
              </Typography>
              <Typography
                align="center"
                sx={{ color: "#6b6f82" }}
                className={styles.resFontSize}
              >
                {everify ? (
                  <>
                    We&apos;ve send you a verification code message. Please
                    enter the 6-digit code below.
                  </>
                ) : tftverify ? (
                  "Your account is protected with 2FA. We've sent you a verfication code message. Please enter the 6-digit code below."
                ) : (
                  "Please sign-in to your account."
                )}
              </Typography>
              <Box
                onSubmit={handleSubmit(onSubmit)}
                id="login_form"
                component="form"
                autoComplete="off"
                sx={{ mt: 1 }}
              >
                {everify ? (
                  <>
                    <CssTextField
                      disabled
                      margin="normal"
                      fullWidth
                      autoFocus
                      id="outlined-basic"
                      name="email"
                      value={email}
                    />
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 3 }}
                    >
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <CssFormControl
                          margin="normal"
                          fullWidth
                          sx={{ "& input": { textAlign: "center" } }}
                        >
                          <Controller
                            name="otp"
                            control={control}
                            rules={{
                              required: "OTP is required",
                              pattern: {
                                value: /^\d{6}$/,
                                message: "OTP must be a 6-digit number",
                              },
                            }}
                            render={({ field, fieldState }) => (
                              <Box>
                                <MuiOtpInput
                                  display="flex"
                                  gap={1}
                                  className={styles.otpnum}
                                  dividerprops={{ textAlign: "center" }}
                                  TextFieldsProps={{ type: "text" }}
                                  length={6}
                                  value={field.value}
                                  onChange={(newValue) => {
                                    const sanitizedValue = newValue.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                    field.onChange(sanitizedValue);
                                    handleComplete(sanitizedValue);
                                  }}
                                />
                                {fieldState.invalid && (
                                  <FormHelperText
                                    className={styles.errorText}
                                    error
                                  >
                                    {fieldState.error?.message}
                                  </FormHelperText>
                                )}
                              </Box>
                            )}
                          />
                        </CssFormControl>
                      </Grid>
                    </Grid>
                  </>
                ) : tftverify ? (
                  <>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 3 }}
                    >
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <CssFormControl
                          margin="normal"
                          fullWidth
                          sx={{ "& input": { textAlign: "center" } }}
                        >
                          <Controller
                            name="tftotp"
                            control={control}
                            rules={{
                              required: "OTP is required",
                              pattern: {
                                value: /^\d{6}$/,
                                message: "OTP must be a 6-digit number",
                              },
                            }}
                            render={({ field, fieldState }) => (
                              <Box>
                                <MuiOtpInput
                                  display="flex"
                                  gap={1}
                                  className={styles.otpnum}
                                  dividerprops={{ textAlign: "center" }}
                                  TextFieldsProps={{ type: "text" }}
                                  length={6}
                                  value={field.value}
                                  onChange={(newValue) => {
                                    const sanitizedValue = newValue.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                    field.onChange(sanitizedValue);
                                    handleChange(sanitizedValue);
                                  }}
                                />
                                {fieldState.invalid && (
                                  <FormHelperText
                                    error
                                    className={styles.errorText}
                                  >
                                    {fieldState.error?.message}
                                  </FormHelperText>
                                )}
                              </Box>
                            )}
                          />
                        </CssFormControl>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <CssFormControl
                      margin="normal"
                      fullWidth
                      variant="outlined"
                    >
                      <InputLabel htmlFor="email">Email Address</InputLabel>
                      <OutlinedInput
                        id="email"
                        type={"text"}
                        name="email"
                        {...register("email", {})}
                        disabled={isLoading}
                        value={email}
                        onChange={handleEmailChange}
                        error={emailErr}
                        label="Email Address"
                      />
                      {emailErr && (
                        <FormHelperText error className={styles.errorText}>
                          {errorMsg.emailERROR}
                        </FormHelperText>
                      )}
                    </CssFormControl>

                    <CssFormControl
                      margin="normal"
                      fullWidth
                      variant="outlined"
                    >
                      <InputLabel htmlFor="currentPwd">Password</InputLabel>
                      <OutlinedInput
                        onKeyPress={handleKeyPress}
                        id="currentPwd"
                        type={showPassword ? "text" : "password"}
                        name="currentPwd"
                        {...register("currentPwd", {})}
                        disabled={isLoading}
                        value={password}
                        onChange={handlePasswordChange}
                        error={pwdErr}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                      {pwdErr && (
                        <FormHelperText error className={styles.errorText}>
                          {errorMsg.passwordErrorMsg}
                        </FormHelperText>
                      )}
                    </CssFormControl>
                  </>
                )}

                {!everify && !tftverify ? (
                  <>
                    <Grid container className={styles.rememberMeforgotPass}>
                      <Grid item xs>
                        <FormControlLabel
                          sx={{ color: "#6b6f82" }}
                          control={
                            <Checkbox
                              disabled={!email || emailErr}
                              value="remember"
                              checked={rememberMe}
                              onChange={() => handleRememberMe(!rememberMe)}
                              sx={{
                                color: "#6b6f82",
                                "&.Mui-checked": { color: "#6DCCDD" },
                              }}
                            />
                          }
                          label="Remember me"
                        />
                      </Grid>
                      <Grid item>
                        <Link
                          style={{
                            cursor: isLoading ? "not-allowed" : "pointer",
                          }}
                          href={isLoading ? "" : "fpwd"}
                          variant="body3"
                          className={styles.LinkCss}
                        >
                          {"Forgot password ?"}
                        </Link>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}

                <Button
                  disabled={isLoading}
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  className={bCNameLoading}
                  sx={{ mt: 3, mb: 3, color: "#f0ffff !important" }}
                >
                  {everify || tftverify ? (
                    <>
                      {isLoading ? (
                        <>
                          <AutorenewIcon className={styles.loadingBtn} />{" "}
                          Loading...
                        </>
                      ) : (
                        "Verify"
                      )}
                    </>
                  ) : (
                    <>
                      {isLoading ? (
                        <>
                          <AutorenewIcon className={styles.loadingBtn} />{" "}
                          Loading...
                        </>
                      ) : (
                        "LOGIN"
                      )}
                    </>
                  )}
                </Button>

                {everify || tftverify ? (
                  <>
                    <Grid container>
                      <Grid item align="center" xs sx={{ mt: 1 }}>
                        <Button
                          disabled={isLoadingresend}
                          onClick={sendCodeToUser}
                          type="button"
                          variant="body3"
                          className={styles.LinkCss}
                        >
                          {isLoadingresend ? (
                            <>
                              <AutorenewIcon className={styles.loadingBtn} />{" "}
                              Loading...
                            </>
                          ) : (
                            "Resend Code"
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Typography
                      align="center"
                      sx={{ color: "#6b6f82" }}
                      className={styles.resFontSize}
                    >
                      Do not have an account yet ?{" "}
                      <Link
                        style={{
                          cursor: isLoading ? "not-allowed" : "pointer",
                        }}
                        href={isLoading ? "" : "register"}
                        variant="body3"
                        className={styles.LinkCss}
                      >
                        Create an account
                      </Link>
                    </Typography>
                  </>
                )}
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </DccLayout>
  );
}

export default Login;
