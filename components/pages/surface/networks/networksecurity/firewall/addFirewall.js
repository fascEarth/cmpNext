// ** React Imports
import * as React from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";

// ** MUI Components
import { styled } from "@mui/material/styles";
import {
  TableCell,
  TableRow,
  TextField,
  Checkbox,
  Button,
  Grid,
  Typography,
  Box,
  FormHelperText,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";

// ** MUI ICON Components
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";

import { toast } from "react-toastify"; //
import { Controller, useForm } from "react-hook-form";
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

// Select Field CheckBox Names
const names = ["Any", "IP Set 1", "IP Set 2"];
const destinationIds = [{ id: 5, value: "destination" }];
// Modal Popup Style
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "600px !important",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root.MuiPaper-elevation": {
    maxWidth: "600px !important",
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

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 35,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(18px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "rgb(98 167 53)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgb(92 92 92 / 25%)",
    boxSizing: "border-box",
  },
}));

export const AddFirewall = ({
  page,
  setPage,
  stcachdata,
  firewallInfo,
  setFirewallInfo,
  ModalhandleClose,
  Modalopen,
  setOpen,
  type,
  setType,
  editId,
  fetchData,
  handleClose,
  isObjectsEqual,
}) => {
  const { clientIP } = useClientIP();

  // ** Modal Popup Function
  // Select Field CheckBox Function
  const handleSelectCheckChange = (event) => {
    const {
      target: { value },
    } = event;

    setFirewallInfo((prev) => ({ ...prev, [name]: value }));
  };

  // default Table items
  const [data, setData] = useState([]);

  const cookies = Cookies.get("userData");

  // Table Action DropDown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /* changing items */

  // *********TR 01 ****************
  useEffect(() => {
    if (Cookies) {
      fetchFormData();
    }
  }, [Cookies]);
  useEffect(() => {
    if (Cookies) {
      fetchFormData();
    }
  }, []);
  setTimeout(() => {
    fetchFormData();
  }, 30000);
  const [applcations, setapplcations] = useState([]);
  const [mode, setMode] = useState([]);
  const [formipsets, setformipsets] = useState([]);
  const [firewallType, setFirewallType] = useState([]);
  const [defaultfirewallType, setdefaultfirewallType] = useState("");
  const fetchFormData = async () => {
    // const tdata = cookies ? JSON.parse(cookies) : [];
    const tdata = cookies ? JSON.parse(cookies) : [];

    const newData = {
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getFirfallFormData",
      token: tdata.accessToken,
    };

    try {
      const { data } = await axios.post(
        "/api/surface/networks/networksecurity/firewall",
        finalData
      ); // call the new API route
      if (data) {
        data.map(function (elem) {
          if (elem.type === "modes") {
            setMode(elem);
            setFirewallInfo((prev) => ({
              ...prev,
              firewallModeId: elem?.defaultId,
            }));
          } else if (elem.type === "applcations") {
            setapplcations(elem);
          } else if (elem.type === "ipsets") {
            console.log(elem, "data");

            setformipsets(elem);
          } else if (elem.type === "types") {
            setFirewallType(elem);
            const defaultTypeId = elem.defaultId;
            const filteredObj = elem.list.filter(
              (item) => item.id === defaultTypeId
            );
            if (filteredObj) {
              setdefaultfirewallType(filteredObj[0].value);
              setFirewallInfo((prev) => ({
                ...prev,
                firewallType: filteredObj[0].value,
              }));
            }
          } else if (elem.type === "priorityid") {
            setFirewallInfo((prev) => ({
              ...prev,
              firewallPriorityId: elem?.list[0].value,
            }));
          }
        });
        // toast.success("Sucess");
      }
    } catch (error) {
      // toast.error("An error occurred");
    }
  };

  // *********TR 01 ****************
  // TR 01 ***********TR 01 POST CALL ************
  const formCommonMethods = useForm();
  const {
    register: registerCommon,
    handleSubmit: handleSubmitCommon,
    formState: { isSubmitting, errors: errorsFirewall },
    reset: reset,
  } = formCommonMethods;

  const [inputErrMsg, setInputErrMsg] = useState({
    nameErrMsg: "",
  });
  const [nameErr, setnameErr] = useState(false);
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFirewallInfo((prev) => ({ ...prev, [name]: value }));

    if (name == "firewallName") {
      if (value) {
        setnameErr(false);
        if (value.length <= 2 || !/(?:[a-zA-Z].*){3,}/.test(value)) {
          setnameErr(true);
          setInputErrMsg({
            ...inputErrMsg,
            nameErrMsg: "Minimum 3 characters required",
          });
        } else if (value.length >= 25) {
          setnameErr(true);

          setInputErrMsg({
            ...inputErrMsg,
            nameErrMsg: "Firewall name must be 3 to 25 characters",
          });
        } else if (!/^[a-zA-Z0-9_-]{3,25}$/.test(value)) {
          setnameErr(true);

          setInputErrMsg({
            ...inputErrMsg,
            nameErrMsg: "Only hyphen and underscore are allowed",
          });
        } else {
          setnameErr(false);
        }
      } else if (!value) {
        setnameErr(true);

        setInputErrMsg({
          ...inputErrMsg,
          nameErrMsg: "Name is required",
        });
      }
    }
  };
  const handleSwitchChange = (newState) => {
    setFirewallInfo((prev) => ({ ...prev, state: newState.target.checked }));
  };
  const handlealogginSwitchChange = (newState) => {
    setFirewallInfo((prev) => ({ ...prev, logging: newState.target.checked }));
  };

  const handleAddFirewall = async (data) => {
    if (data.firewallType == "") {
      data.firewallType = defaultfirewallType;
    }
    if (data.firewallModeId == "") {
      data.firewallModeId = mode.defaultId;
    }
    if (data.firewallPriorityId == null) {
      data.firewallPriorityId = 1;
    }
    const updatedApplication = data.applicationIds.filter((id) => id !== "");
    if (data.applicationIds.length === 0) {
      data.applicationIds = [];
    } else {
      data.applicationIds = updatedApplication;
    }

    const updatedSourceIds = data.sourceIds.filter((id) => id !== "");
    data.destinationIds = data.destinationIds.filter(Boolean);
    data.sourceIds = data.sourceIds.filter(Boolean);
    if (data.sourceIds.length === 0) {
      data.sourceIds = [];
    } else {
      data.sourceIds = updatedSourceIds;
    }
    const updatedDestination = data.destinationIds.filter((id) => id !== "");
    if (data.destinationIds.length === 0) {
      data.destinationIds = [];
    } else {
      data.destinationIds = updatedDestination;
    }
    const tdata = cookies ? JSON.parse(cookies) : [];
    data.tenantId = tdata.tenant_id;
    const newData = {
      data: data,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    var endPoint = "addFirewall";
    if (type === "edit") {
      data.firewallId = editId;
      endPoint = "updatefirewall";
    }
    const finalData = {
      data: newData,
      endPoint: endPoint,
      token: tdata.accessToken,
    };
    // return
    try {
      const { data } = await axios.post(
        "/api/surface/networks/networksecurity/firewall",
        finalData
      );

      if (data) {
      }
      if (data.status === "ok") {
        if (type === "edit") {
          toast.success("New Firewall has been updated successfully");
        } else {
          // if (page !== 0) {
          //   Cookies.remove("firwallTablePage");
          //   setPage(0);
          // }
          toast.success("New Firewall has been added successfully");
        }
        fetchFormData();
        // handleClose();
        ModalhandleClose();
        // reset();
      }
      if (data.status === "error") {
        toast.error(data.message);
        fetchFormData();
      }
      fetchData(stcachdata);
    } catch (e) {
      console.error(e);
      toast.error("please fill valid information");
    }
  };

  const onSubmit = (data) => {
    if (nameErr) {
      return;
    }

    const cachData = cookies ? JSON.parse(cookies) : true;
    handleAddFirewall(firewallInfo);
    // handleClose();
    // ModalhandleClose();
    // reset();
  };
  const handleReset = () => {
    reset();
    errorsFirewall.firewallPriorityId = false;
    errorsFirewall.firewallName = false;
    errorsFirewall.firewallType = false;
    setnameErr(false);
  };

  useEffect(() => {
    if (formipsets.length > 0) {
      const newObj = { id: "", value: "any" };
      const updatedFormipsets = [...formipsets, newObj];
      setformipsets(updatedFormipsets);
    }
  }, [formipsets.list]);

  const dummyIpset = [{ id: "", value: "any" }];

  const validateHeaderName = () => {
    if (firewallInfo?.firewallName == "") {
      setnameErr(true);
      setInputErrMsg({
        ...inputErrMsg,
        nameErrMsg: "Name is required",
      });
    } else {
      setnameErr(false);
    }
  };
  return (
    <>
      <BootstrapDialog
        onClose={() => {
          ModalhandleClose();
          handleReset();
        }}
        aria-labelledby="customized-dialog-title"
        open={Modalopen}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          align="left"
          onClose={() => {
            ModalhandleClose();
            handleReset();
          }}
          sx={{ padding: "10px 16px", fontSize: "16px" }}
        >
          {/* Add Firewall Rule */}
          {type !== "edit" ? "Add Firewall Rule" : "Edit Firewall Rule"}
        </BootstrapDialogTitle>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmitCommon(onSubmit)}
        >
          <DialogContent dividers>
            <CssTextField
              // disabled
              sx={{
                "& .MuiInputBase-input": { cursor: "not-allowed !important" },
              }}
              value={
                firewallInfo.firewallPriorityId
                  ? firewallInfo.firewallPriorityId
                  : ""
              }
              onChange={handleInputChange}
              margin="normal"
              fullWidth
              inputProps={{
                readOnly: true,
                name: "firewallPriorityId", // Use the name attribute for react-hook-form
                id: "firewallPriorityId",
                ...registerCommon("firewallPriorityId", {
                  // required: "This field is required", // Add validation rule
                }),
              }}
              autoFocus
              label="Priority ID"
              error={!!errorsFirewall.firewallPriorityId} // Add the error prop to highlight the field when there is an error
              helpertext={
                errorsFirewall.firewallPriorityId &&
                errorsFirewall.firewallPriorityId.message
              }
            />
            <CssTextField
              onChange={handleInputChange}
              margin="normal"
              fullWidth
              label="Name"
              value={
                firewallInfo?.firewallName ? firewallInfo?.firewallName : ""
              }
              inputProps={{
                name: "firewallName", // Use the name attribute for react-hook-form
                id: "firewallName",
                ...registerCommon("firewallName", {
                  required:
                    firewallInfo?.firewallName.length < 1
                      ? "This field is required"
                      : false, // Add validation rule
                }),
              }}
            />

            {/** */}
            {nameErr && (
              <FormHelperText error>{inputErrMsg.nameErrMsg}</FormHelperText>
            )}
            <CssTextField
              onChange={handleInputChange}
              margin="normal"
              fullWidth
              id="comments"
              label="Description"
              name="firewallDesc"
            />
            <Grid
              container
              direction="row"
              rowSpacing={2}
              spacing={2}
              display={"flex"}
              justifyContent="center"
            >
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <CssFormControl margin="normal" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Firewall Type
                  </InputLabel>
                  <Select
                    input={<OutlinedInput label=">Firewall Type" />}
                    onChange={(event) => {
                      const {
                        target: { value },
                      } = event;
                      setFirewallInfo((prev) => ({
                        ...prev,
                        firewallType: event.target.value,
                      }));
                    }}
                    value={
                      firewallInfo.firewallType
                        ? firewallInfo.firewallType
                        : defaultfirewallType
                    }
                    inputProps={{
                      name: "firewallType", // Use the name attribute for react-hook-form
                      id: "firewallType",
                      ...registerCommon("firewallType", {
                        required:
                          firewallInfo.firewallType.length < 1
                            ? "This field is required"
                            : false, // Add validation rule
                      }),
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label=""
                    MenuProps={MenuProps}
                  >
                    {firewallType.list &&
                      firewallType.list?.map(function (elem, index) {
                        return (
                          <MenuItem key={elem.id} value={elem.value}>
                            {elem.value}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  {errorsFirewall.firewallType && (
                    <FormHelperText error>
                      {errorsFirewall.firewallType.message}
                    </FormHelperText>
                  )}
                </CssFormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <CssFormControl margin="normal" fullWidth>
                  <InputLabel id="demo-simple-select-label">Modes</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label=""
                    MenuProps={MenuProps}
                    onChange={(event) => {
                      const {
                        target: { value },
                      } = event;
                      setFirewallInfo((prev) => ({
                        ...prev,
                        firewallModeId: value,
                      }));
                    }}
                    value={
                      firewallInfo.firewallModeId
                        ? firewallInfo.firewallModeId
                        : mode.defaultId
                    }
                    input={<OutlinedInput label="Modes" />}
                    inputProps={{
                      name: "firewallModeId", // Use the name attribute for react-hook-form
                      id: "firewallModeId",
                      ...registerCommon("firewallModeId", {
                        required:
                          firewallInfo.firewallModeId.length < 1
                            ? "This field is required"
                            : false, // Add validation rule
                      }),
                    }}
                  >
                    {mode &&
                      mode.list?.map((ele, i) => {
                        return (
                          <MenuItem key={ele.id} value={ele.id}>
                            {ele.value}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  {errorsFirewall.firewallModeId && (
                    <FormHelperText error>
                      {errorsFirewall.firewallModeId.message}
                    </FormHelperText>
                  )}
                </CssFormControl>
              </Grid>
            </Grid>
            <CssFormControl
              sx={{
                "& .MuiFormLabel-root": {
                  paddingRight: "10px",
                  background: "white",
                },
              }}
              margin="normal"
              fullWidth
            >
              <InputLabel id="demo-simple-select-label">
                Application Port
              </InputLabel>
              <Select
                // value={firewallInfo.applicationIds}
                // value={
                //   firewallInfo.applicationIds?.map((id) => parseInt(id))
                //     ? firewallInfo.applicationIds?.map((id) => parseInt(id))
                //     : []
                // }
                value={
                  firewallInfo.applicationIds
                    ? firewallInfo.applicationIds
                    : [""]
                }
                multiple
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Application Port"
                MenuProps={MenuProps}
                onChange={(event) => {
                  if (event.target.value.includes("")) {
                    setFirewallInfo((prev) => ({
                      ...prev,
                      applicationIds: [""],
                    }));
                  } else {
                    setFirewallInfo((prev) => ({
                      ...prev,
                      applicationIds: event.target.value,
                    }));
                  }
                }}
                input={<OutlinedInput label="Application" />}
                inputProps={{
                  name: "applicationIds", // Use the name attribute for react-hook-form
                  id: "applicationIds",
                  ...registerCommon("applicationIds", {
                    required:
                      firewallInfo.applicationIds.length < 1
                        ? "application field is required"
                        : false,
                  }),
                }}
                renderValue={(selected) => {
                  // if(pnetworkInfostate.networkTypeId != 3  ) {
                  //   const selectedApplications = applcations.list?.filter((elem) => selected.includes(elem.id))
                  //   .map((elem) => elem.value);
                  // return selectedApplications.join(", ");
                  if (
                    selected.length === 0 ||
                    selected == "" ||
                    selected.includes("")
                  ) {
                    return "None";
                  } else {
                    const selectedApplications = applcations.list
                      ?.filter((elem) => selected.includes(elem.id))
                      .map((elem) => elem.value);

                    return selectedApplications.join(", ");
                  }
                }}
              >
                <MenuItem value="">
                  <Checkbox
                    sx={{
                      color: "#6b6f82",
                      "&.Mui-checked": { color: "#6DCCDD" },
                    }}
                    checked={firewallInfo.applicationIds[0] == ""}
                  />
                  <ListItemText primary="None" />
                </MenuItem>
                {applcations &&
                  applcations.list?.map((ele) => (
                    <MenuItem
                      key={ele.id}
                      value={ele.id}
                      disabled={firewallInfo.applicationIds.includes("")}
                    >
                      <Checkbox
                        sx={{
                          color: "#6b6f82",
                          "&.Mui-checked": { color: "#6DCCDD" },
                        }}
                        checked={firewallInfo.applicationIds
                          .map((id) => parseInt(id))
                          .includes(ele.id)}
                      />
                      <ListItemText primary={ele.value} />
                    </MenuItem>
                  ))}
              </Select>
              {errorsFirewall.applicationIds && (
                <FormHelperText error>
                  {errorsFirewall.applicationIds.message}
                </FormHelperText>
              )}
            </CssFormControl>
            <CssFormControl margin="normal" fullWidth>
              <InputLabel id="demo-multiple-checkbox-label">
                Select Source
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={firewallInfo.sourceIds ? firewallInfo.sourceIds : [""]}
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;

                  if (value.includes("")) {
                    setFirewallInfo((prev) => ({
                      ...prev,
                      sourceIds: [""],
                    }));
                  } else {
                    setFirewallInfo((prev) => ({
                      ...prev,
                      sourceIds: event.target.value,
                    }));
                  }
                }}
                inputProps={{
                  name: "sourceIds", // Use the name attribute for react-hook-form
                  id: "sourceIds",
                  ...registerCommon("sourceIds", {
                    required:
                      firewallInfo.sourceIds.length < 1
                        ? "sourceIds field is required"
                        : false,
                  }),
                }}
                input={<OutlinedInput label="Select Source" />}
                MenuProps={MenuProps}
                renderValue={(selected) => {
                  if (selected.length === 0 || selected == "") {
                    return "Any";
                  } else {
                    const selectedTeamNames = formipsets.list
                      .filter((elem) => selected.includes(elem.id))
                      .map((elem) => elem.value);

                    return selectedTeamNames.join(", ");
                  }
                }}
              >
                <MenuItem value="">
                  <Checkbox
                    sx={{
                      color: "#6b6f82",
                      "&.Mui-checked": { color: "#6DCCDD" },
                    }}
                    checked={firewallInfo.sourceIds[0] === ""}
                  />
                  <ListItemText primary="Any" />
                </MenuItem>

                {formipsets &&
                  formipsets.list?.map((ele) => (
                    <MenuItem
                      key={ele.id}
                      value={ele.id}
                      disabled={firewallInfo.sourceIds.includes("")}
                    >
                      <Checkbox
                        sx={{
                          color: "#6b6f82",
                          "&.Mui-checked": { color: "#6DCCDD" },
                        }}
                        checked={firewallInfo.sourceIds
                          .map((id) => parseInt(id))
                          .includes(ele.id)}
                      />
                      <ListItemText primary={ele.value} />
                    </MenuItem>
                  ))}
              </Select>
              {errorsFirewall.sourceIds && (
                <FormHelperText error>
                  {errorsFirewall.sourceIds.message}
                </FormHelperText>
              )}
            </CssFormControl>
            <CssFormControl margin="normal" fullWidth>
              <InputLabel id="demo-multiple-checkbox-label">
                Select Destination
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                multiple
                value={
                  firewallInfo.destinationIds
                    ? firewallInfo.destinationIds
                    : [""]
                }
                inputProps={{
                  name: "destinationIds", // Use the name attribute for react-hook-form
                  id: "destinationIds",
                  ...registerCommon("destinationIds", {
                    required:
                      firewallInfo.destinationIds.length < 1
                        ? "destinationIds field is required"
                        : false,
                  }),
                }}
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;
                  if (value.includes("")) {
                    setFirewallInfo((prev) => ({
                      ...prev,
                      destinationIds: [""],
                    }));
                  } else {
                    setFirewallInfo((prev) => ({
                      ...prev,
                      destinationIds: event.target.value,
                    }));
                  }
                }}
                input={<OutlinedInput label="Select Destination" />}
                MenuProps={MenuProps}
                renderValue={(selected) => {
                  if (selected.length === 0 || selected == "") {
                    return "Any";
                  } else {
                    const selectedTeamNames = formipsets.list
                      .filter((elem) => selected.includes(elem.id))
                      .map((elem) => elem.value);

                    return selectedTeamNames.join(", ");
                  }
                }}
              >
                <MenuItem value="">
                  <Checkbox
                    sx={{
                      color: "#6b6f82",
                      "&.Mui-checked": { color: "#6DCCDD" },
                    }}
                    checked={firewallInfo.destinationIds[0] === ""}
                  />
                  <ListItemText primary="Any" />
                </MenuItem>
                {formipsets &&
                  formipsets.list?.map((ele) => (
                    <MenuItem
                      key={ele.id}
                      value={ele.id}
                      disabled={firewallInfo.destinationIds.includes("")}
                    >
                      <Checkbox
                        sx={{
                          color: "#6b6f82",
                          "&.Mui-checked": { color: "#6DCCDD" },
                        }}
                        checked={firewallInfo.destinationIds
                          .map((id) => parseInt(id))
                          .includes(ele.id)}
                      />
                      <ListItemText primary={ele.value} />
                    </MenuItem>
                  ))}
              </Select>
              {errorsFirewall.destinationIds && (
                <FormHelperText error>
                  {errorsFirewall.destinationIds.message}
                </FormHelperText>
              )}
            </CssFormControl>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ mt: "16px", color: "#000", fontWeight: "500" }}
            >
              State
            </InputLabel>
            <Stack direction="row" spacing={1} alignItems="center" mt={"15px"}>
              <Typography>Disable</Typography>
              <AntSwitch
                onChange={handleSwitchChange}
                name="state"
                checked={firewallInfo.state}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography>Enable</Typography>
            </Stack>
            <Typography
              component="p"
              variant="p"
              color={"#000"}
              fontWeight="500"
              align="left"
              sx={{ pt: 2, pb: 1, fontSize: "16px", display: "flex" }}
            >
              Logging
              <Typography
                component="span"
                variant="span"
                color={"#adadad"}
                fontWeight="400"
                align="left"
                sx={{ ml: 1, fontSize: "14px", fontStyle: "italic" }}
              >
                (Logging will store your data, if you make disable the data will
                not be stored)
              </Typography>
            </Typography>
            <AntSwitch
              onChange={handlealogginSwitchChange}
              name="logging"
              checked={firewallInfo.logging}
              inputProps={{ "aria-label": "ant design" }}
              sx={{ mt: "8px" }}
            />
          </DialogContent>
          <DialogActions>
            <ModalButton
              disabled={!isObjectsEqual()}
              type="submit"
              variant="contained"
              onClick={validateHeaderName}
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
              {type !== "edit" ? "ADD" : "UPDATE"}
              {/* SAVE */}
            </ModalButton>
            <Button
              onClick={() => {
                ModalhandleClose();
                handleReset();
              }}
              sx={{ color: "#6DCCDD" }}
            >
              Close
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </>
  );
};
