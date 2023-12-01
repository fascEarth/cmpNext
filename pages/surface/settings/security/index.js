// ** React Imports
import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import SurfaceLayout from "../../../../components/layouts/surface/Layout";
import Link from "next/link";

// ** MUI Components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { MuiOtpInput } from "mui-one-time-password-input";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Switch from "@mui/material/Switch";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Popover from "@mui/material/Popover";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import SSHKeyDataTable from "../../../../components/pages/surface/settings/security/sshkeys";
import MyActivityDataTable from "../../../../components/pages/surface/settings/security/myactivity";
import AuditLogsDataTable from "../../../../components/pages/surface/settings/security/auditlogs";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

// ** MUI ICON Components
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

// ** Custom CSS
import styles from "./index.module.css";
import ModifyPassword from "../../../../components/pages/surface/settings/security/modpwd";
import MultiFactorAuth from "../../../../components/pages/surface/settings/security/mfauth";

import Cookies from "js-cookie";


// ** Linear Progress CSS
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundImage: "linear-gradient(-90deg, #70dc23, yellow, red )",
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

// ** FormControl Custom Style
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
  },
});

// ** Table Skeleton CSS
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e1f3f6",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

// ** Table Skeleton Function
function TableSkeletonData(id, disk, type, size, cost, action) {
  return { id, disk, type, size, cost, action };
}
const Skeletonrows = [
  TableSkeletonData(1, "SSD", "Standard", "2TB", "$200", "View"),
  TableSkeletonData(2, "HDD", "Premium", "4TB", "$350", "View"),
  TableSkeletonData(3, "SSD", "Basic", "1TB", "$150", "View"),
  TableSkeletonData(4, "HDD", "Standard", "1TB", "$100", "View"),
  TableSkeletonData(5, "SSD", "Premium", "4TB", "$400", "View"),
];

function Security() {
  // ** OverAll Tab Function
  const [ManageDetailValue, setManageDetailValue] = useState("ModifyPassword");
  const handleManageDetailValue = (event, newManageDetailValue) => {
    setManageDetailValue(newManageDetailValue);
  };

  // ** Current Password Show Function
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // ** New Password Show Function
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };
  // ** Confirm Password Show Function
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  // ** OTP Function
  const [otp, setOtp] = React.useState("");
  const handleChange = (newValue) => {
    setOtp(newValue);
  };


  const cookies = Cookies.get("userData");
  const [roleName,setRoleName] = useState(false)
  const [stcachData, setstcachData] = useState([]);
  const [showRitemsssheys, setShowRitemsssheys] = useState(true);
  const [showRitemsauditlogs, setShowRitemsauditlogs] = useState(true);
  useEffect(() => {
    
    
    if (cookies) {
      const cachData = cookies ? JSON.parse(cookies) : true;
      if(cachData.role_name === "owner" || cachData.role_name === "administrator" || cachData.role_name === "manager"){
        setShowRitemsssheys(true);
      }else{
        setShowRitemsssheys(false);
      }
      if(cachData.role_name === "owner"){
        setShowRitemsauditlogs(true);
      }else{
        setShowRitemsauditlogs(false);
      }
      setRoleName(cachData.role_name)
      setstcachData(cachData);
    }
  }, [cookies]);



  return (
    <SurfaceLayout currentPage={8} setBackgrd={true}>
      {/* Start Breadcrumbs Here */}
      <Breadcrumbs aria-label="breadcrumb">
        <Typography
          component="h4"
          variant="h5"
          align="left"
          color="#fff"
          fontSize={20}
        >
          Security
        </Typography>
      </Breadcrumbs>
      {/* END Breadcrumbs Here */}
      {/* Start Breadcrumbs Skeleton Here */}
      <Stack spacing={1} sx={{ display: "none" }}>
        <Skeleton variant="text" width={"22%"} height={25} />
      </Stack>
      {/* END Breadcrumbs Skeleton Here */}

      <Card sx={{ mt: 2, borderRadius: "7px", height: "65px" }}>
        <CardContent sx={{ padding: "0px !important" }}>
          <TabContext value={ManageDetailValue}>
            {/* Start Tab List Sekeleton */}
            <Skeleton
              variant="text"
              animation="wave"
              width={"100%"}
              height={115}
              sx={{ borderRadius: "12px", marginTop: "-25px", display: "none" }}
            />
            {/* End Tab List Sekeleton */}
            <TabList
              variant="fullWidth"
              onChange={handleManageDetailValue}
              className={styles.tabContainer}
              aria-label="simple tabs 
                        example"
              TabIndicatorProps={{ style: { backgroundColor: "#6DCCDD" } }}
              //   TR Sanjai
              sx={{
                "& .MuiTab-root.Mui-selected": {
                  color: "#015578",
                  backgroundColor: "#e1f3f6",
                  fontWeight: "550",
                  height: "65px",
                },
                "& .MuiTabs-scroller": {
                  overflow: "auto !important",
                },
                "*::-webkit-scrollbar": {
                  width: "0px",
                  height: "0px",
                },
              }}
              //   TR Sanjai
            >
              <Tab
                key={"ModifyPassword"}
                value="ModifyPassword"
                label="Modify Password"
                // className={styles.tabButton}
                // TR Sanjai
                sx={{
                  fontSize: { lg: "16px", sm: "16px", xs: "13px", md: "16px" },
                  textTransform: "capitalize",
                }}
                // TR Sanjai
              />
              <Tab
                key={"FactorAuth"}
                value="FactorAuth"
                label="Multi Factor Auth"
                // className={styles.tabButton}
                // TR Sanjai
                sx={{
                  fontSize: { lg: "16px", sm: "16px", xs: "13px", md: "16px" },
                  textTransform: "capitalize",
                }}
                // TR Sanjai
              />
              {
                showRitemsssheys &&

                <Tab
                key={"SSHKeys"}
                value="SSHKeys"
                label="SSH Keys"
                // className={styles.tabButton}
                // TR Sanjai
                sx={{
                  fontSize: { lg: "16px", sm: "16px", xs: "13px", md: "16px" },
                  textTransform: "capitalize",
                }}
                // TR Sanjai
              />
              }
              
              <Tab
                key={"MyActivity"}
                value="MyActivity"
                label="My Activity"
                // className={styles.tabButton}
                // TR Sanjai
                sx={{
                  fontSize: { lg: "16px", sm: "16px", xs: "13px", md: "16px" },
                  textTransform: "capitalize",
                }}
                // TR Sanjai
              />

{
                showRitemsauditlogs &&
              <Tab
                key={"AuditLogs"}
                value="AuditLogs"
                label="Audit Logs"
                // className={styles.tabButton}
                // TR Sanjai
                sx={{
                  fontSize: { lg: "16px", sm: "16px", xs: "13px", md: "16px" },
                  textTransform: "capitalize",
                }}
                // TR Sanjai
              />
}
            </TabList>
          </TabContext>
        </CardContent>
      </Card>

      <Card sx={{ mt: 2, borderRadius: "7px" }}>
        <CardContent sx={{ padding: "24px" }}>
          <TabContext value={ManageDetailValue}>
            <TabPanel value="ModifyPassword" sx={{ p: 0 }}>
              <ModifyPassword />
            </TabPanel>
            <TabPanel value="FactorAuth" sx={{ p: 0 }}>
              <MultiFactorAuth />
            </TabPanel>
            <TabPanel value="SSHKeys" sx={{ p: 0 }}>
              {/* Start SSHKeys Table design Here */}
              <Box>
                <SSHKeyDataTable />
              </Box>
              {/* End SSHKeys Table design Here */}
              {/* Start SSHKeys Table Skeleton Here */}
              <Box hidden>
                <Box sx={{ position: "relative" }}>
                  <Typography
                    component="p"
                    variant="p"
                    color={"#6b6f82"}
                    align="left"
                  >
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={200}
                      height={25}
                    />
                  </Typography>
                  <Box className={styles.SkeletonSearchContainer}>
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={200}
                      height={35}
                      sx={{ mr: "15px", borderRadius: "20px" }}
                      className={styles.SerachSkeleton}
                    />
                    <Skeleton
                      variant="circular"
                      animation="wave"
                      width={30}
                      height={30}
                      className={styles.SkeletonAddIcon}
                    />
                  </Box>
                </Box>
                <Grid
                  sx={{ mt: "20px", borderRadius: "7px" }}
                  container
                  direction="row"
                  rowSpacing={2}
                  spacing={2}
                >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={{ paddingTop: "0!important" }}
                  >
                    <TableContainer component={Paper} variant="outlined">
                      <Table
                        aria-label="simple table"
                        sx={{ overflowX: "scroll" }}
                      >
                        <TableHead sx={{ height: "55px" }}>
                          <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Skeletonrows.map((row) => (
                            <TableRow
                              key={row.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell scope="row" sx={{ p: "20px" }}>
                                <Skeleton
                                  variant="rounded"
                                  animation="wave"
                                  width={"100%"}
                                  height={15}
                                />
                              </TableCell>
                              <TableCell sx={{ p: "20px" }}>
                                <Skeleton
                                  variant="rounded"
                                  animation="wave"
                                  width={"100%"}
                                  height={15}
                                />
                              </TableCell>
                              <TableCell sx={{ p: "20px" }}>
                                <Skeleton
                                  variant="rounded"
                                  animation="wave"
                                  width={"100%"}
                                  height={15}
                                />
                              </TableCell>
                              <TableCell sx={{ p: "20px" }}>
                                <Skeleton
                                  variant="rounded"
                                  animation="wave"
                                  width={"100%"}
                                  height={15}
                                />
                              </TableCell>
                              <TableCell align="center" sx={{ p: "20px" }}>
                                <Skeleton
                                  variant="rounded"
                                  animation="wave"
                                  width={"100%"}
                                  height={15}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Box>
              {/* End SSHKeys Table Skeleton Here */}
            </TabPanel>
            <TabPanel value="MyActivity" sx={{ p: 0 }}>
              {/* Start MyActivity Table design Here */}
              <Box>
                <MyActivityDataTable />
              </Box>
              {/* End MyActivity Table design Here */}
              {/* Start MyActivity Table Skeleton Here */}
              <Box hidden>
                <Box sx={{ position: "relative" }}>
                  <Typography
                    component="p"
                    variant="p"
                    color={"#6b6f82"}
                    align="left"
                  >
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={200}
                      height={25}
                    />
                  </Typography>
                  <Box className={styles.SkeletonSearchContainer}>
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={200}
                      height={35}
                      sx={{ mr: "15px", borderRadius: "20px" }}
                      className={styles.SerachSkeleton}
                    />
                    <Skeleton
                      variant="circular"
                      animation="wave"
                      width={30}
                      height={30}
                      className={styles.SkeletonAddIcon}
                    />
                  </Box>
                </Box>
                <Grid
                  sx={{ mt: "20px", borderRadius: "7px" }}
                  container
                  direction="row"
                  rowSpacing={2}
                  spacing={2}
                >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={{ paddingTop: "0!important" }}
                  >
                    <TableContainer component={Paper} variant="outlined">
                      <Table
                        aria-label="simple table"
                        sx={{ overflowX: "scroll" }}
                      >
                        <TableHead sx={{ height: "55px" }}>
                          <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Skeletonrows.map((row) => (
                            <TableRow
                              key={row.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell scope="row" sx={{ p: "20px" }}>
                                <Skeleton
                                  variant="rounded"
                                  animation="wave"
                                  width={"100%"}
                                  height={15}
                                />
                              </TableCell>
                              <TableCell sx={{ p: "20px" }}>
                                <Skeleton
                                  variant="rounded"
                                  animation="wave"
                                  width={"100%"}
                                  height={15}
                                />
                              </TableCell>
                              <TableCell sx={{ p: "20px" }}>
                                <Skeleton
                                  variant="rounded"
                                  animation="wave"
                                  width={"100%"}
                                  height={15}
                                />
                              </TableCell>
                              <TableCell sx={{ p: "20px" }}>
                                <Skeleton
                                  variant="rounded"
                                  animation="wave"
                                  width={"100%"}
                                  height={15}
                                />
                              </TableCell>
                              <TableCell align="center" sx={{ p: "20px" }}>
                                <Skeleton
                                  variant="rounded"
                                  animation="wave"
                                  width={"100%"}
                                  height={15}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Box>
              {/* End MyActivity Table Skeleton Here */}
            </TabPanel>
            <TabPanel value="AuditLogs" sx={{ p: 0 }}>
              {/* Start AuditLogs Table design Here */}
              <Box>
                <AuditLogsDataTable />
              </Box>
              {/* End AuditLogs Table design Here */}
              {/* Start AuditLogs Table Skeleton Here */}
              <Box hidden>
                <Box sx={{ position: "relative" }}>
                  <Typography
                    component="p"
                    variant="p"
                    color={"#6b6f82"}
                    align="left"
                  >
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={200}
                      height={25}
                    />
                  </Typography>
                  <Box className={styles.SkeletonSearchContainer}>
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={200}
                      height={35}
                      sx={{ mr: "15px", borderRadius: "20px" }}
                      className={styles.SerachSkeleton}
                    />
                    <Skeleton
                      variant="circular"
                      animation="wave"
                      width={30}
                      height={30}
                      className={styles.SkeletonAddIcon}
                    />
                  </Box>
                </Box>
                <Grid
                  sx={{ mt: "20px", borderRadius: "7px" }}
                  container
                  direction="row"
                  rowSpacing={2}
                  spacing={2}
                >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={{ paddingTop: "0!important" }}
                  >
                    <TableContainer component={Paper} variant="outlined">
                      <Table
                        aria-label="simple table"
                        sx={{ overflowX: "scroll" }}
                      >
                        <TableHead sx={{ height: "55px" }}>
                          <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Skeletonrows.map((row) => (
                            <TableRow
                              key={row.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell scope="row" sx={{ p: "20px" }}>
                                <Skeleton
                                  variant="rounded"
                                  animation="wave"
                                  width={"100%"}
                                  height={15}
                                />
                              </TableCell>
                              <TableCell sx={{ p: "20px" }}>
                                <Skeleton
                                  variant="rounded"
                                  animation="wave"
                                  width={"100%"}
                                  height={15}
                                />
                              </TableCell>
                              <TableCell sx={{ p: "20px" }}>
                                <Skeleton
                                  variant="rounded"
                                  animation="wave"
                                  width={"100%"}
                                  height={15}
                                />
                              </TableCell>
                              <TableCell sx={{ p: "20px" }}>
                                <Skeleton
                                  variant="rounded"
                                  animation="wave"
                                  width={"100%"}
                                  height={15}
                                />
                              </TableCell>
                              <TableCell align="center" sx={{ p: "20px" }}>
                                <Skeleton
                                  variant="rounded"
                                  animation="wave"
                                  width={"100%"}
                                  height={15}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Box>
              {/* End AuditLogs Table Skeleton Here */}
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </SurfaceLayout>
  );
}

export default Security;
