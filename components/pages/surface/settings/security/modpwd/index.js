// ** React Imports
import * as React from "react";
import { useState, useEffect } from "react";

// ** MUI Components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import Skeleton from "@mui/material/Skeleton";
// import styles from "./index.module.css";
// ** MUI ICON Components
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import styles from "../../../../../../pages/surface/settings/security/index.module.css"; //TR Sanjai

import Cookies from "js-cookie";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import axios from "axios";
import { Loading } from "mdi-material-ui";
import { FormHelperText } from "@mui/material";
import { useClientIP } from "../../../../../../utils/context/ClientIPContext";

// ** Linear Progress CSS
const BorderLinearProgressWeak = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundImage: "linear-gradient(90deg, #70dc23, yellow, red )",
  },
}));

const BorderLinearProgressModerate = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundImage: "linear-gradient(90deg, #70dc23, red, yellow )",
  },
}));

const BorderLinearProgressStrong = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundImage: "linear-gradient(-90deg, #70dc23, yellow, red )",
  },
}));

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

function ModifyPassword() {
  const { clientIP } = useClientIP();

  const [commonShowForm, setCommonShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false); //TR SANJAI
  const cookies = Cookies.get("userData");
  const [stcachdata, setstcachdata] = useState([]);

  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;
    setstcachdata(cachData);
    setCommonShowForm(true);
  }, [cookies]);

  const formCommonMethods = useForm();

  const {
    register: registerCommon,
    handleSubmit: handleSubmitCommon,
    formState: { isSubmitting, errors: errorsCommon },
    reset: resetCommon,
  } = formCommonMethods;

  const [commonFormData, setCommonFormData] = useState({
    currentPwd: "",
    newPwd: "",
    confirmNewPwd: "",
    showcurrentPwd: false,
    shownewPwd: false,
    showconfirmNewPwd: false,
  });

  const handleClickshowcurrentPwd = () => {
    setCommonFormData((prevData) => ({
      ...prevData,
      showcurrentPwd: !prevData.showcurrentPwd,
    }));
  };
  const handleClickshownewPwd = () => {
    setCommonFormData((prevData) => ({
      ...prevData,
      shownewPwd: !prevData.shownewPwd,
    }));
  };
  const handleClickshowconfirmNewPwd = () => {
    setCommonFormData((prevData) => ({
      ...prevData,
      showconfirmNewPwd: !prevData.showconfirmNewPwd,
    }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const oncommonSubmit = async (data) => {
    // Check if all required key values in poiPIstate are filled
    const requiredFields = ["currentPwd", "newPwd", "confirmNewPwd"];

    const iscommonstateFilled = requiredFields.every((key) => {
      return data[key] !== "";
    });

    // Usage:
    if (iscommonstateFilled) {
      // All required key values are filled

      handleDataManipulation(data);
    } else {
      // Some required key values are not filled
    }
  };

  const handleDataManipulation = async (data) => {
    submitData(data);
  };

  const submitData = async (mdata) => {
    setIsLoading(true); //TR SANJAI
    const tdata = stcachdata;
    const pdata = {
      userSerialId: tdata.user_serial_id,
      emailId: tdata.email,
      currentPassword: mdata.currentPwd,
      newPassword: mdata.newPwd,
    };
    const newData = {
      data: pdata,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "updateSecurityPwd",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/settings/security/modpwd",
        finalData
      ); // call the new API route
      if (data) {
        if (data.status === "ok") {
          setIsLoading(false); //TR SANJAI
          toast.success("Password has been updated successfully!");
          resetCommon();
          setCommonFormData({
            currentPwd: "",
            newPwd: "",
            confirmNewPwd: "",
            showcurrentPwd: false,
            shownewPwd: false,
            showconfirmNewPwd: false,
          });
        }
      }
    } catch (error) {
      setIsLoading(false); //TR SANJAI
      toast.error("Invalid current password!"); //TR SANJAI
      setCommonFormData({
        currentPwd: "",
        newPwd: "",
        confirmNewPwd: "",
        showcurrentPwd: false,
        shownewPwd: false,
        showconfirmNewPwd: false,
      });

      // toast.error('An error occurred');
    }
  };
  const [passwordIconResults, setPasswordIconResults] = useState({
    isLengthValid: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasPercentage: 0,
  });
  const [currentpwdERR, setcurrentpwdERR] = useState({
    state: false,
    message: "",
  });
  const [newpwdERR, setnewpwdERR] = useState({
    state: false,
    message: "",
  });
  const [confirmNewPwdERR, setconfirmNewPwdERR] = useState({
    state: false,
    message: "",
  });
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setCommonFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "currentPwd") {
      if (value) {
        if (value.length < 8) {
          setcurrentpwdERR({
            state: true,
            message: "Password must be at least 8 characters long",
          });
          errorsCommon.currentPwd = true;
        } else if (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]+$/.test(
            value
          )
        ) {
          setcurrentpwdERR({ ...currentpwdERR, state: false });
          errorsCommon.currentPwd = false;
        } else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]+$/.test(
            value
          )
        ) {
          setcurrentpwdERR({
            state: true,
            message: "Password did not meet the requirements",
          });
          errorsCommon.currentPwd = true;
        }
      } else if (!value) {
        setcurrentpwdERR({
          state: true,
          message: "Current Password is required",
        });
        errorsCommon.currentPwd = true;
      }
    }
    if (name === "newPwd") {
      if (value) {
        if (value.length < 8) {
          setnewpwdERR({
            state: true,
            message: "Password must be at least 8 characters long",
          });
          errorsCommon.newPwd = true;
        } else if (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]+$/.test(
            value
          )
        ) {
          setnewpwdERR({ ...newpwdERR, state: false });
          errorsCommon.newPwd = false;
        } else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]+$/.test(
            value
          )
        ) {
          setnewpwdERR({
            state: true,
            message: "Password did not meet the requirements",
          });
          errorsCommon.newPwd = true;
        }
      } else if (!value) {
        setnewpwdERR({
          state: true,
          message: "New Password is required",
        });
        errorsCommon.newPwd = true;
      }
    }
    if (name === "confirmNewPwd") {
      if (value) {
        if (value.length < 8) {
          setconfirmNewPwdERR({
            state: true,
            message: "Password must be at least 8 characters long",
          });
          errorsCommon.confirmNewPwd = true;
        } else if (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]+$/.test(
            value
          )
        ) {
          setconfirmNewPwdERR({ ...confirmNewPwdERR, state: false });
          errorsCommon.confirmNewPwd = false;
        } else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]+$/.test(
            value
          )
        ) {
          setconfirmNewPwdERR({
            state: true,
            message: "Password did not meet the requirements",
          });
          errorsCommon.confirmNewPwd = true;
        }
      } else if (!value) {
        setconfirmNewPwdERR({
          state: true,
          message: "Confirm New Password is required",
        });
        errorsCommon.confirmNewPwd = true;
      }
    }
  };

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;

    if (keyCode === 32) {
      event.preventDefault();
    }
  };

  const handleInputFocus = (evt) => {
    setCommonFormData((prev) => ({ ...prev, focus: evt.target.name }));
    const fieldIndex = passwordFields.indexOf(evt.target.name);
    setFocusedFieldIndex(fieldIndex);
  };

  const passwordFields = ["currentPwd", "newPwd", "confirmNewPwd"];
  useEffect(() => {
    const validationResults = passwordFields.map((field) => {
      const fieldValue = commonFormData[field];
      const isLengthValid = fieldValue.length >= 8;
      const hasUppercase = /[A-Z]/.test(fieldValue);
      const hasLowercase = /[a-z]/.test(fieldValue);
      const hasNumber = /[0-9]/.test(fieldValue);
      const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(
        fieldValue
      );

      let hasPercentage = 35;

      if (fieldValue === "") {
        hasPercentage = 0; // No value, percentage is 0
      } else if (
        isLengthValid &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialChar
      ) {
        hasPercentage = 100;
      } else if (
        isLengthValid &&
        (hasUppercase || hasLowercase || hasNumber || hasSpecialChar)
      ) {
        hasPercentage = 70;
      } else if (isLengthValid) {
        hasPercentage = 35;
      }

      return {
        isLengthValid,
        hasUppercase,
        hasLowercase,
        hasSpecialChar,
        hasNumber,
        hasPercentage,
      };
    });

    const allFieldsValid = validationResults.every((result) =>
      Object.values(result).every((condition) => condition)
    );

    setPasswordIconResults((prevResults) => ({
      ...prevResults,
      ...validationResults[focusedFieldIndex], // Update only the focused field's results
      allFieldsValid,
    }));
  }, [commonFormData]);

  const [focusedFieldIndex, setFocusedFieldIndex] = useState(-1); // Initialize with -1

  return (
    <>
      {/* Start ModifyPassword design Here */}

      {commonShowForm && (
        <Box>
          <Typography
            component="h4"
            variant="h5"
            align="left"
            fontSize={18}
            mb={2}
            sx={{ fontWeight: "500" }}
          >
            Reset Your Login Password
          </Typography>
          <Grid
            container
            direction="row"
            rowSpacing={2}
            spacing={2}
            display={"flex"}
            justifyContent="center"
          >
            <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
              <Box
                onSubmit={handleSubmitCommon(oncommonSubmit)}
                component="form"
                autoComplete="off"
              >
                <Grid
                  container
                  direction="row"
                  rowSpacing={2}
                  spacing={2}
                  display={"flex"}
                  justifyContent="center"
                >
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={5}>
                    <CssFormControl
                      margin="normal"
                      fullWidth
                      variant="outlined"
                    >
                      <InputLabel htmlFor="currentPwd">
                        Current Password
                      </InputLabel>
                      <OutlinedInput
                        id="currentPwd"
                        type={
                          commonFormData.showcurrentPwd ? "text" : "password"
                        }
                        name="currentPwd"
                        onFocus={handleInputFocus}
                        {...registerCommon("currentPwd", {
                          required: "Current Password is required",
                          minLength: {
                            value: 8,
                            message:
                              "Password must be at least 8 characters long",
                          },
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]+$/,
                            message: "Password did not meet the requirements",
                          },

                          // Add more validation rules here
                        })}
                        value={commonFormData.currentPwd}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        error={!!errorsCommon.currentPwd}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickshowcurrentPwd}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {commonFormData.showcurrentPwd ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Current Password"
                      />
                      {currentpwdERR.state ? (
                        <>
                          <FormHelperText error>
                            {currentpwdERR.message}
                          </FormHelperText>
                        </>
                      ) : (
                        <>
                          {errorsCommon.currentPwd && (
                            <FormHelperText error>
                              {errorsCommon.currentPwd.message}
                            </FormHelperText>
                          )}
                        </>
                      )}
                    </CssFormControl>

                    <CssFormControl
                      margin="normal"
                      fullWidth
                      variant="outlined"
                    >
                      <InputLabel htmlFor="newPwd">New Password</InputLabel>
                      <OutlinedInput
                        id="newPwd"
                        type={commonFormData.shownewPwd ? "text" : "password"}
                        name="newPwd"
                        onFocus={handleInputFocus}
                        {...registerCommon("newPwd", {
                          required: "New Password is required",
                          minLength: {
                            value: 8,
                            message:
                              "Password must be at least 8 characters long",
                          },
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]+$/,
                            message: "Password did not meet the requirements",
                          },
                          validate: (value) =>
                            value !== commonFormData.currentPwd ||
                            "New password should not be the same as current password",
                          // Add more validation rules here
                        })}
                        value={commonFormData.newPwd}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        error={!!errorsCommon.newPwd}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickshownewPwd}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {commonFormData.shownewPwd ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="New Password"
                      />
                      {newpwdERR.state ? (
                        <>
                          <FormHelperText error>
                            {newpwdERR.message}
                          </FormHelperText>
                        </>
                      ) : (
                        <>
                          {errorsCommon.newPwd && (
                            <FormHelperText error>
                              {errorsCommon.newPwd.message}
                            </FormHelperText>
                          )}
                        </>
                      )}
                    </CssFormControl>

                    <CssFormControl
                      margin="normal"
                      fullWidth
                      variant="outlined"
                    >
                      <InputLabel htmlFor="confirmNewPwd">
                        Confirm New Password
                      </InputLabel>
                      <OutlinedInput
                        id="confirmNewPwd"
                        type={
                          commonFormData.showconfirmNewPwd ? "text" : "password"
                        }
                        name="confirmNewPwd"
                        onFocus={handleInputFocus}
                        {...registerCommon("confirmNewPwd", {
                          required: "Confirm New Password is required",
                          minLength: {
                            value: 8,
                            message:
                              "Password must be at least 8 characters long",
                          },
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]+$/,
                            message: "Password did not meet the requirements",
                          },
                          validate: (value) =>
                            value === commonFormData.newPwd ||
                            "Passwords don't match",
                          // Add more validation rules here
                        })}
                        value={commonFormData.confirmNewPwd}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        error={!!errorsCommon.confirmNewPwd}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickshowconfirmNewPwd}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {commonFormData.showconfirmNewPwd ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirm New Password"
                      />
                      {confirmNewPwdERR.state ? (
                        <>
                          <FormHelperText error>
                            {confirmNewPwdERR.message}
                          </FormHelperText>
                        </>
                      ) : (
                        <>
                          {errorsCommon.confirmNewPwd && (
                            <FormHelperText error>
                              {errorsCommon.confirmNewPwd.message}
                            </FormHelperText>
                          )}
                        </>
                      )}
                    </CssFormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={5}>
                    <Typography
                      component="h4"
                      variant="h5"
                      align="left"
                      fontSize={16}
                      color="#6b6f82"
                      sx={{ fontWeight: "500", mt: "18px", ml: "28px" }}
                    >
                      Password Requirements
                    </Typography>
                    <List>
                      <ListItem sx={{ pt: "0", pb: "0" }}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              width: "38px",
                              height: "38px",
                              bgcolor: "#FFF !important",
                            }}
                          >
                            {passwordIconResults.isLengthValid ? (
                              <CheckCircleIcon color="success" />
                            ) : (
                              <CloseOutlinedIcon color="error" />
                            )}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          sx={{ color: "#6b6f82" }}
                          primary="Must be at least 8 characters long"
                        />
                      </ListItem>
                      <ListItem sx={{ pt: "0", pb: "0" }}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              width: "38px",
                              height: "38px",
                              bgcolor: "#FFF !important",
                            }}
                          >
                            {passwordIconResults.hasUppercase ? (
                              <CheckCircleIcon color="success" />
                            ) : (
                              <CloseOutlinedIcon color="error" />
                            )}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          sx={{ color: "#6b6f82" }}
                          primary="Must contain 1 uppercase letter"
                        />
                      </ListItem>
                      <ListItem sx={{ pt: "0", pb: "0" }}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              width: "38px",
                              height: "38px",
                              bgcolor: "#FFF !important",
                            }}
                          >
                            {passwordIconResults.hasLowercase ? (
                              <CheckCircleIcon color="success" />
                            ) : (
                              <CloseOutlinedIcon color="error" />
                            )}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          sx={{ color: "#6b6f82" }}
                          primary="Must contain 1 lowercase letter"
                        />
                      </ListItem>
                      <ListItem sx={{ pt: "0", pb: "0" }}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              width: "38px",
                              height: "38px",
                              bgcolor: "#FFF !important",
                            }}
                          >
                            {passwordIconResults.hasNumber ? (
                              <CheckCircleIcon color="success" />
                            ) : (
                              <CloseOutlinedIcon color="error" />
                            )}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          sx={{ color: "#6b6f82" }}
                          primary="Must contain 1 number"
                        />
                      </ListItem>
                      <ListItem sx={{ pt: "0", pb: "0" }}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              width: "38px",
                              height: "38px",
                              bgcolor: "#FFF !important",
                            }}
                          >
                            {passwordIconResults.hasSpecialChar ? (
                              <CheckCircleIcon color="success" />
                            ) : (
                              <CloseOutlinedIcon color="error" />
                            )}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          sx={{ color: "#6b6f82" }}
                          primary="Must contain 1 special character"
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} sm={7} md={6} lg={6} xl={4}>
                    {passwordIconResults.hasPercentage <= 35 && (
                      <BorderLinearProgressWeak
                        variant="determinate"
                        value={passwordIconResults.hasPercentage}
                      />
                    )}
                    {passwordIconResults.hasPercentage > 35 &&
                      passwordIconResults.hasPercentage <= 70 && (
                        <BorderLinearProgressModerate
                          variant="determinate"
                          value={passwordIconResults.hasPercentage}
                        />
                      )}
                    {passwordIconResults.hasPercentage > 70 && (
                      <BorderLinearProgressStrong
                        variant="determinate"
                        value={passwordIconResults.hasPercentage}
                      />
                    )}
                    <Box
                      component="div"
                      sx={{
                        marginTop: "10px",
                        fontSize: "15px",
                        color: "#00000099",
                      }}
                    >
                      {passwordIconResults.hasPercentage === 0
                        ? ""
                        : passwordIconResults.hasPercentage <= 35
                        ? "Weak"
                        : passwordIconResults.hasPercentage <= 70
                        ? "Moderate"
                        : passwordIconResults.hasPercentage <= 100
                        ? "Strong"
                        : null}
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box
                      sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                    >
                      <Button
                        disabled={isLoading}
                        type="submit"
                        size="md"
                        variant="solid"
                        align="center"
                        // TR Sanjai
                        sx={{
                          color: "#fff",
                          backgroundImage:
                            "linear-gradient(45deg, #0288d1, #26c6da) !important",
                          "&.Mui-disabled": {
                            color: "#fff",
                          },
                        }}
                        // TR Sanjai
                      >
                        {/* TR SANJAI */}
                        {isLoading ? (
                          <>
                            <AutorenewIcon className={styles.loadingBtn} />
                            Loading...
                          </>
                        ) : (
                          "CHANGE PASSWORD"
                        )}
                        {/* TR SANJAI */}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* End ModifyPassword design Here */}

      {/* Start ModifyPassword Skeleton Here */}

      {!commonShowForm && (
        <Box>
          <Typography component="h4" variant="h5" align="left" mb={2}>
            <Skeleton
              variant="text"
              animation="wave"
              width={"20%"}
              height={25}
            />
          </Typography>
          <Grid
            container
            direction="row"
            rowSpacing={2}
            spacing={2}
            display={"flex"}
            justifyContent="center"
          >
            <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
              <Grid
                container
                direction="row"
                rowSpacing={2}
                spacing={2}
                display={"flex"}
                justifyContent="center"
              >
                <Grid item xs={12} sm={6} md={6} lg={6} xl={5}>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={"100%"}
                    height={55}
                    sx={{ mt: "20px" }}
                  />
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={"100%"}
                    height={55}
                    sx={{ mt: "20px" }}
                  />
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={"100%"}
                    height={55}
                    sx={{ mt: "20px" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={5}>
                  <Typography
                    component="h4"
                    variant="h5"
                    align="left"
                    sx={{ mt: "18px", ml: "28px" }}
                  >
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={"50%"}
                      height={25}
                    />
                  </Typography>
                  <List>
                    <ListItem sx={{ pt: "0", pb: "0" }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: "38px",
                            height: "38px",
                            bgcolor: "#FFF !important",
                          }}
                        >
                          <Skeleton
                            variant="circular"
                            animation="wave"
                            width={25}
                            height={25}
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={"100%"}
                          height={25}
                        />
                      </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pt: "0", pb: "0" }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: "38px",
                            height: "38px",
                            bgcolor: "#FFF !important",
                          }}
                        >
                          <Skeleton
                            variant="circular"
                            animation="wave"
                            width={25}
                            height={25}
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={"100%"}
                          height={25}
                        />
                      </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pt: "0", pb: "0" }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: "38px",
                            height: "38px",
                            bgcolor: "#FFF !important",
                          }}
                        >
                          <Skeleton
                            variant="circular"
                            animation="wave"
                            width={25}
                            height={25}
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={"100%"}
                          height={25}
                        />
                      </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pt: "0", pb: "0" }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: "38px",
                            height: "38px",
                            bgcolor: "#FFF !important",
                          }}
                        >
                          <Skeleton
                            variant="circular"
                            animation="wave"
                            width={25}
                            height={25}
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={"100%"}
                          height={25}
                        />
                      </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pt: "0", pb: "0" }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: "38px",
                            height: "38px",
                            bgcolor: "#FFF !important",
                          }}
                        >
                          <Skeleton
                            variant="circular"
                            animation="wave"
                            width={25}
                            height={25}
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={"100%"}
                          height={25}
                        />
                      </ListItemText>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={"20%"}
                      height={45}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* End ModifyPassword Skeleton Here */}
    </>
  );
}

export default ModifyPassword;
