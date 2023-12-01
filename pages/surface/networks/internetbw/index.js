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
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

// ** Custom CSS
import styles from "./index.module.css";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

// TR 01 MUI icon import
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useClientIP } from "../../../../utils/context/ClientIPContext";
// FormControl Custom Style
const CustomFormControl = styled(FormControl)({
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

function InternetBandWidth() {
  const { clientIP } = useClientIP();
  const [hideSkeletonibl, sethideSkeletonibl] = useState(false);
  const cookies = Cookies.get("userData");

  // TR 01 role name
  const [roleName, setRoleName] = useState();
  const [stcachData, setstcachData] = useState([]);
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;
    setRoleName(cachData.role_name);
    setstcachData(cachData);
    if (cookies) {
      fetchData(cachData);
    }
  }, [cookies]);
  //   TR 01 state for loading btn

  const [isloading, setIsloading] = useState(false);

  const [selectedBand, setselectedBand] = useState("");
  const [selectedBandData, setselectedBandData] = useState("");
  const [allData, setallData] = useState([]);

  // TR 01 for get the default band value

  let defaultBandValue = allData.list;
  const defaultValueObject = allData.list?.find(
    (item) => item.id === allData.defaultId
  );

  const defaultValue = defaultValueObject ? defaultValueObject.value : null;
  const [updatedBand, setUpdatedBand] = useState(
    defaultValue ? defaultValue : ""
  );
  const [defaultUpdatedBandValue, setdefaultUpdatedBandValue] = useState("");
  console.log(defaultUpdatedBandValue, "defaultUpdatedBandValue");
  const fetchData = async (tdata) => {
    const newData = {
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getalliblInfo",
      token: tdata.accessToken,
    };

    try {
      const { data } = await axios.post(
        "/api/surface/networks/internetbw",
        finalData
      ); // call the new API route

      console.log(data)
      if (data.status === "ok") {
        // setUpdatedBand(data.message.defaultId)
        setdefaultUpdatedBandValue(data.message.defaultId + " Mbps");
        setallData(data.message);
        applyData(data.message, data.message.defaultId);
        sethideSkeletonibl(true);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };
  const [particularData, setparticularData] = useState({});
  const applyData = async (cdata, partId) => {
    const fdata = cdata ? cdata : allData;

    fdata.list.map(function (elem) {
      if (elem.id === partId) {
        setparticularData(elem);
        setselectedBand(elem.value);
        setselectedBandData(elem.data);
        return;
      }
    });
  };

  // ******  TR 01  band value state for validation ******
  const [bandValue, setBandValue] = useState([]);
  const [changedBandvalue, setChangedBandValue] = useState("");

  // TR 01 on data sumbit
  const onSubmit = () => {
    setIsloading(true);
    if (bandValue.includes(changedBandvalue)) {
      setIsloading(false);
      toast.error(" Band width value already exist");
      return;
    }
    /*const cachData = cookies ? JSON.parse(cookies) : true;
    if (cookies) {
      fetchData(cachData);
    }*/
    updateData();
  };

  // END OF TR 01 on data sumbit

  const updateData = async () => {
    const tdata = stcachData;

    const newData = {
      band: particularData,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "updateiblInfo",
      token: tdata.accessToken,
    };

    try {
      const { config, data } = await axios.post(
        "/api/surface/networks/internetbw",
        finalData
      ); // call the new API route
      console.log(config)
      if(data.status_code == "9000"){
        // TR 01 for storing the submited band with value
      const parsedObject = JSON.parse(config.data);
      const bandValue = parsedObject.data.band.id;
      const updatedbandValue = parsedObject.data.band.value;
      setBandValue((prevData) => [...prevData, bandValue]);
      setUpdatedBand(updatedbandValue);
      setIsloading(false); // TR 01
      toast.success("Success");

      fetchData(stcachData);
      }
      

    } catch (error) {
      setIsloading(false); // TR 01
      toast.error("An error occurred");
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setChangedBandValue(evt.target.value);
    applyData(allData, value);
  };
  return (
    <SurfaceLayout currentPage={3} setBackgrd={true}>
      {/* Start Breadcrumbs Here */}
      {hideSkeletonibl && (
        <Breadcrumbs aria-label="breadcrumb">
          <Typography
            component="h4"
            variant="h5"
            align="left"
            color="#fff"
            fontSize={20}
          >
            Internet Bandwidth
          </Typography>
        </Breadcrumbs>
      )}
      {/* END Breadcrumbs Here */}
      {/* Start Breadcrumbs Skeleton Here */}
      {!hideSkeletonibl && (
        <Stack spacing={1}>
          <Skeleton variant="text" animation="wave" width={180} height={25} />
        </Stack>
      )}
      {/* END Breadcrumbs Skeleton Here */}

      {/* Start Top Card design Here */}
      {hideSkeletonibl && (
        <Card sx={{ mt: 2, borderRadius: "7px" }}>
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
                alignItems="center"
                justifyContent={"center"}
                display={"flex"}
                sx={{ paddingTop: "0!important" }}
                className={styles.BandwidthHeader}
              >
                <Typography
                  component="h4"
                  variant="h5"
                  color="#015578"
                  fontSize={22}
                  fontWeight={450}
                  className={styles.responsiveText} // TR01
                >
                  Current Subscribed Bandwidth
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                alignItems="center"
                justifyContent={"center"}
                display={"flex"}
                sx={{ paddingTop: "0!important" }}
              >
                <Grid container direction="row" rowSpacing={2} spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Grid
                      container
                      direction="row"
                      rowSpacing={2}
                      spacing={2}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Box
                          component="img"
                          width={50}
                          height={50}
                          align="center"
                          alt="upload"
                          src="/images/pages/surface/networks/internetbw/upload.png"
                          sx={{ display: "block", margin: "0 auto" }}
                        />
                        <Typography
                          component="h4"
                          variant="h5"
                          align="center"
                          color="#9A9A9A"
                          fontSize={16}
                          mt={1}
                          fontWeight={420}
                        >
                          Upload
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Typography
                          component="h4"
                          variant="h5"
                          align="center"
                          color="#6A6A6A"
                          fontSize={20}
                          fontWeight={450}
                          className={styles.responsiveText} // TR01
                        >
                          {updatedBand ? updatedBand : defaultValue}
                          {/* {selectedBand} */}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Grid
                      container
                      direction="row"
                      rowSpacing={2}
                      spacing={2}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Box
                          component="img"
                          width={50}
                          height={50}
                          align="center"
                          alt="upload"
                          src="/images/pages/surface/networks/internetbw/download.png"
                          sx={{ display: "block", margin: "0 auto" }}
                        />
                        <Typography
                          component="h4"
                          variant="h5"
                          align="center"
                          color="#9A9A9A"
                          fontSize={16}
                          mt={1}
                          fontWeight={420}
                        >
                          Download
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Typography
                          component="h4"
                          variant="h5"
                          align="center"
                          color="#6A6A6A"
                          fontSize={20}
                          fontWeight={450}
                          className={styles.responsiveText} // TR01
                        >
                          {updatedBand ? updatedBand : defaultValue}
                          {/* {selectedBand} */}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      {/* End Top Card design Here */}
      {/* Start Top Card Skeleton design Here */}
      {!hideSkeletonibl && (
        <Card sx={{ mt: 2, borderRadius: "7px" }}>
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
                alignItems="center"
                justifyContent={"center"}
                display={"flex"}
                sx={{ paddingTop: "0!important" }}
                className={styles.BandwidthHeader}
              >
                <Typography
                  component="h4"
                  variant="h5"
                  color="#015578"
                  fontSize={22}
                  fontWeight={450}
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={250}
                    height={25}
                  />
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                alignItems="center"
                justifyContent={"center"}
                display={"flex"}
                sx={{ paddingTop: "0!important" }}
              >
                <Grid container direction="row" rowSpacing={2} spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Grid
                      container
                      direction="row"
                      rowSpacing={2}
                      spacing={2}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Skeleton
                          variant="circular"
                          animation="wave"
                          width={50}
                          height={50}
                          sx={{ margin: "0 auto" }}
                        />
                        <Typography
                          component="h4"
                          variant="h5"
                          align="center"
                          mt={1}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={80}
                            height={25}
                            sx={{ margin: "0 auto" }}
                          />
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Typography component="h4" variant="h5" align="center">
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={80}
                            height={25}
                            sx={{ margin: "0 auto" }}
                          />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Grid
                      container
                      direction="row"
                      rowSpacing={2}
                      spacing={2}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Skeleton
                          variant="circular"
                          animation="wave"
                          width={50}
                          height={50}
                          sx={{ margin: "0 auto" }}
                        />
                        <Typography
                          component="h4"
                          variant="h5"
                          align="center"
                          mt={1}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={80}
                            height={25}
                            sx={{ margin: "0 auto" }}
                          />
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Typography component="h4" variant="h5" align="center">
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={80}
                            height={25}
                            sx={{ margin: "0 auto" }}
                          />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      {/* End Top Card Skeleton design Here */}

      {/* Start Internet Bandwidth Skeleton design Here */}
      {hideSkeletonibl && (
        <Card sx={{ mt: 2, borderRadius: "7px" }}>
          <CardContent sx={{ padding: "24px" }}>
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
                sm={8}
                md={6}
                lg={6}
                xl={6}
                sx={{ paddingTop: "0!important" }}
                align="center"
              >
                <Typography
                  component="h4"
                  variant="h5"
                  color="#015578"
                  fontSize={18}
                  fontWeight={400}
                >
                  Upgrade Internet Bandwidth
                </Typography>
                <Box
                  component="img"
                  width={150}
                  height={150}
                  align="center"
                  alt="speedometer"
                  src="/images/pages/surface/networks/internetbw/speedometer.png"
                  sx={{ display: "block", margin: "30px auto" }}
                />
                <Grid
                  container
                  direction="row"
                  rowSpacing={2}
                  spacing={2}
                  mt={5}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={6}
                    lg={6}
                    xl={6}
                    sx={{ paddingTop: "0!important" }}
                    align="center"
                  >
                    <CustomFormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Select Bandwidth
                      </InputLabel>
                      <Select
                        onChange={handleChange}
                        defaultValue={allData.defaultId}
                        id="grouped-select"
                        label="Select Bandwidth"
                        MenuProps={MenuProps}
                      >
                        <MenuItem value="" disabled>
                          Choose your option
                        </MenuItem>
                        {allData &&
                          allData.list.map(function (elem) {
                            return (
                              <MenuItem key={elem.id} value={elem.id ?? ""}>
                                {elem.value}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </CustomFormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={6}
                    lg={6}
                    xl={6}
                    sx={{ paddingTop: "0!important" }}
                    align="center"
                  >
                    <Box
                      size="md"
                      variant="solid"
                      className={styles.BandwidthSAR}
                    >
                      {selectedBandData} SAR
                    </Box>
                  </Grid>
                </Grid>

                {roleName === "administrator" || roleName === "owner" ? (
                  <Button
                    className={styles.upgradBtn}
                    // disabled = {isloading}
                    // disabled = {defaultUpdatedBandValue == updatedBand}
                    disabled={selectedBand == defaultUpdatedBandValue}
                    onClick={onSubmit}
                    size="md"
                    variant="solid"
                    sx={{
                      color: "#fff",
                      backgroundImage:
                        "linear-gradient(45deg, #0288d1, #26c6da) !important",
                      mt: 5,
                      mb: 3,
                    }}
                  >
                    {isloading ? (
                      <>
                        <AutorenewIcon className={styles.loadingBtn} />{" "}
                        Processing...
                      </>
                    ) : (
                      "UPGRADE"
                    )}
                  </Button>
                ) : (
                  <Button
                    className={styles.upgradBtn}
                    disabled={selectedBand == defaultUpdatedBandValue}
                    //  onClick={onSubmit}
                    size="md"
                    variant="solid"
                    sx={{
                      color: "#fff",
                      backgroundImage:
                        "linear-gradient(45deg, #0288d1, #26c6da) !important",
                      mt: 5,
                      mb: 3,
                      cursor: "not-allowed",
                    }}
                  >
                    {isloading ? (
                      <>
                        <AutorenewIcon className={styles.loadingBtn} />{" "}
                        Processing...
                      </>
                    ) : (
                      "UPGRADE"
                    )}
                  </Button>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      {/* End Internet Bandwidth design Here */}
      {/* Start Internet Bandwidth design Here */}
      {!hideSkeletonibl && (
        <Card sx={{ mt: 2, borderRadius: "7px" }}>
          <CardContent sx={{ padding: "24px" }}>
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
                sm={8}
                md={6}
                lg={6}
                xl={6}
                sx={{ paddingTop: "0!important" }}
                align="center"
              >
                <Typography component="h4" variant="h5">
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={250}
                    height={25}
                    sx={{ margin: "0 auto" }}
                  />
                </Typography>
                <Skeleton
                  variant="circular"
                  animation="wave"
                  width={150}
                  height={150}
                  sx={{ margin: "30px auto" }}
                />
                <Grid
                  container
                  direction="row"
                  rowSpacing={2}
                  spacing={2}
                  mt={5}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={6}
                    lg={6}
                    xl={6}
                    sx={{ paddingTop: "0!important" }}
                    align="center"
                  >
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={"100%"}
                      height={55}
                      sx={{ margin: "0 auto" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={6}
                    lg={6}
                    xl={6}
                    sx={{ paddingTop: "0!important" }}
                    align="center"
                  >
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={"100%"}
                      height={55}
                      className={styles.BandwidthSARSK}
                      sx={{ margin: "0 auto" }}
                    />
                  </Grid>
                </Grid>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={150}
                  height={55}
                  sx={{ margin: "30px auto" }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      {/* End Internet Bandwidth Skeleton design Here */}
    </SurfaceLayout>
  );
}

export default InternetBandWidth;
