// ** React Imports
import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cards from "react-credit-cards-2";

import Link from "next/link";

// ** MUI Components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Popover from "@mui/material/Popover";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";

// ** MUI ICON Components
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import Cookies from "js-cookie";
import axios from "axios";
import { useClientIP } from "../../../../../utils/context/ClientIPContext";

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
    // '& .MuiSvgIcon-root': {
    //   right: '45px',
    // },
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

// ** Switch Function
const EnableBillingSwitch = styled(Switch)(({ theme }) => ({
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

// Modal Popup Style
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "600px",
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
            top: 4,
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

function BillingAddress() {
  const { clientIP } = useClientIP();

  // ** OverAll Tab Function
  const [ManageDetailValue, setManageDetailValue] =
    useState("Billing Settings");
  const handleManageDetailValue = (event, newManageDetailValue) => {
    setManageDetailValue(newManageDetailValue);
  };

  // ** Credit/Debit Card Tab Function
  const [CreditDetailValue, setCreditDetailValue] = useState("Credit Card");
  const handleCreditDetailValue = (event, newCreditDetailValue) => {
    setCreditDetailValue(newCreditDetailValue);
  };

  // Credit Cards
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  // ** Modal Popup Function
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [hideSkeletonibl, sethideSkeletonibl] = useState(false);
  const cookies = Cookies.get("userData");
  const [stcachData, setstcachData] = useState([]);
  const [billingAddressData, setBillingAddressData] = useState([]);
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;

    setstcachData(cachData);
    if (cookies) {
      fetchData(cachData);
    }
  }, [cookies]);

  const fetchData = async (tdata) => {
    const newData = {
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getallbillAddrInfo",
      token: tdata.accessToken,
    };
    console.log(finalData);
    try {
      const { data } = await axios.post(
        "/api/surface/billing/bsettings",
        finalData
      ); // call the new API route

      if (data) {
        setBillingAddressData(data);

        sethideSkeletonibl(true);
      } else {
        sethideSkeletonibl(true);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  return (
    <>
      {/* Start Billing Address Here */}
      {hideSkeletonibl && (
        <Box>
          <Typography
            component="h4"
            variant="h5"
            align="left"
            fontSize={18}
            mb={2}
            sx={{ fontWeight: "500" }}
          >
            Billing Address
          </Typography>
          <Grid container direction="row" rowSpacing={2} spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <CssTextField
                value={
                  billingAddressData.buildingNumber
                    ? billingAddressData.buildingNumber
                    : ""
                }
                disabled
                margin="normal"
                autoFocus
                fullWidth
                id="BuildingNumber"
                label="Building Number"
                name="Building Number"
              />
              <CssTextField
                value={
                  billingAddressData.zipCode ? billingAddressData.zipCode : ""
                }
                disabled
                margin="normal"
                fullWidth
                id="PostalZipCode"
                label="Postal / Zip Code"
                name="Postal / Zip Code"
              />
              <CssFormControl margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select City
                </InputLabel>
                <Select
                  disabled
                  id="grouped-select"
                  label="Select City"
                  MenuProps={MenuProps}
                  value={billingAddressData.city ? billingAddressData.city : ""}
                >
                  <MenuItem value="" disabled>
                    Select your city
                  </MenuItem>
                  <MenuItem value="Riyadh">Riyadh</MenuItem>
                  <MenuItem value="Jeddah">Jeddah</MenuItem>
                  <MenuItem value="Makkah">Makkah</MenuItem>
                </Select>
              </CssFormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <CssTextField
                disabled
                margin="normal"
                fullWidth
                id="StreetRoad"
                label="Street / Road"
                name="Street / Road"
                value={
                  billingAddressData.street ? billingAddressData.street : ""
                }
              />
              <CssTextField
                disabled
                margin="normal"
                fullWidth
                id="POBox"
                label="P.O. Box"
                name="P.O. Box"
                value={
                  billingAddressData.postBox ? billingAddressData.postBox : ""
                }
              />
              <CssFormControl margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Country
                </InputLabel>
                <Select
                  disabled
                  id="grouped-select"
                  label="Select Country"
                  MenuProps={MenuProps}
                  value={
                    billingAddressData.country ? billingAddressData.country : ""
                  }
                >
                  <MenuItem value="" disabled>
                    Select your country
                  </MenuItem>
                  <MenuItem value="Saudi Arabia (KSA)">
                    Saudi Arabia (KSA)
                  </MenuItem>
                </Select>
              </CssFormControl>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* End Billing Address Here */}
      {/* Start Billing Address Skeleton Here */}

      {!hideSkeletonibl && (
        <Box>
          <Typography component="h4" variant="h5" align="left" mb={2}>
            {" "}
            <Skeleton variant="text" animation="wave" width={170} height={25} />
          </Typography>
          <Grid container direction="row" rowSpacing={2} spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Skeleton
                variant="rounded"
                animation="wave"
                width={"100%"}
                height={56}
                sx={{ mt: "15px", mb: "25px" }}
              />
              <Skeleton
                variant="rounded"
                animation="wave"
                width={"100%"}
                height={56}
                sx={{ mt: "15px", mb: "25px" }}
              />
              <Skeleton
                variant="rounded"
                animation="wave"
                width={"100%"}
                height={56}
                sx={{ mt: "15px" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Skeleton
                variant="rounded"
                animation="wave"
                width={"100%"}
                height={56}
                sx={{ mt: "15px", mb: "25px" }}
              />
              <Skeleton
                variant="rounded"
                animation="wave"
                width={"100%"}
                height={56}
                sx={{ mt: "15px", mb: "25px" }}
              />
              <Skeleton
                variant="rounded"
                animation="wave"
                width={"100%"}
                height={56}
                sx={{ mt: "15px" }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {/* End Billing Address Skeleton Here */}
    </>
  );
}

export default BillingAddress;
