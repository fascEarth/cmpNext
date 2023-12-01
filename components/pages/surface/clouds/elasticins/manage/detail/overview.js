// ** React Imports
import * as React from "react";
import { useState, useEffect } from "react";

// ** MUI Components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

// ** MUI ICON Components

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
// ** Custom CSS
import styles from "./index.module.css";
import { useClientIP } from "../../../../../../../utils/context/ClientIPContext";

// ** Linear Progress CSS
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 7,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 7,
    backgroundImage: "linear-gradient(45deg,#43a047,#1de9b6)!important",
  },
}));

function MinstanceDetailOverview(sslugId) {
  const { clientIP } = useClientIP();

  const [scachdata, setscachdata] = useState([]);
  const cookies = Cookies.get("userData");

  const slugId = sslugId.sslugId;

  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : false;

    if (cachData && slugId) {
      setscachdata(cachData);
      loadAllOverview(cachData);
    }
  }, [cookies, slugId]);
  const loadAllOverview = async (tdata) => {
    fetchOverviewcpumem(tdata);
    fetchOverviewstorageused(tdata);
    fetchOverviewavgdisk(tdata);
  };

  const [openOverviewCpuMem, setopenOverviewCpuMem] = useState(false);
  const [openOverviewStorageUsed, setopenOverviewStorageUsed] = useState(false);
  const [openOverviewAvgDisk, setopenOverviewAvgDisk] = useState(false);

  const [dataOverviewCpuMem, setdataOverviewCpuMem] = useState({});
  const [dataOverviewStorageUsed, setdataOverviewStorageUsed] = useState({});
  const [dataOverviewAvgDisk, setdataOverviewAvgDisk] = useState({});

  const fetchOverviewcpumem = async (tdata) => {
    const newData = {
      tenantvmid: slugId,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getOverviewCpuMemInfo",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/detail",
        finalData
      ); // call the new API route

      if (data.status === "ok") {
        setdataOverviewCpuMem(data.message);
        setopenOverviewCpuMem(true);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const [provisPerc, setprovisPerc] = useState(0);
  const [provisPercGr, setprovisPercGr] = useState(0);
  const fetchOverviewstorageused = async (tdata) => {
    const newData = {
      tenantvmid: slugId,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getoverviewstorageused",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/detail",
        finalData
      ); // call the new API route

      if (data.status === "ok") {
        const provis = inFormatKBitsDstorageRateVolume(
          data.message.data.disk_provisioned_latest
        );
        setprovisPerc(provis);
        if (
          !data.message.data.disk_provisioned_latest ||
          data.message.data.disk_provisioned_latest == "-"
        ) {
          setprovisPerc(0);
        }
        const cperc = 100;
        const perct =
          (data.message.data.disk_used_latest /
            data.message.data.disk_provisioned_latest) *
          100;

        setprovisPercGr(perct);

        setdataOverviewStorageUsed(data.message);
        setopenOverviewStorageUsed(true);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const [avgReadDisk, setavgReadDisk] = useState(0);
  const [avgWriteDisk, setavgWriteDisk] = useState(0);

  const fetchOverviewavgdisk = async (tdata) => {
    const newData = {
      tenantvmid: slugId,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getoverviewavgdisk",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/clouds/elasticins/manage/detail",
        finalData
      ); // call the new API route

      if (data.status === "ok") {
        setavgReadDisk(
          formatBitsDtransferRateLabelOnly(data.message.data.disk_read_average)
        );
        setavgWriteDisk(
          formatBitsDtransferRateLabelOnly(data.message.data.disk_write_average)
        );

        setdataOverviewAvgDisk(data.message);
        setopenOverviewAvgDisk(true);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const [bytes, setBytes] = useState(0);
  const [decimals, setDecimals] = useState(2);

  const inFormatKBitsDstorageRateVolume = (bytes, decimals) => {
    if (bytes == 0 || bytes == null || bytes == undefined) {
      return "0 B";
    }

    bytes = bytes * 1000;
    decimals = 2;

    if (bytes == 0) return "0 B";
    const k = 1000;
    let dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    if (sizes[i] === "KB" || sizes[i] === "B") {
      dm = 0;
    }
    sizes[i] = sizes[i] || "";
    const final = (bytes / Math.pow(k, i)).toFixed(dm) + " " + sizes[i];

    return final;
  };

  const formatBitsDtransferRateLabelOnly = (bytes, decimals) => {
    bytes = bytes * 8;
    bytes = Math.round(bytes);
    decimals = 2;

    if (bytes == 0) return "";

    const k = 1000;
    let dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = [
      "bps",
      "Kbps",
      "Mbps",
      "Gbps",
      "Tbps",
      "Pbps",
      "Ebps",
      "Zbps",
      "Ybps",
    ];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    if (sizes[i] == "Kbps" || sizes[i] == "bps") {
      dm = 0;
    }

    return sizes[i];
  };

  return (
    <>
      <Box>
        <Typography component="p" variant="p" color={"#6b6f82"} align="left">
          Current usage of virtual machine performance and resource consumption.
        </Typography>
        {openOverviewCpuMem && (
          <Card sx={{ mt: 2, borderRadius: "7px" }} variant="outlined">
            <CardHeader
              sx={{ borderBottom: "1px solid #ccc", padding: "15px" }}
              title={
                <Typography
                  component="h4"
                  variant="h5"
                  align="left"
                  fontSize={16}
                  sx={{ fontWeight: "500" }}
                >
                  CPU & Memory
                </Typography>
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
                  md={3}
                  lg={3}
                  xl={3}
                  sx={{ paddingTop: "0!important" }}
                >
                  <Box
                    component="div"
                    className={`${styles.CircleContainer} ${styles.BgBlue}`}
                  >
                    <Box component="div" className={styles.CircleInner}>
                      {dataOverviewCpuMem.data.cpu_usage_avg
                        ? dataOverviewCpuMem.data.cpu_usage_avg
                        : "-"}{" "}
                      <Box className={styles.Percentage}>%</Box>
                    </Box>
                  </Box>
                  <Typography
                    component="h4"
                    variant="h5"
                    align="center"
                    fontSize={16}
                    color={"#8287AB"}
                    className={styles.CircleHeading}
                  >
                    Average CPU
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={3}
                  xl={3}
                  sx={{ paddingTop: "0!important" }}
                >
                  <Box
                    component="div"
                    className={`${styles.CircleContainer} ${styles.BgOrange}`}
                  >
                    <Box component="div" className={styles.CircleInner}>
                      {dataOverviewCpuMem.data.cpu_usage_max
                        ? dataOverviewCpuMem.data.cpu_usage_max
                        : "-"}{" "}
                      <Box className={styles.Percentage}>%</Box>
                    </Box>
                  </Box>
                  <Typography
                    component="h4"
                    variant="h5"
                    align="center"
                    fontSize={16}
                    color={"#8287AB"}
                    className={styles.CircleHeading}
                  >
                    Maximum CPU
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={3}
                  xl={3}
                  sx={{ paddingTop: "0!important" }}
                >
                  <Box
                    component="div"
                    className={`${styles.CircleContainer} ${styles.BgPurple}`}
                  >
                    <Box component="div" className={styles.CircleInner}>
                      {dataOverviewCpuMem.data.cpu_usagemhz_avg
                        ? dataOverviewCpuMem.data.cpu_usagemhz_avg
                        : "-"}{" "}
                      <Box className={styles.Percentage}>Mhz</Box>
                    </Box>
                  </Box>
                  <Typography
                    component="h4"
                    variant="h5"
                    align="center"
                    fontSize={16}
                    color={"#8287AB"}
                    className={styles.CircleHeading}
                  >
                    Average CPU (Mhz)
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={3}
                  xl={3}
                  sx={{ paddingTop: "0!important" }}
                >
                  <Box
                    component="div"
                    className={`${styles.CircleContainer} ${styles.BgGreen}`}
                  >
                    <Box component="div" className={styles.CircleInner}>
                      {dataOverviewCpuMem.data.mem_usage_avg
                        ? dataOverviewCpuMem.data.mem_usage_avg
                        : "-"}{" "}
                      <Box className={styles.Percentage}>%</Box>
                    </Box>
                  </Box>
                  <Typography
                    component="h4"
                    variant="h5"
                    align="center"
                    fontSize={16}
                    color={"#8287AB"}
                    className={styles.CircleHeading}
                  >
                    Average Memory
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        <Grid
          sx={{ mt: "0px", borderRadius: "7px" }}
          container
          direction="row"
          rowSpacing={2}
          spacing={2}
        >
          {openOverviewStorageUsed && (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              sx={{ paddingTop: "0!important" }}
            >
              <Card
                sx={{ mt: 2, borderRadius: "7px", height: "250px" }}
                variant="outlined"
              >
                <CardHeader
                  sx={{ borderBottom: "1px solid #ccc", padding: "15px" }}
                  title={
                    <Typography
                      component="h4"
                      variant="h5"
                      align="left"
                      fontSize={16}
                      sx={{ fontWeight: "500" }}
                    >
                      Storage Provisioned
                    </Typography>
                  }
                />
                <CardContent sx={{ padding: "24px" }}>
                  <Box
                    className={styles.DiskProvisioned}
                    sx={{ padding: "30px 50px" }}
                  >
                    <Typography
                      component="h4"
                      variant="h5"
                      align="left"
                      fontSize={14}
                      mb={2}
                      sx={{ fontWeight: "500", color: "#6C6C6C" }}
                    >
                      Disk Provisioned
                    </Typography>
                    <BorderLinearProgress
                      variant="determinate"
                      value={provisPercGr}
                    />
                    <Typography
                      component="h4"
                      variant="h5"
                      align="right"
                      fontSize={18}
                      mt={2}
                      sx={{ fontWeight: "500" }}
                    >
                      {provisPerc}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
          {openOverviewAvgDisk && (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              sx={{ paddingTop: "0!important" }}
            >
              <Card
                sx={{ mt: 2, borderRadius: "7px", height: "250px" }}
                className={styles.StorageProvisioned}
                variant="outlined"
              >
                <CardHeader
                  sx={{ borderBottom: "1px solid #ccc", padding: "15px" }}
                  title={
                    <Typography
                      component="h4"
                      variant="h5"
                      align="left"
                      fontSize={16}
                      sx={{ fontWeight: "500" }}
                    >
                      Average Disk Read / Write (KBps)
                    </Typography>
                  }
                />
                <CardContent sx={{ padding: "24px" }}>
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
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      sx={{ paddingTop: "0!important" }}
                    >
                      <Box
                        className={`${styles.AverageBox} ${styles.BoxBgOrange}`}
                      >
                        <Box className={styles.BoxInner}>
                          {avgReadDisk ? avgReadDisk : 0}{" "}
                        </Box>
                      </Box>
                      <Typography
                        component="h4"
                        variant="h5"
                        align="center"
                        fontSize={16}
                        mt={2}
                        color={"#8287AB"}
                      >
                        Average Read Speed
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      sx={{ paddingTop: "0!important" }}
                    >
                      <Box
                        className={`${styles.AverageBox} ${styles.BoxBgGreen}`}
                      >
                        <Box className={styles.BoxInner}>
                          {avgWriteDisk ? avgWriteDisk : 0}{" "}
                        </Box>
                      </Box>
                      <Typography
                        component="h4"
                        variant="h5"
                        align="center"
                        fontSize={16}
                        mt={2}
                        color={"#8287AB"}
                      >
                        Average Write Speed
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Start Overview Skeleton Here */}

      <Box>
        {!openOverviewCpuMem && (
          <>
            <Skeleton
              variant="text"
              animation="wave"
              width={"60%"}
              height={25}
            />

            <Card sx={{ mt: 2, borderRadius: "7px" }} variant="outlined">
              <CardHeader
                sx={{ borderBottom: "1px solid #ccc", padding: "15px" }}
                title={
                  <Typography
                    component="h4"
                    variant="h5"
                    align="left"
                    fontSize={16}
                    sx={{ fontWeight: "500" }}
                  >
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={150}
                      height={25}
                    />
                  </Typography>
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
                    md={3}
                    lg={3}
                    xl={3}
                    sx={{ paddingTop: "0!important" }}
                  >
                    <Box
                      component="div"
                      className={`${styles.CircleContainer}`}
                    >
                      <Box component="div" className={styles.CircleInner}>
                        <Skeleton
                          variant="circular"
                          animation="wave"
                          width={125}
                          height={125}
                        />
                      </Box>
                    </Box>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={"60%"}
                      height={25}
                      className={styles.CircleHeading}
                      sx={{ margin: "0 auto" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    lg={3}
                    xl={3}
                    sx={{ paddingTop: "0!important" }}
                  >
                    <Box
                      component="div"
                      className={`${styles.CircleContainer}`}
                    >
                      <Box component="div" className={styles.CircleInner}>
                        <Skeleton
                          variant="circular"
                          animation="wave"
                          width={125}
                          height={125}
                        />
                      </Box>
                    </Box>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={"60%"}
                      height={25}
                      className={styles.CircleHeading}
                      sx={{ margin: "0 auto" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    lg={3}
                    xl={3}
                    sx={{ paddingTop: "0!important" }}
                  >
                    <Box
                      component="div"
                      className={`${styles.CircleContainer}`}
                    >
                      <Box component="div" className={styles.CircleInner}>
                        <Skeleton
                          variant="circular"
                          animation="wave"
                          width={125}
                          height={125}
                        />
                      </Box>
                    </Box>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={"60%"}
                      height={25}
                      className={styles.CircleHeading}
                      sx={{ margin: "0 auto" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    lg={3}
                    xl={3}
                    sx={{ paddingTop: "0!important" }}
                  >
                    <Box
                      component="div"
                      className={`${styles.CircleContainer}`}
                    >
                      <Box component="div" className={styles.CircleInner}>
                        <Skeleton
                          variant="circular"
                          animation="wave"
                          width={125}
                          height={125}
                        />
                      </Box>
                    </Box>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={"60%"}
                      height={25}
                      className={styles.CircleHeading}
                      sx={{ margin: "0 auto" }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </>
        )}
        <Grid
          sx={{ mt: "0px", borderRadius: "7px" }}
          container
          direction="row"
          rowSpacing={2}
          spacing={2}
        >
          {!openOverviewStorageUsed && (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              sx={{ paddingTop: "0!important" }}
            >
              <Card
                sx={{ mt: 2, borderRadius: "7px", height: "250px" }}
                variant="outlined"
              >
                <CardHeader
                  sx={{ borderBottom: "1px solid #ccc", padding: "15px" }}
                  title={
                    <Typography
                      component="h4"
                      variant="h5"
                      align="left"
                      fontSize={16}
                      sx={{ fontWeight: "500" }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width={150}
                        height={25}
                      />
                    </Typography>
                  }
                />
                <CardContent sx={{ padding: "24px" }}>
                  <Box
                    className={styles.DiskProvisioned}
                    sx={{ padding: "30px 50px" }}
                  >
                    <Typography
                      component="h4"
                      variant="h5"
                      align="left"
                      fontSize={14}
                      mb={2}
                      sx={{ fontWeight: "500", color: "#6C6C6C" }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width={100}
                        height={25}
                      />
                    </Typography>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={"100%"}
                      height={25}
                    />
                    <Typography
                      component="h4"
                      variant="h5"
                      align="right"
                      fontSize={18}
                      mt={2}
                      sx={{ fontWeight: "500" }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width={100}
                        height={25}
                        sx={{ float: "right" }}
                      />
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
          {!openOverviewAvgDisk && (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              sx={{ paddingTop: "0!important" }}
            >
              <Card
                sx={{ mt: 2, borderRadius: "7px", height: "250px" }}
                className={styles.StorageProvisioned}
                variant="outlined"
              >
                <CardHeader
                  sx={{ borderBottom: "1px solid #ccc", padding: "15px" }}
                  title={
                    <Typography
                      component="h4"
                      variant="h5"
                      align="left"
                      fontSize={16}
                      sx={{ fontWeight: "500" }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width={150}
                        height={25}
                      />
                    </Typography>
                  }
                />
                <CardContent sx={{ padding: "24px" }}>
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
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      sx={{ paddingTop: "0!important" }}
                    >
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={150}
                        height={100}
                        sx={{ margin: "0 auto" }}
                      />
                      <Typography
                        component="h4"
                        variant="h5"
                        align="center"
                        fontSize={16}
                        mt={2}
                        color={"#8287AB"}
                      >
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={150}
                          height={25}
                          sx={{ margin: "0 auto" }}
                        />
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      sx={{ paddingTop: "0!important" }}
                    >
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={150}
                        height={100}
                        sx={{ margin: "0 auto" }}
                      />
                      <Typography
                        component="h4"
                        variant="h5"
                        align="center"
                        fontSize={16}
                        mt={2}
                        color={"#8287AB"}
                      >
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width={150}
                          height={25}
                          sx={{ margin: "0 auto" }}
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* End Overview Skeleton Here */}
    </>
  );
}

export default MinstanceDetailOverview;
