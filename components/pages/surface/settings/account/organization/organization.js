// ** React Imports
import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Popover from "@mui/material/Popover";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";

import Modal from "@mui/material/Modal";
import { MuiFileInput } from "mui-file-input";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Cookies from "js-cookie";

// ** Accordion Imports
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";

// ** Date Pickers Imports
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// ** MUI ICON Components
import { Close } from "@mui/icons-material";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import InfoIcon from "@mui/icons-material/Info";
import BlurCircularOutlinedIcon from "@mui/icons-material/BlurCircularOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DetailsOutlinedIcon from "@mui/icons-material/DetailsOutlined";
import FilterCenterFocusOutlinedIcon from "@mui/icons-material/FilterCenterFocusOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import { useClientIP } from "../../../../../../utils/context/ClientIPContext";

// ** Custom CSS
import styles from "./index.module.css";
import axios from "axios";

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

// Accordion Style
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    backgroundColor: "#fff",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  backgroundColor: "#fafafa",
}));

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

// ** Table Skeleton CSS
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e1f3f6",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

// ** Table Skeleton Function
function TableSkeletonData(id, disk, type, size, cost, action) {
  return { id, disk, type, size, cost, action };
}
const Skeletonrows = [
  TableSkeletonData(),
  TableSkeletonData(),
  TableSkeletonData(),
  TableSkeletonData(),
  TableSkeletonData(),
];

function AccountOrganization() {
  const { clientIP } = useClientIP();

  // ** OverAll Tab Function
  const [AccountDetailValue, setAccountDetailValue] = useState("Organization");
  const handleAccountDetailValue = (event, newAccountDetailValue) => {
    setAccountDetailValue(newAccountDetailValue);
  };
  const cookies = Cookies.get("userData");
  // ** Chip Close Function
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  // Select Function
  const [age, setAge] = React.useState("");
  const handleChangeSelect = (event) => {
    setAge(event.target.value);
  };

  // File Upload Function
  const [file, setFile] = React.useState(null);
  const handleFileChange = (newValue) => {
    setFile(newValue);
  };

  // Modal Function
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Accordion Function
  const [expanded, setExpanded] = React.useState(false);
  const handleAccChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [organisationData, setOrganisationData] = useState({
    companyName: "",
    purposeOfUse: "",
    crNo: "",
    issueDate: "08/09/2023",
    crFilaName: "",
    expiryDate: "08/09/2023",
    companyType: "",
    dataClassification: "",
    crVerifyStatus: "",
    tenantId: "",
    orgInfoId: "",
  });

  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;

    if (cachData) {
      fetchData(cachData);
    }
  }, [cookies]);

  const fetchData = async (tdata) => {
    const newData = {
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getOrganizationInfo",
      token: tdata.accessToken,
    };

    try {
      const { data } = await axios.post(
        "/api/surface/settings/account/organization",
        finalData
      ); // call the new API route
      if (data) {
        setOrganisationData(data.message);
        console.log(data.message, "organization");
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };
  const today = dayjs();
  const [labelFile, setlabelFile] = useState(false);
  return (
    <>
      {/* Start Organization Design Here */}
      <Box>
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
              disabled
              value={
                organisationData?.companyName
                  ? organisationData?.companyName
                  : ""
              }
              margin="normal"
              fullWidth
              autoFocus
              id="company"
              label="Company Name"
              name="company"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CssFormControl margin="normal" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Purpose of the use
              </InputLabel>
              <Select
                disabled
                value={
                  organisationData.purposeOfUse
                    ? organisationData.purposeOfUse
                    : ""
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Purpose of the use"
                onChange={handleChangeSelect}
                MenuProps={MenuProps}
              >
                <MenuItem value="Resale">Resale</MenuItem>
                <MenuItem value="Live support system">
                  Live support system
                </MenuItem>
                <MenuItem value="Plants/Factories">Plants/Factories</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </CssFormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CssTextField
              disabled
              value={organisationData.crNo ? organisationData.crNo : ""}
              margin="normal"
              fullWidth
              id="commercial"
              label="Commercial Registration (CR)"
              name="commercial"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            {!labelFile ? (
              <CssTextField
                disabled
                margin="normal"
                fullWidth
                id="commercial"
                label="Select Image"
                name="crFilaName"
                // {...registerpoiOrgInfo("crFilaName")}
                value={
                  organisationData.crFilaName ? organisationData.crFilaName : ""
                }
                InputProps={{
                  readOnly: true,
                  // endAdornment: (
                  //   <Close
                  //     // onClick={removeDefaultFile}
                  //     style={{ cursor: "pointer" }}
                  //   />
                  // ),
                  // startAdornment: <AttachFileIcon />,
                }}
              />
            ) : (
              <CssFormControl margin="normal" fullWidth variant="outlined">
                <MuiFileInput
                  disabled
                  onChange={handleFileChange}
                  label="Select Image"
                  placeholder="Allowed - *.jpeg, *.jpg, *.png"
                  value={
                    organisationData.crFilaName
                      ? organisationData.crFilaName
                      : ""
                  }
                />
              </CssFormControl>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CssFormControl
              components={["DatePicker"]}
              margin="normal"
              fullWidth
              variant="outlined"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled
                  maxDate={today}
                  label="Issue Date"
                  value={
                    dayjs(organisationData.issueDate, "MM-DD-YYYY")
                      ? dayjs(organisationData.issueDate, "MM-DD-YYYY")
                      : ""
                  }
                />
              </LocalizationProvider>
            </CssFormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CssFormControl
              components={["DatePicker"]}
              margin="normal"
              fullWidth
              variant="outlined"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled
                  label="Expire Date"
                  value={
                    dayjs(organisationData.expiryDate, "MM-DD-YYYY")
                      ? dayjs(organisationData.expiryDate, "MM-DD-YYYY")
                      : ""
                  }
                />
              </LocalizationProvider>
            </CssFormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CssFormControl margin="normal" fullWidth>
              <InputLabel id="demo-simple-select-label">Industry</InputLabel>
              <Select
                disabled
                value={
                  organisationData.companyType
                    ? organisationData.companyType
                    : ""
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Industry"
                onChange={handleChangeSelect}
                MenuProps={MenuProps}
              >
                <MenuItem value="Consumer & Industrial Products">
                  Consumer & Industrial Products
                </MenuItem>
                <MenuItem value="Public Sector">Public Sector</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </CssFormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <CssFormControl margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Data Classification
                </InputLabel>
                <Select
                  disabled
                  value={
                    organisationData.dataClassification
                      ? organisationData.dataClassification
                      : ""
                  }
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Data Classification"
                  onChange={handleChangeSelect}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="Public">Public</MenuItem>
                  <MenuItem value="Restricted">Restricted</MenuItem>
                  <MenuItem value="Confidential">Confidential</MenuItem>
                  <MenuItem value="Extremely Confidential">
                    Extremely Confidential
                  </MenuItem>
                </Select>
              </CssFormControl>
              <InfoIcon
                onClick={handleOpen}
                sx={{
                  fontSize: "40px",
                  color: "#015578",
                  ml: 1,
                  my: 2,
                  cursor: "pointer",
                }}
              />
            </Box>
          </Grid>
          {/* START Data Classification Info Modal */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Data Classification
              </Typography>
              <Typography
                id="modal-modal-description"
                component="p"
                color={"#6b6f82"}
                sx={{ mt: 2 }}
              >
                Based on the Cloud Computing Regulatory Framework, issued by the
                Saudi Communication, Information, and Technology Commission;
                Cloud customers need to choose the appropriate classification of
                their data as follows:
              </Typography>
              <Accordion
                sx={{ mt: 3 }}
                expanded={expanded === "panel1"}
                onChange={handleAccChange("panel1")}
              >
                <AccordionSummary
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    variant="h6"
                    component="h4"
                    fontWeight={400}
                    color={"#6b6f82"}
                    fontSize={16}
                  >
                    <BlurCircularOutlinedIcon
                      sx={{
                        fontSize: "25px",
                        color: "#6b6f82",
                        marginRight: "15px",
                        position: "relative",
                        display: "inline-block",
                        top: "6px",
                      }}
                    />
                    Extremely Confidential
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component="p" color={"#6b6f82"} paddingLeft={1}>
                    Data is classified as (Extremely Confidential) if
                    unauthorized access to this data or its disclosure or its
                    content leads to serious and exceptional damage that cannot
                    be remedied or repaired on:
                  </Typography>
                  <Typography
                    component="p"
                    color={"#6b6f82"}
                    paddingLeft={3}
                    paddingTop={2}
                  >
                    <FiberManualRecordIcon sx={{ fontSize: "12px" }} /> National
                    interests, including breaching agreements and treaties,
                    harming the Kingdom&apos;s reputation, diplomatic relations
                    and political affiliations, or the operational efficiency of
                    security or military operations, the national economy,
                    national infrastructure, or government business.
                  </Typography>
                  <Typography
                    component="p"
                    color={"#6b6f82"}
                    paddingLeft={3}
                    paddingTop={2}
                  >
                    <FiberManualRecordIcon sx={{ fontSize: "12px" }} /> The
                    performance of government agencies, which is harmful to the
                    national interest.
                  </Typography>
                  <Typography
                    component="p"
                    color={"#6b6f82"}
                    paddingLeft={3}
                    paddingTop={2}
                  >
                    <FiberManualRecordIcon sx={{ fontSize: "12px" }} /> Broader
                    individual health and safety and the privacy of senior
                    officials. Environmental or natural resources
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleAccChange("panel2")}
              >
                <AccordionSummary
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Typography
                    variant="h6"
                    component="h4"
                    fontWeight={400}
                    color={"#6b6f82"}
                    fontSize={16}
                  >
                    <DetailsOutlinedIcon
                      sx={{
                        fontSize: "25px",
                        color: "#6b6f82",
                        marginRight: "15px",
                        position: "relative",
                        display: "inline-block",
                        top: "6px",
                      }}
                    />
                    Confidential
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component="p" color={"#6b6f82"} paddingLeft={1}>
                    Data is classified as (Confidential) if unauthorized access
                    to this data or its disclosure or its content leads to
                    serious and exceptional damage that cannot be remedied or
                    repaired on:
                  </Typography>
                  <Typography
                    component="p"
                    color={"#6b6f82"}
                    paddingLeft={3}
                    paddingTop={2}
                  >
                    <FiberManualRecordIcon sx={{ fontSize: "12px" }} /> National
                    interests, including partially harming the Kingdom&apos;s
                    reputation, diplomatic relations and political affiliations,
                    or the operational efficiency of security or military
                    operations, the national economy, national infrastructure,
                    or government business.
                  </Typography>
                  <Typography
                    component="p"
                    color={"#6b6f82"}
                    paddingLeft={3}
                    paddingTop={2}
                  >
                    <FiberManualRecordIcon sx={{ fontSize: "12px" }} /> Causes a
                    financial loss at the organizational level that leads to
                    bankruptcy, the inability of the entities to perform their
                    duties, a serious loss of competitiveness, or both.
                  </Typography>
                  <Typography
                    component="p"
                    color={"#6b6f82"}
                    paddingLeft={3}
                    paddingTop={2}
                  >
                    <FiberManualRecordIcon sx={{ fontSize: "12px" }} /> Causes
                    serious harm or injury that affects the life of a group of
                    individuals.
                  </Typography>
                  <Typography
                    component="p"
                    color={"#6b6f82"}
                    paddingLeft={3}
                    paddingTop={2}
                  >
                    <FiberManualRecordIcon sx={{ fontSize: "12px" }} /> Leads to
                    long-term damage to environmental or natural resources.
                    Investigating major cases as specified by law, such as
                    terrorism financing cases.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleAccChange("panel3")}
              >
                <AccordionSummary
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                >
                  <Typography
                    variant="h6"
                    component="h4"
                    fontWeight={400}
                    color={"#6b6f82"}
                    fontSize={16}
                  >
                    <FilterCenterFocusOutlinedIcon
                      sx={{
                        fontSize: "25px",
                        color: "#6b6f82",
                        marginRight: "15px",
                        position: "relative",
                        display: "inline-block",
                        top: "6px",
                      }}
                    />
                    Restricted
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component="p" color={"#6b6f82"} paddingLeft={1}>
                    Data is classified as (Restricted): If unauthorized access
                    to or disclosure of this data or its content leads to:
                  </Typography>
                  <Typography
                    component="p"
                    color={"#6b6f82"}
                    paddingLeft={3}
                    paddingTop={2}
                  >
                    <FiberManualRecordIcon sx={{ fontSize: "12px" }} /> A
                    limited negative impact on the work of government agencies
                    or economic activities in the Kingdom, or on the work of a
                    specific person
                  </Typography>
                  <Typography
                    component="p"
                    color={"#6b6f82"}
                    paddingLeft={3}
                    paddingTop={2}
                  >
                    <FiberManualRecordIcon sx={{ fontSize: "12px" }} /> Limited
                    damage to any entity&apos;s assets and limited loss on its
                    financial and competitive position. Limited damage in the
                    short term to environmental or natural resources.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel4"}
                onChange={handleAccChange("panel4")}
              >
                <AccordionSummary
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography
                    variant="h6"
                    component="h4"
                    fontWeight={400}
                    color={"#6b6f82"}
                    fontSize={16}
                  >
                    <PublicOutlinedIcon
                      sx={{
                        fontSize: "25px",
                        color: "#6b6f82",
                        marginRight: "15px",
                        position: "relative",
                        display: "inline-block",
                        top: "6px",
                      }}
                    />
                    Public
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component="p" color={"#6b6f82"} paddingLeft={1}>
                    Data is classified as (Public) when unauthorized access to
                    or disclosure of this data or its content does not result in
                    any of the effects mentioned above - in the event that there
                    is no effect on the following:
                  </Typography>
                  <Typography
                    component="p"
                    color={"#6b6f82"}
                    paddingLeft={3}
                    paddingTop={2}
                  >
                    <FiberManualRecordIcon sx={{ fontSize: "12px" }} /> National
                    interest
                  </Typography>
                  <Typography
                    component="p"
                    color={"#6b6f82"}
                    paddingLeft={3}
                    paddingTop={2}
                  >
                    <FiberManualRecordIcon sx={{ fontSize: "12px" }} /> Entity
                    activities
                  </Typography>
                  <Typography
                    component="p"
                    color={"#6b6f82"}
                    paddingLeft={3}
                    paddingTop={2}
                  >
                    <FiberManualRecordIcon sx={{ fontSize: "12px" }} />{" "}
                    Interests of individuals Environmental resources
                  </Typography>
                  <Typography
                    component="p"
                    color={"#6b6f82"}
                    paddingLeft={1}
                    paddingTop={2}
                  >
                    For more information regarding the Cloud Computing
                    Regulatory Framework please visit CITC website.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Modal>
          {/* END Data Classification Info Modal */}
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} hidden>
            <CssTextField
              margin="normal"
              fullWidth
              id="otherindustry"
              label="Others Industry"
              name="otherindustry"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Chip
              icon={<ReportProblemOutlinedIcon color="error" />}
              label="CR Verification status : Pending"
              onDelete={handleDelete}
              deleteIcon={
                <CloseOutlinedIcon sx={{ marginLeft: "auto !important" }} />
              }
              className={styles.myProfileNicAlert}
            />
          </Grid>
        </Grid>
      </Box>
      {/* End Organization Design Here */}
      {/* Start Organization Skeleton Design Here */}
      <Box hidden>
        <Grid
          container
          direction="row"
          rowSpacing={2}
          spacing={2}
          display={"flex"}
          justifyContent="center"
        >
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{ mt: "16px", mb: "8px" }}
              width={"100%"}
              height={56}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{ mt: "16px", mb: "8px" }}
              width={"100%"}
              height={56}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{ mt: "16px", mb: "8px" }}
              width={"100%"}
              height={56}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{ mt: "16px", mb: "8px" }}
              width={"100%"}
              height={56}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{ mt: "16px", mb: "8px" }}
              width={"100%"}
              height={56}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{ mt: "16px", mb: "8px" }}
              width={"100%"}
              height={56}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{ mt: "16px", mb: "8px" }}
              width={"100%"}
              height={56}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{ mt: "16px", mb: "8px" }}
              width={"100%"}
              height={56}
            />
          </Grid>
        </Grid>
      </Box>
      {/* End Organization Skeleton Design Here */}
    </>
  );
}

export default AccountOrganization;
