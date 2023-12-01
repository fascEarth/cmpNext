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
import NetworkDataTable from "./collectTable";

// ** MUI ICON Components
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
// ** Custom CSS
import styles from "./index.module.css";
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

function MinstanceDetailSnapShot({
  sslugId,
  comisSelectAllowcAction,
  setisSnapshotDisabled,
  isNicActionDisabled,
  isStorageActionDisaled,
}) {
  const { clientIP } = useClientIP();

  const [scachdata, setscachdata] = useState([]);
  const cookies = Cookies.get("userData");
  const slugId = sslugId;

  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : false;

    if (cachData && slugId) {
      setscachdata(cachData);
      fetchData(cachData, slugId);
      // loadAllOverview(cachData);
    }
  }, [cookies, slugId]);
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

  // ** Additional NIC Modal Popup Function
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [processSnapshot, setprocessSnapshot] = useState(false);
  const [processSnapshotVals, setprocessSnapshotVals] = useState("Processing");
  const [vmsnaphotData, setvmsnaphotData] = useState("");
  const [ifinitialSnap, setifinitialSnap] = useState(true);
  const fetchData = async (tdata, sklug) => {
    const newData = {
      slugId: sklug,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getallsnapshots",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/detail",
        finalData
      ); // call the new API route
      if (data.status === "ok") {
        setvmsnaphotData(data.message);

        if (data.message.snapshotAction === "create_processing") {
          settypeProcessSnap("Creating");
          setisSnapshotDisabled(true);
          Cookies.set("snapshotInProcess", true);
          setprocessSnapshot(true);
          setTimeout(function () {
            fetchData(tdata, sklug);
          }, 30000);
        } else if (data.message.snapshotAction === "remove_processing") {
          settypeProcessSnap("Removing");
          setisSnapshotDisabled(true);
          setprocessSnapshot(true);
          Cookies.set("snapshotInProcess", true);
          setTimeout(function () {
            fetchData(tdata, sklug);
          }, 30000);
        } else if (data.message.snapshotAction === "revert_processing") {
          settypeProcessSnap("Reverting");
          setprocessSnapshot(true);
          setisSnapshotDisabled(true);
          Cookies.set("snapshotInProcess", true);
          setTimeout(function () {
            fetchData(tdata, sklug);
          }, 30000);
        } else if (data.message.snapshotAction === "processing") {
          setprocessSnapshot(true);
          setisSnapshotDisabled(true);
          Cookies.set("snapshotInProcess", true);
          setTimeout(function () {
            fetchData(tdata, sklug);
          }, 30000);
        } else if (data.message.snapshotAction === "create_snapshot") {
          setprocessSnapshot(false);
          setisSnapshotDisabled(false);
          Cookies.set("snapshotInProcess", false);
          toast.success("Snapshot has been created successfully!", {
            onClose: () => {
              setisSnapshotDisabled(false);
            },
          });
        } else if (data.message.snapshotAction === "remove_snapshot") {
          setprocessSnapshot(false);
          setisSnapshotDisabled(false);
          Cookies.set("snapshotInProcess", false);
          toast.success("Snapshot has been removed successfully!", {
            onClose: () => {
              setisSnapshotDisabled(false);
            },
          });
        } else if (data.message.snapshotAction === "revert_snapshot") {
          setprocessSnapshot(false);
          setisSnapshotDisabled(false);
          Cookies.set("snapshotInProcess", false);
          toast.success("Snapshot has been reverted successfully!", {
            onClose: () => {
              setisSnapshotDisabled(false);
            },
          });
        } else {
          setprocessSnapshot(false);
          setisSnapshotDisabled(false);
          Cookies.set("snapshotInProcess", false);
        }
        setifinitialSnap(false);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const createSnapshotM = async () => {
    settypeProcessSnap("Creating");
    const tdata = scachdata;
    setprocessSnapshot(true);
    setisSnapshotDisabled(true);
    Cookies.set("snapshotInProcess", true);

    const newData = {
      data: {
        action: "create_snapshot",
        options: "os_snapshot/memory_snapshot",
      },
      slugId: slugId,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "processsnapshots",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/detail",
        finalData
      ); // call the new API route
      if (data.status_code === "9000") {
        Cookies.set("disabledAction", true);
        setTimeout(function () {
          setprocessSnapshot(false);
          setisSnapshotDisabled(false);
          Cookies.set("snapshotInProcess", false);

          fetchData(tdata, slugId);
        }, 60000);
      } else {
        setprocessSnapshot(false);
        setisSnapshotDisabled(false);
        Cookies.set("disabledAction", false);
        Cookies.set("snapshotInProcess", false);
      }
    } catch (error) {
      setprocessSnapshot(false);
      setisSnapshotDisabled(false);
      Cookies.set("snapshotInProcess", false);

      // toast.error('An error occurred');
    }
  };
  const revertSnapshotM = async () => {
    settypeProcessSnap("Reverting");
    const tdata = scachdata;
    setprocessSnapshot(true);
    setisSnapshotDisabled(true);
    Cookies.set("snapshotInProcess", true);

    const newData = {
      data: { action: "revert_snapshot", options: "" },
      slugId: slugId,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "processsnapshots",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/detail",
        finalData
      ); // call the new API route
      if (data.status_code === "9000") {
        setTimeout(function () {
          setprocessSnapshot(false);
          setisSnapshotDisabled(false);
          Cookies.set("snapshotInProcess", false);

          fetchData(tdata, slugId);
        }, 60000);
      } else {
        setprocessSnapshot(false);
        setisSnapshotDisabled(false);
        Cookies.set("snapshotInProcess", false);
      }
    } catch (error) {
      setprocessSnapshot(false);
      setisSnapshotDisabled(false);
      Cookies.set("snapshotInProcess", false);

      // toast.error('An error occurred');
    }
  };
  const [typeProcessSnap, settypeProcessSnap] = useState("Processing");
  const deleteSnapshotM = async () => {
    settypeProcessSnap("Removing");
    const tdata = scachdata;
    setprocessSnapshot(true);
    setisSnapshotDisabled(true);
    Cookies.set("snapshotInProcess", true);

    const newData = {
      data: { action: "remove_snapshot", options: "" },
      slugId: slugId,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "processsnapshots",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/detail",
        finalData
      ); // call the new API route
      if (data.status_code === "9000") {
        setTimeout(function () {
          setprocessSnapshot(false);
          setisSnapshotDisabled(false);
          Cookies.set("snapshotInProcess", false);

          fetchData(tdata, slugId);
        }, 60000);
      } else {
        setprocessSnapshot(false);
        setisSnapshotDisabled(false);
        Cookies.set("snapshotInProcess", false);
      }
    } catch (error) {
      setprocessSnapshot(false);
      setisSnapshotDisabled(false);
      Cookies.set("snapshotInProcess", false);

      // toast.error('An error occurred');
    }
  };

  return (
    <>
      {!ifinitialSnap && (
        <Box>
          <Box
            sx={{
              position: "relative",
            }}
          >
            {!comisSelectAllowcAction && (
              <Chip
                icon={<ReportProblemOutlinedIcon color="error" />}
                label="Power off the VM instance before performing actions on snapshot"
                sx={{
                  background: "#fff3e0",
                  fontSize: "14px",
                  color: "#ff9800",
                  padding: "0 10px",
                }}
              />
            )}
            {comisSelectAllowcAction &&
              !isNicActionDisabled &&
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
            {comisSelectAllowcAction &&
              !isStorageActionDisaled &&
              isNicActionDisabled && (
                <Chip
                  icon={<ReportProblemOutlinedIcon color="error" />}
                  label="please wait until the network upgradation gets completed."
                  sx={{
                    background: "#fff3e0",
                    fontSize: "14px",
                    color: "#ff9800",
                    padding: "0 10px",
                  }}
                />
              )}
            {comisSelectAllowcAction &&
              !isStorageActionDisaled &&
              !isNicActionDisabled && (
                <Typography
                  component="p"
                  variant="p"
                  color={"#6b6f82"}
                  align="left"
                >
                  Perform any actions on snapshot
                </Typography>
              )}
          </Box>
          <Card sx={{ mt: 2, borderRadius: "7px" }} variant="outlined">
            <CardContent sx={{ padding: "24px" }}>
              <Grid
                sx={{ mt: "20px", borderRadius: "7px" }}
                container
                direction="row"
                rowSpacing={2}
                spacing={2}
                justifyContent="center"
                alignItems={"center"}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={11}
                  lg={10}
                  xl={10}
                  sx={{ paddingTop: "0!important" }}
                  align="center"
                >
                  <Typography component="p" variant="p" color={"#6b6f82"}>
                    Snapshots can take more time depends on per GB of data used
                    by your VM.
                  </Typography>
                  <Typography component="p" variant="p" color={"#6b6f82"}>
                    Snapshots cost based on the size of the snapshot.
                  </Typography>
                  {/* <Typography component="p" variant="p" color={"#6b6f82"}>
                    before taking a snapshot to ensure data consistency.
                  </Typography> */}
                  {!vmsnaphotData.vmSnapshotTO &&
                    !processSnapshot &&
                    vmsnaphotData.snapshotAction != "processing" && (
                      <Button
                        size="md"
                        variant="solid"
                        sx={{
                          cursor:
                            comisSelectAllowcAction &&
                            !isStorageActionDisaled &&
                            !isNicActionDisabled
                              ? "pointer"
                              : "not-allowed",
                          color: "#fff",
                          backgroundImage:
                            "linear-gradient(45deg, #0288d1, #26c6da) !important",
                          mt: 5,
                          mb: 3,
                        }}
                        onClick={
                          comisSelectAllowcAction &&
                          !isStorageActionDisaled &&
                          !isNicActionDisabled
                            ? createSnapshotM
                            : undefined
                        }
                      >
                        CREATE SNAPSHOT
                      </Button>
                    )}

                  {/* Start Snapshot Progress */}
                  {processSnapshot && (
                    <Box sx={{ mt: 5, mb: 5 }}>
                      <Typography
                        component="h4"
                        variant="h5"
                        fontSize={16}
                        mb={1}
                        sx={{ color: "#015578", fontWeight: "500" }}
                      >
                        {typeProcessSnap + " "}Snapshots
                      </Typography>
                      <Box
                        component="div"
                        className={styles.SnapshotProgress}
                      ></Box>
                    </Box>
                  )}

                  {/* End Snapshot Progress */}
                  {/* Start Snapshot Create */}

                  {!processSnapshot && vmsnaphotData.vmSnapshotTO && (
                    <>
                      <Grid
                        sx={{ mt: "20px", mb: "20px", borderRadius: "7px" }}
                        container
                        direction="row"
                        rowSpacing={2}
                        spacing={2}
                        justifyContent="center"
                        alignItems={"center"}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={5}
                          lg={5}
                          xl={5}
                          sx={{ paddingTop: "0!important" }}
                          align="center"
                        >
                          <Card
                            sx={{ mt: 2, borderRadius: "7px" }}
                            variant="outlined"
                          >
                            <CardContent sx={{ padding: "15px !important" }}>
                              <Typography
                                component="h4"
                                variant="h5"
                                fontSize={16}
                                mb={1}
                                sx={{ fontWeight: "430" }}
                              >
                                Last snapshot created on (UTC)
                              </Typography>
                              <Typography
                                component="h4"
                                variant="h5"
                                fontSize={22}
                                sx={{ color: "#015578", fontWeight: "500" }}
                              >
                                {" "}
                                {vmsnaphotData.vmSnapshotTO.snapshotDate}{" "}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={5}
                          lg={5}
                          xl={5}
                          sx={{ paddingTop: "0!important" }}
                          align="center"
                        >
                          <Card
                            sx={{ mt: 2, borderRadius: "7px" }}
                            variant="outlined"
                          >
                            <CardContent sx={{ padding: "15px !important" }}>
                              <Typography
                                component="h4"
                                variant="h5"
                                fontSize={16}
                                mb={1}
                                sx={{ fontWeight: "430" }}
                              >
                                Last snapshot created by
                              </Typography>
                              <Typography
                                component="h4"
                                variant="h5"
                                fontSize={22}
                                sx={{ color: "#015578", fontWeight: "500" }}
                              >
                                {vmsnaphotData.vmSnapshotTO.userName}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </>
                  )}

                  {/* End Snapshot Create */}
                </Grid>
              </Grid>
            </CardContent>

            {!processSnapshot && vmsnaphotData.vmSnapshotTO && (
              <CardActions
                sx={{ borderTop: "1px solid #ccc", padding: "25px" }}
              >
                <Grid
                  sx={{ mt: "0px", borderRadius: "7px" }}
                  container
                  direction="row"
                  rowSpacing={2}
                  spacing={2}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={10}
                    lg={10}
                    xl={10}
                    sx={{ paddingTop: "0!important" }}
                  >
                    <Grid
                      sx={{ mt: "0px", borderRadius: "7px" }}
                      container
                      direction="row"
                      rowSpacing={2}
                      spacing={2}
                      justifyContent="center"
                      alignItems={"center"}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                        sx={{ paddingTop: "0!important" }}
                        align="center"
                      >
                        <Button
                          onClick={
                            comisSelectAllowcAction &&
                            !isStorageActionDisaled &&
                            !isNicActionDisabled
                              ? createSnapshotM
                              : undefined
                          }
                          size="md"
                          variant="solid"
                          className={`${styles.snapshotBtn} ${styles.textnowrap}`}
                          sx={{
                            cursor:
                              comisSelectAllowcAction &&
                              !isStorageActionDisaled &&
                              !isNicActionDisabled
                                ? "pointer"
                                : "not-allowed",
                            color: "#fff",
                            backgroundImage:
                              "linear-gradient(45deg, #0288d1, #26c6da) !important",
                          }}
                        >
                          CREATE SNAPSHOT
                        </Button>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                        sx={{ paddingTop: "0!important" }}
                        align="center"
                      >
                        <Button
                          onClick={
                            comisSelectAllowcAction &&
                            !isStorageActionDisaled &&
                            !isNicActionDisabled
                              ? revertSnapshotM
                              : undefined
                          }
                          size="md"
                          variant="solid"
                          className={`${styles.snapshotBtn} ${styles.textnowrap}`}
                          sx={{
                            cursor:
                              comisSelectAllowcAction &&
                              !isStorageActionDisaled &&
                              !isNicActionDisabled
                                ? "pointer"
                                : "not-allowed",
                            color: "#fff",
                            backgroundImage:
                              "linear-gradient(45deg, #FC4D1A, #F8B131) !important",
                          }}
                        >
                          REVERT TO SNAPSHOT
                        </Button>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                        sx={{ paddingTop: "0!important" }}
                        align="center"
                      >
                        <Button
                          onClick={
                            comisSelectAllowcAction &&
                            !isStorageActionDisaled &&
                            !isNicActionDisabled
                              ? deleteSnapshotM
                              : undefined
                          }
                          size="md"
                          variant="solid"
                          className={`${styles.snapshotBtn} ${styles.textnowrap}`}
                          sx={{
                            cursor:
                              comisSelectAllowcAction &&
                              !isStorageActionDisaled &&
                              !isNicActionDisabled
                                ? "pointer"
                                : "not-allowed",
                            color: "#fff",
                            backgroundImage:
                              "linear-gradient(45deg, #d32f2f, #db6c6c) !important",
                          }}
                        >
                          REMOVE SNAPSHOT
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardActions>
            )}
          </Card>
        </Box>
      )}

      {/* Start Snapshots Skeleton Here */}
      {ifinitialSnap && (
        <Box>
          <Card sx={{ mt: 2, borderRadius: "7px" }} variant="outlined">
            <CardContent sx={{ padding: "24px" }}>
              <Grid
                sx={{ mt: "20px", borderRadius: "7px" }}
                container
                direction="row"
                rowSpacing={2}
                spacing={2}
                justifyContent="center"
                alignItems={"center"}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={11}
                  lg={10}
                  xl={10}
                  sx={{ paddingTop: "0!important" }}
                  align="center"
                >
                  <Typography component="p" variant="p" color={"#6b6f82"}>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={"100%"}
                      height={25}
                    />
                  </Typography>
                  <Typography component="p" variant="p" color={"#6b6f82"}>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={"80%"}
                      height={25}
                    />
                  </Typography>
                  <Typography component="p" variant="p" color={"#6b6f82"}>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={"60%"}
                      height={25}
                    />
                  </Typography>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={150}
                    height={45}
                    sx={{ m: "35px auto 15px auto" }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Start Snapshots Skeleton Here */}
    </>
  );
}

export default MinstanceDetailSnapShot;
