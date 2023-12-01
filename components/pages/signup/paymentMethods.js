// ** React Imports
import { useEffect, useState } from "react";
import Cards from "react-credit-cards-2";

// ** Next Import

// ** MUI Components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";

// ** Accordion Imports
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";

import LockIcon from "@mui/icons-material/Lock";

// ** Custom Style Imports
import "react-credit-cards-2/dist/es/styles-compiled.css";
import istyles from "./index.module.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useRouter } from "next/router";
import devStyles from "./developer.module.css";
import FallbackSpinner from "../../tools/spinner";
import LoadingIndicator from "../../tools/loader";
import CommonFallbackSpinner from "../../tools/commonSpinner";
import { useClientIP } from "../../../utils/context/ClientIPContext";

const styles = {
  ...istyles,
  ...devStyles,
};

const StyledIframe = styled("iframe")`
  width: 100%;
  min-width: 600px;
  height: 460px;
  border: 0;
`;

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

const PaymentMethodsSubmit = ({
  allowpaymentDone,
  cachedInfo,
  onallowcommonLegalStatus,
  onSubmit,
  allowPOIcsbt,
  onallowPOIcsbtChange,
}) => {
  const { clientIP } = useClientIP();
  const router = useRouter();

  const [enableSbtPaym, setenableSbtPaym] = useState(false);
  useEffect(() => {
    const cachedData = cachedInfo;
    if (cachedData) {
      // Define an async function to handle data loading

      if (router.isReady) {
        const { id } = router.query;

        if (id) {
          getCardInfo(id);
        } else {
          getExistingCardDetails(cachedData);
        }
      }
    }
  }, [cachedInfo, router.isReady, router.query.id]);

  // Modal Function
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // Credit Cards
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
    dummynumber: "",
  });
  const getExistingCardDetails = async (cachData) => {
    const newData = {
      userSerialId: cachData.user_serial_id,
      tenantId: cachData.tenant_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getallpmethodsinfo",
      token: cachData.accessToken,
    };
    try {
      const { data } = await axios.post("/api/signup", finalData); // call the new API route

      if (data) {
        if (data.length > 0) {
          plotCardInfo(data[0]);
          // setenableSbtPaym(true)
        } else {
          setenableSbtPaym(true);
        }
      } else {
        setenableSbtPaym(true);
        toast.error("Error: " + data.status_code + " " + data.status_msg);
      }
    } catch (error) {
      setenableSbtPaym(true);
      toast.error("An error occurred");
    }
  };
  const getCardInfo = async (did) => {
    const newData = {
      cardId: did,
      userSerialId: cachedInfo.user_serial_id,
      tenantId: cachedInfo.tenant_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getpmethodsinfo",
      token: cachedInfo.accessToken,
    };
    try {
      const { data } = await axios.post("/api/signup", finalData); // call the new API route
      // plotCardInfo(data);
      if (data.status === "COMPLETED") {
        plotCardInfo(data);
        toast.success("success");
      } else if (data.status === "ERROR") {
        toast.error("Error: Payment Failed!");
        getExistingCardDetails(cachedInfo);
        router.replace("/signup");
      } else {
        getExistingCardDetails(cachedInfo);
        router.replace("/signup");
        //setenableSbtPaym(true)
        // toast.error('Error: '+data.status_code+' ' + data.status_msg);
      }
    } catch (error) {
      getExistingCardDetails(cachedInfo);
      router.replace("/signup");
      //setenableSbtPaym(true)
      // toast.error('An error occurred ');
      console.log(error);
    }
  };

  const [scardI, setscardI] = useState(false);
  const [cardDet, setCardDet] = useState({
    dummynumber: "",
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const plotCardInfo = (data) => {
    setenableSbtPaym(false);
    if (data) {
      const cardDet = {
        dummynumber: data.first6Digits + "******" + data.last4Digits,
        number: data.first6Digits + "******" + data.last4Digits,
        expiry: data.mm + "/" + data.yy.substring(data.yy.length - 2),
        cvc: "",
        name: data.cardHolderName,
        focus: data.cardHolderName,
      };

      setState(cardDet);

      setTimeout(() => {
        allowpaymentDone(true);

        setscardI(true);
        setenableSbtPaym(true);
      }, 0);
    }
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };
  const [iframeSrc, setIframeSrc] = useState("");
  const handleOpenByData = async () => {
    const newData = {
      cardType: "primary",
      amount: 1,
      currency: "SAR",
      userId: cachedInfo.user_serial_id,
      customerId: cachedInfo.tenant_id,
     // ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "addpmethodsinfo",
      token: cachedInfo.accessToken,
    };
    try {
      const { data } = await axios.post("/api/signup", finalData); // call the new API route

      if (data) {
        setIframeSrc(data.url);
        handleOpen();
      } else {
        toast.error("Error: " + data.status_code + " " + data.status_msg);
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const [hiddenCardNum, sethiddenCardNum] = useState(true);

  return (
    <>
      <Box>
        {!enableSbtPaym && (
          <>
            <Grid item xs={12} align="center">
              <CommonFallbackSpinner />
            </Grid>
          </>
        )}

        {enableSbtPaym && !scardI && (
          <>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography
                component="h4"
                variant="h6"
                align="center"
                sx={{ mb: 3 }}
                className={styles.contactHeading}
              >
                Add your card for future billings
              </Typography>
              <Box
                component="img"
                align="center"
                className={styles.creditCard}
                alt="credit card"
                src="/images/pages/signup/creditCard.png"
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 4 }}
                className={styles.commonBtn}
                onClick={handleOpenByData}
              >
                ADD CARD
              </Button>
            </Grid>
          </>
        )}

        {/* START Credit Card Add Here */}
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
        {/* END Credit Card Add Here */}
      </Box>
      {/* START Credit Card Form Design */}
      {enableSbtPaym && scardI && (
        <form autoComplete="off">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            rowSpacing={1}
            spacing={2}
            sx={{ mt: 4 }}
          >
            <Grid item xs={12} sm={8} md={7} lg={5} xl={5}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Cards
                  number={state.number}
                  expiry={state.expiry}
                  cvc={state.cvc}
                  name={state.name}
                  focused={state.focus}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 4 }}>
                {/* <CssTextField margin="normal" fullWidth id="cardnumber" label="Card Numbar" type="number" name="cardnumber" /> */}
                {!hiddenCardNum && (
                  <CssTextField
                    margin="normal"
                    fullWidth
                    type="text"
                    name="number"
                    label="Card Number"
                    value={state.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                )}

                <CssTextField
                  disabled
                  value={state.dummynumber}
                  margin="normal"
                  fullWidth
                  type="text"
                  name="number"
                  label="Card Number"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </Grid>
              <Grid container direction="row" rowSpacing={1} spacing={2}>
                <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
                  <CssTextField
                    disabled
                    margin="normal"
                    fullWidth
                    type="text"
                    name="name"
                    label="Name on Card"
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                  <CssTextField
                    disabled
                    margin="normal"
                    fullWidth
                    type="tel"
                    name="expiry"
                    label="Expiry"
                    pattern="\d\d/\d\d"
                    value={state.expiry}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    inputProps={{ maxLength: 4 }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} align="center">
                <Button
                  type="button"
                  size="large"
                  variant="contained"
                  sx={{ mt: 3, mb: 4 }}
                  className={styles.commonBtn}
                >
                  <LockIcon sx={{ fontSize: "18px", mr: 1 }} /> Saved
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}

      {/* END Credit Card Form Design */}
      <Grid item xs={12} align="center">
        <Box className={styles.creditCardContent}>
          <Typography
            component="p"
            variant="h6"
            color={"#6DCCDD"}
            sx={{ fontSize: "14px", fontWeight: "400px" }}
          >
            Detacloud charges your card SAR 1 as part of the credit card
            verification process.
          </Typography>
          <Typography
            component="p"
            variant="h6"
            color={"#6DCCDD"}
            sx={{ fontSize: "14px", fontWeight: "400px" }}
          >
            We will refunds the SAR 1 after verification is complete.
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default PaymentMethodsSubmit;
