// ** React Imports
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import useResizeObserver from "use-resize-observer";
import ReactECharts from "echarts-for-react";

// ** MUI Components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";

// ** MUI ICON Components

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
// ** Custom CSS
import styles from "./index.module.css";
import { useClientIP } from "../../../../../../../utils/context/ClientIPContext";

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

function convertUTCtoLocal(utcTimestamp) {
  const utcDate = new Date(utcTimestamp);
  const year = utcDate.getFullYear();
  const month = String(utcDate.getMonth() + 1).padStart(2, "0");
  const day = String(utcDate.getDate()).padStart(2, "0");
  const hour = String(utcDate.getHours()).padStart(2, "0");
  const minute = String(utcDate.getMinutes()).padStart(2, "0");
  const second = String(utcDate.getSeconds()).padStart(2, "0");

  const localDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

  return localDate;
}

const InFormatPercent = ({ value, type, digits = 2 }) => {
  if (value === 0 || value == null || value === undefined) {
    return <>{"0 %"}</>;
  }

  if (typeof value === "number" && !isNaN(value)) {
    if (!Number.isInteger(value)) {
      value = value.toFixed(2);
    }
  } else {
    if (typeof value === "string") {
      value = parseFloat(value);
    }
  }

  return <>{`${value} %`}</>;
};

const InFormatOrderNum = ({ num, type, digits = 0 }) => {
  digits = 2;

  if (num === 0 || num == null || num === undefined) {
    return <>{0}</>;
  }

  const si = [
    { value: 1e-24, symbol: "" },
    { value: 1e-21, symbol: "z" },
    { value: 1e-18, symbol: "a" },
    { value: 1e-15, symbol: "f" },
    { value: 1e-12, symbol: "p" },
    { value: 1e-9, symbol: "n" },
    { value: 1e-6, symbol: "µ" },
    { value: 1e-3, symbol: "m" },
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
    { value: 1e21, symbol: "Z" },
    { value: 1e24, symbol: "Y" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

  let i;

  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }

  const final =
    (num / si[i].value).toFixed(digits).replace(rx, "$1") + " " + si[i].symbol;

  return <>{final}</>;
};
const InFormatBitsDtransferRate = ({ bytes, type, decimals }) => {
  let dm = 2; // Declare dm using let and set a default value

  if (bytes === 0 || bytes == null || bytes === undefined) {
    return <>{"0 bps"}</>;
  }

  bytes = bytes * 8;

  if (bytes === 0) return <>{"0 bps"}</>;

  const k = 1000;
  // dm can now be modified because it's declared with let

  if (decimals <= 0) {
    dm = 0;
  } else if (decimals !== undefined) {
    dm = decimals;
  }

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

  if (sizes[i] === "Kbps" || sizes[i] === "bps") {
    dm = 0;
  }

  sizes[i] = sizes[i] || "";

  const final = (bytes / Math.pow(k, i)).toFixed(dm) + " " + sizes[i];

  return <>{final}</>;
};

function MinstanceDetailUsageGraphs(sslugId) {
  const { clientIP } = useClientIP();

  const [scachdata, setscachdata] = useState([]);
  const cookies = Cookies.get("userData");

  const slugId = sslugId.sslugId;

  useEffect(() => {
    console.log("coming");
    const cachData = cookies ? JSON.parse(cookies) : false;

    if (cachData && slugId) {
      console.log("coming");
      setscachdata(cachData);
      loadAllUsageGraphs(cachData, "24h");
    }
  }, [cookies, slugId]);

  const xAxisLabel = {
    formatter: function (value, index) {
      const date = new Date(value);
      // You can format the time axis labels as per your requirement
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours}:${minutes}`;
    },
    showMinLabel: true, // Show the minimum label (e.g., the start time)
    showMaxLabel: true, // Show the maximum label (e.g., the end time)
    show: true, // Show the axis labels

    interval: "auto", // Automatically adjust the interval based on the chart width
  };

  // ** Echarts Function
  const option = {
    tooltip: {
      trigger: "axis",
    },
    /*grid: {
      left: '5%', // Adjust the left margin
      right: '5%', // Adjust the right margin
      top: '10%', // Adjust the top margin
      bottom: '10%', // Adjust the bottom margin
    },*/
    xAxis: [
      {
        type: "time",
        boundaryGap: true,
        show: true,
        splitLine: {
          show: true,
        },
        axisLabel: {
          formatter: function (value, index) {
            const date = new Date(value);
            // You can format the time axis labels as per your requirement
            const hours = date.getHours();
            const minutes = date.getMinutes();
            return `${hours}:${minutes}`;
          },
          showMinLabel: true, // Show the minimum label (e.g., the start time)
          showMaxLabel: true, // Show the maximum label (e.g., the end time)
          show: true, // Show the axis labels

          interval: "auto", // Automatically adjust the interval based on the chart width
        },
      },
    ],
    yAxis: {
      type: "value",
      alignTicks: true,
      splitLine: {
        show: true,
      },
      axisLabel: {
        interval: "auto", // Automatically adjust the interval based on the chart width
      },
    },
    series: [
      {
        smooth: 0.6,
        symbol: "none",
        lineStyle: { color: "#da6cde" },
        name: "avg",
        type: "line",
        showSymbol: false,
        data: [
          ["2022-09-01 15:15:00", 0],
          ["2022-09-01 15:30:00", 0],
        ],
      },
    ],
  };

  const [loadMultipleGraphs, setloadMultipleGraphs] = useState([
    {
      option: option,
      endPoint: "getusageavgcpu",
      show: false,
      label: "Average CPU Usage (%)",
      tooltipLabel: "CPU Average",
      receivedLabel: "cpu_usage_average",
    },
    {
      option: option,
      endPoint: "getusagemaxcpu",
      show: false,
      label: "Maximum CPU Usage (%)",
      tooltipLabel: "CPU Maximum",
      receivedLabel: "cpu_usage_maximum",
    },
    {
      option: option,
      endPoint: "getusageavgcpumhz",
      show: false,
      label: "Average CPU Usage (MHz)",
      tooltipLabel: "CPU MHz Average",
      receivedLabel: "cpu_usagemhz_average",
    },
    {
      option: option,
      endPoint: "getusageavgmemory",
      show: false,
      label: "Average Memory Usage (%)",
      tooltipLabel: "Memory Average",
      receivedLabel: "mem_usage_average",
    },
    {
      option: option,
      endPoint: "getusageavgreadspeed",
      show: false,
      label: "Average Read Speed (KBPS)",
      tooltipLabel: "Disk R average",
      receivedLabel: "disk_read_average",
    },
    {
      option: option,
      endPoint: "getusageavgwritespeed",
      show: false,
      label: "Average Write Speed (KBPS)",
      tooltipLabel: "Disk W average",
      receivedLabel: "disk_write_average",
    },
  ]);

  const defaultUnitf = {
    PERCENT: "inFormatPercent",
    MHz: "inFormatOrderNum",
    KBPS: "inFormatBitsDtransferRate",
  };
  const [selectedValue, setSelectedValue] = useState("24h");

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    console.log(newValue);
    /* if(newValue === "1h"){
        console.log("coming")
        xAxisLabel.rotate = 45;
      }*/
    setSelectedValue(newValue);
    // Call loadAllUsageGraphs with the selected value
    loadAllUsageGraphs(scachdata, newValue);
  };

  const loadAllUsageGraphs = async (tdata, time) => {
    try {
      const updatedLoadMultipleGraphs = await Promise.all(
        loadMultipleGraphs.map(async (item) => {
          const newData = {
            filterTime: time,
            endPoint: item.endPoint,
            tenantvmid: slugId,
            tenantId: tdata.tenant_id,
            userSerialId: tdata.user_serial_id,
            ipaddress: clientIP,
          };

          const finalData = {
            data: newData,
            endPoint: "getAllUsagegraphs",
            token: tdata.accessToken,
          };

          const { data } = await axios.post(
            "/api/surface/clouds/elasticins/manage/detail",
            finalData
          );

          if (data.status === "ok" && data.message.data) {
            // Map the existing loadMultipleGraphs array to a new array with updated items
            return {
              ...item,
              show: true,
              option: {
                ...item.option,
                xAxis: [
                  {
                    ...item.option.xAxis[0],
                    axisLabel: {
                      ...item.option.xAxis[0].axisLabel,
                      rotate: time === "1h" && 45,
                    },
                  },
                ],
                series: [
                  {
                    ...item.option.series[0],
                    name: item.tooltipLabel,
                    data: data.message.data.map((ielem) => {
                      ielem.time = convertUTCtoLocal(ielem.time);
                      return [ielem.time, ielem[item.receivedLabel]];
                    }),
                  },
                ],
              },
            };
          }

          // If the API request fails or data is not available, return the item as is
          return item;
        })
      );

      setloadMultipleGraphs(updatedLoadMultipleGraphs);
    } catch (error) {
      console.error("An error occurred", error);
      // Handle error or display a toast message here
    }
  };

  return (
    <>
      <Box>
        <Box sx={{ position: "relative" }}>
          <Typography component="p" variant="p" color={"#6b6f82"} align="left">
            Virtual machine performance and resource consumption.
          </Typography>
          <Box className={styles.UsageSelectContainer}>
            <ModalFormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">
                Select your option
              </InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                label="Select your option"
                MenuProps={MenuProps}
                onChange={handleSelectChange}
                value={selectedValue} // Make sure to set the value to the state variable
              >
                <MenuItem value={"1h"}>Last 1 Hour</MenuItem>
                <MenuItem selected value={"24h"}>
                  Last 24 Hours
                </MenuItem>
                <MenuItem value={"7d"}>Last 7 Days</MenuItem>
                <MenuItem value={"30d"}>Last 30 Days</MenuItem>
              </Select>
            </ModalFormControl>
          </Box>
        </Box>
        <Grid
          sx={{ mt: "10px", borderRadius: "7px" }}
          container
          direction="row"
          rowSpacing={2}
          spacing={2}
        >
          {loadMultipleGraphs &&
            loadMultipleGraphs.map(function (elem, index) {
              if (elem.show) {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    sx={{ paddingTop: "0!important" }}
                    key={index}
                  >
                    <Card
                      sx={{ mt: 2, borderRadius: "7px" }}
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
                            {elem.label}
                          </Typography>
                        }
                      />
                      <CardContent sx={{ padding: "24px" }}>
                        <ReactECharts
                          key={index}
                          option={elem.option}
                          style={{ width: "100%", height: "250px" }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                );
              } else {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    sx={{ paddingTop: "0!important" }}
                    key={index}
                  >
                    <Card
                      sx={{ mt: 2, borderRadius: "7px" }}
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
                        <Skeleton
                          key={index}
                          variant="rounded"
                          animation="wave"
                          width={"100%"}
                          height={250}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                );
              }
            })}
        </Grid>
      </Box>

      {/* Start Usage Graphs Skeleton Here */}

      <Box hidden>
        <Box sx={{ position: "relative" }}>
          <Typography component="p" variant="p" color={"#6b6f82"} align="left">
            <Skeleton
              variant="text"
              animation="wave"
              width={"45%"}
              height={25}
            />{" "}
          </Typography>
          <Box className={styles.UsageSelectContainer}>
            <Skeleton
              variant="rounded"
              animation="wave"
              width={250}
              height={25}
            />
          </Box>
        </Box>
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
            md={6}
            lg={6}
            xl={6}
            sx={{ paddingTop: "0!important" }}
          >
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
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={"100%"}
                  height={250}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={{ paddingTop: "0!important" }}
          >
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
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={"100%"}
                  height={250}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={{ paddingTop: "0!important" }}
          >
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
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={"100%"}
                  height={250}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={{ paddingTop: "0!important" }}
          >
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
                    />{" "}
                  </Typography>
                }
              />
              <CardContent sx={{ padding: "24px" }}>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={"100%"}
                  height={250}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={{ paddingTop: "0!important" }}
          >
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
                    />{" "}
                  </Typography>
                }
              />
              <CardContent sx={{ padding: "24px" }}>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={"100%"}
                  height={250}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={{ paddingTop: "0!important" }}
          >
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
                    />{" "}
                  </Typography>
                }
              />
              <CardContent sx={{ padding: "24px" }}>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={"100%"}
                  height={250}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Start Usage Graphs Skeleton Here */}
    </>
  );
}

export default MinstanceDetailUsageGraphs;
