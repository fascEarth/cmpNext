// ** React Imports
import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Script from "next/script";
import $ from "jquery";
import SurfaceLayout from "../../../../../../components/layouts/surface/Layout";
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
import NetworkDataTable from "../../../../../../components/pages/surface/clouds/elasticins/manage/detail/collectTable";

// ** MUI ICON Components
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import SettingsPowerOutlinedIcon from "@mui/icons-material/SettingsPowerOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import InsertPageBreakOutlinedIcon from "@mui/icons-material/InsertPageBreakOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import HideSourceOutlinedIcon from "@mui/icons-material/HideSourceOutlined";

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";

// ** Custom CSS
import styles from "./index.module.css";
import MinstanceDetailOverview from "../../../../../../components/pages/surface/clouds/elasticins/manage/detail/overview";
import MinstanceDetailUsageGraphs from "../../../../../../components/pages/surface/clouds/elasticins/manage/detail/usageGraphs";
import MinstanceDetailStorages from "../../../../../../components/pages/surface/clouds/elasticins/manage/detail/storages";

import MinstanceDetailSnapShot from "../../../../../../components/pages/surface/clouds/elasticins/manage/detail/snapshot";

import CopyToClipboard from "react-copy-to-clipboard";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingIndicator from "../../../../../../components/tools/loader";
import { useClientIP } from "../../../../../../utils/context/ClientIPContext";
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

function MinstanceDetail() {
  const { clientIP } = useClientIP();
  const [vminstanceName, setvminstanceName] = useState("-");
  // useEffect(() => {
  //   // Code that should run after the component has rendered
  // }, []);

  /*
  const wmksInstance = new WMKS.createWMKS({
  element: document.getElementById('wmks-container'), // Provide the container element
  // Other configuration options
});*/

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
    setIsLoading(true);
    // Disconnect the WebSocket if it exists
    if (wmks) {
      wmks.disconnect();
    }
    setvmOpen(false);
  };

  // ** Additional NIC Modal Popup Function
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [roleName, setRoleName] = useState();
  const [scachdata, setscachdata] = useState([]);
  const cookies = Cookies.get("userData");
  const router = useRouter();
  // const { cid } = router.query;
  const slugId = router.query.slug;

  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : false;

    if ((cachData, slugId)) {
      setRoleName(cachData.role_name);
      setscachdata(cachData);

      fetchData(cachData);
      commonSelectData(cachData);
      // setTimeout(() => {

      //}, 500);
    }
  }, [slugId, cookies]);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setScopied(false);
    // Optionally, you can add additional logic or UI feedback here.
  };

  const [scopied, setScopied] = useState(false);

  const handleCopyssh = () => {
    setScopied(true);
    setCopied(false);
    // Optionally, you can add additional logic or UI feedback here.
  };

  const [enabledInfoTop, setenabledInfoTop] = useState(false);
  const [topCardThings, settopCardThings] = useState({});
  const [comisSelectDisabled, setcomisSelectDisabled] = useState(false);
  const [comisSelectAllowNic, setcomisSelectAllowNic] = useState(false);
  const [comisSelectAllowcAction, setcomisSelectAllowcAction] = useState(false);
  const [comisSelectAllowcStorage, setcomisSelectAllowcStorage] =
    useState(false);

  const [restrictActions, setrestrictActions] = useState(true);
  const [initialLoadC, setinitialLoadC] = useState(true);
  const fetchData = async (tdata) => {
    const newData = {
      tenantvmid: slugId,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getDefaultInfo",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/detail",
        finalData
      ); // call the new API route
      if (data.status === "ok") {
        setvminstanceName(data.message.hostname);
        settopCardThings(data.message);

        if (data.message.powerStatus === 0) {
          setrestrictActions(true);
        } else {
          setrestrictActions(false);
        }

        if (data.message.currentstate === 7001) {
          setrestrictActions(true);
        }

        const isSelectDisabled =
          data.message.powerStatus === 0 ||
          data.message.currentstate === 7001 ||
          (tdata.role_name !== "owner" &&
            tdata.role_name !== "administrator" &&
            tdata.role_name !== "manager");
        setcomisSelectDisabled(isSelectDisabled);

        const isSelectAllowNic =
          data.message.powerStatus === 1 &&
          data.message.currentstate === 7000 &&
          (tdata.role_name === "owner" ||
            tdata.role_name === "administrator" ||
            tdata.role_name === "manager");
        setcomisSelectAllowNic(isSelectAllowNic);

        const isSelectAllowStorage =
          data.message.currentstate === 7000 &&
          data.message.currentstate !== 7001 &&
          (tdata.role_name === "owner" ||
            tdata.role_name === "administrator" ||
            tdata.role_name === "manager");
        setcomisSelectAllowcStorage(isSelectAllowStorage);
        const isSelectAllowComAction =
          data.message.currentstate === 7000 &&
          data.message.currentstate !== 7001 &&
          data.message.powerStatus !== 2 &&
          (tdata.role_name === "owner" ||
            tdata.role_name === "administrator" ||
            tdata.role_name === "manager");
        setcomisSelectAllowcAction(isSelectAllowComAction);

        setenabledInfoTop(true);

        const shouldFetchData =
          (data.message.powerStatus === 0 &&
            data.message.currentstate === 7001) ||
          data.message.currentstate === 7001 ||
          (data.message.powerStatus === 0 &&
            data.message.currentstate !== 7008);
        if (shouldFetchData) {
          // Fetch data every 40 seconds
          const timeoutId = setTimeout(() => {
            fetchData(tdata);
          }, 40000);

          // Cleanup function to clear the timeout when the component unmounts
          return () => clearTimeout(timeoutId);
        }
        if (initialLoadC) {
          setinitialLoadC(false);
        }
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  useEffect(() => {
    if (!restrictActions && topCardThings.powerStatus === 2) {
      callthisjquery(scachdata);
    }
  }, [restrictActions, topCardThings]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchTicket = async (tdata) => {
    const pdata = {
      tenant_id: tdata.tenant_id,
      tenant_vm_id: slugId,
    };
    const newData = {
      data: pdata,
      tenantvmid: slugId,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getConnTicket",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/detail",
        finalData
      ); // call the new API route
      if (data.web_session) {
        return data.web_session;
      }
    } catch (error) {
      return null;
      // toast.error('An error occurred');
    }
  };
  let wmks;
  const callthisjquery = async (tdata) => {
    $(function () {
      // Get the button by its id
      const vmconsoleBtn = document.getElementById("vmconsoleBtn");

      if (vmconsoleBtn) {
        // Add a click event listener to the button
        vmconsoleBtn.addEventListener("click", async function () {
          // Trigger your wms library code here when the button is clicked
          // For example:
          // alert('Button clicked!'); // Replace with your library code
          // vmhandleClickOpen();

          try {
            // Fetch the connection ticket asynchronously
            const connectionTicket = await fetchTicket(tdata);
            // return;
            if (connectionTicket) {
              var rescale = true;
              var changeResolution = true;

              var options = {
                //retryConnectionInterval: 2000,
                rescale: rescale,
                changeResolution: changeResolution,
                position: WMKS.CONST.Position.LEFT_TOP,
                useVNCHandshake: true,
              };

              var wmksContainerElement =
                document.getElementById("wmksContainer");

              if (wmksContainerElement) {
                wmks = WMKS.createWMKS("wmksContainer", options);

                wmks.register(
                  WMKS.CONST.Events.CONNECTION_STATE_CHANGE,
                  function (event, data) {
                    if (data.state === WMKS.CONST.ConnectionState.CONNECTED) {
                      setIsLoading(false);
                    }
                  }
                );

                wmks.connect(
                  "wss://detacloud-ruh.detasad.com:443/443;" + connectionTicket
                );
              }
              // Toggle full-screen mode when the "FULL SCREEN" button is clicked
              const fullscreenButton =
                document.getElementById("fullscreenButton");
              if (fullscreenButton) {
                fullscreenButton.addEventListener("click", function () {
                  wmks.enterFullScreen();
                });
              }

              const sendCadBtn = document.getElementById("sendCadBtn");
              if (sendCadBtn) {
                sendCadBtn.addEventListener("click", function () {
                  wmks.sendCAD();
                });
              }
            }
          } catch (error) {
            console.error("Error fetching connection ticket:", error);
          }
        });
      } else {
        console.error('Button with id "vmconsoleBtn" not found.');
      }
    });
  };

  const [selectedInfoC, setselectedInfoC] = useState([]);
  const commonSelectData = async (tdata) => {
    const newData = {
      tenantvmid: slugId,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getCommonSelectInfo",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/detail",
        finalData
      ); // call the new API route
      if (data.data.length > 0) {
        setselectedInfoC(data.data);
        //settopCardThings(data.message);
        //setenabledInfoTop(true);

        //callthisjquery(tdata);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    //setSelectedNetworkId(selectedId);

    // Perform navigation to another page with selectedId
    router.push(`/surface/clouds/elasticins/manage/detail/${selectedId}`);
  };

  const [commonDialAddress, setcommonDialAddress] = useState("Alert");
  const [commonDialContantAlert, setcommonDialContantAlert] = useState("Alert");

  const [commonDialTitle, setcommonDialTitle] = useState("Alert");
  const [commonDialContent, setcommonDialContent] = useState(
    "Are you sure you want?"
  );
  const [commonDialCancelBtn, setcommonDialCancelBtn] = useState("Cancel");
  const [commonDialSubmitBtn, setcommonDialSubmitBtn] = useState("submit");

  const [commonActionPreState, setcommonActionPreState] = useState("");
  const [commonActionState, setcommonActionState] = useState("");
  const [commonActionTenantId, setcommonActionTenantId] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = (
    address,
    title,
    content,
    contentAlert,
    cancelBtn,
    submitBtn,
    state,
    prestate,
    tenant_vm_id
  ) => {
    setcommonActionPreState(prestate);
    setcommonActionState(state);
    setcommonActionTenantId(tenant_vm_id);

    setcommonDialTitle(title);
    setcommonDialAddress(address);
    setcommonDialContantAlert(contentAlert);
    setcommonDialContent(content);
    setcommonDialCancelBtn(cancelBtn);
    setcommonDialSubmitBtn(submitBtn);

    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedValue(13);
    setDialogOpen(false);
  };
  const [selectedValue, setSelectedValue] = useState(13);

  const [isSnapshotDisabled, setisSnapshotDisabled] = useState(false);
  const [isStorageActionDisaled, setisStorageActionDisabled] = useState(false);
  const [isNicActionDisabled, setisNicActionDisabled] = useState(false);
  const storageInProcess = Cookies.get("storageInProcess");
  const nicInProcess = Cookies.get("nicInProcess");
  const snapshotInProcess = Cookies.get("snapshotInProcess");
  console.log(
    [
      { Snap: isSnapshotDisabled, cookie: snapshotInProcess },
      { Storage: isStorageActionDisaled, cookie: storageInProcess },
      { Nic: isNicActionDisabled, cookie: nicInProcess },
    ],

    "TEST"
  );

  const getProcessStatus = () => {
    const storageInProcess = Cookies.get("storageInProcess");
    const nicInProcess = Cookies.get("nicInProcess");
    const snapshotInProcess = Cookies.get("snapshotInProcess");

    if (storageInProcess && JSON.parse(storageInProcess) == true) {
      setisStorageActionDisabled(true);
    } else if (nicInProcess && JSON.parse(nicInProcess) == true) {
      setisNicActionDisabled(true);
    } else if (snapshotInProcess && JSON.parse(snapshotInProcess) == true) {
      setisSnapshotDisabled(true);
    } else {
      setisStorageActionDisabled(false);
      setisNicActionDisabled(false);
      setisSnapshotDisabled(false);
    }
  };

  useEffect(() => {
    getProcessStatus();
  }, []);
  useEffect(() => {
    getProcessStatus();
  }, [
    isNicActionDisabled,
    isStorageActionDisaled,
    isSnapshotDisabled,
    snapshotInProcess,
    storageInProcess,
    nicInProcess,
    router.pathname,
  ]);

  const handleSelectChangeAn = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = () => {
    const pdata = {
      prestate: commonActionPreState,
      state: commonActionState,
      tenantvmid: commonActionTenantId,
    };
    updateData(pdata);
    //fetchData(tdata);
    // Your logic or actions when the user submits
    //handleCloseDialog();
  };

  const updateData = async (pdata) => {
    const newData = {
      action: pdata.state,
      tenantid: scachdata.tenant_id,
      tenantvmid: pdata.tenantvmid,
      userSerialId: scachdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "updatevminfo",
      token: scachdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/list",
        finalData
      ); // call the new API route

      if (data.status_code == 9000) {
        if (commonActionState != "delete") {
          toast.success("VM status has been updated successfully!");

          fetchData(scachdata);
        } else if (commonActionState === "delete") {
          toast.success("VM has been deleted successfully!");
          router.replace(`/surface/clouds/elasticins/manage/list/`);
        }
      } else if (data.status_code == 9005) {
        toast.warning("Please Wait. NIC is in processing");

        fetchData(scachdata);
      } else if (data.status === "ok") {
        if (commonActionState === "delete") {
          toast.success("VM has been deleted successfully!");
          router.replace(`/surface/clouds/elasticins/manage/list/`);
        }
        // toast.success("VM has been deleted successfully!");

        /* setTimeout(() => {
          fetchData(scachdata);
        }, 500);*/
      }
      setSelectedValue(13);
      handleCloseDialog();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <SurfaceLayout currentPage={0} setBackgrd={true}>
      {/* Start Breadcrumbs Here */}
      <Breadcrumbs aria-label="breadcrumb">
        <Box sx={{ display: "flex" }}>
          <Link href={"/surface/clouds/elasticins/manage/list"}>
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
                value={slugId ? slugId : ""} // Set the selected value
                onChange={handleSelectChange} // Handle onChange event
                defaultValue=""
                id="grouped-select"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                MenuProps={MenuProps}
              >
                <MenuItem value={""} disabled>
                  Select Any
                </MenuItem>

                {selectedInfoC &&
                  selectedInfoC.map((elem) => (
                    <MenuItem key={elem.tenant_vm_id} value={elem.tenant_vm_id}>
                      {elem.host_name}
                    </MenuItem>
                  ))}
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

      {/* Start Top Card design Here */}
      {enabledInfoTop && topCardThings && (
        <Card sx={{ mt: 2, borderRadius: "7px" }}>
          <CardHeader
            sx={{ borderBottom: "1px solid #ccc", padding: "10px 16px" }}
            title={
              <Grid
                sx={{ mt: "0px", borderRadius: "7px" }}
                container
                direction="row"
                rowSpacing={2}
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={7}
                  xl={7}
                  sx={{ paddingTop: "0!important" }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Box
                      component="img"
                      width={35}
                      height={35}
                      align="center"
                      alt="ubundu"
                      src={
                        "/images/pages/surface/clouds/elasticins/manage/detail/OSImages/" +
                        topCardThings.osLogoName
                      }
                    />
                    <Typography
                      component="h4"
                      variant="h5"
                      align="left"
                      fontSize={18}
                      sx={{
                        color: "#015578",
                        fontWeight: "500",
                        marginTop: "8px",
                        marginLeft: "10px",
                      }}
                    >
                      {topCardThings.hostname ? topCardThings.hostname : "-"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={5}
                  xl={5}
                  sx={{ paddingTop: "0!important" }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <Grid item xs={6} sm={4} md={4} lg={4} xl={4}>
                      <Box
                        sx={{ display: "flex", justifyContent: "end" }}
                        className={styles.HeaderStatus}
                      >
                        {topCardThings.powerStatus === 0 &&
                          topCardThings.currentstate !== 7001 && (
                            <FiberManualRecordIcon
                              // color={"#015578"}
                              sx={{
                                color: "#0288d1",
                                width: "20px",
                                height: "20px",
                                mt: "7px",
                              }}
                            />
                          )}
                        {topCardThings.powerStatus === 1 &&
                          topCardThings.currentstate !== 7001 && (
                            <FiberManualRecordIcon
                              color="error" // Apply "error" color when powerStatus is 1
                              sx={{ width: "20px", height: "20px", mt: "7px" }}
                            />
                          )}
                        {topCardThings.powerStatus === 2 &&
                          topCardThings.currentstate !== 7001 && (
                            <FiberManualRecordIcon
                              color="success" // Apply "success" color when powerStatus is 2
                              sx={{ width: "20px", height: "20px", mt: "7px" }}
                            />
                          )}

                        {topCardThings.powerStatus === 3 &&
                          topCardThings.currentstate !== 7001 && (
                            <FiberManualRecordIcon
                              color="error" // Apply "success" color when powerStatus is 2
                              sx={{ width: "20px", height: "20px", mt: "7px" }}
                            />
                          )}

                        {topCardThings.powerStatus === 4 &&
                          topCardThings.currentstate !== 7001 && (
                            <FiberManualRecordIcon
                              color="warning" // Apply "success" color when powerStatus is 2
                              sx={{ width: "20px", height: "20px", mt: "7px" }}
                            />
                          )}

                        {topCardThings.powerStatus === 5 &&
                          topCardThings.currentstate !== 7001 && (
                            <FiberManualRecordIcon
                              // color="neutral" // Apply "success" color when powerStatus is 2
                              sx={{
                                color: "#808080",
                                width: "20px",
                                height: "20px",
                                mt: "7px",
                              }}
                            />
                          )}
                        {topCardThings.currentstate === 7001 && (
                          <FiberManualRecordIcon
                            color="info" // Apply "success" color when powerStatus is 2
                            sx={{ width: "20px", height: "20px", mt: "7px" }}
                          />
                        )}

                        <Typography
                          component="h4"
                          variant="h5"
                          align="left"
                          fontSize={14}
                          sx={{
                            fontWeight: "500",
                            marginTop: "8px",
                            marginLeft: "5px",
                            color:
                              topCardThings.powerStatus === 1 &&
                              topCardThings.currentstate !== 7001
                                ? "#f44336" // Red for "Powered OFF"
                                : topCardThings.powerStatus === 2 &&
                                  topCardThings.currentstate !== 7001
                                ? "#4caf50" // Green for "Powered ON"
                                : topCardThings.powerStatus === 3 &&
                                  topCardThings.currentstate !== 7001
                                ? "#f44336" // Red for "Shutdown OS"
                                : topCardThings.powerStatus === 4 &&
                                  topCardThings.currentstate !== 7001
                                ? "#ff9800" // Orange for "Power Reset"
                                : topCardThings.powerStatus === 5 &&
                                  topCardThings.currentstate !== 7001
                                ? "#9e9e9e" // Gray for "Suspend"
                                : topCardThings.currentstate === 7001
                                ? "#0288d1"
                                : "#0288d1", // Default color for "Provisioning"
                          }}
                        >
                          {topCardThings.currentstate === 7001 &&
                            (topCardThings.currentmsg.includes("provisioning")
                              ? "Provisioning Please Wait..."
                              : topCardThings.currentmsg.includes("Resetting")
                              ? "Vm is being reset, please wait"
                              : topCardThings.currentmsg + " please wait...")}
                          {topCardThings.currentstate !== 7001 &&
                            (topCardThings.powerStatus === 1
                              ? "Powered OFF"
                              : topCardThings.powerStatus === 2
                              ? "Powered ON"
                              : topCardThings.powerStatus === 3
                              ? "Shutdown OS"
                              : topCardThings.powerStatus === 4
                              ? "Power Reset"
                              : topCardThings.powerStatus === 5
                              ? "Suspend"
                              : "Provisioning")}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={4} lg={3} xl={3}>
                      <Box
                        sx={{ display: "flex", justifyContent: "end" }}
                        className={styles.HeaderStatus}
                      >
                        <Box
                          component="img"
                          width={25}
                          height={25}
                          align="center"
                          alt="riyadh"
                          sx={{ mt: "5px" }}
                          src={
                            "/images/pages/surface/clouds/elasticins/manage/detail/common/" +
                            topCardThings.dataCenter.toLowerCase() +
                            ".png"
                          }
                        />
                        <Typography
                          component="h4"
                          variant="h5"
                          align="left"
                          fontSize={14}
                          sx={{
                            color: "#015578",
                            fontWeight: "500",
                            marginTop: "8px",
                            marginLeft: "10px",
                          }}
                        >
                          {topCardThings.dataCenter
                            ? topCardThings.dataCenter
                            : "-"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                      {!restrictActions && topCardThings.powerStatus === 2 ? (
                        <Box
                          id="vmconsoleBtn"
                          sx={{
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "end",
                          }}
                          onClick={() => {
                            if (
                              (topCardThings.currentstate == 7000 &&
                                topCardThings.powerStatus == 5) ||
                              (topCardThings.currentstate == 7000 &&
                                topCardThings.powerStatus == 1) ||
                              (topCardThings.currentstate == 7001 &&
                                topCardThings.powerStatus == 5) ||
                              (topCardThings.currentstate == 7001 &&
                                topCardThings.powerStatus == 2) ||
                              (topCardThings.currentstate == 7001 &&
                                topCardThings.powerStatus == 1)
                            ) {
                              null;
                            } else {
                              vmhandleClickOpen();
                            }
                          }}
                          className={styles.HeaderStatus}
                        >
                          <Box
                            component="img"
                            width={25}
                            height={25}
                            align="center"
                            alt="duplicated"
                            sx={{ cursor: "pointer", mt: "5px" }}
                            src="/images/pages/surface/clouds/elasticins/manage/detail/common/duplicated.png"
                          />
                          <Typography
                            component="h4"
                            variant="h5"
                            align="left"
                            fontSize={14}
                            sx={{
                              cursor: "pointer",
                              color: "#015578",
                              fontWeight: "500",
                              marginTop: "8px",
                              marginLeft: "10px",
                            }}
                          >
                            VM Console
                          </Typography>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            cursor: "not-allowed",
                            display: "flex",
                            justifyContent: "end",
                          }}
                          className={styles.HeaderStatus}
                        >
                          <Box
                            component="img"
                            width={25}
                            height={25}
                            align="center"
                            alt="duplicated"
                            sx={{ cursor: "not-allowed", mt: "5px" }}
                            src="/images/pages/surface/clouds/elasticins/manage/detail/common/duplicated.png"
                          />
                          <Typography
                            component="h4"
                            variant="h5"
                            align="left"
                            fontSize={14}
                            sx={{
                              cursor: "not-allowed",
                              color: "#015578",
                              fontWeight: "500",
                              marginTop: "8px",
                              marginLeft: "10px",
                            }}
                          >
                            VM Console
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            }
          />

          {/* Start Here VM Console Modal  */}
          <BootstrapDialog
            onClose={vmhandleClose}
            aria-labelledby="customized-dialog-title"
            open={vmopen}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              align="left"
              onClose={vmhandleClose}
              sx={{ padding: "10px 16px" }}
            >
              {vminstanceName}
              <Button
                id="sendCadBtn"
                size="small"
                variant="solid"
                sx={{
                  color: "#fff",
                  backgroundImage:
                    "linear-gradient(45deg, #0288d1, #26c6da) !important",
                  position: "absolute",
                  right: "182px",
                  top: "13px",
                  padding: "2px 10px",
                }}
              >
                CTRL+ALT+DEL
              </Button>
              <Button
                id="fullscreenButton"
                size="small"
                variant="solid"
                sx={{
                  color: "#fff",
                  backgroundImage:
                    "linear-gradient(45deg, #0288d1, #26c6da) !important",
                  position: "absolute",
                  right: "55px",
                  top: "13px",
                  padding: "2px 10px",
                }}
              >
                FULL SCREEN
              </Button>
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <div
                id="wmksContainer"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "calc(100vh - 150px)",
                }}
              >
                <LoadingIndicator isLoading={isLoading} />
                {/* WMKS content */}
              </div>
            </DialogContent>
          </BootstrapDialog>
          {/* End Here VM Console Modal  */}
          <CardContent sx={{ padding: "24px" }}>
            <Grid
              sx={{ mt: "0px", borderRadius: "7px" }}
              container
              direction="row"
              rowSpacing={2}
              spacing={3}
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={4}
                sx={{ paddingTop: "0!important" }}
              >
                <TableContainer>
                  <Table size="small" aria-label="a dense table">
                    <TableBody>
                      <TableRow key={topCardThings.createDatetime}>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            padding: "6px 0px",
                            borderBottom: "0",
                            color: "#015578",
                            fontWeight: "500",
                          }}
                        >
                          Created On (UTC)
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            borderBottom: "0",
                            color: "#000",
                            fontWeight: "400",
                          }}
                        >
                          {topCardThings.createDatetime}
                        </TableCell>
                      </TableRow>

                      <TableRow key={topCardThings.userName}>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            padding: "6px 0px",
                            borderBottom: "0",
                            color: "#015578",
                            fontWeight: "500",
                          }}
                        >
                          Created By
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            borderBottom: "0",
                            color: "#000",
                            fontWeight: "400",
                          }}
                        >
                          {topCardThings.userName}
                        </TableCell>
                      </TableRow>

                      <TableRow key={topCardThings.teams}>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            padding: "6px 0px",
                            borderBottom: "0",
                            color: "#015578",
                            fontWeight: "500",
                          }}
                        >
                          Team{" "}
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            borderBottom: "0",
                            color: "#000",
                            fontWeight: "400",
                          }}
                        >
                          {topCardThings.teams}
                        </TableCell>
                      </TableRow>

                      <TableRow key={topCardThings.osDetails}>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            padding: "6px 0px",
                            borderBottom: "0",
                            color: "#015578",
                            fontWeight: "500",
                          }}
                        >
                          OS{" "}
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            borderBottom: "0",
                            color: "#000",
                            fontWeight: "400",
                          }}
                        >
                          {topCardThings.osDetails}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={3}
                xl={3}
                sx={{ paddingTop: "0!important" }}
              >
                <Typography
                  component="h4"
                  variant="h5"
                  align="left"
                  fontSize={16}
                >
                  Tags
                </Typography>
                <Box className={styles.TopCardTags}>
                  {topCardThings.tags &&
                    topCardThings.tags.split(",").map((tag, index) => (
                      <Box key={index} mt={1}>
                        <Chip
                          size="small"
                          label={tag.trim()}
                          className={styles.TagChip}
                        />
                      </Box>
                    ))}
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={5}
                xl={5}
                sx={{ paddingTop: "0!important" }}
              >
                <Grid
                  sx={{ mt: "8px", borderRadius: "7px" }}
                  container
                  direction="row"
                  rowSpacing={2}
                  spacing={3}
                >
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={3}
                    lg={3}
                    xl={3}
                    sx={{ paddingTop: "0!important" }}
                    align="center"
                  >
                    <Box
                      component="img"
                      width={50}
                      height={50}
                      align="center"
                      alt="processor"
                      src="/images/pages/surface/clouds/elasticins/manage/detail/networkimg/processor.png"
                    />
                    <Typography
                      component="h4"
                      variant="h5"
                      align="center"
                      fontSize={14}
                      mt={1}
                    >
                      vCPU
                    </Typography>
                    <Typography
                      component="h4"
                      variant="h5"
                      align="center"
                      fontSize={26}
                      mt={1}
                    >
                      {topCardThings.specification
                        ? topCardThings.specification.split("vCPU")[0]
                        : "-"}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={3}
                    lg={3}
                    xl={3}
                    sx={{ paddingTop: "0!important" }}
                    align="center"
                  >
                    <Box
                      component="img"
                      width={50}
                      height={50}
                      align="center"
                      alt="storage"
                      src="/images/pages/surface/clouds/elasticins/manage/detail/networkimg/storage.png"
                    />
                    <Typography
                      component="h4"
                      variant="h5"
                      align="center"
                      fontSize={14}
                      mt={1}
                    >
                      Storage
                    </Typography>
                    <Typography
                      component="h4"
                      variant="h5"
                      align="center"
                      fontSize={26}
                      mt={1}
                    >
                      {topCardThings.specification
                        ? topCardThings.specification
                            .split("/")[2]
                            .split("G")[0]
                        : "-"}

                      <Box component="span" sx={{ fontSize: "16px" }}>
                        GB
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={3}
                    lg={3}
                    xl={3}
                    sx={{ paddingTop: "0!important" }}
                    align="center"
                  >
                    <Box
                      component="img"
                      width={50}
                      height={50}
                      align="center"
                      alt="memory"
                      src="/images/pages/surface/clouds/elasticins/manage/detail/networkimg/memory.png"
                    />
                    <Typography
                      component="h4"
                      variant="h5"
                      align="center"
                      fontSize={14}
                      mt={1}
                    >
                      Memory
                    </Typography>
                    <Typography
                      component="h4"
                      variant="h5"
                      align="center"
                      fontSize={26}
                      mt={1}
                    >
                      {topCardThings.specification
                        ? topCardThings.specification
                            .split("/")[1]
                            .split("GB")[0]
                        : "-"}

                      <Box component="span" sx={{ fontSize: "16px" }}>
                        GB
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={3}
                    lg={3}
                    xl={3}
                    sx={{ paddingTop: "0!important" }}
                    align="center"
                  >
                    <Box
                      component="img"
                      width={50}
                      height={50}
                      align="center"
                      alt="GlobalNetwork"
                      src="/images/pages/surface/clouds/elasticins/manage/detail/networkimg/GlobalNetwork.png"
                    />
                    <Typography
                      component="h4"
                      variant="h5"
                      align="center"
                      fontSize={14}
                      mt={1}
                    >
                      Network
                    </Typography>
                    <Box className={styles.NetworkIcon}>
                      <Box
                        component="img"
                        width={20}
                        height={20}
                        mt={2}
                        align="center"
                        alt="information"
                        src="/images/pages/surface/clouds/elasticins/manage/detail/networkimg/information.png"
                      />
                      <Card
                        sx={{ mt: 2, borderRadius: "7px" }}
                        variant="outlined"
                        className={styles.NetworkInfoIcon}
                      >
                        <CardContent sx={{ padding: "10px !important" }}>
                          <Box sx={{ display: "flex" }}>
                            <div>
                              <Box display={"flex"}>
                                <Typography
                                  component="h4"
                                  variant="h5"
                                  align="left"
                                  fontSize={14}
                                  color="#6C6C6C"
                                >
                                  Private IP :
                                </Typography>
                                <Typography
                                  component="h4"
                                  variant="h5"
                                  align="left"
                                  fontSize={14}
                                  ml={1}
                                  fontWeight={500}
                                >
                                  {topCardThings.privateIp
                                    ? topCardThings.privateIp
                                    : "-"}
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", mr: "5px" }}>
                                <Typography
                                  component="h4"
                                  variant="h5"
                                  align="left"
                                  fontSize={14}
                                  color="#6C6C6C"
                                >
                                  Public IP :
                                </Typography>
                                <Typography
                                  component="h4"
                                  variant="h5"
                                  align="left"
                                  fontSize={14}
                                  ml={1}
                                  fontWeight={500}
                                >
                                  {topCardThings.publicIp
                                    ? topCardThings.publicIp
                                    : "-"}
                                </Typography>
                              </Box>
                            </div>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions
            sx={{ borderTop: "1px solid #ccc", padding: "10px 16px" }}
          >
            <Grid
              sx={{ mt: "0px", borderRadius: "7px" }}
              container
              direction="row"
              rowSpacing={2}
              spacing={3}
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={5}
                xl={5}
                sx={{ paddingTop: "0!important" }}
              >
                <Box sx={{ display: "flex" }} className={styles.ipContainer}>
                  <Typography
                    component="h4"
                    variant="h5"
                    align="left"
                    fontSize={14}
                    color="#6C6C6C"
                    sx={{ width: "85px", mt: "12px" }}
                  >
                    IP Address :
                  </Typography>
                  <CopyToClipboard
                    text={topCardThings.ipAddress}
                    onCopy={() => handleCopy()}
                  >
                    <Tooltip
                      title={copied ? "Copied" : "Copy to clipboard"}
                      placement="bottom"
                    >
                      <Typography
                        component="span"
                        align="left"
                        className={styles.IpAddress}
                      >
                        {topCardThings.ipAddress
                          ? topCardThings.ipAddress
                          : "-"}
                        <ContentCopyOutlinedIcon
                          className={styles.CopyClipBoard}
                        />
                      </Typography>
                    </Tooltip>
                  </CopyToClipboard>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={5}
                xl={5}
                sx={{ paddingTop: "0!important" }}
              >
                <Box sx={{ display: "flex" }} className={styles.ipContainer}>
                  <Typography
                    component="h4"
                    variant="h5"
                    align="left"
                    fontSize={14}
                    color="#6C6C6C"
                    sx={{ width: "85px", mt: "12px" }}
                  >
                    SSH Cmd :
                  </Typography>
                  <CopyToClipboard
                    text={"ssh root@" + topCardThings.ipAddress}
                    onCopy={() => handleCopyssh()}
                  >
                    <Tooltip
                      title={scopied ? "Copied" : "Copy to clipboard"}
                      placement="bottom"
                    >
                      <Typography
                        component="span"
                        align="left"
                        className={styles.IpAddress}
                      >
                        {topCardThings.ipAddress
                          ? "ssh root@" + topCardThings.ipAddress
                          : "ssh root@ -"}{" "}
                        <ContentCopyOutlinedIcon
                          className={styles.CopyClipBoard}
                        />
                      </Typography>
                    </Tooltip>
                  </CopyToClipboard>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={2}
                xl={2}
                sx={{
                  cursor:
                    (comisSelectDisabled && restrictActions) ||
                    isSnapshotDisabled ||
                    isNicActionDisabled ||
                    isStorageActionDisaled
                      ? "not-allowed"
                      : "pointer",
                  paddingTop: "0!important",
                }}
              >
                <Box sx={{ display: "flex" }} alignItems="center">
                  <Box
                    sx={{
                      cursor:
                        (comisSelectDisabled && restrictActions) ||
                        isSnapshotDisabled ||
                        isNicActionDisabled ||
                        isStorageActionDisaled
                          ? "not-allowed"
                          : "pointer",
                    }}
                    component="img"
                    width={25}
                    height={25}
                    align="center"
                    alt="action"
                    src="/images/pages/surface/clouds/elasticins/manage/detail/common/action.png"
                  />
                  <CssFormControl
                    sx={{
                      cursor:
                        (comisSelectDisabled && restrictActions) ||
                        isSnapshotDisabled ||
                        isNicActionDisabled ||
                        isStorageActionDisaled
                          ? "not-allowed"
                          : "pointer",
                    }}
                    fullWidth
                    size="small"
                  >
                    <Select
                      disabled={
                        (comisSelectDisabled && restrictActions) ||
                        isSnapshotDisabled ||
                        isNicActionDisabled ||
                        isStorageActionDisaled
                      }
                      sx={{
                        "& .MuiSelect-select": {
                          cursor:
                            (comisSelectDisabled && restrictActions) ||
                            isSnapshotDisabled ||
                            isNicActionDisabled ||
                            isStorageActionDisaled
                              ? "not-allowed !important"
                              : "pointer !important",
                        },
                      }}
                      value={selectedValue}
                      onChange={handleSelectChangeAn}
                      id="grouped-select"
                      displayEmpty
                      inputProps={{
                        "aria-label": "Without label",
                        style:
                          comisSelectDisabled && restrictActions
                            ? { cursor: "not-allowed" }
                            : {}, // Apply cursor style conditionally
                      }}
                      MenuProps={MenuProps}
                    >
                      <MenuItem disabled value={13}>
                        Action
                      </MenuItem>

                      {topCardThings.powerStatus === 1 ||
                      topCardThings.powerStatus === 3 ||
                      topCardThings.powerStatus === 4 ||
                      topCardThings.powerStatus === 5 ? (
                        <MenuItem
                          value={1}
                          onClick={() =>
                            handleOpenDialog(
                              topCardThings.hostname,
                              "Power On Server ?",
                              "Elastic Instance :",
                              "Are you sure you want to Power On server?",
                              "CANCEL",
                              "POWER ON",
                              "power_on",
                              "2",
                              topCardThings.tenantVmId
                            )
                          }
                        >
                          <PowerSettingsNewOutlinedIcon
                            sx={{ mr: 2, fontSize: "18px" }}
                          />{" "}
                          Power On
                        </MenuItem>
                      ) : null}
                      {topCardThings.powerStatus === 2 ? (
                        <MenuItem
                          value={2}
                          onClick={() =>
                            handleOpenDialog(
                              topCardThings.hostname,
                              "Power Off Server ?",
                              "Elastic Instance :",
                              "Are you sure you want to Power Off server?",
                              "CANCEL",
                              "POWER OFF",
                              "power_off",
                              "1",
                              topCardThings.tenantVmId
                            )
                          }
                        >
                          <SettingsPowerOutlinedIcon
                            sx={{ mr: 2, fontSize: "18px" }}
                          />{" "}
                          Power Off
                        </MenuItem>
                      ) : null}
                      {topCardThings.powerStatus === 2 ? (
                        <MenuItem
                          value={3}
                          onClick={() =>
                            handleOpenDialog(
                              topCardThings.hostname,
                              "Suspend Server ?",
                              "Elastic Instance :",
                              "Are you sure you want to Suspend server?",
                              "CANCEL",
                              "SUSPEND",
                              "suspend",
                              "5",
                              topCardThings.tenantVmId
                            )
                          }
                        >
                          <InsertPageBreakOutlinedIcon
                            sx={{ mr: 2, fontSize: "18px" }}
                          />{" "}
                          Suspend
                        </MenuItem>
                      ) : null}
                      {topCardThings.powerStatus === 2 ? (
                        <MenuItem
                          value={4}
                          onClick={() =>
                            handleOpenDialog(
                              topCardThings.hostname,
                              "Reset Server ?",
                              "Elastic Instance :",
                              "Are you sure you want to Reset server?",
                              "CANCEL",
                              "RESET",
                              "reset",
                              "4",
                              topCardThings.tenantVmId
                            )
                          }
                        >
                          <RestartAltOutlinedIcon
                            sx={{ mr: 2, fontSize: "18px" }}
                          />{" "}
                          Reset
                        </MenuItem>
                      ) : null}
                      {topCardThings.powerStatus === 2 ? (
                        <MenuItem
                          value={5}
                          onClick={() =>
                            handleOpenDialog(
                              topCardThings.hostname,
                              "Shutdown OS Server ?",
                              "Elastic Instance :",
                              "Are you sure you want to Shutdown OS server?",
                              "CANCEL",
                              "SHUTDOWN",
                              "shutdown",
                              "3",
                              topCardThings.tenantVmId
                            )
                          }
                        >
                          <HideSourceOutlinedIcon
                            sx={{ mr: 2, fontSize: "18px" }}
                          />{" "}
                          Shutdown OS
                        </MenuItem>
                      ) : null}

                      {topCardThings.powerStatus === 1 ? (
                        <MenuItem
                          value={6}
                          onClick={() =>
                            handleOpenDialog(
                              topCardThings.hostname,
                              "Delete Server ?",
                              "Elastic Instance :",
                              "Are you sure you want to Delete server?",
                              "CANCEL",
                              "DELETE",
                              "delete",
                              "6",
                              topCardThings.tenantVmId
                            )
                          }
                        >
                          <DeleteOutlineOutlinedIcon
                            sx={{ mr: 2, fontSize: "18px" }}
                          />{" "}
                          Delete
                        </MenuItem>
                      ) : null}
                    </Select>
                  </CssFormControl>
                </Box>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      )}
      {/* End Top Card design Here */}
      {/* Start Top Card Skeleton design Here */}
      {!enabledInfoTop && (
        <Card sx={{ mt: 2, borderRadius: "7px" }}>
          <CardHeader
            sx={{ borderBottom: "1px solid #ccc", padding: "10px 16px" }}
            title={
              <Grid
                sx={{ mt: "0px", borderRadius: "7px" }}
                container
                direction="row"
                rowSpacing={2}
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={7}
                  xl={7}
                  sx={{ paddingTop: "0!important" }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Skeleton
                      variant="circular"
                      animation="wave"
                      width={35}
                      height={35}
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={150}
                      height={25}
                      sx={{ marginTop: "6px", marginLeft: "10px" }}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={5}
                  xl={5}
                  sx={{ paddingTop: "0!important" }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <Grid item xs={6} sm={4} md={4} lg={4} xl={4}>
                      <Box
                        sx={{ display: "flex", justifyContent: "end" }}
                        className={styles.HeaderStatus}
                      >
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={150}
                          height={25}
                          sx={{ marginTop: "6px", marginLeft: "10px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={4} lg={3} xl={3}>
                      <Box
                        sx={{ display: "flex", justifyContent: "end" }}
                        className={styles.HeaderStatus}
                      >
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={150}
                          height={25}
                          sx={{ marginTop: "6px", marginLeft: "10px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "end",
                          cursor: "pointer",
                        }}
                        className={styles.HeaderStatus}
                      >
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={150}
                          height={25}
                          sx={{ marginTop: "6px", marginLeft: "10px" }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            }
          />
          <CardContent sx={{ padding: "24px" }}>
            <Grid
              sx={{ mt: "0px", borderRadius: "7px" }}
              container
              direction="row"
              rowSpacing={2}
              spacing={3}
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={4}
                sx={{ paddingTop: "0!important" }}
              >
                <TableContainer>
                  <Table size="small" aria-label="a dense table">
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              padding: "6px 0px",
                              borderBottom: "0",
                              color: "#015578",
                              fontWeight: "500",
                            }}
                          >
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width={100}
                              height={25}
                            />
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              borderBottom: "0",
                              color: "#000",
                              fontWeight: "400",
                            }}
                          >
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width={100}
                              height={25}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={3}
                xl={3}
                sx={{ paddingTop: "0!important" }}
              >
                <Skeleton
                  variant="text"
                  animation="wave"
                  width={100}
                  height={25}
                />
                <Box className={styles.TopCardTags}>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={150}
                    height={25}
                    sx={{ borderRadius: "50px" }}
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={150}
                    height={25}
                    sx={{ borderRadius: "50px" }}
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={150}
                    height={25}
                    sx={{ borderRadius: "50px" }}
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={150}
                    height={25}
                    sx={{ borderRadius: "50px" }}
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={150}
                    height={25}
                    sx={{ borderRadius: "50px" }}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={5}
                xl={5}
                sx={{ paddingTop: "0!important" }}
              >
                <Grid
                  sx={{ mt: "8px", borderRadius: "7px" }}
                  container
                  direction="row"
                  rowSpacing={2}
                  spacing={3}
                >
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={3}
                    lg={3}
                    xl={3}
                    sx={{ paddingTop: "0!important" }}
                    align="center"
                  >
                    <Skeleton
                      variant="circular"
                      animation="wave"
                      width={50}
                      height={50}
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={80}
                      height={25}
                      sx={{ mt: 1 }}
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={80}
                      height={25}
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={3}
                    lg={3}
                    xl={3}
                    sx={{ paddingTop: "0!important" }}
                    align="center"
                  >
                    <Skeleton
                      variant="circular"
                      animation="wave"
                      width={50}
                      height={50}
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={80}
                      height={25}
                      sx={{ mt: 1 }}
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={80}
                      height={25}
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={3}
                    lg={3}
                    xl={3}
                    sx={{ paddingTop: "0!important" }}
                    align="center"
                  >
                    <Skeleton
                      variant="circular"
                      animation="wave"
                      width={50}
                      height={50}
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={80}
                      height={25}
                      sx={{ mt: 1 }}
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={80}
                      height={25}
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={3}
                    lg={3}
                    xl={3}
                    sx={{ paddingTop: "0!important" }}
                    align="center"
                  >
                    <Skeleton
                      variant="circular"
                      animation="wave"
                      width={50}
                      height={50}
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={80}
                      height={25}
                      sx={{ mt: 1 }}
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={80}
                      height={25}
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions
            sx={{ borderTop: "1px solid #ccc", padding: "10px 16px" }}
          >
            <Grid
              sx={{ mt: "0px", borderRadius: "7px" }}
              container
              direction="row"
              rowSpacing={2}
              spacing={3}
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={5}
                xl={5}
                sx={{ paddingTop: "0!important" }}
              >
                <Box sx={{ display: "flex" }} className={styles.ipContainer}>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={80}
                    height={25}
                    sx={{ width: "75px", mt: "8px" }}
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    className={styles.IpAddress}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={5}
                xl={5}
                sx={{ paddingTop: "0!important" }}
              >
                <Box sx={{ display: "flex" }} className={styles.ipContainer}>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={80}
                    height={25}
                    sx={{ width: "75px", mt: "8px" }}
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    className={styles.IpAddress}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={2}
                xl={2}
                sx={{ paddingTop: "0!important" }}
              >
                <Box sx={{ display: "flex" }} alignItems="center">
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={"100%"}
                    height={25}
                    sx={{ width: "75px", mt: "8px" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      )}
      {/* End Top Card Skeleton design Here */}

      {/* Start Tab Card design Here */}
      <Card sx={{ mt: 2, borderRadius: "7px" }}>
        <CardContent sx={{ padding: "24px" }}>
          <TabContext value={ManageDetailValue}>
            {/* Start Tab List Sekeleton */}
            <Skeleton
              variant="text"
              animation="wave"
              width={"100%"}
              height={80}
              sx={{ borderRadius: "12px", marginTop: "-15px", display: "none" }}
            />
            {/* End Tab List Sekeleton */}
            <TabList
              variant="scrollable"
              onChange={handleManageDetailValue}
              className={styles.tabContainer}
              aria-label="simple tabs example"
              TabIndicatorProps={{ style: { backgroundColor: "#6DCCDD" } }}
              sx={{
                "& .MuiTab-root.Mui-selected": {
                  color: "#015578",
                  backgroundColor: "#e1f3f6",
                  fontWeight: "550",
                },
              }}
            >
              <Tab
                disabled={restrictActions}
                value="Overview"
                label="Overview"
                className={styles.tabButton}
              />
              <Tab
                disabled={restrictActions}
                value="Usage Graphs"
                label="Usage Graphs"
                className={styles.tabButton}
              />
              <Tab
                disabled={restrictActions}
                value="Storage"
                label="Storage"
                className={styles.tabButton}
              />
              <Tab
                disabled={restrictActions}
                value="Network"
                label="Network"
                className={styles.tabButton}
              />
              <Tab
                disabled={restrictActions}
                value="Snapshots"
                label="Snapshots"
                className={styles.tabButton}
              />
              <Tab
                disabled
                value="Settings"
                label="Settings"
                className={styles.tabButton}
              />
            </TabList>
            <TabPanel value="Overview" sx={{ pl: "15px", pr: "15px", pb: "0" }}>
              <MinstanceDetailOverview sslugId={slugId} />
            </TabPanel>
            <TabPanel value="Usage Graphs" sx={{ pb: "0" }}>
              <MinstanceDetailUsageGraphs sslugId={slugId} />
            </TabPanel>
            <TabPanel value="Storage" sx={{ pb: "0" }}>
              <MinstanceDetailStorages
                setisStorageActionDisabled={setisStorageActionDisabled}
                isNicActionDisabled={isNicActionDisabled}
                isSnapshotDisabled={isSnapshotDisabled}
                sslugId={slugId}
                comisSelectAllowcAction={comisSelectAllowcStorage}
              />
            </TabPanel>
            <TabPanel value="Network" sx={{ pb: "0" }}>
              <NetworkDataTable
                setisNicActionDisabled={setisNicActionDisabled}
                isStorageActionDisaled={isStorageActionDisaled}
                isSnapshotDisabled={isSnapshotDisabled}
                sslugId={slugId}
                comisSelectAllowNic={comisSelectAllowNic}
              />
            </TabPanel>
            <TabPanel value="Snapshots">
              <MinstanceDetailSnapShot
                sslugId={slugId}
                setisSnapshotDisabled={setisSnapshotDisabled}
                isNicActionDisabled={isNicActionDisabled}
                isStorageActionDisaled={isStorageActionDisaled}
                comisSelectAllowcAction={comisSelectAllowcAction}
              />
            </TabPanel>
            <TabPanel value="Settings">
              <Typography>Settings</Typography>
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
      {/* End Tab Card design Here */}
      {/*
      <Script strategy="afterInteractive">
  {`
  (function ($) {
    
      $(document).ready(function () {
        // Get the button by its id
        const vmconsoleBtn = document.getElementById('vmconsoleBtn');
        
        if (vmconsoleBtn) {
          // Add a click event listener to the button
          vmconsoleBtn.addEventListener('click', function () {
            // Trigger your wms library code here when the button is clicked
            // For example:
            alert('Button clicked!'); // Replace with your library code
          });
        } else {
          console.error('Button with id "vmconsoleBtn" not found.');
        }
      });
    })(jQuery);
    
  `}
</Script>
*/}

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
            {commonDialContent}{" "}
            <span style={{ color: "black", fontWeight: "bold" }}>
              {commonDialAddress}
            </span>
            <br />
            {commonDialContantAlert}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{
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
    </SurfaceLayout>
  );
}

export default MinstanceDetail;
