// ** React Imports
import * as React from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";

// ** MUI Components
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  Checkbox,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";

// ** MUI ICON Components
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import SettingsPowerOutlinedIcon from "@mui/icons-material/SettingsPowerOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import InsertPageBreakOutlinedIcon from "@mui/icons-material/InsertPageBreakOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from "../../../../../../pages/surface/settings/security/index.module.css";

import { Loading } from "mdi-material-ui";
import { FormHelperText } from "@mui/material";
import { useClientIP } from "../../../../../../utils/context/ClientIPContext";

// ** Table ODD AND EVEN Styles
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#FFF",
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

// Modal Popup Style
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    // width: "600px",
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

function SSHKeyAddForm({
  sethandleClickOpenPass,
  sshkeysEffect,
  setsshkeysEffect,
  handleClickOpenPass,
  initEverythingForm,
}) {
  const { clientIP } = useClientIP();

  const [commonPtype, setcommonPtype] = useState("add");
  const [commonShowForm, setCommonShowForm] = useState(false);
  // ** Modal Popup Function
  const [Modalopen, setOpen] = React.useState(false);
  const handleClickOpen = (id, type) => {
    handleClose();
    //setpId(id);
    setcommonPtype(type);

    resetCommon();

    setCommonFormData({
      sshKeyName: "",
      sshKeyFingerPrint: "",
    });
    if (type === "add") {
      setCommonShowForm(true);
      setOpen(true);
    }
  };
  const ModalhandleClose = () => {
    setOpen(false);
    sethandleClickOpenPass(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  // ** Textarea Custom CSS
  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    position: relative;
    display: block;
    margin-top: 16px;
    padding: 12px;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    border-radius: 7px;
    color: rgba(0, 0, 0, 0.87);
    border: 1px solid;
    border-color: #ccc;
    -webkit-animation-name: mui-auto-fill-cancel;
    animation-name: mui-auto-fill-cancel;
    -webkit-animation-duration: 10ms;
    animation-duration: 10ms;
  
    &:hover {
      border: 2px solid;
      border-color: #6DCCDD;
    } 
  
    &:focus {
      border: 2px solid;
      border-color: #015578;
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  useEffect(() => {
    if (handleClickOpenPass) {
      handleClickOpen(null, "add");
    }
  }, [handleClickOpenPass]);

  const cookies = Cookies.get("userData");
  const [stcachdata, setstcachdata] = useState([]);
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;

    if (cachData) {
      setstcachdata(cachData);
    }
  }, [cookies]);

  const formCommonMethods = useForm();

  const {
    register: registerCommon,
    handleSubmit: handleSubmitCommon,
    formState: { isSubmitting, errors: errorsCommon },
    reset: resetCommon,
  } = formCommonMethods;

  const [commonFormData, setCommonFormData] = useState({
    sshKeyName: "",
    sshKeyFingerPrint: "",
  });

  const oncommonSubmit = async (data) => {
    // Check if all required key values in poiPIstate are filled
    const requiredFields = ["sshKeyName", "sshKeyFingerPrint"];

    const iscommonstateFilled = requiredFields.every((key) => {
      return data[key] !== "";
    });

    // Usage:
    if (iscommonstateFilled) {
      // All required key values are filled

      handleDataManipulation(data);
    } else {
      // Some required key values are not filled
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleDataManipulation = async (data) => {
    setIsLoading(true); //TR Sanjai
    const tdata = stcachdata;
    let pendPoint = "getAdddataInfo";
    data.userSerialId = tdata.user_serial_id;

    const newData = {
      data: data,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: pendPoint,
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/settings/security/sshkeys",
        finalData
      ); // call the new API route

      if (data.status === "ok") {
        ModalhandleClose();
        toast.success("SSH Key has been added successfully!");
        setsshkeysEffect(true);
        setIsLoading(false); //TR Sanjai
        resetCommon();
        initEverythingForm(tdata);
      } else if (data.status === "error") {
        toast.error("SSH Key name already exist");
        setIsLoading(false);
      }
    } catch (error) {
      // toast.error('An error occurred');
      setIsLoading(false);
    }
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setCommonFormData((prev) => ({ ...prev, [name]: value }));
    // TR SANJAI
    if (name === "sshKeyName") {
      if (value) {
        errorsCommon.sshKeyName = false;
      }
    }
    if (name === "sshKeyFingerPrint") {
      if (value === "ssh-rsa") {
        errorsCommon.sshKeyFingerPrint = false;
        // errorsCommon.sshKeyFingerPrint.message = "";
      }
    }
    // TR SANJAI
  };

  const handleInputFocus = (evt) => {
    setCommonFormData((prev) => ({ ...prev, focus: evt.target.name }));
  };
  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const validInputPattern = /^[a-zA-Z0-9\s-_]*$/;

    if (!validInputPattern.test(event.key) && keyCode !== 32) {
      event.preventDefault();
    }
  };

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
          sx={{ padding: "10px 16px", fontSize: "16px" }}
        >
          {commonPtype === "add" ? "CREATE SSH KEY" : "EDIT SSH KEY"}
        </BootstrapDialogTitle>
        {!commonShowForm && <>Loading Please Wait ...</>}
        {commonShowForm && (
          <>
            <Box
              onSubmit={handleSubmitCommon(oncommonSubmit)}
              component="form"
              autoComplete="off"
            >
              <DialogContent
                dividers
                sx={{
                  width: { lg: "600px", xs: "100%", sm: "100%", md: "600px" },
                }}
              >
                <CssTextField
                  inputProps={{ maxLength: 25, minLength: 3 }}
                  sx={{
                    width: {
                      sm: 500,
                      md: "100%",
                      xs: "fit-content",
                      lg: "100%",
                      xl: "100%",
                    },
                  }}
                  margin="normal"
                  autoFocus
                  fullWidth
                  id="sshKeyName"
                  label="SSH Key Name"
                  name="sshKeyName"
                  {...registerCommon("sshKeyName", {
                    required: "SSH Key Name is required",
                  })}
                  value={commonFormData.sshKeyName}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onKeyPress={handleKeyPress}
                  error={!!errorsCommon.sshKeyName} // Add the error prop to highlight the field when there is an error
                  helperText={
                    errorsCommon.sshKeyName && errorsCommon.sshKeyName.message
                  } // Show the error message
                  InputProps={{
                    readOnly: commonPtype === "edit" ? true : false,
                  }}
                />

                <Grid
                  container
                  direction="row"
                  rowSpacing={2}
                  spacing={2}
                  display={"flex"}
                  justifyContent="center"
                >
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <CssTextField
                      rows={5}
                      multiline
                      sx={{
                        width: {
                          sm: 500,
                          md: "100%",
                          xs: "fit-content",
                          lg: "100%",
                          xl: "100%",
                        },
                      }}
                      margin="normal"
                      fullWidth
                      id="sshKeyFingerPrint" // Change the ID to match the name
                      label="Enter your public SSH key in OpenSSH format"
                      name="sshKeyFingerPrint" // Change the name to match the ID
                      {...registerCommon("sshKeyFingerPrint", {
                        required:
                          "Public SSH key is required. SSH Key must be ssh-rsa OpenSSH format. Example: ssh-rsa AzklMnoQ125", //TR SANJAI
                        pattern: {
                          value: /^ssh-rsa/,
                          message:
                            "Public SSH key is required. SSH Key must be ssh-rsa OpenSSH format. Example: ssh-rsa AzklMnoQ125",
                        },
                        // TR SANJAI
                      })}
                      value={commonFormData.sshKeyFingerPrint}
                      onChange={handleInputChange}
                    />

                    {errorsCommon.sshKeyFingerPrint && (
                      <FormHelperText error>
                        {errorsCommon.sshKeyFingerPrint.message}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <ModalButton
                  disabled={isLoading}
                  type="submit"
                  variant="contained"
                  size="medium"
                  sx={{
                    position: "absolute",
                    left: "45%",
                    backgroundImage: "linear-gradient(45deg, #0288d1, #26c6da)",
                    "&.MuiButtonBase-root": {
                      backgroundColor: "unset",
                    },
                    "&.MuiButtonBase-root.Mui-disabled": {
                      backgroundColor: "rgba(0, 0, 0, 0.12)",
                    },
                  }}
                >
                  {isLoading ? (
                    <>
                      <AutorenewIcon
                        className={styles.loadingBtn}
                        sx={{ color: "#fff" }}
                      />
                    </>
                  ) : commonPtype === "add" ? (
                    "ADD"
                  ) : (
                    "UPDATE"
                  )}
                </ModalButton>
                <Button onClick={ModalhandleClose} sx={{ color: "#6DCCDD" }}>
                  Close
                </Button>
              </DialogActions>
            </Box>
          </>
        )}
      </BootstrapDialog>
    </>
  );
}

export default SSHKeyAddForm;
