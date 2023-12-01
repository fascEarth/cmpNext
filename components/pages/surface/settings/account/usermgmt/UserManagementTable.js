// ** React Imports
import * as React from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ComDataTable from "../../../../../tools/datatable";
import styles from "../../../../../../pages/surface/settings/account/index.module.css";

// ** MUI ICON Components
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import LockIcon from "@mui/icons-material/Lock";

import { Loading } from "mdi-material-ui";
import { FormHelperText } from "@mui/material";
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
const names = ["Default", "Admin", "User"];

// Modal Popup Style
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    // width: "600px",
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

function UserManagementDataTable() {
  const { clientIP } = useClientIP();
  const [commonShowForm, setCommonShowForm] = useState(false);
  const [commonPtype, setcommonPtype] = useState("add");
  const [pId, setpId] = useState(null);
  // ** Modal Popup Function
  const [Modalopen, setOpen] = React.useState(false);
  const handleClickOpen = (id, type) => {
    handleClose();
    setpId(id);
    setcommonPtype(type);

    resetCommon();
    setInputErrorMsg({
      ...inputErrorMsg,
      emailId: "",
      password: "",
    });
    setCommonFormData({
      emailId: "",
      role: "",
      userDesc: "",
      password: "",
      teams: [],
      showPassword: false,
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

  // default Table items
  const [totalRecords, setTotalRecords] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProceedLoading, setIsProceedLoading] = useState(false);
  const cookies = Cookies.get("userData");
  const [stcachdata, setstcachdata] = useState([]);
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;
    setstcachdata(cachData);
    if (cachData) {
      initEverythingForm(cachData);
    }
    getTableDatas();
  }, [cookies, page, rowsPerPage, searchText, sortColumn, sortDirection]);

  // Table Action DropDown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event, index) => {
    setOpenRowMenuIndex(index);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /* changing items */
  const [columnLabels, setColumnLabels] = useState({
    userStatus: "Status",
    emailId: "Users",
    role: "Role",
    teams: "Team",
    emailVerifyStatus: "Email Verification",
    mfaAuth: "2FA",
    lastLogin: "Last Login",
    action: "Action",
  });

  const [rolesData, setrolesData] = useState([]);
  const [teamData, setteamData] = useState([]);

  const initEverythingForm = async (cachData) => {
    fetchData(cachData);
    initCommonForm(cachData);
  };
  const initCommonForm = async (tdata) => {
    const newData = {
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getallusercategoryInfo",
      token: tdata.accessToken,
    };

    try {
      const { data } = await axios.post(
        "/api/surface/settings/account/usermgmt",
        finalData
      ); // call the new API route

      if (data) {
        data.map(function (elem) {
          if (elem.type === "roles") {
            setrolesData(elem);
          } else if (elem.type === "teams") {
            setteamData(elem);
            if (elem) {
              const itemWithCurrentState1 = elem.list.find(
                (item) => item.isUsed === true
              );

              if (itemWithCurrentState1) {
                setTimeout(() => {
                  initCommonForm(tdata);
                }, 15000);
              }
            }
          }
        });
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

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
      endPoint: "getAllusermgmtInfo",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/settings/account/usermgmt",
        finalData
      ); // call the new API route

      if (data.recordsSize === 0 && page > 0) {
        setPage(page - 1);
        Cookies.set("usermanageMentTablePage", page - 1);
      }
      getTableDatas();
      setData(data.data);
      setTotalRecords(data.totalRecords);

      sethideSkeletonTbl(true);
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const [openRowMenuIndex, setOpenRowMenuIndex] = useState(null);

  const formedTrows = () => {
    return (
      <>
        {data.map((row, index) => (
          <StyledTableRow
            key={index}
            selected={isRowSelected(row)}
            style={{ cursor: "pointer" }}
          >
            {/*
            <TableCell
              padding="checkbox"
              onClick={(event) => handleRowSelect(row)}
            >
              <Checkbox
                checked={isRowSelected(row)}
                sx={{ color: "#6b6f82", "&.Mui-checked": { color: "#6DCCDD" } }}
              />
            </TableCell>

        */}
            {Object.keys(columnLabels).map((column) => {
              if (column === "userStatus") {
                if (row[column] === "pending") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Chip
                        label="Pending"
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
                } else if (row[column] === "active") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Chip
                        label="Activate"
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
                } else if (row[column] === "inactive") {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Chip
                        label="Inactivate"
                        sx={{
                          width: "100px",
                          fontSize: "14px",
                          background: "rgba(109, 120, 141, 0.12)",
                          color: "rgb(109, 120, 141)",
                        }}
                      />
                    </TableCell>
                  );
                }
              } else if (column === "action") {
                if (stcachdata.role_name !== "administrator") {
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
                } else {
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
                    {row[column] ? row[column]?.join(",") : "-"}
                  </TableCell>
                );
              } else if (
                column === "emailVerifyStatus" ||
                column === "mfaAuth"
              ) {
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
                  >
                    {row[column] ? "Yes" : "No"}
                  </TableCell>
                );
              } else if (column === "lastLogin") {
                return (
                  <TableCell
                    style={{
                      maxWidth: "100px", // Adjust this value based on your requirement
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 2,
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                    }}
                    title={row[column]}
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                  >
                    {row[column] ? row[column] : "-"}
                  </TableCell>
                );
              } else {
                return (
                  <TableCell
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
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
              <MenuItem onClick={() => handleClickOpen(row.userId, "edit")}>
                <EditOutlinedIcon sx={{ mr: 1, fontSize: "18px" }} /> Edit
              </MenuItem>
              {/* TR SANJAI */}
              {row.userStatus === "inactive" ? (
                <MenuItem onClick={() => handleActiveModalOpen(row, "active")}>
                  <TextSnippetOutlinedIcon sx={{ mr: 1, fontSize: "18px" }} />
                  Activate
                </MenuItem>
              ) : row.userStatus === "active" ? (
                <MenuItem
                  onClick={() => handleActiveModalOpen(row, "inactive")}
                >
                  <TextSnippetOutlinedIcon sx={{ mr: 1, fontSize: "18px" }} />
                  Inactivate
                </MenuItem>
              ) : row.userStatus === "pending" ? (
                <div>
                  <MenuItem
                    onClick={() => handleActiveModalOpen(row, "active")}
                  >
                    <TextSnippetOutlinedIcon sx={{ mr: 1, fontSize: "18px" }} />
                    Activate
                  </MenuItem>
                  {/* <MenuItem
                    onClick={() => handleActiveModalOpen(row, "inactive")}
                  >
                    <TextSnippetOutlinedIcon sx={{ mr: 1, fontSize: "18px" }} />
                    Inactivate
                  </MenuItem> */}
                </div>
              ) : null}
              {/* TR SANJAI */}
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
      Cookies.remove("usermanageMentTableRowsPerPage");
      Cookies.remove("usermanageMentTablePage");
    }
  }, [cookies]);

  const getPage = () => {
    const usermanageMentTablePage = Cookies.get("usermanageMentTablePage");
    if (
      usermanageMentTablePage &&
      (usermanageMentTablePage !== undefined ||
        usermanageMentTablePage !== null)
    ) {
      return usermanageMentTablePage;
    } else {
      return 0;
    }
  };

  const getTableDatas = () => {
    const usermanageMentTablePage = Cookies.get("usermanageMentTablePage");
    const usermanageMentTableRowsPerPage = Cookies.get(
      "usermanageMentTableRowsPerPage"
    );
    if (usermanageMentTablePage && usermanageMentTablePage !== null) {
      setPage(parseInt(usermanageMentTablePage, 10));
    }

    if (
      usermanageMentTableRowsPerPage &&
      usermanageMentTableRowsPerPage !== null
    ) {
      setRowsPerPage(parseInt(usermanageMentTableRowsPerPage, 10));
    }
  };
  useEffect(() => {
    getTableDatas();
  }, []);

  const handleChangePage = (newPage) => {
    Cookies.set("usermanageMentTablePage", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    Cookies.set("usermanageMentTableRowsPerPage", newRowsPerPage);
    Cookies.remove("usermanageMentTablePage");
    setRowsPerPage(newRowsPerPage);
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
    Cookies.remove("usermanageMentTablePage");
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
  };
  const isRowSelected = (row) => selectedRows.indexOf(row) !== -1;

  const addInstancePopup = () => {};

  const [hideSkeletonTbl, sethideSkeletonTbl] = useState(false);

  const formCommonMethods = useForm();

  const {
    register: registerCommon,
    handleSubmit: handleSubmitCommon,
    formState: { isSubmitting, errors: errorsCommon },
    reset: resetCommon,
  } = formCommonMethods;

  const [commonFormData, setCommonFormData] = useState({
    emailId: "",
    role: "",
    userDesc: "",
    password: "",
    teams: [],
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setCommonFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [activeModal, setActiveModal] = useState(false);
  const [modalStatusData, setModalStatusData] = useState("");
  const [statusType, setStatusType] = useState("");

  const handleActiveModalOpen = (data, type) => {
    setModalStatusData(data);
    setStatusType(type);
    setActiveModal(true);
    handleClose();
  };
  const handleActiveModalClose = () => {
    setActiveModal(false);
  };

  const handleChangeStatus = async (id, type) => {
    setIsProceedLoading(true);
    handleActiveModalClose();
    handleClose();

    const tdata = stcachdata;
    const newData = {
      data: type,
      userid: id,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "updateUser",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/settings/account/usermgmt",
        finalData
      ); // call the new API route

      if (data) {
        if (data.status === "ok") {
          toast.success("User Status has been updated successfully!");
          initEverythingForm(tdata);
          setIsProceedLoading(false);
        }
      }
    } catch (error) {
      toast.error("An error occurred");
      setIsProceedLoading(false);
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
      userid: id,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "deleteUser",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/settings/account/usermgmt",
        finalData
      ); // call the new API route

      if (data) {
        if (data.status === "ok") {
          toast.success("User has been deleted successfully!");
          initEverythingForm(tdata);
          setDeleteModal(false);
          setIsProceedLoading(false);
        }
      }
    } catch (error) {
      toast.error("An error occurred");
      setIsProceedLoading(false);
    }
  };

  const getParticularData = async (id) => {
    const tdata = stcachdata;
    const newData = {
      userid: id,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getParticularData",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/settings/account/usermgmt",
        finalData
      ); // call the new API route
      if (data) {
        setCommonFormData({
          emailId: data.emailId,
          role: data.role,
          userDesc: data.userDesc ? data.userDesc : "",
          password: "",
          teams: data.teams,
          showPassword: false,
        });
        setCommonShowForm(true);
        setOpen(true);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const oncommonSubmit = async (data) => {
    // Check if all required key values in poiPIstate are filled
    const requiredFields = ["emailId", "role", "userDesc", "password", "teams"];

    const iscommonstateFilled = requiredFields.every((key) => {
      if (key === "userDesc") {
        return true; // Skip validation for middleName field
      }

      if (key === "password" && commonPtype === "edit") {
        return true; // Skip validation for middleName field
      }
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

  const handleDataManipulation = async (data) => {
    setIsLoading(true);
    const tdata = stcachdata;
    let pendPoint = "getAdddataInfo";
    data.tenantId = tdata.tenant_id;
    if (commonPtype === "edit") {
      data.userId = pId;

      pendPoint = "getUpdatedataInfo";
    }

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
    if (
      inputErrorStatus.emailIdStatus === false ||
      inputErrorStatus.passwordStatus === false
    ) {
      try {
        const { data } = await axios.post(
          "/api/surface/settings/account/usermgmt",
          finalData
        ); // call the new API route

        if (data.status === "ok") {
          ModalhandleClose();
          if (commonPtype === "add") {
            toast.success("User added successfully");
            if (page !== 0) {
              Cookies.remove("usermanageMentTablePage");
              setPage(0);
            }
          } else {
            toast.success("User updated successfully");
          }
          resetCommon();
          initEverythingForm(tdata);
          setIsLoading(false); //TR Sanjai
        }
      } catch (error) {
        setIsLoading(false); //TR Sanjai
        toast.error("This mail ID is already in use");
      }
    }
  };

  const [inputErrorStatus, setInputErrorStatus] = useState({
    emailIdStatus: false,
    passwordStatus: false,
  });
  const [inputErrorMsg, setInputErrorMsg] = useState({
    emailId: "",
    password: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setCommonFormData((prev) => ({ ...prev, [name]: value }));
    // TR SANJAI

    // -------------------------------Email Validation starts----------------------------------------
    if (name === "emailId") {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        setInputErrorStatus({ ...inputErrorStatus, emailIdStatus: true });
        setInputErrorMsg({
          ...inputErrorMsg,
          emailId: "Please Enter a valid email id...",
        });
      } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        setInputErrorStatus({ ...inputErrorStatus, emailIdStatus: true });
        setInputErrorMsg({
          ...inputErrorMsg,
          emailId: "",
        });
      }
    }

    // -------------------------------Email Validation Ends----------------------------------------
    // -------------------------------Password Validation Starts----------------------------------------
    else if (name === "password") {
      const lengthRegex = /^.{7,}$/;
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const numberRegex = /[0-9]/;
      const specialCharRegex = /[!@#$%^&*]/;

      if (!uppercaseRegex.test(value)) {
        errorsCommon.password = false;
        setInputErrorStatus({ ...inputErrorStatus, passwordStatus: true });
        setInputErrorMsg({
          ...inputErrorMsg,
          password: "Must contain one UpperCase & one LowerCase.",
        });
      } else if (!numberRegex.test(value)) {
        setInputErrorStatus({ ...inputErrorStatus, passwordStatus: true });
        setInputErrorMsg({
          ...inputErrorMsg,
          password: "Must contain at least one Number.",
        });
      } else if (!specialCharRegex.test(value)) {
        setInputErrorStatus({ ...inputErrorStatus, passwordStatus: true });
        setInputErrorMsg({
          ...inputErrorMsg,
          password: "Must contain at least Special character.",
        });
      } else {
        // Password is valid, so clear any error status and message.
        setInputErrorStatus({ ...inputErrorStatus, passwordStatus: false });
        setInputErrorMsg({ ...inputErrorMsg, password: "" });
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(value)) {
          setInputErrorStatus({ ...inputErrorStatus, passwordStatus: true });
          setInputErrorMsg({
            ...inputErrorMsg,
            password: "Must contain at least 8 characters.",
          });
        }
      }
    }
    // -------------------------------Password Validation Ends----------------------------------------
    else {
      setInputErrorStatus({
        ...inputErrorStatus,
        emailIdStatus: false,
        passwordStatus: false,
      });
      setInputErrorMsg({
        ...inputErrorMsg,
        emailId: "",
        password: "",
      });
    }

    if (!value) {
      setInputErrorStatus({ ...inputErrorStatus, passwordStatus: true });
      setInputErrorMsg({
        ...inputErrorMsg,
        password: "Must contain at least 8 characters.",
      });
    }
    if (name === "emailId") {
      if (/^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i.test(value)) {
        errorsCommon.emailId = false;
      }
    } else if (name === "password") {
      if (
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?!.*\s).{8,16}$/.test(value)
      ) {
        errorsCommon.password = false;
      }
    }
    // TR SANJAI
  };

  const handleInputFocus = (evt) => {
    setCommonFormData((prev) => ({ ...prev, focus: evt.target.name }));
  };
  const handleKeyPress = (e) => {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  };
  const nameDisabled = commonPtype === "edit";
  return (
    <>
      <ComDataTable
        hideSkeletonTbl={hideSkeletonTbl}
        searchLabel={"Search Users"}
        showSearch={true}
        showDownload={false}
        showAddButton={true}
        handleAddEvent={() => handleClickOpen(null, "add")}
        tableTitle={"List of Users"}
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
          {commonPtype === "add" ? "ADD USER" : "EDIT USER"}
        </BootstrapDialogTitle>
        {!commonShowForm && <>Loading Please Wait ...</>}
        {commonShowForm && (
          <>
            <Box
              onSubmit={handleSubmitCommon(oncommonSubmit)}
              component="form"
              autoComplete="off"
            >
              <DialogContent
                dividers
                sx={{
                  width: { lg: "600px", xs: "100%", sm: "100%", md: "600px" },
                }}
              >
                <CssTextField
                  sx={{
                    width: {
                      sm: "550px",
                      md: "100%",
                      xs: "230px",
                      lg: "100%",
                      xl: "100%",
                    },
                  }}
                  margin="normal"
                  autoFocus
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="emailId"
                  {...registerCommon("emailId", {
                    required: "Email Address is required",
                    // TR SANJAI

                    // TR SANJAI
                  })}
                  value={commonFormData.emailId}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  error={!!errorsCommon.emailId} // Add the error prop to highlight the field when there is an error
                  // helperText={
                  //   errorsCommon.emailId && errorsCommon.emailId.message
                  // } // Show the error message
                  InputProps={{
                    readOnly: commonPtype === "edit" ? true : false,
                  }}
                  inputProps={{
                    style: { cursor: nameDisabled ? "not-allowed" : "auto" },
                  }}
                />
                {!inputErrorMsg.emailId && (
                  <>
                    {errorsCommon.emailId && (
                      <FormHelperText error>
                        {errorsCommon.emailId.message}
                      </FormHelperText>
                    )}
                  </>
                )}

                {inputErrorMsg.emailId && (
                  <Typography
                    variant="span"
                    sx={{ fontSize: "0.75rem", color: "#d32f2f" }}
                  >
                    {inputErrorMsg.emailId}
                  </Typography>
                )}
                <Grid
                  container
                  direction="row"
                  rowSpacing={2}
                  spacing={2}
                  display={"flex"}
                  justifyContent="center"
                >
                  {commonPtype === "add" && (
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <CssFormControl
                        sx={{
                          width: {
                            sm: "550px",
                            md: "100%",
                            xs: "230px",
                            lg: "100%",
                            xl: "100%",
                          },
                        }}
                        margin="normal"
                        fullWidth
                        variant="outlined"
                      >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                          id="password"
                          type={
                            commonFormData.showPassword ? "text" : "password"
                          }
                          name="password"
                          {...registerCommon("password", {
                            required: "Password is required",
                            // TR SANJAI
                            // pattern: {
                            //   value:
                            //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?!.*\s).{8,16}$/,
                            //   message: "Please enter a valid password.",
                            // },
                            // TR SANJAI
                            // Add more validation rules here
                          })}
                          value={commonFormData.password}
                          onChange={handleInputChange}
                          onKeyPress={handleKeyPress}
                          error={!!errorsCommon.password}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {commonFormData.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                        {!inputErrorMsg.password && (
                          <>
                            {errorsCommon.password && (
                              <FormHelperText error>
                                {errorsCommon.password.message}
                              </FormHelperText>
                            )}
                          </>
                        )}

                        {inputErrorMsg.password && (
                          <Typography
                            variant="span"
                            sx={{ fontSize: "0.75rem", color: "#d32f2f" }}
                          >
                            {inputErrorMsg.password}
                          </Typography>
                        )}
                      </CssFormControl>
                    </Grid>
                  )}

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={commonPtype === "edit" ? 12 : 6}
                    lg={commonPtype === "edit" ? 12 : 6}
                    xl={commonPtype === "edit" ? 12 : 6}
                  >
                    <CssTextField
                      sx={{
                        width: {
                          sm: "550px",
                          md: "100%",
                          xs: "230px",
                          lg: "100%",
                          xl: "100%",
                        },
                      }}
                      margin="normal"
                      fullWidth
                      id="userDesc" // Change the ID to match the name
                      label="Description"
                      name="userDesc" // Change the name to match the ID
                      {...registerCommon("userDesc", {})}
                      value={commonFormData.userDesc}
                      onChange={handleInputChange}
                    />

                    {errorsCommon.userDesc && (
                      <FormHelperText error>
                        {errorsCommon.userDesc.message}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
                <CssFormControl margin="normal" fullWidth>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Select Team
                  </InputLabel>
                  <Select
                    sx={{
                      width: {
                        sm: "550px",
                        md: "100%",
                        xs: "230px",
                        lg: "100%",
                        xl: "100%",
                      },
                    }}
                    labelId="demo-multiple-checkbox-label"
                    label="Select Team" //TR SANJAI
                    id="demo-multiple-checkbox"
                    multiple
                    value={commonFormData.teams.map((id) => parseInt(id))}
                    onChange={(event) => {
                      const {
                        target: { value },
                      } = event;
                      setCommonFormData((prev) => ({ ...prev, teams: value }));
                    }}
                    inputProps={{
                      name: "teams", // Use the name attribute for react-hook-form
                      id: "teams",
                      ...registerCommon("teams", {
                        required: "Select at least one team", // Add validation rule
                      }),
                    }}
                    renderValue={(selected) => {
                      const selectedTeamNames = teamData.list
                        .filter((elem) => selected.includes(elem.id))
                        .map((elem) => elem.value);

                      return selectedTeamNames.join(", ");
                    }}
                    MenuProps={MenuProps}
                    error={!!errorsCommon.teams} // Highlight the field when there is an error
                  >
                    {teamData.list &&
                      teamData.list.map((elem, index) => (
                        <MenuItem
                          key={elem.id + "_" + index}
                          value={elem.id}
                          disabled={elem.isUsed}
                        >
                          <Checkbox
                            checked={commonFormData.teams
                              .map((id) => parseInt(id))
                              .includes(elem.id)}
                          />
                          <ListItemText primary={elem.value} />
                          {elem.isUsed && <LockIcon color="grey" />}
                        </MenuItem>
                      ))}
                  </Select>
                  {errorsCommon.teams && (
                    <FormHelperText error>
                      {errorsCommon.teams.message}
                    </FormHelperText>
                  )}
                </CssFormControl>
                <CssFormControl margin="normal" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select a Role
                  </InputLabel>
                  <Select
                    sx={{
                      width: {
                        sm: "550px",
                        md: "100%",
                        xs: "230px",
                        lg: "100%",
                        xl: "100%",
                      },
                    }}
                    labelId="demo-simple-select-label"
                    id="role"
                    label="Select a Role"
                    name="role"
                    // {...registerCommon("role", {
                    //   required: "Please select a role", // Add validation rule
                    // })}

                    value={commonFormData.role}
                    defaultValue={commonFormData.role}
                    onChange={(e) =>
                      setCommonFormData({
                        ...commonFormData,
                        role: e.target.value,
                      })
                    }
                    inputProps={{
                      name: "role", // Use the name attribute for react-hook-form
                      id: "role",
                      ...registerCommon("role", {
                        required: "Please select a role", // Add validation rule
                      }),
                    }}
                    MenuProps={MenuProps}
                    error={!!errorsCommon.role} // Highlight the field when there is an error
                  >
                    <MenuItem value="" disabled>
                      Select Any
                    </MenuItem>
                    {rolesData.list &&
                      rolesData.list.map((elem) => (
                        <MenuItem key={elem.id} value={elem.id}>
                          {elem.value}
                        </MenuItem>
                      ))}
                  </Select>
                  {errorsCommon.role && (
                    <FormHelperText error>
                      {errorsCommon.role.message}
                    </FormHelperText>
                  )}
                </CssFormControl>
              </DialogContent>
              <DialogActions>
                <ModalButton
                  disabled={isLoading}
                  type="submit"
                  variant="contained"
                  size="medium"
                  sx={{
                    position: "absolute",
                    left: "45%",
                    backgroundImage: "linear-gradient(45deg, #0288d1, #26c6da)",
                    "&.MuiButtonBase-root": {
                      backgroundColor: "unset",
                    },
                    "&.MuiButtonBase-root.Mui-disabled": {
                      backgroundColor: "rgba(0, 0, 0, 0.12)",
                    },
                  }}
                >
                  {isLoading ? (
                    <>
                      <AutorenewIcon
                        className={styles.loadingBtn}
                        sx={{ color: "#fff" }}
                      />
                    </>
                  ) : commonPtype === "add" ? (
                    "INVITE"
                  ) : (
                    "SAVE"
                  )}
                </ModalButton>
                <Button onClick={ModalhandleClose} sx={{ color: "#6DCCDD" }}>
                  Close
                </Button>
              </DialogActions>
            </Box>
          </>
        )}
      </BootstrapDialog>
      {/* TR SANJAI */}
      <Dialog
        open={activeModal}
        onClose={handleActiveModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {statusType === "active" ? "Active user ?" : "Inactive user ?"}
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
            User: <b>{modalStatusData.emailId}</b>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to{" "}
            {statusType === "active" ? "Active user?" : "Inactive user"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#26c6da" }} onClick={handleActiveModalClose}>
            Cancel
          </Button>
          <Button
            disabled={isProceedLoading}
            onClick={() =>
              handleChangeStatus(modalStatusData.userId, statusType)
            }
            sx={{
              backgroundImage: "linear-gradient(45deg, #0288d1, #26c6da)",
              "&.MuiButtonBase-root": {
                backgroundColor: "unset",
              },
              "&.MuiButtonBase-root.Mui-disabled": {
                backgroundColor: "rgba(0, 0, 0, 0.12)",
              },
            }}
            autoFocus
            variant="contained"
          >
            {isProceedLoading ? (
              <AutorenewIcon
                className={styles.loadingBtn}
                sx={{ color: "#fff" }}
              />
            ) : (
              <>{statusType === "active" ? "Activate" : "Inactivate"}</>
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* -------------------------------------------Delete modal------------------------------- */}
      <Dialog
        open={deleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete User?</DialogTitle>
        <DialogContent
          sx={{
            width: { lg: "500px", xs: "100%", sm: "100%", md: "500px" },
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{ marginBottom: "20px" }}
          >
            User: <b>{modalDeleteData.emailId}</b>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Delete User?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#26c6da" }} onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          <Button
            sx={{
              backgroundImage: "linear-gradient(45deg, #0288d1, #26c6da)",
              "&.MuiButtonBase-root": {
                backgroundColor: "unset",
              },
              "&.MuiButtonBase-root.Mui-disabled": {
                backgroundColor: "rgba(0, 0, 0, 0.12)",
              },
            }}
            disabled={isProceedLoading}
            onClick={() => handleDeleteItem(modalDeleteData.userId)}
            autoFocus
            variant="contained"
          >
            {isProceedLoading ? (
              <AutorenewIcon
                className={styles.loadingBtn}
                sx={{ color: "#fff" }}
              />
            ) : (
              "DELETE"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* -------------------------------------------Delete modal------------------------------- */}

      {/* TR SANJAI */}
    </>
  );
}

export default UserManagementDataTable;
