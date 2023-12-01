// ** React Imports
import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Cards from "react-credit-cards-2";
import Cookies from "js-cookie";
import SurfaceLayout from "../../../../components/layouts/surface/Layout";
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

// ** Custom CSS
import styles from "./index.module.css";
import BillingAddress from "../../../../components/pages/surface/billing/bsettings/billingAddress";
import BillingContact from "../../../../components/pages/surface/billing/bsettings/billingContact";
import BillingSettingsTab from "../../../../components/pages/surface/billing/bsettings/billingSettings";
import { useEffect } from "react";

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

function BillingSettings() {
  // ** OverAll Tab Function
  const [ManageDetailValue, setManageDetailValue] = useState("Billing Address");
  const handleManageDetailValue = (event, newManageDetailValue) => {
    setManageDetailValue(newManageDetailValue);
  };
  const cookies = Cookies.get("userData");
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

  const [showConfItems, setShowConfItems] = useState(false);
  useEffect(() => {
    if (cookies) {
      const cachData = cookies ? JSON.parse(cookies) : true;
      console.log(cachData);
      if (
        cachData.role_name === "owner" ||
        cachData.role_name === "billing admin"
      ) {
        setManageDetailValue("Billing Settings");
        setShowConfItems(true);
      } else {
        setManageDetailValue("Billing Address");
      }
    }
  }, []);

  return (
    <SurfaceLayout currentPage={6} setBackgrd={true}>
      {/* Start Breadcrumbs Here */}
      <Breadcrumbs aria-label="breadcrumb">
        <Typography
          component="h4"
          variant="h5"
          align="left"
          color="#fff"
          fontSize={20}
        >
          Billing Settings
        </Typography>
      </Breadcrumbs>
      {/* END Breadcrumbs Here */}
      {/* Start Breadcrumbs Skeleton Here */}
      <Stack spacing={1} sx={{ display: "none" }}>
        <Skeleton variant="text" width={"22%"} height={25} />
      </Stack>
      {/* END Breadcrumbs Skeleton Here */}

      <Card sx={{ mt: 2, borderRadius: "7px", height: "65px" }}>
        <CardContent sx={{ padding: "0px !important" }}>
          <TabContext value={ManageDetailValue}>
            {/* Start Tab List Sekeleton */}
            <Skeleton
              variant="text"
              animation="wave"
              width={"100%"}
              height={115}
              sx={{ borderRadius: "12px", marginTop: "-25px", display: "none" }}
            />
            {/* End Tab List Sekeleton */}
            <TabList
              variant="fullWidth"
              onChange={handleManageDetailValue}
              className={styles.tabContainer}
              aria-label="simple tabs 
                        example"
              TabIndicatorProps={{ style: { backgroundColor: "#6DCCDD" } }}
              sx={{
                "& .MuiTab-root.Mui-selected": {
                  color: "#015578",
                  backgroundColor: "#e1f3f6",
                  fontWeight: "550",
                  height: "65px",
                },
              }}
            >
              {showConfItems && (
                <Tab
                  key={"BillingSettings"}
                  value="Billing Settings"
                  label="Billing Settings"
                  className={styles.tabButton}
                />
              )}

              <Tab
                value="Billing Address"
                label="Billing Address"
                className={styles.tabButton}
              />
              <Tab
                value="Billing Contact"
                label="Billing Contact"
                className={styles.tabButton}
              />
            </TabList>
          </TabContext>
        </CardContent>
      </Card>

      <Card sx={{ mt: 2, borderRadius: "7px" }}>
        <CardContent sx={{ padding: "24px" }}>
          <TabContext value={ManageDetailValue}>
            <TabPanel value="Billing Settings" sx={{ p: 0 }}>
              <BillingSettingsTab />
            </TabPanel>
            <TabPanel value="Billing Address" sx={{ p: 0 }}>
              <BillingAddress />
            </TabPanel>
            <TabPanel value="Billing Contact" sx={{ p: 0 }}>
              <BillingContact />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </SurfaceLayout>
  );
}

export default BillingSettings;
