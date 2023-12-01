import * as React from "react";
import { useState, useEffect } from "react";
import styles from "../../../../../../pages/surface/clouds/elasticins/create/index.module.css";
import { styled } from "@mui/material/styles";
import { Skeleton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";

import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";

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

// ** Switch Function
const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#6DCCDD",
    "&:hover": {
      backgroundColor: "rgb(109, 204, 221, 0.08)",
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#6DCCDD",
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

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

const Network = ({
  selectedbandwidthpolicyId,
  setselectedbandwidthpolicyId,
  bandwidthpolicyData,
  setbandwidthpolicyData,
  networkIpRequired,
  setnetworkIpRequired,
  publicIpData,
  setpublicIpData,
  switchSar,
  setswitchSar,
  setallowPublicnn,
  allowPublicnn,
  getOrderedIpByTeam,
  setgetOrderedIpValue,
  getOrderedIpValue,
  selectedTeamId,
}) => {
  if (allowPublicnn) {
  } else {
  }
  useEffect(() => {
    if (allowPublicnn) {
    } else {
    }
  }, [allowPublicnn]);

  const handlePNetworkChange = (event) => {
    const newOs = event.target.value;
    //setOs(newOs);
    setselectedbandwidthpolicyId(newOs);
  };

  // Event handler function to update networkIpRequired
  const handleSwitchToggle = (event) => {
    setswitchSar(event.target.checked);
    setnetworkIpRequired(event.target.checked);
  };

  const [defaultIpValue, setDefaultIpvalue] = useState("");
  useEffect(() => {
    setswitchSar(false);
    setnetworkIpRequired(false);
  }, [selectedTeamId]);

  const handleOrderedIpChange = (e) => {
    setgetOrderedIpValue(e.target.value);
  };
  useEffect(() => {
    if (switchSar && getOrderedIpByTeam?.list?.length) {
      const matchingObject = getOrderedIpByTeam?.list.find(
        (item) => item.id === getOrderedIpByTeam?.defaultId
      );
      if (matchingObject) {
        const listValue = matchingObject.value;
        setDefaultIpvalue(matchingObject.value);
        setgetOrderedIpValue(matchingObject.value);
      }
    } else {
      setgetOrderedIpValue("");
    }
  }, [selectedTeamId]);
  useEffect(() => {
    if (switchSar && getOrderedIpByTeam?.list?.length) {
      const matchingObject = getOrderedIpByTeam?.list.find(
        (item) => item.id === getOrderedIpByTeam?.defaultId
      );
      if (matchingObject) {
        const listValue = matchingObject.value;
        setDefaultIpvalue(matchingObject.value);
        setgetOrderedIpValue(matchingObject.value);
      }
    } else {
      setgetOrderedIpValue("");
    }
  }, [switchSar]);

  useEffect(() => {
    if (getOrderedIpByTeam?.list?.length) {
      const matchingObject = getOrderedIpByTeam?.list.find(
        (item) => item.id === getOrderedIpByTeam?.defaultId
      );

      if (matchingObject) {
        const listValue = matchingObject.value;
        setDefaultIpvalue(matchingObject.value);
      }
    }
  }, [selectedTeamId]);
  useEffect(() => {
    if (getOrderedIpByTeam?.list?.length) {
      const matchingObject = getOrderedIpByTeam?.list.find(
        (item) => item.id === getOrderedIpByTeam?.defaultId
      );

      if (matchingObject) {
        const listValue = matchingObject.value;
        setDefaultIpvalue(matchingObject.value);
      }
    }
  }, [switchSar]);
  return (
    <>
      {/* Start Network Bandwidth Speed Here */}
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
              md={9}
              lg={7}
              xl={7}
            >
              <Grid
                sx={{ mt: "0px", borderRadius: "7px" }}
                container
                direction="row"
                rowSpacing={2}
                spacing={3}
              >
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Typography
                    className={styles.cardLabel}
                    component="h4"
                    variant="h5"
                    align="left"
                    fontSize={20}
                    sx={{ position: "relative", top: "-15px" }}
                  >
                    Network
                  </Typography>
                  <Box
                    className={styles.IpRequired}
                    title={"Public / Elastic IP Required"}
                  >
                    Public / Elastic IP Required
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Box
                    align="left"
                    alignItems="left"
                    sx={{ position: "relative", top: "-20px" }}
                    className={styles.ipRequiredSwitcher}
                  >
                    No{" "}
                    <PinkSwitch
                      disabled={!allowPublicnn}
                      onChange={handleSwitchToggle}
                      {...label}
                      checked={networkIpRequired}
                      color="secondary"
                    />{" "}
                    Yes
                  </Box>

                  {switchSar ? (
                    <>
                      {getOrderedIpByTeam.list.length ? (
                        <InstanceFormControl
                          // margin="normal"
                          fullWidth
                          sx={{
                            marginBottom: "2px",
                            top: "-9px",
                            display: "block !important",
                            "& .MuiInputBase-root": { width: "100%" },
                          }}
                        >
                          <Select
                            id="grouped-select"
                            inputProps={{ "aria-label": "Without label" }}
                            value={
                              getOrderedIpValue
                                ? getOrderedIpValue
                                : defaultIpValue
                            }
                            onChange={handleOrderedIpChange}
                            name="ip"
                            // MenuProps={MenuProps}
                          >
                            <MenuItem value="" disabled>
                              Select IP
                            </MenuItem>
                            {getOrderedIpByTeam?.list?.map((ele, i) => (
                              <MenuItem key={i} value={ele.value}>
                                {ele.value}
                              </MenuItem>
                            ))}
                          </Select>
                        </InstanceFormControl>
                      ) : (
                        <Box
                          component="div"
                          sx={{ position: "relative", top: "-10px" }}
                        >
                          {publicIpData && (
                            <Box
                              className={styles.IpRequired}
                              sx={{ display: "flex !important" }}
                            >
                              <Box component="div">SAR</Box>
                              <Box sx={{ position: "absolute", right: "15px" }}>
                                {publicIpData.list[0].cost}
                              </Box>
                            </Box>
                          )}
                        </Box>
                      )}
                    </>
                  ) : (
                    <Box
                      component="div"
                      sx={{
                        position: "relative",
                        top: "-10px",
                        cursor: "not-allowed",
                      }}
                    >
                      {publicIpData && (
                        <Box
                          className={styles.IpRequired}
                          sx={{ display: "flex !important" }}
                        >
                          <Box color="rgba(0, 0, 0, 0.38)" component="div">
                            SAR
                          </Box>
                          <Box
                            color="rgba(0, 0, 0, 0.38)"
                            sx={{ position: "absolute", right: "15px" }}
                          >
                            {publicIpData.list[0].cost}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{ pt: "0 !important" }}
              xs={12}
              sm={12}
              md={3}
              lg={5}
              xl={5}
            >
              <Typography
                className={`${styles.cardLabel} ${styles.BandWidthLabel}`} // TR 01
                component="h4"
                variant="h5"
                align="left"
                fontSize={20}
              >
                Bandwidth Speed
              </Typography>
              <InstanceFormControl margin="normal" fullWidth>
                <CssTextField
                  type="text"
                  id="grouped-select"
                  // displayEmpty
                  value={
                    bandwidthpolicyData.list
                      ? bandwidthpolicyData.list?.map(
                          (elem, index) => elem.value
                        )
                      : ""
                  }
                  disabled
                />
              </InstanceFormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* END Network Bandwidth Speed Here */}
      {/* Start Network Bandwidth Speed Skeleton Here */}
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
              md={9}
              lg={7}
              xl={7}
            >
              <Skeleton variant="text" width={"30%"} height={25} />
              <Grid
                sx={{ mt: "0px", borderRadius: "7px" }}
                container
                direction="row"
                rowSpacing={2}
                spacing={3}
              >
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className={styles.IpRequired}>
                    <Skeleton variant="text" width={"100%"} height={25} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Box align="center" alignItems="center" mt={"16px"}>
                    <Skeleton variant="text" width={"100%"} height={25} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Box align="center" className={styles.IpRequired}>
                    <Skeleton variant="text" width={"100%"} height={25} />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{ pt: "0 !important" }}
              xs={12}
              sm={12}
              md={3}
              lg={5}
              xl={5}
            >
              <Skeleton variant="text" width={"50%"} height={25} />
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
      {/* END Network Bandwidth Speed Skeleton Here */}
    </>
  );
};

export default Network;
