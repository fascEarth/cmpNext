// ** React Imports
import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cards from "react-credit-cards-2";

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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Popover from "@mui/material/Popover";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import { DialogContentText } from "@mui/material";
// ** MUI ICON Components
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./index.module.css";

import Cookies from "js-cookie";
import axios from "axios";

import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useClientIP } from "../../../../../utils/context/ClientIPContext";

const StyledIframe = styled("iframe")`
  width: 100%;
  min-width: 600px;
  height: 460px;
  border: 0;
`;

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

// ** Switch Function
const EnableBillingSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#6DCCDD",
    "&:hover": {
      backgroundColor: "rgb(109, 204, 221, 0.08)",
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#6DCCDD",
  },
}));

// Modal Popup Style
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "600px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 4,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const ModalButton = styled(Button)(({ theme }) => ({
  color: "#FFF",
  backgroundImage: "linear-gradient(45deg, #0288d1, #26c6da) !important",
  "&:hover": {
    backgroundImage: "linear-gradient(45deg, #0288d1, #26c6da) !important",
  },
}));

function BillingSettingsTab() {
  const { clientIP } = useClientIP();

  // ** OverAll Tab Function
  const [ManageDetailValue, setManageDetailValue] =
    useState("Billing Settings");
  const handleManageDetailValue = (event, newManageDetailValue) => {
    setManageDetailValue(newManageDetailValue);
  };

  // ** Credit/Debit Card Tab Function
  const [CreditDetailValue, setCreditDetailValue] = useState("Credit Card");
  const handleCreditDetailValue = (event, newCreditDetailValue) => {
    setCreditDetailValue(newCreditDetailValue);
  };

  // Credit Cards
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  // ** Modal Popup Function
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const router = useRouter();

  const getCardInfo = async (did, cachData) => {
    const newData = {
      cardId: did,
      userSerialId: stcachData.user_serial_id,
      tenantId: stcachData.tenant_id,
    };
    const finalData = {
      data: newData,
      endPoint: "getpmethodsinfo",
      token: stcachData.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/billing/bsettings",
        finalData
      ); // call the new API route
      console.log(data);
      if (data) {
        console.log(data);
        sethideSkeletonibl(false);
        //setCollectedCommonCardData(data)
        router.push("/surface/billing/bsettings");
        //fetchData(cachData);
      } else {
        router.push("/surface/billing/bsettings");
        //toast.error('Error: '+data.status_code+' ' + data.status_msg);
      }
    } catch (error) {
      router.push("/surface/billing/bsettings");
      //toast.error('An error occurred');
    }
  };

  const [hideSkeletonibl, sethideSkeletonibl] = useState(false);
  const cookies = Cookies.get("userData");
  const [stcachData, setstcachData] = useState([]);

  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;

    setstcachData(cachData);
    if (cookies) {
      if (router.isReady) {
        const { id } = router.query;

        if (id) {
          getCardInfo(id, cachData);
        } else {
          fetchData(cachData);
        }
      }
    }
  }, [cookies, router.isReady, router.query.id]);

  const [iframeSrc, setIframeSrc] = useState("");

  const handleNewCard = async () => {
    const tdata = stcachData;
    console.log("coming");
    const newData = {
      cardType: commonCardType,
      amount: 1,
      currency: "SAR",
      customerId: tdata.tenant_id,
      userId: tdata.user_serial_id,
      //ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "addNewBillingCard",
      token: tdata.accessToken,
      ipaddress: clientIP,
    };
    console.log(finalData);
    try {
      const { data } = await axios.post(
        "/api/surface/billing/bsettings",
        finalData
      ); // call the new API route
      console.log(data);
      if (data) {
        setIframeSrc(data.url);
        handleClickOpen();
      } else {
        console.log("Error: " + data.status_code + " " + data.status_msg);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const [commonCardType, setcommonCardType] = useState("primary");
  const [visibleAddACard, setVisibleAddACard] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalDeleteData, setModalDeleteData] = useState("");
  const [collectedCommonCardData, setCollectedCommonCardData] = useState([]);
  const [isProceedLoading, setIsProceedLoading] = useState(false);
  const handleDeleteType = async (id) => {
    setIsProceedLoading(true);
    setDeleteModal(true);
    setVisibleButton(true);
    console.log(id);
    const tdata = stcachData;
    const newData = {
      cardId: id,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
    };
    const finalData = {
      data: newData,
      endPoint: "deleteActiveBillingCard",
      token: tdata.accessToken,
    };
    console.log(finalData);
    try {
      const { data } = await axios.post(
        "/api/surface/billing/bsettings",
        finalData
      ); // call the new API route
      console.log(data);
      if (data) {
        toast.success("Billing Card has been Deleted successfully!");
        fetchData(tdata);
        setDeleteModal(false);
        setIsProceedLoading(false);
      } else {
        console.log("Error: " + data.status_code + " " + data.status_msg);
      }
    } catch (error) {
      toast.error("An error occurred");
      setDeleteModal(false);
      setIsProceedLoading(false);
    }
  };

  const handleDeleteModalClose = () => {
    setDeleteModal(false);
  };
  const handleDeleteModalOpen = (data) => {
    setDeleteModal(true);
    setModalDeleteData(data);
    handleClose();
  };
  console.log(modalDeleteData, "modalDeleteData");

  const handleChangeType = async (id) => {
    setIsProceedLoading(true);

    const tdata = stcachData;

    const newData = {
      cardId: id,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
    };
    const finalData = {
      data: newData,
      endPoint: "updateActiveBillingCard",
      token: tdata.accessToken,
    };
    console.log(finalData);
    try {
      const { data } = await axios.post(
        "/api/surface/billing/bsettings",
        finalData
      ); // call the new API route
      console.log(data);
      if (data) {
        fetchData(tdata);
        setIsProceedLoading(false);
      } else {
        console.log("Error: " + data.status_code + " " + data.status_msg);
        setIsProceedLoading(false);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const [visibleButton, setVisibleButton] = useState(true);

  const fetchData = async (tdata) => {
    const newData = {
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getallbillCardsInfo",
      token: tdata.accessToken,
    };
    console.log(finalData);
    try {
      const { data } = await axios.post(
        "/api/surface/billing/bsettings",
        finalData
      ); // call the new API route
      console.log(data);
      if (data && data.length > 0) {
        if (data.length == 1) {
          setcommonCardType("secondary");
        } else if (data.length == 2) {
          setVisibleButton(false);
        }
        setVisibleAddACard(false);
        console.log(data);
        setCollectedCommonCardData(data);

        sethideSkeletonibl(true);
      } else {
        setcommonCardType("primary");
        setVisibleAddACard(true);

        sethideSkeletonibl(true);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  return (
    <>
      {/* Start Billing Settings Here */}
      {hideSkeletonibl && (
        <Box>
          <Typography
            component="h4"
            variant="h5"
            align="left"
            fontSize={18}
            mb={2}
            sx={{ fontWeight: "500" }}
          >
            Credit/Debit Card
          </Typography>
          <TabContext value={CreditDetailValue}>
            <TabList
              onChange={handleCreditDetailValue}
              className={styles.CredittabContainer}
              aria-label="simple 
                                    tabs example"
              TabIndicatorProps={{ style: { backgroundColor: "#015578" } }}
              sx={{
                "& .MuiTab-root.Mui-selected": {
                  color: "#015578",
                  backgroundColor: "transparent",
                  fontWeight: "550",
                },
              }}
            >
              <Tab
                value="Credit Card"
                label="Credit Card"
                className={styles.tabButton}
              />
              <Tab
                value="Bank Transfer"
                label="Bank Transfer"
                className={styles.tabButton}
                disabled
              />
            </TabList>
            <TabPanel value="Credit Card" sx={{ p: "15px" }}>
              {!visibleAddACard &&
                collectedCommonCardData &&
                collectedCommonCardData.map(function (elem) {
                  return (
                    <Card
                      key={elem.tenantCCId}
                      sx={{ mt: 2, borderRadius: "7px" }}
                      variant="outlined"
                      className={
                        elem.cardType === "primary"
                          ? styles.CreditCardActive
                          : ""
                      }
                    >
                      <CardHeader
                        title={
                          <Typography
                            component="h4"
                            variant="h5"
                            align="left"
                            fontSize={18}
                            sx={{
                              position: "relative",
                              fontWeight: "500",
                              color: "#01839a",
                            }}
                          >
                            {elem.cardType === "primary"
                              ? "Primary"
                              : "Secondary"}
                            {elem.cardType !== "primary" && (
                              <DeleteIcon
                                onClick={() => handleDeleteModalOpen(elem)}
                                className={styles.CreditCardDelete}
                              />
                            )}
                          </Typography>
                        }
                      />
                      <CardContent
                        onClick={() => handleChangeType(elem.tenantCCId)}
                        key={elem.tenantCCId}
                        sx={{ padding: "0 24px 24px 24px" }}
                      >
                        <form autoComplete="off">
                          <Grid
                            key={elem.tenantCCId}
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            rowSpacing={2}
                            spacing={2}
                          >
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                {elem.cardType === "primary" && (
                                  <CheckCircleIcon
                                    color="success"
                                    className={styles.CreditCardCheckIcon}
                                  />
                                )}
                                <Cards
                                  number={
                                    elem.first6Digits +
                                    "** ****" +
                                    elem.last4Digits
                                  }
                                  expiry={elem.mm + "/" + elem.yy}
                                  cvc={state.cvc}
                                  name={elem.cardHolderName}
                                  focused={state.focus}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <Grid
                                container
                                direction="row"
                                rowSpacing={1}
                                spacing={2}
                              >
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={12}
                                  xl={12}
                                  sx={{ pt: "0px !important" }}
                                >
                                  <CssTextField
                                    margin="normal"
                                    fullWidth
                                    type="text"
                                    disabled
                                    name="number"
                                    label="Card 
                                                                    Number"
                                    value={
                                      elem.first6Digits +
                                      "** ****" +
                                      elem.last4Digits
                                    }
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                                  <CssTextField
                                    margin="normal"
                                    disabled
                                    fullWidth
                                    type="text"
                                    name="name"
                                    label="Name on Card"
                                    value={elem.cardHolderName}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                  <CssTextField
                                    margin="normal"
                                    disabled
                                    fullWidth
                                    type="tel"
                                    name="expiry"
                                    label="Expiry"
                                    pattern="\d\d/\d\d"
                                    value={elem.mm + "/" + elem.yy}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    inputProps={{ maxLength: 4 }}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </form>
                      </CardContent>
                    </Card>
                  );
                })}

              {visibleButton && (
                <Button
                  size="medium"
                  variant="solid"
                  align="center"
                  className={styles.CreditCardBtn}
                  onClick={handleNewCard}
                >
                  ADD SECONDARY CARD
                </Button>
              )}
              {/* Start ADD SECONDARY CARD Modal  */}

              {visibleAddACard && (
                <Card sx={{ mt: 2, borderRadius: "7px" }} variant="outlined">
                  <CardHeader
                    title={
                      <Typography
                        component="h4"
                        variant="h5"
                        align="left"
                        fontSize={18}
                        sx={{
                          position: "relative",
                          fontWeight: "500",
                          color: "#01839a",
                        }}
                      ></Typography>
                    }
                  />
                  <CardContent
                    sx={{
                      padding: {
                        lg: "0 24px 24px 24px",
                        sm: "0 10px 24px 10px",
                      },
                    }}
                  >
                    <form autoComplete="off">
                      <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        rowSpacing={2}
                        spacing={2}
                      >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Box sx={{ display: "flex" }}>
                            <Cards
                              number={state.number}
                              expiry={state.expiry}
                              cvc={state.cvc}
                              name={state.name}
                              focused={state.focus}
                            />
                          </Box>
                        </Grid>

                        <Box
                          component="div"
                          textAlign="center"
                          fontSize={18}
                          sx={{ color: "#727171" }}
                        >
                          <Button
                            onClick={handleNewCard}
                            size="medium"
                            variant="solid"
                            align="center"
                            className={styles.CreditCardBtn}
                          >
                            ADD CARD
                          </Button>
                          <br />
                          <Typography variant="h6" align="center" fontSize={14}>
                            Detacloud charges your card SAR 1 as part of the
                            credit card verification process.
                          </Typography>
                          <Typography variant="h6" align="center" fontSize={14}>
                            We will refunds the SAR 1 after verification is
                            complete.
                          </Typography>
                        </Box>
                      </Grid>
                    </form>
                  </CardContent>
                </Card>
              )}

              <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <StyledIframe
                    src={iframeSrc}
                    id="telr"
                    sandbox="allow-forms allow-modals allow-popups-to-escape-sandbox allow-popups allow-scripts allow-top-navigation allow-same-origin"
                  />
                </Box>
              </Modal>
              {/* End ADD SECONDARY CARD Modal  */}
            </TabPanel>
            <TabPanel value="Bank Transfer" sx={{ p: "15px" }}>
              Bank Transfer
            </TabPanel>
          </TabContext>
        </Box>
      )}
      {/* End Billing Settings Here */}
      {/* Start Billing Settings Skeleton Here */}
      {!hideSkeletonibl && (
        <Box>
          <Typography component="h4" variant="h5" align="left" mb={2}>
            <Skeleton variant="text" animation="wave" width={170} height={25} />
          </Typography>
          <TabContext value={CreditDetailValue}>
            {/* Start Tab List Sekeleton */}
            <Skeleton
              variant="text"
              animation="wave"
              width={"100%"}
              height={80}
              sx={{ borderRadius: "12px", marginTop: "-15px" }}
            />
            {/* End Tab List Sekeleton */}
            <TabPanel value="Credit Card" sx={{ p: "15px" }}>
              {/* Start Primary Card Skeleton Design */}
              <Card sx={{ borderRadius: "7px" }} variant="outlined">
                <CardHeader
                  title={
                    <Typography
                      component="h4"
                      variant="h5"
                      align="left"
                      sx={{ position: "relative" }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width={170}
                        height={25}
                      />{" "}
                      <Skeleton
                        variant="circular"
                        animation="wave"
                        width={20}
                        height={20}
                        className={styles.CreditCardDelete}
                        sx={{ top: "0" }}
                      />
                    </Typography>
                  }
                />
                <CardContent sx={{ padding: "0 24px 24px 24px" }}>
                  <form autoComplete="off">
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      rowSpacing={2}
                      spacing={2}
                    >
                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <Box sx={{ display: "flex" }}>
                          <Skeleton
                            variant="circular"
                            animation="wave"
                            width={30}
                            height={30}
                            className={styles.CreditCardCheckIcon}
                          />
                          <Skeleton
                            variant="rounded"
                            animation="wave"
                            width={290}
                            height={182}
                            sx={{ mr: "25px", borderRadius: "20px" }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <Grid
                          container
                          direction="row"
                          rowSpacing={1}
                          spacing={2}
                        >
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            sx={{ pt: "0px !important" }}
                          >
                            <Skeleton
                              variant="rounded"
                              animation="wave"
                              width={"100%"}
                              height={56}
                              sx={{ mt: "16px" }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                            <Skeleton
                              variant="rounded"
                              animation="wave"
                              width={"100%"}
                              height={56}
                              sx={{ mt: "16px" }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <Skeleton
                              variant="rounded"
                              animation="wave"
                              width={"100%"}
                              height={56}
                              sx={{ mt: "16px" }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
              {/* End Primary Card Skeleton Design */}
              {/* Start Secondary Card Skeleton Design */}
              <Card sx={{ mt: 2, borderRadius: "7px" }} variant="outlined">
                <CardHeader
                  title={
                    <Typography
                      component="h4"
                      variant="h5"
                      align="left"
                      sx={{ position: "relative" }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width={170}
                        height={25}
                      />{" "}
                      <Skeleton
                        variant="circular"
                        animation="wave"
                        width={20}
                        height={20}
                        className={styles.CreditCardDelete}
                        sx={{ top: "0" }}
                      />
                    </Typography>
                  }
                />
                <CardContent sx={{ padding: "0 24px 24px 24px" }}>
                  <form autoComplete="off">
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      rowSpacing={2}
                      spacing={2}
                    >
                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <Box sx={{ display: "flex" }}>
                          <Skeleton
                            variant="circular"
                            animation="wave"
                            width={30}
                            height={30}
                            className={styles.CreditCardCheckIcon}
                          />
                          <Skeleton
                            variant="rounded"
                            animation="wave"
                            width={290}
                            height={182}
                            sx={{ mr: "25px", borderRadius: "20px" }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <Grid
                          container
                          direction="row"
                          rowSpacing={1}
                          spacing={2}
                        >
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            sx={{ pt: "0px !important" }}
                          >
                            <Skeleton
                              variant="rounded"
                              animation="wave"
                              width={"100%"}
                              height={56}
                              sx={{ mt: "16px" }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                            <Skeleton
                              variant="rounded"
                              animation="wave"
                              width={"100%"}
                              height={56}
                              sx={{ mt: "16px" }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <Skeleton
                              variant="rounded"
                              animation="wave"
                              width={"100%"}
                              height={56}
                              sx={{ mt: "16px" }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
              {/* End Secondary Card Skeleton Design */}
              <Skeleton
                variant="rounded"
                animation="wave"
                width={250}
                height={40}
                sx={{
                  display: "flex",
                  margin: "25px auto 0 auto",
                  borderRadius: "20px",
                }}
              />
            </TabPanel>
            <TabPanel value="Bank Transfer" sx={{ p: "15px" }}>
              Bank Transfer
            </TabPanel>
          </TabContext>
        </Box>
      )}
      {/* End Billing Settings Skeleton Here */}

      <Dialog
        open={deleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Billing Card?</DialogTitle>
        <DialogContent
          sx={{
            width: { lg: "500px", xs: "100%", sm: "100%", md: "500px" },
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{ marginBottom: "20px" }}
          >
            Card Holder: <b>{modalDeleteData.cardHolderName}</b>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this Billing Card?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteModalClose}>Cancel</Button>
          <Button
            disabled={isProceedLoading}
            onClick={() => handleDeleteType(modalDeleteData.tenantCCId)}
            autoFocus
            variant="contained"
          >
            {isProceedLoading ? (
              <AutorenewIcon
                className={styles.loadingBtn}
                sx={{ color: "#fff" }}
              />
            ) : (
              "Proceed"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BillingSettingsTab;
