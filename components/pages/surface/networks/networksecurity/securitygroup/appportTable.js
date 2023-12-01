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
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Chip from "@mui/material/Chip";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import ComDataTable from "../../../../../../components/tools/datatable";
import { useForm } from "react-hook-form";
// ** MUI ICON Components
import AutorenewIcon from "@mui/icons-material/Autorenew";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";

import styles from "../../../../../../pages/surface/networks/networksecurity/securitygroup/index.module.css";
import axios from "axios";
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

function AppPortDataTable() {
  const { clientIP } = useClientIP();

  // ** Modal Popup Function
  const [Modalopen, setOpen] = React.useState(false);
  const [applicationID, setApplicationID] = useState(null);
  const [commonPtype, setcommonPtype] = useState("add");
  const handleClickOpen = (id, type) => {
    errorsCommon.applicationName = false;
    errorsCommon.applicationProtocol = false;
    errorsCommon.appPort = false;
    setappPortError("");
    handleClose();
    setApplicationID(id);

    setOpen(true);
    setcommonPtype(type);
    if (type === "add") {
      setOpen(true);
    } else if (type === "edit") {
      setCommonFormData({
        applicationName: "",
        applicationDesc: "",
        applicationProtocol: "",
        appPort: "",
      });
      getParticularData(id);
    }
  };
  const ModalhandleClose = () => {
    setCommonFormData({
      applicationName: "",
      applicationDesc: "",
      applicationProtocol: "",
      appPort: "",
    });
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

  // default Table items
  const [totalRecords, setTotalRecords] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);

  const cookies = Cookies.get("userData");
  const [stcachdata, setstcachdata] = useState([]);
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;
    setstcachdata(cachData);
    if (cachData) {
      fetchData(cachData);
      initCommonForm(cachData);
    }
    getTableDatas();
  }, [cookies, page, rowsPerPage, searchText, sortColumn, sortDirection]);

  // Table Action DropDown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openRowMenuIndex, setOpenRowMenuIndex] = useState(null);
  const handleMenuClick = (event, index) => {
    setOpenRowMenuIndex(index);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* changing items */
  const [columnLabels, setColumnLabels] = useState({
    applicationName: "Name",
    currentstate: "Status",
    applicationDesc: "Description",
    applicationProtocolAndPorts: "Protocol & Destination Port",
    action: "Action",
  });

  // const fetchData = async (tdata) => {
  //   const data = {
  //     data: [
  //       {
  //         name: "AD Server",
  //         power_status: 0,
  //         desc: "AD Server",
  //         port: "TCP : 2564",
  //       },
  //       {
  //         name: "Active Directory Server",
  //         power_status: 1,
  //         desc: "Active Directory Server",
  //         port: "UDP : 2586",
  //       },
  //     ],
  //     totalRecords: 15,
  //   };
  //   console.log(data);
  //   setData(data.data);
  //   setTotalRecords(data.totalRecords);
  // };
  const formCommonMethods = useForm();
  const {
    register: registerCommon,
    handleSubmit: handleSubmitCommon,
    formState: { isSubmitting, errors: errorsCommon },
    reset: resetCommon,
  } = formCommonMethods;

  const [commonFormData, setCommonFormData] = useState({
    applicationName: "",
    applicationDesc: data?.applicationDesc,
    applicationProtocol: "",
    appPort: "TCP",
    applicationId: "",
  });
  console.log(errorsCommon, "errorsCommon");
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
      endPoint: "getallapplications",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/networksecurity/securitygroup/appportTable",

        finalData
      ); // call the new API route

      if (data.data) {
        if (data.recordsSize === 0 && page > 0) {
          setPage(page - 1);
          Cookies.set("AppPortTablePage", page - 1);
        }
        getTableDatas();
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

  const [application, setApplication] = useState([]);
  const initCommonForm = async (tdata) => {
    const newData = {
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getinitadd",
      token: tdata.accessToken,
    };

    try {
      const { data } = await axios.post(
        "/api/surface/networks/networksecurity/securitygroup/appportTable",
        finalData
      ); // call the new API route

      if (data) {
        // const defaultid = data.defaultId;
        // const filteredobj = data.list.filter((item) => item.id == defaultid);
        // setdefaultInterfaceType(filteredobj[0].value);
        // setinterfaceTypeMenu(elem.list);

        console.log(data, "data");
        setApplication(data[0].list);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };
  const [originalFormDatas, setoriginalFormDatas] = useState({});

  const getParticularData = async (id) => {
    const tdata = stcachdata;
    const newData = {
      applicationId: id,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };

    const finalData = {
      data: newData,
      endPoint: "getapplication",
      token: tdata.accessToken,
    };

    try {
      const { data } = await axios.post(
        "/api/surface/networks/networksecurity/securitygroup/appportTable",
        finalData
      ); // call the new API route
      if (data && data.applicationProtocolAndPorts) {
        const { applicationProtocolAndPorts } = data;
        const [protocol, port] = applicationProtocolAndPorts.split(" : ");

        const datasToCompare = {
          applicationName: data.applicationName,
          applicationDesc: data.applicationDesc,
          applicationProtocol: port,
          appPort: protocol,
        };

        setoriginalFormDatas(datasToCompare);
        setCommonFormData({
          applicationName: data.applicationName,
          applicationDesc: data.applicationDesc,
          applicationProtocol: port,
          appPort: protocol,
        });
      } else {
        console.log("data or data.applicationProtocolAndPorts is undefined"); // Debugging statement
      }

      setOpen(true);
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  function isObjectsEqual() {
    const keysA = commonFormData;
    const keysB = originalFormDatas;

    return (
      keysA.applicationName !== keysB.applicationName ||
      keysA.applicationDesc !== keysB.applicationDesc ||
      keysA.applicationProtocol !== keysB.applicationProtocol ||
      keysA.appPort !== keysB.appPort
      //  ||
      // rows.length > 0
    );
  }
  const [appPortNameError, setappPortNameError] = useState("");
  const [appPortError, setappPortError] = useState("");
  const [appPortErrorStatus, setappPortErrorStatus] = useState(false);
  const [idProofNoError, setIdProofNoError] = useState({
    TCP: "",
    UDP: "",
  });
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    if (name === "appPort" && value !== "ICMPv4") {
      // Assuming you have a state variable for "ID Number"
      setCommonFormData({ ...commonFormData, applicationProtocol: "" });
      setappPortError("");
    }

    if (name === "applicationName") {
      if (value && value.length < 3) {
        errorsCommon.applicationName = false;
        // setInputErrorStatus(true);
        setappPortNameError("Ipsets should be 3 to 25 characters");
      } else if (value.length === 3) {
        // setInputErrorStatus(false);
        setappPortNameError("");
      } else {
        // setInputErrorStatus(false);
        setappPortNameError("");
      }
    }

    if (name === "applicationName") {
      if (value.length > 3) {
        errorsCommon.applicationName = false;
      }
    }

    if (name === "applicationProtocol") {
      if (value) {
        console.log(value, "value");
        errorsCommon.applicationProtocol = false;
      }
    }

    if (name === "applicationProtocol") {
      if (value) {
        setappPortErrorStatus(false);
        const sanitizedValue = value.replace(/[^0-9]/g, "");
        setCommonFormData({
          ...commonFormData,
          applicationProtocol: sanitizedValue,
        });
        if (value > 65535 || value == 0) {
          setappPortErrorStatus(true);
          setappPortError(
            `${value} is not a valid port. The port number must be between 0 and 65535.`
          );
        } else {
          setappPortErrorStatus(false);
          setappPortError("");
        }
      } else if (value > 0 || value == "") {
        setappPortErrorStatus(false);
        setappPortError("");
      }
    } else if (name === "appPort") {
      if (value === "ICMPv4") {
        setappPortError("");
      }
    }
    setCommonFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleKeyPress = (event) => {
    const { name, value } = event.target || evt;
    const keyCode = event.keyCode || event.which;

    if (name === "applicationName") {
      if (
        (keyCode < 65 || (keyCode > 90 && keyCode < 97) || keyCode > 122) &&
        (keyCode < 48 || keyCode > 57) &&
        keyCode !== 45 &&
        keyCode !== 95 &&
        keyCode !== 8
      ) {
        event.preventDefault();
      }
    }

    // Allow numbers (0-9) and prevent all other characters
    if (name === "applicationProtocol") {
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 8) {
        event.preventDefault();
      }
    }
  };

  const [isProceedLoading, setIsProceedLoading] = useState(false);
  const applicationProtocolAndPortss = `${commonFormData.appPort} : ${commonFormData.applicationProtocol}`;

  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);

  const oncommonSubmit = async (data) => {
    if (commonFormData.applicationProtocol == "") {
      setErrorMessage("Protocol required");
      setErrorStatus(true);
    } else {
      setErrorMessage("");
      setErrorStatus(true);
    }

    const tdata = stcachdata;
    const myObject = data;
    let pendPoint = "addapplication";
    const applicationNames = data.applicationName;
    const applicationDescs = data.applicationDesc;

    const tenantIds = (data.tenantId = tdata.tenant_id);

    const {
      applicationName,
      applicationDesc,
      applicationProtocolAndPorts,
      tenantId,
      applicationId,
      ...newObject
    } = myObject;
    newObject.tenantId = tenantIds;
    newObject.applicationName = applicationNames;
    newObject.applicationDesc = commonFormData.applicationDesc;
    newObject.applicationProtocolAndPorts =
      commonFormData.appPort !== "ICMPv4"
        ? applicationProtocolAndPortss
        : "ICMPv4";
    newObject.applicationId = applicationID;

    if (commonPtype === "add") {
      delete newObject.applicationId;
      delete newObject.appPort;
      delete newObject.applicationProtocol;
    }

    // data.userSerialId = tdata.user_serial_id;
    if (commonPtype === "edit") {
      delete newObject.appPort;
      delete newObject.applicationProtocol;
      newObject.tenantId = tdata.tenant_id;
      newObject.applicationName = data.applicationName;
      newObject.applicationDesc = commonFormData.applicationDesc;
      newObject.applicationProtocolAndPorts =
        commonFormData.appPort !== "ICMPv4"
          ? applicationProtocolAndPortss
          : "ICMPv4";
      newObject.applicationId = applicationID;
      pendPoint = "updateapplication";
    }
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

    if (appPortErrorStatus === false) {
      setIsProceedLoading(true);
      try {
        const { data } = await axios.post(
          "/api/surface/networks/networksecurity/securitygroup/appportTable",
          finalData
        );

        if (data.status === "ok") {
          ModalhandleClose();
          fetchData(tdata);
          setIsProceedLoading(false);
          // resetCommon();
          setCommonFormData({
            applicationName: "",
            applicationDesc: "",
            applicationProtocol: "",
            appPort: "TCP",
          });
          if (commonPtype === "add") {
            toast.success("Application has been added successfully!");
            if (page !== 0) {
              Cookies.remove("AppPortTablePage");
              setPage(0);
            }
          } else {
            toast.success("Application updated successfully!");
          }
        } else if (data.status === "error") {
          toast.error("Application port profile name already exist");
          setIsProceedLoading(false);
        }
      } catch (error) {
        toast.error("An error occurred");
        setIsProceedLoading(false);
      }
    }
  };
  console.log(appPortErrorStatus, "appPortErrorStatus");
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
      applicationId: id,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "deleteapplication",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/networksecurity/securitygroup/appportTable",
        finalData
      ); // call the new API route

      if (data.status === "ok") {
        toast.success("Application port has been deleted successfully!");
        fetchData(tdata);
        setDeleteModal(false);
        setIsProceedLoading(false);
      } else if (data.status === "error") {
        toast.error(data.message);
        setIsProceedLoading(false);
        setDeleteModal(false);
      }
    } catch (error) {
      setIsProceedLoading(false);
      toast.error("Please Contact Admin");
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
                if (row.currentstate === 8001 || row.sysDefined === true) {
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
                onClick={() => handleClickOpen(row.applicationId, "edit")}
                // sx={{
                //   display:
                //     row.currentstate === 8015 || row.currentstate === 8025
                //       ? "none"
                //       : "flex",
                // }}
              >
                <EditOutlinedIcon sx={{ mr: 1, fontSize: "18px" }} /> Edit
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
  useEffect(() => {
    if (!cookies) {
      Cookies.remove("AppPortTableRowsPerPage");
      Cookies.remove("AppPortTablePage");
    }
  }, [cookies]);

  const getPage = () => {
    const AppPortTablePage = Cookies.get("AppPortTablePage");
    if (
      AppPortTablePage &&
      (AppPortTablePage !== undefined || AppPortTablePage !== null)
    ) {
      return AppPortTablePage;
    } else {
      return 0;
    }
  };

  const getTableDatas = () => {
    const AppPortTablePage = Cookies.get("AppPortTablePage");
    const AppPortTableRowsPerPage = Cookies.get("AppPortTableRowsPerPage");
    if (AppPortTablePage && AppPortTablePage !== null) {
      setPage(parseInt(AppPortTablePage, 10));
    }

    if (AppPortTableRowsPerPage && AppPortTableRowsPerPage !== null) {
      setRowsPerPage(parseInt(AppPortTableRowsPerPage, 10));
    }
  };
  useEffect(() => {
    getTableDatas();
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    Cookies.set("AppPortTablePage", newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    Cookies.set("AppPortTableRowsPerPage", newRowsPerPage);
    setRowsPerPage(newRowsPerPage);
    Cookies.remove("AppPortTablePage");
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
    Cookies.remove("AppPortTablePage");
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

  const addFirewallPopup = () => {
    console.log("testing");
  };
  const nameDisabled = commonPtype === "edit";
  return (
    <>
      <ComDataTable
        hideSkeletonTbl={hideSkeletonTbl}
        searchLabel={"Search Application Port"}
        showSearch={true}
        showDownload={false}
        showAddButton={true}
        handleAddEvent={() => handleClickOpen(null, "add")}
        tableTitle={"List of Application Port"}
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

      {/* Start Application Port Profile Modal Popup Design Here */}
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
          {commonPtype === "add" ? "New" : "Edit"} Application Port Profile
        </BootstrapDialogTitle>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmitCommon(oncommonSubmit)}
        >
          <DialogContent dividers>
            <CssTextField
              {...registerCommon("applicationName", {
                required: "Application Name is required",
              })}
              margin="normal"
              fullWidth
              autoFocus
              id="name"
              label="Name"
              name="applicationName"
              value={commonFormData.applicationName}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              error={!!errorsCommon.applicationName}
              // disabled={nameDisabled}
              InputProps={{
                readOnly: commonPtype === "edit" ? true : false,
              }}
              inputProps={{
                style: { cursor: nameDisabled ? "not-allowed" : "auto" },
                maxLength: 25,
                minLength: 3,
              }}
            />
            {!appPortNameError && (
              <>
                {errorsCommon.applicationName && (
                  <FormHelperText error>
                    {errorsCommon.applicationName.message}
                  </FormHelperText>
                )}
              </>
            )}
            {appPortNameError && (
              <Typography
                variant="span"
                sx={{ fontSize: "0.75rem", color: "#d32f2f" }}
              >
                {appPortNameError}
              </Typography>
            )}

            <CssTextField
              {...registerCommon("applicationDesc")}
              margin="normal"
              fullWidth
              id="desc"
              label="Description"
              name="applicationDesc"
              value={
                commonFormData?.applicationDesc
                  ? commonFormData?.applicationDesc
                  : ""
              }
              onChange={handleInputChange}
              // error={!!errorsCommon.applicationDesc}
            />
            {/* {errorsCommon.applicationDesc && (
              <FormHelperText error>
                {errorsCommon.applicationDesc.applicationDesc}
              </FormHelperText>
            )} */}
            <Grid container direction="row" rowSpacing={2} spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <CssFormControl margin="normal" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Application
                  </InputLabel>
                  <Select
                    {...registerCommon("appPort", {
                      required:
                        commonFormData?.appPort === ""
                          ? "Protocol is required"
                          : false,
                    })}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Application"
                    name="appPort"
                    MenuProps={MenuProps}
                    value={commonFormData?.appPort || "TCP"}
                    onChange={handleInputChange}
                    sx={{ height: "56px !important" }}
                  >
                    {application &&
                      application.map((elem) => (
                        <MenuItem key={elem.id} value={elem.value}>
                          <ListItemText primary={elem.value} />
                        </MenuItem>
                      ))}
                  </Select>

                  {errorsCommon.appPort && (
                    <FormHelperText error>
                      {errorsCommon.appPort.message}
                    </FormHelperText>
                  )}
                </CssFormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <CssTextField
                  {...registerCommon("applicationProtocol", {
                    required:
                      commonFormData?.appPort !== "ICMPv4" &&
                      (commonFormData?.applicationProtocol === "" ||
                        !commonFormData?.applicationProtocol)
                        ? "Port is required"
                        : false,
                  })}
                  inputProps={{
                    maxLength: 5,
                    minLength: 1,
                    style: {
                      cursor:
                        commonFormData?.appPort === "ICMPv4"
                          ? "not-allowed"
                          : "auto",
                    },
                  }}
                  margin="normal"
                  fullWidth
                  id="port"
                  label="Port"
                  name="applicationProtocol"
                  value={
                    commonFormData?.appPort !== "ICMPv4"
                      ? commonFormData?.applicationProtocol
                      : ""
                  }
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  disabled={commonFormData?.appPort === "ICMPv4"}
                />

                {errorsCommon.applicationProtocol && (
                  <FormHelperText error>
                    {errorsCommon.applicationProtocol.message}
                  </FormHelperText>
                )}

                {appPortError && (
                  <Typography
                    variant="span"
                    // hidden={!errorStatus}
                    sx={{ fontSize: "0.75rem", color: "#d32f2f" }}
                  >
                    {appPortError}
                  </Typography>
                )}
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
                <>{commonPtype === "edit" ? "Update" : "Add"}</>
              )}
            </ModalButton>
            <Button onClick={ModalhandleClose} sx={{ color: "#6DCCDD" }}>
              Close
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
      {/* End Application Port Profile Modal Popup Design Here */}

      <Dialog
        open={deleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Application port
        </DialogTitle>
        <DialogContent
          sx={{
            width: { lg: "500px", xs: "100%", sm: "100%", md: "500px" },
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{ marginBottom: "20px" }}
          >
            Application Port Name: <b>{modalDeleteData.applicationName}</b>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Delete Application port?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#26c6da" }} onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          <Button
            sx={{
              backgroundImage: "linear-gradient(45deg, #0288d1, #26c6da)",
            }}
            disabled={isProceedLoading}
            onClick={() => handleDeleteItem(modalDeleteData.applicationId)}
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
    </>
  );
}

export default AppPortDataTable;
