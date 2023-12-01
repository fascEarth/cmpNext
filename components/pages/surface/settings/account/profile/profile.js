// ** React Imports
import * as React from "react";
import { useState, useEffect } from "react";

// ** MUI Components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

import FormControl from "@mui/material/FormControl";
import { FormHelperText } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { toast } from "react-toastify";
import Select from "@mui/material/Select";

import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// ** MUI ICON Components
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Controller, useForm } from "react-hook-form";
// ** Custom CSS
import styles from "./index.module.css";
import Cookies from "js-cookie";
import axios from "axios";
import { Button } from "@mui/material";
import { useClientIP } from "../../../../../../utils/context/ClientIPContext";
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

function AccountProfile() {
  const { clientIP } = useClientIP();

  const [hideSkeletonTbl, sethideSkeletonTbl] = useState(false);
  const cookies = Cookies.get("userData");
  const [scachData, setscachData] = useState(false);
  const today = dayjs();

  const [issueDateUn, setissueDateUn] = useState(dayjs(today));

  const changeDateValue = (evt) => {
    const formattedData = evt.format("MM-DD-YYYY");

    setlistedDatav((prevState) => ({
      ...prevState,
      ["dateOfIssue"]: formattedData,
    }));

    setValuepoiPersonalInfo("dateOfIssue", formattedData);
    const unformattedDate = dayjs(formattedData, "MM-DD-YYYY").subtract(
      1,
      "day"
    );
    setissueDateUn(unformattedDate);
  };
  const changeDateValueExpiry = (evt) => {
    const formattedData = evt.format("MM-DD-YYYY");

    setlistedDatav((prevState) => ({
      ...prevState,
      ["dateOfExpiry"]: formattedData,
    }));
    // setValuepoiPersonalInfo("dateOfExpiry", formattedData);
  };

  const changeDateValueDob = (evt) => {
    const formattedData = evt.format("MM-DD-YYYY");

    setlistedDatav((prevState) => ({
      ...prevState,
      ["dateOfBirth"]: formattedData,
    }));
    // setValuepoiPersonalInfo("dateOfBirth", formattedData);
  };
  const [stcachdata, setstcachdata] = useState([]);
  const [commonRole, setcommonRole] = useState(false);
  useEffect(() => {
    const cachData = cookies ? JSON.parse(cookies) : true;

    setscachData(cachData);
    if (cachData) {
      console.log(cachData);
      setcommonRole(cachData.role_name);
      setstcachdata(cachData);
      fetchData(cachData);
    }
  }, [cookies]);

  // ** Chip Close Function
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };
  const [profileID, setProfileID] = useState("");
  const [idProofVerifyStatus, setIdProofVerifyStatus] = useState("");
  const [listedDatav, setlistedDatav] = useState({
    dateOfBirth: "",
    dateOfExpiry: "",
    dateOfIssue: "",
    emailId: "",
    familyName: "",
    firstName: "",
    idProof: "",
    idProofNo: "",
    idProofVerifyStatus: idProofVerifyStatus,
    pincode: "+966",
    middleName: "",
    mobileNo: "",
    nationality: "",
    placeOfIssuance: "",
    profileId: profileID,
    purposeOfUse: "",
    userSerialId: "",
  });

  const fetchData = async (tdata) => {
    const newData = {
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "getallaccprofileInfo",
      token: tdata.accessToken,
    };

    try {
      const { data } = await axios.post(
        "/api/surface/settings/account/profile",
        finalData
      ); // call the new API route
      if (data) {
        if (data.mobileNo) {
          data.mobileNo = data.mobileNo.split("+966")[0];
        }
        data.pincode = "+966";
        console.log(data, "data");

        setProfileID(data.profileId);
        setIdProofVerifyStatus(data.idProofVerifyStatus);
        setlistedDatav(data);

        sethideSkeletonTbl(true);
      }
    } catch (error) {
      // toast.error('An error occurred');
    }
  };
  const [idProofRegex, setidProofRegex] = useState(/^[\w.]+$/i);
  const [idProofMin, setidProofMin] = useState(10);
  const [idProofMax, setidProofMax] = useState(10);
  const handleInputChange = (evt) => {
    const { name, value } = evt.target || evt;

    if (name == "idProof") {
      if (value == "Passport") {
        setidProofMin(5);
        setidProofRegex(/^[\w.]+$/);
      } else {
        setidProofMin(10);
        setidProofRegex(/^\d+$/);
      }
    }

    setlistedDatav((prev) => ({ ...prev, [name]: value }));
  };

  const formpoiPersonalInfoMethods = useForm();
  const {
    register: registerpoiPersonalInfo,
    handleSubmit: handleSubmitpoiPersonalInfo,
    formState: { errors: errorspoiPersonalInfo },
    reset: resetpoiPersonalInfo,
    control: controlpoiPersonalInfo,
    setValue: setValuepoiPersonalInfo,
  } = formpoiPersonalInfoMethods;

  const onpoiPersonalInfoSubmit = async (data) => {
    const tdata = stcachdata;
    const myObject = data;

    const {
      emailId,
      pincode,
      // idProof,
      // nationality,
      // purposeOfUse,
      ...newObject
    } = myObject;
    console.log(newObject, "newObject");
    // newObject.tenantId = tdata.tenant_id;
    newObject.userSerialId = tdata.user_serial_id;
    newObject.profileId = profileID;
    newObject.idProofVerifyStatus = idProofVerifyStatus;
    const newData = {
      data: newObject,
      tenantId: tdata.tenant_id,
      userSerialId: tdata.user_serial_id,
      ipaddress: clientIP,
    };
    const finalData = {
      data: newData,
      endPoint: "updateiblInfo",
      token: tdata.accessToken,
    };
    console.log(finalData, "rrrrr");
    try {
      const { data } = await axios.post(
        "/api/surface/settings/account/profile",
        finalData
      );
      if (data) {
        if (data.status === "ok") {
          toast.success("User profile has been updated successfully!");
        }
      }
    } catch (error) {}
  };

  const nationalities = [
    {
      name: "Afghanistan",
      dial_code: "+93",
      code: "AF",
    },
    {
      name: "Aland Islands",
      dial_code: "+358",
      code: "AX",
    },
    {
      name: "Albania",
      dial_code: "+355",
      code: "AL",
    },
    {
      name: "Algeria",
      dial_code: "+213",
      code: "DZ",
    },
    {
      name: "AmericanSamoa",
      dial_code: "+1684",
      code: "AS",
    },
    {
      name: "Andorra",
      dial_code: "+376",
      code: "AD",
    },
    {
      name: "Angola",
      dial_code: "+244",
      code: "AO",
    },
    {
      name: "Anguilla",
      dial_code: "+1264",
      code: "AI",
    },
    {
      name: "Antarctica",
      dial_code: "+672",
      code: "AQ",
    },
    {
      name: "Antigua and Barbuda",
      dial_code: "+1268",
      code: "AG",
    },
    {
      name: "Argentina",
      dial_code: "+54",
      code: "AR",
    },
    {
      name: "Armenia",
      dial_code: "+374",
      code: "AM",
    },
    {
      name: "Aruba",
      dial_code: "+297",
      code: "AW",
    },
    {
      name: "Australia",
      dial_code: "+61",
      code: "AU",
    },
    {
      name: "Austria",
      dial_code: "+43",
      code: "AT",
    },
    {
      name: "Azerbaijan",
      dial_code: "+994",
      code: "AZ",
    },
    {
      name: "Bahamas",
      dial_code: "+1242",
      code: "BS",
    },
    {
      name: "Bahrain",
      dial_code: "+973",
      code: "BH",
    },
    {
      name: "Bangladesh",
      dial_code: "+880",
      code: "BD",
    },
    {
      name: "Barbados",
      dial_code: "+1246",
      code: "BB",
    },
    {
      name: "Belarus",
      dial_code: "+375",
      code: "BY",
    },
    {
      name: "Belgium",
      dial_code: "+32",
      code: "BE",
    },
    {
      name: "Belize",
      dial_code: "+501",
      code: "BZ",
    },
    {
      name: "Benin",
      dial_code: "+229",
      code: "BJ",
    },
    {
      name: "Bermuda",
      dial_code: "+1441",
      code: "BM",
    },
    {
      name: "Bhutan",
      dial_code: "+975",
      code: "BT",
    },
    {
      name: "Bolivia, Plurinational State of",
      dial_code: "+591",
      code: "BO",
    },
    {
      name: "Bosnia and Herzegovina",
      dial_code: "+387",
      code: "BA",
    },
    {
      name: "Botswana",
      dial_code: "+267",
      code: "BW",
    },
    {
      name: "Brazil",
      dial_code: "+55",
      code: "BR",
    },
    {
      name: "British Indian Ocean Territory",
      dial_code: "+246",
      code: "IO",
    },
    {
      name: "Brunei Darussalam",
      dial_code: "+673",
      code: "BN",
    },
    {
      name: "Bulgaria",
      dial_code: "+359",
      code: "BG",
    },
    {
      name: "Burkina Faso",
      dial_code: "+226",
      code: "BF",
    },
    {
      name: "Burundi",
      dial_code: "+257",
      code: "BI",
    },
    {
      name: "Cambodia",
      dial_code: "+855",
      code: "KH",
    },
    {
      name: "Cameroon",
      dial_code: "+237",
      code: "CM",
    },
    {
      name: "Canada",
      dial_code: "+1",
      code: "CA",
    },
    {
      name: "Cape Verde",
      dial_code: "+238",
      code: "CV",
    },
    {
      name: "Cayman Islands",
      dial_code: "+ 345",
      code: "KY",
    },
    {
      name: "Central African Republic",
      dial_code: "+236",
      code: "CF",
    },
    {
      name: "Chad",
      dial_code: "+235",
      code: "TD",
    },
    {
      name: "Chile",
      dial_code: "+56",
      code: "CL",
    },
    {
      name: "China",
      dial_code: "+86",
      code: "CN",
    },
    {
      name: "Christmas Island",
      dial_code: "+61",
      code: "CX",
    },
    {
      name: "Cocos (Keeling) Islands",
      dial_code: "+61",
      code: "CC",
    },
    {
      name: "Colombia",
      dial_code: "+57",
      code: "CO",
    },
    {
      name: "Comoros",
      dial_code: "+269",
      code: "KM",
    },
    {
      name: "Congo",
      dial_code: "+242",
      code: "CG",
    },
    {
      name: "Congo, The Democratic Republic of the Congo",
      dial_code: "+243",
      code: "CD",
    },
    {
      name: "Cook Islands",
      dial_code: "+682",
      code: "CK",
    },
    {
      name: "Costa Rica",
      dial_code: "+506",
      code: "CR",
    },
    {
      name: "Cote d'Ivoire",
      dial_code: "+225",
      code: "CI",
    },
    {
      name: "Croatia",
      dial_code: "+385",
      code: "HR",
    },
    {
      name: "Cuba",
      dial_code: "+53",
      code: "CU",
    },
    {
      name: "Cyprus",
      dial_code: "+357",
      code: "CY",
    },
    {
      name: "Czech Republic",
      dial_code: "+420",
      code: "CZ",
    },
    {
      name: "Denmark",
      dial_code: "+45",
      code: "DK",
    },
    {
      name: "Djibouti",
      dial_code: "+253",
      code: "DJ",
    },
    {
      name: "Dominica",
      dial_code: "+1767",
      code: "DM",
    },
    {
      name: "Dominican Republic",
      dial_code: "+1849",
      code: "DO",
    },
    {
      name: "Ecuador",
      dial_code: "+593",
      code: "EC",
    },
    {
      name: "Egypt",
      dial_code: "+20",
      code: "EG",
    },
    {
      name: "El Salvador",
      dial_code: "+503",
      code: "SV",
    },
    {
      name: "Equatorial Guinea",
      dial_code: "+240",
      code: "GQ",
    },
    {
      name: "Eritrea",
      dial_code: "+291",
      code: "ER",
    },
    {
      name: "Estonia",
      dial_code: "+372",
      code: "EE",
    },
    {
      name: "Ethiopia",
      dial_code: "+251",
      code: "ET",
    },
    {
      name: "Falkland Islands (Malvinas)",
      dial_code: "+500",
      code: "FK",
    },
    {
      name: "Faroe Islands",
      dial_code: "+298",
      code: "FO",
    },
    {
      name: "Fiji",
      dial_code: "+679",
      code: "FJ",
    },
    {
      name: "Finland",
      dial_code: "+358",
      code: "FI",
    },
    {
      name: "France",
      dial_code: "+33",
      code: "FR",
    },
    {
      name: "French Guiana",
      dial_code: "+594",
      code: "GF",
    },
    {
      name: "French Polynesia",
      dial_code: "+689",
      code: "PF",
    },
    {
      name: "Gabon",
      dial_code: "+241",
      code: "GA",
    },
    {
      name: "Gambia",
      dial_code: "+220",
      code: "GM",
    },
    {
      name: "Georgia",
      dial_code: "+995",
      code: "GE",
    },
    {
      name: "Germany",
      dial_code: "+49",
      code: "DE",
    },
    {
      name: "Ghana",
      dial_code: "+233",
      code: "GH",
    },
    {
      name: "Gibraltar",
      dial_code: "+350",
      code: "GI",
    },
    {
      name: "Greece",
      dial_code: "+30",
      code: "GR",
    },
    {
      name: "Greenland",
      dial_code: "+299",
      code: "GL",
    },
    {
      name: "Grenada",
      dial_code: "+1473",
      code: "GD",
    },
    {
      name: "Guadeloupe",
      dial_code: "+590",
      code: "GP",
    },
    {
      name: "Guam",
      dial_code: "+1671",
      code: "GU",
    },
    {
      name: "Guatemala",
      dial_code: "+502",
      code: "GT",
    },
    {
      name: "Guernsey",
      dial_code: "+44",
      code: "GG",
    },
    {
      name: "Guinea",
      dial_code: "+224",
      code: "GN",
    },
    {
      name: "Guinea-Bissau",
      dial_code: "+245",
      code: "GW",
    },
    {
      name: "Guyana",
      dial_code: "+595",
      code: "GY",
    },
    {
      name: "Haiti",
      dial_code: "+509",
      code: "HT",
    },
    {
      name: "Holy See (Vatican City State)",
      dial_code: "+379",
      code: "VA",
    },
    {
      name: "Honduras",
      dial_code: "+504",
      code: "HN",
    },
    {
      name: "Hong Kong",
      dial_code: "+852",
      code: "HK",
    },
    {
      name: "Hungary",
      dial_code: "+36",
      code: "HU",
    },
    {
      name: "Iceland",
      dial_code: "+354",
      code: "IS",
    },
    {
      name: "India",
      dial_code: "+91",
      code: "IN",
    },
    {
      name: "Indonesia",
      dial_code: "+62",
      code: "ID",
    },
    {
      name: "Iran, Islamic Republic of Persian Gulf",
      dial_code: "+98",
      code: "IR",
    },
    {
      name: "Iraq",
      dial_code: "+964",
      code: "IQ",
    },
    {
      name: "Ireland",
      dial_code: "+353",
      code: "IE",
    },
    {
      name: "Isle of Man",
      dial_code: "+44",
      code: "IM",
    },
    {
      name: "Israel",
      dial_code: "+972",
      code: "IL",
    },
    {
      name: "Italy",
      dial_code: "+39",
      code: "IT",
    },
    {
      name: "Jamaica",
      dial_code: "+1876",
      code: "JM",
    },
    {
      name: "Japan",
      dial_code: "+81",
      code: "JP",
    },
    {
      name: "Jersey",
      dial_code: "+44",
      code: "JE",
    },
    {
      name: "Jordan",
      dial_code: "+962",
      code: "JO",
    },
    {
      name: "Kazakhstan",
      dial_code: "+77",
      code: "KZ",
    },
    {
      name: "Kenya",
      dial_code: "+254",
      code: "KE",
    },
    {
      name: "Kiribati",
      dial_code: "+686",
      code: "KI",
    },
    {
      name: "Korea, Democratic People's Republic of Korea",
      dial_code: "+850",
      code: "KP",
    },
    {
      name: "Korea, Republic of South Korea",
      dial_code: "+82",
      code: "KR",
    },
    {
      name: "Kuwait",
      dial_code: "+965",
      code: "KW",
    },
    {
      name: "Kyrgyzstan",
      dial_code: "+996",
      code: "KG",
    },
    {
      name: "Laos",
      dial_code: "+856",
      code: "LA",
    },
    {
      name: "Latvia",
      dial_code: "+371",
      code: "LV",
    },
    {
      name: "Lebanon",
      dial_code: "+961",
      code: "LB",
    },
    {
      name: "Lesotho",
      dial_code: "+266",
      code: "LS",
    },
    {
      name: "Liberia",
      dial_code: "+231",
      code: "LR",
    },
    {
      name: "Libyan Arab Jamahiriya",
      dial_code: "+218",
      code: "LY",
    },
    {
      name: "Liechtenstein",
      dial_code: "+423",
      code: "LI",
    },
    {
      name: "Lithuania",
      dial_code: "+370",
      code: "LT",
    },
    {
      name: "Luxembourg",
      dial_code: "+352",
      code: "LU",
    },
    {
      name: "Macao",
      dial_code: "+853",
      code: "MO",
    },
    {
      name: "Macedonia",
      dial_code: "+389",
      code: "MK",
    },
    {
      name: "Madagascar",
      dial_code: "+261",
      code: "MG",
    },
    {
      name: "Malawi",
      dial_code: "+265",
      code: "MW",
    },
    {
      name: "Malaysia",
      dial_code: "+60",
      code: "MY",
    },
    {
      name: "Maldives",
      dial_code: "+960",
      code: "MV",
    },
    {
      name: "Mali",
      dial_code: "+223",
      code: "ML",
    },
    {
      name: "Malta",
      dial_code: "+356",
      code: "MT",
    },
    {
      name: "Marshall Islands",
      dial_code: "+692",
      code: "MH",
    },
    {
      name: "Martinique",
      dial_code: "+596",
      code: "MQ",
    },
    {
      name: "Mauritania",
      dial_code: "+222",
      code: "MR",
    },
    {
      name: "Mauritius",
      dial_code: "+230",
      code: "MU",
    },
    {
      name: "Mayotte",
      dial_code: "+262",
      code: "YT",
    },
    {
      name: "Mexico",
      dial_code: "+52",
      code: "MX",
    },
    {
      name: "Micronesia, Federated States of Micronesia",
      dial_code: "+691",
      code: "FM",
    },
    {
      name: "Moldova",
      dial_code: "+373",
      code: "MD",
    },
    {
      name: "Monaco",
      dial_code: "+377",
      code: "MC",
    },
    {
      name: "Mongolia",
      dial_code: "+976",
      code: "MN",
    },
    {
      name: "Montenegro",
      dial_code: "+382",
      code: "ME",
    },
    {
      name: "Montserrat",
      dial_code: "+1664",
      code: "MS",
    },
    {
      name: "Morocco",
      dial_code: "+212",
      code: "MA",
    },
    {
      name: "Mozambique",
      dial_code: "+258",
      code: "MZ",
    },
    {
      name: "Myanmar",
      dial_code: "+95",
      code: "MM",
    },
    {
      name: "Namibia",
      dial_code: "+264",
      code: "NA",
    },
    {
      name: "Nauru",
      dial_code: "+674",
      code: "NR",
    },
    {
      name: "Nepal",
      dial_code: "+977",
      code: "NP",
    },
    {
      name: "Netherlands",
      dial_code: "+31",
      code: "NL",
    },
    {
      name: "Netherlands Antilles",
      dial_code: "+599",
      code: "AN",
    },
    {
      name: "New Caledonia",
      dial_code: "+687",
      code: "NC",
    },
    {
      name: "New Zealand",
      dial_code: "+64",
      code: "NZ",
    },
    {
      name: "Nicaragua",
      dial_code: "+505",
      code: "NI",
    },
    {
      name: "Niger",
      dial_code: "+227",
      code: "NE",
    },
    {
      name: "Nigeria",
      dial_code: "+234",
      code: "NG",
    },
    {
      name: "Niue",
      dial_code: "+683",
      code: "NU",
    },
    {
      name: "Norfolk Island",
      dial_code: "+672",
      code: "NF",
    },
    {
      name: "Northern Mariana Islands",
      dial_code: "+1670",
      code: "MP",
    },
    {
      name: "Norway",
      dial_code: "+47",
      code: "NO",
    },
    {
      name: "Oman",
      dial_code: "+968",
      code: "OM",
    },
    {
      name: "Pakistan",
      dial_code: "+92",
      code: "PK",
    },
    {
      name: "Palau",
      dial_code: "+680",
      code: "PW",
    },
    {
      name: "Palestinian Territory, Occupied",
      dial_code: "+970",
      code: "PS",
    },
    {
      name: "Panama",
      dial_code: "+507",
      code: "PA",
    },
    {
      name: "Papua New Guinea",
      dial_code: "+675",
      code: "PG",
    },
    {
      name: "Paraguay",
      dial_code: "+595",
      code: "PY",
    },
    {
      name: "Peru",
      dial_code: "+51",
      code: "PE",
    },
    {
      name: "Philippines",
      dial_code: "+63",
      code: "PH",
    },
    {
      name: "Pitcairn",
      dial_code: "+872",
      code: "PN",
    },
    {
      name: "Poland",
      dial_code: "+48",
      code: "PL",
    },
    {
      name: "Portugal",
      dial_code: "+351",
      code: "PT",
    },
    {
      name: "Puerto Rico",
      dial_code: "+1939",
      code: "PR",
    },
    {
      name: "Qatar",
      dial_code: "+974",
      code: "QA",
    },
    {
      name: "Romania",
      dial_code: "+40",
      code: "RO",
    },
    {
      name: "Russia",
      dial_code: "+7",
      code: "RU",
    },
    {
      name: "Rwanda",
      dial_code: "+250",
      code: "RW",
    },
    {
      name: "Reunion",
      dial_code: "+262",
      code: "RE",
    },
    {
      name: "Saint Barthelemy",
      dial_code: "+590",
      code: "BL",
    },
    {
      name: "Saint Helena, Ascension and Tristan Da Cunha",
      dial_code: "+290",
      code: "SH",
    },
    {
      name: "Saint Kitts and Nevis",
      dial_code: "+1869",
      code: "KN",
    },
    {
      name: "Saint Lucia",
      dial_code: "+1758",
      code: "LC",
    },
    {
      name: "Saint Martin",
      dial_code: "+590",
      code: "MF",
    },
    {
      name: "Saint Pierre and Miquelon",
      dial_code: "+508",
      code: "PM",
    },
    {
      name: "Saint Vincent and the Grenadines",
      dial_code: "+1784",
      code: "VC",
    },
    {
      name: "Samoa",
      dial_code: "+685",
      code: "WS",
    },
    {
      name: "San Marino",
      dial_code: "+378",
      code: "SM",
    },
    {
      name: "Sao Tome and Principe",
      dial_code: "+239",
      code: "ST",
    },
    {
      name: "Saudi Arabia",
      dial_code: "+966",
      code: "SA",
    },
    {
      name: "Senegal",
      dial_code: "+221",
      code: "SN",
    },
    {
      name: "Serbia",
      dial_code: "+381",
      code: "RS",
    },
    {
      name: "Seychelles",
      dial_code: "+248",
      code: "SC",
    },
    {
      name: "Sierra Leone",
      dial_code: "+232",
      code: "SL",
    },
    {
      name: "Singapore",
      dial_code: "+65",
      code: "SG",
    },
    {
      name: "Slovakia",
      dial_code: "+421",
      code: "SK",
    },
    {
      name: "Slovenia",
      dial_code: "+386",
      code: "SI",
    },
    {
      name: "Solomon Islands",
      dial_code: "+677",
      code: "SB",
    },
    {
      name: "Somalia",
      dial_code: "+252",
      code: "SO",
    },
    {
      name: "South Africa",
      dial_code: "+27",
      code: "ZA",
    },
    {
      name: "South Sudan",
      dial_code: "+211",
      code: "SS",
    },
    {
      name: "South Georgia and the South Sandwich Islands",
      dial_code: "+500",
      code: "GS",
    },
    {
      name: "Spain",
      dial_code: "+34",
      code: "ES",
    },
    {
      name: "Sri Lanka",
      dial_code: "+94",
      code: "LK",
    },
    {
      name: "Sudan",
      dial_code: "+249",
      code: "SD",
    },
    {
      name: "Suriname",
      dial_code: "+597",
      code: "SR",
    },
    {
      name: "Svalbard and Jan Mayen",
      dial_code: "+47",
      code: "SJ",
    },
    {
      name: "Swaziland",
      dial_code: "+268",
      code: "SZ",
    },
    {
      name: "Sweden",
      dial_code: "+46",
      code: "SE",
    },
    {
      name: "Switzerland",
      dial_code: "+41",
      code: "CH",
    },
    {
      name: "Syrian Arab Republic",
      dial_code: "+963",
      code: "SY",
    },
    {
      name: "Taiwan",
      dial_code: "+886",
      code: "TW",
    },
    {
      name: "Tajikistan",
      dial_code: "+992",
      code: "TJ",
    },
    {
      name: "Tanzania, United Republic of Tanzania",
      dial_code: "+255",
      code: "TZ",
    },
    {
      name: "Thailand",
      dial_code: "+66",
      code: "TH",
    },
    {
      name: "Timor-Leste",
      dial_code: "+670",
      code: "TL",
    },
    {
      name: "Togo",
      dial_code: "+228",
      code: "TG",
    },
    {
      name: "Tokelau",
      dial_code: "+690",
      code: "TK",
    },
    {
      name: "Tonga",
      dial_code: "+676",
      code: "TO",
    },
    {
      name: "Trinidad and Tobago",
      dial_code: "+1868",
      code: "TT",
    },
    {
      name: "Tunisia",
      dial_code: "+216",
      code: "TN",
    },
    {
      name: "Turkey",
      dial_code: "+90",
      code: "TR",
    },
    {
      name: "Turkmenistan",
      dial_code: "+993",
      code: "TM",
    },
    {
      name: "Turks and Caicos Islands",
      dial_code: "+1649",
      code: "TC",
    },
    {
      name: "Tuvalu",
      dial_code: "+688",
      code: "TV",
    },
    {
      name: "Uganda",
      dial_code: "+256",
      code: "UG",
    },
    {
      name: "Ukraine",
      dial_code: "+380",
      code: "UA",
    },
    {
      name: "United Arab Emirates",
      dial_code: "+971",
      code: "AE",
    },
    {
      name: "United Kingdom",
      dial_code: "+44",
      code: "GB",
    },
    {
      name: "United States",
      dial_code: "+1",
      code: "US",
    },
    {
      name: "Uruguay",
      dial_code: "+598",
      code: "UY",
    },
    {
      name: "Uzbekistan",
      dial_code: "+998",
      code: "UZ",
    },
    {
      name: "Vanuatu",
      dial_code: "+678",
      code: "VU",
    },
    {
      name: "Venezuela, Bolivarian Republic of Venezuela",
      dial_code: "+58",
      code: "VE",
    },
    {
      name: "Vietnam",
      dial_code: "+84",
      code: "VN",
    },
    {
      name: "Virgin Islands, British",
      dial_code: "+1284",
      code: "VG",
    },
    {
      name: "Virgin Islands, U.S.",
      dial_code: "+1340",
      code: "VI",
    },
    {
      name: "Wallis and Futuna",
      dial_code: "+681",
      code: "WF",
    },
    {
      name: "Yemen",
      dial_code: "+967",
      code: "YE",
    },
    {
      name: "Zambia",
      dial_code: "+260",
      code: "ZM",
    },
    {
      name: "Zimbabwe",
      dial_code: "+263",
      code: "ZW",
    },
  ];

  const nationalitiesItems = nationalities.map((ival) => (
    <MenuItem value={ival.code} key={ival.code}>
      {ival.name}
    </MenuItem>
  ));

  const isDisabled = true;

  return (
    <>
      {/* Start My Profile Design Here */}
      {hideSkeletonTbl && (
        <Box
          onSubmit={handleSubmitpoiPersonalInfo(onpoiPersonalInfoSubmit)}
          component="form"
        >
          <Grid
            container
            direction="row"
            rowSpacing={2}
            spacing={2}
            display={"flex"}
            justifyContent="center"
          >
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CssTextField
                disabled={isDisabled}
                margin="normal"
                autoFocus
                fullWidth
                id="familyname"
                label="Family Name"
                name="familyName"
                {...registerpoiPersonalInfo("familyName", {
                  required: "Family Name is required",
                })}
                value={listedDatav.familyName ? listedDatav.familyName : ""}
                onChange={handleInputChange}
                inputProps={{
                  style: { cursor: isDisabled ? "not-allowed" : "auto" },
                }}
              />
              {errorspoiPersonalInfo.familyName && (
                <FormHelperText error>
                  {errorspoiPersonalInfo.familyName.message}
                </FormHelperText>
              )}

              <CssTextField
                disabled
                {...registerpoiPersonalInfo("middleName")}
                value={listedDatav.middleName ? listedDatav.middleName : ""}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                id="middlename"
                label="Middle Name"
                name="middleName"
                inputProps={{
                  style: { cursor: isDisabled ? "not-allowed" : "auto" },
                }}
              />
              {errorspoiPersonalInfo.middleName && (
                <FormHelperText error>
                  {errorspoiPersonalInfo.middleName.message}
                </FormHelperText>
              )}

              <Grid container direction="row" rowSpacing={2} spacing={2}>
                <Grid item xs={12} sm={6} md={5} lg={4} xl={4}>
                  <CssFormControl
                    margin="normal"
                    fullWidth
                    sx={{
                      "& .MuiSelect-select.Mui-disabled:hover": {
                        cursor: "not-allowed",
                      },
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Proof of ID
                    </InputLabel>
                    <Select
                      disabled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Proof of ID"
                      MenuProps={MenuProps}
                      {...registerpoiPersonalInfo("idProof", {
                        required: "ID Proof is required",
                      })}
                      value={listedDatav.idProof ? listedDatav.idProof : ""}
                      onChange={handleInputChange}
                    >
                      <MenuItem value={""} disabled>
                        Select Any
                      </MenuItem>
                      <MenuItem value="National ID">National ID</MenuItem>
                      <MenuItem value="Iqama">Iqama</MenuItem>
                      <MenuItem value="Passport">Passport</MenuItem>
                    </Select>
                    {errorspoiPersonalInfo.idProof && (
                      <FormHelperText error>
                        {errorspoiPersonalInfo.idProof.message}
                      </FormHelperText>
                    )}
                  </CssFormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={7} lg={8} xl={8}>
                  <CssTextField
                    disabled
                    inputProps={{
                      style: { cursor: isDisabled ? "not-allowed" : "auto" },
                    }}
                    {...registerpoiPersonalInfo("idProofNo", {
                      required: "ID Number is required",
                      pattern: {
                        value: idProofRegex,
                        message: "Invalid ID Proof",
                      },
                      minLength: {
                        value: idProofMin, // Set the minimum length
                        message:
                          "ID Proof Number should be at least " +
                          idProofMin +
                          " characters",
                      },
                      maxLength: {
                        value: idProofMax, // Set the maximum length
                        message:
                          "ID Proof Number should not exceed " +
                          idProofMax +
                          " characters",
                      },
                    })}
                    onChange={handleInputChange}
                    value={listedDatav.idProofNo ? listedDatav.idProofNo : ""}
                    margin="normal"
                    fullWidth
                    id="idnumber"
                    label="ID Number"
                    name="idProofNo"
                  />
                  {errorspoiPersonalInfo.idProofNo && (
                    <FormHelperText error>
                      {errorspoiPersonalInfo.idProofNo.message}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>

              <CssFormControl
                disabled
                components={["DatePicker"]}
                margin="normal"
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled:hover": {
                    cursor: "not-allowed",
                  },
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disabled
                    {...registerpoiPersonalInfo("dateOfIssue", {
                      required: "Date Of Issue is required",
                    })}
                    maxDate={today}
                    views={["year", "month", "day"]}
                    value={
                      dayjs(listedDatav.dateOfIssue, "MM-DD-YYYY")
                        ? dayjs(listedDatav.dateOfIssue, "MM-DD-YYYY")
                        : ""
                    }
                    sx={{
                      "& .MuiFormLabel-root.Mui-disabled": {
                        color: "#00000061",
                      },
                    }}
                    onChange={changeDateValue}
                    name="dateOfIssue"
                    label="Date of Issue"
                    renderInput={(params) => <TextField {...params} />} // If you're using TextField
                  />
                  {errorspoiPersonalInfo.dateOfIssue && (
                    <FormHelperText error>
                      {errorspoiPersonalInfo.dateOfIssue.message}
                    </FormHelperText>
                  )}
                </LocalizationProvider>
              </CssFormControl>
              <CssFormControl
                disabled
                components={["DatePicker"]}
                margin="normal"
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled:hover": {
                    cursor: "not-allowed",
                  },
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disabled
                    {...registerpoiPersonalInfo("dateOfBirth", {
                      required: "Date Of Birth is required",
                    })}
                    value={
                      dayjs(listedDatav.dateOfBirth, "MM-DD-YYYY")
                        ? dayjs(listedDatav.dateOfBirth, "MM-DD-YYYY")
                        : ""
                    }
                    sx={{
                      "& .MuiFormLabel-root.Mui-disabled": {
                        color: "#00000061",
                      },
                    }}
                    onChange={changeDateValueDob}
                    maxDate={issueDateUn}
                    name="dateOfBirth"
                    label="Date of Birth"
                    renderInput={(params) => <TextField {...params} />} // If you're using TextField
                  />
                  {errorspoiPersonalInfo.dateOfBirth && (
                    <FormHelperText error>
                      {errorspoiPersonalInfo.dateOfBirth.message}
                    </FormHelperText>
                  )}
                </LocalizationProvider>
              </CssFormControl>
              <CssTextField
                disabled
                // {...registerpoiPersonalInfo("emailId", {
                //   required: "Email is required",
                // })}
                value={listedDatav.emailId ? listedDatav.emailId : ""}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                id="email"
                label="Email ID"
                // name="emailId"
                inputProps={{
                  style: { cursor: isDisabled ? "not-allowed" : "auto" },
                }}
              />
              {/* {errorspoiPersonalInfo.emailId && (
                <FormHelperText error>
                  {errorspoiPersonalInfo.emailId.message}
                </FormHelperText>
              )} */}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CssTextField
                disabled
                {...registerpoiPersonalInfo("firstName", {
                  required: "First Name is required",
                })}
                value={listedDatav.firstName ? listedDatav.firstName : ""}
                margin="normal"
                fullWidth
                id="firstname"
                label="First Name"
                name="firstName"
                onChange={handleInputChange}
                inputProps={{
                  style: { cursor: isDisabled ? "not-allowed" : "auto" },
                }}
              />
              {errorspoiPersonalInfo.firstName && (
                <FormHelperText error>
                  {errorspoiPersonalInfo.firstName.message}
                </FormHelperText>
              )}

              <CssFormControl
                margin="normal"
                fullWidth
                sx={{
                  "& .MuiSelect-select.Mui-disabled:hover": {
                    cursor: "not-allowed",
                  },
                }}
              >
                <InputLabel id="demo-simple-select-label">
                  Select Nationality
                </InputLabel>
                <Select
                  disabled
                  {...registerpoiPersonalInfo("nationality", {
                    required: "Nationality is required",
                  })}
                  value={listedDatav.nationality ? listedDatav.nationality : ""}
                  onChange={handleInputChange}
                  name="nationality"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Nationality"
                  MenuProps={MenuProps}
                >
                  {nationalitiesItems}
                </Select>
                {errorspoiPersonalInfo.nationality && (
                  <FormHelperText error>
                    {errorspoiPersonalInfo.nationality.message}
                  </FormHelperText>
                )}
              </CssFormControl>

              <CssTextField
                disabled
                {...registerpoiPersonalInfo("placeOfIssuance", {
                  required: "Place of issuance is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Invalid Place of Issuance (letters only)",
                  },
                })}
                onChange={handleInputChange}
                value={
                  listedDatav.placeOfIssuance ? listedDatav.placeOfIssuance : ""
                }
                margin="normal"
                fullWidth
                id="Issuance"
                label="Place of Issuance"
                name="placeOfIssuance"
                inputProps={{
                  style: { cursor: isDisabled ? "not-allowed" : "auto" },
                }}
              />
              {errorspoiPersonalInfo.placeOfIssuance && (
                <FormHelperText error>
                  {errorspoiPersonalInfo.placeOfIssuance.message}
                </FormHelperText>
              )}

              <CssFormControl
                disabled
                components={["DatePicker"]}
                margin="normal"
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled:hover": {
                    cursor: "not-allowed",
                  },
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disabled
                    {...registerpoiPersonalInfo("dateOfExpiry", {
                      required: "Date Of Issue is required",
                    })}
                    // minDate={today}
                    views={["year", "month", "day"]}
                    value={
                      dayjs(listedDatav.dateOfExpiry, "MM-DD-YYYY")
                        ? dayjs(listedDatav.dateOfExpiry, "MM-DD-YYYY")
                        : ""
                    }
                    sx={{
                      "& .MuiFormLabel-root.Mui-disabled": {
                        color: "#00000061",
                      },
                    }}
                    onChange={changeDateValue}
                    name="dateOfExpiry"
                    label="Date of Expiry"
                    renderInput={(params) => <TextField {...params} />} // If you're using TextField
                  />
                  {errorspoiPersonalInfo.dateOfExpiry && (
                    <FormHelperText error>
                      {errorspoiPersonalInfo.dateOfExpiry.message}
                    </FormHelperText>
                  )}
                </LocalizationProvider>
              </CssFormControl>

              <CssFormControl
                margin="normal"
                fullWidth
                sx={{
                  "& .MuiSelect-select.Mui-disabled:hover": {
                    cursor: "not-allowed",
                  },
                }}
              >
                <InputLabel id="demo-simple-select-label">Purpose</InputLabel>
                <Select
                  disabled
                  {...registerpoiPersonalInfo("purposeOfUse", {
                    required: "Purpose of the use is required",
                  })}
                  onChange={handleInputChange}
                  name="purposeOfUse"
                  value={
                    listedDatav.purposeOfUse ? listedDatav.purposeOfUse : ""
                  }
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Purpose"
                  MenuProps={MenuProps}
                >
                  <MenuItem value={""} disabled>
                    Select Any
                  </MenuItem>
                  <MenuItem value="Personal">Personal</MenuItem>
                  <MenuItem value="Commercial">Commercial</MenuItem>
                </Select>
                {errorspoiPersonalInfo.purposeOfUse && (
                  <FormHelperText error>
                    {errorspoiPersonalInfo.purposeOfUse.message}
                  </FormHelperText>
                )}
              </CssFormControl>

              <Grid container direction="row" rowSpacing={2} spacing={2}>
                <Grid item xs={12} sm={6} md={5} lg={4} xl={4}>
                  <CssTextField
                    disabled
                    value={listedDatav.pincode ? listedDatav.pincode : ""}
                    onChange={handleInputChange}
                    margin="normal"
                    fullWidth
                    id="pincode"
                    label="Country Code"
                    name="pincode"
                    inputProps={{
                      style: { cursor: isDisabled ? "not-allowed" : "auto" },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={7} lg={8} xl={8}>
                  <CssTextField
                    disabled
                    value={listedDatav.mobileNo ? listedDatav.mobileNo : ""}
                    onChange={handleInputChange}
                    margin="normal"
                    fullWidth
                    id="phonenumber"
                    label="Phone Number"
                    name="mobileNo"
                    inputProps={{
                      style: { cursor: isDisabled ? "not-allowed" : "auto" },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {stcachdata.role_name === "owners" ? (
                <>
                  <Button
                    sx={{ display: "block", color: "#6DCCDD", float: "right" }}
                    type="submit"
                    variant="contained"
                    size="medium"
                  >
                    Submit
                  </Button>

                  <Button
                    sx={{ display: "none", color: "#6DCCDD", float: "right" }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Chip
                  icon={<ReportProblemOutlinedIcon color="error" />}
                  label="Proof of ID verification is in progress."
                  onDelete={handleDelete}
                  deleteIcon={
                    <CloseOutlinedIcon sx={{ marginLeft: "auto !important" }} />
                  }
                  className={styles.myProfileNicAlert}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      )}
      {/* End My Profile Design Here */}
      {/* Start My Profile Skeleton Design Here */}
      {!hideSkeletonTbl && (
        <Box>
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
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
      )}
      {/* End My Profile Skeleton Design Here */}
    </>
  );
}

export default AccountProfile;
