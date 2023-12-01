// ** React Imports
import * as React from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

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
  FormHelperText,
  DialogContentText,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";
import ComDataTable from "../../../../../../components/tools/datatable";
import { useForm } from "react-hook-form";

// ** MUI ICON Components
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import styles from "../../../../../../pages/surface/networks/networksecurity/securitygroup/index.module.css";
import { toast } from "react-toastify";
import { useClientIP } from "../../../../../../utils/context/ClientIPContext";

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

// Select Field CheckBox Names
const names = ["Windows - 742646", "RHEL - 127627", "Windows - 337057"];

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData(
    "192.168.55.1/25",
    <Box sx={{ display: "flex", float: "right" }}>
      <EditOutlinedIcon className={styles.editIcon} />
      <DeleteOutlineOutlinedIcon className={styles.deleteIcon} />
    </Box>
  ),
];

function IPSetsDataTable() {
  const { clientIP } = useClientIP();

  // ** Popover Function
  const [popanchorEl, setpopAnchorEl] = React.useState(null);
  const [isProceedLoading, setIsProceedLoading] = useState(false);
  const handleClick = (event) => {
    setpopAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setpopAnchorEl(null);
  };
  const Popopen = Boolean(popanchorEl);
  const id = Popopen ? "simple-popover" : undefined;

  // ** Modal Popup Function
  const [commonPtype, setcommonPtype] = useState("add");
  const [Modalopen, setOpen] = React.useState(false);
  const [ipSetID, setIpSetID] = useState(null);
  const handleClickOpen = (id, type) => {
    handleClose();
    setIpSetID(id);
    setCommonFormData({
      ipSetName: "",
      ipSetDec: "",
      ipSetAddresses: "",
    });
    setRows([]);
    setOpen(true);

    setcommonPtype(type);

    if (type === "add") {
      setRows([]);
      setOpen(true);
    } else if (type === "edit") {
      getParticularData(id);
    }
  };
  const ModalhandleClose = () => {
    setOpen(false);
  };
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

  const cookies = Cookies.get("userData");
  const [stcachdata, setstcachdata] = useState([]);
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;
    setstcachdata(cachData);
    if (cachData) {
      fetchData(cachData);
    }
    getTableDatas();
  }, [cookies, page, rowsPerPage, searchText, sortColumn, sortDirection]);

  useEffect(() => {
    if (!cookies) {
      Cookies.remove("IpSetsTableRowsPerPage");
      Cookies.remove("IpSetsTablePage");
    }
  }, [cookies]);

  // Table Action DropDown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openRowMenuIndex, setOpenRowMenuIndex] = useState(null);

  const handleMenuClick = (event, index) => {
    setOpenRowMenuIndex(index);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    errorsCommon.ipSetName = false;
    errorsCommon.ipSetAddresses = false;
    setAnchorEl(null);
    setErrorIpAddress("");
  };

  const [commonFormData, setCommonFormData] = useState({
    ipSetName: "",
    ipSetDec: "",
    ipSetAddresses: "",
  });

  const formCommonMethods = useForm();
  const {
    register: registerCommon,
    handleSubmit: handleSubmitCommon,
    formState: { isSubmitting, errors: errorsCommon },
    reset: resetCommon,
  } = formCommonMethods;
  /* changing items */
  const [columnLabels, setColumnLabels] = useState({
    ipSetName: "Name",
    currentstate: "Status",
    ipSetDec: "Description",
    action: "Action",
  });
  const [inputErrorStatus, setInputErrorStatus] = useState(false);
  const [ipSetNameError, setIpSetNameError] = useState("");

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setCommonFormData((prev) => ({ ...prev, [name]: value }));

    const trimmedAddress = value; // Extract the address from the event

    const ipRegexList = [
      /^(\d{1,3}\.){3}\d{1,3}$/, // Regular expression for IP address
      /^(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/, // IP address with CIDR notation
      /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})-(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/, // IP address range
      // Add more regex patterns here as needed
    ];

    let isValidIp = false;

    for (const regexPattern of ipRegexList) {
      if (regexPattern.test(trimmedAddress)) {
        isValidIp = true;
        break; // Exit the loop if a valid IP pattern is found
      }
    }
    if (name === "ipSetName") {
      if (value && value.length < 3) {
        setInputErrorStatus(true);
        setIpSetNameError(
          "Ipsets should be 3 to 25 characters, only letters, digits, or hyphens."
        );
        errorsCommon.ipSetName = false;
      } else if (value.length === 3) {
        setInputErrorStatus(false);
        setIpSetNameError("");
      } else {
        // setInputErrorStatus(false);
        setIpSetNameError("");
      }
    }

    if (name === "ipSetAddresses") {
      if (!isValidIp) {
        setErrorIpStatus(true);
        setErrorIpAddress("Invalid IP address or range");
      } else {
        errorsCommon.ipSetAddresses = false;
        setErrorIpStatus(true);
        setErrorIpAddress(
          `Please click the "Add IP" button to save this IP-Address`
        );
      }
    }
  };
  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const validInputPattern = /^[a-zA-Z0-9\s-_]*$/;
    if (!validInputPattern.test(event.key)) {
      event.preventDefault();
    }

    if (keyCode === 32) {
      event.preventDefault();
    }
  };

  const [hideSkeletonTbl, sethideSkeletonTbl] = useState(false);
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
      endPoint: "getallipsets",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/networksecurity/securitygroup/ipsets",

        finalData
      ); // call the new API route

      if (data.recordsSize === 0 && page > 0) {
        setPage(page - 1);
        Cookies.set("IpsetsTablePage", page - 1);
      }
      getTableDatas();
      if (data.data) {
        const itemWithCurrentState1 = data.data.find(
          (item) => item.currentstate === 8001
        );
        if (itemWithCurrentState1) {
          setTimeout(() => {
            fetchData(tdata);
          }, 15000);
        }
      }

      if (data) {
        setData(data.data);
        setTotalRecords(data.totalRecords);
      }
      sethideSkeletonTbl(true);
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const [deleteModal, setDeleteModal] = useState(false);
  const [modalDeleteData, setModalDeleteData] = useState("");
  const handleDeleteModalOpen = (data) => {
    setDeleteModal(true);
    setModalDeleteData(data);
    handleClose();
  };
  const handleDeleteModalClose = () => {
    setDeleteModal(false);
  };

  const handleDeleteItem = async (id) => {
    setIsProceedLoading(true);
    handleClose();
    const tdata = stcachdata;

    const newData = {
      ipSetId: id,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "deleteipset",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/networksecurity/securitygroup/ipsets",
        finalData
      ); // call the new API route

      if (data.status === "ok") {
        toast.success("Ipsets has been deleted successfully!");
        fetchData(tdata);
        setDeleteModal(false);
        setIsProceedLoading(false);
      } else if (data.status === "error") {
        toast.error("Please Contact Admin");
        setDeleteModal(false);
      }
    } catch (error) {
      toast.error("An error occurred");
      setIsProceedLoading(false);
    }
  };

  const formedTrows = () => {
    return (
      <>
        {data.map((row, index) => (
          <StyledTableRow
            key={index}
            selected={isRowSelected(row)}
            style={{ cursor: "pointer" }}
          >
            {/* <TableCell padding="checkbox" onClick={(event) => handleRowSelect(row)} >
              <Checkbox checked={isRowSelected(row)} sx={{color: "#6b6f82",'&.Mui-checked': {color: '#6DCCDD',},}}/>
        </TableCell>*/}
            {Object.keys(columnLabels).map((column) => {
              if (column === "currentstate") {
                if (row[column] === 8000 || row[column] === 8002) {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Chip
                        label="Active"
                        color="success"
                        sx={{
                          width: "100px",
                          fontSize: "14px",
                          background: "rgba(114, 225, 40, 0.12)",
                          color: "rgb(98 167 53)",
                        }}
                      />
                    </TableCell>
                  );
                } else if (row[column] === 8015 || row[column] === 8025) {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Chip
                        label="Failed"
                        sx={{
                          width: "100px",
                          fontSize: "14px",
                          background: "rgba(255, 77, 73, 0.12)",
                          color: "rgb(255, 77, 73)",
                        }}
                      />
                    </TableCell>
                  );
                } else if (row[column] === 8001) {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Chip
                        label="processing"
                        color="warning"
                        sx={{
                          width: "100px",
                          fontSize: "14px",
                          background: "rgba(253, 181, 40, 0.12)",
                          color: "rgb(253, 181, 40)",
                        }}
                      />
                    </TableCell>
                  );
                }
              } else if (column === "action") {
                if (row.currentstate === 8001) {
                  return (
                    <TableCell
                      key={column}
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      // onClick={(event) => handleMenuClick(event, index)}
                    >
                      <Stack>
                        <Avatar
                          sx={{
                            bgcolor: "#6DCCDD",
                            width: 30,
                            height: 30,
                            cursor: "not-allowed",
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
                      key={column}
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(event) => handleMenuClick(event, index)}
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
              id="basic-menu"
              anchorEl={anchorEl}
              open={open && openRowMenuIndex === index}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "basic-button" }}
            >
              <MenuItem
                onClick={() => handleClickOpen(row.ipSetId, "edit")}
                // sx={{
                //   display:
                //     row.currentstate === 8015 || row.currentstate === 8025
                //       ? "none"
                //       : "flex",
                // }}
              >
                <EditOutlinedIcon
                  sx={{
                    mr: 1,
                    fontSize: "18px",
                  }}
                />{" "}
                Edit
              </MenuItem>
              <MenuItem onClick={() => handleDeleteModalOpen(row)}>
                <DeleteOutlineOutlinedIcon sx={{ mr: 1, fontSize: "18px" }} />{" "}
                Delete
              </MenuItem>
            </Menu>
          </StyledTableRow>
        ))}
      </>
    );
  };
  /* changing items */

  const getPage = () => {
    const IpsetsTablePage = Cookies.get("IpsetsTablePage");
    if (
      IpsetsTablePage &&
      (IpsetsTablePage !== undefined || IpsetsTablePage !== null)
    ) {
      return IpsetsTablePage;
    } else {
      return 0;
    }
  };

  const getTableDatas = () => {
    const IpsetsTablePage = Cookies.get("IpsetsTablePage");
    const IpsetsTableRowsPerPage = Cookies.get("IpsetsTableRowsPerPage");
    if (IpsetsTablePage && IpsetsTablePage !== null) {
      setPage(parseInt(IpsetsTablePage, 10));
    }

    if (IpsetsTableRowsPerPage && IpsetsTableRowsPerPage !== null) {
      setRowsPerPage(parseInt(IpsetsTableRowsPerPage, 10));
    }
  };
  useEffect(() => {
    getTableDatas();
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    Cookies.set("IpsetsTablePage", newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    Cookies.set("IpsetsTableRowsPerPage", newRowsPerPage);
    Cookies.remove("IpsetsTablePage");
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    setPage(0);
    Cookies.remove("IpsetsTablePage");
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
    setPage(0);
    setSearchText(value);
  };
  const isRowSelected = (row) => selectedRows.indexOf(row) !== -1;

  const addFirewallPopup = () => {};
  const oncommonSubmit = async (data) => {
    if (data.ipAddressess == "" || data.ipAddressess == null) {
      errorsCommon.ipSetAddresses = false;
      // setInputErrorStatus(false);
      setErrorIpAddress("");
    }
    const tdata = stcachdata;
    let pendPoint = "addipset";
    data.tenantId = tdata.tenant_id;
    // data.userSerialId = tdata.user_serial_id;
    if (commonPtype === "edit") {
      data.ipSetId = ipSetID;
      pendPoint = "updateipset";
    }
    const myObject = data;

    const { ipSetAddresses, ...newObject } = myObject;

    const values = rows.map((obj) => obj.name).join(",");

    newObject.ipSetAddresses = values;

    const newData = {
      data: newObject,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: pendPoint,
      token: tdata.accessToken,
    };

    if (
      (inputErrorStatus === false ||
        errorIpStatus === false ||
        rows.length > 0) &&
      commonFormData.ipSetAddresses == ""
    ) {
      setIsProceedLoading(true);
      try {
        const { data } = await axios.post(
          "/api/surface/networks/networksecurity/securitygroup/ipsets",
          finalData
        );

        if (data) {
          setIsProceedLoading(true);
        }

        if (data.status === "ok") {
          ModalhandleClose();
          fetchData(tdata);
          setIsProceedLoading(false);
          setCommonFormData({
            ipSetName: "",
            ipSetDec: "",
            ipSetAddresses: "",
          });
          if (commonPtype === "add") {
            toast.success("Ipset has been added successfully!");
            if (page !== 0) {
              Cookies.remove("IpsetsTablePage");
              setPage(0);
            }
          } else {
            toast.success("Ipset updated successfully!");
          }
        } else if (data.status === "error") {
          toast.error(data.message);
          setIsProceedLoading(false);
        }
      } catch (error) {
        toast.error("An error occurred");
        setIsProceedLoading(false);
      }
    }
  };
  const [originalFormDatas, setoriginalFormDatas] = useState({});

  const getParticularData = async (id) => {
    const tdata = stcachdata;
    const newData = {
      ipSetId: id,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getipset",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/networksecurity/securitygroup/ipsets",
        finalData
      ); // call the new API route
      if (data) {
        setCommonFormData({
          ipSetName: data.ipSetName,
          ipSetDec: data.ipSetDec,
          // ipSetAddresses: data.ipSetAddresses,
        });

        const commaSeparatedString = data.ipSetAddresses;

        // Split the string by commas and create an array of objects
        const arrayOfObjects = commaSeparatedString
          .split(",")
          .map((ip) => ({ name: ip }));

        setRows(arrayOfObjects);
        setoriginalFormDatas({
          ipSetName: data.ipSetName,
          ipSetDec: data.ipSetDec,
          ipAddressess: rows,
        });
        // setCommonShowForm(true);
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
      (keysA.ipSetName !== keysB.ipSetName ||
        keysA.ipSetDec !== keysB.ipSetDec ||
        keysA.ipSetAddresses !== keysB.ipSetAddresses) &&
      commonFormData.ipSetAddresses == ""
    );
  }

  const [rows, setRows] = useState([]);
  const [errorIpAddress, setErrorIpAddress] = useState("");
  const [errorIpStatus, setErrorIpStatus] = useState(false);

  const handleDisplayClick = () => {
    if (commonFormData.ipSetAddresses == 0) {
      // setErrorIpStatus(true);
      setErrorIpAddress("IP-Set Addresses is required");
    }

    if (rows.length < 1) {
      setErrorIpAddress("Invalid IP Address");
      errorsCommon.ipSetAddresses = false;
      setInputErrorStatus(true);
    }
    if (commonFormData.ipSetAddresses) {
      const trimmedAddress = commonFormData.ipSetAddresses.trim();

      // Regular expressions for different IP address formats
      const ipRegexList = [
        /^(\d{1,3}\.){3}\d{1,3}$/, // Regular expression for IP address
        /^(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/, // IP address with CIDR notation
        /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})-(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/, // IP address range
        // Add more regex patterns here as needed
      ];

      let isValidIp = false;

      for (const regexPattern of ipRegexList) {
        if (regexPattern.test(trimmedAddress)) {
          isValidIp = true;
          break; // Exit the loop if a valid IP pattern is found
        }
      }

      if (!isValidIp) {
        setErrorIpStatus(true);
        setErrorIpAddress("Invalid IP address or range");
        return;
      } else {
        setErrorIpStatus(false);
        setErrorIpAddress("");
      }

      const updatedRows = [...rows];

      // Find the index of the row with the existing IP address or range
      const existingIndex = updatedRows.findIndex(
        (row) => row.name === trimmedAddress
      );

      if (existingIndex !== -1) {
        // If the address or range already exists, update it
        updatedRows[existingIndex].name = trimmedAddress;
      } else {
        // If the address doesn't exist, add it as a new row
        updatedRows.push({ name: trimmedAddress });
      }

      // Set the updated rows as the new state
      setRows(updatedRows);

      // Clear the input field
      setCommonFormData({
        ...commonFormData,
        ipSetAddresses: "",
      });
    } else {
      // Handle validation errors or display a message
    }
  };

  // Function to validate individual IP addresses
  function isValidIPAddress(ipAddress) {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/; // Regular expression for IP address
    return ipRegex.test(ipAddress);
  }

  // Function to validate individual IP addresses
  function isValidIPAddress(ipAddress) {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/; // Regular expression for IP address
    return ipRegex.test(ipAddress);
  }

  // Function to validate individual IP addresses
  function isValidIPAddress(ipAddress) {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/; // Regular expression for IP address
    return ipRegex.test(ipAddress);
  }

  // Function to validate individual IP addresses
  function isValidIPAddress(ipAddress) {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/; // Regular expression for IP address
    return ipRegex.test(ipAddress);
  }

  // Function to check if startIP is less than or equal to endIP
  function isIPRangeValid(startIP, endIP) {
    const startParts = startIP.split(".").map(Number);
    const endParts = endIP.split(".").map(Number);

    for (let i = 0; i < 4; i++) {
      if (startParts[i] > endParts[i]) {
        return false;
      } else if (startParts[i] < endParts[i]) {
        return true;
      }
    }
    return true; // startIP and endIP are equal
  }

  const handleEditIP = (existingIp, index) => {
    setIpRequired(false);
    // Assuming you have the new IP address value you want to set
    const newIpAddress = existingIp; // Replace this with your desired IP address

    // Update the state variable with the new IP address
    setCommonFormData({
      ...commonFormData,
      ipSetAddresses: newIpAddress,
    });
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };
  const handleDeleteClick = (indexToDelete) => {
    setRows((prevRows) =>
      prevRows.filter((_, index) => index !== indexToDelete)
    );
  };

  const [isIpRequired, setIpRequired] = useState(true);
  const nameDisabled = commonPtype === "edit";

  return (
    <>
      <ComDataTable
        hideSkeletonTbl={hideSkeletonTbl}
        searchLabel={"Search IP Sets"}
        showSearch={true}
        showDownload={false}
        showAddButton={true}
        handleAddEvent={() => handleClickOpen(null, "add")}
        tableTitle={"Add IP Sets"}
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

      {/* Start New IP Set Modal Popup Design Here */}
      <BootstrapDialog
        onClose={ModalhandleClose}
        aria-labelledby="customized-dialog-title"
        open={Modalopen}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          align="left"
          onClose={ModalhandleClose}
          sx={{ padding: "10px 16px", fontSize: "16px" }}
        >
          {ipSetID ? "Edit IP Set" : "New IP Set"}
        </BootstrapDialogTitle>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmitCommon(oncommonSubmit)}
        >
          <DialogContent dividers>
            <CssTextField
              {...registerCommon("ipSetName", {
                required: "IP-Set Name is required",
              })}
              margin="normal"
              fullWidth
              autoFocus
              id="name"
              label="Name"
              name="ipSetName"
              value={commonFormData.ipSetName ? commonFormData.ipSetName : ""}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              error={!!errorsCommon.ipSetName}
              // helperText={
              //   errorsCommon.teamName && errorsCommon.teamName.message
              // } // Show the error message
              InputProps={{
                readOnly: commonPtype === "edit" ? true : false,
              }}
              // disabled={nameDisabled}
              inputProps={{
                style: { cursor: nameDisabled ? "not-allowed" : "auto" },
                maxLength: 25,
                minLength: 3,
              }}
            />

            {ipSetNameError && (
              <Typography
                variant="span"
                sx={{ fontSize: "0.75rem", color: "#d32f2f" }}
              >
                {ipSetNameError}
              </Typography>
            )}
            {!ipSetNameError && (
              <>
                {" "}
                {errorsCommon.ipSetName && (
                  <FormHelperText error>
                    {errorsCommon.ipSetName.message}
                  </FormHelperText>
                )}
              </>
            )}

            <CssTextField
              {...registerCommon("ipSetDec")}
              margin="normal"
              fullWidth
              id="desc"
              label="Description"
              name="ipSetDec"
              value={commonFormData.ipSetDec ? commonFormData.ipSetDec : ""}
              onChange={handleInputChange}
            />

            <Typography
              component="p"
              variant="p"
              color={"#000"}
              fontWeight="500"
              align="left"
              sx={{ pt: 2, pb: 1, fontSize: "14px" }}
            >
              Enter an IPv4 Address, Range or CIDR{" "}
              <InfoOutlinedIcon
                className={styles.StaticIpInfoIcon}
                onClick={IppoolshandleClick}
              />
            </Typography>
            <Popover
              id={id}
              open={IppoolsPopopen}
              anchorEl={anchorIppoolsEl}
              onClose={IppoolshandlePopoverClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Box className={styles.PopoveBoxContainer}>
                <Typography
                  component="p"
                  variant="p"
                  color={"#6b6f82"}
                  fontSize={14}
                  align="center"
                  sx={{ pt: 1 }}
                  className={styles.PopoverContent}
                >
                  Enter an IPv4 address, range or CIDR: "Network information
                  should be in CIDR notation. For IPv4 192.168.100.0/24 is
                  equivalent to 192.168.100.0/255.255.255.0."
                </Typography>
              </Box>
            </Popover>
            <Grid container direction="row" rowSpacing={2} spacing={2}>
              <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
                <CssTextField
                  {...registerCommon("ipSetAddresses", {
                    required:
                      rows.length > 1 || rows.length == 1
                        ? false
                        : "IpSet Addresses is required",
                  })}
                  margin="normal"
                  fullWidth
                  id="ipSetAddresses"
                  label="IP Address"
                  name="ipSetAddresses"
                  value={
                    commonFormData.ipSetAddresses
                      ? commonFormData.ipSetAddresses
                      : ""
                  }
                  onChange={handleInputChange}
                  error={!!errorsCommon.ipSetAddresses}
                />
                <Box
                  component="div"
                  sx={{ fontSize: "0.75rem", color: "#d32f2f" }}
                >
                  {errorIpAddress}
                </Box>
                {!errorIpAddress && (
                  <>
                    {errorsCommon.ipSetAddresses && (
                      <FormHelperText error>
                        {errorsCommon.ipSetAddresses.message}
                      </FormHelperText>
                    )}
                  </>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                md={3}
                lg={3}
                xl={3}
                alignItems="center"
                display={"flex"}
              >
                <Button
                  onClick={handleDisplayClick}
                  variant="contained"
                  size="small"
                  className={styles.addIPBtn}
                >
                  {/* <AddCircleIcon className={styles.AddIcon} /> */}
                  Add IP
                </Button>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TableContainer
                  component={Paper}
                  sx={{
                    border: rows.length ? "1px solid #ccc" : "",
                    borderRadius: "7px",
                    boxShadow: "none",
                  }}
                >
                  <Table aria-label="simple table">
                    <TableBody>
                      {rows &&
                        rows.map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ padding: "5px 10px" }}
                            >
                              {row.name}
                              <Box sx={{ display: "flex", float: "right" }}>
                                <EditOutlinedIcon
                                  className={styles.editIcon}
                                  onClick={() => handleEditIP(row.name, index)}
                                />
                                <DeleteOutlineOutlinedIcon
                                  className={styles.deleteIcon}
                                  onClick={() => handleDeleteClick(index)}
                                />
                              </Box>
                            </TableCell>
                            {/* <TableCell align="right" sx={{ padding: "5px 10px" }}>
                            {row.calories}
                          </TableCell> */}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <ModalButton
              disabled={isProceedLoading ? isProceedLoading : !isObjectsEqual()}
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
            >
              {isProceedLoading ? (
                <AutorenewIcon
                  className={styles.loadingBtn}
                  sx={{ color: "#fff" }}
                />
              ) : (
                <>{commonPtype === "edit" ? "Update" : "ADD"} </>
              )}
            </ModalButton>
            <Button onClick={ModalhandleClose} sx={{ color: "#6DCCDD" }}>
              Close
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>

      {/* End New IP Set Modal Popup Design Here */}
      {/* Start of delete Modal Popup */}

      <Dialog
        open={deleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete IpSet?</DialogTitle>
        <DialogContent
          sx={{
            width: { lg: "500px", xs: "100%", sm: "100%", md: "500px" },
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{ marginBottom: "20px" }}
          >
            Ipset: <b>{modalDeleteData.ipSetName}</b>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Delete Ipset?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteModalClose} sx={{ color: "#26c6da" }}>
            Cancel
          </Button>
          <Button
            sx={{
              backgroundImage: "linear-gradient(45deg, #0288d1, #26c6da)",
            }}
            disabled={isProceedLoading}
            onClick={() => handleDeleteItem(modalDeleteData.ipSetId)}
            autoFocus
            variant="contained"
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

      {/* End of delete Modal Popup */}
    </>
  );
}

export default IPSetsDataTable;
