// ** React Imports
import * as React from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import { useClientIP } from "../../../../../../../utils/context/ClientIPContext";

// ** MUI Components
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  Checkbox,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Popover from "@mui/material/Popover";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import ComDataTable from "../../../../../../tools/datatable";

// ** MUI ICON Components
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import InsertPageBreakOutlinedIcon from "@mui/icons-material/InsertPageBreakOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Custom CSS
import styles from "./index.module.css";
import Link from "next/link";
import AddNetworkPopup from "../addnetwork/addnetworkpopup";

// linearProgress CSS Style
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#d8d8d8",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#2ed69b",
  },
}));

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

// Select Field CheckBox Names
const names = ["Default", "Admin", "User"];

// ** Table ODD AND EVEN Styles
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#FFF",
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function PrivateNetworkListDataTable() {
  const { clientIP } = useClientIP();

  // ** Modal Popup Function
  const [privateNetPopOpen, setprivateNetPopOpen] = React.useState(false);
  const handleClickOpenPrivateNet = () => {
    setprivateNetPopOpen(true);
  };
  const handleModalClosePrivateNet = () => {
    setprivateNetPopOpen(false);
  };

  // ** Popover Function
  const [popanchorEl, setpopAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setpopAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setpopAnchorEl(null);
  };
  const Popopen = Boolean(popanchorEl);
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

  // default Table items
  const [totalRecords, setTotalRecords] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedRows, setSelectedRows] = useState([]);
  const [hideSkeletonTbl, sethideSkeletonTbl] = useState(false);

  const cookies = Cookies.get("userData");
  //TR 01 role name
  const [roleName, setRoleName] = useState();
  //  FOR TABLE LOAD
  const [isTableLoad, setIsTableaload] = useState(false);
  const [scachdata, setscachdata] = useState(false);
  useEffect(() => {
    if (isTableLoad) {
      fetchData(scachdata);
      setIsTableaload(false);
    }
  }, [isTableLoad]);
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;
    //TR 01 get and set the role name from cookie
    setRoleName(cachData.role_name);
    if (cachData) {
      setscachdata(cachData);
      fetchData(cachData);
      /*setTimeout(() => {
          sethideSkeletonTbl(true);
         
        }, 2000); */
    }
    getTableDatas();
  }, [cookies, page, rowsPerPage, searchText, sortColumn, sortDirection]);

  // Table Action DropDown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event, index) => {
    setSlugIdIndex(index);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* changing items */
  const [columnLabels, setColumnLabels] = useState({
    networkName: "Name",
    networkStatus: "Status",
    networkDesc: "Description",
    gatewayCidr: "Gateway CIDR",
    networkType: "Network Type",
    teams: "Team",
    ipConsumed: "IP Consumed",
    action: "Action",
  });

  const fetchData = async (tdata) => {
    const newData = {
      search: searchText,
      start: getPage() * rowsPerPage,
      length: rowsPerPage,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getallpnlInfo",
      token: tdata.accessToken,
      ipaddress: clientIP,
    };

    try {
      const { data } = await axios.post(
        "/api/surface/networks/privatenet/list",
        finalData
      ); // call the new API route
      setData(data.data);
      if (data.recordsSize === 0 && page > 0) {
        setPage(page - 1);
        Cookies.set("CollectTablePage", page - 1);
      }
      getTableDatas();
      console.log(data, "table Data");
      setTotalRecords(data.totalRecords);

      sethideSkeletonTbl(true);
      const shouldFetchData = data.data.some(
        (row) => row.networkStatus === "progress"
      );
      if (shouldFetchData) {
        const timeoutId = setTimeout(() => {
          fetchData(tdata);
        }, 15000);

        // Cleanup function to clear the timeout when the component unmounts
        return () => clearTimeout(timeoutId);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };
  const [slugIdIndex, setSlugIdIndex] = useState(null);
  const formedTrows = () => {
    return (
      <>
        {data.map((row, index) => {
          return (
            <StyledTableRow
              key={index}
              selected={isRowSelected(row)}
              style={{ cursor: "pointer" }}
            >
              {Object.keys(columnLabels).map((column) => {
                if (column === "networkStatus") {
                  if (row[column] === "success") {
                    return (
                      <TableCell
                        key={column}
                        onClick={(event) => handleRowSelect(row)}
                      >
                        <Box sx={{ display: "flex" }}>
                          <Link
                            href={
                              row.networkStatus === "success"
                                ? `/surface/networks/privatenet/detail/${row.networkId}`
                                : ""
                            }
                            style={{
                              textDecoration: "none",
                              color: "4caf50",
                              display: "flex",
                            }}
                            passHref
                          >
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
                          </Link>
                        </Box>
                      </TableCell>
                    );
                  } else if (row[column] === "progress") {
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
                  } else {
                    return (
                      <TableCell
                        key={column}
                        onClick={(event) => handleRowSelect(row)}
                      >
                        <Box sx={{ display: "flex" }}>
                          <FiberManualRecordIcon
                            fontSize="small"
                            color="error"
                            sx={{ marginRight: 0.5 }}
                          />
                          Failed
                        </Box>
                      </TableCell>
                    );
                  }
                } else if (column === "networkName") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                      style={{
                        maxWidth: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                      }}
                      title={row[column]}
                    >
                      <Typography
                        component="p"
                        variant="p"
                        align="left"
                        sx={{ fontWeight: "500" }}
                        style={{
                          maxWidth: "100px",
                          overflow: "hidden",
                          color: "rgba(0, 0, 0, 0.87)",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                        }}
                      >
                        <Link
                          href={
                            row.networkStatus === "success"
                              ? `/surface/networks/privatenet/detail/${row.networkId}`
                              : ""
                          }
                          style={{
                            textDecoration: "none",
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                          passHref
                        >
                          {row[column]}
                        </Link>
                      </Typography>
                    </TableCell>
                  );
                } else if (column === "networkDesc") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                      style={{
                        maxWidth: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                      }}
                      title={row[column]}
                    >
                      <Typography
                        component="p"
                        variant="p"
                        align="left"
                        sx={{ fontWeight: "500" }}
                        style={{
                          maxWidth: "100px",
                          overflow: "hidden",
                          color: "rgba(0, 0, 0, 0.87)",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                        }}
                      >
                        <Link
                          href={
                            row.networkStatus === "success"
                              ? `/surface/networks/privatenet/detail/${row.networkId}`
                              : ""
                          }
                          style={{
                            textDecoration: "none",
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                          passHref
                        >
                          {row[column] ? row[column] : "-"}
                        </Link>
                      </Typography>
                    </TableCell>
                  );
                } else if (column === "gatewayCidr") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                      style={{
                        maxWidth: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                      }}
                      title={row[column]}
                    >
                      <Typography
                        component="p"
                        variant="p"
                        align="left"
                        sx={{ fontWeight: "500" }}
                        style={{
                          maxWidth: "100px",
                          overflow: "hidden",
                          color: "rgba(0, 0, 0, 0.87)",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                        }}
                      >
                        <Link
                          href={
                            row.networkStatus === "success"
                              ? `/surface/networks/privatenet/detail/${row.networkId}`
                              : ""
                          }
                          style={{
                            textDecoration: "none",
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                          passHref
                        >
                          {row[column] ? row[column] : ""}
                        </Link>
                      </Typography>
                    </TableCell>
                  );
                } else if (column === "networkType") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                      style={{
                        maxWidth: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                      }}
                      title={row[column]}
                    >
                      <Typography
                        component="p"
                        variant="p"
                        align="left"
                        sx={{ fontWeight: "500" }}
                        style={{
                          maxWidth: "100px",
                          overflow: "hidden",
                          color: "rgba(0, 0, 0, 0.87)",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                        }}
                      >
                        <Link
                          href={
                            row.networkStatus === "success"
                              ? `/surface/networks/privatenet/detail/${row.networkId}`
                              : ""
                          }
                          style={{
                            textDecoration: "none",
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                          passHref
                        >
                          {row[column] ? row[column] : ""}
                        </Link>
                      </Typography>
                    </TableCell>
                  );
                } else if (column === "ipConsumed") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                      sx={{ position: "relative" }}
                    >
                      <Box sx={{ position: "relative" }}>
                        <BorderLinearProgress
                          variant="determinate"
                          value={row[column]}
                        />
                        <Box className={styles.IpConsumed}>{row[column]}%</Box>
                      </Box>
                    </TableCell>
                  );
                } else if (column === "action") {
                  if (roleName === "owner" || roleName === "administrator") {
                    if (row.networkStatus === "progress") {
                      return (
                        <TableCell
                          key={column}
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          // onClick={(e) => handleMenuClick(e, index)}
                          sx={{
                            cursor:
                              row.networkStatus === "success"
                                ? "pointer !important "
                                : " not-allowed !important",
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
                    } else {
                      return (
                        <TableCell
                          key={column}
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={(e) => handleMenuClick(e, index)}
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
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        sx={{ cursor: "not-allowed" }}
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
                } else if (column === "teams") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                      style={{
                        maxWidth: "100px", // Adjust this value based on your requirement
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                      }}
                      title={row[column]?.join(", ")}
                    >
                      <Link
                        href={
                          row.networkStatus === "success"
                            ? `/surface/networks/privatenet/detail/${row.networkId}`
                            : ""
                        }
                        style={{
                          textDecoration: "none",
                          color: "rgba(0, 0, 0, 0.87)",
                        }}
                        passHref
                      >
                        {row[column] ? row[column]?.join(",") : "-"}
                      </Link>
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell
                      style={{
                        maxWidth: "100px", // Adjust this value based on your requirement
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                      }}
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                      title={row[column] ? row[column] : "-"}
                    >
                      {row[column] ? row[column] : "-"}
                    </TableCell>
                  );
                }
              })}

              <Menu
                sx={{ top: "-10px !important" }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open && slugIdIndex === index}
                onClose={handleClose}
                MenuListProps={{ "aria-labelledby": "basic-button" }}
              >
                <MenuItem
                  sx={{
                    display: row.networkStatus === "failure" ? "none" : "block",
                  }}
                >
                  <Link
                    href={
                      row.networkStatus === "success"
                        ? `/surface/networks/privatenet/detail/${row.networkId}`
                        : ""
                    }
                    style={{ textDecoration: "none", color: "inherit" }}
                    passHref
                  >
                    <EditOutlinedIcon
                      sx={{
                        position: "relative",
                        top: "3px",
                        mr: 1,
                        fontSize: "18px",
                      }}
                    />{" "}
                    Edit
                  </Link>
                </MenuItem>
                {/* <MenuItem onClick={handleClose}><EditOutlinedIcon sx={{mr:1, fontSize: '18px'}} /> Edit</MenuItem> */}
                {!row.sysDefined && (
                  <MenuItem
                    onClick={() =>
                      handleOpenDialog(
                        index,
                        row.networkName,
                        "Delete Network ?",
                        "Private Networks :",
                        "Are you sure you want to Delete Network?",
                        "CANCEL",
                        "DELETE",
                        "delete",

                        row.networkId
                      )
                    }
                  >
                    <DeleteOutlineOutlinedIcon
                      sx={{ mr: 1, fontSize: "18px" }}
                    />{" "}
                    Delete
                  </MenuItem>
                )}
              </Menu>
            </StyledTableRow>
          );
        })}

        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle className={styles.DialogTitle}>
            {commonDialTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {commonDialContent}
              <span style={{ color: "black", fontWeight: "bold" }}>
                {commonDialAddress}
              </span>
              <br />
              <br />
              {commonDialContantAlert}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              sx={{
                textTransform: "capitalize !important",
                color: "#26c6da !important",
              }}
            >
              {commonDialCancelBtn}
            </Button>
            <Button
              onClick={handleSubmit}
              color="primary"
              sx={{
                backgroundImage:
                  "linear-gradient(45deg, #0288d1, #26c6da)!important;",
                color: "#fff !important",
                textTransform: "capitalize !important",
              }}
            >
              {commonDialSubmitBtn}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  /* changing items */

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [commonDialAddress, setcommonDialAddress] = useState("Alert");
  const [commonDialContantAlert, setcommonDialContantAlert] = useState("Alert");

  const [commonDialTitle, setcommonDialTitle] = useState("Alert");
  const [commonDialContent, setcommonDialContent] = useState(
    "Are you sure you want?"
  );
  const [commonDialCancelBtn, setcommonDialCancelBtn] = useState("Cancel");
  const [commonDialSubmitBtn, setcommonDialSubmitBtn] = useState("submit");

  const [commonActionState, setcommonActionState] = useState("");
  const [commonActionparticularId, setcommonActionparticularId] = useState("");

  const handleOpenDialog = (
    index,
    address,
    title,
    content,
    contentAlert,
    cancelBtn,
    submitBtn,
    state,

    particularId
  ) => {
    setcommonActionState(state);
    setcommonActionparticularId(particularId);

    setcommonDialTitle(title);
    setcommonDialAddress(address);
    setcommonDialContantAlert(contentAlert);
    setcommonDialContent(content);
    setcommonDialCancelBtn(cancelBtn);
    setcommonDialSubmitBtn(submitBtn);
    handleClose(index);
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    const pdata = {
      state: commonActionState,
      networkid: commonActionparticularId,
    };
    deleteNData(pdata);
    //fetchData(tdata);
    // Your logic or actions when the user submits
    //handleCloseDialog();
  };

  const deleteNData = async (pdata) => {
    const newData = {
      action: pdata.state,
      tenantId: scachdata.tenant_id,
      networkid: pdata.networkid,
      userSerialId: scachdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "deleteprivatenetwork",
      token: scachdata.accessToken,
      ipaddress: clientIP,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/privatenet/list",
        finalData
      ); // call the new API route

      fetchData(scachdata);
      handleCloseDialog();
      if (data.status == "ok") {
        toast.success("Private Network Deleted Successfully!");
      }
      if (data.status == "error") {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

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

  useEffect(() => {
    const CollectTablePage = Cookies.get("CollectTablePage");
    const CollectTableRowsPerPage = Cookies.get("CollectTableRowsPerPage");
    if (CollectTablePage && CollectTablePage !== null) {
      setPage(parseInt(CollectTablePage, 10));
    }
    if (CollectTableRowsPerPage && CollectTableRowsPerPage !== null) {
      setRowsPerPage(parseInt(CollectTableRowsPerPage, 10));
    }
  }, []);

  const handleChangePage = (newPage) => {
    Cookies.set("CollectTablePage", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    Cookies.set("CollectTableRowsPerPage", newRowsPerPage);
    setRowsPerPage(newRowsPerPage);
    Cookies.remove("CollectTablePage");
    setPage(0);
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

  useEffect(() => {
    if (!cookies) {
      Cookies.remove("CollectTablePage");
      Cookies.remove("CollectTableRowsPerPage");
    }
  }, [cookies]);
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
  };
  const isRowSelected = (row) => selectedRows.indexOf(row) !== -1;

  const addInstancePopup = () => {};

  return (
    <>
      <ComDataTable
        customAddBtn={
          <Button
            sx={{
              background: "linear-gradient(45deg, #2293c5, #0773a5)!important",
              color: "#fff",
              borderRadius: "20px",
              padding: "5px 15px",
            }}
            onClick={handleClickOpenPrivateNet}
            title={"ADD NETWORK"}
          >
            ADD NETWORK
          </Button>
        }
        hideSkeletonTbl={hideSkeletonTbl}
        searchLabel={"Search Private Networks"}
        showSearch={true}
        showDownload={false}
        showAddButton={true}
        handleAddEvent={handleClickOpenPrivateNet}
        tableTitle={"List of Networks"}
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

      <AddNetworkPopup
        isTableLoad={isTableLoad}
        setIsTableaload={setIsTableaload}
        privateNetPopOpen={privateNetPopOpen}
        setprivateNetPopOpen={setprivateNetPopOpen}
        handleClickOpenPrivateNet={handleClickOpenPrivateNet}
        handleModalClosePrivateNet={handleModalClosePrivateNet}
        cookies={cookies}
      />
    </>
  );
}

export default PrivateNetworkListDataTable;
