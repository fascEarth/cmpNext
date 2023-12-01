import { useState, useEffect } from "react";
import { Buffer } from "buffer";

import Link from "next/link";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
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
import AutorenewIcon from "@mui/icons-material/Autorenew";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import styles from "./index.module.css";
import DccLayout from "../../../components/layouts/dcc/Layout";

import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormHelperText } from "@mui/material";

import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../../../utils/context/authContext";
import { useRouter } from "next/router";

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.8),
  textAlign: "center",
}));

function Register() {
  const [linkEnabled, setlinkEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const [captchaValue, setCaptchaValue] = useState("");

  const [emailErr, setEmailErr] = useState(false);
  const [pwdErr, setPwdErr] = useState(false);
  const [confirmPwdErr, setConfirmPwdErr] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    emailERROR: "",
    passwordERROR: "",
    confirmPasswordError: "",
  });

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset();
  }, [reset]);

  const [accounttype, setaccounttype] = useState("personal");
  const [email, setEmail] = useState("");

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    if (newValue === 1) {
      setaccounttype("legal");
    } else {
      setaccounttype("personal");
    }

    setValue(newValue);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
      setEmailErr(true);
      setErrorMsg({
        ...errorMsg,
        emailERROR: "Please enter a valid email address.",
      });
    } else {
      setEmailErr(false);
      setErrorMsg({
        ...errorMsg,
        emailERROR: "",
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
    if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/.test(
        e.target.value
      )
    ) {
      setPwdErr(true);
      setErrorMsg({
        ...errorMsg,
        passwordERROR:
          "Minimum 8 characters long, number, uppercase & symbol without empty spaces",
      });
    } else {
      setPwdErr(false);
      setErrorMsg({
        ...errorMsg,
        passwordERROR: "",
      });
    }
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
    if (e.target.value != newpassword) {
      setConfirmPwdErr(true);
      setErrorMsg({
        ...errorMsg,
        confirmPasswordError: "confirm password must be same as new password",
      });
    } else {
      setErrorMsg({ ...errorMsg, confirmPasswordError: "" });
      setConfirmPwdErr(false);
    }
  };

  const onSubmit = (data) => {
    data.preventDefault();

    if (
      !email ||
      !email.trim() ||
      !newpassword ||
      !newpassword.trim() ||
      !confirmpassword ||
      !confirmpassword.trim()
    ) {
      setEmailErr(!email && true);
      setPwdErr(!newpassword && true);
      setConfirmPwdErr(!confirmpassword && true);
      setErrorMsg({
        ...errorMsg,
        emailERROR: "Please enter the email",
        passwordERROR: "Please enter the password",
        confirmPasswordError: "Please enter confirm password",
      });
      return;
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/.test(
        newpassword
      )
    ) {
      setPwdErr(true);
      setErrorMsg({
        ...errorMsg,
        passwordERROR:
          "Minimum 8 characters long, number, uppercase & symbol without empty spaces",
      });
      return;
    } else if (newpassword != confirmpassword) {
      setConfirmPwdErr(true);
      setErrorMsg({
        ...errorMsg,
        confirmPasswordError: "confirm password must be same as new password",
      });
      return;
    } else {
      setConfirmPwdErr(false);
      setErrorMsg({
        ...errorMsg,
        confirmPasswordError: "",
      });
    }
    if (!emailErr && !pwdErr && !confirmPwdErr && !isCaptchaValid) {
      setConfirmPwdErr(false);
      toast.error("Kindly complete the captcha!");
    }
    if (
      !emailErr &&
      !pwdErr &&
      !confirmPwdErr &&
      isCaptchaValid &&
      newpassword === confirmpassword
    ) {
      setConfirmPwdErr(false);
      setIsLoading(true);
      setlinkEnabled(true);
      handleFinal();
    }
  };
  async function handleFinal() {
    const npwd = Buffer.from(newpassword).toString("base64");
    const newData = {
      email_id: email,
      password: npwd,
      account_type: accounttype,
      social_login: "0",
    };
    const finalData = { data: newData, endPoint: "registerUser" };
    try {
      const { data } = await axios.post("/api/dcc/register", finalData);

      if (data.status_code == "200") {
        const sdata = {
          email: email,
          pwd: newpassword,
          account_type: accounttype,
          social_login: "0",
          tenant_id: data.tenant_id,
          user_serial_id: data.user_serial_id,
          completed_stepper: "2",
          payment_card_status: "",
          legal_status: false,
          email_verify: false,
          sms_verify: false,
        };

        Cookies.set("userData", JSON.stringify(sdata));

        const user = { name: "signup", role: "signupadmin" };
        Cookies.set("userRole", JSON.stringify(user));
        login(user);
        router.replace("/signup");

        toast.success("Signup successful");
      } else {
        setIsLoading(false);
        setlinkEnabled(false);
        toast.error("Error: " + data.status_code + " " + data.status_msg);
      }
    } catch (error) {
      setIsLoading(false);
      setlinkEnabled(false);
      toast.error("An error occurred");
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
                Create your account 🚀
              </Typography>
              <Box sx={{ width: "100%", mt: 1 }}>
                <Box className={styles.tabContainer}>
                  <Tabs
                    className={styles.tabs}
                    value={value}
                    onChange={handleChange}
                    aria-label="tabs"
                    sx={{
                      minHeight: "39px",
                      "& .MuiTabs-indicator": { display: "none" },
                      "& .MuiTab-root.Mui-selected": {
                        color: "#fff !important",
                        backgroundColor: "#015578",
                      },
                    }}
                  >
                    <Tab
                      className={styles.tabFirst}
                      label="Personal"
                      {...a11yProps(0)}
                    />
                    <Tab
                      className={styles.tabSecond}
                      label="Legal Entity"
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </Box>
                <Box
                  onSubmit={(e) => onSubmit(e)}
                  id="register_form"
                  component="form"
                  autoComplete="off"
                  sx={{ mt: 1 }}
                >
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

                  <CssFormControl margin="normal" fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-newpassword">
                      New Password
                    </InputLabel>
                    <OutlinedInput
                      onKeyPress={handleKeyPress}
                      name="newpassword"
                      label="New Password"
                      {...register("newpassword", {})}
                      disabled={isLoading}
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
                      error={pwdErr ? true : false}
                    />

                    {pwdErr && (
                      <FormHelperText className={styles.errorText} error>
                        {errorMsg.passwordERROR}
                      </FormHelperText>
                    )}
                  </CssFormControl>

                  <CssFormControl margin="normal" fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-confirmpassword">
                      Confirm New Password
                    </InputLabel>
                    <OutlinedInput
                      onKeyPress={handleKeyPress}
                      name="confirmpassword"
                      label="Confirm New Password"
                      {...register("confirmpassword", {})}
                      disabled={isLoading}
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
                      error={confirmPwdErr}
                    />

                    {confirmPwdErr && (
                      <FormHelperText className={styles.errorText} error>
                        {errorMsg.confirmPasswordError}
                      </FormHelperText>
                    )}
                  </CssFormControl>

                  <ReCAPTCHA
                    className={styles.recaptcha}
                    data-next="6Lc5io4hAAAAAKpevcsm1gYAMOrL_iR4uGOl76KO"
                    sitekey="6Lebb2EmAAAAAFPI0ugSO5C7tRaRvfiuro_36g54"
                    //sitekey="6LdbqRMmAAAAAN8ooj6Sk5HP_yoVDtgVwGVxfPh7"
                    onChange={(value) => {
                      handleCaptchaChange(value);
                      setIsCaptchaValid(true);
                    }}
                    onExpired={() => setIsCaptchaValid(false)}
                  />

                  <Button
                    disabled={isLoading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    className={styles.registerBtn}
                    sx={{ mt: 3, mb: 2, color: "#f0ffff !important" }}
                  >
                    {isLoading ? (
                      <>
                        <AutorenewIcon className={styles.loadingBtn} />{" "}
                        Loading...
                      </>
                    ) : (
                      "CREATE ACCOUNT"
                    )}
                  </Button>
                  <Grid item align="center">
                    <FormControlLabel
                      className={styles.resFontSize}
                      sx={{ color: "#6b6f82" }}
                      control={
                        <Checkbox
                          checked={true}
                          disabled
                          value="remember"
                          sx={{
                            color: "#6b6f82",
                            "&.Mui-checked": { color: "#6DCCDD" },
                          }}
                        />
                      }
                      label="I agree to the DETASAD Cloud"
                    />
                  </Grid>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 0, sm: 1, md: 1, lg: 1, xl: 2 }}
                    sx={{ mt: { sm: 2 }, mb: { xs: "3px", sm: 2 } }}
                    justifyContent="center"
                    alignItems="center"
                    divider={<Divider orientation="vertical" flexItem />}
                  >
                    <Item sx={{ boxShadow: "none" }}>
                      {!linkEnabled ? (
                        <Link
                          href="/dcc/policy?type=privacy"
                          variant="body3"
                          className={styles.LinkCss}
                        >
                          Privacy Policy
                        </Link>
                      ) : (
                        <Box
                          className={`${styles.LinkCss} disabled`}
                          sx={{ cursor: "not-allowed" }}
                        >
                          Privacy Policy
                        </Box>
                      )}
                    </Item>
                    <Item sx={{ boxShadow: "none" }}>
                      {!linkEnabled ? (
                        <Link
                          href="/dcc/policy?type=terms"
                          variant="body3"
                          className={styles.LinkCss}
                        >
                          Terms of Use
                        </Link>
                      ) : (
                        <Box
                          className={`${styles.LinkCss} disabled`}
                          sx={{ cursor: "not-allowed" }}
                        >
                          Terms of Use
                        </Box>
                      )}
                    </Item>
                    <Item sx={{ boxShadow: "none" }}>
                      {!linkEnabled ? (
                        <Link
                          href="/dcc/policy?type=cookie"
                          variant="body3"
                          className={styles.LinkCss}
                        >
                          Cookie Policy
                        </Link>
                      ) : (
                        <Box
                          className={`${styles.LinkCss} disabled`}
                          sx={{ cursor: "not-allowed" }}
                        >
                          Cookie Policy
                        </Box>
                      )}
                    </Item>
                  </Stack>
                  <Typography align="center" sx={{ color: "#6b6f82" }}>
                    Already have an account ?{" "}
                    {!linkEnabled ? (
                      <Link
                        href="login"
                        variant="body3"
                        className={styles.LinkCss}
                      >
                        Login
                      </Link>
                    ) : (
                      <Box
                        className={`${styles.LinkCss} disabled`}
                        sx={{ cursor: "not-allowed" }}
                      >
                        Login
                      </Box>
                    )}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </DccLayout>
  );
}

export default Register;
