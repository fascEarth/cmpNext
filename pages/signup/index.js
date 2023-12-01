// ** React Imports
import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { useAuth } from "../../utils/context/authContext";

// ** Next Import

// ** MUI Components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import { MuiOtpInput } from "mui-one-time-password-input";

// ** Icons Imports
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

// ** Custom Style Imports
import "react-credit-cards-2/dist/es/styles-compiled.css";
import istyles from "./index.module.css";

import StepperCustomDot from "../../components/tools/stepper/steppercustom.js";
import StepperWrapper from "../../components/tools/stepper/steppertheme.js";

import { useForm, Controller } from "react-hook-form";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
} from "@mui/material";

import axios from "axios";
import { useRouter } from "next/router";

import devStyles from "./developer.module.css";
import PersonalOrgInfoSubmit from "../../components/pages/signup/personalOrgInfo";
import PaymentMethodsSubmit from "../../components/pages/signup/paymentMethods";
import { useClientIP } from "../../utils/context/ClientIPContext.js";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

// ** Linear Progress
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 20,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#F2F2F2",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundImage: "linear-gradient(45deg, #015578, #01557800) !important",
  },
}));

const styles = {
  ...istyles,
  ...devStyles,
};

// ** Header Menu Styles
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 7,
    marginTop: theme.spacing(1),
    minWidth: 130,
    color: "#000",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 10px 15px -3px, rgba(0, 0, 0, 0.02) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "10px 0",
    },
  },
  "& .MuiMenuItem-root": {
    "& .MuiSvgIcon-root": {
      fontSize: 22,
      color: "#757575",
      marginRight: theme.spacing(1.5),
    },
  },
}));

// TextField Custom Style
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

// FormControl Custom Style
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

//** Steeper
const steps = [
  {
    title: "Account Creation",
  },
  {
    title: "Contact Validation",
  },
  {
    title: "Personal / Org Information",
  },
  {
    title: "Payment Methods",
  },
  {
    title: "Submit",
  },
];

function Signup() {
  const { clientIP } = useClientIP();
  const router = useRouter();
  // START Header Account Dropdown function
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [logOutModal, setLogOutModal] = useState(false);
  const { logout } = useAuth();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogoutModalOpen = (event) => {
    setLogOutModal(true);
    setAnchorEl(null);
  };
  const handleLogoutModalClose = (event) => {
    setLogOutModal(false);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <StyledMenu
      sx={{ top: "52px" }}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose} sx={{ color: "#757575" }}>
        <Person2OutlinedIcon /> Profile
      </MenuItem> */}
      <MenuItem onClick={handleLogoutModalOpen} sx={{ color: "#757575" }}>
        <LogoutOutlinedIcon /> Logout
      </MenuItem>
      <Dialog
        open={logOutModal}
        onClose={handleLogoutModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to Log out?
        </DialogTitle>
        <DialogContent
          sx={{
            width: { lg: "500px", xs: "100%", sm: "100%", md: "500px" },
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{ marginBottom: "40px" }}
          ></DialogContentText>
          {/* <DialogContentText id="alert-dialog-description">
            Are you sure you want to Log out?
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#26c6da" }} onClick={handleLogoutModalClose}>
            Cancel
          </Button>
          <Button
            sx={{
              backgroundImage: "linear-gradient(45deg, #0288d1, #26c6da)",
            }}
            onClick={logoutSurHead}
            autoFocus
            variant="contained"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </StyledMenu>
  );
  // END Header Account Dropdown function

  // OTP Function
  const [otpmobile, setmobileOtp] = useState("");
  const handleOtpmobileChange = (newValue) => {
    setmobileOtp(newValue);
  };

  // Stepper Function
  // ** States
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [cachedInfo, setcachedInfo] = useState({});
  const cookies = Cookies.get("userData");
  const [paymentDone, setpaymentDone] = useState(false);
  const [commonProStatus, setcommonProStatus] = useState(false);

  const onSubmit = () => {
    setActiveStep(activeStep + 1);
  };

  const renderContent = () => {
    return getStepContent(activeStep);
  };

  useEffect(() => {
    Cookies.set("userData", JSON.stringify(cachedInfo));
  }, [cachedInfo]);

  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : false;

    if (cachData) {
      if (cachData.legal_status) {
        setcommonLegalStatus(cachData.legal_status);
      }
      if (cachData.tenant_active_status) {
        setcommonProStatus(true);
      }

      setcachedInfo(cachData);
      setcvEmail(cachData.email);
      const steppeNum = Number(cachData.completed_stepper) - 1;

      if (cachData && steppeNum == 1) {
        getContValid(cachData);
      } else if (cachData && steppeNum == 2) {
        // write code for step 2
      } else if (cachData && steppeNum == 3) {
        // write code for step 3
      } else if (cachData && steppeNum == 4) {
        setpaymentDone(true);
        callFinProvision();
      }
      setActiveStep(steppeNum);
    }
  }, []);

  async function logoutSurHead() {
    Cookies.remove("userRole");
    logout();
    const newData = {
      userName: cachedInfo.email,
      accessToken: cachedInfo.accessToken,
      social_login: "0",
    };
    const finalData = { data: newData, endPoint: "logoutUser" };
    try {
      const { data } = await axios.post("/api/logout", finalData); // call the new API route
      if (data.status_code == "700" || data.status_code == "701") {
        //Cookies.remove("userRole");
        //logout();
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  }

  const [commonLegalStatus, setcommonLegalStatus] = useState(false);
  const handlecommonLegalStatusChange = (newVariable) => {
    setcommonLegalStatus(newVariable);
  };
  const handlepaymentDone = (newVariable) => {
    setpaymentDone(newVariable);
  };

  const getContValid = async (cookieValue) => {
    if (cookieValue.email_verify) {
      setcvEmailshowVerified(true);
    }
    if (cookieValue.sms_verify) {
      setcvMobshowVerified(true);
    }
  };

  const formcvEmailMethods = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = formcvEmailMethods;

  const formcvMobMethods = useForm();
  const {
    register: registercvmob,
    handleSubmit: handleSubmitcvmob,
    formState: { errors: errorscvmob },
    reset: resetcvmob,
    control: controlcvmob,
  } = formcvMobMethods;

  const [otp, setOtp] = useState("");
  const handleComplete = (newValue) => {
    const sanitizedValue = newValue.replace(/[^0-9]/g, ""); // TR 01
    setOtp(sanitizedValue);
  };

  const [cvEmail, setcvEmail] = useState("");
  const [cvMob, setcvMob] = useState("");

  const [cvEmailshowVerified, setcvEmailshowVerified] = useState(false);
  const [cvMobshowVerified, setcvMobshowVerified] = useState(false);
  async function precallFinProvision() {
    const cookies = Cookies.get("userData");
    const cachData = cookies ? JSON.parse(cookies) : false;

    cachData.completed_stepper = 5;
    Cookies.set("userData", JSON.stringify(cachData));
    setActiveStep(activeStep + 1);
    callFinalReqPro();
    callFinProvision();
  }

  const [ccfinalPerc, setccfinalPerc] = useState(0);
  const [ccfinalPercNum, setccfinalPercNum] = useState(1);
  const [ccfinalMsg, setccfinalMsg] = useState("-");

  const [shouldCallFinProvision, setShouldCallFinProvision] = useState(true);
  useEffect(() => {
    // Cleanup function to stop further calls when the component unmounts
    return () => setShouldCallFinProvision(false);
  }, []);

  async function callFinalReqPro() {
    if (!shouldCallFinProvision) {
      // Do not continue calling when shouldCallFinProvision is false
      return;
    }
    const cachedInfo = JSON.parse(cookies);
    const finalData = {
      data: [],
      tenantId: cachedInfo.tenant_id,
      userSerialId: cachedInfo.user_serial_id,
      endPoint: "reqprofinalProvisioning",
      token: cachedInfo.accessToken,
      ipaddress: clientIP,
    };
    try {
      const { data } = await axios.post("/api/signup", finalData); // call the new API route

      if (data.status === "ok") {
      }
    } catch (error) {
      //toast.error('An error occurred');
    }
  }
  async function callFinProvision() {
    if (!shouldCallFinProvision) {
      // Do not continue calling when shouldCallFinProvision is false
      return;
    }
    const cachedInfo = JSON.parse(cookies);
    const finalData = {
      data: [],
      tenantId: cachedInfo.tenant_id,
      userSerialId: cachedInfo.user_serial_id,
      endPoint: "finalProvisioning",
      token: cachedInfo.accessToken,
      ipaddress: clientIP,
    };
    try {
      const { data } = await axios.post("/api/signup", finalData); // call the new API route

      if (data.status === "ok") {
        if (data.message.tenantActiveStatus === true) {
          setcommonProStatus(true);
        } else {
          setccfinalMsg(data.message.currentMsg);
          setccfinalPerc(parseInt(data.message.percentage));
          const pf = parseInt(data.message.percentage);
          let cnum = 1;
          if (pf > 10) {
            cnum = pf / 10;
          }
          setccfinalPercNum(cnum);
          const timeoutId = setTimeout(() => {
            callFinProvision();
          }, 30000);

          // Cleanup function to clear the timeout when the component unmounts
          return () => clearTimeout(timeoutId);
        }
      } else {
        /* setTimeout(() => {      
          callFinProvision();
        },40000);*/
      }
    } catch (error) {
      //toast.error('An error occurred');
    }
  }
  async function cvresendtokenEmail() {
    setIsEmailLoading(false);
    const newData = {
      email_id: cvEmail,
      mobile_no: "",
      reset_password: false,
      type: "signupEmail",
    };
    const finalData = { data: newData, endPoint: "resendUserToken" };
    try {
      const { data } = await axios.post("/api/signup", finalData); // call the new API route
      // toast.success("Token sent");
      if (data.status_code == "612") {
        toast.success("Token sent");
      } else {
        // console.error("Error: " + data.status_code + " " + data.status_msg);
      }
    } catch (error) {
      //toast.error('An error occurred');
    }
  }
  const [isEmailLoaading, setIsEmailLoading] = useState(false); // TR Email verift loading
  const [myDisabled, setMyDisable] = useState(true);
  const oncvEmailSubmit = async (data) => {
    setIsEmailLoading(true);
    const newData = { email: { email_id: cvEmail, token: otp } };
    const finalData = { data: newData, endPoint: "verifyUserToken" };
    try {
      const { data } = await axios.post("/api/signup", finalData); // call the new API route
      if (data.status_code == "602") {
        setcvEmailshowVerified(true);
        const cookies = Cookies.get("userData");
        const cachData = cookies ? JSON.parse(cookies) : false;

        setcachedInfo((prevUserData) => ({
          ...prevUserData,
          email_verify: true,
          completed_stepper: cvMobshowVerified
            ? 3
            : prevUserData.completed_stepper,
        }));

        toast.success("E-mail verification successful");
      } else if (data.status_code == "603") {
        toast.error("Invalid OTP, email verification failed");
      } else if (data.status_code == "604") {
        toast.error("OTP has been Expired.");
      } else {
        toast.error("Error: " + data.status_code + " " + data.status_msg);
      }
      setIsEmailLoading(false);
    } catch (error) {
      setIsEmailLoading(false);
      //toast.error('An error occurred');
    }
  };

  const [cvMobSbt, setcvMobSbt] = useState(false);
  const [cvmobresendBtn, setcvmobresendBtn] = useState(false);
  async function cvresendtokenMob() {
    setMyDisable(false);
    const newData = {
      email_id: cvEmail,
      mobile_no: "+966" + cvMob,
      reset_password: false,
      type: "signupMobile",
    };
    const finalData = { data: newData, endPoint: "resendUserToken" };
    try {
      const { data } = await axios.post("/api/signup", finalData); // call the new API route
      toast.success("Token sent");
      if (data.status_code == "200") {
        toast.success("Token sent");
      } else {
        // console.error("Error: " + data.status_code + " " + data.status_msg);
      }
    } catch (error) {
      //toast.error('An error occurred');
    }
  }

  const oncvMobileSubmit = async (data) => {
    setMyDisable(true);
    if (cvMobSbt) {
      setcvmobresendBtn(true);
      cvresendtokenMob();
    } else {
      const newData = {
        sms: {
          email_id: cvEmail,
          mobile_no: "+966" + cvMob,
          token: otpmobile,
          mfa_status: false,
          user_serial_id: cachedInfo.user_serial_id,
          security_enabled: false,
        },
      };
      const finalData = { data: newData, endPoint: "verifyUserToken" };
      try {
        const { data } = await axios.post("/api/signup", finalData); // call the new API route
        if (data.status_code == "600") {
          setcvMobshowVerified(true);
          const cookies = Cookies.get("userData");
          const cachData = cookies ? JSON.parse(cookies) : false;

          setcachedInfo((prevUserData) => ({
            ...prevUserData,
            sms_verify: true,
            mobile_no: cvMob,
            completed_stepper: cvEmailshowVerified
              ? 3
              : prevUserData.completed_stepper,
          }));

          toast.success("Mobile number verification successful");
        } else if (data.status_code == "603") {
          toast.error("Mobile number is already registered.");
        } else if (data.status_code == "605") {
          toast.error("Invalid OTP, Mobile number verification failed");
        } else if (data.status_code == "601") {
          toast.error("OTP has been expired");
        } else {
          toast.error("Error: " + data.status_code + " " + data.status_msg);
        }
        setMyDisable(false);
      } catch (error) {
        //toast.error('An error occurred');
        setMyDisable(false);
      }
    }
  };

  const [allowPOIcsbt, setallowPOIcsbt] = useState(false);
  const handleallowPOIcsbtChange = (newVariable) => {
    setallowPOIcsbt(newVariable);
  };

  const [inputErrors, setInputErrors] = useState("");
  const [inputErrorsStatus, setInputErrorsStatus] = useState(false);
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue == "" || selectedValue == null) {
      errorscvmob.mobile = false;
      setInputErrorsStatus(true);
      setInputErrors("Mobile number required");
    } else if (selectedValue.length < 9) {
      errorscvmob.mobile = false;
      setInputErrorsStatus(true);
      setInputErrors("Mobile number must below 9 characters");
    } else if (selectedValue.length > 9) {
      errorscvmob.mobile = false;
      setInputErrorsStatus(true);
      setInputErrors("Mobile number should not exceed 9 character");
    } else {
      errorscvmob.mobile = false;
      setInputErrorsStatus(false);
      setInputErrors("");
    }

    setcvMob(selectedValue);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Container maxWidth="xl" component="main">
            <Card variant="outlined" sx={{ mb: 3, borderRadius: "7px" }}>
              <CardContent>
                <Skeleton
                  animation="wave"
                  variant="text"
                  width="50%"
                  height={40}
                />
                <Skeleton animation="wave" variant="rectangular" height={200} />
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,
                  }}
                >
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={100}
                    height={40}
                  />
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={100}
                    height={40}
                  />
                </Grid>
              </CardContent>
            </Card>
          </Container>
        );
      case 1:
        return (
          <Container maxWidth="xl" component="main">
            <Card variant="outlined" sx={{ mb: 3, borderRadius: "7px" }}>
              <CardContent>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Typography
                    component="h4"
                    variant="h6"
                    align="center"
                    className={styles.contactHeading}
                  >
                    Please confirm your email address & phone number.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    component="p"
                    align="center"
                    className={styles.contactP}
                  >
                    We sent 6-digit verification code to following contact.
                  </Typography>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  rowSpacing={1}
                  spacing={2}
                >
                  <Grid item xs={12} sx={{ mt: 3 }}>
                    <Grid container direction="row" rowSpacing={1} spacing={0}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        className={`${styles.rowp} ${styles.mailBorderRight}`}
                      >
                        <Box
                          component="img"
                          align="center"
                          width={80}
                          height={80}
                          className={styles.mailIcon}
                          alt="mail"
                          src="/images/pages/signup/mail.png"
                        />
                        <Box
                          onSubmit={handleSubmit(oncvEmailSubmit)}
                          id="cvemailsubmit_form"
                          component="form"
                          autoComplete="off"
                          sx={{ mt: 1 }}
                        >
                          <CssTextField
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address",
                              },
                            })}
                            value={cvEmail}
                            onChange={(e) => setcvEmail(e.target.value)}
                            margin="normal"
                            autoFocus
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            error={errors.email ? true : false}
                            InputProps={{
                              readOnly: true, // Add this line to make the text field read-only
                            }}
                          />
                          {errors.email && (
                            <FormHelperText error>
                              {errors.email.message}
                            </FormHelperText>
                          )}
                          <Typography
                            align="left"
                            className={styles.verifiLabel}
                          >
                            Enter Verification Code
                          </Typography>
                          <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{
                              xs: 1,
                              sm: 1,
                              md: 1,
                              lg: 2,
                              xl: 3,
                            }}
                          >
                            <Grid item xs={12}>
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
                                      value: /^[0-9]{6}$/,
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
                                        TextFieldsProps={{
                                          disabled: cvEmailshowVerified
                                            ? true
                                            : false,
                                          type: "text",
                                        }}
                                        length={6}
                                        value={
                                          cvEmailshowVerified
                                            ? "******"
                                            : field.value
                                        }
                                        onChange={(newValue) => {
                                          const sanitizedValue =
                                            newValue.replace(/[^0-9]/g, ""); //TR 01
                                          field.onChange(sanitizedValue); // Manually trigger the field's onChange event
                                          handleComplete(newValue); // Call your handleComplete function
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
                            </Grid>

                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={6}
                              lg={6}
                              xl={6}
                              sx={{ mt: 2, pb: 3 }}
                            >
                              {!cvEmailshowVerified && (
                                <>
                                  <Button
                                    onClick={cvresendtokenEmail}
                                    type="button"
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    className={styles.commonBtn}
                                  >
                                    Resend Code
                                  </Button>
                                </>
                              )}
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={6}
                              lg={6}
                              xl={6}
                              sx={{ mt: 2, pb: 3 }}
                            >
                              {!cvEmailshowVerified && (
                                <>
                                  <Button
                                    disabled={isEmailLoaading}
                                    type="submit"
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    className={
                                      isEmailLoaading ? "" : styles.commonBtn
                                    }
                                    sx={{
                                      "&.MuiButtonBase-root": {
                                        backgroundColor: "unset",
                                      },
                                      "&.MuiButtonBase-root.Mui-disabled": {
                                        backgroundColor: "rgba(0, 0, 0, 0.12)",
                                      },
                                    }}
                                  >
                                    Verify
                                  </Button>
                                </>
                              )}
                            </Grid>
                            {cvEmailshowVerified && (
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Box
                                  component="img"
                                  align="center"
                                  width={60}
                                  height={60}
                                  className={styles.mailIcon}
                                  alt="mail"
                                  src="/images/pages/signup/verify.png"
                                />
                                <Typography
                                  component="h4"
                                  variant="h6"
                                  align="center"
                                  sx={{ fontSize: "18px", fontWeight: "400px" }}
                                >
                                  Verified
                                </Typography>
                              </Grid>
                            )}
                          </Grid>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        className={`${styles.rowp} ${styles.xsTop}`}
                      >
                        <Box
                          component="img"
                          align="center"
                          width={80}
                          height={80}
                          className={styles.mobileIcon}
                          alt="mobile"
                          src="/images/pages/signup/mobile.png"
                        />
                        <Box
                          onSubmit={handleSubmitcvmob(oncvMobileSubmit)}
                          id="cvmobilesupportform"
                          component="form"
                          autoComplete="off"
                          sx={{ mt: 1 }}
                        >
                          <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{
                              xs: 1,
                              sm: 1,
                              md: 1,
                              lg: 2,
                              xl: 3,
                            }}
                          >
                            <Grid item xs={3}>
                              <CssTextField
                                margin="normal"
                                fullWidth
                                value="+966"
                                disabled
                                id="code"
                                name="code"
                                sx={{ "& input": { textAlign: "center" } }}
                              />
                            </Grid>
                            <Grid item xs={9}>
                              <CssTextField
                                {...registercvmob("mobile", {
                                  required: "Mobile Number is required",
                                  pattern: {
                                    value: /^[0-9]{9}$/,
                                    message: "Invalid mobile number",
                                  },
                                })}
                                InputProps={{
                                  readOnly: cvMobshowVerified ? true : false,
                                  onKeyPress: (e) => {
                                    // Allow only numbers
                                    const validChars = /^[0-9]+$/i;
                                    if (!validChars.test(e.key)) {
                                      e.preventDefault();
                                    }
                                  },
                                }}
                                inputProps={{ maxLength: 9 }}
                                value={
                                  cvMobshowVerified
                                    ? cachedInfo.mobile_no
                                    : cvMob
                                }
                                onChange={handleSelectChange}
                                margin="normal"
                                autoFocus
                                fullWidth
                                id="mobile"
                                label="Mobile Number"
                                name="mobile"
                                error={errorscvmob.mobile ? true : false}
                              />
                              {!inputErrors && (
                                <>
                                  {errorscvmob.mobile && (
                                    <FormHelperText error>
                                      {errorscvmob.mobile.message}
                                    </FormHelperText>
                                  )}
                                </>
                              )}
                              <Typography
                                variant="span"
                                sx={{ fontSize: "0.75rem", color: "#d32f2f" }}
                              >
                                {inputErrors}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Typography
                            align="left"
                            className={styles.verifiLabel}
                          >
                            Enter Verification Code
                          </Typography>
                          <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{
                              xs: 1,
                              sm: 1,
                              md: 1,
                              lg: 2,
                              xl: 3,
                            }}
                          >
                            <Grid item xs={12}>
                              <CssFormControl
                                margin="normal"
                                fullWidth
                                sx={{ "& input": { textAlign: "center" } }}
                              >
                                {cvmobresendBtn ? (
                                  <Controller
                                    name="otpmobile"
                                    control={controlcvmob}
                                    rules={{
                                      required: "OTP is required",
                                      pattern: {
                                        value: /^[0-9]{6}$/,
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
                                          value={
                                            cvMobshowVerified
                                              ? "******"
                                              : field.value
                                          }
                                          onChange={(newValue) => {
                                            const sanitizedValue =
                                              newValue.replace(/[^0-9]/g, "");
                                            field.onChange(sanitizedValue); // Manually trigger the field's onChange event
                                            handleOtpmobileChange(newValue); // Call your handleComplete function
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
                                ) : (
                                  <MuiOtpInput
                                    display="flex"
                                    gap={1}
                                    className={styles.otpnum}
                                    dividerprops={{ textAlign: "center" }}
                                    TextFieldsProps={{
                                      disabled: true,
                                      type: "text",
                                    }}
                                    length={6}
                                    value={cvMobshowVerified && "******"}
                                  />
                                )}
                              </CssFormControl>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={6}
                              lg={6}
                              xl={6}
                              sx={{ mt: 2, pb: 3 }}
                            >
                              {!cvMobshowVerified && (
                                <>
                                  <Button
                                    onClick={
                                      cvmobresendBtn
                                        ? cvresendtokenMob
                                        : () => setcvMobSbt(true)
                                    }
                                    type={cvmobresendBtn ? "button" : "submit"}
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    className={styles.commonBtn}
                                  >
                                    {" "}
                                    {cvmobresendBtn
                                      ? "Resend Code"
                                      : "Send Code"}{" "}
                                  </Button>
                                </>
                              )}
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={6}
                              lg={6}
                              xl={6}
                              sx={{ mt: 2, pb: 3 }}
                            >
                              {!cvMobshowVerified && (
                                <>
                                  <Button
                                    onClick={() => setcvMobSbt(false)}
                                    // disabled={cvmobresendBtn ? false : true}
                                    disabled={myDisabled}
                                    type="submit"
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    className={
                                      myDisabled ? "" : styles.commonBtn
                                    }
                                    sx={{
                                      "&.MuiButtonBase-root": {
                                        backgroundColor: "unset",
                                      },
                                      "&.MuiButtonBase-root.Mui-disabled": {
                                        backgroundColor: "rgba(0, 0, 0, 0.12)",
                                      },
                                    }}
                                  >
                                    Verify
                                  </Button>
                                </>
                              )}
                            </Grid>
                            {cvMobshowVerified && (
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Box
                                  component="img"
                                  align="center"
                                  width={60}
                                  height={60}
                                  className={styles.mailIcon}
                                  alt="mail"
                                  src="/images/pages/signup/verify.png"
                                />
                                <Typography
                                  component="h4"
                                  variant="h6"
                                  align="center"
                                  sx={{ fontSize: "18px", fontWeight: "400px" }}
                                >
                                  Verified
                                </Typography>
                              </Grid>
                            )}
                          </Grid>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sx={{ mt: 3, color: "#6DCCDD" }}>
                        <Typography component="p" align="center">
                          The OTP will be expire in 5 minutes. On expiry of
                          time, please resend it.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,
                  }}
                >
                  <div className={styles.stepperBtn}></div>
                  <Button
                    disabled={
                      cvEmailshowVerified && cvMobshowVerified ? false : true
                    }
                    size="large"
                    variant="contained"
                    className={
                      !cvEmailshowVerified || !cvMobshowVerified
                        ? ""
                        : styles.stepperBtn
                    }
                    type="submit"
                    onClick={onSubmit}
                    sx={{
                      "&.MuiButtonBase-root": {
                        backgroundColor: "unset",
                      },
                      "&.MuiButtonBase-root.Mui-disabled": {
                        backgroundColor: "rgba(0, 0, 0, 0.12)",
                      },
                    }}
                  >
                    Next
                  </Button>
                </Grid>
              </CardContent>
            </Card>
          </Container>
        );
      case 2:
        return (
          <Container maxWidth="xl" component="main">
            <Card variant="outlined" sx={{ mb: 3, borderRadius: "7px" }}>
              <CardContent>
                <PersonalOrgInfoSubmit
                  cachedInfo={cachedInfo}
                  onallowcommonLegalStatus={handlecommonLegalStatusChange}
                  onSubmit={onSubmit}
                  allowPOIcsbt={allowPOIcsbt}
                  onallowPOIcsbtChange={handleallowPOIcsbtChange}
                  commonLegalStatus={commonLegalStatus}
                />

                {allowPOIcsbt && (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 3,
                    }}
                  >
                    <div className={styles.stepperBtn}></div>
                    <Button
                      size="large"
                      variant="contained"
                      className={styles.stepperBtn}
                      type="submit"
                      onClick={onSubmit}
                    >
                      Next
                    </Button>
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Container>
        );
      case 3:
        return (
          <Container maxWidth="xl" component="main">
            <Card variant="outlined" sx={{ mb: 3, borderRadius: "7px" }}>
              <CardContent>
                <PaymentMethodsSubmit
                  allowpaymentDone={handlepaymentDone}
                  cachedInfo={cachedInfo}
                  onallowcommonLegalStatus={handlecommonLegalStatusChange}
                  onSubmit={onSubmit}
                  allowPOIcsbt={allowPOIcsbt}
                  onallowPOIcsbtChange={handleallowPOIcsbtChange}
                />
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,
                  }}
                >
                  {paymentDone ? (
                    <Button
                      sx={{
                        cursor: "not-allowed !important",
                        "&.MuiButtonBase-root": {
                          backgroundColor: "unset",
                        },
                        "&.MuiButtonBase-root.Mui-disabled": {
                          backgroundColor: "rgba(0, 0, 0, 0.12)",
                        },
                      }}
                      disabled
                      size="large"
                      variant="contained"
                      // className={styles.stepperBtn}
                    >
                      Back
                    </Button>
                  ) : (
                    <Button
                      size="large"
                      variant="contained"
                      className={styles.stepperBtn}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  )}

                  {paymentDone ? (
                    <Button
                      size="large"
                      variant="contained"
                      className={styles.stepperBtn}
                      type="submit"
                      onClick={precallFinProvision}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        cursor: "not-allowed !important",
                        "&.MuiButtonBase-root": {
                          backgroundColor: "unset",
                        },
                        "&.MuiButtonBase-root.Mui-disabled": {
                          backgroundColor: "rgba(0, 0, 0, 0.12)",
                        },
                      }}
                      disabled
                      size="large"
                      variant="contained"
                      // className={styles.stepperBtn}
                      type="button"
                    >
                      Next
                    </Button>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Container>
        );
      case 4:
        return (
          <Container maxWidth="xl" component="main">
            <Card variant="outlined" sx={{ mb: 3, borderRadius: "7px" }}>
              <CardContent>
                {commonProStatus &&
                  (commonLegalStatus ? (
                    <>
                      <Box>
                        <Grid item xs={12} sx={{ mt: 5 }}>
                          <Box
                            component="img"
                            align="center"
                            width={200}
                            height={200}
                            className={styles.creditCard}
                            alt="success"
                            src="/images/pages/signup/success.png"
                          />
                          <Typography
                            component="h3"
                            variant="h3"
                            align="center"
                            sx={{ mt: 5, mb: 3, fontSize: "24px" }}
                          >
                            You are successfully completed your KYC process !
                          </Typography>
                          <Typography
                            component="p"
                            align="center"
                            sx={{ mt: 4, mb: 2 }}
                          >
                            You can now log in to your account and order
                            detacloud platform.
                          </Typography>
                        </Grid>
                        <Grid item xs={12} align="center">
                          {commonProStatus ? (
                            <Button
                              size="large"
                              variant="contained"
                              sx={{ mt: 3, mb: 4 }}
                              className={styles.commonBtn}
                              type="submit"
                              onClick={logoutSurHead}
                            >
                              Finish
                            </Button>
                          ) : (
                            <Button
                              size="large"
                              variant="contained"
                              sx={{ mt: 3, mb: 4 }}
                              className={styles.commonBtn}
                              type="button"
                            >
                              Provisioning. Please Wait...
                            </Button>
                          )}
                        </Grid>
                      </Box>
                    </>
                  ) : (
                    <>
                      {/* START KYC Document Verification */}
                      <Box>
                        <Grid item xs={12} sx={{ mt: 5 }}>
                          <Box
                            component="img"
                            align="center"
                            width={200}
                            height={200}
                            className={styles.creditCard}
                            alt="success"
                            src="/images/pages/signup/kyc.png"
                          />
                          <Typography
                            component="h3"
                            variant="h3"
                            align="center"
                            sx={{ mt: 5, mb: 3, fontSize: "24px" }}
                          >
                            KYC Document Verification !
                          </Typography>
                        </Grid>
                        <Grid
                          container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          rowSpacing={1}
                          spacing={2}
                        >
                          <Grid item xs={12} sm={9} md={7} lg={6} xl={6}>
                            <Typography
                              component="p"
                              align="center"
                              sx={{ mt: 1, mb: 2 }}
                            >
                              Detasad Legal team is reviewing your documents
                              provided, to confirm your account sign-up status.
                              This process may take upto 3 Days, we will notify
                              you of the outcome via email address.
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} align="center">
                          {commonProStatus ? (
                            <Button
                              size="large"
                              variant="contained"
                              sx={{ mt: 3, mb: 4 }}
                              className={styles.commonBtn}
                              type="submit"
                              onClick={logoutSurHead}
                            >
                              Finish
                            </Button>
                          ) : (
                            <Button
                              size="large"
                              variant="contained"
                              sx={{ mt: 3, mb: 4 }}
                              className={styles.commonBtn}
                              type="button"
                            >
                              Provisioning. Please Wait...
                            </Button>
                          )}
                        </Grid>
                      </Box>
                      {/* END KYC Document Verification */}
                    </>
                  ))}

                {/* START Processing Start Here */}
                {!commonProStatus && (
                  <Box>
                    <Grid item xs={12} sx={{ mt: 5, mb: 5 }} align="center">
                      <Typography
                        component="h4"
                        variant="h4"
                        align="center"
                        sx={{
                          mt: 5,
                          mb: 2,
                          fontSize: "20px",
                          color: "#015578",
                        }}
                      >
                        Processing...
                      </Typography>
                      <Typography
                        component="p"
                        align="center"
                        sx={{
                          mb: "30px",
                          fontSize: "17px",
                          fontWeight: "400",
                          color: "#015578",
                        }}
                      >
                        Please wait as this may take a few minutes.
                      </Typography>
                      <Box className={styles.ProgressContainer}>
                        <Box
                          component="div"
                          className={styles.CloudLoader}
                        ></Box>
                        <Box
                          component="img"
                          align="center"
                          width={50}
                          height={50}
                          className={styles.CloudIcon}
                          alt="success"
                          src="/images/pages/signup/cloudIcon.png"
                        />
                        <Box component="div" className={styles.ProgressTitle}>
                          {ccfinalPercNum} out of{" "}
                          <Box component="span" className={styles.ProgressOff}>
                            10 Completed
                          </Box>
                        </Box>
                        <BorderLinearProgress
                          variant="determinate"
                          value={ccfinalPerc}
                          className={styles.RsProgress}
                        />
                      </Box>

                      <Box
                        className={`${styles.ProcessingInstallationMessage} ${styles.HeaderProcessing} `}
                        sx={{ mt: 5 }}
                      >
                        {ccfinalMsg}
                        <Box component="span">.</Box>
                        <Box component="span">.</Box>
                        <Box component="span">.</Box>
                      </Box>
                      <Box hidden>
                        <Typography
                          component="h4"
                          variant="h4"
                          align="center"
                          sx={{
                            mt: 5,
                            mb: 2,
                            fontSize: "18px",
                            color: "#4caf50",
                          }}
                        >
                          Edge creation on processing Successfully.
                        </Typography>
                      </Box>
                    </Grid>
                  </Box>
                )}
                {/* END Processing Start Here */}
              </CardContent>
            </Card>
          </Container>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#F7F7F9" }}>
        <Toolbar>
          <Box
            component="img"
            variant="h6"
            alt="Logo"
            src="/images/pages/dcc/common/logo.png"
            width={110}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ marginTop: "3px" }}>
            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="#616377"
            >
              <NotificationsIcon />
            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="#616377"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}

      {/* Start Steeper Here  */}
      <Container maxWidth="xl" component="main" sx={{ mt: 13, mb: 5 }}>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps = {};
              if (index === activeStep) {
                labelProps.error = false;
              }
              return (
                <Step key={index}>
                  <StepLabel
                    {...labelProps}
                    StepIconComponent={StepperCustomDot}
                  >
                    <div className="step-label">
                      <div>
                        <Typography className="step-title">
                          {step.title}
                        </Typography>
                        <Typography className="step-subtitle">
                          {step.subtitle}
                        </Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </StepperWrapper>
      </Container>
      {renderContent()}
    </Box>
  );
}

export default Signup;
