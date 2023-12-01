import * as React from "react";
import { useState, useEffect } from "react";
import styles from "../../../../../../pages/surface/clouds/elasticins/create/index.module.css";
import { styled } from "@mui/material/styles";
import { Skeleton } from "@mui/material";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import OutlinedInput from "@mui/material/OutlinedInput";
import InfoIcon from "@mui/icons-material/Info";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Checkbox from "@mui/material/Checkbox";

import Cookies from "js-cookie";
import axios from "axios";
import SSHKeyAddForm from "../../../settings/security/sshkeys/addsshkeys";
import { useClientIP } from "../../../../../../utils/context/ClientIPContext";

// Instance FormControl Custom Style
const InstanceFormControl = styled(FormControl)({
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

// Instance FormControl Custom Style
const PasswordFormControl = styled(FormControl)({
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

// ** Select Field Styles
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 205,
    },
  },
};

const Authentication = ({
  pvmpassword,
  setpvmpassword,
  rootPasswordError,
  setRootPasswordError,
  commonsshKeysValues,
  setcommonsshKeysValues,
  OSselected,
}) => {
  const { clientIP } = useClientIP();

  const cookies = Cookies.get("userData");
  const [scachdata, setscachdata] = useState(false);
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;
    if (cachData) {
      setscachdata(cachData);
      fetchData(cachData);
    }
  }, [cookies]);

  const [listsshkeys, setlistsshkeys] = useState(false);

  const fetchData = async (tdata) => {
    const newData = {
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getsshkeys",
      token: tdata.accessToken,
    };

    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/create",
        finalData
      ); // call the new API route
      if (data.data) {
        setlistsshkeys(data.data);
      }
      setsshkeysEffect(false);
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  // ***** TR 01 *****
  const [rootPasswordValidationMsg, setRootPasswordValidationMsg] = useState(
    "Please enter the root password"
  );

  // ** Authentication Tab Function
  const [Authvalue, setAuthValue] = useState("Password");
  const handleAuthChange = (event, newAuthValue) => {
    setAuthValue(newAuthValue);
    console.log(newAuthValue, "new");
  };
  // Bug fixing
  useEffect(() => {
    if (OSselected === "MSWindows") {
      setAuthValue("Password");
      setcommonsshKeysValues([]);
    }
  }, [OSselected]);
  //Password Show
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = (event) => {
    const newPassword = event.target.value;
    setpvmpassword(event.target.value);

    // ***** TR 01 *****
    if (!event.target.value) {
      setRootPasswordError(true);
      setRootPasswordValidationMsg("Please Enter the root password");
    } else if (event.target.value == "") {
      setRootPasswordError(true);
      setRootPasswordValidationMsg("Please Enter the root password");
    } else if (event.target.value.includes(" ")) {
      setRootPasswordError(true);
      setRootPasswordValidationMsg("No spaces allowed");
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/.test(
        event.target.value
      )
    ) {
      setRootPasswordError(true);
      setRootPasswordValidationMsg(
        "The password did not meet the requirements"
      );
    } else {
      setRootPasswordError(false);
    }
    // ***** TR 01 *****

    if (newPassword === "") {
      setSSHTabDisabled(false);
    } else {
      setSSHTabDisabled(true);
    }
    // Disable SSH tab if password is not empty

    // Enable Password tab if password is not empty
    //setPasswordTabDisabled(newPassword === "");
  };

  // ***** TR 01 Rootpassword validation on blur *****
  const handleChangePasswordBlur = (e) => {
    if (!pvmpassword) {
      setRootPasswordError(true);
      setRootPasswordValidationMsg("Please Enter the root password");
    } else if (pvmpassword == "") {
      setRootPasswordError(true);
      setRootPasswordValidationMsg("Please Enter the root password");
    } else if (
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/.test(pvmpassword)
    ) {
      setRootPasswordError(true);
      setRootPasswordValidationMsg(
        "The password did not meet the requirements"
      );
    } else {
      setRootPasswordError(false);
    }
  };
  // ***** END TR 01 validation  on blur *****

  const [sshkeysEffect, setsshkeysEffect] = useState(false);
  const [commonPtype, setcommonPtype] = useState("add");
  const [commonShowForm, setCommonShowForm] = useState(false);
  useEffect(() => {
    console.log("coming");
    if (sshkeysEffect) {
      console.log("coming");
      fetchData(scachdata);
    }
  }, [sshkeysEffect]);

  const [handleClickOpenPass, sethandleClickOpenPass] = useState(false);

  const handleClickPopup = () => {
    sethandleClickOpenPass(true);
  };

  const [isSSHTabDisabled, setSSHTabDisabled] = useState(false);
  const [isPasswordTabDisabled, setPasswordTabDisabled] = useState(false);

  const handleSSHKeyChange = (event) => {
    const selectedSSHKeys = event.target.value;
    setcommonsshKeysValues(selectedSSHKeys);
    // Enable SSH tab if SSH keys are selected
    //setSSHTabDisabled(selectedSSHKeys.length === 0);

    // Disable Password tab if SSH keys are selected
    setPasswordTabDisabled(selectedSSHKeys.length !== 0);
  };
  const handleKeyPress = (e) => {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  };
  return (
    <>
      {/* Start Authentication Here */}
      <Card sx={{ mt: 2, borderRadius: "7px" }}>
        <CardContent sx={{ padding: "24px" }}>
          <Typography
            className={styles.cardLabel}
            component="h4"
            variant="h5"
            align="left"
            fontSize={20}
          >
            Authentication
          </Typography>
          <TabContext value={Authvalue}>
            <TabList
              onChange={handleAuthChange}
              className={styles.tabContainer}
              aria-label="simple tabs example"
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#6DCCDD",
                },
              }}
              sx={{
                "& .MuiTab-root.Mui-selected": {
                  color: "#015578",
                  backgroundColor: "#e1f3f6",
                },
              }}
            >
              <Tab
                disabled={isPasswordTabDisabled}
                value="Password"
                label="Password"
              />
              <Tab
                disabled={isSSHTabDisabled || OSselected === "MSWindows"}
                value="SSH"
                label="SSH Key"
              />
            </TabList>
            <TabPanel
              value="Password"
              className={styles.authenticationTabPanel}
            >
              <Grid
                sx={{ mt: "0px", borderRadius: "7px" }}
                container
                direction="row"
                rowSpacing={2}
                spacing={3}
              >
                <Grid
                  item
                  sx={{ pt: "0 !important" }}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <PasswordFormControl
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: { xs: "15px", md: "45px" } }}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Create Root Password{" "}
                    </InputLabel>
                    <OutlinedInput
                      onKeyPress={handleKeyPress}
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={pvmpassword}
                      onChange={handleChangePassword} // This will update the pvmpassword state
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            // onBlur={handleChangePasswordBlur}
                            edge="end"
                          >
                            {" "}
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Create Root Password"
                    />
                  </PasswordFormControl>
                  {rootPasswordError && (
                    <Typography
                      sx={{ color: "red", fontSize: "14px" }}
                      variant="span"
                    >
                      {rootPasswordValidationMsg}
                    </Typography>
                  )}
                </Grid>
                <Grid
                  item
                  sx={{ pt: "0 !important" }}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: { xs: "center", md: "normal" },
                    }} //TR 01
                  >
                    <InfoIcon
                      sx={{
                        fontSize: "35px",
                        color: "#015578",
                        mt: { xs: 0, md: "55px" },
                      }} //TR 01
                    />
                    <List>
                      <Typography
                        component="h6"
                        variant="h5"
                        align="left"
                        fontSize={14}
                        sx={{
                          paddingLeft: "18px",
                          color: "#000",
                          fontWeight: { xs: "500", sm: "400" },
                        }}
                      >
                        PASSWORD REQUIREMENTS
                      </Typography>
                      <ListItem
                        sx={{
                          color: "#6b6f82",
                          fontSize: "10px!important",
                          pt: 0,
                          pb: 0,
                        }}
                      >
                        <ListItemText className={styles.passwordRequirement}>
                          {" "}
                          {/* TR 01 */}
                          <FiberManualRecordIcon
                            sx={{ fontSize: "10px" }}
                          />{" "}
                          Must be at least 8 characters long
                        </ListItemText>
                      </ListItem>
                      <ListItem
                        sx={{
                          color: "#6b6f82",
                          fontSize: "10px!important",
                          pt: 0,
                          pb: 0,
                        }}
                      >
                        <ListItemText className={styles.passwordRequirement}>
                          {" "}
                          {/* TR 01 */}
                          <FiberManualRecordIcon
                            sx={{ fontSize: "10px" }}
                          />{" "}
                          Must contain 1 uppercase letter
                        </ListItemText>
                      </ListItem>
                      <ListItem
                        sx={{
                          color: "#6b6f82",
                          fontSize: "10px!important",
                          pt: 0,
                          pb: 0,
                        }}
                      >
                        <ListItemText className={styles.passwordRequirement}>
                          {" "}
                          {/* TR 01 */}
                          <FiberManualRecordIcon
                            sx={{ fontSize: "10px" }}
                          />{" "}
                          Must contain 1 number
                        </ListItemText>
                      </ListItem>
                      <ListItem
                        sx={{
                          color: "#6b6f82",
                          fontSize: "10px!important",
                          pt: 0,
                          pb: 0,
                        }}
                      >
                        <ListItemText className={styles.passwordRequirement}>
                          {" "}
                          {/* TR 01 */}
                          <FiberManualRecordIcon
                            sx={{ fontSize: "10px" }}
                          />{" "}
                          Must contain 1 special character
                        </ListItemText>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="SSH">
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ flexBasis: "50%" }}>
                  <InstanceFormControl margin="normal" fullWidth>
                    <InputLabel id="memebers-label">Select any SSH</InputLabel>
                    <Select
                      sx={{
                        width: {
                          sm: "550px",
                          md: "100%",
                          xs: "230px",
                          lg: "100%",
                          xl: "100%",
                        },
                      }}
                      labelId="sshkeys-label"
                      label="Select any SSH"
                      id="sshkeys"
                      multiple
                      value={commonsshKeysValues} // Use commonsshKeysValues directly
                      onChange={handleSSHKeyChange}
                      //      onChange={(event) => setcommonsshKeysValues(event.target.value)} // Update commonsshKeysValues on change
                      renderValue={(selected) => {
                        const selectedTeamNames = listsshkeys
                          .filter((elem) => selected.includes(elem.sshKeyId))
                          .map((elem) => elem.sshKeyName);

                        return selectedTeamNames.join(", ");
                      }}
                    >
                      {/* Add a default option */}
                      <MenuItem value="" disabled>
                        <em>Select any SSH</em>
                      </MenuItem>
                      {listsshkeys &&
                        listsshkeys.map((elem, index) => (
                          <MenuItem key={index} value={elem.sshKeyId}>
                            <Checkbox
                              checked={commonsshKeysValues.includes(
                                elem.sshKeyId
                              )} // Check if the value is in commonsshKeysValues
                            />
                            <ListItemText primary={elem.sshKeyName} />
                          </MenuItem>
                        ))}
                    </Select>
                  </InstanceFormControl>
                </div>

                <Typography
                  className={styles.cardLabel}
                  component="h4"
                  variant="h5"
                  align="left"
                  fontSize={20}
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "20px",
                    marginTop: "7px",
                    cursor: "pointer",
                    width: "100%",
                    maxWidth: "max-content",
                  }}
                  onClick={handleClickPopup}
                >
                  <AddCircleOutlinedIcon
                    className={styles.AddNetworkIcon}
                    style={{ position: "relative" }}
                  />
                  {/* className={styles.AddNetworkIcon} */}
                  <span style={{ color: "#0773a5", paddingLeft: "10px" }}>
                    Add ssh key
                  </span>
                  <span style={{ marginLeft: "20px" }}></span>
                </Typography>
              </div>
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
      {/* END Authentication Here */}
      {/* Start Authentication Skeleton Here */}
      <Card sx={{ mt: 2, borderRadius: "7px" }} hidden>
        <CardContent sx={{ padding: "24px" }}>
          <Stack spacing={0}>
            <Skeleton variant="text" width={"20%"} height={25} />
            <Skeleton
              variant="text"
              width={"100%"}
              height={80}
              sx={{ borderRadius: "12px" }}
            />
          </Stack>
          <Grid
            sx={{ mt: "0px", borderRadius: "7px" }}
            container
            direction="row"
            rowSpacing={2}
            spacing={3}
          >
            <Grid
              item
              sx={{ pt: "0 !important" }}
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
            >
              <Skeleton
                variant="rounded"
                width={"100%"}
                height={58}
                sx={{ mt: 5 }}
              />
            </Grid>
            <Grid
              item
              sx={{ pt: "0 !important" }}
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
            >
              <Box sx={{ display: "flex" }}>
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  sx={{ mt: "50px" }}
                />
                <List>
                  <ListItem
                    sx={{
                      color: "#6b6f82",
                      fontSize: "10px!important",
                      pt: 0,
                      pb: 0,
                    }}
                  >
                    <ListItemText>
                      <Skeleton variant="text" width={"300px"} height={25} />
                    </ListItemText>
                  </ListItem>
                  <ListItem
                    sx={{
                      color: "#6b6f82",
                      fontSize: "10px!important",
                      pt: 0,
                      pb: 0,
                    }}
                  >
                    <ListItemText>
                      <Skeleton variant="text" width={"300px"} height={25} />
                    </ListItemText>
                  </ListItem>
                  <ListItem
                    sx={{
                      color: "#6b6f82",
                      fontSize: "10px!important",
                      pt: 0,
                      pb: 0,
                    }}
                  >
                    <ListItemText>
                      <Skeleton variant="text" width={"300px"} height={25} />
                    </ListItemText>
                  </ListItem>
                  <ListItem
                    sx={{
                      color: "#6b6f82",
                      fontSize: "10px!important",
                      pt: 0,
                      pb: 0,
                    }}
                  >
                    <ListItemText>
                      <Skeleton variant="text" width={"300px"} height={25} />
                    </ListItemText>
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* END Authentication Skeleton Here */}

      <SSHKeyAddForm
        sshkeysEffect={sshkeysEffect}
        setsshkeysEffect={setsshkeysEffect}
        handleClickOpenPass={handleClickOpenPass}
        sethandleClickOpenPass={sethandleClickOpenPass}
      />
    </>
  );
};

export default Authentication;
