// ** React Imports
import * as React from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";

// ** MUI Components
import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import ComDataTable from "../../../../../tools/datatable";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import styles from "../../../../../../pages/surface/networks/networksecurity/securitygroup/index.module.css";
import Autorenew from "@mui/icons-material/Autorenew";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Popover from "@mui/material/Popover";

// ** MUI ICON Components
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { FormHelperText, ListItemText, Checkbox } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useClientIP } from "../../../../../../utils/context/ClientIPContext";

// ** Table ODD AND EVEN Styles
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
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
export const CssTextField = styled(TextField)({
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
export const CssFormControl = styled(FormControl)({
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
export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "auto",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export function BootstrapDialogTitle(props) {
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
export const ModalButton = styled(Button)(({ theme }) => ({
  color: "#FFF",
  backgroundImage: "linear-gradient(45deg, #0288d1, #26c6da) !important",
  "&:hover": {
    backgroundImage: "linear-gradient(45deg, #0288d1, #26c6da) !important",
  },
}));

// ** Switch Function
export const AntSwitch = styled(Switch)(({ theme }) => ({
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

function NatDataTable() {
  // ** Modal Popup Function
  const [Modalopen, setOpen] = React.useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isProceedLoading, setIsProceedLoading] = useState(false);
  const [getDataByID, setgetDataByID] = useState(null);
  const [swiftModal, setswiftModal] = useState("add");

  // ** Form Data Function
  const [application, setApplication] = useState([]);
  const [interfaceTypeMenu, setinterfaceTypeMenu] = useState([]);
  const [externalipsMenu, setexternalipsMenu] = useState([]);
  const [externalIpId, setexternalIpId] = useState(0);
  const [natRuleID, setNatRuleID] = useState("");

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
  const [allData, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);
  const [stcachdata, setstcachdata] = useState([]);

  const cookies = Cookies.get("userData");
  const getTablePage = () => {
    const NatTablePage = Cookies.get("NatTablePage");
    const NatTableRowsPerPage = Cookies.get("NatTableRowsPerPage");
    if (NatTablePage && NatTablePage !== null) {
      setPage(parseInt(NatTablePage, 10));
    }
    if (NatTableRowsPerPage && NatTableRowsPerPage !== null) {
      setRowsPerPage(parseInt(NatTableRowsPerPage, 10));
    }
  };
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;
    resetCommon();
    setstcachdata(cachData);
    if (cachData) {
      fetchData(cachData);
      fetchAddInitDatas(cachData);
    }
    getTablePage();
  }, [cookies, page, rowsPerPage, searchText, sortColumn, sortDirection]);
  useEffect(() => {
    getTablePage();
  }, []);

  const getPage = () => {
    const NatTablePage = Cookies.get("NatTablePage");
    if (NatTablePage && (NatTablePage !== undefined || NatTablePage !== null)) {
      return NatTablePage;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (!cookies) {
      Cookies.remove("NatTableRowsPerPage");
      Cookies.remove("NatTablePage");
    }
  }, [cookies]);

  const { clientIP } = useClientIP();

  // ** Functions for Modal
  const [defaultInterfaceType, setdefaultInterfaceType] = useState("");

  const handleDeleteModalOpen = (data) => {
    setIsProceedLoading(false);
    setDeleteModal(true);
    setgetDataByID(data);
    handleClose();
  };

  const handleClickOpen = () => {
    setIsProceedLoading(false);
    if (!restrictAccess()) {
      setOpen(true);
    }
    setswiftModal("add");
    // if (formDatas.interfaceTypeMenu === "SNAT") {
    //   errorsCommon.applicationIds = false;
    // }
    setformDatas({
      natRulePriorityId: "",
      natRuleName: "",
      natRuleDesc: "",
      internalIp: "",
      externalIp: "",
      externalPort: "",
      applicationIds: [""],
      natRuleInterfaceType: defaultInterfaceType,
      state: true,
      logging: false,
    });
    setInputErr(false);
    setnameErr(false);
    setpiriorityIdErr(false);
    setinterfaceTypeErr(false);
    setexternalIpErr(false);
    setinternalIpErr(false);
    setexternalPortErr(false);
  };
  const handleEditOpen = (data, type) => {
    setswiftModal(type);
    handleEditItem(data.natRuleId);
    setIsProceedLoading(false);
    setOpen(true);
  };
  const ModalhandleClose = () => {
    setOpen(false);
    errorsCommon.natRulePriorityId = false;
    errorsCommon.natRuleName = false;
    errorsCommon.internalIp = false;
    errorsCommon.externalIp = false;
    errorsCommon.natRuleInterfaceType = false;
    errorsCommon.applicationIds = false;
    setnameErr(false);
    setpiriorityIdErr(false);
    setinterfaceTypeErr(false);
    setexternalIpErr(false);
    setinternalIpErr(false);
    setInputErr(false);
    setexternalPortErr(false);
    setformDatas({
      natRulePriorityId: "",
      natRuleName: "",
      natRuleDesc: "",
      internalIp: "",
      externalIp: "",
      externalPort: "",
      applicationIds: [""],
      natRuleInterfaceType: "",
      state: true,
      logging: false,
    });
  };
  const handleDeleteModalClose = () => {
    setDeleteModal(false);
  };

  // ** Form

  const formCommonMethods = useForm();

  const {
    register: registerCommon,
    handleSubmit: handleSubmitCommon,
    formState: { isSubmitting, errors: errorsCommon },
    reset: resetCommon,
  } = formCommonMethods;

  const [formDatas, setformDatas] = useState({
    natRulePriorityId: "",
    natRuleName: "",
    natRuleDesc: "",
    internalIp: "",
    externalIp: "",
    externalPort: "",
    applicationIds: [""],
    natRuleInterfaceType: defaultInterfaceType,
    state: true,
    logging: false,
  });
  const {
    natRulePriorityId,
    natRuleName,
    natRuleDesc,
    internalIp,
    externalIp,
    externalPort,
    applicationIds,
    state,
    logging,
    natRuleInterfaceType,
  } = formDatas;

  const [nameErr, setnameErr] = useState(false);
  const [piriorityIdErr, setpiriorityIdErr] = useState(false);
  const [interfaceTypeErr, setinterfaceTypeErr] = useState(false);
  const [externalIpErr, setexternalIpErr] = useState(false);
  const [internalIpErr, setinternalIpErr] = useState(false);
  const [externalPortErr, setexternalPortErr] = useState(false);

  const [inputErr, setInputErr] = useState(false);

  const [inputErrMsg, setInputErrMsg] = useState({
    internalIPErrMsg: "",
    piriorityIDErrMsg: "",
    nameErrMsg: "",
    interfaceTypeErrMsg: "",
    externalIPErrMsg: "",
    applicationErrMsg: "",
    externalPortErrMsg: "",
  });
  const [applicationIdsERR, setapplicationIdsERR] = useState({
    state: false,
    message: "",
  });

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setformDatas({ ...formDatas, [name]: value });
    if (name == "natRulePriorityId") {
      if (value) {
        setpiriorityIdErr(false);
        errorsCommon.natRulePriorityId = false;
        const sanitizedValue = value.replace(/[^0-9]/g, "");
        setformDatas({ ...formDatas, natRulePriorityId: sanitizedValue });
      } else if (!value) {
        setpiriorityIdErr(true);
        setInputErrMsg({
          ...inputErrMsg,
          piriorityIDErrMsg: "Piriority ID is required",
        });
      }
    }
    if (name == "natRuleName") {
      if (value) {
        setnameErr(false);
        errorsCommon.natRuleName = false;
        if (value.length <= 2 || !/(?:[a-zA-Z].*){3,}/.test(value)) {
          setnameErr(true);
          setInputErrMsg({
            ...inputErrMsg,
            nameErrMsg: "Minimum 3 characters required",
          });
        } else if (!/^[a-zA-Z0-9_-]{3,25}$/.test(value)) {
          setnameErr(true);

          setInputErrMsg({
            ...inputErrMsg,
            nameErrMsg: "Name is invalid",
          });
        } else {
          setnameErr(false);
        }
      } else if (!value) {
        setnameErr(true);

        setInputErrMsg({
          ...inputErrMsg,
          nameErrMsg: "Name is required",
        });
      }
    }
    if (name == "natRuleInterfaceType") {
      if (value) {
        errorsCommon.natRuleInterfaceType = false;
        setinterfaceTypeErr(false);
      } else if (!value) {
        setinterfaceTypeErr(true);

        setInputErrMsg({
          ...inputErrMsg,
          interfaceTypeErrMsg: "InterfaceType is required",
        });
      }
    }
    if (name == "externalIp") {
      if (value) {
        errorsCommon.externalIp = false;
      } else if (!value) {
        setexternalIpErr(true);

        setInputErrMsg({
          ...inputErrMsg,
          externalIPErrMsg: "External IP is required",
        });
      }
    }
    if (name == "internalIp") {
      const cidrPattern = /\/\d{1,2}$/;
      const REGEX_internalIP =
        /^(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      if (value) {
        errorsCommon.internalIp = false;
        // const sanitizedValue = value.replace(/[^0-9.]/g, "");
        setformDatas({ ...formDatas, internalIp: value });
        if (!REGEX_internalIP.test(value)) {
          setinternalIpErr(true);
          setInputErrMsg({ ...inputErrMsg, internalIPErrMsg: "Invalid IP" });
        } else {
          setinternalIpErr(false);
        }
      } else if (!value) {
        setinternalIpErr(true);
        setInputErrMsg({
          ...inputErrMsg,
          internalIp: "Internal IP is required",
        });
      }
    }
    if (name === "externalPort") {
      if (value) {
        setexternalPortErr(false);
        const sanitizedValue = value.replace(/[^0-9]/g, "");
        setformDatas({ ...formDatas, externalPort: sanitizedValue });
        if (value > 65535 || value == 0) {
          setexternalPortErr(true);
          setInputErrMsg({
            ...inputErrMsg,
            externalPortErrMsg: `"${value}" is not a valid port. The port number must be between 0 and 65535.`,
          });
        } else {
          setexternalPortErr(false);
        }
      } else if (value > 0 || value == 0) {
        setexternalPortErr(false);
      }
    }
    if (name == "applicationIds") {
      if (value.length == 0) {
        // errorsCommon.applications = false;
        // setapplicationIdsERR({ state: false, message: "" });/
        // setInputErr(false);
        // } else if (value.length == 0) {
        // if (formDatas.applicationIds === "SNAT") {
        //   errorsCommon.applications = false;
        // }
        setInputErr(true);
        setInputErrMsg({
          ...inputErrMsg,
          applicationErrMsg: "Application is required",
        });
        // }
        // setapplicationIdsERR({
        //   state: true,
        //   message: "Application is required",
        // });
      } else {
        setInputErr(false);
      }
    }
  };
  const fetchAddInitDatas = async (tdata) => {
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
        "/api/surface/networks/networksecurity/nat",

        finalData
      ); // call the new API route

      if (data) {
        data.map(function (elem) {
          if (elem.type === "applcations") {
            setApplication(elem.list);
          } else if (elem.type === "interfacetypes") {
            const defaultid = elem.defaultId;
            const filteredobj = elem.list.filter(
              (item) => item.id == defaultid
            );
            setdefaultInterfaceType(filteredobj[0].value);
            setinterfaceTypeMenu(elem.list);
          } else if (elem.type === "externalips") {
            setexternalipsMenu(elem.list);
          }
        });
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };
  // ** CRUD Funnctions
  const [hideSkeletonTbl, sethideSkeletonTbl] = useState(false);
  const [allDatasOfTable, setallDatasOfTable] = useState([]);
  // const [isloading, setisloading] = useState(true);

  const fetchData = async (tdata) => {
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
      endPoint: "getallnatrules",
      token: tdata.accessToken,
    };

    try {
      const { data } = await axios.post(
        "/api/surface/networks/networksecurity/nat",
        finalData
      ); // call the new API route

      if (data.recordsSize === 0 && page > 0) {
        Cookies.set("NatTablePage", page - 1);
        setPage(page - 1);
      }
      if (data.data) {
        getTablePage();
        const itemWithCurrentState1 = data.data.find(
          (item) => item.currentstate === 9001
        );

        if (itemWithCurrentState1) {
          setTimeout(() => {
            fetchData(tdata);
          }, 15000);
        }
      }

      if (data) {
        // Assuming your data has an attribute 'createdDate' that indicates when the data was created
        // const sortedData = data.data
        //   .slice()
        //   .sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1));
        setData(data.data);
        setTotalRecords(data.totalRecords);
      }
      sethideSkeletonTbl(true);
    } catch (error) {
      toast.error("An error occurred");
    }
    const getallDatasOfTable = {
      search: "",
      start: 0,
      length: totalRecords + totalRecords,
      sortColumn: "",
      sortDirection: "asc",
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const getallDatasOfTableforValidation = {
      data: getallDatasOfTable,
      endPoint: "getallnatrules",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/networksecurity/nat",
        getallDatasOfTableforValidation
      );
      if (data) {
        setallDatasOfTable(data.data);
      } // call the new API route

      if (data.data) {
        const itemWithCurrentState1 = data.data.find(
          (item) => item.currentstate === 9001
        );
        if (itemWithCurrentState1) {
          setTimeout(() => {
            fetchData(tdata);
          }, 15000);
        }
      }
    } catch (error) {}
  };
  // setTimeout(() => {
  //   setisloading(false);
  // }, 2500);
  const postCommonFunction = async (tdata, finalData) => {
    try {
      const { data } = await axios.post(
        "/api/surface/networks/networksecurity/nat",
        finalData
      );
      if (data.status === "ok") {
        resetCommon();
        setIsProceedLoading(false);
        ModalhandleClose();
        fetchData(tdata);
        if (swiftModal === "edit") {
          toast.success("Nat Rule updated successfully!");
        } else {
          toast.success("Nat Rule has been added successfully!");
          // if (page !== 0) {
          //   Cookies.remove("NatTablePage");
          //   setPage(0);
          // }
        }
      } else if (data.status === "error") {
        toast.error(data.message);
        setIsProceedLoading(false);
      }
    } catch (error) {
      setIsProceedLoading(false);
      toast.error("An error occurred");
    }
  };
  useEffect(() => {
    const isCreateProcess = allDatasOfTable.some(
      (item) => item.natRuleStatus == "create processing"
    );
    if (isCreateProcess) {
      setPage(0);
      Cookies.remove("NatTablePage");
    }
    getTablePage();
  }, [allDatasOfTable.length]);

  const oncommonSubmit = (data) => {
    data.mapOrderIpId = externalIpId;

    if (swiftModal === "add") {
      if (formDatas.natRuleInterfaceType === "SNAT") {
        // errorsCommon.applicationIds = false;
        data.applicationIds = [];
      } else {
        const updatedapplicationIds = data.applicationIds?.filter(
          (id) => id !== 0
        );
        data.applicationIds = data.applicationIds?.filter(Boolean);
        if (data.applicationIds.length === 0) {
          data.applicationIds = [];
        } else {
          data.applicationIds = updatedapplicationIds;
        }
      }
    }
    let appIds = applicationIds;
    if (swiftModal === "edit" && applicationIds[0] == "") {
      appIds = [];
    }

    let pendPoint = "addnatrule";
    const tdata = stcachdata;
    data.tenantId = tdata.tenant_id;
    if (swiftModal === "edit") {
      data.externalIp = externalIp;
      data.internalIp = internalIp;
      data.natRuleInterfaceType = natRuleInterfaceType;
      data.natRuleName = natRuleName;
      data.natRuleId = natRuleID;
      data.applicationIds = appIds;
      data.natRuleDesc = natRuleDesc;
      data.natRulePriorityId = natRulePriorityId;
      data.state = state;
      data.logging = logging;
      pendPoint = "updatenatrule";
      if (formDatas.natRuleInterfaceType === "SNAT") {
        data.externalPort = "";
        data.applicationIds = [];
      } else {
        data.externalPort = externalPort;
      }
    }

    const newData = {
      tenantId: tdata.tenant_id,
      data: data,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: pendPoint,
      token: tdata.accessToken,
    };
    if (formDatas.natRuleInterfaceType === "SNAT") {
      if (
        !nameErr &&
        !piriorityIdErr &&
        !interfaceTypeErr &&
        !externalIpErr &&
        !internalIpErr
      ) {
        setIsProceedLoading(true);

        postCommonFunction(tdata, finalData);
      }
    } else if (
      !nameErr &&
      !piriorityIdErr &&
      !interfaceTypeErr &&
      !externalIpErr &&
      !internalIpErr &&
      !externalPortErr &&
      !inputErr
    ) {
      setIsProceedLoading(true);

      postCommonFunction(tdata, finalData);
    } else {
      setIsProceedLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    setIsProceedLoading(true);
    handleClose();
    const tdata = stcachdata;

    const newData = {
      natRuleId: id,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "deletenatrule",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/networksecurity/nat",
        finalData
      ); // call the new API route

      // console.log(data, "Deleted");
      if (data.status === "ok") {
        toast.success("Nat has been deleted successfully!");
        fetchData(tdata);
        setDeleteModal(false);
        setIsProceedLoading(false);
      } else if (data.status === "error") {
        toast.error(data.message);
        setDeleteModal(false);
      }
    } catch (error) {
      toast.error("An error occurred");
      setIsProceedLoading(false);
    }
  };
  const [originalFormDatas, setoriginalFormDatas] = useState({});
  const handleEditItem = async (id) => {
    setNatRuleID(id);
    setIsProceedLoading(true);
    handleClose();
    const tdata = stcachdata;

    const newData = {
      natRuleId: id,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getnatrule",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/networksecurity/nat",
        finalData
      ); // call the new API route
      if (data) {
        const datasToCompare = {
          natRuleName: data.natRuleName,
          natRulePriorityId: data.natRulePriorityId,
          natRuleName: data.natRuleName,
          natRuleDesc: data.natRuleDesc,
          internalIp: data.internalIp,
          externalIp: data.externalIp,
          externalPort: data.externalPort,
          applicationIds:
            data.applications.length !== 0
              ? data.applications.map((e) => e.applicationId)
              : [""],
          natRuleInterfaceType: data.natRuleInterfaceType,
          state: data.state,
          logging: data.logging,
        };
        setoriginalFormDatas(datasToCompare);
        setformDatas({
          natRuleName: data.natRuleName,
          natRulePriorityId: data.natRulePriorityId,
          natRuleDesc: data.natRuleDesc,
          internalIp: data.internalIp,
          externalIp: data.externalIp,
          externalPort: data.externalPort,
          applicationIds:
            data.applications.length !== 0
              ? data.applications.map((e) => e.applicationId)
              : [""],
          natRuleInterfaceType: data.natRuleInterfaceType,
          state: data.state,
          logging: data.logging,
        });
        setexternalIpId(data.mapOrderIpId);
      }
    } catch (error) {
      toast.error("An error occurred");
      setIsProceedLoading(false);
    }
  };

  // Table Action DropDown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openRowMenuIndex, setOpenRowMenuIndex] = useState(null);
  const handleMenuClick = (event, index) => {
    if (!restrictAccess()) {
      setAnchorEl(event.currentTarget);
      setOpenRowMenuIndex(index);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* changing items */
  const [columnLabels, setColumnLabels] = useState({
    currentstate: "Status",
    natRulePriorityId: "Priority ID",
    natRuleName: "Name",
    state: "State",
    natRuleInterfaceType: "Type",
    externalIp: "External IP",
    applications: "Application Port",
    internalIp: "Internal IP",
    // natRuleDesc: "Comments",
    // logging: "Logging",
    action: "Action",
  });
  function isObjectsEqual() {
    const keysA = formDatas;
    const keysB = originalFormDatas;
    const keysA_ApplicationIds = keysA.applicationIds.sort((a, b) => a - b);
    // console.log(keysA_ApplicationIds, "ERR");

    if (formDatas.natRuleInterfaceType === "SNAT") {
      return (
        keysA.natRuleName !== keysB.natRuleName ||
        keysA.natRulePriorityId !== keysB.natRulePriorityId ||
        keysA.natRuleDesc !== keysB.natRuleDesc ||
        keysA.internalIp !== keysB.internalIp ||
        keysA.externalIp !== keysB.externalIp ||
        keysA.natRuleInterfaceType !== keysB.natRuleInterfaceType ||
        keysA.state !== keysB.state ||
        keysA.logging !== keysB.logging
      );
    } else {
      return (
        keysA.natRuleName !== keysB.natRuleName ||
        keysA.natRulePriorityId !== keysB.natRulePriorityId ||
        keysA.natRuleDesc !== keysB.natRuleDesc ||
        keysA.internalIp !== keysB.internalIp ||
        keysA.externalPort !== keysB.externalPort ||
        keysA.externalIp !== keysB.externalIp ||
        keysA.natRuleInterfaceType !== keysB.natRuleInterfaceType ||
        keysA.state !== keysB.state ||
        keysA.logging !== keysB.logging ||
        keysA_ApplicationIds.some((item, index) => {
          return item !== keysB.applicationIds[index];
        }) ||
        keysA.applicationIds.length !== keysB.applicationIds.length
      );
    }
  }
  const restrictAccess = () => {
    const res = allDatasOfTable?.some((obj) =>
      obj.currentmsg.toLowerCase().includes("processing")
    );
    return res;
  };
  const formedTrows = () => {
    return (
      <>
        {allData?.map((row, index) => (
          <StyledTableRow
            key={index}
            selected={isRowSelected(row)}
            style={{ cursor: "pointer" }}
          >
            {/*

              <TableCell padding="checkbox" onClick={(event) => handleRowSelect(row)} >
              <Checkbox checked={isRowSelected(row)} sx={{color: "#6b6f82",'&.Mui-checked': {color: '#6DCCDD',},}}/>
            </TableCell>
            
              */}
            {Object.keys(columnLabels).map((column, index1) => {
              if (column === "currentstate") {
                if (row[column] === 9000 || row[column] === 9002) {
                  return (
                    <TableCell
                      style={{
                        maxWidth: "100px", // Adjust this value based on your requirement
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        whiteSpace: "nowrap",
                      }}
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
                } else if (row[column] === 9015 || row[column] === 9025) {
                  return (
                    <TableCell
                      style={{
                        maxWidth: "100px", // Adjust this value based on your requirement
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        whiteSpace: "nowrap",
                      }}
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
                } else if (row[column] === 9001) {
                  return (
                    <TableCell
                      style={{
                        maxWidth: "100px", // Adjust this value based on your requirement
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        whiteSpace: "nowrap",
                      }}
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
              } else if (column === "natRulePriorityId") {
                return (
                  <TableCell
                    style={{
                      maxWidth: "100px", // Adjust this value based on your requirement
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 2,
                      whiteSpace: "nowrap",
                    }}
                    title={row[column]}
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                  >
                    {row[column]}
                  </TableCell>
                );
              } else if (column === "natRuleName") {
                return (
                  <TableCell
                    style={{
                      maxWidth: "100px", // Adjust this value based on your requirement
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 2,
                      whiteSpace: "nowrap",
                    }}
                    title={row[column]}
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                  >
                    {row[column]}
                  </TableCell>
                );
              } else if (column === "state") {
                if (row[column] === true) {
                  return (
                    <TableCell
                      key={index1}
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
                      style={{
                        maxWidth: "100px", // Adjust this value based on your requirement
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        whiteSpace: "nowrap",
                      }}
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
                } else if (row[column] === false) {
                  return (
                    <TableCell
                      key={column}
                      onClick={(event) => handleRowSelect(row)}
                    >
                      <AntSwitch
                        color="success"
                        disabled
                        inputProps={{ "aria-label": "ant design" }}
                      />
                    </TableCell>
                  );
                }
              } else if (column === "applications") {
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
                    title={
                      row[column].length > 0
                        ? row[column]
                            .map((ele) => ele.applicationName)
                            .join(",")
                        : "Any"
                    }
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                  >
                    {row[column].length > 0
                      ? row[column].map((ele) => ele.applicationName).join(",")
                      : "Any"}
                  </TableCell>
                );
              } else if (column === "externalIp") {
                return (
                  <TableCell
                    style={{
                      maxWidth: "100px", // Adjust this value based on your requirement
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 2,
                      whiteSpace: "nowrap",
                    }}
                    title={row[column]}
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                  >
                    {row[column]}
                  </TableCell>
                );
              } else if (column === "internalIp") {
                return (
                  <TableCell
                    style={{
                      maxWidth: "100px", // Adjust this value based on your requirement
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 2,
                      whiteSpace: "nowrap",
                    }}
                    title={row[column]}
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                  >
                    {row[column]}
                  </TableCell>
                );
              } else if (column === "natRuleDesc") {
                return (
                  <TableCell
                    style={{
                      maxWidth: "100px", // Adjust this value based on your requirement
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 2,
                      whiteSpace: "nowrap",
                    }}
                    title={row[column]}
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                  >
                    {row[column]}
                  </TableCell>
                );
              }
              if (column === "logging") {
                if (row[column] === true) {
                  return (
                    <TableCell
                      style={{
                        maxWidth: "100px", // Adjust this value based on your requirement
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        whiteSpace: "nowrap",
                      }}
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
                      style={{
                        maxWidth: "100px", // Adjust this value based on your requirement
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        whiteSpace: "nowrap",
                      }}
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
              } else if (column === "action") {
                return (
                  <TableCell
                    key={column}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(event) => handleMenuClick(event, index)}
                    style={{
                      cursor:
                        row.natRuleStatus.includes("processing") ||
                        row.sysDefined === true ||
                        restrictAccess()
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
              } else {
                return (
                  <TableCell
                    key={column}
                    onClick={(event) => handleRowSelect(row)}
                  >
                    {row[column]}
                  </TableCell>
                );
              }
            })}

            <Menu
              hidden={
                restrictAccess() ? restrictAccess() : row.sysDefined === true
              }
              id="basic-menu"
              anchorEl={anchorEl}
              open={
                open &&
                openRowMenuIndex === index &&
                !row.natRuleStatus.includes("processing") &&
                !restrictAccess()
              }
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "basic-button" }}
            >
              <MenuItem
                onClick={() => {
                  handleEditOpen(row, "edit");
                }}
                // style={{
                //   display: row.natRuleStatus === "failure" ? "none" : "block",
                // }}
              >
                <EditOutlinedIcon sx={{ mr: 1, fontSize: "18px" }} /> Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleDeleteModalOpen(row);
                }}
                style={{
                  display: row.sysDefined === true ? "none" : "flex",
                }}
              >
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

  const handleChangePage = (newPage) => {
    setPage(newPage);
    Cookies.set("NatTablePage", newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    Cookies.set("NatTableRowsPerPage", newRowsPerPage);
    Cookies.remove("NatTablePage");
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    setPage(0);
    Cookies.remove("NatTablePage");
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
      const newSelectedRows = allData.map((row) => row);
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
  const [anchorNatRulePoolsEl, setAnchorNatRulePoolsEl] = React.useState(null);
  const NatRulePoolshandleClick = (event) => {
    setAnchorNatRulePoolsEl(event.currentTarget);
  };
  const NatRulePoolshandlePopoverClose = () => {
    setAnchorNatRulePoolsEl(null);
  };
  const NatRulePoolsPopopen = Boolean(anchorNatRulePoolsEl);

  const [popanchorEl, setpopAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setpopAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setpopAnchorEl(null);
  };
  const Popopen = Boolean(popanchorEl);
  const id = Popopen ? "simple-popover" : undefined;

  return (
    <>
      <ComDataTable
        // isloading={isloading}
        notAllowedCursor={restrictAccess()}
        hideSkeletonTbl={hideSkeletonTbl}
        searchLabel={"Search NAT Rules"}
        showSearch={true}
        showDownload={false}
        showAddButton={true}
        handleAddEvent={handleClickOpen}
        tableTitle={"List of NAT Rules"}
        totalRecords={totalRecords}
        data={allData}
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

      {/* Start of delete Modal Popup */}
      <Dialog
        open={deleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Nat Rule?</DialogTitle>
        <DialogContent
          sx={{
            width: { lg: "500px", xs: "100%", sm: "100%", md: "500px" },
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{ marginBottom: "20px" }}
          >
            Nat Rule: <b>{getDataByID?.natRuleName}</b>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Delete Nat Rule?
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
            onClick={() => handleDeleteItem(getDataByID?.natRuleId)}
            autoFocus
            variant="contained"
          >
            {isProceedLoading ? (
              <Autorenew className={styles.loadingBtn} sx={{ color: "#fff" }} />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
      {/* End of delete Modal Popup */}

      {/* Start add Modal Popup Design Here */}
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
          {swiftModal === "add" ? "Add NAT Rule" : "Edit NAT Rule"}
        </BootstrapDialogTitle>
        <Box
          onSubmit={handleSubmitCommon(oncommonSubmit)}
          component="form"
          autoComplete="off"
        >
          <DialogContent dividers>
            <FormControl
              fullWidth
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CssTextField
                {...registerCommon("natRulePriorityId", {
                  required: !formDatas.natRulePriorityId
                    ? "Priority ID is required"
                    : false,
                })}
                margin="normal"
                fullWidth
                autoFocus
                id="natRulePriorityId"
                label="Priority ID"
                name="natRulePriorityId"
                onChange={(e) => {
                  handleOnchange(e);
                }}
                value={
                  formDatas.natRulePriorityId
                    ? formDatas.natRulePriorityId
                    : ""
                    ? 0
                    : formDatas.natRulePriorityId
                }
                type="text"
                inputProps={{ min: 0 }}
              />
              <InfoOutlinedIcon
                sx={{ ml: 1 }}
                className={styles.StaticIpInfoIcon}
                onClick={NatRulePoolshandleClick}
              />
              <Popover
                id={id}
                open={NatRulePoolsPopopen}
                anchorEl={anchorNatRulePoolsEl}
                onClose={NatRulePoolshandlePopoverClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Box className={styles.PopoveBoxContainer}>
                  {/* <Typography
                    component="h4"
                    variant="h5"
                    align="left"
                    fontSize={16}
                    className={styles.PopoverHeader}
                  >
                    Static IP Range
                  </Typography> */}
                  <Typography
                    component="p"
                    variant="p"
                    color={"#6b6f82"}
                    fontSize={14}
                    align="center"
                    sx={{ pt: 1 }}
                    className={styles.PopoverContent}
                  >
                    If an address has multiple NAT rules, the rule with the
                    highest priority is applied. A lower value means a higher
                    precedence for this rule.
                  </Typography>
                </Box>
              </Popover>
            </FormControl>
            {errorsCommon.natRulePriorityId ? (
              <FormHelperText error>
                {errorsCommon.natRulePriorityId.message}
              </FormHelperText>
            ) : (
              <>
                {piriorityIdErr && (
                  <FormHelperText error>
                    {inputErrMsg.piriorityIDErrMsg}
                  </FormHelperText>
                )}
              </>
            )}

            <CssTextField
              {...registerCommon("natRuleName", {
                required: !formDatas.natRuleName ? "Name is required" : false,
              })}
              margin="normal"
              fullWidth
              id="natRuleName"
              label="Name"
              name="natRuleName"
              onChange={handleOnchange}
              value={formDatas.natRuleName ? formDatas.natRuleName : ""}
            />
            {errorsCommon.natRuleName ? (
              <FormHelperText error>
                {errorsCommon.natRuleName.message}
              </FormHelperText>
            ) : (
              <>
                {nameErr && (
                  <FormHelperText error>
                    {inputErrMsg.nameErrMsg}
                  </FormHelperText>
                )}
              </>
            )}

            <CssTextField
              {...registerCommon("natRuleDesc")}
              margin="normal"
              fullWidth
              id="natRuleDesc"
              label="Description"
              name="natRuleDesc"
              onChange={handleOnchange}
              value={formDatas.natRuleDesc ? formDatas.natRuleDesc : ""}
            />
            <CssFormControl margin="normal" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Interface Type
              </InputLabel>
              <Select
                {...registerCommon("natRuleInterfaceType", {
                  required: !formDatas.natRuleInterfaceType
                    ? "Interface Type is required"
                    : false,
                })}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Interface Type"
                MenuProps={MenuProps}
                name="natRuleInterfaceType"
                onChange={handleOnchange}
                value={
                  formDatas.natRuleInterfaceType
                    ? formDatas.natRuleInterfaceType
                    : defaultInterfaceType
                }
              >
                {interfaceTypeMenu?.map((item, appIndex) => {
                  return (
                    <MenuItem key={appIndex} value={item.value}>
                      {item.value}
                    </MenuItem>
                  );
                })}
              </Select>
            </CssFormControl>
            {errorsCommon.natRuleInterfaceType ? (
              <FormHelperText error>
                {errorsCommon.natRuleInterfaceType.message}
              </FormHelperText>
            ) : (
              <>
                {interfaceTypeErr && (
                  <FormHelperText error>
                    {inputErrMsg.interfaceTypeErrMsg}
                  </FormHelperText>
                )}
              </>
            )}

            <CssFormControl margin="normal" fullWidth>
              <InputLabel id="demo-simple-select-label">External IP</InputLabel>
              <Select
                {...registerCommon("externalIp", {
                  required: !formDatas.externalIp
                    ? "External IP is required"
                    : false,
                })}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="External IP"
                MenuProps={MenuProps}
                name="externalIp"
                onChange={handleOnchange}
                value={formDatas.externalIp ? formDatas.externalIp : ""}
              >
                {externalipsMenu?.map((item, appIndex) => {
                  return (
                    <MenuItem
                      key={appIndex}
                      onClick={() => {
                        setexternalIpId(item.id);
                      }}
                      value={item.value}
                    >
                      {item.value}
                    </MenuItem>
                  );
                })}
              </Select>
            </CssFormControl>
            {errorsCommon.externalIp ? (
              <FormHelperText error>
                {errorsCommon.externalIp.message}
              </FormHelperText>
            ) : (
              <>
                {externalIpErr && (
                  <FormHelperText error>
                    {inputErrMsg.externalIPErrMsg}
                  </FormHelperText>
                )}
              </>
            )}

            {formDatas.natRuleInterfaceType !== "SNAT" && (
              <CssTextField
                {...registerCommon("externalPort")}
                margin="normal"
                fullWidth
                type="text"
                id="externalPort"
                label="External Port"
                name="externalPort"
                inputProps={{
                  min: 1,
                }}
                onChange={handleOnchange}
                value={formDatas.externalPort ? formDatas.externalPort : ""}
              />
            )}
            {externalPortErr && formDatas.natRuleInterfaceType !== "SNAT" && (
              <FormHelperText error>
                {inputErrMsg.externalPortErrMsg}
              </FormHelperText>
            )}
            <CssTextField
              {...registerCommon("internalIp", {
                required: !formDatas.internalIp
                  ? "Internal IP is required"
                  : false,
              })}
              margin="normal"
              fullWidth
              id="internalIp"
              label="Internal IP"
              name="internalIp"
              onChange={(e) => {
                handleOnchange(e);
              }}
              value={formDatas.internalIp ? formDatas.internalIp : ""}
            />

            {errorsCommon.internalIp ? (
              <FormHelperText error>
                {errorsCommon.internalIp.message}
              </FormHelperText>
            ) : (
              <>
                {internalIpErr && (
                  <FormHelperText error>
                    {inputErrMsg.internalIPErrMsg}
                  </FormHelperText>
                )}
              </>
            )}

            {formDatas.natRuleInterfaceType !== "SNAT" && (
              <CssFormControl margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Application Port
                </InputLabel>
                <Select
                  inputProps={{
                    name: "applicationIds", // Use the name attribute for react-hook-form
                    id: "applicationIds",
                    ...registerCommon("applicationIds"),
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Application Port"
                  MenuProps={MenuProps}
                  name="applicationIds"
                  value={
                    formDatas.applicationIds ? formDatas.applicationIds : [""]
                  }
                  onChange={(event) => {
                    handleOnchange(event);
                    const {
                      target: { value },
                    } = event;
                    if (value.includes("")) {
                      setformDatas((prev) => ({
                        ...prev,
                        applicationIds: [""],
                      }));
                    } else {
                      setformDatas((prev) => ({
                        ...prev,
                        applicationIds: event.target.value,
                      }));
                    }
                  }}
                  multiple
                  renderValue={(selected) => {
                    if (selected == "" || selected.length === 0) {
                      return "Any";
                    } else {
                      const selectedElem = application
                        .filter((elem) => selected.includes(elem.id))
                        .map((ele) => ele.value);
                      return selectedElem.join(",");
                    }
                  }}
                >
                  <MenuItem value="">
                    <Checkbox
                      sx={{
                        color: "#6b6f82",
                        "&.Mui-checked": { color: "#6DCCDD" },
                      }}
                      checked={formDatas.applicationIds[0] == ""}
                    />
                    <ListItemText primary={"Any"} />
                  </MenuItem>
                  {application?.map((item, appIndex) => {
                    return (
                      <MenuItem
                        key={appIndex}
                        value={item.id}
                        disabled={formDatas.applicationIds[0] == ""}
                      >
                        <Checkbox
                          sx={{
                            color: "#6b6f82",
                            "&.Mui-checked": { color: "#6DCCDD" },
                          }}
                          checked={formDatas.applicationIds
                            .map((id) => parseInt(id))
                            .includes(item.id)}
                        />
                        <ListItemText primary={item.value} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </CssFormControl>
            )}

            {/* {errorsCommon.applicationIds &&
            formDatas.natRuleInterfaceType !== "SNAT" ? (
              <FormHelperText error>
                {errorsCommon.applicationIds.message}
              </FormHelperText>
            ) : (
              <>
                {inputErr && formDatas.natRuleInterfaceType !== "SNAT" && (
                  <FormHelperText error>
                    {inputErrMsg.applicationErrMsg}
                  </FormHelperText>
                )}
              </>
            )} */}
            {inputErr && formDatas.natRuleInterfaceType !== "SNAT" && (
              <FormHelperText error>
                {inputErrMsg.applicationErrMsg}
              </FormHelperText>
            )}
            {/* {applicationIdsERR.state && (
              <FormHelperText error>{applicationIdsERR.message}</FormHelperText>
            )} */}
            <InputLabel
              id="demo-simple-select-label"
              sx={{ mt: "16px", color: "#000", fontWeight: "500" }}
            >
              State
            </InputLabel>
            <Stack direction="row" spacing={1} alignItems="center" mt={"15px"}>
              <Typography>Disable</Typography>
              <AntSwitch
                {...registerCommon("state")}
                inputProps={{ "aria-label": "ant design" }}
                name="state"
                onChange={(event) => {
                  setformDatas({ ...formDatas, state: event.target.checked });
                }}
                checked={formDatas.state}
              />
              <Typography>Enable</Typography>
            </Stack>
            <Typography
              component="div"
              variant="div"
              color={"#000"}
              fontWeight="500"
              align="left"
              sx={{ pt: 2, pb: 1, fontSize: "16px", display: "flex" }}
            >
              Logging
              <Typography
                component="p"
                variant="p"
                color={"#adadad"}
                fontWeight="400"
                align="left"
                sx={{ ml: 1, fontSize: "14px", fontStyle: "italic" }}
              >
                (Logging will store your data, if you make disable the data will
                not be stored)
              </Typography>
            </Typography>
            <AntSwitch
              {...registerCommon("logging")}
              inputProps={{ "aria-label": "ant design" }}
              sx={{ mt: "8px" }}
              name="logging"
              checked={formDatas.logging ? formDatas.logging : false}
              onChange={(event) => {
                setformDatas({ ...formDatas, logging: event.target.checked });
              }}
            />
          </DialogContent>
          <DialogActions>
            <ModalButton
              disabled={isProceedLoading ? isProceedLoading : !isObjectsEqual()}
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
              type="submit"
            >
              {isProceedLoading ? (
                <Autorenew
                  className={styles.loadingBtn}
                  sx={{ color: "#fff" }}
                />
              ) : (
                <>{swiftModal === "add" ? "ADD" : "UPDATE"}</>
              )}
            </ModalButton>
            <Button onClick={ModalhandleClose} sx={{ color: "#6DCCDD" }}>
              Close
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
      {/* End Firewall Modal Popup Design Here */}
    </>
  );
}

export default NatDataTable;
