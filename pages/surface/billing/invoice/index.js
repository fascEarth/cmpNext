// ** React Imports
import * as React from "react";
import { useState } from "react";
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
import InvoiceDataTable from "../../../../components/pages/surface/billing/invoice/invoiceTable";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Cookies from "js-cookie";
import axios from "axios";
// ** MUI ICON Components

// ** Custom CSS
import styles from "./index.module.css";
import { useEffect } from "react";
import { useClientIP } from "../../../../utils/context/ClientIPContext";

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
function Invoices() {
  const { clientIP } = useClientIP();

  const cookies = Cookies.get("userData");
  const [stcachData, setstcachData] = useState([]);

  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;

    setstcachData(cachData);
    if (cookies) {
      fetchData(cachData);
    }
  }, [cookies]);

  //   console.log(stcachData, "stcachData");
  const [invoiceInfo, setInvoiceInfo] = useState("");

  const fetchData = async (tdata) => {
    const newData = {
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getInvoiceEstimate",
      token: tdata.accessToken,
    };

    try {
      const { data } = await axios.post(
        "/api/surface/billing/invoice",
        finalData
      ); // call the new API route

      if (data) {
        // console.log(JSON.parse(data.message), "getInvoiceEstimate");
        setInvoiceInfo(JSON.parse(data.message));
      }

      // else {
      //   // sethideSkeletonibl(true);
      // }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  console.log(invoiceInfo, "invoiceInfo");
  return (
    <SurfaceLayout currentPage={5} setBackgrd={true}>
      {/* Start Breadcrumbs Here */}
      <Breadcrumbs aria-label="breadcrumb">
        <Typography
          component="h4"
          variant="h5"
          align="left"
          color="#fff"
          fontSize={20}
          mt={3}
          className={styles.invoiceBreadcrumbs}
        >
          Invoice
        </Typography>
      </Breadcrumbs>
      {/* END Breadcrumbs Here */}
      {/* Start Breadcrumbs Skeleton Here */}
      <Stack spacing={1} sx={{ display: "none" }}>
        <Skeleton
          variant="text"
          animation="wave"
          width={200}
          height={25}
          sx={{ mt: "25px" }}
          className={styles.invoiceBreadcrumbs}
        />
      </Stack>
      {/* END Breadcrumbs Skeleton Here */}

      <Box className={styles.invoiceSar}>
        {/* Start Invoice SAR Card Design Here */}
        <Card
          className={styles.SarInvoiceCard}
          sx={{
            width: {
              lg: "450px",
              sm: "400px",
              md: "300px",
              xs: "300px",
              xl: "400px",
            },
          }}
        >
          <CardContent sx={{ padding: "10px" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                component="h4"
                variant="h5"
                align="center"
                color="#fff"
                fontSize={26}
              >
                {invoiceInfo.lastInvoice}
              </Typography>
              <Box color="#fff" fontSize={12} sx={{ mt: "12px", ml: "5px" }}>
                SAR
              </Box>
            </Box>
          </CardContent>
          <CardActions sx={{ bgcolor: "#878787", justifyContent: "center" }}>
            <Typography
              component="h4"
              variant="h5"
              align="center"
              color="#fff"
              fontSize={12}
            >
              Last Invoice
            </Typography>
          </CardActions>
        </Card>

        <Card
          className={`${styles.SarInvoiceCard} ${styles.SarAmountBg}`}
          //   sx={{ width: { lg: "200px", sm: "200px", md: "200px", xs: "100px" } }}
        >
          <CardContent sx={{ padding: "10px" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                component="h4"
                variant="h5"
                align="center"
                color="#fff"
                fontSize={26}
              >
                {invoiceInfo.pendingAmount}
              </Typography>
              <Box color="#fff" fontSize={12} sx={{ mt: "12px", ml: "5px" }}>
                SAR
              </Box>
            </Box>
          </CardContent>
          <CardActions sx={{ bgcolor: "#878787", justifyContent: "center" }}>
            <Typography
              component="h4"
              variant="h5"
              align="center"
              color="#fff"
              fontSize={12}
            >
              Pending Amount
            </Typography>
          </CardActions>
        </Card>
        {/* End Invoice SAR Card Design Here */}
        {/* Start Invoice SAR Card Skeleton Here */}
        <Box sx={{ display: "none" }}>
          <Skeleton
            variant="rounded"
            animation="wave"
            width={200}
            height={90}
            sx={{ mr: "15px", mt: "5px", borderRadius: "15px" }}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            width={200}
            height={90}
            sx={{ mr: "15px", mt: "5px", borderRadius: "15px" }}
          />
        </Box>
        {/* End Invoice SAR Card Skeleton Here */}
      </Box>

      <Card
        sx={{ mt: 8, borderRadius: "7px" }}
        className={styles.InvoiceTableCard}
      >
        <CardContent sx={{ padding: "24px" }}>
          {/* Start Invoice Table Design Here */}
          <Box>
            <InvoiceDataTable />
          </Box>
          {/* Start Invoice Table Design Here */}

          {/* Start Invoice Table Skeleton Here */}
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
                  <Table aria-label="simple table" sx={{ overflowX: "scroll" }}>
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
                            "&:last-child td, &:last-child th": { border: 0 },
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
          {/* End Invoice Table Skeleton Here */}
        </CardContent>
      </Card>
    </SurfaceLayout>
  );
}

export default Invoices;
