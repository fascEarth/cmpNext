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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PublicIPDataTable from "../../../../components/pages/surface/networks/publicips/PublicIPTable";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import Cookies from "js-cookie";
import axios from "axios";

// ** MUI ICON Components
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import CloseIcon from "@mui/icons-material/Close";

// ** Custom CSS
import styles from "./index.module.css";
import AddPublicIps from "../../../../components/pages/surface/networks/publicips/addPublicIps";
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

function PublicIP() {
  const { clientIP } = useClientIP();
  
  // ** Modal Popup Function
  const [Modalopen, setOpen] = React.useState(false);
  const [ctype, setCtype] = useState("");
  const handleClickOpen = () => {
    setCtype("add");
    if (!addBtnBlock) {
      setOpen(true);
    }
  };
  const [addBtnBlock, setAddBtnBlock] = useState(false);

  const [stcachdata, setstcachdata] = useState([]);
  const cookies = Cookies.get("userData");
  const [page, setPage] = useState(0);

  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;

    if (cachData) {
      setstcachdata(cachData);
      getAllItemStatus(cachData);
    }
  }, [cookies]);

  const [allocatedV, setAllocatedV] = useState("-");
  const [unAllocatedV, setUnAllocatedV] = useState("-");
  const [orderMapId, setorderMapId] = useState("");
  const [orderId, setorderId] = useState("");

  const getAllItemStatus = async (tdata) => {
    console.log(tdata);
    const newData = {
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getpublicipsStatus",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/publicips",
        finalData
      ); // call the new API route

      // console.log(data);
      if (data.status === "ok") {
        console.log(data.message);
        setAllocatedV(data.message.allocated);
        setUnAllocatedV(data.message.unallocated);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const [loadTableInfo, setloadTableInfo] = useState(true);

  return (
    <SurfaceLayout currentPage={11} setBackgrd={true}>
      {/* Start Breadcrumbs Here */}
      <Breadcrumbs aria-label="breadcrumb">
        <Typography
          component="h4"
          variant="h5"
          align="left"
          color="#fff"
          fontSize={20}
        >
          Public IPv4 Address
        </Typography>
      </Breadcrumbs>
      {/* END Breadcrumbs Here */}
      {/* Start Breadcrumbs Skeleton Here */}
      <Stack spacing={1} sx={{ display: "none" }}>
        <Skeleton variant="text" animation="wave" width={180} height={25} />
      </Stack>
      {/* END Breadcrumbs Skeleton Here */}

      <Card sx={{ mt: 2, borderRadius: "7px" }}>
        <CardContent sx={{ padding: "10px!important" }}>
          <Grid
            sx={{ mt: "0px", borderRadius: "7px" }}
            container
            direction="row"
            rowSpacing={2}
            spacing={2}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={3}
              xl={3}
              alignItems="center"
              justifyContent={"center"}
              display={"flex"}
              sx={{ paddingTop: "0!important" }}
            >
              <Typography
                component="h4"
                variant="h5"
                align="left"
                color="#015578"
                fontSize={18}
                fontWeight={450}
              >
                Current IP Allocation
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              lg={7}
              xl={7}
              alignItems="center"
              justifyContent={"center"}
              display={"flex"}
              sx={{ paddingTop: "0!important" }}
              className={styles.AllocateBorderRight}
            >
              <Card className={`${styles.AllocateCard} ${styles.AllocatedBg}`}>
                <CardContent sx={{ padding: "9px" }}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography
                      component="h4"
                      variant="h5"
                      align="center"
                      color="#fff"
                      fontSize={20}
                    >
                      {allocatedV}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions
                  sx={{
                    padding: "3px",
                    bgcolor: "#878787",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    component="h4"
                    variant="h5"
                    align="center"
                    color="#fff"
                    fontSize={12}
                  >
                    Allocated
                  </Typography>
                </CardActions>
              </Card>
              <Card className={styles.AllocateCard}>
                <CardContent sx={{ padding: "9px" }}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography
                      component="h4"
                      variant="h5"
                      align="center"
                      color="#fff"
                      fontSize={20}
                    >
                      {unAllocatedV}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions
                  sx={{
                    padding: "3px",
                    bgcolor: "#878787",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    component="h4"
                    variant="h5"
                    align="center"
                    color="#fff"
                    fontSize={12}
                  >
                    Unallocated
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={12}
              lg={2}
              xl={2}
              alignItems="center"
              justifyContent={"center"}
              display={"flex"}
              sx={{ paddingTop: "0!important" }}
            >
              <Button
                size="md"
                variant="solid"
                className={styles.OrderBtn}
                onClick={handleClickOpen}
                sx={{
                  textTransform: "capitalize",
                  cursor: addBtnBlock ? "not-allowed" : "pointer",
                }}
              >
                <AddTwoToneIcon fontSize="14px" />
                ORDER IP's
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <AddPublicIps
        orderMapId={orderMapId}
        orderId={orderId}
        ctype={ctype}
        loadTableInfo={loadTableInfo}
        setloadTableInfo={setloadTableInfo}
        stcachdata={stcachdata}
        Modalopen={Modalopen}
        setOpen={setOpen}
        page={page}
        setPage={setPage}
      />

      <Card
        sx={{ mt: 2, borderRadius: "7px" }}
        className={styles.InvoiceTableCard}
      >
        <CardContent sx={{ padding: "24px" }}>
          {/* Start Invoice Table Design Here */}
          <Box>
            <PublicIPDataTable
              loadTableInfo={loadTableInfo}
              setloadTableInfo={setloadTableInfo}
              setAddBtnBlock={setAddBtnBlock}
              orderMapId={orderMapId}
              setorderMapId={setorderMapId}
              orderId={orderId}
              setorderId={setorderId}
              Modalopen={Modalopen}
              setOpen={setOpen}
              ctype={ctype}
              setCtype={setCtype}
              page={page}
              setPage={setPage}
              getAllItemStatus={getAllItemStatus}
            />
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

export default PublicIP;
