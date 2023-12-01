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
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import ComDataTable from "../../../../../components/tools/datatable";

// ** MUI ICON Components
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";

import { toast } from "react-toastify"; //
import { Controller, useForm } from "react-hook-form";
import { Application } from "mdi-material-ui";
import { AddFirewall } from "../../../../../components/pages/surface/networks/networksecurity/firewall/addFirewall";
import { useClientIP } from "../../../../../utils/context/ClientIPContext";
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
const names = ["Any", "IP Set 1", "IP Set 2"];
const destinationIds = [{ id: 5, value: "destination" }];
const firewallType = ["IPv4"];
// Modal Popup Style
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "auto",
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

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 35,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(18px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "rgb(98 167 53)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgb(92 92 92 / 25%)",
    boxSizing: "border-box",
  },
}));

function FirewallDataTable() {
  const { clientIP } = useClientIP();

  // ** Modal Popup Function
  const [Modalopen, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    if (!restrictAccess()) {
      setOpen(true);
    }
    if (cookies) {
      fetchFormData();
    }
  };
  const ModalhandleClose = () => {
    setAnchorEl(null);
    handleClose();
    setOpen(false);
    const timer = setTimeout(() => {
      setType("add");
    }, 100);
    return () => {
      clearTimeout(timer);
    };
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
    setFirewallInfo((prev) => ({ ...prev, [name]: value }));
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
  const [stcachdata, setstcachdata] = useState([]);
  const cookies = Cookies.get("userData");

  const getTablePage = () => {
    const firewallTablePage = Cookies.get("firewallTablePage");
    const firewallTableRowsPerPage = Cookies.get("firewallTableRowsPerPage");
    if (firewallTablePage && firewallTablePage !== null) {
      setPage(parseInt(firewallTablePage, 10));
    }

    if (firewallTableRowsPerPage && firewallTableRowsPerPage !== null) {
      setRowsPerPage(parseInt(firewallTableRowsPerPage, 10));
    }
  };
  const getPage = () => {
    const firewallTablePage = Cookies.get("firewallTablePage");
    if (
      firewallTablePage &&
      (firewallTablePage !== undefined || firewallTablePage !== null)
    ) {
      return firewallTablePage;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;
    setstcachdata(cachData);
    if (cachData) {
      fetchData(cachData);
    }
    getTablePage();
  }, [cookies, page, rowsPerPage, searchText, sortColumn, sortDirection]);

  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;
    setstcachdata(cachData);

    getTablePage();
  }, []);

  // Table Action DropDown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openRowMenuIndex, setOpenRowMenuIndex] = useState(null);
  const [type, setType] = useState("add");
  const handleMenuClick = (event, index) => {
    setOpenRowMenuIndex(index);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setFirewallInfo({
      // firewallPriorityId: null,
      firewallName: "",
      firewallDesc: "",
      firewallType: "",
      firewallModeId: "",
      applicationIds: [""],
      sourceIds: [""],
      destinationIds: [""],
      state: true,
      logging: false,
      tenantId: "",
      firewallId: "",
    });
  };

  /* changing items */
  const [columnLabels, setColumnLabels] = useState({
    currentstate: "Status",
    firewallPriorityId: "Priority ID",
    firewallName: "Name",

    state: "State",
    applications: "Application Port",
    sources: "Source",
    destinations: "Destination",
    firewallMode: "Mode",
    // firewallDesc: "Comments",
    action: "Action",
  });
  const [hideSkeleton, setHideSkeleton] = useState(false);
  const [allTableDatas, setallTableDatas] = useState([]);

  const fetchData = async (tdata) => {
    // const tdata = cookies ? JSON.parse(cookies) : [];
    const newData = {
      search: searchText,
      start: parseInt(getPage(), 10) * rowsPerPage,
      length: rowsPerPage,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getAllFirewalls",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/networksecurity/firewall",
        finalData
      ); // call the new API route
      if (data) {
        if (data.data) {
          setData(data.data);
          const itemWithCurrentState1 = data.data.find(
            (item) => item.currentstate === 9001
          );
          const itemWithCurrentState2 = data.data.find(
            (item) => item.currentstate === 9002
          );
          if (itemWithCurrentState1) {
            setTimeout(() => {
              fetchData(tdata);
            }, 15000);
          }
          if (itemWithCurrentState2) {
            setTimeout(() => {
              fetchData(tdata);
            }, 15000);
          }
        }
        // toast.success('All firewall')
        setTotalRecords(data.totalRecords);
        if (data.recordsSize === 0 && page > 0) {
          Cookies.set("firewallTablePage", page - 1);
          setPage(page - 1);
        }
        getTablePage();
        setHideSkeleton(true);
      }
    } catch (error) {
      // toast.error('An error occurred', error);
      console.log(error);
      setHideSkeleton(true);
    }

    const tableDataForValidation = {
      search: "",
      start: 0,
      length: totalRecords + totalRecords,
      sortColumn: "",
      sortDirection: sortDirection,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalDataForValidation = {
      data: tableDataForValidation,
      endPoint: "getAllFirewalls",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/networksecurity/firewall",
        finalDataForValidation
      ); // call the new API route

      if (data) {
        if (data.data) {
          setallTableDatas(data.data);
          const itemWithCurrentState1 = data.data.find(
            (item) => item.currentstate === 9001
          );
          const itemWithCurrentState2 = data.data.find(
            (item) => item.currentstate === 9002
          );
          if (itemWithCurrentState1) {
            setTimeout(() => {
              fetchData(tdata);
            }, 15000);
          }
          if (itemWithCurrentState2) {
            setTimeout(() => {
              fetchData(tdata);
            }, 15000);
          }
        }
        // toast.success('All firewall')
      }
    } catch (error) {}
  };

  const handleDeleteItem = (id) => {
    deleteFirewall(id);
    // fetchData(stcachdata);
  };

  const deleteFirewall = async (id) => {
    fetchData(stcachdata);
    handleClose();
    const cachData = cookies ? JSON.parse(cookies) : true;

    const tdata = stcachdata;
    const newData = {
      firewallId: id,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "deleteFIrewall",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/networksecurity/firewall",
        finalData
      ); // call the new API route

      if (data) {
        if (data.status === "ok") {
          toast.success("firewall has been deleted successfully!");
          fetchData(stcachdata);
          setDeleteModal(false);
        }
      }
      // fetchData(stcachdata);
    } catch (error) {
      toast.error("An error occurred");
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

  // *********TR 01 ****************
  const [editId, setEditId] = useState(null);
  const handleClickEdit = (id, type) => {
    setOpen(true);
    getParticulratData(id);
    setType(type);
    setEditId(id);
    handleClose();
  };
  const [originalFormDatas, setoriginalFormDatas] = useState({});
  const getParticulratData = async (id) => {
    const tdata = stcachdata;
    const newData = {
      firewallId: id,
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
        "/api/surface/networks/networksecurity/firewall",
        finalData
      ); // call the new API route
      if (data) {
        setoriginalFormDatas({
          firewallPriorityId: data.firewallPriorityId,
          firewallName: data.firewallName,
          firewallDesc: data.firewallDesc,
          firewallType: data.firewallType,
          firewallModeId: data.firewallModeId,
          applicationIds:
            data.applications.length !== 0
              ? data.applications.map((el) => el.applicationId)
              : [""],
          sourceIds:
            data.sources.length != 0
              ? data.sources.map((ele) => ele.ipSetId)
              : [""],
          destinationIds:
            data.destinations.length != 0
              ? data.destinations.map((ele) => ele.ipSetId)
              : [""],
          state: data.state,
          logging: data.logging,
          tenantId: data.tenantId,
        });
        setFirewallInfo({
          firewallPriorityId: data.firewallPriorityId,
          firewallName: data.firewallName,
          firewallDesc: data.firewallDesc,
          firewallType: data.firewallType,
          firewallModeId: data.firewallModeId,
          applicationIds:
            data.applications.length !== 0
              ? data.applications.map((el) => el.applicationId)
              : [""],
          sourceIds:
            data.sources.length != 0
              ? data.sources.map((ele) => ele.ipSetId)
              : [""],
          destinationIds:
            data.destinations.length != 0
              ? data.destinations.map((ele) => ele.ipSetId)
              : [""],
          state: data.state,
          logging: data.logging,
          tenantId: data.tenantId,
        });
        setOpen(true);
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  function isObjectsEqual() {
    const keysA = firewallInfo;
    const keysB = originalFormDatas;
    const keysA_ApplicationIds = keysA.applicationIds.sort((a, b) => a - b);
    const keysA_sourceIds = keysA.sourceIds.sort((a, b) => a - b);
    const keysA_destinationIds = keysA.destinationIds.sort((a, b) => a - b);

    return (
      keysA.firewallName !== keysB.firewallName ||
      keysA.firewallDesc !== keysB.firewallDesc ||
      keysA.firewallType !== keysB.firewallType ||
      keysA.firewallModeId !== keysB.firewallModeId ||
      // keysA.applicationIds !== keysB.applicationIds ||
      keysA.state !== keysB.state ||
      keysA.logging !== keysB.logging ||
      keysA_ApplicationIds.some((item, index) => {
        return item !== keysB.applicationIds[index];
      }) ||
      keysA.applicationIds.length !== keysB.applicationIds.length ||
      keysA_sourceIds.some((item, index) => {
        return item !== keysB.sourceIds[index];
      }) ||
      keysA.sourceIds.length !== keysB.sourceIds.length ||
      keysA_destinationIds.some((item, index) => {
        return item !== keysB.destinationIds[index];
      }) ||
      keysA.destinationIds.length !== keysB.destinationIds.length
    );
  }

  const restrictAccess = () => {
    const res = allTableDatas?.some((obj) =>
      obj.currentmsg.toLowerCase().includes("processing")
    );
    return res;
  };

  // *********TR 01 ****************
  const formedTrows = () => {
    return (
      <>
        {data?.map((row, index) => (
          <StyledTableRow
            key={index}
            selected={isRowSelected(row)}
            style={{ cursor: "pointer" }}
          >
            {Object.keys(columnLabels).map((column, i) => {
              if (column === "currentstate") {
                if (row[column] === 9000) {
                  return (
                    <TableCell
                      key={i}
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
                      {/* <AntSwitch
                        color="success"
                        checked ={row.state}
                        inputProps={{ "aria-label": "ant design" }}
                      /> */}
                    </TableCell>
                  );
                } else if (row[column] === 9001) {
                  return (
                    <TableCell
                      key={i}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      {/* <Chip
                        label="processing"
                        color="success"
                        sx={{
                          width: "100px",
                          fontSize: "14px",
                          background: "rgba(114, 225, 40, 0.12)",
                          color: "rgb(98 167 53)",
                        }}
                      /> */}
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
                      {/* <AntSwitch
                        color="success"
                        defaultChecked
                        inputProps={{ "aria-label": "ant design" }}
                      /> */}
                    </TableCell>
                  );
                } else if (row[column] === 9002) {
                  return (
                    <TableCell
                      key={i}
                      onClick={(event) => handleRowSelect(row.id)}
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
                } else if (row[column] === 9015 || row[column] === 9025) {
                  return (
                    <TableCell
                      key={i}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Chip
                        label="Failure"
                        sx={{
                          width: "100px",
                          fontSize: "14px",
                          background: "rgba(255, 77, 73, 0.12)",
                          color: "rgb(255, 77, 73)",
                        }}
                      />
                      {/* <Chip
                        label="Reserved"
                        sx={{
                          width: "100px",
                          fontSize: "14px",
                          background: "rgba(102, 108, 255, 0.12)",
                          color: "rgb(102, 108, 255)",
                        }}
                      /> */}
                    </TableCell>
                  );
                } else if (row[column] === 4) {
                  return (
                    <TableCell
                      key={i}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <Chip
                        label="Failure"
                        sx={{
                          width: "100px",
                          fontSize: "14px",
                          background: "rgba(255, 77, 73, 0.12)",
                          color: "rgb(255, 77, 73)",
                        }}
                      />
                    </TableCell>
                  );
                }
              }
              if (column === "firewallName") {
                return (
                  <TableCell
                    key={i}
                    onClick={(event) => handleRowSelect(row)}
                    sx={{
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={row[column]}
                  >
                    {row[column]}
                  </TableCell>
                );
              } else if (column === "state") {
                // return (
                //         <TableCell
                //           key={i}
                //           onClick={(event) => handleRowSelect(row)}
                //         >
                //           {/* <Chip label="Process" color="warning" sx={{width: '100px', fontSize: '14px', background: 'rgba(253, 181, 40, 0.12)',
                //           color: 'rgb(253, 181, 40)'}} /> */}
                //           <AntSwitch
                //             color="success"
                //             checked={row.state}
                //             inputProps={{ "aria-label": "ant design" }}
                //           />
                //         </TableCell>
                // )

                if (row[column] === true) {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      {/* <Typography component="h4" variant="h5" align="left" color="rgb(98 167 53)" fontSize={14}>Enabled</Typography> */}
                      <Chip
                        label="Enabled"
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
                } else if (row[column] === false) {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      {/* <Typography component="h4" variant="h5" align="left" color="#ccc" fontSize={14}>Disable</Typography> */}
                      <Chip
                        label="Disabled"
                        color="success"
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
              } else if (column === "applications") {
                return (
                  <TableCell
                    key={i}
                    onClick={(event) => handleRowSelect(row)}
                    sx={{
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={row[column]
                      .map((ele) => ele.applicationName)
                      .join(", ")}
                  >
                    {row[column].length
                      ? row[column].map((ele) => ele.applicationName).join(", ")
                      : "-"}
                  </TableCell>
                );
              } else if (column === "sources") {
                return (
                  <TableCell
                    key={i}
                    onClick={(event) => handleRowSelect(row)}
                    sx={{
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={
                      row[column].length > 0
                        ? row[column].map((ele) => ele.ipSetName).join(", ")
                        : "Any"
                    }
                  >
                    {row[column].length > 0
                      ? row[column].map((ele) => ele.ipSetName).join(", ")
                      : "Any"}
                  </TableCell>
                );
              } else if (column === "destinations") {
                return (
                  <TableCell
                    key={i}
                    onClick={(event) => handleRowSelect(row)}
                    sx={{
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={
                      row[column].length > 0
                        ? row[column].map((ele) => ele.ipSetName).join(", ")
                        : "Any"
                    }
                  >
                    {row[column].length > 0
                      ? row[column].map((ele) => ele.ipSetName).join(", ")
                      : "Any"}
                  </TableCell>
                );
              } else if (column === "firewallDesc") {
                return (
                  <TableCell
                    key={i}
                    onClick={(event) => handleRowSelect(row)}
                    sx={{
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={row[column]}
                  >
                    {row[column]}
                  </TableCell>
                );
              } else if (column === "action") {
                return (
                  <TableCell
                    key={i}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(e) => handleMenuClick(e, index)}
                    sx={{
                      cursor:
                        row.firewallStatus.includes("processing") ||
                        row.sysDefined ||
                        restrictAccess()
                          ? "not-allowed !important"
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
              } else {
                return (
                  <TableCell key={i} onClick={(event) => handleRowSelect(row)}>
                    {row[column]}
                  </TableCell>
                );
              }
            })}
            <Menu
              sx={{ top: "-10px !important" }}
              key={index}
              id="basic-menu"
              anchorEl={anchorEl}
              open={
                open &&
                openRowMenuIndex === index &&
                !row.firewallStatus.includes("processing") &&
                !row.sysDefined &&
                !restrictAccess()
              }
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "basic-button" }}
            >
              <MenuItem
                style={{ display: "block" }}
                onClick={() => handleClickEdit(row.firewallId, "edit")}
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
              </MenuItem>
              <MenuItem
                onClick={() => handleDeleteModalOpen(row, "delete")}
                style={{ display: row.sysDefined ? "none" : "block" }}
              >
                <DeleteOutlineOutlinedIcon
                  sx={{
                    position: "relative",
                    top: "3px",
                    mr: 1,
                    fontSize: "18px",
                  }}
                />{" "}
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
    const isCreateProcess = allTableDatas?.some(
      (item) => item.firewallStatus == "create processing"
    );
    if (isCreateProcess) {
      setPage(0);
      Cookies.remove("firewallTablePage");
    }
    // getTablePage();
  }, [allTableDatas.length]);

  useEffect(() => {
    if (!cookies) {
      Cookies.remove("firewallTablePage");
      Cookies.remove("firewallTableRowsPerPage");
    }
  }, [cookies]);

  const handleChangePage = (newPage) => {
    Cookies.set("firewallTablePage", newPage);

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    Cookies.set("firewallTableRowsPerPage", newRowsPerPage);
    setRowsPerPage(newRowsPerPage);
    Cookies.remove("firewallTablePage");
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
    Cookies.remove("firewallTablePage");
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

  const addFirewallPopup = () => {
    // console.log("testing");
  };

  // TR 01 ***********TR 01 POST CALL ************

  const firewallAddForm = useForm({ mode: "onChange" });
  const {
    register: register,
    handleSubmit: handleSubmitFirewall,
    formState: { errors: errorsFirewall },
    reset: reset,
    control: controllFirewall,
    setValue: setFirewallform,
  } = firewallAddForm;
  const [firewallInfo, setFirewallInfo] = useState({
    firewallPriorityId: null,
    firewallName: "",
    firewallDesc: "",
    firewallType: "",
    firewallModeId: "",
    applicationIds: [""],
    sourceIds: [""],
    destinationIds: [""],
    state: true,
    logging: false,
    tenantId: "",
  });
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFirewallInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleSwitchChange = (newState) => {
    setFirewallInfo((prev) => ({ ...prev, state: newState }));
  };
  const handlealogginSwitchChange = (newState) => {
    setFirewallInfo((prev) => ({ ...prev, logging: newState }));
  };
  //

  const fetchFormData = async () => {
    // const tdata = cookies ? JSON.parse(cookies) : [];
    const tdata = cookies ? JSON.parse(cookies) : [];

    const newData = {
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getFirfallFormData",
      token: tdata.accessToken,
    };

    try {
      const { data } = await axios.post(
        "/api/surface/networks/networksecurity/firewall",
        finalData
      ); // call the new API route
      if (data) {
        data.map(function (elem) {
          if (elem.type === "priorityid") {
            setFirewallInfo((prev) => ({
              ...prev,
              firewallPriorityId: elem?.list[0].value,
            }));
          }
        });
        // toast.success("Sucess");
      }
    } catch (error) {
      // toast.error("An error occurred");
    }
  };

  console.log(firewallInfo, "00 firewallInfo");
  console.log(originalFormDatas, "00 originalFormDatas");
  return (
    <>
      <ComDataTable
        notAllowedCursor={restrictAccess()}
        hideSkeletonTbl={hideSkeleton}
        searchLabel={"Search Firewall Rules"}
        showSearch={true}
        showDownload={false}
        showAddButton={true}
        handleAddEvent={handleClickOpen}
        tableTitle={"List of Firewall Rules"}
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

      <AddFirewall
        page={page}
        setPage={setPage}
        firewallInfo={firewallInfo}
        setFirewallInfo={setFirewallInfo}
        ModalhandleClose={ModalhandleClose}
        handleClickOpen={handleClickOpen}
        Modalopen={Modalopen}
        setOpen={setOpen}
        type={type}
        setType={setType}
        handleClose={handleClose}
        editId={editId}
        fetchData={fetchData}
        stcachdata={stcachdata}
        isObjectsEqual={isObjectsEqual}
      />

      {/* -------------------------------------------Delete modal------------------------------- */}
      <Dialog
        open={deleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Firewall?</DialogTitle>
        <DialogContent
          sx={{
            width: { lg: "500px", xs: "100%", sm: "100%", md: "500px" },
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{ marginBottom: "20px" }}
          >
            Firewall: <b>{modalDeleteData.firewallName}</b>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the firewall?
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
            onClick={() => handleDeleteItem(modalDeleteData.firewallId)}
            autoFocus
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* -------------------------------------------Delete modal------------------------------- */}
    </>
  );
}

export default FirewallDataTable;
