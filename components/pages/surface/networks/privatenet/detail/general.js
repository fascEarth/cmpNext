// ** React Imports
import * as React from "react";
import { useState } from "react";

// ** MUI Components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Popover from "@mui/material/Popover";
import Skeleton from "@mui/material/Skeleton";

// ** MUI ICON Components
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";
// ** Custom CSS
import styles from "./index.module.css";

//  TR 01
import Cookies from "js-cookie";
import axios from "axios";
import { useClientIP } from "../../../../../../utils/context/ClientIPContext";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Checkbox, ListItemText } from "@mui/material";
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

export const General = (sslugId) => {

  const { clientIP } = useClientIP();


  const slugId = sslugId.sslugId;
  const [pnetworkGeneral, setPnetworkGeneral] = useState({
    networkId: "",
    networkName: "",
    networkDesc: "",
    gatewayCidr: "",
    teams: [],
    networkTypeId: "",
    tenantId: "",
  });
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setPnetworkGeneral((prev) => ({ ...prev, [name]: value }));
  };
  const cookies = Cookies.get("userData");
  const [datas, setDatas] = useState({});
  const [network, setNetwork] = useState("");
  const [teams, setTeams] = useState("");
  const [teamData, setteamData] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [hideSkeleton, sethideSkeleton] = useState(false);

  const [isprogress, setIsprogress] = useState(false);
  useEffect(() => {
    setNetwork(datas.networkTypeId);
    datas.teams?.map((i) => {
      setTeams(i);
    });
    setPnetworkGeneral((prev) => ({
      ...prev,
      networkId: datas.networkId,
      networkName: datas.networkName,
      networkDesc: datas.networkDesc,
      networkTypeId: datas.networkTypeId,
      gatewayCidr: datas.gatewayCidr,
      teams: datas.teams,
    }));
  }, [datas]);

  // TR 01 fetch data
  useEffect(() => {
    if (cookies && slugId) {
      fetchData();
    }
  }, [cookies, slugId]);
  const fetchData = async () => {
    const tdata = cookies ? JSON.parse(cookies) : [];

    const newData = {
      slugId: slugId,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP
    };
    // const finalData = {endPoint: "getnetworkgeneral" };
    const finalData = {
      data: newData,
      endPoint: "getnetworkgeneral",
      token: tdata.accessToken,
      ipaddress: clientIP
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/privatenet/detail/generalnetwork",
        finalData
      ); // call the new API route

      if (data) {
        if (data.message.networkStatus == "progress") {
          setIsprogress(true);
          const timeoutId = setTimeout(() => {
            fetchData();
          }, 15000);

          // Cleanup function to clear the timeout when the component unmounts
          return () => clearTimeout(timeoutId);
        } else {
          setIsprogress(false);
        }
        setDatas(data.message);
        sethideSkeleton(true);
      }
    } catch (error) {
      toast.error("An error occurred", error);
      console.log(error);
      sethideSkeleton(true);
    }
  };

  //* END FETCH DATA   */
  // ** HANDLE NETWORK**/
  const handeNetworkChange = (e) => {
    setNetwork(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddNetworks(pnetworkGeneral);
  };
  // tr 01post
  const handleAddNetworks = async (data) => {
    setIsloading(true);
    const tdata = cookies ? JSON.parse(cookies) : [];
    data.tenantId = tdata.tenant_id;
    const newData = {
      data: data,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP
    };

    const finalData = {
      data: newData,
      endPoint: "updatenetworkgeneral",
      token: tdata.accessToken,
      ipaddress: clientIP
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/privatenet/detail/generalnetwork",
        finalData
      );
      if (data) {
      } else {
        // console.log('YOU MUST FILL THE CORRECT DATA')
      }
      if (data.status === "ok") {
        toast.success(" Network has been updated successfully");
        fetchData();
      }
      if (data.status === "error") {
        toast.error(data.message);
      }
      setIsloading(false);
    } catch (e) {
      toast.error("please fill valid informations");
      setIsloading(false);
    }
  };
  // ** Popover Function
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const Popopen = Boolean(anchorEl);
  const id = Popopen ? "simple-popover" : undefined;

  // Gateway CIDR Popover Function

  useEffect(() => {
    if (cookies) {
      fetchAditionalInfo();
    }
  }, [cookies]);
  const [networkTypeData, setnetworkTypeData] = useState([]);
  const [networkTypeDataTeamIsolated, setnetworkTypeDataTeamIsolated] =
    useState([]);
  const fetchAditionalInfo = async () => {
    const tdata = cookies ? JSON.parse(cookies) : [];

    const newData = {
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP
    };

    const finalData = {
      data: newData,
      endPoint: "getallpnladdtionalInfo",
      token: tdata.accessToken,
      ipaddress: clientIP
    };

    try {
      const { data } = await axios.post(
        "/api/surface/networks/privatenet/list",
        finalData
      ); // call the new API route

      if (data) {
        data.map(function (elem) {
          if (elem.type === "updatenetworktype") {
            setnetworkTypeData(elem);
          }
          if (elem.type === "networktype") {
            setnetworkTypeDataTeamIsolated(elem);
          } else if (elem.type === "teams") {
            setteamData(elem);
          }
        });
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const [anchorGatewayEl, setAnchorGatewayEl] = React.useState(null);
  const GatehandleClick = (event) => {
    setAnchorGatewayEl(event.currentTarget);
  };
  const GatewayhandlePopoverClose = () => {
    setAnchorGatewayEl(null);
  };

  //
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;

    if (cachData && slugId) {
      fetchAllData(cachData);
    }
  }, [cookies]);
  const [commonNeList, setcommonNeList] = useState(false);
  const fetchAllData = async (tdata) => {
    const newData = {
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP
    };
    const finalData = {
      data: newData,
      endPoint: "getAllNetworksFromDetail",
      token: tdata.accessToken,
      ipaddress: clientIP
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/privatenet/list",
        finalData
      ); // call the new API route
      if (data) {
        setcommonNeList(data.data);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const GatewayPopopen = Boolean(anchorGatewayEl);
  return (
    <>
      {hideSkeleton && (
        <Box>
          <Typography
            component="h4"
            variant="h5"
            align="left"
            fontSize={18}
            mb={2}
            sx={{ fontWeight: "500" }}
          >
            General Details
          </Typography>
          <Box component="form" onSubmit={(e) => handleSubmit(e)}>
            <Grid
              container
              direction="row"
              rowSpacing={2}
              spacing={2}
              display={"flex"}
              justifyContent="center"
            >
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <CssTextField
                  margin="normal"
                  autoFocus
                  fullWidth
                  id="name"
                  label="Name"
                  name="networkName"
                  value={
                    pnetworkGeneral.networkName
                      ? pnetworkGeneral.networkName
                      : ""
                  }
                  onChange={(e) => handleInputChange(e)}
                  disabled={datas?.sysDefined}
                  sx={{
                    "& .Mui-disabled": {
                      cursor: datas.sysDefined
                        ? "not-allowed !important"
                        : "auto",
                    },
                  }}
                />
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <CssTextField
                    margin="normal"
                    fullWidth
                    id="gateway"
                    // label="Gateway CIDR"
                    name="gatewayCidr"
                    value={datas.gatewayCidr ? datas.gatewayCidr : ""}
                    disabled
                    sx={{
                      "& .Mui-disabled": { cursor: "not-allowed !important" },
                    }}
                  />
                  <InfoOutlinedIcon
                    sx={{ width: "30px", height: "30px", ml: 1, my: 2.5 }}
                    className={styles.fieldInfoIcon}
                    onClick={GatehandleClick}
                  />
                  <Popover
                    id={id}
                    open={GatewayPopopen}
                    anchorEl={anchorGatewayEl}
                    onClose={GatewayhandlePopoverClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <Box className={styles.PopoveBoxContainer}>
                      <Typography
                        component="h4"
                        variant="h5"
                        align="left"
                        fontSize={16}
                        className={styles.PopoverHeader}
                      >
                        Gateway CIDR
                      </Typography>
                      <Typography
                        component="p"
                        variant="p"
                        color={"#6b6f82"}
                        fontSize={14}
                        align="center"
                        sx={{ pt: 1 }}
                        className={styles.PopoverContent}
                      >
                        The CIDR includes the IP address of the gateway, e.g.
                        192.168.1.254/24 represents the gateway address
                        192.168.1.254 and its associated routing prefix
                        192.168.1.0, or equivalently, its subnet mask
                        255.255.255.0. The CIDR value cannot be changed once it
                        is provided.
                      </Typography>
                    </Box>
                  </Popover>
                </Box>
                <CssFormControl margin="normal" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Team
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Team"
                    MenuProps={MenuProps}
                    disabled={datas?.networkTypeId === 3 || datas?.sysDefined}
                    sx={{
                      "& .Mui-disabled": { cursor: "not-allowed !important" },
                    }}
                    // value={teams? teams: ''}
                    value={
                      pnetworkGeneral.teams?.map((id) => parseInt(id))
                        ? pnetworkGeneral.teams?.map((id) => parseInt(id))
                        : []
                    }
                    multiple
                    onChange={(e) => {
                      const {
                        target: { value },
                      } = e;
                      setPnetworkGeneral((prev) => ({ ...prev, teams: value }));
                    }}
                    renderValue={(selected) => {
                      if (selected.length == 1) {
                        const selectedTeamNames = teamData.list
                          ?.filter((elem) => selected.includes(elem.id))
                          .map((elem) => elem.value);
                        return selectedTeamNames;
                      } else if (selected.length > 1) {
                        const selectedTeamNames = teamData.list
                          ?.filter((elem) => selected.includes(elem.id))
                          .map((elem) => elem.value);

                        return selectedTeamNames?.join(", ");
                      } else {
                        return "Select Team";
                      }
                    }}
                  >
                    {teamData.list &&
                      teamData.list?.map(function (elem, index) {
                        return (
                          <MenuItem key={elem.id + "_" + index} value={elem.id}>
                            <Checkbox
                              checked={pnetworkGeneral.teams
                                ?.map((id) => parseInt(id))
                                .includes(elem.id)}
                            />
                            <ListItemText primary={elem.value} />
                          </MenuItem>
                        );
                      })}
                  </Select>
                </CssFormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <CssTextField
                  margin="normal"
                  fullWidth
                  id="description"
                  label="Description"
                  name="networkDesc"
                  disabled={datas?.sysDefined}
                  value={
                    pnetworkGeneral.networkDesc
                      ? pnetworkGeneral.networkDesc
                      : ""
                  }
                  sx={{
                    "& .Mui-disabled": {
                      cursor: datas.sysDefined
                        ? "not-allowed !important"
                        : "auto",
                    },
                  }}
                  onChange={(e) => handleInputChange(e)}
                />
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <CssFormControl margin="normal" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Network Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Network Type"
                      name="networkTypeId"
                      MenuProps={MenuProps}
                      disabled={datas?.networkTypeId === 3 || datas?.sysDefined}
                      value={
                        pnetworkGeneral.networkTypeId
                          ? pnetworkGeneral.networkTypeId
                          : ""
                      }
                      sx={{
                        "& .Mui-disabled": { cursor: "not-allowed !important" },
                      }}
                      onChange={(e) => handleInputChange(e)}
                    >
                      {/* {
                    datas?.networkTypeId === 3 ?
                    networkTypeData?.list && networkTypeData.list?.map((ele)=>(
                      <MenuItem disabled={datas?.networkTypeId === 3} key={ele.id} value={ele.id}>
                       {ele.value}
                     </MenuItem>
                    ))
                  :
                  networkTypeData?.list && networkTypeData.list?.filter((ele)=> ele.id !== 3).map((ele)=>(
                   <MenuItem disabled={datas?.networkTypeId === 3} key={ele.id} value={ele.id}>
                    {ele.value}
                  </MenuItem>
                  ))} */}

                      {datas?.networkTypeId === 3
                        ? networkTypeDataTeamIsolated?.list &&
                          networkTypeDataTeamIsolated.list?.map((ele) => (
                            <MenuItem
                              disabled={datas?.networkTypeId === 3}
                              key={ele.id}
                              value={ele.id}
                            >
                              {ele.value}
                            </MenuItem>
                          ))
                        : networkTypeData?.list &&
                          networkTypeData.list?.map((ele) => (
                            <MenuItem
                              disabled={datas?.networkTypeId === 3}
                              key={ele.id}
                              value={ele.id}
                            >
                              {ele.value}
                            </MenuItem>
                          ))}
                    </Select>
                  </CssFormControl>
                  <InfoOutlinedIcon
                    sx={{ ml: 1, my: 2.5 }}
                    className={styles.fieldInfoIcon}
                    onClick={handleClick}
                  />
                  <Popover
                    id={id}
                    open={Popopen}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <Box className={styles.PopoveBoxContainer}>
                      <Typography
                        component="h4"
                        variant="h5"
                        align="left"
                        fontSize={16}
                        className={styles.PopoverHeader}
                      >
                        Routed
                      </Typography>
                      <Typography
                        component="p"
                        variant="p"
                        color={"#6b6f82"}
                        fontSize={14}
                        align="center"
                        sx={{ pt: 1 }}
                        className={styles.PopoverContent}
                      >
                        This type of network provides controlled access to
                        machines and networks outside of the VDC through an edge
                        gateway.
                      </Typography>
                      <Typography
                        component="h4"
                        variant="h5"
                        align="left"
                        fontSize={16}
                        className={styles.PopoverHeader}
                        sx={{ mt: "0px!important" }}
                      >
                        Org Isolated
                      </Typography>
                      <Typography
                        component="p"
                        variant="p"
                        color={"#6b6f82"}
                        fontSize={14}
                        align="center"
                        sx={{ pt: 1 }}
                        className={styles.PopoverContent}
                      >
                        This type of network provides a fully isolated
                        environment, which is accessible only by this
                        organization VDC.
                      </Typography>
                      <Typography
                        component="h4"
                        variant="h5"
                        align="left"
                        fontSize={16}
                        className={styles.PopoverHeader}
                        sx={{ mt: "0px!important" }}
                      >
                        Team Isolated
                      </Typography>
                      <Typography
                        component="p"
                        variant="p"
                        color={"#6b6f82"}
                        fontSize={14}
                        align="center"
                        sx={{ pt: 1 }}
                        className={styles.PopoverContent}
                      >
                        This type of network provides a completely isolated
                        environment, which is accessible only by this Team.
                      </Typography>
                    </Box>
                  </Popover>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  {!isprogress ? (
                    <Button
                      disabled={isprogress}
                      type="submit"
                      size="md"
                      variant="contained"
                      sx={{
                        color: "#fff",
                        borderRadius: "20px",
                        backgroundImage:
                          "linear-gradient(45deg, #0288d1, #26c6da) !important",
                        mt: 2,
                      }}
                    >
                      {!isprogress ? "UPDATE" : "processing..."}
                    </Button>
                  ) : (
                    <Button
                      // disabled={isprogress}

                      size="md"
                      variant="contained"
                      sx={{
                        color: "#fff",
                        borderRadius: "20px",
                        backgroundImage:
                          "linear-gradient(45deg, #0288d1, #26c6da) !important",
                        mt: 2,
                        cursor: isprogress ? "not-allowed" : "pointer",
                      }}
                    >
                      {isprogress ? (
                        <>
                          <AutorenewIcon className={styles.loadingBtn} />{" "}
                          Processing...
                        </>
                      ) : (
                        "UPDATE"
                      )}
                      {/* {!isprogress ? "UPDATE" : "processing..."} */}
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
      {/* End General Design Here */}
      {/* Start General Skeleton Design Here */}
      {!hideSkeleton && (
        <Box hidden={hideSkeleton}>
          <Typography component="h4" variant="h5" align="left" mb={2}>
            <Skeleton variant="text" animation="wave" width={180} height={25} />
          </Typography>
          <Grid
            container
            direction="row"
            rowSpacing={2}
            spacing={2}
            display={"flex"}
            justifyContent="center"
          >
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{ mt: "18px" }}
                width={"100%"}
                height={55}
              />
              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{ mt: "18px" }}
                width={"100%"}
                height={55}
              />
              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{ mt: "18px" }}
                width={"100%"}
                height={55}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{ mt: "18px" }}
                width={"100%"}
                height={55}
              />
              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{ mt: "18px" }}
                width={"100%"}
                height={55}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  sx={{ mt: "18px" }}
                  width={150}
                  height={55}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
      {/* End General Skeleton Design Here */}
    </>
  );
};
