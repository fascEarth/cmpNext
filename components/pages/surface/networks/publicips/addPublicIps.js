import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  MenuItem,
  Grid,
  FormControl,
  TextField,
  InputLabel,
  Select,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";
import LockIcon from "@mui/icons-material/Lock";
// Custom CSS
import styles from "./index.module.css";
import Cookies from "js-cookie";
import { useClientIP } from "../../../../../utils/context/ClientIPContext";

// Define your custom TextField style
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

// Define your custom FormControl style
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
  },
});

// Define the MenuProps for Select Field
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

// Define your custom BootstrapDialog style
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "auto",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// Define your custom BootstrapDialogTitle component
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

// Define your custom ModalButton style
const ModalButton = styled(Button)(({ theme }) => ({
  color: "#FFF",
  backgroundImage: "linear-gradient(45deg, #0288d1, #26c6da) !important",
  "&:hover": {
    backgroundImage: "linear-gradient(45deg, #0288d1, #26c6da) !important",
  },
}));

function AddPublicIps({
  orderMapId,
  orderId,
  ctype,
  stcachdata,
  Modalopen,
  setOpen,
  loadTableInfo,
  setloadTableInfo,
  page,
  setPage,
  setAddBtnBlock,
}) {
  const { clientIP } = useClientIP();
  // const [ModalopenHere, setModalopenHere] = useState(false);
  useEffect(() => {
    // Initialize state and perform necessary actions when Modalopen, stcachdata, ctype, orderMapId, or orderId changes
    setselectedQantVal(0);
    resetCommon();
    setCommonFormData({
      orderIPName: "",
      orderIPDesc: "",
      orderIPQuantity: "",
      teamId: "",
    });

    if ((stcachdata && ctype === "add") || ctype === "edit") {
      getAllInitItems(stcachdata);
    }

    if (stcachdata && ctype === "add") {
      // getAllInitItems(stcachdata);

      setCommonShowForm(true);
    } else if (stcachdata && ctype === "edit" && orderMapId && orderId) {
      // getAllInitItems(stcachdata);

      getParticularOrderItems(stcachdata, Modalopen);
    }
  }, [Modalopen, stcachdata, ctype, orderMapId, orderId]);

  const formCommonMethods = useForm();
  const {
    register: registerCommon,
    handleSubmit: handleSubmitCommon,
    formState: { isSubmitting, errors: errorsCommon },
    reset: resetCommon,
  } = formCommonMethods;

  console.log(errorsCommon, "errorsCommon");
  const [commonShowForm, setCommonShowForm] = useState(false);

  const [commonFormData, setCommonFormData] = useState({
    orderIPName: "",
    orderIPDesc: "",
    orderIPQuantity: "",
    teamId: "",
  });

  // Modal Popup Function
  const ModalhandleClose = () => {
    resetCommon();
    setCommonFormData({
      orderIPName: "",
      orderIPDesc: "",
      orderIPQuantity: "",
      teamId: "",
    });
    setInputErrorMsg("");
    setOpen(false);
    errorsCommon.orderIPQuantity = false;
    errorsCommon.orderIPName = false;
    errorsCommon.orderIPDesc = false;
    errorsCommon.teamId = false;
  };

  // Select Field CheckBox Function
  const [personName, setPersonName] = React.useState([]);
  const handleSelectCheckChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [selectedQantVal, setselectedQantVal] = useState(0);
  const handleIpquanity = (e) => {
    const idQ = e.target.value;
    const vals = commonIpQuant * parseInt(idQ);
    setselectedQantVal(vals);
    setCommonFormData({
      ...commonFormData,
      orderIPQuantity: e.target.value,
    });

    if (idQ) {
      errorsCommon.orderIPQuantity = false;
    }
  };

  const [originalFormDatas, setoriginalFormDatas] = useState({});

  const getParticularOrderItems = async (tdata) => {
    const newData = {
      orderMapId: orderMapId,
      orderId: orderId,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getParticularOrderItems",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/publicips",
        finalData
      ); // call the new API route
      console.log(data, "particular");

      if (data && data.status === "ok" && data.message) {
        const datasToCompare = {
          orderIPName: data.message.orderIPName,
          orderIPDesc: data.message.orderIPDesc,
          orderIPQuantity: data.message.orderIPQuantity,
          teamId: data.message.teamId,
        };

        setoriginalFormDatas(datasToCompare);

        setCommonFormData({
          orderIPName: data.message.orderIPName,
          orderIPDesc: data.message.orderIPDesc,
          orderIPQuantity: data.message.orderIPQuantity,
          teamId: data.message.teamId,
        });

        const vals = commonIpQuant * parseInt(data.message.orderIPQuantity);
        setselectedQantVal(vals);
        setCommonShowForm(true);
      }
    } catch (error) {
      // Handle error
    }
  };

  function isObjectsEqual() {
    const keysA = commonFormData;
    const keysB = originalFormDatas;

    return (
      keysA.orderIPName !== keysB.orderIPName ||
      keysA.orderIPDesc !== keysB.orderIPDesc ||
      keysA.orderIPQuantity !== keysB.orderIPQuantity ||
      keysA.teamId !== keysB.teamId
      //  ||
      // rows.length > 0
    );
  }

  const [commonTeams, setcommonTeams] = useState([]);
  const [commonIpQuant, setcommonIpQuant] = useState([]);

  const getAllInitItems = async (tdata) => {
    const newData = {
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getpublicipsinitialItems",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/publicips",
        finalData
      ); // call the new API route
      if (data) {
        const teams = data.find((x) => x.type === "teams");
        const ipquant = data.find((x) => x.type === "ipQuantity");
        console.log(teams.list, "publicip");

        setcommonTeams(teams);

        if (teams) {
          const itemWithCurrentState1 = teams.list.find(
            (item) => item.isUsed === true
          );

          if (itemWithCurrentState1) {
            setTimeout(() => {
              getAllInitItems(tdata);
            }, 15000);
          }
        }

        setcommonIpQuant(ipquant.list[0].value);
      }
    } catch (error) {
      // Handle error
    }
  };
  const [inputErrorMsg, setInputErrorMsg] = useState("");

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    if (name === "teamId") {
      if (value) {
        errorsCommon.teamId = false;
      }
    }

    if (name === "orderIPName") {
      if (value && value.length < 3) {
        errorsCommon.orderIPName = false;

        setInputErrorMsg("Order IP name should be 3 to 25 characters");
      } else if (value.length === 3) {
        setInputErrorMsg("");
      } else {
        setInputErrorMsg("");
      }
    }

    setCommonFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setCommonFormData((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const oncommonSubmit = async (data) => {
    if (ctype === "edit") {
      data = commonFormData;
    }

    // Check if all required key values in poiPIstate are filled
    const requiredFields = [
      "orderIPName",
      "orderIPDesc",
      "orderIPQuantity",
      "teamId",
    ];

    const iscommonstateFilled = requiredFields.every((key) => {
      if (key === "orderIPDesc") {
        return true; // Skip validation for middleName field
      }
      return data[key] !== "";
    });

    if (iscommonstateFilled) {
      // All required key values are filled
      handleDataManipulation(data);
    } else {
      // Some required key values are not filled
    }
  };

  const handleDataManipulation = async (data) => {
    const tdata = stcachdata;
    data.tenantId = tdata.tenant_id;

    if (data.teamId == 1 || data.teamId == "1") {
      data.teamId = 0;
    }
    const newData = {
      type: ctype,
      data: data,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    if (ctype === "edit") {
      data.mapOrderIPId = orderMapId;
      data.orderIPId = orderId;
    }
    const finalData = {
      data: newData,
      endPoint: "addpublicips",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/publicips",
        finalData
      );

      console.log(data, "submitdata");
      if (data && data.status === "ok") {
        ModalhandleClose();
        if (page !== 0 && ctype == "add") {
          Cookies.remove("PublicIpTablePage");
          setPage(0);
        }

        const successMessage =
          ctype === "edit"
            ? "Public IP's has been updated successfully!"
            : "Public IP's has been added successfully!";
        toast.success(successMessage);
        resetCommon();

        setloadTableInfo(true);
      } else if (data.status === "error") {
        // if (data.message === "Error Occoured for duplicate orderIP name.") {
        toast.error(data.message);
        // }

        // resetCommon();
      } else {
        toast.error("Please Contact Admin");
      }
    } catch (error) {
      // Handle error
    }
  };

  function generateRandomId(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  const nameDisabled = ctype === "edit";
  return (
    <>
      <BootstrapDialog
        onClose={ModalhandleClose}
        aria-labelledby="customized-dialog-title"
        open={Modalopen}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          align="left"
          onClose={ModalhandleClose}
        >
          {ctype === "add" ? "Order Public IP" : "Edit Public IP"}
        </BootstrapDialogTitle>
        {/* {!commonShowForm && <>Loading Please Wait ...</>}
        {commonShowForm && (
          <> */}
        <Box
          onSubmit={handleSubmitCommon(oncommonSubmit)}
          component="form"
          autoComplete="off"
        >
          <DialogContent dividers>
            <Typography
              component="p"
              variant="p"
              color={"#6b6f82"}
              align="left"
              sx={{ pt: 1, pb: 1, fontSize: "14px" }}
            >
              Choose the number of additional IPs that you need from a given
              external network subnet. The IPs will automatically be allocated
              to the Edge Gateway. You can allocate from any subnet or a
              particular subnet.
            </Typography>

            <CssFormControl margin="normal" autoFocus fullWidth>
              <InputLabel id="demo-multiple-checkbox-label">
                Select Team
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="teamId"
                label="Select a Team"
                name="teamId"
                {...registerCommon("teamId", {
                  required: commonFormData.teamId
                    ? false
                    : "Please select a team",
                })}
                value={
                  commonFormData.teamId
                    ? commonFormData.teamId
                    : ctype === "edit"
                    ? [1]
                    : commonFormData.teamId
                }
                onChange={handleInputChange}
                MenuProps={MenuProps}
                error={!!errorsCommon.teamId}
              >
                <MenuItem disabled>Select Any</MenuItem>
                <MenuItem value="1">None of the team</MenuItem>
                {commonTeams.list &&
                  commonTeams.list.map((elem) => (
                    <MenuItem
                      key={generateRandomId(8) + "-" + elem.id}
                      value={elem.id}
                      disabled={elem.isUsed}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      {elem.value}
                      {elem.isUsed && <LockIcon color="grey" />}
                    </MenuItem>
                  ))}
              </Select>
              {errorsCommon.teamId && (
                <FormHelperText error>
                  {errorsCommon.teamId.message}
                </FormHelperText>
              )}
            </CssFormControl>
            <CssTextField
              margin="normal"
              fullWidth
              id="name"
              label="Order IP Name"
              name="orderIPName"
              {...registerCommon("orderIPName", {
                required: commonFormData.orderIPName
                  ? false
                  : "Order IP Name is required",
              })}
              value={commonFormData.orderIPName}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              InputProps={{
                readOnly: ctype === "edit" ? true : false,
              }}
              inputProps={{
                style: { cursor: nameDisabled ? "not-allowed" : "auto" },
                maxLength: 25,
                minLength: 3,
              }}
            />

            {!inputErrorMsg && (
              <>
                {errorsCommon.orderIPName && (
                  <FormHelperText error>
                    {errorsCommon.orderIPName.message}
                  </FormHelperText>
                )}
              </>
            )}
            {inputErrorMsg && (
              <Typography
                variant="span"
                sx={{ fontSize: "0.75rem", color: "#d32f2f" }}
              >
                {inputErrorMsg}
              </Typography>
            )}

            {/* {errorsCommon.orderIPName && (
              <FormHelperText error>
                {errorsCommon.orderIPName.message}
              </FormHelperText>
            )} */}
            <CssTextField
              margin="normal"
              fullWidth
              id="desc"
              label="Description (Optional)"
              name="orderIPDesc"
              {...registerCommon("orderIPDesc")}
              value={commonFormData.orderIPDesc}
              onChange={handleInputChange}
            />
            {/* {errorsCommon.orderIPDesc && (
              <FormHelperText error>
                {errorsCommon.orderIPDesc.message}
              </FormHelperText>
            )} */}
            <Grid
              container
              direction="row"
              rowSpacing={2}
              spacing={2}
              display={"flex"}
              justifyContent="center"
            >
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ mt: "16px", color: "#000" }}
                >
                  Quantity of IPs
                </InputLabel>
                <CssFormControl margin="normal" fullWidth sx={{ mt: "5px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Select IP Quantity
                  </InputLabel>
                  <Select
                    label={" Select IP Quantity"}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="orderIPQuantity"
                    {...registerCommon("orderIPQuantity", {
                      required: commonFormData.orderIPQuantity
                        ? false
                        : "Please select IP Quantity",
                    })}
                    value={commonFormData.orderIPQuantity}
                    // defaultValue={commonFormData.orderIPQuantity}
                    onChange={handleIpquanity}
                    MenuProps={MenuProps}
                    disabled={ctype === "edit" ? true : false}
                    sx={{
                      "& .MuiSelect-select.Mui-disabled": {
                        cursor: "not-allowed !important",
                      },
                    }}
                  >
                    <MenuItem value={""} disabled>
                      Select Any
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    {/* <MenuItem value={2} >2</MenuItem>
                        <MenuItem value={3} >3</MenuItem>
                        <MenuItem value={4} >4</MenuItem>
                        <MenuItem value={5} >5</MenuItem> */}
                  </Select>
                  {errorsCommon.orderIPQuantity && (
                    <FormHelperText error>
                      {errorsCommon.orderIPQuantity.message}
                    </FormHelperText>
                  )}
                </CssFormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ mt: "16px", color: "#000" }}
                >
                  Cost / Month
                </InputLabel>
                <Box align="center" className={styles.IPCost}>
                  {selectedQantVal} SAR
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography
                  component="p"
                  variant="p"
                  color={"rgb(255, 77, 73)"}
                  align="left"
                  sx={{ pb: 1, fontSize: "13px" }}
                >
                  Note: SNAT & DNAT rules have to be configured separately in
                  NAT Page.
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <ModalButton
              disabled={isSubmitting ? isSubmitting : !isObjectsEqual()}
              type="submit"
              variant="contained"
              size="medium"
              sx={{
                position: "absolute",
                left: "45%",
                "&.MuiButtonBase-root": {
                  backgroundColor: "unset",
                },
                "&.MuiButtonBase-root.Mui-disabled": {
                  backgroundColor: "rgba(0, 0, 0, 0.12)",
                },
              }}
            >
              {ctype === "add" ? "Order" : "Update"}
            </ModalButton>
            <Button onClick={ModalhandleClose} sx={{ color: "#6DCCDD" }}>
              Close
            </Button>
          </DialogActions>
        </Box>
        {/* </>
        )} */}
      </BootstrapDialog>
    </>
  );
}

export default AddPublicIps;
