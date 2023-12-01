// ** React Imports
import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import SurfaceLayout from "../../../../../components/layouts/surface/Layout";
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
import Modal from "@mui/material/Modal";
import { MuiFileInput } from "mui-file-input";
import IPSetsDataTable from "../../../../../components/pages/surface/networks/networksecurity/securitygroup/ipsetsTable";
import AppPortDataTable from "../../../../../components/pages/surface/networks/networksecurity/securitygroup/appportTable";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

// ** MUI ICON Components

// ** Custom CSS
import styles from "./index.module.css";

// Modal Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "#fafafa",
  border: "0px solid #000",
  borderRadius: "7px",
  boxShadow: 24,
  p: 4,
};

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
  TableSkeletonData(),
  TableSkeletonData(),
  TableSkeletonData(),
  TableSkeletonData(),
  TableSkeletonData(),
];

function SecurityGroup() {
  // ** OverAll Tab Function
  const [AccountDetailValue, setAccountDetailValue] = useState("Ipsets");
  const handleAccountDetailValue = (event, newAccountDetailValue) => {
    setAccountDetailValue(newAccountDetailValue);
  };

  return (
    <SurfaceLayout currentPage={15} setBackgrd={true}>
      {/* Start Breadcrumbs Here */}
      <Breadcrumbs aria-label="breadcrumb">
        <Typography
          component="h4"
          variant="h5"
          align="left"
          color="#fff"
          fontSize={20}
        >
          Group Security
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
              }}
            >
              <Tab
                value="Ipsets"
                label="IP Sets"
                className={styles.tabButton}
              />
              <Tab
                value="Appport"
                label="Application Port Profiles"
                className={styles.tabButton}
              />
            </TabList>
          </TabContext>
        </CardContent>
      </Card>

      <Card sx={{ mt: 2, borderRadius: "7px" }}>
        <CardContent sx={{ padding: "24px" }}>
          <TabContext value={AccountDetailValue}>
            <TabPanel value="Ipsets" sx={{ p: 0 }}>
              {/* Start IP Sets Table Design Here */}
              <Box>
                <IPSetsDataTable />
              </Box>
              {/* Start IP Sets Table Design Here */}

              {/* Start IP Sets Table Skeleton Here */}
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
                          {Skeletonrows.map((row, index) => (
                            <TableRow
                              key={index}
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
              {/* End IP Sets Table Skeleton Here */}
            </TabPanel>
            <TabPanel value="Appport" sx={{ p: 0 }}>
              {/* Start App Port Profile Table Design Here */}
              <Box>
                <AppPortDataTable />
              </Box>
              {/* Start App Port Profile Table Design Here */}

              {/* Start App Port Profile Table Skeleton Here */}
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
                          {Skeletonrows.map((row, index) => (
                            <TableRow
                              key={index}
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
              {/* End IP Sets Table Skeleton Here */}
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </SurfaceLayout>
  );
}

export default SecurityGroup;
