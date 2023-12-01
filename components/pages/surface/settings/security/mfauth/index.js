// ** React Imports
import * as React from "react";
import { useState, useEffect } from "react";

// ** MUI Components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import { MuiOtpInput } from "mui-one-time-password-input";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import Cookies from "js-cookie";

import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

import axios from "axios";
import { Loading } from "mdi-material-ui";
import { FormHelperText } from "@mui/material";

// ** Custom CSS
import styles from "./index.module.css";
import { useClientIP } from "../../../../../../utils/context/ClientIPContext";

// ** TextField Custom Style
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

// ** FormControl Custom Style
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

function MultiFactorAuth() {
  const { clientIP } = useClientIP();

  // ** OTP Function
  const [otp, setOtp] = React.useState("");
  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const [enableBtn2Fa, setenableBtn2Fa] = useState(false);
  // TR Sanjai
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitLoading, setSubmitIsLoading] = useState(false);
  // TR Sanjai
  const handleEnableBtn2fa = () => {
    setenableBtn2Fa(true);
  };
  const handleDisableBtn2fa = async () => {
    setIsLoading(true); //TR Sanjai
    const tdata = stcachdata;
    const newData = {
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "disableMfa",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/settings/security/mfauth",
        finalData
      ); // call the new API route

      if (data.status === "ok") {
        toast.success(
          "Two factor authentication has been disabled successfully!"
        ); //TR SANJAI
        tdata.mfa_auth = false;
        Cookies.set("userData", JSON.stringify(tdata));
        setenableBtn2Fa(false);
        setenableMfaBtn(false);
        setIsLoading(false); //TR Sanjai
      }
    } catch (error) {
      toast.error("An error occurred");
      setenableBtn2Fa(false);
      setenableMfaBtn(false);
      setIsLoading(false); //TR Sanjai
    }
  };

  const cookies = Cookies.get("userData");
  const [stcachdata, setstcachdata] = useState([]);
  const [enableMfaBtn, setenableMfaBtn] = useState(false);
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;

    if (cachData) {
      if (cachData.mfa_auth) {
        setenableMfaBtn(true);
        setenableBtn2Fa(true);
      }
    }
    setstcachdata(cachData);
  }, [cookies]);

  const formCommonMethods = useForm();

  const {
    register: registerCommon,
    handleSubmit: handleSubmitCommon,
    formState: { isSubmitting, errors: errorsCommon },
    reset: resetCommon,
    control: controlCommon,
  } = formCommonMethods;

  const [commonFormData, setCommonFormData] = useState({
    mobile_no: "",
    email_id: "",
    reset_password: false,
  });

  const [errorMobile, setErrorMobile] = useState("");
  const [errorMobileStatus, setErrorMobileStatus] = useState(false);
  const [numInputButton, setNumInputButton] = useState(false);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setCommonFormData((prev) => ({ ...prev, [name]: value }));
    if (value.length > 9) {
      setErrorMobile("Please enter no more than 9 characters.");
      setErrorMobileStatus(true);
      errorsCommon.mobile_no = true;
    } else if (!/^[0-9]{9}$/.test(value)) {
      setErrorMobile("Please enter at least 9 characters.");
      setErrorMobileStatus(true);

      // errorsCommon.mobile_no = false;
    } else {
      setErrorMobile("");
      setNumInputButton(true);
      setErrorMobileStatus(false);
    }
    if (value.length === 0) {
      // errorsCommon.mobile_no = true;
      setErrorMobile("Mobile Number is required.");
      setErrorMobileStatus(true);
    }
  };

  const handleKeyPress = (event) => {
    const keyCode = event.which || event.keyCode;

    // Allow only numeric digits (0-9)
    if (keyCode < 48 || keyCode > 57) {
      event.preventDefault();
    }
  };

  const handleInputFocus = (evt) => {
    setCommonFormData((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const [otpmobile, setmobileOtp] = useState("");
  const handleOtpmobileChange = (newValue) => {
    setmobileOtp(newValue);
  };

  const oncommonSubmit = async (data) => {
    // setopenOtp(true);
    setmobNo(data.mobile_no);
    if (data.otpmobile) {
      setotpno(data.otpmobile);
      setopenOtp(true);
    }

    // Check if all required key values in poiPIstate are filled
    const requiredFields = ["mobile_no"];

    const iscommonstateFilled = requiredFields.every((key) => {
      return data[key] !== "";
    });

    // Usage:
    if (iscommonstateFilled) {
      // All required key values are filled
      if (openOtp) {
        applyOtp(data.otpmobile);
      } else {
        handleDataManipulation(data.mobile_no);
      }
    } else {
      // Some required key values are not filled
    }
  };
  const [otpno, setotpno] = useState("");
  const [mobNo, setmobNo] = useState("");
  const [openOtp, setopenOtp] = useState(false);

  const applyOtp = async (spOtp) => {
    setSubmitIsLoading(true); //TR Sanjai
    const tdata = stcachdata;

    const pdata = {
      sms: {
        mobile_no: "+966" + mobNo,
        email_id: tdata.email,
        token: spOtp,
        mfa_status: "true",
        user_serial_id: tdata.user_serial_id,
        security_enabled: true,
      },
    };
    const newData = {
      data: pdata,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
    };
    const finalData = {
      data: newData,
      endPoint: "applyotpmfa",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/settings/security/mfauth",
        finalData
      ); // call the new API route

      if (data) {
        if (data.status_code === "601") {
          toast.error("SMS verification failed!");
        } else if (data.status_code === "603") {
          toast.error("Mobile number already registered.");
        } else if (data.status_code === "200" || data.status_code === "600") {
          tdata.mfa_auth = true;
          Cookies.set("userData", JSON.stringify(tdata));
          toast.success("2FA Enabled Successfully!");
          // TR Sanjai
          setCommonFormData({
            mobile_no: "",
            email_id: "",
            reset_password: false,
          });
          setenableBtn2Fa(false);
          setenableMfaBtn(false);
          setopenOtp(false);
          setSubmitIsLoading(false); //TR Sanjai
          resetCommon();
          // TR Sanjai
          //toast.success("Password has been updated successfully!");
        } else {
          toast.error("Invalid OTP");
          setSubmitIsLoading(false); //TR Sanjai
        }
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const prehandleDataManipulation = async () => {
    handleDataManipulation(mobNo);
  };
  const handleDataManipulation = async (cmobNo) => {
    if (errorMobileStatus === false) {
      const tdata = stcachdata;

      const pdata = {
        mobile_no: "+966" + cmobNo,
        email_id: tdata.email,
        reset_password: false,
      };
      const newData = {
        data: pdata,
        tenantId: tdata.tenant_id,
        userSerialId: tdata.user_serial_id,
      };
      const finalData = {
        data: newData,
        endPoint: "sendSMSmfa",
        token: tdata.accessToken,
      };

      try {
        const { data } = await axios.post(
          "/api/surface/settings/security/mfauth",
          finalData
        ); // call the new API route

        if (data) {
          if (data.status_code === 200) {
            setopenOtp(true);
            toast.success("OTP has been sent successfully!"); //TR SANJAI

            //toast.success("Password has been updated successfully!");
          }
        }
      } catch (error) {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <>
      {/* Start FactorAuth design Here */}
      <Box>
        <Box
          component="img"
          width={100}
          height={100}
          align="center"
          display={"flex"}
          alt="2FA"
          src="/images/pages/surface/settings/security/2FA.png"
          sx={{ margin: "0 auto" }}
        />
        <Typography
          component="h4"
          variant="h5"
          align="center"
          fontSize={26}
          mt={2}
          mb={2}
        >
          Two-Factor Authentication
        </Typography>
        <Typography
          component="p"
          variant="p"
          color={"#6b6f82"}
          align="center"
          mb={2}
        >
          Two-factor authentication (2FA) provides an additional layer of
          security beyond passwords and is strongly recommended. Your account is
          protected by requiring both your password and an authentication code
          from an authenticator app.
        </Typography>

        <Box
          onSubmit={handleSubmitCommon(oncommonSubmit)}
          component="form"
          autoComplete="off"
        >
          {enableBtn2Fa && !enableMfaBtn && (
            <Grid
              container
              direction="row"
              rowSpacing={2}
              spacing={2}
              justifyContent="center"
            >
              <Grid item xs={12} sm={7} md={6} lg={5} xl={4}>
                <Grid container direction="row" rowSpacing={2} spacing={2}>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <CssTextField
                      fullWidth
                      id="pincode"
                      label="Pin Code"
                      name="pincode"
                      value="+966"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={10} sm={7} md={7} lg={7} xl={7}>
                    <CssTextField
                      disabled={openOtp ? numInputButton : false}
                      inputProps={{
                        style: { cursor: openOtp ? "not-allowed" : "auto" },
                      }}
                      fullWidth
                      id="mobile_no"
                      label="Phone Number"
                      name="mobile_no"
                      {...registerCommon("mobile_no", {
                        required: "Mobile Number is required",
                      })}
                      value={commonFormData.mobile_no}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      onFocus={handleInputFocus}
                      // error={!!errorsCommon.mobile_no} // Add the error prop to highlight the field when there is an error
                      // helperText={
                      //   errorsCommon.mobile_no && errorsCommon.mobile_no.message
                      // } // Show the error message
                    />
                    {!errorMobile && (
                      <>
                        {errorsCommon.mobile_no && (
                          <FormHelperText error>
                            {errorsCommon.mobile_no.message}
                          </FormHelperText>
                        )}
                      </>
                    )}

                    <Typography
                      variant="span"
                      sx={{ fontSize: "0.73rem", color: "#d32f2f" }}
                    >
                      {errorMobile}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} sm={1} md={1} lg={1} xl={1}>
                    {openOtp && (
                      <Box
                        onClick={prehandleDataManipulation}
                        component="img"
                        width={30}
                        height={30}
                        align="center"
                        display={"flex"}
                        alt="send"
                        src="/images/pages/surface/settings/security/send.png"
                        sx={{ margin: "12px auto 0 auto", cursor: "pointer" }}
                        title={"Resend Code"}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <CssFormControl
                      fullWidth
                      sx={{ "& input": { textAlign: "center" } }}
                    >
                      {openOtp && (
                        <Controller
                          name="otpmobile"
                          control={controlCommon}
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
                                value={field.value}
                                onKeyPress={handleKeyPress}
                                onChange={(newValue) => {
                                  field.onChange(newValue); // Manually trigger the field's onChange event
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
                      )}
                    </CssFormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            {!enableBtn2Fa && !enableMfaBtn && (
              <Button
                size="md"
                variant="contained"
                align="center"
                sx={{
                  color: "#fff",
                  backgroundImage:
                    "linear-gradient(45deg, #0288d1, #26c6da) !important",
                  "&.MuiButtonBase-root": {
                    backgroundColor: "unset",
                  },
                  "&.MuiButtonBase-root.Mui-disabled": {
                    backgroundColor: "rgba(0, 0, 0, 0.12)",
                  },
                }}
                onClick={handleEnableBtn2fa}
              >
                ENABLE 2FA
              </Button>
            )}

            {enableBtn2Fa && enableMfaBtn && (
              <Button
                disabled={isLoading} //TR Sanjai
                size="md"
                variant="contained"
                align="center"
                sx={{
                  color: "#fff",
                  backgroundImage:
                    "linear-gradient(45deg, #0288d1, #26c6da) !important",
                  "&.MuiButtonBase-root": {
                    backgroundColor: "unset",
                  },
                  "&.MuiButtonBase-root.Mui-disabled": {
                    backgroundColor: "rgba(0, 0, 0, 0.12)",
                  },
                }}
                onClick={handleDisableBtn2fa}
              >
                {/* TR Sanjai */}
                {isLoading ? (
                  <>
                    <AutorenewIcon className={styles.loadingBtn} />
                    Loading...
                  </>
                ) : (
                  "DISABLE 2FA"
                )}
              </Button>
            )}
            {/* TR Sanjai */}
            {enableBtn2Fa && !enableMfaBtn && (
              <Button
                disabled={isSubmitLoading}
                type="submit"
                size="md"
                variant="solid"
                align="center"
                sx={{
                  color: "#fff",
                  backgroundImage:
                    "linear-gradient(45deg, #0288d1, #26c6da) !important",
                  "&.MuiButtonBase-root": {
                    backgroundColor: "unset",
                  },
                  "&.MuiButtonBase-root.Mui-disabled": {
                    backgroundColor: "rgba(0, 0, 0, 0.12)",
                  },
                }}
              >
                {/* TR Sanjai */}
                {!openOtp ? (
                  "Send SMS"
                ) : "Submit" ? (
                  isSubmitLoading ? (
                    <>
                      <AutorenewIcon className={styles.loadingBtn} />
                      Loading...
                    </>
                  ) : (
                    "Submit"
                  )
                ) : null}

                {/* TR SANJAI */}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      {/* End FactorAuth design Here */}
      {/* Start FactorAuth Skeleton Here */}
      <Box hidden>
        <Skeleton
          variant="circular"
          animation="wave"
          width={100}
          height={100}
          sx={{ margin: "0 auto" }}
        />
        <Skeleton
          variant="text"
          animation="wave"
          width={"40%"}
          height={25}
          sx={{ margin: "16px auto" }}
        />
        <Skeleton
          variant="text"
          animation="wave"
          width={"100%"}
          height={25}
          mb={2}
        />
        <Skeleton
          variant="text"
          animation="wave"
          width={"80%"}
          height={25}
          sx={{ margin: "0 auto" }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Skeleton
            variant="rounded"
            animation="wave"
            width={150}
            height={45}
            sx={{ margin: "10px auto" }}
          />
        </Box>
      </Box>
      {/* End FactorAuth Skeleton Here */}
    </>
  );
}

export default MultiFactorAuth;
