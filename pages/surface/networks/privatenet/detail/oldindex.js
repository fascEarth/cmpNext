// ** React Imports
import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import SurfaceLayout from "../../../../../components/layouts/surface/Layout";
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
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { MuiOtpInput } from "mui-one-time-password-input";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Switch from "@mui/material/Switch";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Popover from "@mui/material/Popover";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import ListIPDataTable from "../../../../../components/pages/surface/networks/privatenet/detail/ListIPTable";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

// ** MUI ICON Components
import InfoIcon from "@mui/icons-material/Info";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

// ** Custom CSS
import styles from "./index.module.css";
import { General } from "../../../../../components/pages/surface/networks/privatenet/detail/general";
import { StaticIpPool } from "../../../../../components/pages/surface/networks/privatenet/detail/staticIpPool";

// Breadcrumb Select FormControl Custom Style
const BreadcrumbFormControl = styled(FormControl)({
  "& label.Mui-focused": {
    color: "#2183AF",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    color: "#FFF",
    "& fieldset": {
      borderRadius: "7px",
    },
    "&:hover fieldset": {
      border: "2px solid",
      borderColor: "#2183AF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2183AF",
    },
    "& .MuiSvgIcon-root": {
      color: "#FFF",
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

// ** Table Skeleton CSS
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e1f3f6",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

// ** Table Skeleton Function
function TableSkeletonData(id, disk, type, size, cost, action) {
  return { id, disk, type, size, cost, action };
}
const Skeletonrows = [
  TableSkeletonData(1, "SSD", "Standard", "2TB", "$200", "View"),
  TableSkeletonData(2, "HDD", "Premium", "4TB", "$350", "View"),
  TableSkeletonData(3, "SSD", "Basic", "1TB", "$150", "View"),
  TableSkeletonData(4, "HDD", "Standard", "1TB", "$100", "View"),
  TableSkeletonData(5, "SSD", "Premium", "4TB", "$400", "View"),
];

function PrivateDetail() {
  // ** OverAll Tab Function
  const [NetworkDetailValue, setNetworkDetailValue] =
    useState("Static IP Pools");
  const handleNetworkDetailValue = (event, newNetworkDetailValue) => {
    setNetworkDetailValue(newNetworkDetailValue);
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

  return (
    <SurfaceLayout currentPage={2} setBackgrd={true}>
      {/* Start Breadcrumbs Here */}
      <Breadcrumbs aria-label="breadcrumb">
        <Box sx={{ display: "flex" }} className={styles.BreadcrumbsResponsive}>
          <Link href={"#"}>
            <Box
              component="img"
              width={80}
              align="center"
              src="/images/pages/common/BackIcon.png"
              alt="BackIcon"
            />
          </Link>
          <Box className={styles.BreadcrumbSelect}>
            <BreadcrumbFormControl
              fullWidth
              size="small"
              sx={{ background: "#2183AF", borderRadius: "7px", color: "#FFF" }}
            >
              <Select
                defaultValue=""
                id="grouped-select"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                MenuProps={MenuProps}
              >
                <MenuItem value={""} disabled>
                  Select Any
                </MenuItem>
                <MenuItem value={1}>ECCADE-ORGROU-DFNW01</MenuItem>
                <MenuItem value={2}>TESTING-PY2</MenuItem>
              </Select>
            </BreadcrumbFormControl>
          </Box>
        </Box>
      </Breadcrumbs>
      {/* END Breadcrumbs Here */}
      {/* Start Breadcrumbs Skeleton Here */}
      <Breadcrumbs aria-label="breadcrumb" hidden>
        <Box sx={{ display: "flex" }}>
          <Skeleton variant="text" animation="wave" width={120} height={25} />
          <Box className={styles.BreadcrumbSelect}>
            <Skeleton variant="text" animation="wave" height={25} />
          </Box>
        </Box>
      </Breadcrumbs>
      {/* END Breadcrumbs Skeleton Here */}

      <Card sx={{ mt: 2, borderRadius: "7px", height: "65px" }}>
        <CardContent sx={{ padding: "0px !important" }}>
          <TabContext value={NetworkDetailValue}>
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
              onChange={handleNetworkDetailValue}
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
                "& .MuiTabs-fixed": { overflowX: "auto !important" },
                "*::-webkit-scrollbar": {
                  width: "0px",
                  height: "0px",
                },
              }}
            >
              <Tab
                value="General"
                label="General"
                className={styles.tabButton}
              />
              <Tab
                value="Static IP Pools"
                label="Static IP Pools"
                className={styles.tabButton}
              />
              <Tab
                value="IP Usage"
                label="IP Usage"
                className={styles.tabButton}
              />
            </TabList>
          </TabContext>
        </CardContent>
      </Card>

      <Card sx={{ mt: 2, borderRadius: "7px" }}>
        <CardContent sx={{ padding: "24px" }}>
          <TabContext value={NetworkDetailValue}>
            <TabPanel value="General" sx={{ p: 0 }}>
              <General />
            </TabPanel>
            <TabPanel value="Static IP Pools" sx={{ p: 0 }}>
              <StaticIpPool />
            </TabPanel>
            <TabPanel value="IP Usage" sx={{ p: 0 }}>
              {/* Start IP Usage Table Design Here */}
              <Box>
                <ListIPDataTable />
              </Box>
              {/* End IP Usage Table Design Here */}
              {/* Start IP Usage Table Skeleton Here */}

              {/* End IP Usage Table Skeleton Here */}
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </SurfaceLayout>
  );
}

export default PrivateDetail;
