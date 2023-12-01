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
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Popover from "@mui/material/Popover";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import VMInstanceDataTable from "../../../../components/pages/surface/billing/currentusage/vmInstanceTable";
import VMSnapshortsDataTable from "../../../../components/pages/surface/billing/currentusage/vmSnapshortsTable";
import StoragesDataTable from "../../../../components/pages/surface/billing/currentusage/StoragesTable";
import PublicIPDataTable from "../../../../components/pages/surface/billing/currentusage/PublicIPTable";
import InternetBandwidthDataTable from "../../../../components/pages/surface/billing/currentusage/InternetBandwidthTable";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import Cookies from "js-cookie";
import axios from "axios";
// ** MUI ICON Components
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

// ** Custom CSS
import styles from "./index.module.css";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `0px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
    marginBottom: "10px",
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    sx={{
      padding: "5px 16px",
      bgcolor: "rgb(204 204 204 / 25%)",
      borderRadius: "7px",
      '& .MuiAccordionSummary-content':{
        justifyContent: {xs: 'space-between', sm:'flex-start'}
      }
    }}
    expandIcon={
      <ArrowForwardIosSharpIcon className={styles.accordionIcon}
        sx={{
          width: "25px",
          height: "25px",
          padding: "4px",
          fontSize: "20px",
          color: "#f3f3f3",
          bgcolor: "#015578",
          border: "1px solid #015578",
          borderRadius: "50%",
        }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    flexWrap: 'wrap',
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  border: "0px solid rgba(0, 0, 0, .125)",
}));

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

function CurrentUsage() {
  const [allExpanded, setAllExpanded] = React.useState(false);

  // Function to handle the "Expand All" or "Collapse All" box click
  const handleExpandAllClick = () => {
    setAllExpanded(!allExpanded);
    if (!allExpanded) {
      setExpanded(false);
    }
  };

  // ** Accordion Function
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [vminstancetcount, setvminstancetcount] = useState(0);
  const [vminstancetcost, setvminstancetcost] = useState(0);

  const [vmsnapshotcount, setvmsnapshotcount] = useState(0);
  const [vmsnapshotcost, setvmsnapshotcost] = useState(0);

  const [storagestcount, setstoragestcount] = useState(0);
  const [storagestcost, setstoragestcost] = useState(0);

  const [publiciptcount, setpubliciptcount] = useState(0);
  const [publiciptcost, setpubliciptcost] = useState(0);

  const [internetbandwtcount, setinternetbandwtcount] = useState(0);
  const [internetbandwtcost, setinternetbandwtcost] = useState(0);

  const [commonCost, setcommonCost] = useState(0);

  const [commonDateVal, setcommonDateVal] = useState("-");

  const [hideSkeletonTbl, sethideSkeletonTbl] = useState(false);

  const cookies = Cookies.get("userData");

  useEffect(() => {
    const dateval = getDatef();
    setcommonDateVal(dateval);
    const cachData = cookies ? JSON.parse(cookies) : true;

    if (cachData) {
      fetchData(cachData);
    }
  }, [cookies]);

  const getDatef = () => {
    const date = new Date();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    var firstDay = new Date(year, date.getMonth(), 1).getDate();
    let currentDate = `${month} ${firstDay} - ${day}, ${year}`;
    return currentDate;
  };
  const fetchData = async (tdata) => {    
        
    const newData = {"start": 0, "length": 10,  "tenantId": tdata.tenant_id, "userSerialId":tdata.user_serial_id, "expandFilter":"default" };
        const finalData = {data:newData,endPoint:"getAllcurrentusageInfo",  token:tdata.accessToken}
        try {
          const { data } = await axios.post("/api/surface/billing/currentusage", finalData); // call the new API route      
          

          if(data.status === "ok"){
            
            const cdatavminstances = (data.message["VM Instances"])?data.message["VM Instances"]:[];
           
           setvminstancetcount(parseFloat(cdatavminstances.totalCount))
           setvminstancetcost(parseFloat(cdatavminstances.totalCost).toFixed(2))
           
           const cdatavmsnapshot = (data.message["VM Snapshots"])?data.message["VM Snapshots"]:[];
           
           setvmsnapshotcount(parseFloat(cdatavmsnapshot.totalCount))
           setvmsnapshotcost(parseFloat(cdatavmsnapshot.totalCost).toFixed(2))

           const cdatastorages = (data.message["Storages"])?data.message["Storages"]:[];
           
           setstoragestcount(parseFloat(cdatastorages.totalCount))
           setstoragestcost(parseFloat(cdatastorages.totalCost).toFixed(2))

           const cdatapublicip = (data.message["Public IPv4 Address"])?data.message["Public IPv4 Address"]:[];
           
           setpubliciptcount(parseFloat(cdatapublicip.totalCount))
           setpubliciptcost(parseFloat(cdatapublicip.totalCost).toFixed(2))

           const cdatainternetbw = (data.message["Internet Bandwidth"])?data.message["Internet Bandwidth"]:[];
           
           setinternetbandwtcount(parseFloat(cdatainternetbw.totalCount))
           setinternetbandwtcost(parseFloat(cdatainternetbw.totalCost).toFixed(2))

           const cdatacommonTotal = (data.message["total"])?data.message["total"]:[];
           
           setcommonCost(parseFloat(cdatacommonTotal).toFixed(2))


           setExpanded('panel1')

           
           
            sethideSkeletonTbl(true);
           
            


          }
          
        } catch (error) {      
         // toast.error('An error occurred');
        }
        
  };

  return (
    <>
      <SurfaceLayout currentPage={4} setBackgrd={true}>
        {/* Start Breadcrumbs Here */}
        {hideSkeletonTbl && (
          <Breadcrumbs aria-label="breadcrumb">
            <Typography
              component="h4"
              variant="h5"
              align="left"
              color="#fff"
              fontSize={20}
            >
              Estimated Cost
            </Typography>
          </Breadcrumbs>
        )}
        {/* END Breadcrumbs Here */}
        {/* Start Breadcrumbs Skeleton Here */}
        {!hideSkeletonTbl && (
          <Stack spacing={1}>
            <Skeleton
              variant="text"
              animation="wave"
              width={"22%"}
              height={25}
            />
          </Stack>
        )}
        {/* END Breadcrumbs Skeleton Here */}

        {/* Start Top Card design Here */}
        {hideSkeletonTbl && (
          <Card sx={{ mt: 2, borderRadius: "7px" }}>
            <CardContent sx={{ padding: "24px" }}>
              <Grid
                container
                direction="row"
                rowSpacing={2}
                spacing={2}
                display={"flex"}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
                  <Typography
                    className={styles.responsiveText} // TR 01 class name
                    component="h4"
                    variant="h5"
                    align="left"
                    mb={2}
                    fontSize={22}
                    color="#015578"
                    fontWeight={410}
                  >
                    Current Consumption for this billing Period
                  </Typography>
                  <Typography
                    component="p"
                    variant="p"
                    color={"#3EA5B9"}
                    align="left"
                    fontSize={14}
                  >
                    This is the estimated costs for your current usage. A
                    breakdown of your costs is available below
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={5}
                  xl={5}
                  display={"flex"}
                  alignItems="center"
                  justifyContent="center"
                  sx={{ flexDirection: { xs: "column", sm: "row" } }}
                >
                  <Box
                    component="img"
                    width={150}
                    align="center"
                    src="/images/pages/surface/billing/currentusage/chart.png"
                    alt="chart"
                  />
                  <Box
                    className={styles.billingSAR} // TR 01 className
                    component="h4"
                    variant="h5"
                    color="#6A6A6A"
                    fontSize={30}
                    fontWeight={420}
                    ml={3}
                    display={"grid"}
                  >
                    {commonCost}
                    <Box
                      component="span"
                      color="#9A9A9A"
                      fontSize={18}
                      align="center"
                    >
                      SAR
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
        {/* Start Top Card design Here */}

        {/* Start Top Card Skeleton Here */}
        {!hideSkeletonTbl && (
          <Card sx={{ mt: 2, borderRadius: "7px" }}>
            <CardContent sx={{ padding: "24px" }}>
              <Grid
                container
                direction="row"
                rowSpacing={2}
                spacing={2}
                display={"flex"}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
                  <Typography component="h4" variant="h5" align="left" mb={2}>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={"100%"}
                      height={25}
                    />
                  </Typography>
                  <Typography
                    component="p"
                    variant="p"
                    color={"#3EA5B9"}
                    align="left"
                  >
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={"100%"}
                      height={25}
                    />
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={5}
                  xl={5}
                  display={"flex"}
                  alignItems="center"
                  justifyContent="center"
                  
                >
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    width={150}
                    height={150}
                    className={styles.topCardSkeletonAvatar}
                  />
                  <Box component="h4" variant="h5" ml={3} display={"grid"}>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={100}
                      height={25}
                    />
                    <Box
                      component="span"
                      color="#9A9A9A"
                      align="center"
                      sx={{ margin: "0 auto" }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width={50}
                        height={25}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
        {/* END Top Card Skeleton Here */}

        {/* Start Accordion Card design Here */}
        {hideSkeletonTbl && (
          <Card sx={{ mt: 2, borderRadius: "7px" }}>
            <CardHeader
              className={styles.BillingCardHeader}
              sx={{ borderBottom: "1px solid #ccc", padding: "15px" , '& .MuiCardHeader-action':{width:{xs: '100%', sm:'max-content'},textAlign:'center'} }}
              title={
                <Typography
                  className={styles.responsiveSmallText} // TR 01 class name
                  component="h4"
                  variant="h5"
                  align="left"
                  fontSize={18}
                  color="#015578"
                  fontWeight={500}
                >
                  Summary{" "}
                  <Box
                    component="span"
                    color="#3EA5B9"
                    fontSize={18}
                    align="center"
                    ml={3}
                  >
                    {commonDateVal}
                  </Box>
                </Typography>
              }
              action={
                <Box
                  className={styles.billingHeaderExpandAllTag} // TR 01 class name
                  component="span"
                  color="#3EA5B9"
                  fontWeight={420}
                  fontSize={16}
                  sx={{
                    position: "relative",
                    top: "5px",
                    right: "10px",
                    cursor: "pointer",
                    
                  }}
                  onClick={handleExpandAllClick}
                >
                  {" "}
                  {allExpanded ? "Collapse All" : "Expand All"}
                </Box>
              }
            />
            <CardContent sx={{ padding: "24px" }}>
              <Accordion
                expanded={allExpanded || expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Box display='flex'> {/* TR 01 wrapper div */}
                    <Typography className={styles.billingCardtext} color="#015578" fontWeight={420}>
                      VM Instance
                    </Typography>
                    <Avatar variant="rounded" className={styles.AccordionAvatar}>
                      {vminstancetcount}
                    </Avatar>
                  </Box>
                  
                  <Typography className={styles.AccordionSummaryCost}>
                    {vminstancetcost}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={styles.accordionDetails}>
                  {/* Start VM Instance Table Here */}
                  <Box>
                    <VMInstanceDataTable
                      expanded={allExpanded ? "panel1" : expanded}
                      setvminstancetcount={setvminstancetcount}
                      setvminstancetcost={setvminstancetcost}
                    />
                  </Box>
                  {/* End VM Instance Table Here */}

                  {/* Start VM Instance Table Skeleton Here */}
                  <Box hidden>
                    <Grid
                      sx={{ mt: "10px", borderRadius: "7px" }}
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
                  {/* End VM Instance Table Skeleton Here */}
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={allExpanded || expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                    <Box display='flex'>
                  <Typography className={styles.billingCardtext} color="#015578" fontWeight={420}>
                    VM Snapshots
                  </Typography>
                  
                  <Avatar variant="rounded" className={styles.AccordionAvatar}>
                    {vmsnapshotcount}
                  </Avatar>
                  </Box>
                  <Typography className={styles.AccordionSummaryCost}>
                    {vmsnapshotcost}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={styles.accordionDetails}>
                  {/* Start VM Snapshots Table Here */}
                  <Box>
                    <VMSnapshortsDataTable
                      expanded={allExpanded ? "panel2" : expanded}
                      setvmsnapshotcost={setvmsnapshotcost}
                      setvmsnapshotcount={setvmsnapshotcount}
                    />
                  </Box>
                  {/* End VM Snapshots Table Here */}

                  {/* Start Storages Table Skeleton Here */}
                  <Box hidden>
                    <Grid
                      sx={{ mt: "10px", borderRadius: "7px" }}
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
                  {/* End Storages Table Skeleton Here */}
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={allExpanded || expanded === "panel3"}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                >
                    <Box display='flex'>
                  <Typography className={styles.billingCardtext} color="#015578" fontWeight={420}>
                    Storages
                  </Typography>
                 
                  <Avatar variant="rounded" className={styles.AccordionAvatar}>
                    {storagestcount}
                  </Avatar>
                  </Box>
                  <Typography className={styles.AccordionSummaryCost}>
                    {storagestcost}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={styles.accordionDetails}>
                  {/* Start Storages Table Here */}
                  <Box>
                    <StoragesDataTable
                      expanded={allExpanded ? "panel3" : expanded}
                      setstoragestcost={setstoragestcost}
                      setstoragestcount={setstoragestcount}
                    />
                  </Box>
                  {/* End Storages Table Here */}

                  {/* Start Storages Table Skeleton Here */}
                  <Box hidden>
                    <Grid
                      sx={{ mt: "10px", borderRadius: "7px" }}
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
                  {/* End Storages Table Skeleton Here */}
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={allExpanded || expanded === "panel4"}
                onChange={handleChange("panel4")}
              >
                <AccordionSummary
                  aria-controls="panel4d-content"
                  id="panel4d-header"
                >
                    <Box display='flex'>
                  <Typography className={styles.billingCardtext} color="#015578" fontWeight={420}>
                    Public IPv4 Address
                  </Typography>
                  <Avatar variant="rounded" className={styles.AccordionAvatar}>
                    {publiciptcount}
                  </Avatar>
                  </Box>
                  <Typography className={styles.AccordionSummaryCost}>
                    {publiciptcost}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={styles.accordionDetails}>
                  {/* Start Public IPv4 Address Table Here */}
                  <Box>
                    <PublicIPDataTable
                      expanded={allExpanded ? "panel4" : expanded}
                      setpubliciptcost={setpubliciptcost}
                      setpubliciptcount={setpubliciptcount}
                    />
                  </Box>
                  {/* End Public IPv4 Address Table Here */}

                  {/* Start Public IPv4 Address Table Skeleton Here */}
                  <Box hidden>
                    <Grid
                      sx={{ mt: "10px", borderRadius: "7px" }}
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
                  {/* End Public IPv4 Address Table Skeleton Here */}
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={allExpanded || expanded === "panel5"}
                onChange={handleChange("panel5")}
              >
                <AccordionSummary
                  aria-controls="panel5d-content"
                  id="panel5d-header"
                >
                    <Box display='flex'>
                  <Typography className={styles.billingCardtext} color="#015578" fontWeight={420}>
                    Internet Bandwidth
                  </Typography>
                  <Avatar variant="rounded" className={styles.AccordionAvatar}>
                    {internetbandwtcount}
                  </Avatar>
                  </Box>
                  <Typography className={styles.AccordionSummaryCost}>
                    {internetbandwtcost}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={styles.accordionDetails}>
                  {/* Start Internet Bandwidth Table Here */}
                  <Box>
                    <InternetBandwidthDataTable
                      expanded={allExpanded ? "panel5" : expanded}
                      setinternetbandwtcost={setinternetbandwtcost}
                      setinternetbandwtcount={setinternetbandwtcount}
                    />
                  </Box>
                  {/* End Internet Bandwidth Table Here */}

                  {/* Start Internet Bandwidth Table Skeleton Here */}
                  <Box hidden>
                    <Grid
                      sx={{ mt: "10px", borderRadius: "7px" }}
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
                  {/* End Internet Bandwidth Table Skeleton Here */}
                </AccordionDetails>
              </Accordion>
              <Grid container direction="row" rowSpacing={2} spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  display={"flex"}
                  justifyContent="end"
                >
                  <Card
                    sx={{
                      width: "350px",
                      borderRadius: "7px",
                      backgroundImage:
                        "linear-gradient(45deg,#013850,#0773a5)!important",
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        padding: "8px !important",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        className={styles.responsiveSmallText}
                        component="h4"
                        variant="h5"
                        align="left"
                        fontSize={18}
                        color="#FFF"
                        fontWeight={400}
                        ml={2}
                        mr={2}
                      >
                        Total
                      </Typography>
                      <Card
                        sx={{
                          width: "100%",
                          borderRadius: "7px",
                          bgcolor: "#fafafa",
                        }}
                      >
                        <CardContent 
                        className={styles.billingTotalCard} // TR 01
                          sx={{
                            position: "relative",
                            display: "flex",
                            padding: "10px !important",
                          }}
                        >
                          <Typography
                            component="h4"
                            variant="h5"
                            align="left"
                            fontSize={18}
                            color="#005B7F"
                            fontWeight={400}
                          >
                            SAR
                          </Typography>
                          <Typography
                            component="h4"
                            variant="h5"
                            align="right"
                            fontSize={18}
                            color="#005B7F"
                            fontWeight={420}
                            sx={{ position: "absolute", right: "35px" }}
                          >
                            {commonCost}
                          </Typography>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
        {/* END Accordion Card design Here */}

        {/* Start Accordion Card Skeleton Here */}
        {!hideSkeletonTbl && (
          <Card sx={{ mt: 2, borderRadius: "7px" }}>
            <CardHeader
              sx={{ borderBottom: "1px solid #ccc", padding: "15px" }}
              title={
                <Typography
                  component="h4"
                  variant="h5"
                  align="left"
                  fontSize={18}
                  color="#015578"
                  fontWeight={500}
                  sx={{ display: "flex" }}
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={100}
                    height={25}
                  />{" "}
                  <Box component="span" align="center" ml={3}>
                    {" "}
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={100}
                      height={25}
                    />
                  </Box>
                </Typography>
              }
              action={
                <Box
                  component="span"
                  sx={{ position: "relative", top: "5px", right: "10px" }}
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={100}
                    height={25}
                  />
                </Box>
              }
            />
            <CardContent sx={{ padding: "24px" }}>
              <Skeleton
                variant="rounded"
                animation="wave"
                width={"100%"}
                height={58}
                sx={{ mb: "10px" }}
              />
              <Skeleton
                variant="rounded"
                animation="wave"
                width={"100%"}
                height={58}
                sx={{ mb: "10px" }}
              />
              <Skeleton
                variant="rounded"
                animation="wave"
                width={"100%"}
                height={58}
                sx={{ mb: "10px" }}
              />
              <Skeleton
                variant="rounded"
                animation="wave"
                width={"100%"}
                height={58}
                sx={{ mb: "10px" }}
              />
              <Skeleton
                variant="rounded"
                animation="wave"
                width={"100%"}
                height={58}
                sx={{ mb: "10px" }}
              />
              <Grid container direction="row" rowSpacing={2} spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  display={"flex"}
                  justifyContent="end"
                >
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={350}
                    height={58}
                    sx={{ borderRadius: "7px" }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
        {/* END Accordion Card Skeleton Here */}
      </SurfaceLayout>
    </>
  );
}

export default CurrentUsage;
