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
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
const names = ["Windows - 742646", "RHEL - 127627", "Windows - 337057"];

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

function TagsDataTable() {
  const { clientIP } = useClientIP();

  const [commonShowForm, setCommonShowForm] = useState(false);
  const [commonPtype, setcommonPtype] = useState("add");
  const [pId, setpId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ** Modal Popup Function
  const [Modalopen, setOpen] = React.useState(false);
  const handleClickOpen = (id, type) => {
    handleClose();
    setpId(id);
    setcommonPtype(type);

    resetCommon();
    setInputErrorMsg("");
    setCommonFormData({
      tagName: "",
      tagDec: "",
      vms: [],
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
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);

  const cookies = Cookies.get("userData");
  const [stcachdata, setstcachdata] = useState([]);
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;
    setstcachdata(cachData);
    if (cachData) {
      //fetchData(cachData);
      initEverythingForm(cachData);
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
    tagName: "Name",
    tagDec: "Description",
    vms: "Elastic Instances",
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
      endPoint: "getAlltagsInfo",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/settings/account/tags",
        finalData
      ); // call the new API route

      setData(data.data);
      if (data.recordsSize === 0 && page > 0) {
        setPage(page - 1);
        Cookies.set("TagsTablePage", page - 1);
      }
      getTableDatas();
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
        </TableCell> */}
            {Object.keys(columnLabels).map((column) => {
              if (column === "vms") {
                return (
                  <TableCell
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                  >
                    <Avatar
                      sx={{
                        width: 35,
                        height: 35,
                        fontSize: "14px",
                        bgcolor: "#e9910e",
                      }}
                      color="success"
                    >
                      {row[column].length > 0 ? row[column].length : "-"}
                    </Avatar>
                  </TableCell>
                );
              } else if (column === "action") {
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
                        sx={{
                          bgcolor: "#6DCCDD",
                          width: 30,
                          height: 30,
                          "&:hover": {
                            cursor:
                              row.tagName === "Default"
                                ? "not-allowed"
                                : "pointer",
                          },
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
              open={
                row.tagName !== "Default" && open && openRowMenuIndex === index
              }
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "basic-button" }}
            >
              <MenuItem onClick={() => handleClickOpen(row.tagId, "edit")}>
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
      Cookies.remove("TagsTableRowsPerPage");
      Cookies.remove("TagsTablePage");
    }
  }, [cookies]);

  const getPage = () => {
    const TagsTablePage = Cookies.get("TagsTablePage");
    if (
      TagsTablePage &&
      (TagsTablePage !== undefined || TagsTablePage !== null)
    ) {
      return TagsTablePage;
    } else {
      return 0;
    }
  };

  const getTableDatas = () => {
    const TagsTablePage = Cookies.get("TagsTablePage");
    const TagsTableRowsPerPage = Cookies.get("TagsTableRowsPerPage");
    if (TagsTablePage && TagsTablePage !== null) {
      setPage(parseInt(TagsTablePage, 10));
    }

    if (TagsTableRowsPerPage && TagsTableRowsPerPage !== null) {
      setRowsPerPage(parseInt(TagsTableRowsPerPage, 10));
    }
  };
  useEffect(() => {
    getTableDatas();
  }, []);

  const handleChangePage = (newPage) => {
    Cookies.set("TagsTablePage", newPage);

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    Cookies.set("TagsTableRowsPerPage", newRowsPerPage);
    Cookies.remove("TagsTablePage");
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
    Cookies.remove("TagsTablePage");
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

  const [rolesData, setrolesData] = useState([]);
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
        "/api/surface/settings/account/tags",
        finalData
      ); // call the new API route

      if (data) {
        data.map(function (elem) {
          if (elem.type === "vms") {
            setrolesData(elem);
          }
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
  } = formCommonMethods;

  const [commonFormData, setCommonFormData] = useState({
    tagName: "",
    tagDec: "",
    vms: [],
  });

  const [deleteModal, setDeleteModal] = useState(false);
  const [modalDeleteData, setModalDeleteData] = useState("");
  const [isProceedLoading, setIsProceedLoading] = useState(false);

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
        "/api/surface/settings/account/tags",
        finalData
      ); // call the new API route

      if (data) {
        if (data.status === "ok") {
          toast.success("Tag has been deleted successfully!");
          initEverythingForm(tdata);
          setDeleteModal(false);
          setIsProceedLoading(false);
        }
      }
    } catch (error) {
      // toast.error('An error occurred');
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
        "/api/surface/settings/account/tags",
        finalData
      ); // call the new API route
      if (data) {
        setCommonFormData({
          tagName: data.tagName,
          tagDec: data.tagDec ? data.tagDec : "",
          vms: data.vms ? data.vms : [],
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
    const requiredFields = ["tagName"];

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
    setIsLoading(true);
    const tdata = stcachdata;
    let pendPoint = "getAdddataInfo";
    data.tenantId = tdata.tenant_id;
    if (commonPtype === "edit") {
      data.tagId = pId;
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

    try {
      const { data } = await axios.post(
        "/api/surface/settings/account/tags",
        finalData
      ); // call the new API route

      if (data.status === "ok") {
        ModalhandleClose();
        toast.success("Tag has been added successfully!");
        if (page !== 0 && commonPtype == "add") {
          Cookies.remove("TagsTablePage");
          setPage(0);
        }
        resetCommon();
        initEverythingForm(tdata);
        setIsLoading(false);
      } else if (data.status === "error") {
        toast.error("This name is already exist");
        // ModalhandleClose();
        // resetCommon();
        initEverythingForm(tdata);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred");
      setIsLoading(false);
    }
  };

  const [inputErrorStatus, setInputErrorStatus] = useState(false);
  const [inputErrorMsg, setInputErrorMsg] = useState("");

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setCommonFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "tagName") {
      if (value && value.length < 3) {
        errorsCommon.tagName = false;
        setInputErrorStatus(true);
        setInputErrorMsg(
          "Tag Name should be 3 to 25 characters, only letters, digits, or hyphens."
        );
      } else if (value.length === 3) {
        setInputErrorStatus(false);
        setInputErrorMsg("");
      } else {
        setInputErrorStatus(false);
        setInputErrorMsg("");
      }
    }
  };
  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const validInputPattern = /^[a-zA-Z0-9\s-]*$/;
    if (!validInputPattern.test(event.key)) {
      event.preventDefault();
    }

    if (keyCode === 32) {
      event.preventDefault();
    }
  };

  const handleInputFocus = (evt) => {
    setCommonFormData((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const nameDisabled = commonPtype === "edit";
  return (
    <>
      <ComDataTable
        hideSkeletonTbl={hideSkeletonTbl}
        searchLabel={"Search Tags"}
        showSearch={true}
        showDownload={false}
        showAddButton={true}
        handleAddEvent={() => handleClickOpen(null, "add")}
        tableTitle={"List of Tags"}
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
          {commonPtype === "add" ? "CREATE TAG" : "EDIT TAG"}
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
                  inputProps={{
                    style: { cursor: nameDisabled ? "not-allowed" : "auto" },
                    maxLength: 25,
                    minLength: 3,
                  }}
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
                  id="tagName"
                  label="Tag Name"
                  name="tagName"
                  {...registerCommon("tagName", {
                    required: "Tag Name is required",
                  })}
                  value={commonFormData.tagName}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onKeyPress={handleKeyPress}
                  error={!!errorsCommon.tagName} // Add the error prop to highlight the field when there is an error
                  // helperText={
                  //   errorsCommon.tagName && errorsCommon.tagName.message
                  // } // Show the error message
                  InputProps={{
                    readOnly: commonPtype === "edit" ? true : false,
                  }}
                />
                {!inputErrorMsg && (
                  <>
                    {errorsCommon.tagName && (
                      <FormHelperText error>
                        {errorsCommon.tagName.message}
                      </FormHelperText>
                    )}
                  </>
                )}
                {inputErrorMsg && (
                  <Typography
                    variant="span"
                    sx={{ fontSize: "0.75rem", color: "#d32f2f" }}
                  >
                    {inputErrorMsg}
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
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                      id="tagDec" // Change the ID to match the name
                      label="Description"
                      name="tagDec" // Change the name to match the ID
                      {...registerCommon("tagDec", {})}
                      value={commonFormData.tagDec}
                      onChange={handleInputChange}
                    />

                    {errorsCommon.tagDec && (
                      <FormHelperText error>
                        {errorsCommon.tagDec.message}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>

                <CssFormControl margin="normal" fullWidth>
                  <InputLabel id="vms-label">Select VM</InputLabel>
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
                    labelId="vms-label"
                    label="Select VM"
                    id="vms"
                    multiple
                    value={commonFormData.vms.map((id) => parseInt(id))}
                    onChange={(event) => {
                      const {
                        target: { value },
                      } = event;
                      setCommonFormData((prev) => ({ ...prev, vms: value }));
                    }}
                    inputProps={{
                      name: "vms", // Use the name attribute for react-hook-form
                      id: "vms",
                      ...registerCommon("vms", {
                        // required: 'Select at least one team', // Add validation rule
                      }),
                    }}
                    renderValue={(selected) => {
                      const selectedTeamNames = rolesData.list
                        .filter((elem) => selected.includes(elem.id))
                        .map((elem) => elem.value);

                      return selectedTeamNames.join(", ");
                    }}
                    MenuProps={MenuProps}
                    error={!!errorsCommon.vms} // Highlight the field when there is an error
                  >
                    {rolesData.list.length !== 0 ? (
                      <>
                        {rolesData.list &&
                          rolesData.list.map((elem) => (
                            <MenuItem key={elem.id} value={elem.id}>
                              <Checkbox
                                checked={commonFormData.vms
                                  .map((id) => parseInt(id))
                                  .includes(elem.id)}
                              />
                              <ListItemText primary={elem.value} />
                            </MenuItem>
                          ))}
                      </>
                    ) : (
                      <MenuItem disabled value="">
                        <em>.......... None ..........</em>
                      </MenuItem>
                    )}
                  </Select>
                  {errorsCommon.vms && (
                    <FormHelperText error>
                      {errorsCommon.vms.message}
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
                    "ADD"
                  ) : (
                    "UPDATE"
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
        open={deleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Tag?</DialogTitle>
        <DialogContent
          sx={{
            width: { lg: "500px", xs: "100%", sm: "100%", md: "500px" },
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{ marginBottom: "20px" }}
          >
            Tag Name: <b>{modalDeleteData.tagName}</b>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Delete tag?
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
            onClick={() => handleDeleteItem(modalDeleteData.tagId)}
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
      {/* TR SANJAI */}
    </>
  );
}

export default TagsDataTable;
