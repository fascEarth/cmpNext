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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LockIcon from "@mui/icons-material/Lock";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";

import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import OutlinedInput from "@mui/material/OutlinedInput";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddNetworkPopup from "../../../networks/privatenet/list/addnetwork/addnetworkpopup";
import Cookies from "js-cookie";
import axios from "axios";
import { useClientIP } from "../../../../../../utils/context/ClientIPContext";

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
    // ****** TR 01 Text field disabled style ******
    "& input.Mui-disabled": {
      cursor: "not-allowed",
    },
    // ****** TR 01 ******
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

// FormControl Custom Style
const ModalFormControl = styled(FormControl)({
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
    // '& .MuiSvgIcon-root': {
    //   right: '45px',
    // },
  },
});

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

// Modal Popup Style
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    // width: '600px',
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const ModalButton = styled(Button)(({ theme }) => ({
  color: "#FFF",
  backgroundImage: "linear-gradient(45deg, #0288d1, #26c6da) !important",
  "&:hover": {
    backgroundImage: "linear-gradient(45deg, #0288d1, #26c6da) !important",
  },
}));

// Select Field CheckBox Names
const names = ["Default", "Admin", "User"];

const PrivateNetworks = ({
  selectedTeamId,
  selectedNetworkId,
  setselectedNetworkId,
  ipModeData,
  setipModeData,
  selectedIpModeId,
  setselectedIpModeId,
  setnetworkIpAddr,
  networkIpAddr,
  setallowPublicnn,
  allowPublicnn,
  setgetOrderedIpByTeam,
}) => {
  const { clientIP } = useClientIP();

  const [isTableLoad, setIsTableaload] = useState(true);

  const handleIpChange = (event) => {
    const newOs = event.target.value;
    //setOs(newOs);
    setnetworkIpAddr(newOs);
  };
  // console.log(networkIpAddr , 'network ip address');
  // ** Modal Popup Function
  const [privateNetPopOpen, setprivateNetPopOpen] = React.useState(false);
  const handleClickOpenPrivateNet = () => {
    setprivateNetPopOpen(true);
  };
  const handleModalClosePrivateNet = () => {
    setprivateNetPopOpen(false);
  };

  // ** Modal Popup Function
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // ** Popover Function
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const Popopen = Boolean(anchorEl);
  const id = Popopen ? "simple-popover" : undefined;

  // Gateway CIDR Popover Function
  const [anchorGatewayEl, setAnchorGatewayEl] = React.useState(null);
  const GatehandleClick = (event) => {
    setAnchorGatewayEl(event.currentTarget);
  };
  const GatewayhandlePopoverClose = () => {
    setAnchorGatewayEl(null);
  };
  const GatewayPopopen = Boolean(anchorGatewayEl);

  // Static IP Pools Popover Function
  const [anchorIppoolsEl, setAnchorIppoolsEl] = React.useState(null);
  const IppoolshandleClick = (event) => {
    setAnchorIppoolsEl(event.currentTarget);
  };
  const IppoolshandlePopoverClose = () => {
    setAnchorIppoolsEl(null);
  };
  const IppoolsPopopen = Boolean(anchorIppoolsEl);

  // Select Field CheckBox Function
  const [personName, setPersonName] = React.useState([]);
  const handleSelectCheckChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const cookies = Cookies.get("userData");
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;

    if (cachData && (selectedTeamId || isTableLoad)) {
      fetchData(cachData);
      setIsTableaload(false);
    }
  }, [isTableLoad, cookies, selectedTeamId]);

  const [allPnetworks, setallPnetworks] = useState([]);
  const fetchData = async (tdata) => {
    const newData = {
      teamId: selectedTeamId,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getTeamByNetworks",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/create",
        finalData
      ); // call the new API route
      if (data) {
        data.map((ele) => {
          if (ele.type === "orderedips") {
            setgetOrderedIpByTeam(ele); //
          }
        });

        const selectedObject = data[0].list?.find(
          (item) => item.id === data[0].defaultId
        );
        setallowPublicnn(selectedObject.allowPublic);

        setselectedNetworkId(data[0].defaultId);
        setallPnetworks(data[0]);

        const itemWithCurrentState1 = data[0].list.find(
          (item) => item.data === "progress"
        );

        if (itemWithCurrentState1) {
          setTimeout(() => {
            fetchData(tdata);
          }, 25000);
        }
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const handlePNetworkChange = (event) => {
    const selectedObject = allPnetworks.list?.find(
      (item) => item.id === event.target.value
    );
    setallowPublicnn(selectedObject.allowPublic);
    const newTeam = event.target.value;

    setselectedNetworkId(newTeam);
  };

  const handlePNeIpModeChange = (event) => {
    const newTeam = event.target.value;

    setselectedIpModeId(newTeam);
    // ****** TR 01 ****** //
    // ip address changed to null when IP mode is Statics IP POOLS
    if (newTeam === 1) {
      setnetworkIpAddr(null);
    }
    // ****** TR 01 end of ip address change when IP mode is Statics IP POOLS ****** //
  };

  const [gatewayCidrValue, setgatewayCidrValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  useEffect(() => {
    if (selectedNetworkId) {
      const selectedObject = allPnetworks.list?.find(
        (item) => item.id === selectedNetworkId
      );

      setgatewayCidrValue(selectedObject?.gatewayCidr);
      const [ipAddress, subnetMask] = selectedObject?.gatewayCidr.split("/");
      const ipParts = ipAddress.split(".");
      const [part1, part2, part3] = ipParts;
      setFormattedValue(`${part1}.${part2}.${part3}.x`);
    }
  }, [selectedNetworkId]);

  // Create the desired format
  return (
    <>
      {/* Start Private Network Here */}
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
                sx={{ position: "relative" }}
              >
                Private Network
                <AddCircleOutlinedIcon
                  className={styles.AddNetworkIcon}
                  onClick={handleClickOpenPrivateNet}
                />{" "}
              </Typography>
              <InstanceFormControl margin="normal" fullWidth>
                <Select
                  value={selectedNetworkId ? selectedNetworkId : "1"}
                  onChange={handlePNetworkChange}
                  id="grouped-select"
                  inputProps={{ "aria-label": "Without label" }}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="1" disabled>
                    Select Network
                  </MenuItem>
                  {allPnetworks.list &&
                    allPnetworks.list.map((elem, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={elem.id}
                          disabled={elem.data === "progress"}
                        >
                          <ListItemText primary={elem.value} />
                          {elem.data === "progress" && (
                            <LockIcon color="grey" />
                          )}
                        </MenuItem>
                      );
                    })}
                </Select>
              </InstanceFormControl>
              {/* Start Add Private Network Modal Popup Here */}
              <AddNetworkPopup
                isTableLoad={isTableLoad}
                setIsTableaload={setIsTableaload}
                privateNetPopOpen={privateNetPopOpen}
                setprivateNetPopOpen={setprivateNetPopOpen}
                handleClickOpenPrivateNet={handleClickOpenPrivateNet}
                handleModalClosePrivateNet={handleModalClosePrivateNet}
                cookies={cookies}
              />

              {/* END Add Private Network Modal Popup Here */}
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
                IP Mode
              </Typography>
              <InstanceFormControl margin="normal" fullWidth>
                <Select
                  value={selectedIpModeId}
                  onChange={handlePNeIpModeChange}
                  id="grouped-select"
                  inputProps={{ "aria-label": "Without label" }}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="" disabled>
                    Select Mode
                  </MenuItem>
                  {ipModeData.list &&
                    ipModeData.list.map((elem, index) => (
                      <MenuItem key={elem.id} value={elem.id}>
                        {elem.value}
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
                IP Address
              </Typography>
              <CssTextField
                onChange={handleIpChange}
                value={networkIpAddr ? networkIpAddr : ""}
                margin="normal"
                fullWidth
                id="address"
                name="address"
                placeholder={formattedValue ? formattedValue : "192.168.101.1"}
                disabled={selectedIpModeId == 1}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* END Private Network Here */}
      {/* Start Private Network Skeleton Here */}
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
      {/* END Private Network Skeleton Here */}
    </>
  );
};

export default PrivateNetworks;
