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
import Avatar from "@mui/material/Avatar";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Popover from "@mui/material/Popover";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import UserManagementDataTable from "../../../../components/pages/surface/settings/account/usermgmt/UserManagementTable";
import TeamsDataTable from "../../../../components/pages/surface/settings/account/team/TeamsTable";
import TagsDataTable from "../../../../components/pages/surface/settings/account/tags/TagsTable";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

// ** MUI ICON Components
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

// ** Custom CSS
import styles from "./index.module.css";
import AccountProfile from "../../../../components/pages/surface/settings/account/profile/profile";

import Cookies from "js-cookie";
import AccountOrganization from "../../../../components/pages/surface/settings/account/organization/organization";

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

function Account() {
  // ** OverAll Tab Function
  const [AccountDetailValue, setAccountDetailValue] = useState("MyProfile");
  const handleAccountDetailValue = (event, newAccountDetailValue) => {
    setAccountDetailValue(newAccountDetailValue);
  };

  // ** Chip Close Function
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const cookies = Cookies.get("userData");
  const [roleName, setRoleName] = useState(false);
  const [stcachData, setstcachData] = useState([]);
  const [showRitems, setShowRitems] = useState(true);
  const [showConfItems, setShowConfItems] = useState(true);
  const [hideSkeletonTbl, setHideSkeletonTbl] = useState(false);
  useEffect(() => {
    if (cookies) {
      const cachData = cookies ? JSON.parse(cookies) : true;
      if (
        cachData.role_name === "owner" ||
        cachData.role_name === "administrator"
      ) {
        setShowRitems(true);
        setHideSkeletonTbl(true);
        if (cachData.account_type === "legal") {
          setShowConfItems(true);
        } else {
          setShowConfItems(false);
        }
      } else {
        if (
          cachData.role_name === "manager" ||
          cachData.role_name === "billing admin" ||
          cachData.role_name === "operator"
        ) {
          setHideSkeletonTbl(true);
          setShowConfItems(false);
          setShowRitems(false);
        }
        setShowConfItems(false);
        setShowRitems(false);
      }
      setRoleName(cachData.role_name);
      setstcachData(cachData);
    }
  }, [cookies]);

  return (
    <SurfaceLayout currentPage={7} setBackgrd={true}>
      {/* Start Breadcrumbs Here */}
      <Breadcrumbs aria-label="breadcrumb">
        <Typography
          component="h4"
          variant="h5"
          align="left"
          color="#fff"
          fontSize={20}
        >
          Account
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
          <TabContext value={AccountDetailValue}>
            {/* Start Tab List Sekeleton */}
            {!hideSkeletonTbl && (
              <Skeleton
                variant="text"
                animation="wave"
                width={"100%"}
                height={115}
                sx={{
                  borderRadius: "12px",
                  marginTop: "-25px",
                  display: "block",
                }}
              />
            )}

            {/* End Tab List Sekeleton */}
            <TabList
              variant="fullWidth"
              onChange={handleAccountDetailValue}
              className={styles.tabContainer}
              aria-label="simple tabs 
                        example"
              TabIndicatorProps={{ style: { backgroundColor: "#6DCCDD" } }}
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
            >
              <Tab
                value="MyProfile"
                label="My Profile"
                // className={styles.tabButton}
                sx={{
                  fontSize: { lg: "16px", sm: "16px", xs: "13px", md: "16px" },
                  textTransform: "capitalize",
                }}
              />

              {showConfItems && (
                <Tab
                  value="Organization"
                  label="Organization"
                  //className={styles.tabButton}
                  sx={{
                    fontSize: {
                      lg: "16px",
                      sm: "16px",
                      xs: "13px",
                      md: "16px",
                    },
                    textTransform: "capitalize",
                  }}
                />
              )}

              {showRitems && (
                <Tab
                  value="UserManagement"
                  label="User Management"
                  // className={styles.tabButton}
                  sx={{
                    fontSize: {
                      lg: "16px",
                      sm: "16px",
                      xs: "13px",
                      md: "16px",
                    },
                    textTransform: "capitalize",
                  }}
                />
              )}
              {showRitems && (
                <Tab
                  value="Teams"
                  label="Teams"
                  // className={styles.tabButton}
                  sx={{
                    fontSize: {
                      lg: "16px",
                      sm: "16px",
                      xs: "13px",
                      md: "16px",
                    },
                    textTransform: "capitalize",
                  }}
                />
              )}
              {showRitems && (
                <Tab
                  value="Tags"
                  label="Tags"
                  // className={styles.tabButton}
                  sx={{
                    fontSize: {
                      lg: "16px",
                      sm: "16px",
                      xs: "13px",
                      md: "16px",
                    },
                    textTransform: "capitalize",
                  }}
                />
              )}
            </TabList>
          </TabContext>
        </CardContent>
      </Card>

      <Card sx={{ mt: 2, borderRadius: "7px" }}>
        <CardContent sx={{ padding: "24px" }}>
          <TabContext value={AccountDetailValue}>
            <TabPanel value="MyProfile" sx={{ p: 0 }}>
              {/* Start My Profile Design Here */}
              <AccountProfile />
              {/* End My Profile Skeleton Design Here */}
            </TabPanel>

            <TabPanel value="Organization" sx={{ p: 0 }}>
              <Box>
                <AccountOrganization />
              </Box>

              {/* Start organization Skeleton here */}
              {/* ends organization Skeleton here */}
            </TabPanel>

            <TabPanel value="UserManagement" sx={{ p: 0 }}>
              {/* Start User Management Table Design Here */}
              <Box>
                <UserManagementDataTable />
              </Box>
              {/* End User Management Table Design Here */}
              {/* Start User Management Table Skeleton Here */}
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
              {/* End User Management Table Skeleton Here */}
            </TabPanel>
            <TabPanel value="Teams" sx={{ p: 0 }}>
              {/* Start Teams Table Design Here */}
              <Box>
                <TeamsDataTable />
              </Box>
              {/* End Teams Table Design Here */}
              {/* Start Teams Table Skeleton Here */}
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
              {/* End Teams Table Skeleton Here */}
            </TabPanel>
            <TabPanel value="Tags" sx={{ p: 0 }}>
              {/* Start Tags Table Design Here */}
              <Box>
                <TagsDataTable />
              </Box>
              {/* End Tags Table Design Here */}
              {/* Start Tags Table Skeleton Here */}
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
              {/* End Tags Table Skeleton Here */}
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </SurfaceLayout>
  );
}

export default Account;
