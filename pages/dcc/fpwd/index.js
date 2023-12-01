import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Buffer } from "buffer";

import Link from "next/link";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import styles from "./index.module.css";
import DccLayout from "../../../components/layouts/dcc/Layout";
import { MuiOtpInput } from "mui-one-time-password-input";

import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormHelperText } from "@mui/material";

import axios from "axios";

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

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [resetPwd, setResetPwd] = useState(false);
  const [allowotp, setAllowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  // TR 01
  const handleComplete = (newValue) => {
    const sanitizedValue = newValue.replace(/[^0-9]/g, "");
    setOtp(sanitizedValue);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  useEffect(() => {
    reset();
  }, [reset]);

  const [emailErr, setEmailErr] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    emailERROR: "",
  });
  const [newPwErr, setNewPwErr] = useState(false);
  const [confirmNewPwErr, setconfirmNewPwErr] = useState(false);
  const [errMsg, seterrMsg] = useState({ confirmNewPwErr: "", newPwErr: "" });
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value.toLowerCase());
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
      setEmailErr(true);
      setErrorMsg({ ...errorMsg, emailERROR: "Please enter the valid email" });
    } else {
      setEmailErr(false);
      setErrorMsg({ ...errorMsg, emailERROR: "" });
    }
  };
  const validateConfirmPwAndnewPwEqual = (value) => {
    if (value === confirmpassword) {
      errors.confirmpassword = false;
      setconfirmNewPwErr(false);
    } else if (confirmpassword !== "") {
      errors.confirmpassword = true;
      setconfirmNewPwErr(true);
      seterrMsg({
        ...errMsg,
        confirmNewPwErr: "confirm password must be same as password",
      });
    }
  };
  const validateNewPW = (value) => {
    const REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?!.*\s).{8,16}$/;
    if (value) {
      validateConfirmPwAndnewPwEqual(value);
      if (!REGEX.test(value)) {
        setNewPwErr(true);
        seterrMsg({
          ...errMsg,
          newPwErr:
            "Minimum 8 characters long, number, uppercase & symbol without empty spaces.",
        });
      } else {
        errors.newpassword = false;
        setNewPwErr(false);
      }
    } else if (value.length == 0) {
      errors.newpassword = true;
      setNewPwErr(true);
      seterrMsg({ ...errMsg, newPwErr: "New Password is required" });
    } else if (value.length == 0 && confirmpassword !== "") {
      errors.confirmpassword = true;
      setconfirmNewPwErr(true);
      seterrMsg({
        ...errMsg,
        confirmNewPwErr: "confirm password must be same as password",
      });
    }
  };
  const validateConfirmNewPW = (value) => {
    const REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?!.*\s).{8,16}$/;
    if (value) {
      if (!REGEX.test(value) || newpassword !== value) {
        setconfirmNewPwErr(true);
        seterrMsg({
          ...errMsg,
          confirmNewPwErr: "confirm password must be same as password",
        });
      } else {
        errors.confirmpassword = false;
        setconfirmNewPwErr(false);
      }
    } else if (value.length == 0) {
      if (newpassword == "") {
        errors.confirmpassword = true;
        setconfirmNewPwErr(true);
        seterrMsg({
          ...errMsg,
          confirmNewPwErr: "confirm password must be same as password",
        });
      }
      errors.confirmpassword = true;
      setconfirmNewPwErr(true);
      seterrMsg({
        ...errMsg,
        confirmNewPwErr: "Confirm New Password is required",
      });
    }
  };

  const [newpassword, setNewPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    validateNewPW(e.target.value);
  };

  const [confirmpassword, setConfirmPassword] = useState("");

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validateConfirmNewPW(e.target.value);
  };
  const onSubmit = (data) => {
    if (!email || !email.trim()) {
      setEmailErr(!email && true);

      setErrorMsg({
        ...errorMsg,
        emailERROR: "Please enter the email",
      });
      return;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailErr(true);
      setErrorMsg({ ...errorMsg, emailERROR: "Please enter valid email" });
      return;
    }
    if (allowotp) {
      if (resetPwd) {
        setIsLoading(true);
        setConfirmPassword(data.confirmpassword);
        setNewPassword(data.newpassword);
        resetPwdUser();
      } else {
        setIsLoading(true);
        setOtp(data.otp);
        verifyTokenpwd();
      }
    } else {
      setIsLoading(true);
      setEmail(data.email);
      sendTokenFpwd();
    }
  };
  async function resetPwdUser() {
    const npwd = Buffer.from(newpassword).toString("base64");
    const newData = { reset_password: { email_id: email, new_password: npwd } };
    const finalData = { data: newData, endPoint: "resetPwdUser" };
    try {
      const { data } = await axios.post("/api/dcc/fpwd", finalData);

      if (data.status_code == "1000") {
        toast.success("Password reset successfully!");

        setTimeout(() => {
          router.replace("/dcc/login");
        }, 5000);
      } else if (data.status_code == "1001") {
        setIsLoading(false);
        toast.error("Error: " + data.message);
      } else {
        setIsLoading(false);
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred");
    }
  }
  async function verifyTokenpwd() {
    const newData = { email: { email_id: email, token: otp } };
    const finalData = { data: newData, endPoint: "verifyUserCode" };
    try {
      const { data } = await axios.post("/api/dcc/fpwd", finalData);

      if (data.status_code == "602") {
        setIsLoading(false);
        setResetPwd(true);
        toast.success("OTP token verified successfully");
      } else if (data.status_code == "603") {
        setIsLoading(false);
        toast.error("Entered verification code is wrong");
      } else {
        setIsLoading(false);
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred");
    }
  }

  // TR 01
  const [resendLoading, setResendLoading] = useState(false);
  async function sendTokenFpwd() {
    setResendLoading(true);
    const newData = {
      email_id: email,
      mobile_no: "",
      reset_password: true,
      type: "fpwd",
    };
    const finalData = { data: newData, endPoint: "sendCodeToUser" };
    try {
      const { data } = await axios.post("/api/dcc/fpwd", finalData);

      if (data.status_code == "612") {
        setIsLoading(false);
        setAllowOtp(true);
        toast.success(" OTP token sent successfully");
      } else if (data.status_code == "614") {
        setIsLoading(false);
        toast.error("Invalid Account");
      } else {
        setIsLoading(false);
        toast.error("Error: " + data.message);
      }
      setResendLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred");
      setResendLoading(false);
    }
  }
  const handleKeyPress = (e) => {
    if (e.charCode === 32) {
      e.preventDefault();
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
                className={styles.headingTag}
                component="h4"
                align="center"
                variant="h5"
                sx={{ pt: 1, pb: 2 }}
              >
                Forgot your password ? 🔒
              </Typography>
              <Typography
                className={styles.fpwdDescription}
                align="left"
                sx={{ color: "#6b6f82" }}
              >
                Enter your email address that you used to register. We&apos;ll
                send you an email with a link to reset your password.
              </Typography>
              <Box
                onSubmit={handleSubmit(onSubmit)}
                id="fpwd_form"
                component="form"
                autoComplete="off"
                sx={{ mt: 1 }}
              >
                {allowotp ? (
                  <CssTextField
                    margin="normal"
                    fullWidth
                    autoFocus
                    id="outlined-basic"
                    disabled={true}
                    value={email}
                    label="Email Address"
                  />
                ) : (
                  <CssFormControl margin="normal" fullWidth variant="outlined">
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
                )}

                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 3 }}
                >
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    {resetPwd ? (
                      <>
                        <CssFormControl
                          margin="normal"
                          fullWidth
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-newpassword">
                            New Password
                          </InputLabel>
                          <OutlinedInput
                            onKeyPress={handleKeyPress}
                            name="newpassword"
                            label="New Password"
                            {...register("newpassword", {
                              required: "New Password is required",
                              pattern: {
                                value:
                                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?!.*\s).{8,16}$/,
                                message:
                                  "Minimum 8 characters long, number, uppercase & symbol without empty spaces.",
                              },
                            })}
                            value={newpassword}
                            onChange={handleNewPasswordChange}
                            id="outlined-adornment-newpassword"
                            type={showNewPassword ? "text" : "password"}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowNewPassword}
                                  onMouseDown={handleMouseDownNewPassword}
                                  edge="end"
                                >
                                  {showNewPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            error={errors.newpassword ? true : false}
                          />

                          {newPwErr ? (
                            <FormHelperText error className={styles.errorText}>
                              {errMsg.newPwErr}
                            </FormHelperText>
                          ) : (
                            errors.newpassword && (
                              <FormHelperText error>
                                {errors.newpassword.message}
                              </FormHelperText>
                            )
                          )}
                        </CssFormControl>

                        <CssFormControl
                          margin="normal"
                          fullWidth
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-confirmpassword">
                            Confirm New Password
                          </InputLabel>
                          <OutlinedInput
                            onKeyPress={handleKeyPress}
                            name="confirmpassword"
                            label="Confirm New Password"
                            {...register("confirmpassword", {
                              required: "Confirm New Password is required",
                              pattern: {
                                value:
                                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?!.*\s).{8,16}$/,
                                message:
                                  "confirm password must be same as password",
                              },
                              validate: (value) =>
                                value === newpassword ||
                                "Passwords do not match",
                            })}
                            value={confirmpassword}
                            onChange={handleConfirmPasswordChange}
                            id="outlined-adornment-confirmpassword"
                            type={showConfirmPassword ? "text" : "password"}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowConfirmPassword}
                                  onMouseDown={handleMouseDownConfirmPassword}
                                  edge="end"
                                >
                                  {showConfirmPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            error={errors.confirmpassword ? true : false}
                          />

                          {confirmNewPwErr ? (
                            <FormHelperText error className={styles.errorText}>
                              {errMsg.confirmNewPwErr}
                            </FormHelperText>
                          ) : (
                            errors.confirmpassword && (
                              <FormHelperText error>
                                {errors?.confirmpassword?.message}
                              </FormHelperText>
                            )
                          )}
                        </CssFormControl>
                      </>
                    ) : (
                      <>
                        {allowotp && (
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
                                      handleComplete(newValue);
                                    }}
                                  />
                                  {fieldState.invalid && (
                                    <FormHelperText error>
                                      {fieldState.error?.message}
                                    </FormHelperText>
                                  )}
                                </Box>
                              )}
                            />
                          </CssFormControl>
                        )}
                      </>
                    )}
                  </Grid>
                </Grid>
                <Button
                  disabled={isLoading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  className={styles.forgotpasswordBtn}
                  sx={{ mt: 3, mb: 2, color: "#f0ffff !important" }}
                >
                  {allowotp ? (
                    <>
                      {resetPwd ? (
                        <>
                          {isLoading ? (
                            <>
                              <AutorenewIcon className={styles.loadingBtn} />{" "}
                              Loading...
                            </>
                          ) : (
                            "Submit"
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
                            "Verify"
                          )}
                        </>
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
                        "Send Verification Code"
                      )}
                    </>
                  )}
                </Button>

                {/* TR 01 */}
                {allowotp && !resetPwd ? (
                  <Button
                    disabled={resendLoading}
                    onClick={() => sendTokenFpwd()}
                    fullWidth
                    variant="contained"
                    size="large"
                    className={styles.forgotpasswordBtn}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {" "}
                    Resend OTP
                  </Button>
                ) : (
                  ""
                )}
                <Grid container className={styles.LoginRegisterLink}>
                  <Grid item xs sx={{ mt: 1 }}>
                    <Link
                      href="login"
                      variant="body3"
                      className={styles.LinkCss}
                    >
                      {"Back to login"}
                    </Link>
                  </Grid>
                  <Grid item sx={{ mt: 1 }}>
                    <Link
                      href="register"
                      variant="body3"
                      className={styles.LinkCss}
                    >
                      {"Create your account"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </DccLayout>
  );
}

export default ForgotPassword;
