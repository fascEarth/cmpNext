import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  styled,
  TextField,
  Checkbox,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import { FormHelperText } from "@mui/material";
import { Loading } from "mdi-material-ui";
import { useClientIP } from "../../../../../../utils/context/ClientIPContext";

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
      {onClose && (
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
      )}
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

function AddUser({
  stcachdata,
  Modalopen,
  ModalhandleClose,
  commonPtype,
  pId,
  commonShowForm,
  setCommonShowForm,
  rolesData,
  teamData,
  initEverythingForm,
  setOpen,
}) {
  const { clientIP } = useClientIP();

  useEffect(() => {
    resetCommon(); // Reset the form fields for "Add" mode
    setCommonFormData({
      emailId: "",
      role: "",
      userDesc: "",
      password: "",
      teams: [],
      showPassword: false,
    });
    if (stcachdata && commonPtype === "add") {
      setCommonShowForm(true);
    } else if (stcachdata && commonPtype === "edit" && pId) {
      getParticularData(pId);
    }
  }, [pId, stcachdata, commonPtype]);

  const formCommonMethods = useForm();

  const {
    register: registerCommon,
    handleSubmit: handleSubmitCommon,
    formState: { isSubmitting, errors: errorsCommon },
    reset: resetCommon,
  } = formCommonMethods;

  const [commonFormData, setCommonFormData] = useState({
    emailId: "",
    role: "",
    userDesc: "",
    password: "",
    teams: [],
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setCommonFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getParticularData = async (id) => {
    const tdata = stcachdata;

    const newData = {
      userid: id,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getParticularData",
      token: tdata.accessToken,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/settings/account/usermgmt",
        finalData
      ); // call the new API route

      if (data) {
        setCommonFormData({
          emailId: data.emailId,
          role: data.role,
          userDesc: data.userDesc ? data.userDesc : "",
          password: "",
          teams: data.teams,
          showPassword: false,
        });
        setCommonShowForm(true);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  const oncommonSubmit = async (data) => {
    // Check if all required key values in poiPIstate are filled
    const requiredFields = ["emailId", "role", "userDesc", "password", "teams"];

    const iscommonstateFilled = requiredFields.every((key) => {
      if (key === "userDesc") {
        return true; // Skip validation for middleName field
      }

      if (key === "password" && commonPtype === "edit") {
        return true; // Skip validation for middleName field
      }
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

  const handleDataManipulation = async (data) => {
    const tdata = stcachdata;
    let pendPoint = "getAdddataInfo";
    data.tenantId = tdata.tenant_id;
    if (commonPtype === "edit") {
      data.userId = pId;

      pendPoint = "getUpdatedataInfo";
    }

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
        "/api/surface/settings/account/usermgmt",
        finalData
      ); // call the new API route

      if (data.status === "ok") {
        ModalhandleClose();
        if (commonPtype === "edit") {
          toast.success("User has been updated successfully!");
        } else {
          toast.success("User has been added successfully!");
        }

        resetCommon();
        initEverythingForm(tdata);
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setCommonFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setCommonFormData((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
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
        {commonPtype === "add" ? "ADD USER" : "EDIT USER"}
      </BootstrapDialogTitle>
      {!commonShowForm && <>Loading Please Wait ...</>}
      {commonShowForm && (
        <>
          <Box
            onSubmit={handleSubmitCommon(oncommonSubmit)}
            component="form"
            autoComplete="off"
          >
            <DialogContent dividers>
              <CssTextField
                margin="normal"
                autoFocus
                fullWidth
                id="email"
                label="Email Address"
                name="emailId"
                {...registerCommon("emailId", {
                  required: "Email Address is required",
                })}
                value={commonFormData.emailId}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                disabled={commonPtype === "edit" ? true : false}
                error={!!errorsCommon.emailId} // Add the error prop to highlight the field when there is an error
                helperText={
                  errorsCommon.emailId && errorsCommon.emailId.message
                } // Show the error message
              />

              <Grid
                container
                direction="row"
                rowSpacing={2}
                spacing={2}
                display={"flex"}
                justifyContent="center"
              >
                {commonPtype === "add" && (
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <CssFormControl
                      margin="normal"
                      fullWidth
                      variant="outlined"
                    >
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <OutlinedInput
                        id="password"
                        type={commonFormData.showPassword ? "text" : "password"}
                        name="password"
                        {...registerCommon("password", {
                          required: "Password is required",
                          // Add more validation rules here
                        })}
                        value={commonFormData.password}
                        onChange={handleInputChange}
                        error={!!errorsCommon.password}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {commonFormData.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                      {errorsCommon.password && (
                        <FormHelperText error>
                          {errorsCommon.password.message}
                        </FormHelperText>
                      )}
                    </CssFormControl>
                  </Grid>
                )}

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={commonPtype === "edit" ? 12 : 6}
                  lg={commonPtype === "edit" ? 12 : 6}
                  xl={commonPtype === "edit" ? 12 : 6}
                >
                  <CssTextField
                    margin="normal"
                    fullWidth
                    id="userDesc" // Change the ID to match the name
                    label="Description"
                    name="userDesc" // Change the name to match the ID
                    {...registerCommon("userDesc", {})}
                    value={commonFormData.userDesc}
                    onChange={handleInputChange}
                  />

                  {errorsCommon.userDesc && (
                    <FormHelperText error>
                      {errorsCommon.userDesc.message}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
              <CssFormControl margin="normal" fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">
                  Select Team
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={commonFormData.teams.map((id) => parseInt(id))}
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    setCommonFormData((prev) => ({ ...prev, teams: value }));
                  }}
                  inputProps={{
                    name: "teams", // Use the name attribute for react-hook-form
                    id: "teams",
                    ...registerCommon("teams", {
                      required: "Select at least one team", // Add validation rule
                    }),
                  }}
                  renderValue={(selected) => {
                    const selectedTeamNames = teamData.list
                      .filter((elem) => selected.includes(elem.id))
                      .map((elem) => elem.value);

                    return selectedTeamNames.join(", ");
                  }}
                  MenuProps={MenuProps}
                  error={!!errorsCommon.teams} // Highlight the field when there is an error
                >
                  {teamData.list &&
                    teamData.list.map((elem) => (
                      <MenuItem key={elem.id} value={elem.id}>
                        <Checkbox
                          checked={commonFormData.teams
                            .map((id) => parseInt(id))
                            .includes(elem.id)}
                        />
                        <ListItemText primary={elem.value} />
                      </MenuItem>
                    ))}
                </Select>
                {errorsCommon.teams && (
                  <FormHelperText error>
                    {errorsCommon.teams.message}
                  </FormHelperText>
                )}
              </CssFormControl>
              <CssFormControl margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select a Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="role"
                  label="Select a Role"
                  name="role"
                  {...registerCommon("role", {
                    required: "Please select a role", // Add validation rule
                  })}
                  value={commonFormData.role}
                  defaultValue={commonFormData.role}
                  onChange={(e) =>
                    setCommonFormData({
                      ...commonFormData,
                      role: e.target.value,
                    })
                  }
                  MenuProps={MenuProps}
                  error={!!errorsCommon.role} // Highlight the field when there is an error
                >
                  <MenuItem value="" disabled>
                    Select Any
                  </MenuItem>
                  {rolesData.list &&
                    rolesData.list.map((elem) => (
                      <MenuItem key={elem.id} value={elem.id}>
                        {elem.value}
                      </MenuItem>
                    ))}
                </Select>
                {errorsCommon.role && (
                  <FormHelperText error>
                    {errorsCommon.role.message}
                  </FormHelperText>
                )}
              </CssFormControl>
            </DialogContent>
            <DialogActions>
              <ModalButton
                disabled={isSubmitting}
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
                {isSubmitting ? (
                  <Loading />
                ) : commonPtype === "add" ? (
                  "INVITE"
                ) : (
                  "SAVE"
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
  );
}

export default AddUser;
