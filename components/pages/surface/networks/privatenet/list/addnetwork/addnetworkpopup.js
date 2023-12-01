// ** React Imports
import * as React from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";

// ** MUI Components
import { styled } from "@mui/material/styles";
import {
  TableRow,
  TextField,
  Checkbox,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Popover from "@mui/material/Popover";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

// ** MUI ICON Components
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CloseIcon from "@mui/icons-material/Close";

// Custom CSS
import styles from "./addnetworkpopup.module.css";

import { Controller, useForm } from "react-hook-form";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormHelperText } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import calculateIPRanges from "../../../../../../tools/iprangecalculator/ipRangeCalculator";
import { useClientIP } from "../../../../../../../utils/context/ClientIPContext";

// linearProgress CSS Style
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#d8d8d8",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#2ed69b",
  },
}));

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

// Modal Popup Style
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    // width: "450px",
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
            top: 8,
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
const names = ["Default", "Admin", "User"];

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

const AddNetworkPopup = ({
  setIsTableaload,
  isTableLoad,
  privateNetPopOpen,
  setprivateNetPopOpen,
  handleClickOpenPrivateNet,
  handleModalClosePrivateNet,
  cookies,
}) => {
  const { clientIP } = useClientIP();
  //  console.log(startIP)
  //console.log(endIP)
  const [networkTypeData, setnetworkTypeData] = useState([]);
  const [teamData, setteamData] = useState([]);

  useEffect(() => {
    if (privateNetPopOpen) {
      // reset here
    }
  }, [privateNetPopOpen]);

  useEffect(() => {
    if (cookies) {
      fetchData("networktype");
      fetchData("teams");
    }
  }, [cookies]);

  const fetchData = async (ktype) => {
    // onclose();
    const tdata = cookies ? JSON.parse(cookies) : [];

    const newData = {
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };

    const finalData = {
      data: newData,
      endPoint: "getallpnladdtionalInfo",
      token: tdata.accessToken,
      ipaddress: clientIP,
    };

    try {
      const { data } = await axios.post(
        "/api/surface/networks/privatenet/list",
        finalData
      ); // call the new API route

      /*if (data) {
        data.map(function (elem) {
          if (elem.type === "networktype") {
            setpnetworkInfostate({
              ...pnetworkInfostate,
              networkTypeId: elem.defaultId,
            });
            setnetworkTypeData(elem);
          } else if (elem.type === "teams") {
            setteamData(elem);
            if (elem) {
              const itemWithCurrentState1 = elem.list.find(
                (item) => item.isUsed === true
              );

              if (itemWithCurrentState1) {
                setTimeout(() => {
                  fetchData();
                }, 15000);
              }
            }
          }
        });
      }*/

      if (data) {
        let capTeam = {};
        data.map(function (elem) {
          if (ktype === "networktype") {
            if (elem.type === "networktype") {
              setpnetworkInfostate({
                ...pnetworkInfostate,
                networkTypeId: elem.defaultId,
              });
              setnetworkTypeData(elem);
            }
          }
          if (ktype === "teams") {
            if (elem.type === "teams") {
              setteamData(elem);
              capTeam = elem;
            }
          }
        });

        if (ktype === "teams" && capTeam) {
          const itemWithCurrentState1 = capTeam.list.find(
            (item) => item.isUsed === true
          );

          if (itemWithCurrentState1) {
            setTimeout(() => {
              fetchData("teams");
            }, 15000);
          }
        }
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };

  // ** Popover Function
  const [popanchorEl, setpopAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setpopAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setpopAnchorEl(null);
  };
  const Popopen = Boolean(popanchorEl);
  const id = Popopen ? "simple-popover" : undefined;

  // Gateway CIDR Popover Function
  const [anchorGatewayEl, setAnchorGatewayEl] = React.useState(null);
  const GatehandleClick = (event) => {
    setAnchorGatewayEl(event.currentTarget);
  };
  const GatewayhandlePopoverClose = () => {
    setAnchorGatewayEl(null);
  };
  const GatewayPopopen = Boolean(anchorGatewayEl);

  // Static IP Pools Popover Function
  const [anchorIppoolsEl, setAnchorIppoolsEl] = React.useState(null);
  const IppoolshandleClick = (event) => {
    setAnchorIppoolsEl(event.currentTarget);
  };
  const IppoolshandlePopoverClose = () => {
    setAnchorIppoolsEl(null);
  };
  const IppoolsPopopen = Boolean(anchorIppoolsEl);

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

  const formPnetworkInfoMethods = useForm({ mode: "onChange" });
  const {
    register: registerPnetworkInfo,
    handleSubmit: handleSubmitPnetworkInfo,
    formState: { errors: errorsPnetworkInfo },
    reset: resetPnetworkInfo,
    control: controlPnetworkInfo,
    setValue: setValuePnetworkInfo,
    trigger: triggerPnetworkInfo,
  } = formPnetworkInfoMethods;
  const [pnetworkInfostate, setpnetworkInfostate] = useState({
    networkName: "",
    networkStatus: "",
    networkDesc: "",
    gatewayCidr: "",
    primaryDns: "",

    secondaryDns: "",
    dnsSuffix: "",
    teams: [],
    staticIpPools: [],

    proxyipAddress: "",
    tenantId: "",
    userSerialId: "",
    networkTypeId: "",
  });
  useEffect(() => {
    if (teamData && teamData.defaultId) {
      setpnetworkInfostate({
        ...pnetworkInfostate,
        teams: [teamData.defaultId],
      });
    }
  }, [teamData]);
  const [ipRanges, setIpRanges] = useState([""]); // Initialize with at least one IP range

  const addIpRange = () => {
    setIpRanges([...ipRanges, ""]);
  };

  const removeIpRange = (index) => {
    if (ipRanges.length > 1) {
      // const updatedRanges = ipRanges.filter((_, i) => i !== index);
      //  const updatedRanges = ipRanges.splice(index,1)
      const updatedRanges = [...ipRanges];
      updatedRanges.splice(index, 1);
      setIpRanges(updatedRanges);

      setInputError((prevErrors) => {
        const updatedStaticIpPoolErr = { ...prevErrors.staticIpPoolErr };
        delete updatedStaticIpPoolErr[index]; // Removes the specified index

        return {
          ...prevErrors,
          staticIpPoolErr: updatedStaticIpPoolErr,
        };
      });
    }
    // **** TR 01 ****
    // const updatingVal = [...IpPoolData]
    IpPoolData.splice(index, 1);
    setIpPoolData(IpPoolData);
    //
  };
  const [staticIpPoolsValue, setStaticIpPoolsValue] = useState([]);
  // TR 01
  const [inputErrors, setInputError] = useState({
    networkNameErr: false,
    primaryDnsErr: false,
    secondaryDnsErr: false,
    dnsSuffixErr: false,
    staticIpPoolErr: {},
  });
  const [inputErrorMsg, setInputErrorMsg] = useState({
    networkNameErrorMsg: "This field is required",
    gatewayCidrErrorMsg: "",
    primaryDnsErrorMsg: "This field is required",
    secondaryDnsErrorMsg: "This field is required",
    staticIpPoolErrorMsg: {},
    dnsSuffixErrorMsg: "",
  });
  const [IpPoolData, setIpPoolData] = useState([]);
  const ipv4RangeRegex =
    /^(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\s*-\s*(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  // ************** TR 01 handleIpPoolChange   **************

  /** Raj's code for Private Network Validation Library  start */
  function isRangeWithinAnotherRange(enteredRange, betweenRange) {
    console.log(enteredRange);
    console.log(betweenRange);
    if (ipv4RangeRegex.test(enteredRange)) {
      const [enteredStart, enteredEnd] = enteredRange.split("-");
      const [betweenStart, betweenEnd] = betweenRange.split("-");

      const enteredStartIP = enteredStart.split(".").map(Number);
      const enteredEndIP = enteredEnd.split(".").map(Number);
      const betweenStartIP = betweenStart.split(".").map(Number);
      const betweenEndIP = betweenEnd.split(".").map(Number);

      const isWithin =
        enteredStartIP[0] >= betweenStartIP[0] &&
        enteredStartIP[1] >= betweenStartIP[1] &&
        enteredStartIP[2] >= betweenStartIP[2] &&
        enteredStartIP[3] >= betweenStartIP[3] &&
        enteredEndIP[0] <= betweenEndIP[0] &&
        enteredEndIP[1] <= betweenEndIP[1] &&
        enteredEndIP[2] <= betweenEndIP[2] &&
        enteredEndIP[3] <= betweenEndIP[3];
      console.log(isWithin);

      return isWithin;
    }
  }

  function isStartIPBeforeEndIP(EnteredRange) {
    const [startIP, endIP] = EnteredRange.split("-");
    const startIPOctets = startIP.split(".").map(Number);
    const endIPOctets = endIP.split(".").map(Number);

    for (let i = 0; i < 4; i++) {
      if (startIPOctets[i] < endIPOctets[i]) {
        return true;
      } else if (startIPOctets[i] > endIPOctets[i]) {
        return false;
      }
    }

    // If all octets are the same, it means start IP equals end IP
    return false;
  }

  function isCIDRRangeNotWithinEnteredRange(defaultCIDRRange, EnteredRange) {
    const [defaultIP, defaultSubnet] = defaultCIDRRange.split("/");
    const EnteredIPs = EnteredRange.split("-");

    const [defaultOctets, defaultSubnetMask] = [
      defaultIP.split(".").map(Number),
      parseInt(defaultSubnet, 10),
    ];

    const [EnteredStartIP, EnteredEndIP] = [
      EnteredIPs[0].split(".").map(Number),
      EnteredIPs[1].split(".").map(Number),
    ];

    // Check if the default CIDR range's network address falls within the entered IP range
    const isDefaultCIDRNetworkInRange =
      defaultOctets[0] >= EnteredStartIP[0] &&
      defaultOctets[0] <= EnteredEndIP[0] &&
      defaultOctets[1] >= EnteredStartIP[1] &&
      defaultOctets[1] <= EnteredEndIP[1] &&
      defaultOctets[2] >= EnteredStartIP[2] &&
      defaultOctets[2] <= EnteredEndIP[2] &&
      defaultOctets[3] >= EnteredStartIP[3] &&
      defaultOctets[3] <= EnteredEndIP[3];

    // Check if the entered range's network address falls within the default CIDR range
    const isEnteredNetworkInDefaultCIDRRange =
      EnteredStartIP[0] >= defaultOctets[0] &&
      EnteredStartIP[0] <=
        defaultOctets[0] + (Math.pow(2, 32 - defaultSubnetMask) - 1) &&
      EnteredStartIP[1] >= defaultOctets[1] &&
      EnteredStartIP[1] <=
        defaultOctets[1] + (Math.pow(2, 32 - defaultSubnetMask - 8) - 1) &&
      EnteredStartIP[2] >= defaultOctets[2] &&
      EnteredStartIP[2] <=
        defaultOctets[2] + (Math.pow(2, 32 - defaultSubnetMask - 16) - 1) &&
      EnteredStartIP[3] >= defaultOctets[3] &&
      EnteredStartIP[3] <=
        defaultOctets[3] + (Math.pow(2, 32 - defaultSubnetMask - 24) - 1);

    return isDefaultCIDRNetworkInRange || isEnteredNetworkInDefaultCIDRRange;
  }

  function isEnteredRangeDuplicate(enteredRange) {
    const isDuplicate = ipRanges.includes(enteredRange);
    return isDuplicate;
  }

  const ipToInt = (ip) => {
    if (!ip || typeof ip !== "string") {
      return 0;
    }

    return ip
      .split(".")
      .reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
  };

  const isOverlapWithExistingRanges = (newRange, indexnew) => {
    const [newStart, newEnd] = newRange.split("-").map((ip) => ip.trim());
    console.log(ipRanges);
    const isOverlap = ipRanges.some((existingRange, index) => {
      if (indexnew !== index) {
        const [existingStart, existingEnd] = existingRange
          .split("-")
          .map((ip) => ip.trim());
        const newStartInt = ipToInt(newStart);
        const newEndInt = ipToInt(newEnd);
        const existingStartInt = ipToInt(existingStart);
        const existingEndInt = ipToInt(existingEnd);

        return (
          (newStartInt <= existingEndInt && newStartInt >= existingStartInt) ||
          (newEndInt <= existingEndInt && newEndInt >= existingStartInt) ||
          (existingStartInt <= newEndInt && existingEndInt >= newStartInt)
        );
      }
    });

    return isOverlap;
  };

  /** Raj's code for Private Network Validation Library end */

  const handleIpPoolChange = (e, i) => {
    const values = e.target.value;
    console.log(values);

    setIpPoolIndexedValue(i);

    if (values == null || values === "") {
      setInputError((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErr: { ...prevErrors.staticIpPoolErr, [i]: true },
      }));
      /*setInputError({ ...inputErrors, staticIpPoolErr: true });*/
      setInputErrorMsg((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErrorMsg: {
          ...prevErrors.staticIpPoolErrorMsg,
          [i]: `Static IP pool is required`,
        },
      }));

      /*setInputErrorMsg((prevErrors) => ({
        ...prevErrors,
        [`staticIpPoolErrorMsg${i}`]: `Static IP pool is required`,
      }));*/
      /*setInputErrorMsg({
        ...inputErrorMsg,
        staticIpPoolErrorMsg: "Static IP pool is required",
      });*/
    }
    if (!ipv4RangeRegex.test(values)) {
      setInputError((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErr: { ...prevErrors.staticIpPoolErr, [i]: true },
      }));
      /*setInputError({ ...inputErrors, staticIpPoolErr: true });*/
      /*setInputErrorMsg({
        ...inputErrorMsg,
        staticIpPoolErrorMsg: "Invalid static IP range",
      });*/

      setInputErrorMsg((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErrorMsg: {
          ...prevErrors.staticIpPoolErrorMsg,
          [i]: `Invalid static IP range`,
        },
      }));

      /*setInputErrorMsg((prevErrors) => ({
        ...prevErrors,
        [`staticIpPoolErrorMsg${i}`]: `Invalid static IP range`,
      }));*/
    } else {
      setInputError((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErr: { ...prevErrors.staticIpPoolErr, [i]: false },
      }));
      /*setInputError({ ...inputErrors, staticIpPoolErr: false });*/

      setInputErrorMsg((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErrorMsg: {
          ...prevErrors.staticIpPoolErrorMsg,
          [i]: ``,
        },
      }));

      /*setInputErrorMsg((prevErrors) => ({
        ...prevErrors,
        [`staticIpPoolErrorMsg${i}`]: ``,
      }));*/
      /*setInputErrorMsg({ ...inputErrorMsg, staticIpPoolErrorMsg: "" });*/
    }

    /** Raj's code for Private Network Validation Library  *** Start */
    console.log(values);
    const enteredRange = values;
    const betweenRange = cidrStartIp + "-" + cidrEndIp;
    const result = isRangeWithinAnotherRange(enteredRange, betweenRange);
    if (result) {
      const lessresult = isStartIPBeforeEndIP(enteredRange);
      if (lessresult) {
        console.log(pnetworkInfostate.gatewayCidr);
        const cidrMresult = isCIDRRangeNotWithinEnteredRange(
          pnetworkInfostate.gatewayCidr,
          enteredRange
        );
        console.log(cidrMresult); // Returns true if there's overlap, otherwise false
        if (cidrMresult) {
          /*setInputError({ ...inputErrors, staticIpPoolErr: true });*/
          setInputError((prevErrors) => ({
            ...prevErrors,
            staticIpPoolErr: { ...prevErrors.staticIpPoolErr, [i]: true },
          }));

          setInputErrorMsg((prevErrors) => ({
            ...prevErrors,
            staticIpPoolErrorMsg: {
              ...prevErrors.staticIpPoolErrorMsg,
              [i]: `Entered Range should not contain the gateway CIDR`,
            },
          }));

          /*setInputErrorMsg((prevErrors) => ({
      ...prevErrors,
      [`staticIpPoolErrorMsg${i}`]: `Entered Range should not contain the gateway CIDR`,
    }));*/

          /*setInputErrorMsg({
      ...inputErrorMsg,
      staticIpPoolErrorMsg: "Entered Range should not contain the gateway CIDR",
    });*/
        } else {
          setInputError((prevErrors) => ({
            ...prevErrors,
            staticIpPoolErr: { ...prevErrors.staticIpPoolErr, [i]: false },
          }));

          /*setInputError({ ...inputErrors, staticIpPoolErr: false });*/

          setInputErrorMsg((prevErrors) => ({
            ...prevErrors,
            staticIpPoolErrorMsg: {
              ...prevErrors.staticIpPoolErrorMsg,
              [i]: ``,
            },
          }));
          /*setInputErrorMsg((prevErrors) => ({
      ...prevErrors,
      [`staticIpPoolErrorMsg${i}`]: ``,
    }));*/

          /*setInputErrorMsg({ ...inputErrorMsg, staticIpPoolErrorMsg: "" });*/
        }
        // setInputError({ ...inputErrors, staticIpPoolErr: false });
        //setInputErrorMsg({ ...inputErrorMsg, staticIpPoolErrorMsg: "" });
      } else {
        /*setInputError({ ...inputErrors, staticIpPoolErr: true });*/
        setInputError((prevErrors) => ({
          ...prevErrors,
          staticIpPoolErr: { ...prevErrors.staticIpPoolErr, [i]: true },
        }));
        /*setInputErrorMsg({
      ...inputErrorMsg,
      staticIpPoolErrorMsg: "Invalid static IP Pool start & end range",
    });*/

        setInputErrorMsg((prevErrors) => ({
          ...prevErrors,
          staticIpPoolErrorMsg: {
            ...prevErrors.staticIpPoolErrorMsg,
            [i]: `Starting & ending ranges for the static IP pool are invalid`,
          },
        }));

        /*setInputErrorMsg((prevErrors) => ({
      ...prevErrors,
      [`staticIpPoolErrorMsg${i}`]: `Invalid static IP Pool start & end range`,
    }));*/
      }
    } else {
      setInputError((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErr: { ...prevErrors.staticIpPoolErr, [i]: true },
      }));
      /*setInputError({ ...inputErrors, staticIpPoolErr: true });*/
      /*setInputErrorMsg({
      ...inputErrorMsg,
      staticIpPoolErrorMsg: "Invalid static IP Pool range",
    });*/

      setInputErrorMsg((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErrorMsg: {
          ...prevErrors.staticIpPoolErrorMsg,
          [i]: `Invalid static IP Pool range`,
        },
      }));

      /*setInputErrorMsg((prevErrors) => ({
      ...prevErrors,
      [`staticIpPoolErrorMsg${i}`]: `Invalid static IP Pool range`,
    }));*/
    }

    const hasDuplicates = isEnteredRangeDuplicate(enteredRange);
    console.log(hasDuplicates);
    console.log(inputErrorMsg);
    if (hasDuplicates) {
      setInputError((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErr: { ...prevErrors.staticIpPoolErr, [i]: true },
      }));
      setInputErrorMsg((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErrorMsg: {
          ...prevErrors.staticIpPoolErrorMsg,
          [i]: `Duplicate static IP Pool range`,
        },
      }));
    }

    const isOverlap = isOverlapWithExistingRanges(enteredRange, i);

    if (isOverlap) {
      console.log("New IP pool range overlaps with existing ranges.");

      setInputError((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErr: { ...prevErrors.staticIpPoolErr, [i]: true },
      }));
      setInputErrorMsg((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErrorMsg: {
          ...prevErrors.staticIpPoolErrorMsg,
          [i]: `New IP pool range overlaps with existing ranges.`,
        },
      }));
    }

    /** Raj's code for Private Network Validation Library  **** End */

    const updatedValues = [...ipRanges];
    updatedValues[i] = e.target.value;
    setStaticIpPoolsValue(updatedValues);
    var dataArray = Object.keys(updatedValues).map((id) => ({
      id: updatedValues.length,
      value: updatedValues[id],
      networkStaticIpPoolStart: updatedValues[id].split("-")[0],
      networkStaticIpPoolEnd: updatedValues[id].split("-")[1],
    }));
    setIpPoolData(dataArray);
    setIpRanges(updatedValues);
    setpnetworkInfostate((prev) => ({
      ...prev,
      staticIpPools: dataArray,
    }));

    console.log(ipRanges);
  };
  // *********** TR 01  End handleIpPoolChange  *************
  //##
  // *********** TR 01  VALIDATION ON SUBMIT  *************
  const submitValidation = () => {
    if (
      pnetworkInfostate.secondaryDns == "" ||
      pnetworkInfostate.secondaryDns == null
    ) {
      setInputError({ ...inputErrors, secondaryDnsErr: true });
      setInputErrorMsg({
        ...inputErrorMsg,
        secondaryDnsErrorMsg: "secondary dns is required",
      });
    } else {
      setInputError({ ...inputErrors, secondaryDnsErr: false });
      setInputErrorMsg({ ...inputErrorMsg, secondaryDnsErrorMsg: "" });
    }
    if (
      pnetworkInfostate.primaryDns == "" ||
      pnetworkInfostate.primaryDns == null
    ) {
      setInputError({ ...inputErrors, primaryDnsErr: true });
      setInputErrorMsg({
        ...inputErrorMsg,
        primaryDnsErrorMsg: "Primary dns is required",
      });
    } else {
      setInputError({ ...inputErrors, primaryDnsErr: false });
      setInputErrorMsg({ ...inputErrorMsg, primaryDnsErrorMsg: "" });
    }
    if (
      pnetworkInfostate.networkName == "" ||
      pnetworkInfostate.networkName == null
    ) {
      setInputError({ ...inputErrors, networkNameErr: true });
      setInputErrorMsg({
        ...inputErrorMsg,
        networkNameErrorMsg: " This field is required",
      });
    } else if (!/^[a-zA-Z0-9_-]{3,25}$/.test(pnetworkInfostate.networkName)) {
      setInputError({ ...inputErrors, networkNameErr: true });
      setInputErrorMsg({
        ...inputErrorMsg,
        networkNameErrorMsg: "Network name must be minimum",
      });
    } else {
      setInputError({ ...inputErrors, networkNameErr: false });
      setInputErrorMsg({ ...inputErrorMsg, networkNameErrorMsg: "" });
    }
  };
  // *********** TR 01  VALIDATION ON SUBMIT  *************
  const onPnetworkInfoSubmit = async (data) => {
    //

    setpnetworkInfostate({
      ...pnetworkInfostate,
      staticIpPools: IpPoolData,
    });
    // Collect the entered IP ranges
    const enteredIpRanges = ipRanges.filter((range) => range !== "");
    // Update pnetworkInfostate with the collected IP ranges

    // Check if all required key values in poiPIstate are filled
    const requiredFields = [
      "networkName",
      "networkStatus",
      "networkDesc",
      "gatewayCidr",
      // "primaryDns",
      // "secondaryDns",
      "dnsSuffix",
      "teams",
      "staticIpPools",
      "proxyipAddress",
    ];

    const isPnetworkInfostateFilled = requiredFields.every((key) => {
      if (key === "networkDesc") {
        // return true; // Skip validation for middleName field
      }
      // return pnetworkInfostate[key] !== "";
    });

    // Usage:
    if (isPnetworkInfostateFilled) {
      // All required key values are filled
    } else {
      // Some required key values are not filled
    }

    // ****** TR 01 ******

    if (pnetworkInfostate.staticIpPools.length < 1) {
      toast.error("Kindly add  static ip pool range");
      return;
    }
    console.log(inputErrors.staticIpPoolErr);
    if (
      !isGatewayValid ||
      inputErrors.primaryDnsErr == true ||
      inputErrors.secondaryDnsErr == true ||
      inputErrors.networkNameErr == true
    ) {
      toast.error("Invalid ");
      return;
    } else if (Object.values(inputErrors.staticIpPoolErr).some((err) => err)) {
      toast.error("Invalid static IP pool range ");
    } else {
      // onclose()
      handleAddNetworks(pnetworkInfostate);
    }
  };
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setpnetworkInfostate((prev) => ({ ...prev, [name]: value }));
    if (name == "dnsSuffix") {
      errorsPnetworkInfo.dnsSuffix = false;
    }
  };

  const handleInputFocus = (evt) => {
    setpnetworkInfostate((prev) => ({ ...prev, focus: evt.target.name }));
  };

  // State to track if gateway CIDR is valid
  const [isGatewayValid, setGatewayValid] = useState(false);

  const [locCidrange, setlocCidrange] = useState("192.168.1.2-192.168.1.100");
  const [cidrStartIp, setcidrStartIp] = useState("");
  const [cidrEndIp, setcidrEndIp] = useState("");
  // Handler for gateway CIDR change
  const handleGatewayChange = (event) => {
    const value = event.target.value;
    errorsPnetworkInfo.gatewayCidr = false;

    setIpPoolData([]);
    setIpRanges([""]);
    setpnetworkInfostate((prev) => ({
      ...prev,
      staticIpPools: {},
    }));

    const isValid =
      /^(25[0-4]|2[0-4]\d|1\d{2}|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d{0,1}|0)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d{0,1}|0)\.(25[0-4]|2[0-4]\d|1\d{2}|[1-9]\d|[1-9])\/([1-9]|[12]\d|3[0-2])$/.test(
        value
      );
    console.log(isValid);
    if (isValid) {
      const { startIP, endIP } = calculateIPRanges(value);
      console.log(startIP + "-" + endIP);
      setcidrStartIp(startIP);
      setcidrEndIp(endIP);
      setlocCidrange(startIP + "-" + endIP);
    }
    // setGatewayValid(isValid);
    // TR
    if (value == null || value === "") {
      errorsPnetworkInfo.gatewayCidr = false;
      setGatewayValid(false);
      // setInputErrorMsg({...inputErrorMsg, gatewayCidrErrorMsg: "Gateway CIDR is required"})
    } else if (
      !/^(25[0-4]|2[0-4]\d|1\d{2}|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d{0,1}|0)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d{0,1}|0)\.(25[0-4]|2[0-4]\d|1\d{2}|[1-9]\d|[1-9])\/([1-9]|[12]\d|3[0-2])$/.test(
        value
      )
    ) {
      setGatewayValid(false);
      setInputErrorMsg({
        ...inputErrorMsg,
        gatewayCidrErrorMsg: "Invalid CIDR format",
      });
    } else {
      //const gatewayCIDR = '192.168.172.6/24'; // Replace this with your actual CIDR

      setGatewayValid(true);
      setInputErrorMsg({ ...inputErrorMsg, gatewayCidrErrorMsg: "" });
    }
  };

  // TR 01
  const handleNetworkNameChange = (e) => {
    errorsPnetworkInfo.networkName = false;
    const value = e.target.value;
    if (value == null || value === "") {
      setInputError({ ...inputErrors, networkNameErr: true });
      setInputErrorMsg({
        ...inputErrorMsg,
        networkNameErrorMsg: "Network fields is required",
      });
    } else if (value.length < 3) {
      setInputError({ ...inputErrors, networkNameErr: true });
      setInputErrorMsg({
        ...inputErrorMsg,
        networkNameErrorMsg: "Network name must be atleast 3 characters",
      });
    } else if (value.length > 25) {
      setInputError({ ...inputErrors, networkNameErr: true });
      setInputErrorMsg({
        ...inputErrorMsg,
        networkNameErrorMsg:
          "Network name must not be greater than 25 characters",
      });
    } else if (!/^[a-zA-Z0-9_-]{0,25}$/.test(value)) {
      setInputError({ ...inputErrors, networkNameErr: true });
      setInputErrorMsg({
        ...inputErrorMsg,
        networkNameErrorMsg: "Only hyphen and underscore are allowed",
      });
    } else {
      setInputError({ ...inputErrors, networkNameErr: false });
      setInputErrorMsg({ ...inputErrorMsg, networkNameErrorMsg: "" });
    }
  };
  // TR 01 primary dns changehandler
  const handlePrimaryDnsChange = (e) => {
    errorsPnetworkInfo.primaryDns = false;
    const value = e.target.value;

    if (e.target.value == null || e.target.value === "") {
      errorsPnetworkInfo.primaryDns = false;
      setInputError({ ...inputErrors, primaryDnsErr: false });
      setInputErrorMsg({ ...inputErrorMsg, primaryDnsErrorMsg: "" });
    } else if (
      !/^(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        value
      )
    ) {
      // errorsPnetworkInfo.primaryDns = true
      setInputError({ ...inputErrors, primaryDnsErr: true });
      setInputErrorMsg({ ...inputErrorMsg, primaryDnsErrorMsg: "Invalid dns" });
    } else {
      setInputError({ ...inputErrors, primaryDnsErr: false });
      setInputErrorMsg({ ...inputErrorMsg, primaryDnsErrorMsg: "" });
    }
  };
  // TR 01 secondary dns changehandler
  const handleSecondaryDnsChange = (e) => {
    errorsPnetworkInfo.secondaryDns = false;
    const value = e.target.value;
    if (value == null || value === "") {
      setInputError({ ...inputErrors, secondaryDnsErr: false });
      setInputErrorMsg({ ...inputErrorMsg, secondaryDnsErrorMsg: "" });
    } else if (
      !/^(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        value
      )
    ) {
      setInputError({ ...inputErrors, secondaryDnsErr: true });
      setInputErrorMsg({
        ...inputErrorMsg,
        secondaryDnsErrorMsg: "Invalid Dns",
      });
    } else {
      setInputError({ ...inputErrors, secondaryDnsErr: false });
      setInputErrorMsg({ ...inputErrorMsg, secondaryDnsErrorMsg: "" });
    }
  };
  const [ipPoolIndexedValue, setIpPoolIndexedValue] = useState(null);

  const handleDnsSuffixChange = (e) => {
    if (e.target.value) {
      if (!/^[a-zA-Z]+([-.][a-zA-Z]+)*$/.test(e.target.value)) {
        setInputError({ ...inputErrors, dnsSuffixErr: true });
        setInputErrorMsg({
          ...inputErrorMsg,
          dnsSuffixErrorMsg: "Invalid dns sufix",
        });
      } else {
        setInputError({ ...inputErrors, dnsSuffixErr: false });
        setInputErrorMsg({ ...inputErrorMsg, dnsSuffixErrorMsg: "" });
      }
    } else {
      setInputError({ ...inputErrors, dnsSuffixErr: false });
      setInputErrorMsg({ ...inputErrorMsg, dnsSuffixErrorMsg: "" });
    }
  };

  const onclose = () => {
    handleModalClosePrivateNet();
    setpnetworkInfostate({
      networkName: "",
      networkStatus: "",
      networkDesc: "",
      gatewayCidr: "",
      primaryDns: "",

      secondaryDns: "",
      dnsSuffix: "",
      teams: [teamData.defaultId],
      staticIpPools: [],

      proxyipAddress: "",
      tenantId: "",
      userSerialId: "",
      networkTypeId: networkTypeData.defaultId,
    });
    setIpRanges([""]);

    setInputError({
      networkNameErr: false,
      primaryDnsErr: false,
      secondaryDnsErr: false,
      dnsSuffixErr: false,
      staticIpPoolErr: {},
    });
    errorsPnetworkInfo.networkName = false;
    errorsPnetworkInfo.gatewayCidr = false;
    errorsPnetworkInfo.teams = false;
    handleModalClosePrivateNet();
  };

  // TR 01 HANDLE ADD NETWORKS
  const handleAddNetworks = async (data) => {
    const tdata = cookies ? JSON.parse(cookies) : [];
    data.tenantId = tdata.tenant_id;
    data.userSerialId = tdata.user_serial_id;
    delete data.focus;
    data.networkStatus = "progress";
    console.log(data.staticIpPools);
    console.log(Object.keys(data.staticIpPools).length);
    if (Object.keys(data.staticIpPools).length == 0) {
      toast.error("Static IP pool is required");
      return;
    }
    const newArray = data.staticIpPools.map(({ id, value, ...rest }) => rest);

    data.staticIpPools = newArray;

    // onclose()
    // console.log(data);
    // return;

    const newData = {
      data: data,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "addNewNetwork",
      token: tdata.accessToken,
      ipaddress: clientIP,
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/privatenet/list",
        finalData
      );
      // if(data){
      //   onclose()
      // }
      if (data.status === "ok") {
        // console.log(page)
        toast.success("New Network has been added successfully");
        /*if (page !== 0) {
          Cookies.remove("CollectTablePage");
          setPage(0);
        }*/
        onclose();

        setpnetworkInfostate({
          networkName: "",
          networkStatus: "",
          networkDesc: "",
          gatewayCidr: "",
          primaryDns: "",

          secondaryDns: "",
          dnsSuffix: "",
          teams: [teamData.defaultId],
          staticIpPools: [],

          proxyipAddress: "",
          tenantId: "",
          userSerialId: "",
          networkTypeId: networkTypeData.defaultId,
        });
        // onclose()
        // setprivateNetPopOpen(false)
        // resetPnetworkInfo()

        setIsTableaload(true);
        // fetchData()
        onclose();
      }
      if (data.status === "error") {
        toast.error(data.message);
        //  onclose()
      }
      // onclose()
    } catch (e) {
      console.error(e);
      toast.error("An error occured. Contact Administrator");
      onclose();
    }
  };
  const handelResetTeam = () => {
    setpnetworkInfostate((prev) => ({ ...prev, teams: [teamData.defaultId] }));
  };

  const ischange = true;
  return (
    <>
      {/* Start Add Private Network Modal Popup Here */}
      <BootstrapDialog
        onClose={onclose}
        aria-labelledby="customized-dialog-title"
        open={privateNetPopOpen}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          align="center"
          onClose={onclose}
        >
          Add Network
        </BootstrapDialogTitle>
        <Box
          onSubmit={handleSubmitPnetworkInfo(onPnetworkInfoSubmit)}
          id="pNetworkInfoSubmitForm"
          component="form"
          autoComplete="off"
        >
          <DialogContent dividers>
            <CssTextField
              margin="normal"
              autoFocus
              fullWidth
              id="networkName"
              label="Network Name"
              name="networkName"
              {...registerPnetworkInfo("networkName", {
                required: "Network Name is required",
              })}
              value={pnetworkInfostate.networkName}
              onChange={(e) => {
                handleInputChange(e);
                handleNetworkNameChange(e);
              }}
              onFocus={handleInputFocus}
            />
            {inputErrors.networkNameErr && (
              <Typography variant="span" className={styles.errrorMessageText}>
                {inputErrorMsg.networkNameErrorMsg}
              </Typography>
            )}{" "}
            {/* TR 01 */}
            <CssTextField
              margin="normal"
              fullWidth
              id="networkDesc"
              label="Network Description"
              name="networkDesc"
              {...registerPnetworkInfo("networkDesc", {
                //required: 'Network Name is required'
              })}
              value={pnetworkInfostate.networkDesc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              error={!!errorsPnetworkInfo.networkDesc} // Add the error prop to highlight the field when there is an error
              helperText={
                errorsPnetworkInfo.networkDesc &&
                errorsPnetworkInfo.networkDesc.message
              } // Show the error message
            />
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <ModalFormControl margin="normal" fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ backgroundColor: "#fff", padding: "0 3px" }}
                >
                  Select Network Type
                </InputLabel>
                <Select
                  key={networkTypeData.defaultId}
                  // defaultValue={networkTypeData.defaultId}
                  value={
                    pnetworkInfostate.networkTypeId
                      ? pnetworkInfostate.networkTypeId
                      : networkTypeData.defaultId
                  }
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Nationality"
                  MenuProps={MenuProps}
                  inputProps={{
                    ...registerPnetworkInfo("networkTypeId", {
                      required: "Select atleast one network", // Add validation rule
                    }),
                  }}
                  name="networkTypeId"
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    setpnetworkInfostate((prev) => ({
                      ...prev,
                      networkTypeId: value,
                    }));
                    handelResetTeam();
                  }}
                >
                  {networkTypeData.list &&
                    networkTypeData.list.map(function (elem) {
                      return (
                        <MenuItem key={elem.id} value={elem.id}>
                          {elem.value}
                        </MenuItem>
                      );
                    })}
                </Select>
              </ModalFormControl>
              <InfoOutlinedIcon
                sx={{ ml: 1, my: 2.5 }}
                className={styles.fieldInfoIcon}
                onClick={handleClick}
              />
              <Popover
                id={id}
                open={Popopen}
                anchorEl={popanchorEl}
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
                    This type of network provides controlled access to machines
                    and networks outside of the VDC through an edge gateway.
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
                    This type of network provides a fully isolated environment,
                    which is accessible only by this organization VDC.
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
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <CssTextField
                margin="normal"
                fullWidth
                id="gatewayCidr"
                label="Gateway CIDR"
                name="gatewayCidr"
                // required
                {...registerPnetworkInfo("gatewayCidr", {
                  required: "Gateway CIDR is required",
                })}
                value={pnetworkInfostate.gatewayCidr}
                onChange={(event) => {
                  handleInputChange(event);
                  handleGatewayChange(event); // Call gateway CIDR change handler
                }}
                onFocus={handleInputFocus}
                error={!!errorsPnetworkInfo.gatewayCidr} // Add the error prop to highlight the field when there is an error
                helperText={
                  errorsPnetworkInfo.gatewayCidr &&
                  errorsPnetworkInfo.gatewayCidr.message
                } // Show the error message
              />

              <InfoOutlinedIcon
                sx={{ ml: 1, my: 2.5 }}
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
                    192.168.1.254 and its associated routing prefix 192.168.1.0,
                    or equivalently, its subnet mask 255.255.255.0. The CIDR
                    value cannot be changed once it is provided.
                  </Typography>
                </Box>
              </Popover>
            </Box>
            {!isGatewayValid && (
              <Typography variant="span" className={styles.errrorMessageText}>
                {inputErrorMsg.gatewayCidrErrorMsg}
              </Typography>
            )}{" "}
            {/* TR 01 */}
            <Box className={styles.StaticIpContainer}>
              <Typography
                component="h4"
                variant="h5"
                align="left"
                fontSize={16}
              >
                Static IP Pools{" "}
                <InfoOutlinedIcon
                  sx={{ ml: 1 }}
                  className={styles.StaticIpInfoIcon}
                  onClick={IppoolshandleClick}
                />
                {isGatewayValid ? (
                  <AddCircleOutlinedIcon // TR 01
                    onClick={addIpRange}
                    className={styles.StaticIpAddIcon}
                  />
                ) : (
                  <AddCircleOutlinedIcon // TR 01
                    // onClick={addIpRange}
                    sx={{ cursor: "not-allowed !important" }}
                    className={styles.StaticIpAddIcon}
                  />
                )}
              </Typography>
              <Popover
                id={id}
                open={IppoolsPopopen}
                anchorEl={anchorIppoolsEl}
                onClose={IppoolshandlePopoverClose}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <Box className={styles.PopoveBoxContainer}>
                  <Typography
                    component="h4"
                    variant="h5"
                    align="left"
                    fontSize={16}
                    className={styles.PopoverHeader}
                  >
                    Static IP Range
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
                    Enter an IP range (format: `{locCidrange}`)
                  </Typography>
                </Box>
              </Popover>
              <Box>
                {ipRanges.map((data, index) => (
                  <Box
                    position="relative"
                    key={index}
                    sx={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <CssTextField
                      margin="normal"
                      fullWidth
                      disabled={!isGatewayValid}
                      id={`iprange-${index}`}
                      name={`iprange-${index}`}
                      value={data}
                      placeholder={`Enter an IP range (format: ${locCidrange} )`}
                      onChange={(e) => handleIpPoolChange(e, index)}
                    />
                    {inputErrors.staticIpPoolErr[index] && (
                      <Typography
                        variant="span"
                        className={`${styles.errrorMessageText} ${styles.ipPoolErrosText}`}
                      >
                        {inputErrorMsg.staticIpPoolErrorMsg[index]}
                      </Typography>
                    )}
                    {/*TR 01*/}
                    {ipRanges.length > 1 && (
                      <RemoveCircleIcon
                        sx={{ ml: 1, my: 2.5 }}
                        className={styles.IpRangeClose}
                        onClick={() => removeIpRange(index)}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
            <Grid
              sx={{ mt: "0px", borderRadius: "7px" }}
              container
              direction="row"
              rowSpacing={2}
              spacing={3}
            >
              <Grid
                item
                sx={{ pt: "0 !important" }}
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
              >
                <CssTextField
                  margin="normal"
                  fullWidth
                  label="Primary DNS"
                  id="primaryDns"
                  name="primaryDns"
                  value={pnetworkInfostate.primaryDns}
                  {...registerPnetworkInfo("primaryDns", {})}
                  onChange={(event) => {
                    handleInputChange(event);
                    handlePrimaryDnsChange(event); // TR 01  Call primary dns  change handler
                  }}
                  onFocus={() => {
                    // triggerPnetworkInfo('primaryDns')
                  }}
                  error={!!errorsPnetworkInfo.primaryDns} // Add the error prop to highlight the field when there is an error
                  helperText={
                    errorsPnetworkInfo.primaryDns &&
                    errorsPnetworkInfo.primaryDns.message
                  } // Show the error message
                />
                {inputErrors.primaryDnsErr && (
                  <Typography
                    variant="span"
                    className={styles.errrorMessageText}
                  >
                    {inputErrorMsg.primaryDnsErrorMsg}
                  </Typography>
                )}
              </Grid>
              <Grid
                item
                sx={{ pt: "0 !important" }}
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
              >
                <CssTextField
                  margin="normal"
                  fullWidth
                  label="Secondary DNS"
                  id="secondaryDns"
                  name="secondaryDns"
                  // required
                  {...registerPnetworkInfo("secondaryDns", {})}
                  value={pnetworkInfostate.secondaryDns}
                  onChange={(event) => {
                    handleInputChange(event);
                    handleSecondaryDnsChange(event); // TR 01  Call secondary dns  change handler
                  }}
                  onFocus={handleInputFocus}
                  error={!!errorsPnetworkInfo.secondaryDns} // Add the error prop to highlight the field when there is an error
                  helperText={
                    errorsPnetworkInfo.secondaryDns &&
                    errorsPnetworkInfo.secondaryDns.message
                  } // Show the error message
                />
                {inputErrors.secondaryDnsErr && (
                  <Typography
                    variant="span"
                    className={styles.errrorMessageText}
                  >
                    {inputErrorMsg.secondaryDnsErrorMsg}
                  </Typography>
                )}{" "}
                {/* TR 01 */}
              </Grid>
            </Grid>
            <CssTextField
              margin="normal"
              fullWidth
              label="DNS Suffix"
              id="dnsSuffix"
              name="dnsSuffix"
              {...registerPnetworkInfo("dnsSuffix", {
                pattern: {
                  value: /^[a-zA-Z\-\.]+$/,
                },
              })}
              value={pnetworkInfostate.dnsSuffix}
              onChange={(e) => {
                handleInputChange(e);
                handleDnsSuffixChange(e);
              }}
              error={!!errorsPnetworkInfo.dnsSuffix} // Add the error prop to highlight the field when there is an error
              helperText={
                errorsPnetworkInfo.dnsSuffix &&
                errorsPnetworkInfo.dnsSuffix.message
              } // Show the error message
            />
            {inputErrors.dnsSuffixErr && (
              <Typography variant="span" className={styles.errrorMessageText}>
                {inputErrorMsg.dnsSuffixErrorMsg}
              </Typography>
            )}
            <ModalFormControl margin="normal" fullWidth>
              <InputLabel
                id="demo-multiple-checkbox-label"
                style={{ backgroundColor: "#fff", padding: "0 3px" }}
              >
                Select Team
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple={pnetworkInfostate.networkTypeId != 3}
                value={pnetworkInfostate.teams}
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;
                  const selectedTeams = Array.isArray(value) ? value : [value];
                  setpnetworkInfostate((prev) => ({
                    ...prev,
                    teams: selectedTeams,
                  }));
                }}
                inputProps={{
                  name: "teams", // Use the name attribute for react-hook-form
                  id: "teams",
                  ...registerPnetworkInfo("teams", {
                    required: "Select atleast one team", // Add validation rule
                  }),
                }}
                renderValue={(selected) => {
                  if (Array.isArray(teamData.list)) {
                    const selectedTeamNames = teamData.list
                      .filter((elem) => selected.includes(elem.id))
                      .map((elem) => elem.value);
                    return selectedTeamNames.join(", ");
                  } else {
                    return ""; // Handle the case where teamData.list is not an array
                  }
                }}
                MenuProps={MenuProps}
              >
                {pnetworkInfostate.networkTypeId != 3
                  ? teamData.list &&
                    teamData.list?.map(function (elem, index) {
                      return (
                        <MenuItem
                          key={elem.id + "_" + index}
                          value={elem.id}
                          disabled={elem.isUsed}
                        >
                          <Checkbox
                            checked={pnetworkInfostate.teams
                              ?.map((id) => parseInt(id))
                              .includes(elem.id)}
                          />
                          <ListItemText primary={elem.value} />
                          {elem.isUsed && <LockIcon color="grey" />}
                        </MenuItem>
                      );
                    })
                  : teamData.list &&
                    teamData.list?.map(function (elem, index) {
                      return (
                        <MenuItem
                          key={elem.id + "_" + index}
                          value={elem.id}
                          disabled={elem.isUsed}
                        >
                          {/* <Checkbox
                          checked={pnetworkInfostate.teams == (elem.id)}
                        /> */}
                          <ListItemText primary={elem.value} />
                          {elem.isUsed && <LockIcon color="grey" />}
                        </MenuItem>
                      );
                    })}
              </Select>

              {errorsPnetworkInfo.teams && (
                <FormHelperText error>
                  {errorsPnetworkInfo.teams.message}
                </FormHelperText>
              )}
            </ModalFormControl>
          </DialogContent>
          <DialogActions>
            <ModalButton
              onClick={submitValidation}
              type="submit"
              variant="contained"
              size="medium"
              sx={{ position: "absolute", left: "45%" }}
            >
              ADD
            </ModalButton>
            <Button onClick={onclose} sx={{ color: "#6DCCDD" }}>
              Close
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
      {/* END Add Private Network Modal Popup Here */}
    </>
  );
};

export default AddNetworkPopup;
