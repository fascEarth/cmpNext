// ** React Imports
import * as React from "react";
import { useState } from "react";

import calculateIPRanges from "../../../../../tools/iprangecalculator/ipRangeCalculator";

// ** MUI Components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Popover from "@mui/material/Popover";
import Skeleton from "@mui/material/Skeleton";

// ** MUI ICON Components
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";

// ** Custom CSS
import styles from "./index.module.css";

//  TR 01
import Cookies from "js-cookie";
import axios from "axios";
import { useClientIP } from "../../../../../../utils/context/ClientIPContext";
import { useEffect } from "react";
import { toast } from "react-toastify";

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

export const StaticIpPool = (sslugId) => {

  const { clientIP } = useClientIP();


  const slugId = sslugId.sslugId;
  /* TR 01 */
  const cookies = Cookies.get("userData");
  const [datas, setDatas] = useState({});

  const [hideSkeleton, sethideSkeleton] = useState(false);

  const [staticIpPoolData, setStaticIpPoolData] = useState({
    networkId: "",
    tenantId: "",
    gatewayCidr: "",
    dnsSuffix: "",
    primaryDns: "",
    secondaryDns: "",
    staticIpPools: [],
  });
  const [ipRanges, setIpRanges] = useState([]); // Initialize with at least one IP range
  useEffect(() => {
    if (cookies && slugId) {
      fetchData();
    }
  }, [cookies, slugId]);
  const [getIprages, setGetIpranges] = useState([]);
  const [finalStaticPoolValues, setFinalStaticPoolValues] = useState([
    getIprages,
  ]);

  const [locCidrange, setlocCidrange] = useState("192.168.1.2-192.168.1.100");
  const [cidrStartIp, setcidrStartIp] = useState("");
  const [cidrEndIp, setcidrEndIp] = useState("");

  useEffect(() => {
    if (datas.gatewayCidr) {
      const { startIP, endIP } = calculateIPRanges(datas.gatewayCidr);

      setcidrStartIp(startIP);
      setcidrEndIp(endIP);
      setlocCidrange(startIP + "-" + endIP);
    }

    setStaticIpPoolData((prev) => ({
      ...prev,
      gatewayCidr: datas.gatewayCidr,
      networkId: datas.networkId,
      primaryDns: datas.primaryDns,
      secondaryDns: datas.secondaryDns,
      staticIpPools: datas.staticIpPools,
    }));

    const ipRanges = []; // Temporary array to collect IP ranges

    datas.staticIpPools?.forEach((ip) => {
      ipRanges.push(
        ip.networkStaticIpPoolStart + "-" + ip.networkStaticIpPoolEnd
      );
    });

    // Update getIpranges with the collected IP ranges
    setGetIpranges(ipRanges);
  }, [datas]);
  useEffect(() => {
    datas.staticIpPools?.map((ip) => {
      setGetIpranges([
        ...getIprages,
        ip.networkStaticIpPoolStart + "-" + ip.networkStaticIpPoolEnd,
      ]);

      setIpRanges([
        ...ipRanges,
        ip.networkStaticIpPoolStart + "-" + ip.networkStaticIpPoolEnd,
      ]);
    });
  }, []);

  const [isprogress, setIsprogress] = useState(false);
  const fetchData = async () => {
    const tdata = cookies ? JSON.parse(cookies) : [];

    const newData = {
      slugId: slugId,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP
    };
    const finalData = {
      data: newData,
      endPoint: "getStaticIPPool",
      token: tdata.accessToken,
      ipaddress: clientIP
    };
    try {
      const { data } = await axios.post(
        "/api/surface/networks/privatenet/detail/staticIPPool",
        finalData
      );
      if (data) {
        setDatas(data.message);
        sethideSkeleton(true);
        console.log(data, "static data");
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
      }
    } catch (error) {
      toast.error("An error occurred", error);
      console.log(error);
      sethideSkeleton(true);
    }
  };
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setStaticIpPoolData((prev) => ({ ...prev, [name]: value }));
  };
  const handlePrimaryDnsChange = (e) => {
    const value = e.target.value;

    if (
      !/^(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        value
      )
    ) {
      setInputError({ ...inputErrors, primaryDnsErr: true });
      setInputErrorMsg({
        ...inputErrorMsg,
        primaryDnsErrorMsg: "Invalid IP address",
      });
    } else {
      setInputError({ ...inputErrors, primaryDnsErr: false });
      setInputErrorMsg({ ...inputErrorMsg, primaryDnsErrorMsg: "" });
    }
  };
  // TR 01 secondary dns changehandler
  const handleSecondaryDnsChange = (e) => {
    const value = e.target.value;
    if (value == null || value === "") {
      setInputError({ ...inputErrors, secondaryDnsErr: true });
      setInputErrorMsg({
        ...inputErrorMsg,
        secondaryDnsErrorMsg: "secondary dns is required",
      });
    } else if (
      !/^(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        value
      )
    ) {
      setInputError({ ...inputErrors, secondaryDnsErr: true });
      setInputErrorMsg({
        ...inputErrorMsg,
        secondaryDnsErrorMsg: "Invalid IP address",
      });
    } else {
      setInputError({ ...inputErrors, secondaryDnsErr: false });
      setInputErrorMsg({ ...inputErrorMsg, secondaryDnsErrorMsg: "" });
    }
  };

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
    const isDuplicateanother = getIprages.includes(enteredRange);
    if (isDuplicate) {
      return isDuplicate;
    } else if (isDuplicateanother) {
      return isDuplicateanother;
    }
  }


  const ipToInt = (ip) => {
    if (!ip || typeof ip !== 'string') {
      return 0;
    }
  
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
  };

  const isOverlapWithExistingRanges = (newRange, indexnew) => {
    
    const combinedArray = [...getIprages, ...ipRanges];
    console.log(combinedArray)
    const [newStart, newEnd] = newRange.split('-').map(ip => ip.trim());

  const isOverlap = combinedArray.some((existingRange, index) => {
    

    if((indexnew+(getIprages.length)) !== index){


      const [existingStart, existingEnd] = existingRange.split('-').map(ip => ip.trim());    
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

  const isOverlapWithExistingRangesOld = (newRange, indexnew) => {
    
    const [newStart, newEnd] = newRange.split('-').map(ip => ip.trim());

  const isOverlap = getIprages.some((existingRange, index) => {
    

    if(indexnew !== index){


      const [existingStart, existingEnd] = existingRange.split('-').map(ip => ip.trim());    
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

  /*const isOverlapWithExistingRangesOld = (newRange) => {
    const [newStart, newEnd] = newRange.split("-").map((ip) => ip.trim());

    for (const existingRange of ipRanges) {
      const [existingStart, existingEnd] = existingRange
        .split("-")
        .map((ip) => ip.trim());

      if (
        (newStart <= existingEnd && newStart >= existingStart) ||
        (newEnd <= existingEnd && newEnd >= existingStart) ||
        (existingStart <= newEnd && existingEnd >= newStart)
      ) {
        return true; // Overlap detected
      }
    }

    for (const existingRange of getIprages) {
      const [existingStart, existingEnd] = existingRange
        .split("-")
        .map((ip) => ip.trim());

      if (
        (newStart <= existingEnd && newStart >= existingStart) ||
        (newEnd <= existingEnd && newEnd >= existingStart) ||
        (existingStart <= newEnd && existingEnd >= newStart)
      ) {
        return true; // Overlap detected
      }
    }

    return false; // No overlap
  };*/

  /** Raj's code for Private Network Validation Library end */

  // TR 01  dns suffix changehandler
  const handleSecondaryDnssuffix = (e) => {
    const value = e.target.value;

    if (
      !/^(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        value
      )
    ) {
      setInputError({ ...inputErrors, dnsSuffixErr: true });
      setInputErrorMsg({
        ...inputErrorMsg,
        dnsSuffixErrMsg: "Invalid IP address",
      });
    } else {
      setInputError({ ...inputErrors, dnsSuffixErr: false });
      setInputErrorMsg({ ...inputErrorMsg, dnsSuffixErrMsg: "" });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFinalStaticPoolValues([
      ...finalStaticPoolValues,
      staticIpPoolData.staticIpPools,
    ]);

    setStaticIpPoolData((prev) => ({
      ...prev,
      staticIpPools: IpPoolData,
    }));
    console.log(inputErrors);
    if (Object.values(inputErrors.staticIpPoolErr).some((err) => err)) {
      toast.error("Invalid static IP pool range ");
      return;
    }

    if (
      !inputErrors.primaryDnsErr &&
      !inputErrors.secondaryDnsErr &&
      !inputErrors.dnsSuffixErr
    ) {
      handlestaticIpPoolUpdate(staticIpPoolData);
    } else if (Object.values(inputErrors.staticIpPoolErr).some((err) => err)) {
      toast.error("Invalid static IP pool range ");
    }
  };
  const handlestaticIpPoolUpdate = async (data) => {
    const tdata = cookies ? JSON.parse(cookies) : [];
    data.tenantId = tdata.tenant_id;
    const newData = {
      data: data,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP
    };
    const newArray = data.staticIpPools.map(({ id, value, ...rest }) => rest);
    const combineIPPool = [...datas.staticIpPools, ...newArray];
    data.staticIpPools = combineIPPool;
    const finalData = {
      data: newData,
      endPoint: "staticIpPoolUpdate",
      token: tdata.accessToken,
      ipaddress: clientIP
    };

    try {
      const { data } = await axios.post(
        "/api/surface/networks/privatenet/detail/staticIPPool",
        finalData
      );
      if (data) {
      }
      if (data.status === "ok") {
        toast.success(" Newtwork  static IP has been updated successfully");
        setIpRanges([]);
        fetchData();
      } else if (data.status === "error") {
        toast.error(data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /* TR 01 */
  // ** Popover Function
  const [anchorEl, setAnchorEl] = React.useState(null);

  const Popopen = Boolean(anchorEl);
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
  // IP RANGES

  const addIpRange = () => {
    setIpRanges([...ipRanges, ""]);
  };

  const removeIpRange = (index) => {
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

    // **** TR 01 ****
    IpPoolData.splice(index, 1);
    setIpPoolData(IpPoolData);
  };
  const [staticIpPoolsValue, setStaticIpPoolsValue] = useState([]);
  const [ipPoolIndexedValue, setIpPoolIndexedValue] = useState();
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
    dnsSuffixErrMsg: "Please fill valid dns suffix",
  });
  const ipv4RangeRegex =
    /^(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\s*-\s*(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const [IpPoolData, setIpPoolData] = useState([]);
  const handleIpPoolChange = (e, i) => {
    const values = e.target.value;
    setIpPoolIndexedValue(i);
    if (values == null || values === "") {
      setInputError((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErr: { ...prevErrors.staticIpPoolErr, [i]: true },
      }));
      //setInputError({ ...inputErrors, staticIpPoolErr: true });
      setInputErrorMsg((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErrorMsg: {
          ...prevErrors.staticIpPoolErrorMsg,
          [i]: `Static IP pool is required`,
        },
      }));

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
      // setInputError({ ...inputErrors, staticIpPoolErr: true });
      /* setInputErrorMsg({
        ...inputErrorMsg,
        staticIpPoolErrorMsg: "Static IP pool is invalid",
      });*/

      setInputErrorMsg((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErrorMsg: {
          ...prevErrors.staticIpPoolErrorMsg,
          [i]: `Static IP pool is invalid`,
        },
      }));
    } else {
      setInputError((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErr: { ...prevErrors.staticIpPoolErr, [i]: false },
      }));
      //setInputError({ ...inputErrors, staticIpPoolErr: false });

      setInputErrorMsg((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErrorMsg: {
          ...prevErrors.staticIpPoolErrorMsg,
          [i]: ``,
        },
      }));

      //setInputErrorMsg({ ...inputErrorMsg, staticIpPoolErrorMsg: "" });
    }

    const enteredRange = values;
    const betweenRange = cidrStartIp + "-" + cidrEndIp;
    const result = isRangeWithinAnotherRange(enteredRange, betweenRange);
    if (result) {
      const lessresult = isStartIPBeforeEndIP(enteredRange);
      if (lessresult) {
        console.log(staticIpPoolData.gatewayCidr);

        const cidrMresult = isCIDRRangeNotWithinEnteredRange(
          staticIpPoolData.gatewayCidr,
          enteredRange
        );
        console.log(cidrMresult); // Returns true if there's overlap, otherwise false
        if (cidrMresult) {
          setInputError((prevErrors) => ({
            ...prevErrors,
            staticIpPoolErr: { ...prevErrors.staticIpPoolErr, [i]: true },
          }));
          //setInputError({ ...inputErrors, staticIpPoolErr: true });
          /*setInputErrorMsg({
        ...inputErrorMsg,
        staticIpPoolErrorMsg: "Entered Range should not contain the gateway CIDR",
      });*/

          setInputErrorMsg((prevErrors) => ({
            ...prevErrors,
            staticIpPoolErrorMsg: {
              ...prevErrors.staticIpPoolErrorMsg,
              [i]: `Entered Range should not contain the gateway CIDR`,
            },
          }));
        } else {
          setInputError((prevErrors) => ({
            ...prevErrors,
            staticIpPoolErr: { ...prevErrors.staticIpPoolErr, [i]: false },
          }));
          //setInputError({ ...inputErrors, staticIpPoolErr: false });
          //setInputErrorMsg({ ...inputErrorMsg, staticIpPoolErrorMsg: "" });

          setInputErrorMsg((prevErrors) => ({
            ...prevErrors,
            staticIpPoolErrorMsg: {
              ...prevErrors.staticIpPoolErrorMsg,
              [i]: ``,
            },
          }));
        }
      } else {
        setInputError((prevErrors) => ({
          ...prevErrors,
          staticIpPoolErr: { ...prevErrors.staticIpPoolErr, [i]: true },
        }));

        //setInputError({ ...inputErrors, staticIpPoolErr: true });
        /* setInputErrorMsg({
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
      }
    } else {
      setInputError((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErr: { ...prevErrors.staticIpPoolErr, [i]: true },
      }));
      //setInputError({ ...inputErrors, staticIpPoolErr: true });
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
    }

    const hasDuplicates = isEnteredRangeDuplicate(enteredRange);
    console.log(hasDuplicates);
    console.log(inputErrorMsg);
    if (hasDuplicates) {
      setInputError((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErr: { ...prevErrors.staticIpPoolErr, [i]: true },
      }));

      //setInputError({ ...inputErrors, staticIpPoolErr: true });
      /*setInputErrorMsg({
        ...inputErrorMsg,
        staticIpPoolErrorMsg: "Duplicate static IP Pool range",
      });*/

      setInputErrorMsg((prevErrors) => ({
        ...prevErrors,
        staticIpPoolErrorMsg: {
          ...prevErrors.staticIpPoolErrorMsg,
          [i]: `Duplicate static IP Pool range`,
        },
      }));
    }


    /*const isOverlapOld = isOverlapWithExistingRangesOld(enteredRange, i );

    if (isOverlapOld) {
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
    }*/

    const isOverlap = isOverlapWithExistingRanges(enteredRange, i );

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

    const updatedValues = [...ipRanges];
    updatedValues[i] = e.target.value;
    setStaticIpPoolsValue(updatedValues);
    var dataArray = Object.keys(updatedValues).map((id, i) => ({
      id: i + 1,
      networkStaticIpPoolId: 0,
      networkId: slugId,
      value: updatedValues[id],
      networkStaticIpPoolStart: updatedValues[id].split("-")[0],
      networkStaticIpPoolEnd: updatedValues[id].split("-")[1],
    }));
    setIpPoolData(dataArray);
    setIpRanges(updatedValues);
    setStaticIpPoolData((prev) => ({
      ...prev,
      staticIpPools: dataArray,
    }));
  };
  return (
    <>
      {/* Start Static IP Pools Design Here */}
      {hideSkeleton && (
        <Box component="form" onSubmit={(e) => handleSubmit(e)}>
          <Typography
            component="h4"
            variant="h5"
            align="left"
            fontSize={18}
            mb={2}
            sx={{ fontWeight: "500" }}
          >
            IPv4 Addess
          </Typography>
          <Card
            sx={{ mt: 2, borderRadius: "7px" }}
            variant="outlined"
            className={styles.ipv4Card}
          >
            <CardContent
              sx={{ padding: "24px" }}
              className={styles.ipv4CardContent}
            >
              <Grid
                container
                direction="row"
                rowSpacing={2}
                spacing={2}
                display={"flex"}
                justifyContent="center"
              >
                <Grid
                  item
                  xs={12}
                  sm={3}
                  md={3}
                  lg={2}
                  xl={2}
                  display={"flex"}
                  alignItems="center"
                >
                  <Typography
                    component="h4"
                    variant="h5"
                    align="left"
                    fontSize={16}
                    mb={2}
                    sx={{ mt: "35px", fontWeight: "400" }}
                    className={styles.gatewayCidr}
                  >
                    Gateway CIDR
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9} md={9} lg={10} xl={10}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-end" }}
                    className={styles.gatewayInput}
                  >
                    <CssTextField
                      margin="normal"
                      fullWidth
                      id="gateway"
                      name="gateway"
                      placeholder="172.17.48.254/24"
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
                          255.255.255.0. The CIDR value cannot be changed once
                          it is provided.
                        </Typography>
                      </Box>
                    </Popover>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  md={3}
                  lg={2}
                  xl={2}
                  display={"flex"}
                  alignItems="center"
                >
                  <Typography
                    component="h4"
                    variant="h5"
                    align="left"
                    fontSize={16}
                    mb={2}
                    sx={{ fontWeight: "400" }}
                    className={styles.gatewayInput}
                  >
                    Static IP Pools
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9} md={9} lg={10} xl={10}>
                  <Box
                    className={`${styles.StaticIpContainer} ${styles.ipRange}`}
                  >
                    <Typography
                      component="h4"
                      variant="h5"
                      align="left"
                      fontSize={16}
                      color={"#898989"}
                      className={styles.iprangeDesc}
                    >
                      Enter an IP range (format: 172.17.48.1-172.17.48.254)
                      <AddCircleOutlinedIcon
                        className={styles.StaticIpAddIcon}
                        onClick={addIpRange}
                      />
                    </Typography>
                    {getIprages.map((data, i) => (
                      <Box
                        position="relative"
                        key={i}
                        sx={{ display: "flex", alignItems: "flex-end" }}
                      >
                        <CssTextField
                          margin="normal"
                          fullWidth
                          id={`iprange-${i}`}
                          name={`iprange-${inputErrorMsg}`}
                          value={data}
                          placeholder={
                            "Enter an IP range (format: " + locCidrange + ")"
                          }
                          onChange={(e) => handleIpPoolChange(e, i)}
                          disabled
                          sx={{
                            "& .Mui-disabled": {
                              cursor: "not-allowed !important",
                            },
                          }}
                        />
                      </Box>
                    ))}
                    {ipRanges.map((data, index) => (
                      <Box
                        position="relative"
                        key={index}
                        sx={{ display: "flex", alignItems: "flex-end" }}
                      >
                        <CssTextField
                          margin="normal"
                          fullWidth
                          id={`iprange-${index}`}
                          name={`iprange-${index}`}
                          value={data}
                          placeholder={
                            "Enter an IP range (format: " + locCidrange + ")"
                          }
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
                        {
                          <RemoveCircleIcon
                            sx={{ ml: 1, my: 2.5 }}
                            className={styles.IpRangeClose}
                            onClick={() => removeIpRange(index)}
                          />
                        }
                      </Box>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Typography
            className={styles.dnsText}
            component="h4"
            variant="h5"
            align="left"
            fontSize={18}
            mt={"18px"}
            mb={2}
            sx={{ fontWeight: "500" }}
          >
            DNS
          </Typography>
          <Card sx={{ mt: 2, borderRadius: "7px" }} variant="outlined">
            <CardContent sx={{ padding: "24px" }}>
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
                    fullWidth
                    id="Primarydns"
                    label="Primary DNS"
                    name="primaryDns"
                    value={
                      staticIpPoolData.primaryDns
                        ? staticIpPoolData.primaryDns
                        : ""
                    }
                    onChange={(e) => {
                      handleInputChange(e);
                      handlePrimaryDnsChange(e);
                    }}
                  />
                  {inputErrors.primaryDnsErr && (
                    <Typography
                      variant="span"
                      className={styles.errrorMessageTexts}
                    >
                      {inputErrorMsg.primaryDnsErrorMsg}
                    </Typography>
                  )}{" "}
                  {/* TR 01 */}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssTextField
                    fullWidth
                    id="Secondarydns"
                    label="Secondary DNS"
                    name="secondaryDns"
                    value={
                      staticIpPoolData.secondaryDns
                        ? staticIpPoolData.secondaryDns
                        : ""
                    }
                    onChange={(e) => {
                      handleInputChange(e);
                      handleSecondaryDnsChange(e);
                    }}
                  />
                  {inputErrors.secondaryDnsErr && (
                    <Typography
                      variant="span"
                      className={styles.errrorMessageTexts}
                    >
                      {inputErrorMsg.secondaryDnsErrorMsg}
                    </Typography>
                  )}{" "}
                  {/* TR 01 */}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <CssTextField
                    fullWidth
                    id="suffix"
                    label="DNS suffix"
                    name="dnsSuffix"
                    value={
                      staticIpPoolData.dnsSuffix
                        ? staticIpPoolData.dnsSuffix
                        : ""
                    }
                    onChange={(e) => {
                      handleSecondaryDnssuffix(e);
                      handleInputChange(e);
                    }}
                  />
                  {inputErrors.dnsSuffixErr && (
                    <Typography
                      variant="span"
                      className={styles.errrorMessageTexts}
                    >
                      please enter valid dns Suffix
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
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
                  mt: 4,
                }}
              >
                {!isprogress ? "UPDATE" : "processing"}
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
                  mt: 4,
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
              </Button>
            )}
          </Box>
        </Box>
      )}
      {/* End Static IP Pools Design Here */}
      {/* Start Static IP Pools Skeleton Design Here */}
      {!hideSkeleton && (
        <Box hidden={hideSkeleton}>
          <Typography component="h4" variant="h5" align="left" mb={2}>
            <Skeleton variant="text" animation="wave" width={180} height={25} />
          </Typography>
          <Card sx={{ mt: 2, borderRadius: "7px" }} variant="outlined">
            <CardContent sx={{ padding: "24px" }}>
              <Grid
                container
                direction="row"
                rowSpacing={2}
                spacing={2}
                display={"flex"}
                justifyContent="center"
              >
                <Grid
                  item
                  xs={12}
                  sm={3}
                  md={3}
                  lg={2}
                  xl={2}
                  display={"flex"}
                  alignItems="center"
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={"100%"}
                    height={25}
                    sx={{ mt: "10px" }}
                    className={styles.gatewayCidr}
                  />
                </Grid>
                <Grid item xs={12} sm={9} md={9} lg={10} xl={10}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-end" }}
                    className={styles.gatewaySKInput}
                  >
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={"100%"}
                      height={55}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  md={3}
                  lg={2}
                  xl={2}
                  display={"flex"}
                  alignItems="center"
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={"100%"}
                    height={25}
                    className={styles.gatewaySKInput}
                  />
                </Grid>
                <Grid item xs={12} sm={9} md={9} lg={10} xl={10}>
                  <Box
                    className={`${styles.StaticIpContainer} ${styles.SKipRange}`}
                  >
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={"70%"}
                      height={25}
                    />
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={"100%"}
                        height={55}
                      />
                      <Skeleton
                        variant="circular"
                        animation="wave"
                        width={30}
                        height={30}
                        className={styles.IpRangeClose}
                        sx={{ top: "10px", ml: 1, my: 2.5 }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={"100%"}
                        height={55}
                      />
                      <Skeleton
                        variant="circular"
                        animation="wave"
                        width={30}
                        height={30}
                        className={styles.IpRangeClose}
                        sx={{ top: "10px", ml: 1, my: 2.5 }}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Typography
            component="h4"
            variant="h5"
            align="left"
            mt={"18px"}
            mb={2}
          >
            <Skeleton variant="text" animation="wave" width={180} height={25} />
          </Typography>
          <Card sx={{ mt: 2, borderRadius: "7px" }} variant="outlined">
            <CardContent sx={{ padding: "24px" }}>
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
                    width={"100%"}
                    height={55}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={"100%"}
                    height={55}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={"100%"}
                    height={55}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Skeleton
              variant="rounded"
              animation="wave"
              width={150}
              height={55}
              sx={{ mt: 4 }}
            />
          </Box>
        </Box>
      )}
      {/* Start Static IP Pools Skeleton Design Here */}
    </>
  );
};
