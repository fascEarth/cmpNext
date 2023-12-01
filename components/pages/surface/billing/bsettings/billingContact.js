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
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// ** MUI ICON Components
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

// ** Custom CSS
import styles from "./index.module.css";

import Cookies from "js-cookie";
import axios from "axios";
import { FormHelperText } from "@mui/material";
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

function BillingContact() {
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
  // const handleInputChange = (evt) => {
  //   const { name, value } = evt.target;
  //   setState((prev) => ({ ...prev, [name]: value }));
  // };
  const handleInputFocus = (evt) => {
    setBillingContact((prev) => ({ ...prev, focus: evt.target.name }));
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
  const [billingContactID, setBillingContactID] = useState("");
  const [billingAlerts, setBillingAlert] = useState(false);
  const [billingContact, setBillingContact] = useState({
    billingEmail: "",
    billingAlert: true,
    billingContactId: "",
    billingEstimate: "",
  });
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
      endPoint: "getallbillContInfo",
      token: tdata.accessToken,
    };
    console.log(finalData);
    try {
      const { data } = await axios.post(
        "/api/surface/billing/bsettings",
        finalData
      ); // call the new API route
      console.log(data);
      if (data) {
        console.log(data, "dataa");
        setBillingContact(data);
        setBillingContactID(data.billingContactId);
        sethideSkeletonibl(true);
      } else {
        sethideSkeletonibl(true);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const formBillingContactInfo = useForm();
  const {
    register: registerBillingInfo,
    handleSubmit: handleSubmitBilling,
    formState: { errors: errorsBillingContactInfo },
    reset: resetpoiPersonalInfo,
    control: controlpoiPersonalInfo,
    setValue: setValuepoiPersonalInfo,
  } = formBillingContactInfo;

  const onBillingSubmit = async (data) => {
    const tdata = stcachData;
    data.billingAlert = billingContact.billingAlert;

    data.billingContactId = billingContactID;
    data.tenantId = tdata.tenant_id;
    const newData = {
      data: data,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "updateBillingContact",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/billing/bsettings",
        finalData
      );
      if (data) {
        if (data.status === "ok") {
          toast.success("Billing Contact has been updated successfully.");
        }
      }
    } catch (error) {}
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target || evt;
    setBillingContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (e) => {
    setBillingContact({
      ...billingContact,
      billingAlert: !billingContact.billingAlert,
    });
  };
  return (
    <>
      {/* Start Billing Contact Here */}

      {hideSkeletonibl && (
        <Box onSubmit={handleSubmitBilling(onBillingSubmit)} component="form">
          <Typography
            component="h4"
            variant="h5"
            align="left"
            fontSize={18}
            mb={2}
            sx={{ fontWeight: "500" }}
          >
            Billing Email Contact
          </Typography>
          <Typography
            component="p"
            variant="p"
            color={"#6b6f82"}
            align="left"
            fontSize={16}
            mb={2}
          >
            You can add a billing contact if you want invoices to be sent to a
            specific address each month.
          </Typography>
          <CssTextField
            {...registerBillingInfo("billingEmail", {
              required: "billingEmail is required",
            })}
            value={
              billingContact.billingEmail ? billingContact.billingEmail : ""
            }
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            margin="normal"
            fullWidth
            id="BillingEmailAddress"
            label="Billing Email Address"
            name="billingEmail"
            className={styles.smBillingEmail}
            sx={{
              width: { lg: "380px", md: "380px", sm: "380px" },
              mb: "25px",
            }}
          />
          {errorsBillingContactInfo.billingEmail && (
            <FormHelperText error>
              {errorsBillingContactInfo.billingEmail.message}
            </FormHelperText>
          )}
          <Divider />
          <Typography
            component="h4"
            variant="h5"
            align="left"
            fontSize={18}
            mt={3}
            mb={2}
            sx={{ fontWeight: "500" }}
          >
            Enable Billing Alerts
          </Typography>
          <Typography
            component="p"
            variant="p"
            color={"#6b6f82"}
            align="left"
            fontSize={16}
            mb={2}
          >
            Configure automated billing alerts to receive emails when a
            specified estimated cost is reached.
          </Typography>
          <Box className={styles.EnableBillingForm} sx={{ display: "flex" }}>
            <EnableBillingSwitch
              onChange={handleToggle}
              // value={billingContact.billingAlert}
              checked={billingContact.billingAlert}
              color="secondary"
              className={styles.EnableBillingSwitch}
              sx={{
                mt: "25px",
                display: { sm: "flex" },
                justifyContent: { sm: "center" },
              }}
            />

            <CssTextField
              {...registerBillingInfo("billingEstimate", {
                required: "billingEstimate is required",
              })}
              margin="normal"
              fullWidth
              id="EstimatedBillingAmount"
              label="Set Estimated Billing Amount"
              name="billingEstimate"
              className={styles.smEnableBilling}
              sx={{ width: "300px", ml: "20px" }}
              value={
                billingContact.billingEstimate
                  ? billingContact.billingEstimate
                  : ""
              }
              onChange={handleInputChange}
            />

            <Box className={styles.BillingSAR}>SAR</Box>
          </Box>
          {errorsBillingContactInfo.billingEstimate && (
            <FormHelperText error>
              {errorsBillingContactInfo.billingEstimate.message}
            </FormHelperText>
          )}
          <Box sx={{ display: "flex", justifyContent: "end", mt: 4 }}>
            <Button
              type="submit"
              size="md"
              variant="solid"
              sx={{
                color: "#fff",
                backgroundImage:
                  "linear-gradient(45deg, #0288d1, #26c6da) !important",
              }}
            >
              SAVE
            </Button>
          </Box>
        </Box>
      )}
      {/* End Billing Contact Here */}
      {/* Start Billing Contact Skeleton Here */}

      {!hideSkeletonibl && (
        <Box>
          <Typography component="h4" variant="h5" align="left" mb={2}>
            <Skeleton variant="text" animation="wave" width={170} height={25} />
          </Typography>
          <Typography component="p" variant="p" align="left" mb={2}>
            <Skeleton
              variant="text"
              animation="wave"
              width={"70%"}
              height={25}
            />
          </Typography>
          <Skeleton
            variant="rounded"
            animation="wave"
            width={380}
            height={56}
            className={styles.skBillingEmail}
            sx={{ mb: "25px" }}
          />
          <Divider />
          <Typography component="h4" variant="h5" align="left" mt={3} mb={2}>
            <Skeleton variant="text" animation="wave" width={170} height={25} />
          </Typography>
          <Typography component="p" variant="p" align="left" mb={2}>
            <Skeleton
              variant="text"
              animation="wave"
              width={"70%"}
              height={25}
            />
          </Typography>
          <Box className={styles.EnableBillingForm} sx={{ display: "flex" }}>
            <Skeleton
              variant="text"
              animation="wave"
              width={55}
              height={35}
              className={styles.EnableBillingSwitch}
              sx={{ mt: "25px" }}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              width={300}
              height={56}
              className={styles.smEnableBilling}
              sx={{ ml: "20px", mt: "14px" }}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              width={100}
              height={56}
              className={styles.BillingSAR}
              sx={{ mt: "-2px" }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", mb: 2, mr: 1 }}>
            <Skeleton
              variant="rounded"
              animation="wave"
              width={100}
              height={56}
              className={styles.BillingSAR}
            />
          </Box>
        </Box>
      )}
      {/* End Billing Contact Skeleton Here */}
    </>
  );
}

export default BillingContact;
