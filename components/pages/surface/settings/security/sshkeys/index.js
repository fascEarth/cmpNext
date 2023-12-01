// ** React Imports
import * as React from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
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
  DialogContentText,
} from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import ComDataTable from "../../../../../tools/datatable";

// ** MUI ICON Components
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import SettingsPowerOutlinedIcon from "@mui/icons-material/SettingsPowerOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import InsertPageBreakOutlinedIcon from "@mui/icons-material/InsertPageBreakOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from "../../../../../../pages/surface/settings/security/index.module.css";

import { Loading } from "mdi-material-ui";
import { FormHelperText } from "@mui/material";
import SSHKeyAddForm from "./addsshkeys";
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

function SSHKeyDataTable() {
  const { clientIP } = useClientIP();

  const [isProceedLoading, setIsProceedLoading] = useState(false);

  const [commonShowForm, setCommonShowForm] = useState(false);
  const [commonPtype, setcommonPtype] = useState("add");
  const [pId, setpId] = useState(null);

  // ** Modal Popup Function
  const [Modalopen, setOpen] = React.useState(false);
  const [handleClickOpenPass, sethandleClickOpenPass] = useState(false);
  const handleClickOpen = (id, type) => {
    sethandleClickOpenPass(true);
    return;
    handleClose();
    setpId(id);
    setcommonPtype(type);

    resetCommon();

    setCommonFormData({
      sshKeyName: "",
      sshKeyFingerPrint: "",
    });
    if (type === "add") {
      setCommonShowForm(true);
      setOpen(true);
    }
  };
  const ModalhandleClose = () => {
    setOpen(false);
  };

  // ** Textarea Custom CSS
  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    position: relative;
    display: block;
    margin-top: 16px;
    padding: 12px;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    border-radius: 7px;
    color: rgba(0, 0, 0, 0.87);
    border: 1px solid;
    border-color: #ccc;
    -webkit-animation-name: mui-auto-fill-cancel;
    animation-name: mui-auto-fill-cancel;
    -webkit-animation-duration: 10ms;
    animation-duration: 10ms;
  
    &:hover {
      border: 2px solid;
      border-color: #6DCCDD;
    } 
  
    &:focus {
      border: 2px solid;
      border-color: #015578;
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

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
  const cookies = Cookies.get("userData");
  const [stcachdata, setstcachdata] = useState([]);
  const [sshkeysEffect, setsshkeysEffect] = useState(false);
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;
    setstcachdata(cachData);
    if (cachData) {
      initEverythingForm(cachData);
      //fetchData(cachData);
    }
    getTableDatas();
  }, [cookies, page, rowsPerPage, searchText, sortColumn, sortDirection]);
  useEffect(() => {
    if (sshkeysEffect) {
      initEverythingForm(stcachdata);
      //fetchData(cachData);
    }
  }, [sshkeysEffect]);

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
    sshKeyName: "Name",
    sshKeyFingerPrint: "Fingerprint",
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
      endPoint: "getAllsshkeysInfo",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/settings/security/sshkeys",
        finalData
      ); // call the new API route
      if (data.recordsSize === 0 && page > 0) {
        setPage(page - 1);
        Cookies.set("SshKeysTablePage", page - 1);
      }
      getTableDatas();
      setData(data.data);
      setTotalRecords(data.totalRecords);
      sethideSkeletonTbl(true);
    } catch (error) {
      // toast.error('An error occurred');
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
              if (column === "power_status") {
                if (row[column] === 1) {
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
                } else if (row[column] === 0) {
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
                return (
                  <TableCell
                    key={column}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleMenuClick}
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
                    style={{
                      whiteSpace: "nowrap", // Prevent text from wrapping
                      overflow: "hidden", // Hide overflowed content
                      textOverflow: "ellipsis", // Display ellipsis for overflowed content
                      maxWidth: "150px", // Limit the width to prevent stretching
                    }}
                    title={row[column]}
                    onClick={(event) => handleRowSelect(row)}
                  >
                    {row[column]}
                  </TableCell>
                );
              }
            })}

            <Menu
              sx={{ top: "-10px !important" }}
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "basic-button" }}
            >
              <MenuItem onClick={() => handleDeleteModalOpen(row)}>
                <DeleteOutlineOutlinedIcon sx={{ mr: 1, fontSize: "18px" }} />
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
      Cookies.remove("SshKeysTableRowsPerPage");
      Cookies.remove("SshKeysTablePage");
    }
  }, [cookies]);

  const getPage = () => {
    const SshKeysTablePage = Cookies.get("SshKeysTablePage");
    if (
      SshKeysTablePage &&
      (SshKeysTablePage !== undefined || SshKeysTablePage !== null)
    ) {
      return SshKeysTablePage;
    } else {
      return 0;
    }
  };

  const getTableDatas = () => {
    const SshKeysTablePage = Cookies.get("SshKeysTablePage");
    const SshKeysTableRowsPerPage = Cookies.get("SshKeysTableRowsPerPage");
    if (SshKeysTablePage && SshKeysTablePage !== null) {
      setPage(parseInt(SshKeysTablePage, 10));
    }
    if (SshKeysTableRowsPerPage && SshKeysTableRowsPerPage !== null) {
      setRowsPerPage(parseInt(SshKeysTableRowsPerPage, 10));
    }
  };
  useEffect(() => {
    getTableDatas();
  }, []);

  const handleChangePage = (newPage) => {
    Cookies.set("SshKeysTablePage", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    Cookies.set("SshKeysTableRowsPerPage", newRowsPerPage);
    Cookies.remove("SshKeysTablePage");
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
    Cookies.remove("SshKeysTablePage");
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

  const addInstancePopup = () => {};

  const [hideSkeletonTbl, sethideSkeletonTbl] = useState(false);

  const initEverythingForm = async (cachData) => {
    fetchData(cachData);
  };

  const formCommonMethods = useForm();

  const {
    register: registerCommon,
    handleSubmit: handleSubmitCommon,
    formState: { isSubmitting, errors: errorsCommon },
    reset: resetCommon,
  } = formCommonMethods;

  const [commonFormData, setCommonFormData] = useState({
    sshKeyName: "",
    sshKeyFingerPrint: "",
  });

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
        "/api/surface/settings/security/sshkeys",
        finalData
      ); // call the new API route

      if (data) {
        if (data.status === "ok") {
          toast.success("SSH Key has been deleted successfully!");
          setDeleteModal(false);
          initEverythingForm(tdata);
          fetchData(tdata);
        }
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const oncommonSubmit = async (data) => {
    // Check if all required key values in poiPIstate are filled
    const requiredFields = ["sshKeyName", "sshKeyFingerPrint"];

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

  const handleDataManipulation = async (data) => {
    setIsLoading(true); //TR Sanjai
    const tdata = stcachdata;
    let pendPoint = "getAdddataInfo";
    data.userSerialId = tdata.user_serial_id;

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
        "/api/surface/settings/security/sshkeys",
        finalData
      ); // call the new API route

      if (data.status === "ok") {
        if (page !== 0) {
          Cookies.remove("SshKeysTablePage");
          setPage(0);
        }
        ModalhandleClose();
        toast.success("SSH Key has been added successfully!");
        resetCommon();
        initEverythingForm(tdata);
        fetchData(tdata);
        setIsLoading(false); //TR Sanjai
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setCommonFormData((prev) => ({ ...prev, [name]: value }));
    // TR SANJAI
    if (name === "sshKeyName") {
      if (value) {
        errorsCommon.sshKeyName = false;
      }
    } else if (name === "sshKeyFingerPrint") {
      if (value === "ssh-rs") {
        errorsCommon.sshKeyName = false;
        errorsCommon.sshKeyFingerPrint.message = "";
      }
    }
    // TR SANJAI
  };

  const handleInputFocus = (evt) => {
    setCommonFormData((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <>
      <ComDataTable
        hideSkeletonTbl={hideSkeletonTbl}
        searchLabel={"Search SSH Keys"}
        showSearch={true}
        showDownload={false}
        showAddButton={true}
        handleAddEvent={() => handleClickOpen(null, "add")}
        tableTitle={"List of SSH Keys"}
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

      <SSHKeyAddForm
        sshkeysEffect={sshkeysEffect}
        setsshkeysEffect={setsshkeysEffect}
        handleClickOpenPass={handleClickOpenPass}
        sethandleClickOpenPass={sethandleClickOpenPass}
        initEverythingForm={initEverythingForm}
      />

      {/* -------------------------------------------Delete modal------------------------------- */}
      <Dialog
        open={deleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete SSH Key?</DialogTitle>
        <DialogContent
          sx={{
            width: { lg: "500px", xs: "100%", sm: "100%", md: "500px" },
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{ marginBottom: "20px" }}
          >
            SSH Key: <b>{modalDeleteData.sshKeyName}</b>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Delete SSH Key?
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
            onClick={() => handleDeleteItem(modalDeleteData.sshKeyId)}
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
    </>
  );
}

export default SSHKeyDataTable;
