// ** React Imports
import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Script from "next/script";

import Link from "next/link";

// ** MUI Components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";

// ** MUI ICON Components

import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import CloseIcon from "@mui/icons-material/Close";

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
// ** Custom CSS
import styles from "./index.module.css";

import AutorenewIcon from "@mui/icons-material/Autorenew";

import { TablePagination } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import InsertPageBreakOutlinedIcon from "@mui/icons-material/InsertPageBreakOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import Menu from "@mui/material/Menu";

import Divider from "@mui/material/Divider";
import ComDataTable from "../../../../../../tools/datatable";

import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { FormHelperText } from "@mui/material";
import { useClientIP } from "../../../../../../../utils/context/ClientIPContext";

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

// FormControl Custom Style
const CssFormControl = styled(FormControl)({
  "& label.Mui-focused": {
    color: "none",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "none",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "0",
      borderRadius: "0",
    },
    "&:hover fieldset": {
      border: "0px solid",
      borderColor: "none",
    },
    "&.Mui-focused fieldset": {
      borderColor: "none",
    },
  },
});

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

// Top Card Table
function createData(name, detail) {
  return { name, detail };
}
const rows = [
  createData("Created On", "08/10/2022, 04:36:17 PM"),
  createData("Created By", "Senthilraj"),
  createData("Team", "Default"),
  createData("OS", "Ubuntu Linux (64-bit)"),
];

// ** Additional Storage Table CSS
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e1f3f6",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

// ** Additional Storage Table Function
function createDiskData(id, disk, type, size, cost, action) {
  return { id, disk, type, size, cost, action };
}

const Diskrows = [
  createDiskData(
    "0",
    <Box variant="text" align="left" className={styles.diskBox}>
      <Box className={styles.tableScrollBox}>Boot Disk</Box>
    </Box>,
    <CssFormControl className={styles.diskSizeBox} size="small">
      <Select
        className={styles.tableScrollSelect}
        defaultValue=""
        id="grouped-select-0"
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        MenuProps={MenuProps}
      >
        <MenuItem value="">Select</MenuItem>
        <MenuItem value={1}>NVMe</MenuItem>
      </Select>
    </CssFormControl>,
    <Box variant="text" align="center" className={styles.diskBox}>
      <Box className={styles.tableScrollBox}>
        <RemoveCircleIcon className={styles.DiskSizeMinus} /> 20 GB{" "}
        <AddCircleOutlinedIcon className={styles.DiskSizePlus} />{" "}
      </Box>
    </Box>,
    <Box variant="text" align="left" className={styles.diskBox}>
      <Box className={styles.tableScrollBox}>9.20</Box>
    </Box>,
    <Box sx={{ marginTop: "10px" }}>
      <RemoveCircleIcon sx={{ cursor: "pointer", color: "#b0b0b0" }} />
    </Box>
  ),

  createDiskData(
    "1",
    <Box variant="text" align="left" className={styles.diskBox}>
      Boot Disk
    </Box>,
    <CssFormControl className={styles.diskSizeBox} size="small">
      <Select
        defaultValue=""
        id="grouped-select-1"
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        MenuProps={MenuProps}
      >
        <MenuItem value="">Select</MenuItem>
        <MenuItem value={1}>NVMe</MenuItem>
      </Select>
    </CssFormControl>,
    <Box variant="text" align="center" className={styles.diskBox}>
      <RemoveCircleIcon className={styles.DiskSizeMinus} /> 20 GB
      <AddCircleOutlinedIcon className={styles.DiskSizePlus} />
    </Box>,
    <Box variant="text" align="left" className={styles.diskBox}>
      9.20
    </Box>,
    <Box sx={{ marginTop: "10px" }}>
      <RemoveCircleIcon sx={{ cursor: "pointer", color: "#b0b0b0" }} />
    </Box>
  ),
];

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

function NetworkDataTable({
  sslugId,
  comisSelectAllowNic,
  isSnapshotDisabled,
  setisNicActionDisabled,
  isStorageActionDisaled,
}) {
  const { clientIP } = useClientIP();
  // console.log(comisSelectAllowNic);
  // default Table items

  const [totalRecords, setTotalRecords] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedRows, setSelectedRows] = useState([]);

  const cookies = Cookies.get("userData");
  const [scachdata, setscachdata] = useState([]);
  const [slugId, setslugId] = useState("");
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;

    if (cachData && sslugId) {
      // console.log(sslugId);
      setslugId(sslugId);
      setscachdata(cachData);
      // console.log(cachData);
      fetchData(cachData, sslugId);
    }
    getTableDatas();
  }, [
    sslugId,
    cookies,
    page,
    rowsPerPage,
    searchText,
    sortColumn,
    sortDirection,
  ]);
  useEffect(() => {
    if (!cookies) {
      Cookies.remove("CollectTableRowsPerPage");
      Cookies.remove("CollectTablePage");
    }
  }, [cookies]);

  // ** OverAll Tab Function
  const [ManageDetailValue, setManageDetailValue] = useState("Overview");
  const handleManageDetailValue = (event, newManageDetailValue) => {
    setManageDetailValue(newManageDetailValue);
  };

  // ** VM Console Modal Popup Function
  const [vmopen, setvmOpen] = React.useState(false);
  const vmhandleClickOpen = () => {
    setvmOpen(true);
  };
  const vmhandleClose = () => {
    setvmOpen(false);
  };

  // Table Action DropDown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  /*const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };*/

  const handleMenuClick = (event, index) => {
    const newMenuState = [...menuState];
    newMenuState[index] = { anchorEl: event.currentTarget, isOpen: true };
    setMenuState(newMenuState);
  };
  const handleClose = (index) => {
    //setAnchorEl(null);
    const newMenuState = [...menuState];
    newMenuState[index] = { anchorEl: null, isOpen: false };
    setMenuState(newMenuState);
  };

  const [menuState, setMenuState] = useState([]);

  /* changing items */
  const [columnLabels, setColumnLabels] = useState({
    status: "Status",
    isprimaryNic: "Primary NIC",
    nic: "NIC",
    isConnected: "Connection Status",
    networkName: "Network",
    ipMode: "IP Mode",
    ipType: "IP Type",
    ipAddress: "IP Address",
    action: "Action",
  });
  const [hideSkeletonTbl, sethideSkeletonTbl] = useState(false);
  const [disableAddNIC, setdisableAddNIC] = useState(false);
  const [allTableData, setallTableData] = useState([]);
  const fetchData = async (tdata, sslugIdK) => {
    /* const data = {
    data:[
        {          
        "power_status":0,
        "primary_nic":"Yes",
        "nic":"0",
        "connection_status":1,
        "network":"ECCADE-ORGROU-DFNW01",
        "ip_mode":"Static IP Pools",
        "ip_type":"IPv4",
        "ip_address":"172.17.48.12",
        },
    ],
    totalRecords:15
    }*/

    const newData = {
      search: searchText,
      start: getPage() * rowsPerPage,
      length: rowsPerPage,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      slugId: sslugIdK,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getNetworkListData",
      token: tdata.accessToken,
    };

    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/detail",
        finalData
      ); // call the new API route
      // console.log(data);

      setData(data.data);
      setTotalRecords(data.totalRecords);
      sethideSkeletonTbl(true);
      // setdisableAddNIC(false);
      // const shouldFetchData = data.data.some(
      //   (row) =>
      //     row.status === "progress" ||
      //     row.status === "updateProgress" ||
      //     row.status === "deleteProgress"
      // );
      // if (shouldFetchData) {
      //   setdisableAddNIC(true);
      //   //if (router.asPath.includes("/surface/clouds/elasticins/manage/detail")) {
      //   // Fetch data every 40 seconds
      //   const timeoutId = setTimeout(() => {
      //     fetchData(tdata, sslugIdK);
      //   }, 40000);

      //   // Cleanup function to clear the timeout when the component unmounts
      //   return () => clearTimeout(timeoutId);
      //   //}
      // }

      if (data.data && data.data.length > 0) {
        const initialMenuState = data.map(() => ({
          anchorEl: null,
          isOpen: false,
        }));
        setMenuState(initialMenuState);
      }
      if (data.recordsSize === 0 && page > 0) {
        setPage(page - 1);
        Cookies.set("CollectTablePage", page - 1);
      }
      getTableDatas();
    } catch (error) {
      // toast.error('An error occurred');
    }
    const tableDataForValidation = {
      search: searchText,
      start: 0,
      length: totalRecords + totalRecords,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      slugId: sslugIdK,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const getAllDatasForValidation = {
      data: tableDataForValidation,
      endPoint: "getNetworkListData",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/detail",
        getAllDatasForValidation
      ); // call the new API route
      if (data) {
        setallTableData(data.data);
        setdisableAddNIC(false);
        setisNicActionDisabled(false);
        Cookies.set("nicInProcess", false);

        const shouldFetchData = data.data.some(
          (row) =>
            row.status === "progress" ||
            row.status === "updateProgress" ||
            row.status === "deleteProgress"
        );
        if (shouldFetchData) {
          setdisableAddNIC(true);
          setisNicActionDisabled(true);
          Cookies.set("nicInProcess", true);

          //if (router.asPath.includes("/surface/clouds/elasticins/manage/detail")) {
          // Fetch data every 40 seconds
          const timeoutId = setTimeout(() => {
            fetchData(tdata, sslugIdK);
          }, 40000);

          // Cleanup function to clear the timeout when the component unmounts
          return () => clearTimeout(timeoutId);
          //}
        }
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const formedTrows = () => {
    return (
      <>
        {data.map((row, index) => (
          <TableRow
            key={index}
            selected={isRowSelected(row)}
            style={{ cursor: "pointer" }}
          >
            {/*<TableCell padding="checkbox" onClick={(event) => handleRowSelect(row)} >
            <Checkbox checked={isRowSelected(row)} />
        </TableCell>*/}
            {Object.keys(columnLabels).map((column) => {
              if (column === "nic") {
                return (
                  <TableCell
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                  >
                    {row[column]}
                  </TableCell>
                );
              } else if (column === "isConnected") {
                if (row[column]) {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Typography
                        component="p"
                        variant="p"
                        align="left"
                        sx={{ color: "#4caf50", fontWeight: "500" }}
                      >
                        Connected
                      </Typography>
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Typography
                        component="p"
                        variant="p"
                        align="left"
                        sx={{ color: "red", fontWeight: "500" }}
                      >
                        Disconnected
                      </Typography>
                    </TableCell>
                  );
                }
              } else if (column === "isprimaryNic") {
                if (row[column]) {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      Yes
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      No
                    </TableCell>
                  );
                }
              } else if (column === "status") {
                if (row[column] === "progress") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          component="p"
                          variant="p"
                          align="left"
                          sx={{ color: "orange", fontWeight: "500" }}
                        >
                          Processing
                        </Typography>
                      </Box>
                    </TableCell>
                  );
                } else if (row[column] === "success") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Box sx={{ display: "flex" }}>
                        <CheckCircleOutlineOutlinedIcon
                          fontSize="small"
                          sx={{
                            marginRight: 0.5,
                            color: "#4caf50",
                            fontWeight: "500",
                          }}
                        />
                        <Typography
                          component="p"
                          variant="p"
                          align="left"
                          sx={{ color: "#4caf50", fontWeight: "500" }}
                        >
                          Normal
                        </Typography>
                      </Box>
                    </TableCell>
                  );
                } else if (row[column] === "failure") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          component="p"
                          variant="p"
                          align="left"
                          sx={{ color: "red", fontWeight: "500" }}
                        >
                          Failure
                        </Typography>
                      </Box>
                    </TableCell>
                  );
                } else if (row[column] === "updateProgress") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          component="p"
                          variant="p"
                          align="left"
                          sx={{ color: "orange", fontWeight: "500" }}
                        >
                          Updating
                        </Typography>
                      </Box>
                    </TableCell>
                  );
                } else if (row[column] === "deleteProgress") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          component="p"
                          variant="p"
                          align="left"
                          sx={{ color: "orange", fontWeight: "500" }}
                        >
                          Deleting
                        </Typography>
                      </Box>
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          component="p"
                          variant="p"
                          align="left"
                          sx={{ color: "grey", fontWeight: "500" }}
                        >
                          {row[column]}
                        </Typography>
                      </Box>
                    </TableCell>
                  );
                }
              } else if (column === "power_status") {
                if (row[column] === 1) {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Typography
                        component="p"
                        variant="p"
                        align="left"
                        sx={{ color: "#4caf50", fontWeight: "500" }}
                      >
                        Connected
                      </Typography>
                    </TableCell>
                  );
                } else if (row[column] === 0) {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Box sx={{ display: "flex" }}>
                        <CheckCircleOutlineOutlinedIcon
                          fontSize="small"
                          sx={{
                            marginRight: 0.5,
                            color: "#4caf50",
                            fontWeight: "500",
                          }}
                        />
                        <Typography
                          component="p"
                          variant="p"
                          align="left"
                          sx={{ color: "#4caf50", fontWeight: "500" }}
                        >
                          Normal
                        </Typography>
                      </Box>
                    </TableCell>
                  );
                } else if (row[column] === 2) {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Box sx={{ display: "flex" }}>
                        <FiberManualRecordIcon
                          fontSize="small"
                          color="success"
                          sx={{ marginRight: 0.5 }}
                        />
                        Running
                      </Box>
                    </TableCell>
                  );
                }
              } else if (column === "connection_status") {
                if (row[column] === 1) {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Typography
                        component="p"
                        variant="p"
                        align="left"
                        sx={{ color: "#4caf50", fontWeight: "500" }}
                      >
                        Connected
                      </Typography>
                    </TableCell>
                  );
                } else if (row[column] === 0) {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Box sx={{ display: "flex" }}>
                        <CheckCircleOutlineOutlinedIcon
                          fontSize="small"
                          sx={{
                            marginRight: 0.5,
                            color: "#4caf50",
                            fontWeight: "500",
                          }}
                        />
                        <Typography
                          component="p"
                          variant="p"
                          align="left"
                          sx={{ color: "#4caf50", fontWeight: "500" }}
                        >
                          Normal
                        </Typography>
                      </Box>
                    </TableCell>
                  );
                } else if (row[column] === 2) {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Box sx={{ display: "flex" }}>
                        <FiberManualRecordIcon
                          fontSize="small"
                          color="success"
                          sx={{ marginRight: 0.5 }}
                        />
                        Running
                      </Box>
                    </TableCell>
                  );
                }
              } else if (column === "action") {
                if (
                  !comisSelectAllowNic ||
                  disableAddNIC ||
                  row.currentstate === 7001 ||
                  isSnapshotDisabled ||
                  isStorageActionDisaled
                ) {
                  return (
                    <TableCell
                      key={column}
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Stack>
                        <Avatar
                          sx={{
                            cursor: "not-allowed",
                            bgcolor: "#6DCCDD",
                            width: 30,
                            height: 30,
                          }}
                        >
                          <MoreHorizOutlinedIcon />
                        </Avatar>
                      </Stack>
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell
                      //key={column}
                      key={"action_" + row.networkNicId + "_" + index}
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(event) => handleMenuClick(event, index)}
                      style={{
                        cursor:
                          row.currentstate === 7001 ||
                          disableAddNIC ||
                          !comisSelectAllowNic ||
                          isSnapshotDisabled ||
                          isStorageActionDisaled
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      <Stack>
                        <Avatar
                          sx={{ bgcolor: "#6DCCDD", width: 30, height: 30 }}
                        >
                          <MoreHorizOutlinedIcon />
                        </Avatar>
                      </Stack>
                    </TableCell>
                  );
                }
              } else {
                return (
                  <TableCell
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                    style={{
                      maxWidth: "100px", // Adjust this value based on your requirement
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 2,
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                    }}
                    title={row[column]}
                  >
                    {row[column] ? row[column] : "-"}
                  </TableCell>
                );
              }
            })}

            <Menu
              sx={{ top: "-10px !important" }}
              key={"menu_" + row.networkNicId + "_" + index}
              id={"basic-menu" + row.networkNicId + "_" + index}
              anchorEl={menuState[index]?.anchorEl}
              open={menuState[index]?.isOpen ? true : false}
              onClose={() => {
                handleClose(index);
              }}
              MenuListProps={{ "aria-labelledby": "basic-button" }}
            >
              {row.isprimaryNic === true && (
                <MenuItem
                  onClick={() => {
                    handleClickOpenPreitems(row.networkNicId, "edit", index);
                  }}
                >
                  <EditOutlinedIcon sx={{ mr: 2, fontSize: "18px" }} /> Edit
                </MenuItem>
              )}
              {row.isprimaryNic === false && row.status !== "failure" && (
                <MenuItem
                  onClick={() => {
                    handleClickOpenPreitems(row.networkNicId, "edit", index);
                  }}
                >
                  <EditOutlinedIcon sx={{ mr: 2, fontSize: "18px" }} /> Edit
                </MenuItem>
              )}
              {row.isprimaryNic === false && row.status !== "failure" && (
                <MenuItem
                  onClick={() => {
                    handleDeleteModalOpen(row, index);
                    // setMenuState([{ anchorEl: null, isOpen: false }]);
                  }}
                >
                  <DeleteOutlineOutlinedIcon sx={{ mr: 2, fontSize: "18px" }} />
                  Delete
                </MenuItem>
              )}
              {row.isprimaryNic === false && row.status === "failure" && (
                <MenuItem
                  onClick={() => {
                    // setMenuState([{ anchorEl: null, isOpen: false }]);

                    handleDeleteModalOpen(row, index);
                  }}
                >
                  <DeleteOutlineOutlinedIcon sx={{ mr: 2, fontSize: "18px" }} />
                  Delete
                </MenuItem>
              )}
            </Menu>
          </TableRow>
        ))}
      </>
    );
  };
  /* changing items */

  const getPage = () => {
    const CollectTablePage = Cookies.get("CollectTablePage");
    if (
      CollectTablePage &&
      (CollectTablePage !== undefined || CollectTablePage !== null)
    ) {
      return CollectTablePage;
    } else {
      return 0;
    }
  };

  const getTableDatas = () => {
    const CollectTablePage = Cookies.get("CollectTablePage");
    const CollectTableRowsPerPage = Cookies.get("CollectTableRowsPerPage");
    if (CollectTablePage && CollectTablePage !== null) {
      setPage(parseInt(CollectTablePage, 10));
    }

    if (CollectTableRowsPerPage && CollectTableRowsPerPage !== null) {
      setRowsPerPage(parseInt(CollectTableRowsPerPage, 10));
    }
  };
  useEffect(() => {
    getTableDatas();
  }, []);

  const handleChangePage = (newPage) => {
    Cookies.set("CollectTablePage", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    Cookies.set("CollectTableRowsPerPage", newRowsPerPage);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    Cookies.remove("CollectTablePage");
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    setPage(0);
    Cookies.remove("CollectTablePage");
  };

  const handleRowSelect = (row) => {
    const selectedIndex = selectedRows.indexOf(row);
    let newSelectedRows = [];

    if (selectedIndex === -1) {
      newSelectedRows = newSelectedRows.concat(selectedRows, row);
    } else if (selectedIndex === 0) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRows = newSelectedRows.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelectedRows);
  };

  const handleSelectAllRows = (selectAll) => {
    if (selectAll) {
      const newSelectedRows = data.map((row) => row);
      setSelectedRows(newSelectedRows);
    } else {
      setSelectedRows([]);
    }
  };

  const handleExport = () => {
    const headerRow = Object.keys(columnLabels)
      .map((column) => columnLabels[column])
      .join(",");

    const selectedData = selectedRows.map((row) =>
      Object.keys(columnLabels)
        .map((column) => row[column])
        .join(",")
    );

    const csvContent = `data:text/csv;charset=utf-8,${encodeURIComponent(
      headerRow + "\n" + selectedData.join("\n")
    )}`;

    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", "selected_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleSearchTextChange = (value) => {
    setSearchText(value);
    setPage(0);
  };
  const isRowSelected = (row) => selectedRows.indexOf(row) !== -1;

  const [networkData, setNetworkData] = useState([]);
  const [iPModeData, setIPModeData] = useState([]);
  const [iPTypeData, setIPTypeData] = useState([]);
  const [nicid, setNicId] = useState("0");

  const handleClickOpenPreitems = async (id, type, index) => {
    //handleClickOpen

    const tdata = scachdata;
    const newData = {
      slugId: slugId,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getallselectInfo",
      token: tdata.accessToken,
    };

    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/detail",
        finalData
      ); // call the new API route
      // console.log(data);
      if (data) {
        const promises = [];
        const passer = {};
        data.map(function (elem) {
          if (elem.type === "network") {
            passer.network = elem.defaultId;
            promises.push(setNetworkData(elem));
          } else if (elem.type === "ipmode") {
            passer.ipmode = elem.defaultId;
            promises.push(setIPModeData(elem));
          } else if (elem.type === "iptype") {
            passer.iptype = elem.defaultId;
            promises.push(setIPTypeData(elem));
          } else if (elem.type === "nic") {
            const id = elem.list ? elem.list[0].value || "0" : "0";
            // console.log(id);
            passer.nic = id;
            promises.push(setNicId(id));
          }
        });
        Promise.all(promises).then(() => {
          handleClickOpen(id, type, passer, index);
        });
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const formCommonMethods = useForm();

  const {
    register: registerCommon,
    handleSubmit: handleSubmitCommon,
    formState: { isSubmitting, errors: errorsCommon },
    reset: resetCommon,
    control: controlCommon,
    watch,
    setValue,
    getValues,
  } = formCommonMethods;

  const [commonFormData, setCommonFormData] = useState({
    nic: "",
    networkId: "",
    ipMode: "",
    ipType: "",
    ipAddress: "",
    isprimaryNic: false,
    isConnected: true,
  });

  const [deleteModal, setDeleteModal] = useState(false);
  const [modalDeleteData, setModalDeleteData] = useState("");
  const [isProceedLoading, setIsProceedLoading] = useState(false);

  const handleDeleteModalOpen = (data, index) => {
    setDeleteModal(true);
    setModalDeleteData(data);
    handleClose(index);
  };

  const handleDeleteModalClose = () => {
    setDeleteModal(false);
  };

  const handleDeleteItem = async (id) => {
    setIsProceedLoading(true);
    setDeleteModal(true);

    const tdata = scachdata;
    const newData = {
      nicid: id,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "deleteNicnw",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/detail",
        finalData
      ); // call the new API route

      if (data) {
        if (data.status === "ok") {
          toast.success("NIC has been deleted successfully!");
          fetchData(tdata, slugId);
          setDeleteModal(false);
          setIsProceedLoading(false);
        }
      }
    } catch (error) {
      toast.error("An error occurred");
      setDeleteModal(false);
      setIsProceedLoading(false);
    }
  };
  const [commonShowForm, setCommonShowForm] = useState(false);
  const [commonPtype, setcommonPtype] = useState("add");
  const [isLoading, setIsLoading] = useState(false);

  const [originalFormDatas, setoriginalFormDatas] = useState({});

  const getParticularData = async (id) => {
    setMenuState([{ anchorEl: null, isOpen: false }]);

    const tdata = scachdata;
    const newData = {
      slugId: id,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getParticularDataNIC",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/detail",
        finalData
      ); // call the new API route

      if (data.status === "ok") {
        setoriginalFormDatas({
          nic: data.message.nic,
          networkId: data.message.networkId,
          ipMode: data.message.ipMode,
          ipType: data.message.ipType,
          isprimaryNic: data.message.isprimaryNic,
          isConnected: data.message.isConnected,
          ipAddress: data.message.ipAddress ? data.message.ipAddress : "",
        });
        // console.log(data.message.isprimaryNic, "data.message.isprimaryNic");
        setCommonFormData({
          nic: data.message.nic,
          networkId: data.message.networkId,
          ipMode: data.message.ipMode,
          ipType: data.message.ipType,
          isprimaryNic: data.message.isprimaryNic,
          isConnected: data.message.isConnected,
          ipAddress: data.message.ipAddress ? data.message.ipAddress : "",
        });
        // console.log(commonFormData);
        setCommonShowForm(true);
        setOpen(true);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };
  function isObjectsEqual() {
    const keysA = commonFormData;
    const keysB = originalFormDatas;

    return (
      keysA.nic !== keysB.nic ||
      keysA.networkId !== keysB.networkId ||
      keysA.ipMode !== keysB.ipMode ||
      keysA.ipType !== keysB.ipType ||
      keysA.isprimaryNic !== keysB.isprimaryNic ||
      keysA.isConnected !== keysB.isConnected ||
      keysA.ipAddress !== keysB.ipAddress
    );
  }

  const oncommonSubmit = async (data) => {
    // Check if all required key values in poiPIstate are filled
    const requiredFields = ["nic", "networkId", "ipMode", "ipType"];

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

  const [pId, setpId] = useState(null);
  const handleDataManipulation = async (data) => {
    // console.log(data);
    setIsLoading(true);
    const tdata = scachdata;

    let pendPoint = "getAdddataInfoNIC";
    data.tenantId = tdata.tenant_id;
    data.tenantVmId = slugId;
    if (commonPtype === "edit") {
      data.networkNicId = pId;

      pendPoint = "getUpdatedataInfoNIC";
    }
    // console.log(data);

    const newData = {
      data: data,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: pendPoint,
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/detail",
        finalData
      ); // call the new API route
      // console.log(data);
      if (data.status === "ok") {
        handleCloseBoot();
        if (commonPtype === "add") {
          if (page !== 0) {
            Cookies.remove("CollectTablePage");
            setPage(0);
          }
          toast.success("NIC has been added successfully!");
        } else {
          toast.success("NIC has been updated successfully!");
        }
        resetCommon();
        fetchData(tdata, slugId);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred");
      setIsLoading(false);
    }
  };

  const [Modalopen, setOpenPar] = React.useState(false);
  // ** Additional NIC Modal Popup Function
  const [bootopen, setOpen] = React.useState(false);

  const handleCloseBoot = () => {
    setOpen(false);
  };
  const handleClickOpen = (id, type, passer, index) => {
    // console.log(passer);
    handleClose(index);
    setpId(id);
    setcommonPtype(type);

    resetCommon();

    setCommonFormData({
      nic: passer.nic,
      networkId: passer.network,
      ipMode: passer.ipmode,
      ipType: "",
      isprimaryNic: false,
      isConnected: true,
      ipAddress: passer.ipAddress ? passer.ipAddress : "",
    });
    if (type === "add") {
      setCommonShowForm(true);
      setOpen(true);
    } else if (type === "edit") {
      getParticularData(id);
    }
  };
  const ModalhandleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setCommonFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleKeyPress = (event) => {};

  const handleInputFocus = (evt) => {
    setCommonFormData((prev) => ({ ...prev, focus: evt.target.name }));
  };
  const [gatewayCidr, setgatewayCidr] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  // const handleNetworkPlaceholder = () => {
  //   const filteredObj = networkData?.list?.find(
  //     (item) => item.id === commonFormData.networkId
  //   );
  //   if (filteredObj) {
  //     const DisabledPlaceholder = filteredObj.gatewayCidr;
  //     setgatewayCidr(DisabledPlaceholder);
  //   }
  // };
  useEffect(() => {
    if (commonFormData.networkId) {
      const selectedObject = networkData.list?.find(
        (item) => item.id === commonFormData.networkId
      );

      setgatewayCidr(selectedObject?.gatewayCidr);
      const [ipAddress, subnetMask] = selectedObject?.gatewayCidr.split("/");
      const ipParts = ipAddress.split(".");
      const [part1, part2, part3] = ipParts;
      setFormattedValue(`${part1}.${part2}.${part3}.x`);
    }
  }, [commonFormData.networkId]);
  return (
    <>
      <Box>
        <Box
          sx={{
            position: "relative",
          }}
        >
          {!comisSelectAllowNic && (
            <Chip
              icon={<ReportProblemOutlinedIcon color="error" />}
              label="Power off the VM instance before adding additional NICs"
              sx={{
                background: "#fff3e0",
                fontSize: "14px",
                color: "#ff9800",
                padding: "0 10px",
              }}
            />
          )}
          {comisSelectAllowNic &&
            !isStorageActionDisaled &&
            isSnapshotDisabled && (
              <Chip
                icon={<ReportProblemOutlinedIcon color="error" />}
                label="please wait until the snapshot action is complete."
                sx={{
                  background: "#fff3e0",
                  fontSize: "14px",
                  color: "#ff9800",
                  padding: "0 10px",
                }}
              />
            )}
          {comisSelectAllowNic &&
            !isSnapshotDisabled &&
            isStorageActionDisaled && (
              <Chip
                icon={<ReportProblemOutlinedIcon color="error" />}
                label="please wait until the storage upgradation gets completed."
                sx={{
                  background: "#fff3e0",
                  fontSize: "14px",
                  color: "#ff9800",
                  padding: "0 10px",
                }}
              />
            )}

          {comisSelectAllowNic &&
            !isSnapshotDisabled &&
            !isStorageActionDisaled && (
              // <Chip
              //   icon={<ReportProblemOutlinedIcon color="error" />}
              //   label="Attach additional NICs to your VM Instance"
              //   sx={{
              //     background: "#fff3e0",
              //     fontSize: "14px",
              //     color: "#ff9800",
              //     padding: "0 10px",
              //   }}
              // />
              <Typography
                component="p"
                variant="p"
                color={"#6b6f82"}
                align="left"
              >
                Attach additional NICs to your VM Instance.
              </Typography>
            )}

          {(disableAddNIC ||
            !comisSelectAllowNic ||
            isSnapshotDisabled ||
            isStorageActionDisaled) && (
            <Box className={styles.StorageAddDisk}>
              <AddCircleOutlinedIcon
                sx={{ cursor: "not-allowed" }}
                className={styles.StorageAddIcon}
              />
              <Typography
                sx={{
                  cursor: "not-allowed",
                  mt: "6px",
                  mr: "15px",
                  color: "#6DCCDD",
                  fontWeight: "500",
                }}
              >
                Additional NIC
              </Typography>
            </Box>
          )}
          {!disableAddNIC &&
            comisSelectAllowNic &&
            !isSnapshotDisabled &&
            !isStorageActionDisaled && (
              <Box
                className={styles.StorageAddDisk}
                onClick={() => handleClickOpenPreitems(null, "add")}
              >
                <AddCircleOutlinedIcon className={styles.StorageAddIcon} />
                <Typography
                  sx={{
                    mt: "6px",
                    mr: "15px",
                    color: "#6DCCDD",
                    fontWeight: "500",
                  }}
                >
                  Additional NIC
                </Typography>
              </Box>
            )}
        </Box>
        {/* Start Here Additional NIC Modal  */}
        <BootstrapDialog
          onClose={handleCloseBoot}
          aria-labelledby="customized-dialog-title"
          open={bootopen}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            align="center"
            onClose={handleCloseBoot}
          >
            {commonPtype === "add" ? "ADD NIC" : "EDIT NIC"}
          </BootstrapDialogTitle>

          {!commonShowForm && <>Loading Please Wait ...</>}
          {commonShowForm && (
            <>
              <Box
                onSubmit={handleSubmitCommon(oncommonSubmit)}
                component="form"
                autoComplete="off"
              >
                <DialogContent dividers>
                  <Grid
                    sx={{ mt: "1px", mb: "15px" }}
                    container
                    direction="row"
                    rowSpacing={2}
                    spacing={2}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      sx={{ paddingTop: "0!important" }}
                    >
                      <CssTextField
                        margin="normal"
                        autoFocus
                        fullWidth
                        id="nic"
                        label="NIC"
                        name="nic"
                        {...registerCommon("nic", {
                          required: "NIC is required",
                        })}
                        value={commonFormData.nic}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        error={!!errorsCommon.nic} // Add the error prop to highlight the field when there is an error
                        helpertext={
                          errorsCommon.nic && errorsCommon.nic.message
                        } // Show the error message
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <ModalFormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          IP Type
                        </InputLabel>
                        <Select
                          id="ipType"
                          label="IP Type"
                          name="ipType"
                          {...registerCommon("ipType", {
                            required: "Please select a ipType", // Add validation rule
                          })}
                          value={
                            commonFormData.ipType ||
                            (iPTypeData.list && iPTypeData.list[0]?.value) ||
                            ""
                          }
                          defaultValue={
                            commonFormData.ipType ||
                            (iPTypeData.list && iPTypeData.list[0]?.value) ||
                            ""
                          }
                          onChange={(e) =>
                            setCommonFormData({
                              ...commonFormData,
                              ipType: e.target.value,
                            })
                          }
                          error={!!errorsCommon.ipType}
                          helpertext={
                            errorsCommon.ipType && errorsCommon.ipType.message
                          }
                          MenuProps={MenuProps}
                        >
                          <MenuItem value="" disabled>
                            Choose your option
                          </MenuItem>
                          {iPTypeData.list &&
                            iPTypeData.list.map((elem) => (
                              <MenuItem key={elem.value} value={elem.value}>
                                {elem.value}
                              </MenuItem>
                            ))}
                        </Select>
                        {errorsCommon.ipType && (
                          <FormHelperText error>
                            {errorsCommon.ipType.message}
                          </FormHelperText>
                        )}
                      </ModalFormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <FormControlLabel
                        name="isprimaryNic"
                        sx={{
                          cursor:
                            originalFormDatas.isprimaryNic === true
                              ? "not-allowed"
                              : "pointer",
                        }}
                        control={
                          <Controller
                            name="isprimaryNic"
                            control={controlCommon} // Use react-hook-form's control
                            value={commonFormData.isprimaryNic}
                            defaultValue={commonFormData.isprimaryNic} // Set the default value as a boolean
                            render={({ field }) => (
                              <Checkbox
                                sx={{
                                  color: "#6b6f82",
                                  "&.Mui-checked": { color: "#015578" },
                                }}
                                {...field}
                                disabled={originalFormDatas.isprimaryNic}
                                checked={getValues("isprimaryNic")}
                                onChange={(e) => {
                                  field.onChange(!getValues("isprimaryNic"));

                                  setCommonFormData({
                                    ...commonFormData,
                                    isprimaryNic: getValues("isprimaryNic"),
                                  });
                                }}
                              />
                            )}
                          />
                        }
                        label="Primary NIC"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <FormControlLabel
                        name="isConnected"
                        control={
                          <Controller
                            name="isConnected"
                            control={controlCommon} // Use react-hook-form's control
                            value={commonFormData.isConnected}
                            defaultValue={commonFormData.isConnected} // Set the default value as a boolean
                            //defaultValue={true} // Set the default value as a boolean
                            render={({ field }) => (
                              <Checkbox
                                sx={{
                                  color: "#6b6f82",
                                  "&.Mui-checked": { color: "#015578" },
                                }}
                                {...field}
                                // checked={field.value} // Use field.value to get the boolean value
                                checked={getValues("isConnected")}
                                // disabled={watch("isprimaryNic")}
                                // onChange={(e) =>
                                //   field.onChange(e.target.checked)
                                // } // Update field value on change
                                onChange={(e) => {
                                  // console.log(
                                  //   e.target.checked,
                                  //   "e.target.checked"
                                  // );
                                  field.onChange(!getValues("isConnected"));
                                  // Toggle the state using setCommonFormData
                                  setCommonFormData({
                                    ...commonFormData,
                                    isConnected: getValues("isConnected"),
                                  });
                                }}
                              />
                            )}
                          />
                        }
                        label="Connected"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <ModalFormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Network
                        </InputLabel>

                        <Select
                          id="networkId"
                          label="Network"
                          name="networkId"
                          {...registerCommon("networkId", {
                            required: "Please select a network", // Add validation rule
                          })}
                          value={commonFormData.networkId}
                          defaultValue={commonFormData.networkId}
                          onChange={(e) => {
                            setCommonFormData({
                              ...commonFormData,
                              networkId: e.target.value,
                            });
                            // handleNetworkPlaceholder(e);
                          }}
                          error={!!errorsCommon.networkId}
                          helpertext={
                            errorsCommon.networkId &&
                            errorsCommon.networkId.message
                          }
                          MenuProps={MenuProps}
                        >
                          <MenuItem value="" disabled>
                            Choose your option
                          </MenuItem>
                          {networkData.list &&
                            networkData.list.map((elem) => (
                              <MenuItem key={elem.id} value={elem.id}>
                                {elem.value}
                              </MenuItem>
                            ))}
                        </Select>
                        {errorsCommon.networkId && (
                          <FormHelperText error>
                            {errorsCommon.networkId.message}
                          </FormHelperText>
                        )}
                      </ModalFormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <ModalFormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          IP Mode
                        </InputLabel>
                        <Select
                          id="ipMode"
                          label="IP Mode"
                          name="ipMode"
                          {...registerCommon("ipMode", {
                            required: "Please select a IP Mode", // Add validation rule
                          })}
                          value={commonFormData.ipMode}
                          defaultValue={commonFormData.ipMode}
                          onChange={(e) =>
                            setCommonFormData({
                              ...commonFormData,
                              ipMode: e.target.value,
                            })
                          }
                          error={!!errorsCommon.ipMode}
                          helpertext={
                            errorsCommon.ipMode && errorsCommon.ipMode.message
                          }
                          MenuProps={MenuProps}
                        >
                          <MenuItem value="" disabled>
                            Choose your option
                          </MenuItem>
                          {iPModeData.list &&
                            iPModeData.list.map((elem) => (
                              <MenuItem key={elem.id} value={elem.id}>
                                {elem.value}
                              </MenuItem>
                            ))}
                        </Select>
                        {errorsCommon.ipMode && (
                          <FormHelperText error>
                            {errorsCommon.ipMode.message}
                          </FormHelperText>
                        )}
                      </ModalFormControl>
                    </Grid>

                    {commonFormData.ipMode === 3 && (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        sx={{ paddingTop: "0!important" }}
                      >
                        <CssTextField
                          margin="normal"
                          fullWidth
                          id="ipAddress"
                          label="IP Address"
                          name="ipAddress"
                          InputLabelProps={{
                            shrink: commonFormData.ipMode === 3,
                          }}
                          placeholder={formattedValue ? formattedValue : ""}
                          {...registerCommon("ipAddress", {
                            required: "IP Address is required",
                            pattern: {
                              value:
                                /^(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                              message: "Invalid IP Address",
                            },
                          })}
                          value={commonFormData.ipAddress}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          error={!!errorsCommon.ipAddress} // Add the error prop to highlight the field when there is an error
                          helpertext={
                            errorsCommon.ipAddress &&
                            errorsCommon.ipAddress.message
                          } // Show the error message
                          //required
                        />
                      </Grid>
                    )}
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <ModalButton
                    type="submit"
                    variant="contained"
                    size="medium"
                    sx={{
                      position: "absolute",
                      left: "45%",
                      "&.MuiButtonBase-root": {
                        backgroundColor: "unset",
                      },
                      "&.MuiButtonBase-root.Mui-disabled": {
                        backgroundColor: "rgba(0, 0, 0, 0.12)",
                      },
                    }}
                    disabled={!isObjectsEqual()}
                  >
                    {isLoading ? (
                      <>
                        <AutorenewIcon
                          className={styles.loadingBtn}
                          sx={{ color: "#fff" }}
                        />
                      </>
                    ) : commonPtype === "add" ? (
                      "ADD"
                    ) : (
                      "UPDATE"
                    )}
                  </ModalButton>
                  <Button onClick={handleCloseBoot} sx={{ color: "#6DCCDD" }}>
                    Close
                  </Button>
                </DialogActions>
              </Box>
            </>
          )}
        </BootstrapDialog>
        {/* End Here Additional NIC Modal  */}
        <Grid
          sx={{ mt: "20px", borderRadius: "7px" }}
          container
          direction="row"
          rowSpacing={2}
          spacing={2}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ paddingTop: "0!important" }}
          >
            <ComDataTable
              hideSkeletonTbl={hideSkeletonTbl}
              searchLabel={"Search NIC"}
              showSearch={false}
              showDownload={false}
              showAddButton={false}
              handleAddEvent={false}
              // tableTitle={"List of NIC"}

              totalRecords={totalRecords}
              data={data}
              page={page}
              rowsPerPage={rowsPerPage}
              searchText={searchText}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              selectedRows={selectedRows}
              columnLabels={columnLabels}
              formedTrows={formedTrows}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              onhandleSort={handleSort}
              onhandleRowSelect={handleRowSelect}
              onhandleSelectAllRows={handleSelectAllRows}
              onhandleExport={handleExport}
              onSearchTextChange={handleSearchTextChange}
            />
          </Grid>
        </Grid>
      </Box>
      {/* Start Network Skeleton Here */}
      <Box hidden>
        <Box sx={{ position: "relative" }}>
          <Skeleton
            variant="rounded"
            animation="wave"
            width={"40%"}
            height={35}
            sx={{ borderRadius: "20px" }}
          />
          <Box className={styles.StorageAddDisk}>
            <Skeleton
              variant="circular"
              animation="wave"
              width={30}
              height={30}
              className={styles.StorageAddIcon}
            />
            <Skeleton
              variant="text"
              animation="wave"
              width={150}
              height={25}
              sx={{ mt: "6px", mr: "15px" }}
            />
          </Box>
        </Box>
        <Grid
          sx={{ mt: "20px", borderRadius: "7px" }}
          container
          direction="row"
          rowSpacing={2}
          spacing={2}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ paddingTop: "0!important" }}
          >
            <TableContainer component={Paper} variant="outlined">
              <Table aria-label="simple table" sx={{ overflowX: "scroll" }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width={80}
                        height={25}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width={80}
                        height={25}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width={80}
                        height={25}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width={80}
                        height={25}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width={80}
                        height={25}
                        sx={{ margin: "0 auto" }}
                      />
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Diskrows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell scope="row" sx={{ p: "10px 16px" }}>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={80}
                          height={25}
                        />
                      </TableCell>
                      <TableCell sx={{ p: "10px 16px" }}>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={80}
                          height={25}
                        />
                      </TableCell>
                      <TableCell sx={{ p: "10px 16px" }}>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={80}
                          height={25}
                        />
                      </TableCell>
                      <TableCell sx={{ p: "10px 16px" }}>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={80}
                          height={25}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ p: "10px 16px" }}>
                        <Skeleton
                          variant="circular"
                          animation="wave"
                          width={30}
                          height={30}
                          sx={{ margin: "0 auto" }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={deleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete NIC?</DialogTitle>
        <DialogContent
          sx={{
            width: { lg: "500px", xs: "100%", sm: "100%", md: "500px" },
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{ marginBottom: "20px" }}
          >
            NIC Name: <b>{modalDeleteData.networkName}</b>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Delete NIC ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#26c6da" }} onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          <Button
            disabled={isProceedLoading}
            onClick={() => handleDeleteItem(modalDeleteData.networkNicId)}
            autoFocus
            variant="contained"
            sx={{
              backgroundImage: "linear-gradient(45deg, #0288d1, #26c6da)",
            }}
          >
            {isProceedLoading ? (
              <AutorenewIcon
                className={styles.loadingBtn}
                sx={{ color: "#fff" }}
              />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NetworkDataTable;
