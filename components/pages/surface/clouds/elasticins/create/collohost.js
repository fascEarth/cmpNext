import * as React from "react";
import { useState, useEffect } from "react";
import styles from "../../../../../../pages/surface/clouds/elasticins/create/index.module.css";
import { styled } from "@mui/material/styles";
import { InputLabel, Skeleton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import InfoIcon from "@mui/icons-material/Info";
import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";

//
import LockIcon from "@mui/icons-material/Lock";
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

const CollobHost = ({
  hostnameap,
  selectedTeamId,
  selectedTagId,
  selectedOsStyle,
  teamsData,
  tagsData,
  setselectedTeamId,
  setselectedTagId,
  sethostnameap,
  hostNameError,
  setHostNameError,
  OSselected,
}) => {
  // **** TR01  for host name error state *****
  const [hostNameErrMsg, setHostNameErrMsg] = useState(
    "Please enter valid host name"
  );
  // **** TR01  for host name error state *****
  const handleTeamChange = (event) => {
    const newTeam = event.target.value;

    setselectedTeamId(newTeam);
  };
  const handleTagChange = (event) => {
    const newTeam = event.target.value;
    setselectedTagId(newTeam);
  };

  const [os, setOs] = useState("");
  // Generate a random UID when the component mounts

  useEffect(() => {
    if (selectedOsStyle) {
      //sethostnameap(selectedOsStyle);

      const generateUid = () => {
        const uid = Math.floor(Math.random() * Math.pow(10, 15))
          .toString()
          .substring(0, 6);
        return uid;
      };

      const newUid = generateUid();

      if (selectedOsStyle) {
        let updatedOs = selectedOsStyle.value;

        // Update the 'os' variable based on your conditions
        if (
          selectedOsStyle.value === "RedHat(RHEL)" ||
          selectedOsStyle.value === "RedhatRHEL"
        ) {
          updatedOs = "RHEL";
        } else if (selectedOsStyle.value === "PhotonOS") {
          updatedOs = "Photon";
        } else if (selectedOsStyle.value === "MSWindows") {
          updatedOs = "Windows";
        }

        // Set the updated 'os' value in the state
        //setOs(updatedOs+"-"+newUid);
        sethostnameap(updatedOs + "-" + newUid);
      }
    }
  }, [selectedOsStyle]);

  // Handle changes in the text field
  const handleOsChange = (event) => {
    const newOs = event.target.value;
    //setOs(newOs);
    // ***** TR01 ******//
    if (newOs.includes("Redhat")) {
      newOs.replace("Redhat(RHEL)", "RHEL");
    }
    sethostnameap(newOs);
    if (!event.target.value) {
      setHostNameError(true);
      setHostNameErrMsg("Please enter the host name");
    } else if (!/^(?!-)[a-zA-Z0-9-]{3,15}(?!-)$/.test(event.target.value)) {
      setHostNameError(true);
    } else {
      setHostNameError(false);
    }
    // ***** TR01 ******//
  };
  // ***** TR01 Hostname  ******//
  useEffect(() => {
    if (hostnameap.includes("Redhat(RHEL)") && OSselected) {
      const newOSNAME = hostnameap.replace("Redhat(RHEL)", "RHEL");
      sethostnameap(newOSNAME);
    }

    if (/^(?!-)[a-zA-Z0-9-]{3,15}(?!-)$/.test(hostnameap)) {
      setHostNameError(false);
    }
  }, [OSselected, hostnameap]);
  // ***** TR01 ******//
  return (
    <>
      {/* Start Instance Here */}
      <Card
        sx={{
          mt: 2,
          borderRadius: "7px",
          position: "relative",
          overflow: "initial",
        }}
      >
        <CardContent sx={{ padding: "24px" }}>
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
              md={4}
              lg={4}
              xl={4}
            >
              <Typography
                className={styles.cardLabel} // TR 01
                component="h4"
                variant="h5"
                align="left"
                fontSize={20}
              >
                Instance Label / Hostname
                <Box className={styles.InstanceInfoIcon}>
                  <InfoIcon sx={{ width: "30px", height: "30px" }}></InfoIcon>
                  <Card
                    sx={{ mt: 2, borderRadius: "7px", overflow: "initial" }}
                    className={styles.InstanceInfoDetail}
                  >
                    <CardContent sx={{ padding: "24px" }}>
                      <Typography
                        component="p"
                        variant="p"
                        align="left"
                        fontSize={16}
                      >
                        Hostname must contain only alphanumeric characters and
                        hyphens.
                      </Typography>
                      <Typography
                        component="p"
                        variant="p"
                        align="left"
                        pt={1}
                        fontSize={16}
                      >
                        Length can be 3 to 15 characters long.
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Typography>

              <CssTextField
                required={true}
                // onBlur={handleOsBlur}
                onChange={handleOsChange}
                margin="normal"
                fullWidth
                value={
                  hostnameap.includes("Redhat")
                    ? hostnameap.replace("Redhat(RHEL)", "RHEL")
                    : hostnameap
                }
                id="instance"
                name="instance"
                inputProps={{ minlenth: 3, maxLength: 15 }}
              />
              {/* // ***** TR01 ******/}
              {hostNameError && (
                <Typography
                  sx={{ color: "red", fontSize: "14px" }}
                  variant="span"
                >
                  {hostNameErrMsg}
                </Typography>
              )}
            </Grid>
            <Grid
              item
              sx={{ pt: "0 !important" }}
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
            >
              <Typography
                className={styles.cardLabel} // TR 01
                component="h4"
                variant="h5"
                align="left"
                fontSize={20}
              >
                Team
              </Typography>
              <InstanceFormControl
                margin="normal"
                fullWidth
                className={styles.instanceFormControll}
              >
                <InputLabel
                  id="demo-multiple-checkbox-label"
                  style={{ backgroundColor: "#fff", padding: "0 3px" }}
                >
                  Select Team
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  label="Select Team"
                  value={selectedTeamId != 0 ? selectedTeamId : ""}
                  onChange={handleTeamChange}
                  id="grouped-select"
                  inputProps={{ "aria-label": "Without label" }}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="" disabled>
                    Select Team
                  </MenuItem>
                  {teamsData.list &&
                    teamsData.list.map((elem, index) => (
                      <MenuItem
                        key={index}
                        value={elem.id}
                        disabled={elem.isUsed}
                        sx={{ justifyContent: "space-between" }}
                      >
                        {elem.value}
                        {elem.isUsed && <LockIcon color="grey" />}
                      </MenuItem>
                    ))}
                </Select>
              </InstanceFormControl>
            </Grid>
            <Grid
              item
              sx={{ pt: "0 !important" }}
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
            >
              <Typography
                className={styles.cardLabel} // TR 01
                component="h4"
                variant="h5"
                align="left"
                fontSize={20}
              >
                Tags
              </Typography>
              <InstanceFormControl
                margin="normal"
                fullWidth
                className={styles.instanceFormControll}
              >
                <InputLabel
                  id="tag-label"
                  style={{ backgroundColor: "#fff", padding: "0 3px" }}
                >
                  Select Tag
                </InputLabel>
                <Select
                  labelId="tag-label"
                  label="Select Tag"
                  value={selectedTagId}
                  onChange={handleTagChange}
                  id="grouped-select"
                  inputProps={{ "aria-label": "Without label" }}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="" disabled>
                    Select Tag
                  </MenuItem>
                  {tagsData.list &&
                    tagsData.list.map((elem, index) => (
                      <MenuItem key={elem.id} value={elem.id}>
                        {elem.value}
                      </MenuItem>
                    ))}
                </Select>
              </InstanceFormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* END Instance Here */}
      {/* Start Instance Skeleton Here */}
      <Card
        sx={{
          mt: 2,
          borderRadius: "7px",
          position: "relative",
          overflow: "initial",
        }}
        hidden
      >
        <CardContent sx={{ padding: "24px" }}>
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
              md={4}
              lg={4}
              xl={4}
            >
              <Skeleton variant="text" width={"100%"} height={25} />
              <Skeleton
                variant="rounded"
                width={"100%"}
                height={58}
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid
              item
              sx={{ pt: "0 !important" }}
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
            >
              <Skeleton variant="text" width={"100%"} height={25} />
              <Skeleton
                variant="rounded"
                width={"100%"}
                height={58}
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid
              item
              sx={{ pt: "0 !important" }}
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
            >
              <Skeleton variant="text" width={"100%"} height={25} />
              <Skeleton
                variant="rounded"
                width={"100%"}
                height={58}
                sx={{ mt: 2 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* END Instance Skeleton Here */}
    </>
  );
};

export default CollobHost;
