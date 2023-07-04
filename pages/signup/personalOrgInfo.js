
// ** React Imports
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';

// ** Next Import

// ** MUI Components
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tab from '@mui/material/Tab';
import Modal from '@mui/material/Modal';
import { MuiFileInput } from 'mui-file-input';

// ** Accordion Imports
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

// ** Date Pickers Imports
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// ** Icons Imports
import InfoIcon from '@mui/icons-material/Info';
import BlurCircularOutlinedIcon from '@mui/icons-material/BlurCircularOutlined';
import DetailsOutlinedIcon from '@mui/icons-material/DetailsOutlined';
import FilterCenterFocusOutlinedIcon from '@mui/icons-material/FilterCenterFocusOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Close } from '@mui/icons-material';

// ** Custom Style Imports
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import istyles from './index.module.css';

import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext  from '@mui/lab/TabContext';


import { Controller, useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormHelperText } from '@mui/material';

import axios from 'axios';
import devStyles from './developer.module.css';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const styles = {
  ...istyles,
  ...devStyles,
};




// TextField Custom Style
const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#015578',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    "& fieldset": {
      borderRadius: "7px"
    },
    '&:hover fieldset': {
      border:"2px solid",
      borderColor: '#6DCCDD',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#015578',
    },
  },
});

// FormControl Custom Style
const CssFormControl = styled(FormControl)({
  '& label.Mui-focused': {
    color: '#015578',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    "& fieldset": {
      borderRadius: "7px"
    },
    '&:hover fieldset': {
      border:"2px solid",
      borderColor: '#6DCCDD',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#015578',
    },
  },
});

// Modal Style 
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  bgcolor: '#fafafa',
  border: '0px solid #000',
  borderRadius: '7px',
  boxShadow: 24,
  p: 4,
};



// ** Select Field Styles
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Accordion Style
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor: '#fff',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
  }));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    backgroundColor: '#fafafa',
  }));

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
const PersonalOrgInfoSubmit = ({ cachedInfo,onallowcommonLegalStatus,onSubmit,allowPOIcsbt, onallowPOIcsbtChange,commonLegalStatus }) => {
  
  const [updateCaseorNot, setupdateCaseorNot] = useState(false);
  useEffect(() => {
    
    const cachData = cachedInfo;

    if(cachData){
      //setValuePj('organizationInfo')
      //setlabelFile(true);
      if(cachData.account_type == "legal"){
        setshowOrganizationInfo(true);
      }
        getPoifoValid(cachData)
      const steppeNum = (Number(cachData.completed_stepper) - 1);
      
      if(Number(cachData.completed_stepper) > 3){
        setupdateCaseorNot(true);
      }
      

    }
    
  
  }, [cachedInfo]);

  const getPoifoValid = async (cookieValue) => {
    
    

    const newData = {"account_type": cookieValue.account_type,"userSerialId": cookieValue.user_serial_id,"tenantId": cookieValue.tenant_id};
    const finalData = {data:newData,endPoint:"fetchpoiinfo"}
    try {
      const { data } = await axios.post('/api/signup', finalData); // call the new API route            
      
      if( data.status_code == "800"){  
        const cdata = JSON.parse(data.data);  
        
        if(cdata.profile){
          plotPoiprofile(cdata.profile);
        }
        if(cdata.billing){
          plotPoibilling(cdata.billing);
        }

        if(cookieValue.account_type == "legal"){
          if(cdata.organization){
            plotPoiorg(cdata.organization);
          }
        }
      }else {        
        toast.error('Error: '+data.status_code+' ' + data.status_msg);
      }
    } catch (error) {      
      toast.error('An error occurred');
    }

    
  };

  const plotPoiprofile = (data) => {    
    resetpoiPersonalInfo();
    setpoiPIstate(data)    
  }

  const plotPoibilling = (data) => {    
    resetpoiBillingAddr();
    const cityExists = cities.some(city => city.value === data.city);

    if (!cityExists) {
      data.otherCity = data.city;
      data.city = "Others";
      setonOtherCity(true);
    } 
    
    setpoiBIstate(data);
  }

  const [labelFile, setlabelFile] = useState(false);
  const plotPoiorg = (data) => {
    
    if(data.crFilaName != ""){
      setlabelFile(true);
    }

    const industryExists = optionsCrType.some(industry => industry.value === data.companyType);

    if (!industryExists) {
      data.othersIndustry = data.companyType;
      data.companyType = "Others";
      setonOtherIndustry(true);
    } 
    

    setpoiOrgstate(data);
  }
  
  const removeDefaultFile = () => {
    setlabelFile(false);
    setpoiOrgstate((prev) => ({ ...prev, ['crFilaName']: '' }));
  }

    // Accordion Function
    const [expanded, setExpanded] = useState(false);
    const handleAccChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  
    // Modal Function
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // File Upload Function
  const [file, setFile] = useState(null)
  const handleFileChange = (newFile) => {
    setFile(newFile)
  }


  const [personalInfoDisabled,setpersonalInfoDisabled] = useState(false);
    const [billingAddrDisabled,setbillingAddrDisabled] = useState(true);
    const [organizationInfoDisabled,setorganizationInfoDisabled] = useState(true);
    function backToPersonalInfo(){
      setpersonalInfoDisabled(false);
      setorganizationInfoDisabled(true);
      setbillingAddrDisabled(true);

      
      setValuePj('personalInfo')
    }
    function backToBillingAddr(){
      setpersonalInfoDisabled(true);
      setorganizationInfoDisabled(true);
      setbillingAddrDisabled(false);

      
      setValuePj('billingAddr')
    }

    
// Tab Function
const [value, setValuePj] = useState('personalInfo');
const handleChange = (event, newValue) => {
  setValuePj(newValue);
};
     // Select Function
  const [age, setAge] = useState('');
  const handleChangeSelect = (event) => {
    setAge(event.target.value);
  };
    const formpoiPersonalInfoMethods = useForm();
    const { register: registerpoiPersonalInfo, handleSubmit: handleSubmitpoiPersonalInfo, formState: { errors: errorspoiPersonalInfo }, reset: resetpoiPersonalInfo, control: controlpoiPersonalInfo, setValue: setValuepoiPersonalInfo } = formpoiPersonalInfoMethods;
    const today = dayjs();
    
    const tomorrow = dayjs().add(1, 'day');
    const [poiPIstate, setpoiPIstate] = useState({
      familyName: '',
      firstName: '',
      middleName: '',
      nationality: '',
      idProof: '',

      idProofNo: '',
      placeOfIssuance: '',
      dateOfIssue: '',
      dateOfExpiry: '',

      purposeOfUse: '',
      dateOfBirth: ''

    });

    const changeDateValueDob = (evt) => {
      
      const formattedData = evt.format('MM-DD-YYYY');
      
      setpoiPIstate(prevState => ({
        ...prevState,
        ["dateOfBirth"]: formattedData
      }))
      setValuepoiPersonalInfo("dateOfBirth",formattedData)
    }

    const changeDateValueExpiry = (evt) => {
      
      const formattedData = evt.format('MM-DD-YYYY');
      
      setpoiPIstate(prevState => ({
        ...prevState,
        ["dateOfExpiry"]: formattedData
      }))
      setValuepoiPersonalInfo("dateOfExpiry",formattedData)
    }
    const [issueDateUn, setissueDateUn] = useState(dayjs(today));
    const changeDateValue = (evt) => {
      
      const formattedData = evt.format('MM-DD-YYYY');
      
      setpoiPIstate(prevState => ({
        ...prevState,
        ["dateOfIssue"]: formattedData
      }))
      
      setValuepoiPersonalInfo("dateOfIssue",formattedData)
      const unformattedDate = dayjs(formattedData, 'MM-DD-YYYY').subtract(1, 'day');
      setissueDateUn(unformattedDate);
    }

    const [idProofMin, setidProofMin] = useState(10);
    const [idProofMax, setidProofMax] = useState(10);
    const [idProofRegex, setidProofRegex] = useState(/^[\w.]+$/i);
    const handleInputChange = (evt) => {
     
      const { name, value } = evt.target || evt;
      console.log(name);
      console.log(value);
      if(name == 'idProof'){
        if(value == "Passport"){
          setidProofMin(5);
          setidProofRegex(/^[\w.]+$/)
          
        }else{
          setidProofMin(10);
          setidProofRegex(/^\d+$/)
        }
      }
      
      setpoiPIstate((prev) => ({ ...prev, [name]: value }));
    }
  
    const handleInputFocus = (evt) => {
      setpoiPIstate((prev) => ({ ...prev, focus: evt.target.name }));
    }


    

    const onpoiPersonalInfoSubmit = async (data) => {      

      // Check if all required key values in poiPIstate are filled
const requiredFields = ['familyName', 'firstName', 'nationality', 'idProof', 'idProofNo', 'placeOfIssuance', 'dateOfIssue', 'dateOfExpiry', 'purposeOfUse', 'dateOfBirth'];

const isPoiPIstateFilled = requiredFields.every(key => {
  if (key === 'middleName') {
    return true; // Skip validation for middleName field
  }
  return poiPIstate[key] !== '';
});

// Usage:
if (isPoiPIstateFilled) {
  
  // All required key values are filled
  setpersonalInfoDisabled(true);
  setbillingAddrDisabled(false);
  
  setValuePj('billingAddr')
} else {
  
  // Some required key values are not filled
}
    }


    const formpoiBillingAddrMethods = useForm();
    const { register: registerpoiBillingAddr, handleSubmit: handleSubmitpoiBillingAddr, formState: { errors: errorspoiBillingAddr }, reset: resetpoiBillingAddr, control: controlpoiBillingAddr, setValue: setValuepoiBillingAddr } = formpoiBillingAddrMethods;
    const [poiBIstate, setpoiBIstate] = useState({
      buildingNumber: '',
      street: '',
      zipCode: '',
      postBox: '',
      city: '',

      country: '',
      otherCity:''

    });
    const [onOtherCity, setonOtherCity] = useState(false);
    const handleInputChangeBillingAddr = (evt) => {
      
      
      const { name, value } = evt.target || evt;
      
      
      if(name == "city"){
        if(value == "Others"){
          setonOtherCity(true);
          setpoiBIstate((prev) => ({ ...prev, ['otherCity']: '' }));
          setpoiBIstate((prev) => ({ ...prev, [name]: value }));
        }else{
          setonOtherCity(false);
          setpoiBIstate((prev) => ({ ...prev, ['otherCity']: '' }));
          setpoiBIstate((prev) => ({ ...prev, [name]: value }));
        }
        
      }else{
        setpoiBIstate((prev) => ({ ...prev, [name]: value }));
      }

    }
  
    const handleInputFocusBillingAddr = (evt) => {
      setpoiBIstate((prev) => ({ ...prev, focus: evt.target.name }));
    }

    const onpoiBillingAddrSubmit = async (data) => {
      

      // Check if all required key values in poiBIstate are filled
const requiredFields = ['buildingNumber', 'street', 'zipCode', 'postBox', 'city', 'country'];

const ispoiBIstateFilled = requiredFields.every(key => {
  if (key === 'otherCity') {
    return true; // Skip validation for otherCity field
  }
  
  return poiBIstate[key] !== '';
});

if(poiBIstate.city == "Others"){
  poiBIstate.city = poiBIstate.otherCity;
}

// Usage:
if (ispoiBIstateFilled) {
  
  if(cachedInfo.account_type == "legal"){
     // All required key values are filled
  setpersonalInfoDisabled(true);
  setbillingAddrDisabled(true);
  setorganizationInfoDisabled(false);
  
  setValuePj('organizationInfo')

  }else{   
    finalSbtPOI()
    

  }
 
} else {
  
  // Some required key values are not filled
}

    }

const finalSbtPOI = () => {
  const cfinalData = {
    account_type:cachedInfo.account_type,
    userSerialId:cachedInfo.user_serial_id,
    tenantId:cachedInfo.tenant_id,
    profile:poiPIstate,
    billing:poiBIstate
  };
  
  if(cachedInfo.account_type == "legal"){
    
    cfinalData.organization = poiOrgstate;    
    delete cfinalData.organization.file_upload;
    cfinalData.organization = {
      ...poiOrgstate,
      othersIndustry: undefined // Remove the property from the organization object
    };
    //delete cfinalData.organization.othersIndustry;
    
    delete cfinalData.organization.focus;
    
    
    
  }
 

  cfinalData.billing = {
    ...poiBIstate,
    otherCity: undefined // Remove the property from the organization object
  };
  //delete cfinalData.billing.otherCity;
  delete cfinalData.profile.focus;
  
  delete cfinalData.billing.focus;
  

  if(updateCaseorNot){
    
   updatePoiFinalSbt(cfinalData);
    
  }else{
    console.log(cachedInfo);
    cfinalData.profile.userSerialId = cachedInfo.user_serial_id;
    console.log(cfinalData);
    if(cachedInfo.account_type == "legal"){
    cfinalData.organization.tenantId = cachedInfo.tenant_id;
    }
    addPoiFinalSbt(cfinalData);
    
  }
}    


const updatePoiFinalSbt = async (newData) => {
  

  
    const finalData = {data:newData,endPoint:"updatepoiinfo"}
    try {
      const { data } = await axios.post('/api/signup', finalData); // call the new API route            
      
      if( data.status_code == "800"){  
        const cdata = JSON.parse(data.data);  
        
        if(data.legalStatus){
          onallowcommonLegalStatus(true)
        }
        
        
        toast.success("Success");
        onSubmit();
      }else {        
        toast.error('Error: '+data.status_code+' ' + data.status_msg);
      }
    } catch (error) {      
      toast.error('An error occurred');
    }

    
}

const addPoiFinalSbt = async (newData) => {
  

  const finalData = {data:newData,endPoint:"addpoiinfo"}
    try {
      const { data } = await axios.post('/api/signup', finalData); // call the new API route            
      
      if( data.status_code == "800"){  
        const cdata = JSON.parse(data.data);  
        
        const cookies = Cookies.get('userData')  
        const cachData = (cookies? JSON.parse(cookies) : false);
        cachData.email_verify = true;
        cachData.legal_status = data.legalStatus;
        cachData.completed_stepper = 4;
        Cookies.set('userData', JSON.stringify(cachData)); 

        onallowcommonLegalStatus(data.legalStatus)
        
        toast.success("Success");
        onSubmit();
      }else {        
        toast.error('Error: '+data.status_code+' ' + data.status_msg);
      }
    } catch (error) {      
      toast.error('An error occurred');
    }
}



    const cities = [
      { value: 'Riyadh', label: 'Riyadh' },
      { value: 'Jeddah', label: 'Jeddah' },
      { value: 'Makkah', label: 'Makkah' },
      { value: 'Madinah', label: 'Madinah' },
      { value: 'Dammam', label: 'Dammam' },
      { value: 'Taif', label: 'Taif' },
      { value: 'Al-Kharj', label: 'Al-Kharj' },
      { value: 'Khobar', label: 'Khobar' },
      { value: 'Tabuk', label: 'Tabuk' },
      { value: 'Dhahran', label: 'Dhahran' },
      { value: 'Others', label: 'Others' },
    ];

    const nationalities = [
      {
      "name": "Afghanistan",
      "dial_code": "+93",
      "code": "AF"
      },
      {
      "name": "Aland Islands",
      "dial_code": "+358",
      "code": "AX"
      },
      {
      "name": "Albania",
      "dial_code": "+355",
      "code": "AL"
      },
      {
      "name": "Algeria",
      "dial_code": "+213",
      "code": "DZ"
      },
      {
      "name": "AmericanSamoa",
      "dial_code": "+1684",
      "code": "AS"
      },
      {
      "name": "Andorra",
      "dial_code": "+376",
      "code": "AD"
      },
      {
      "name": "Angola",
      "dial_code": "+244",
      "code": "AO"
      },
      {
      "name": "Anguilla",
      "dial_code": "+1264",
      "code": "AI"
      },
      {
      "name": "Antarctica",
      "dial_code": "+672",
      "code": "AQ"
      },
      {
      "name": "Antigua and Barbuda",
      "dial_code": "+1268",
      "code": "AG"
      },
      {
      "name": "Argentina",
      "dial_code": "+54",
      "code": "AR"
      },
      {
      "name": "Armenia",
      "dial_code": "+374",
      "code": "AM"
      },
      {
      "name": "Aruba",
      "dial_code": "+297",
      "code": "AW"
      },
      {
      "name": "Australia",
      "dial_code": "+61",
      "code": "AU"
      },
      {
      "name": "Austria",
      "dial_code": "+43",
      "code": "AT"
      },
      {
      "name": "Azerbaijan",
      "dial_code": "+994",
      "code": "AZ"
      },
      {
      "name": "Bahamas",
      "dial_code": "+1242",
      "code": "BS"
      },
      {
      "name": "Bahrain",
      "dial_code": "+973",
      "code": "BH"
      },
      {
      "name": "Bangladesh",
      "dial_code": "+880",
      "code": "BD"
      },
      {
      "name": "Barbados",
      "dial_code": "+1246",
      "code": "BB"
      },
      {
      "name": "Belarus",
      "dial_code": "+375",
      "code": "BY"
      },
      {
      "name": "Belgium",
      "dial_code": "+32",
      "code": "BE"
      },
      {
      "name": "Belize",
      "dial_code": "+501",
      "code": "BZ"
      },
      {
      "name": "Benin",
      "dial_code": "+229",
      "code": "BJ"
      },
      {
      "name": "Bermuda",
      "dial_code": "+1441",
      "code": "BM"
      },
      {
      "name": "Bhutan",
      "dial_code": "+975",
      "code": "BT"
      },
      {
      "name": "Bolivia, Plurinational State of",
      "dial_code": "+591",
      "code": "BO"
      },
      {
      "name": "Bosnia and Herzegovina",
      "dial_code": "+387",
      "code": "BA"
      },
      {
      "name": "Botswana",
      "dial_code": "+267",
      "code": "BW"
      },
      {
      "name": "Brazil",
      "dial_code": "+55",
      "code": "BR"
      },
      {
      "name": "British Indian Ocean Territory",
      "dial_code": "+246",
      "code": "IO"
      },
      {
      "name": "Brunei Darussalam",
      "dial_code": "+673",
      "code": "BN"
      },
      {
      "name": "Bulgaria",
      "dial_code": "+359",
      "code": "BG"
      },
      {
      "name": "Burkina Faso",
      "dial_code": "+226",
      "code": "BF"
      },
      {
      "name": "Burundi",
      "dial_code": "+257",
      "code": "BI"
      },
      {
      "name": "Cambodia",
      "dial_code": "+855",
      "code": "KH"
      },
      {
      "name": "Cameroon",
      "dial_code": "+237",
      "code": "CM"
      },
      {
      "name": "Canada",
      "dial_code": "+1",
      "code": "CA"
      },
      {
      "name": "Cape Verde",
      "dial_code": "+238",
      "code": "CV"
      },
      {
      "name": "Cayman Islands",
      "dial_code": "+ 345",
      "code": "KY"
      },
      {
      "name": "Central African Republic",
      "dial_code": "+236",
      "code": "CF"
      },
      {
      "name": "Chad",
      "dial_code": "+235",
      "code": "TD"
      },
      {
      "name": "Chile",
      "dial_code": "+56",
      "code": "CL"
      },
      {
      "name": "China",
      "dial_code": "+86",
      "code": "CN"
      },
      {
      "name": "Christmas Island",
      "dial_code": "+61",
      "code": "CX"
      },
      {
      "name": "Cocos (Keeling) Islands",
      "dial_code": "+61",
      "code": "CC"
      },
      {
      "name": "Colombia",
      "dial_code": "+57",
      "code": "CO"
      },
      {
      "name": "Comoros",
      "dial_code": "+269",
      "code": "KM"
      },
      {
      "name": "Congo",
      "dial_code": "+242",
      "code": "CG"
      },
      {
      "name": "Congo, The Democratic Republic of the Congo",
      "dial_code": "+243",
      "code": "CD"
      },
      {
      "name": "Cook Islands",
      "dial_code": "+682",
      "code": "CK"
      },
      {
      "name": "Costa Rica",
      "dial_code": "+506",
      "code": "CR"
      },
      {
      "name": "Cote d'Ivoire",
      "dial_code": "+225",
      "code": "CI"
      },
      {
      "name": "Croatia",
      "dial_code": "+385",
      "code": "HR"
      },
      {
      "name": "Cuba",
      "dial_code": "+53",
      "code": "CU"
      },
      {
      "name": "Cyprus",
      "dial_code": "+357",
      "code": "CY"
      },
      {
      "name": "Czech Republic",
      "dial_code": "+420",
      "code": "CZ"
      },
      {
      "name": "Denmark",
      "dial_code": "+45",
      "code": "DK"
      },
      {
      "name": "Djibouti",
      "dial_code": "+253",
      "code": "DJ"
      },
      {
      "name": "Dominica",
      "dial_code": "+1767",
      "code": "DM"
      },
      {
      "name": "Dominican Republic",
      "dial_code": "+1849",
      "code": "DO"
      },
      {
      "name": "Ecuador",
      "dial_code": "+593",
      "code": "EC"
      },
      {
      "name": "Egypt",
      "dial_code": "+20",
      "code": "EG"
      },
      {
      "name": "El Salvador",
      "dial_code": "+503",
      "code": "SV"
      },
      {
      "name": "Equatorial Guinea",
      "dial_code": "+240",
      "code": "GQ"
      },
      {
      "name": "Eritrea",
      "dial_code": "+291",
      "code": "ER"
      },
      {
      "name": "Estonia",
      "dial_code": "+372",
      "code": "EE"
      },
      {
      "name": "Ethiopia",
      "dial_code": "+251",
      "code": "ET"
      },
      {
      "name": "Falkland Islands (Malvinas)",
      "dial_code": "+500",
      "code": "FK"
      },
      {
      "name": "Faroe Islands",
      "dial_code": "+298",
      "code": "FO"
      },
      {
      "name": "Fiji",
      "dial_code": "+679",
      "code": "FJ"
      },
      {
      "name": "Finland",
      "dial_code": "+358",
      "code": "FI"
      },
      {
      "name": "France",
      "dial_code": "+33",
      "code": "FR"
      },
      {
      "name": "French Guiana",
      "dial_code": "+594",
      "code": "GF"
      },
      {
      "name": "French Polynesia",
      "dial_code": "+689",
      "code": "PF"
      },
      {
      "name": "Gabon",
      "dial_code": "+241",
      "code": "GA"
      },
      {
      "name": "Gambia",
      "dial_code": "+220",
      "code": "GM"
      },
      {
      "name": "Georgia",
      "dial_code": "+995",
      "code": "GE"
      },
      {
      "name": "Germany",
      "dial_code": "+49",
      "code": "DE"
      },
      {
      "name": "Ghana",
      "dial_code": "+233",
      "code": "GH"
      },
      {
      "name": "Gibraltar",
      "dial_code": "+350",
      "code": "GI"
      },
      {
      "name": "Greece",
      "dial_code": "+30",
      "code": "GR"
      },
      {
      "name": "Greenland",
      "dial_code": "+299",
      "code": "GL"
      },
      {
      "name": "Grenada",
      "dial_code": "+1473",
      "code": "GD"
      },
      {
      "name": "Guadeloupe",
      "dial_code": "+590",
      "code": "GP"
      },
      {
      "name": "Guam",
      "dial_code": "+1671",
      "code": "GU"
      },
      {
      "name": "Guatemala",
      "dial_code": "+502",
      "code": "GT"
      },
      {
      "name": "Guernsey",
      "dial_code": "+44",
      "code": "GG"
      },
      {
      "name": "Guinea",
      "dial_code": "+224",
      "code": "GN"
      },
      {
      "name": "Guinea-Bissau",
      "dial_code": "+245",
      "code": "GW"
      },
      {
      "name": "Guyana",
      "dial_code": "+595",
      "code": "GY"
      },
      {
      "name": "Haiti",
      "dial_code": "+509",
      "code": "HT"
      },
      {
      "name": "Holy See (Vatican City State)",
      "dial_code": "+379",
      "code": "VA"
      },
      {
      "name": "Honduras",
      "dial_code": "+504",
      "code": "HN"
      },
      {
      "name": "Hong Kong",
      "dial_code": "+852",
      "code": "HK"
      },
      {
      "name": "Hungary",
      "dial_code": "+36",
      "code": "HU"
      },
      {
      "name": "Iceland",
      "dial_code": "+354",
      "code": "IS"
      },
      {
      "name": "India",
      "dial_code": "+91",
      "code": "IN"
      },
      {
      "name": "Indonesia",
      "dial_code": "+62",
      "code": "ID"
      },
      {
      "name": "Iran, Islamic Republic of Persian Gulf",
      "dial_code": "+98",
      "code": "IR"
      },
      {
      "name": "Iraq",
      "dial_code": "+964",
      "code": "IQ"
      },
      {
      "name": "Ireland",
      "dial_code": "+353",
      "code": "IE"
      },
      {
      "name": "Isle of Man",
      "dial_code": "+44",
      "code": "IM"
      },
      {
      "name": "Israel",
      "dial_code": "+972",
      "code": "IL"
      },
      {
      "name": "Italy",
      "dial_code": "+39",
      "code": "IT"
      },
      {
      "name": "Jamaica",
      "dial_code": "+1876",
      "code": "JM"
      },
      {
      "name": "Japan",
      "dial_code": "+81",
      "code": "JP"
      },
      {
      "name": "Jersey",
      "dial_code": "+44",
      "code": "JE"
      },
      {
      "name": "Jordan",
      "dial_code": "+962",
      "code": "JO"
      },
      {
      "name": "Kazakhstan",
      "dial_code": "+77",
      "code": "KZ"
      },
      {
      "name": "Kenya",
      "dial_code": "+254",
      "code": "KE"
      },
      {
      "name": "Kiribati",
      "dial_code": "+686",
      "code": "KI"
      },
      {
      "name": "Korea, Democratic People's Republic of Korea",
      "dial_code": "+850",
      "code": "KP"
      },
      {
      "name": "Korea, Republic of South Korea",
      "dial_code": "+82",
      "code": "KR"
      },
      {
      "name": "Kuwait",
      "dial_code": "+965",
      "code": "KW"
      },
      {
      "name": "Kyrgyzstan",
      "dial_code": "+996",
      "code": "KG"
      },
      {
      "name": "Laos",
      "dial_code": "+856",
      "code": "LA"
      },
      {
      "name": "Latvia",
      "dial_code": "+371",
      "code": "LV"
      },
      {
      "name": "Lebanon",
      "dial_code": "+961",
      "code": "LB"
      },
      {
      "name": "Lesotho",
      "dial_code": "+266",
      "code": "LS"
      },
      {
      "name": "Liberia",
      "dial_code": "+231",
      "code": "LR"
      },
      {
      "name": "Libyan Arab Jamahiriya",
      "dial_code": "+218",
      "code": "LY"
      },
      {
      "name": "Liechtenstein",
      "dial_code": "+423",
      "code": "LI"
      },
      {
      "name": "Lithuania",
      "dial_code": "+370",
      "code": "LT"
      },
      {
      "name": "Luxembourg",
      "dial_code": "+352",
      "code": "LU"
      },
      {
      "name": "Macao",
      "dial_code": "+853",
      "code": "MO"
      },
      {
      "name": "Macedonia",
      "dial_code": "+389",
      "code": "MK"
      },
      {
      "name": "Madagascar",
      "dial_code": "+261",
      "code": "MG"
      },
      {
      "name": "Malawi",
      "dial_code": "+265",
      "code": "MW"
      },
      {
      "name": "Malaysia",
      "dial_code": "+60",
      "code": "MY"
      },
      {
      "name": "Maldives",
      "dial_code": "+960",
      "code": "MV"
      },
      {
      "name": "Mali",
      "dial_code": "+223",
      "code": "ML"
      },
      {
      "name": "Malta",
      "dial_code": "+356",
      "code": "MT"
      },
      {
      "name": "Marshall Islands",
      "dial_code": "+692",
      "code": "MH"
      },
      {
      "name": "Martinique",
      "dial_code": "+596",
      "code": "MQ"
      },
      {
      "name": "Mauritania",
      "dial_code": "+222",
      "code": "MR"
      },
      {
      "name": "Mauritius",
      "dial_code": "+230",
      "code": "MU"
      },
      {
      "name": "Mayotte",
      "dial_code": "+262",
      "code": "YT"
      },
      {
      "name": "Mexico",
      "dial_code": "+52",
      "code": "MX"
      },
      {
      "name": "Micronesia, Federated States of Micronesia",
      "dial_code": "+691",
      "code": "FM"
      },
      {
      "name": "Moldova",
      "dial_code": "+373",
      "code": "MD"
      },
      {
      "name": "Monaco",
      "dial_code": "+377",
      "code": "MC"
      },
      {
      "name": "Mongolia",
      "dial_code": "+976",
      "code": "MN"
      },
      {
      "name": "Montenegro",
      "dial_code": "+382",
      "code": "ME"
      },
      {
      "name": "Montserrat",
      "dial_code": "+1664",
      "code": "MS"
      },
      {
      "name": "Morocco",
      "dial_code": "+212",
      "code": "MA"
      },
      {
      "name": "Mozambique",
      "dial_code": "+258",
      "code": "MZ"
      },
      {
      "name": "Myanmar",
      "dial_code": "+95",
      "code": "MM"
      },
      {
      "name": "Namibia",
      "dial_code": "+264",
      "code": "NA"
      },
      {
      "name": "Nauru",
      "dial_code": "+674",
      "code": "NR"
      },
      {
      "name": "Nepal",
      "dial_code": "+977",
      "code": "NP"
      },
      {
      "name": "Netherlands",
      "dial_code": "+31",
      "code": "NL"
      },
      {
      "name": "Netherlands Antilles",
      "dial_code": "+599",
      "code": "AN"
      },
      {
      "name": "New Caledonia",
      "dial_code": "+687",
      "code": "NC"
      },
      {
      "name": "New Zealand",
      "dial_code": "+64",
      "code": "NZ"
      },
      {
      "name": "Nicaragua",
      "dial_code": "+505",
      "code": "NI"
      },
      {
      "name": "Niger",
      "dial_code": "+227",
      "code": "NE"
      },
      {
      "name": "Nigeria",
      "dial_code": "+234",
      "code": "NG"
      },
      {
      "name": "Niue",
      "dial_code": "+683",
      "code": "NU"
      },
      {
      "name": "Norfolk Island",
      "dial_code": "+672",
      "code": "NF"
      },
      {
      "name": "Northern Mariana Islands",
      "dial_code": "+1670",
      "code": "MP"
      },
      {
      "name": "Norway",
      "dial_code": "+47",
      "code": "NO"
      },
      {
      "name": "Oman",
      "dial_code": "+968",
      "code": "OM"
      },
      {
      "name": "Pakistan",
      "dial_code": "+92",
      "code": "PK"
      },
      {
      "name": "Palau",
      "dial_code": "+680",
      "code": "PW"
      },
      {
      "name": "Palestinian Territory, Occupied",
      "dial_code": "+970",
      "code": "PS"
      },
      {
      "name": "Panama",
      "dial_code": "+507",
      "code": "PA"
      },
      {
      "name": "Papua New Guinea",
      "dial_code": "+675",
      "code": "PG"
      },
      {
      "name": "Paraguay",
      "dial_code": "+595",
      "code": "PY"
      },
      {
      "name": "Peru",
      "dial_code": "+51",
      "code": "PE"
      },
      {
      "name": "Philippines",
      "dial_code": "+63",
      "code": "PH"
      },
      {
      "name": "Pitcairn",
      "dial_code": "+872",
      "code": "PN"
      },
      {
      "name": "Poland",
      "dial_code": "+48",
      "code": "PL"
      },
      {
      "name": "Portugal",
      "dial_code": "+351",
      "code": "PT"
      },
      {
      "name": "Puerto Rico",
      "dial_code": "+1939",
      "code": "PR"
      },
      {
      "name": "Qatar",
      "dial_code": "+974",
      "code": "QA"
      },
      {
      "name": "Romania",
      "dial_code": "+40",
      "code": "RO"
      },
      {
      "name": "Russia",
      "dial_code": "+7",
      "code": "RU"
      },
      {
      "name": "Rwanda",
      "dial_code": "+250",
      "code": "RW"
      },
      {
      "name": "Reunion",
      "dial_code": "+262",
      "code": "RE"
      },
      {
      "name": "Saint Barthelemy",
      "dial_code": "+590",
      "code": "BL"
      },
      {
      "name": "Saint Helena, Ascension and Tristan Da Cunha",
      "dial_code": "+290",
      "code": "SH"
      },
      {
      "name": "Saint Kitts and Nevis",
      "dial_code": "+1869",
      "code": "KN"
      },
      {
      "name": "Saint Lucia",
      "dial_code": "+1758",
      "code": "LC"
      },
      {
      "name": "Saint Martin",
      "dial_code": "+590",
      "code": "MF"
      },
      {
      "name": "Saint Pierre and Miquelon",
      "dial_code": "+508",
      "code": "PM"
      },
      {
      "name": "Saint Vincent and the Grenadines",
      "dial_code": "+1784",
      "code": "VC"
      },
      {
      "name": "Samoa",
      "dial_code": "+685",
      "code": "WS"
      },
      {
      "name": "San Marino",
      "dial_code": "+378",
      "code": "SM"
      },
      {
      "name": "Sao Tome and Principe",
      "dial_code": "+239",
      "code": "ST"
      },
      {
      "name": "Saudi Arabia",
      "dial_code": "+966",
      "code": "SA"
      },
      {
      "name": "Senegal",
      "dial_code": "+221",
      "code": "SN"
      },
      {
      "name": "Serbia",
      "dial_code": "+381",
      "code": "RS"
      },
      {
      "name": "Seychelles",
      "dial_code": "+248",
      "code": "SC"
      },
      {
      "name": "Sierra Leone",
      "dial_code": "+232",
      "code": "SL"
      },
      {
      "name": "Singapore",
      "dial_code": "+65",
      "code": "SG"
      },
      {
      "name": "Slovakia",
      "dial_code": "+421",
      "code": "SK"
      },
      {
      "name": "Slovenia",
      "dial_code": "+386",
      "code": "SI"
      },
      {
      "name": "Solomon Islands",
      "dial_code": "+677",
      "code": "SB"
      },
      {
      "name": "Somalia",
      "dial_code": "+252",
      "code": "SO"
      },
      {
      "name": "South Africa",
      "dial_code": "+27",
      "code": "ZA"
      },
      {
      "name": "South Sudan",
      "dial_code": "+211",
      "code": "SS"
      },
      {
      "name": "South Georgia and the South Sandwich Islands",
      "dial_code": "+500",
      "code": "GS"
      },
      {
      "name": "Spain",
      "dial_code": "+34",
      "code": "ES"
      },
      {
      "name": "Sri Lanka",
      "dial_code": "+94",
      "code": "LK"
      },
      {
      "name": "Sudan",
      "dial_code": "+249",
      "code": "SD"
      },
      {
      "name": "Suriname",
      "dial_code": "+597",
      "code": "SR"
      },
      {
      "name": "Svalbard and Jan Mayen",
      "dial_code": "+47",
      "code": "SJ"
      },
      {
      "name": "Swaziland",
      "dial_code": "+268",
      "code": "SZ"
      },
      {
      "name": "Sweden",
      "dial_code": "+46",
      "code": "SE"
      },
      {
      "name": "Switzerland",
      "dial_code": "+41",
      "code": "CH"
      },
      {
      "name": "Syrian Arab Republic",
      "dial_code": "+963",
      "code": "SY"
      },
      {
      "name": "Taiwan",
      "dial_code": "+886",
      "code": "TW"
      },
      {
      "name": "Tajikistan",
      "dial_code": "+992",
      "code": "TJ"
      },
      {
      "name": "Tanzania, United Republic of Tanzania",
      "dial_code": "+255",
      "code": "TZ"
      },
      {
      "name": "Thailand",
      "dial_code": "+66",
      "code": "TH"
      },
      {
      "name": "Timor-Leste",
      "dial_code": "+670",
      "code": "TL"
      },
      {
      "name": "Togo",
      "dial_code": "+228",
      "code": "TG"
      },
      {
      "name": "Tokelau",
      "dial_code": "+690",
      "code": "TK"
      },
      {
      "name": "Tonga",
      "dial_code": "+676",
      "code": "TO"
      },
      {
      "name": "Trinidad and Tobago",
      "dial_code": "+1868",
      "code": "TT"
      },
      {
      "name": "Tunisia",
      "dial_code": "+216",
      "code": "TN"
      },
      {
      "name": "Turkey",
      "dial_code": "+90",
      "code": "TR"
      },
      {
      "name": "Turkmenistan",
      "dial_code": "+993",
      "code": "TM"
      },
      {
      "name": "Turks and Caicos Islands",
      "dial_code": "+1649",
      "code": "TC"
      },
      {
      "name": "Tuvalu",
      "dial_code": "+688",
      "code": "TV"
      },
      {
      "name": "Uganda",
      "dial_code": "+256",
      "code": "UG"
      },
      {
      "name": "Ukraine",
      "dial_code": "+380",
      "code": "UA"
      },
      {
      "name": "United Arab Emirates",
      "dial_code": "+971",
      "code": "AE"
      },
      {
      "name": "United Kingdom",
      "dial_code": "+44",
      "code": "GB"
      },
      {
      "name": "United States",
      "dial_code": "+1",
      "code": "US"
      },
      {
      "name": "Uruguay",
      "dial_code": "+598",
      "code": "UY"
      },
      {
      "name": "Uzbekistan",
      "dial_code": "+998",
      "code": "UZ"
      },
      {
      "name": "Vanuatu",
      "dial_code": "+678",
      "code": "VU"
      },
      {
      "name": "Venezuela, Bolivarian Republic of Venezuela",
      "dial_code": "+58",
      "code": "VE"
      },
      {
      "name": "Vietnam",
      "dial_code": "+84",
      "code": "VN"
      },
      {
      "name": "Virgin Islands, British",
      "dial_code": "+1284",
      "code": "VG"
      },
      {
      "name": "Virgin Islands, U.S.",
      "dial_code": "+1340",
      "code": "VI"
      },
      {
      "name": "Wallis and Futuna",
      "dial_code": "+681",
      "code": "WF"
      },
      {
      "name": "Yemen",
      "dial_code": "+967",
      "code": "YE"
      },
      {
      "name": "Zambia",
      "dial_code": "+260",
      "code": "ZM"
      },
      {
      "name": "Zimbabwe",
      "dial_code": "+263",
      "code": "ZW"
      }
      ];

      const nationalitiesItems = nationalities.map((ival) => (
        <MenuItem value={ival.code} key={ival.code}>
          {ival.name}
        </MenuItem>
      ));
   
    const [showOrganizationInfo, setshowOrganizationInfo] = useState(false);



    const formpoiOrgInfoMethods = useForm();
    const { register: registerpoiOrgInfo, handleSubmit: handleSubmitpoiOrgInfo, formState: { errors: errorspoiOrgInfo }, reset: resetpoiOrgInfo, control: controlpoiOrgInfo, setValue: setValuepoiOrgInfo } = formpoiOrgInfoMethods;


    const [poiOrgstate, setpoiOrgstate] = useState({
      companyName: '',
      crNo: '',
      issueDate: '',
      expiryDate: '',
      file_upload: null,

      crFilaName: '',
      dataClassification:'',
      purposeOfUse:'',
      companyType:'',
      othersIndustry:''

    });

    const changeDateValueIssueDate = (evt) => {
      
      const formattedData = evt.format('MM-DD-YYYY');
      
      setpoiOrgstate(prevState => ({
        ...prevState,
        ["issueDate"]: formattedData
      }))
      setValuepoiOrgInfo("issueDate",formattedData)

    }


    const changeDateValueExpirydate = (evt) => {
      
      const formattedData = evt.format('MM-DD-YYYY');
      
      setpoiOrgstate(prevState => ({
        ...prevState,
        ["expiryDate"]: formattedData
      }))
      setValuepoiOrgInfo("expiryDate",formattedData)

    }

    

    const handleInputChangepoiOrgInfoFileUp = async (newVariable) => {
      

      //const file = newVariable.target.files[0];
     
      if (!newVariable) return;
      const file = newVariable;
      
      setpoiOrgstate((prev) => ({ ...prev, ['file_upload']: newVariable }));
      const formData = new FormData();
  formData.append('file', file);

  // Retrieve the file name
const fileName = formData.get('file').name;


  const ownAPIBaseURL = process.env.OWN_API_BASE_URL;

  const ownAPIDefaultURL = process.env.OWN_API_DEFAULT_URL;
  
  try {
    const { data } = await axios.post(ownAPIBaseURL+ownAPIDefaultURL+'files/uploadcrfile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }); // call the new API route            
    
    if( data.status == "ok"){  
      
      toast.success('File uploaded successfully!');
      
      setpoiOrgstate((prev) => ({ ...prev, ['crFilaName']: fileName }));
    }else {        
      toast.error('Error: '+data.status_code+' ' + data.status_msg);
    }
  } catch (error) {      
    toast.error('An error occurred');
  }



    }

    const [onOtherIndustry, setonOtherIndustry] = useState(false);
    const handleInputChangepoiOrgInfo = (evt) => {
      
      
      const { name, value } = evt.target || evt;
      
      

      if(name == "companyType"){
        if(value == "Others"){
          setonOtherIndustry(true);
          setpoiOrgstate((prev) => ({ ...prev, ['othersIndustry']: '' }));
          setpoiOrgstate((prev) => ({ ...prev, [name]: value }));
        }else{
          setonOtherIndustry(false);
          setpoiOrgstate((prev) => ({ ...prev, ['othersIndustry']: '' }));
          setpoiOrgstate((prev) => ({ ...prev, [name]: value }));
        }
        
      }else{
        setpoiOrgstate((prev) => ({ ...prev, [name]: value }));
      }
      

    }
  
    const handleInputFocuspoiOrgInfo = (evt) => {
      setpoiOrgstate((prev) => ({ ...prev, focus: evt.target.name }));
    }

    

    const onpoiOrgInfoSubmit = async (data) => {
      

        // Check if all required key values in poiBIstate are filled
const requiredFields = ['companyName', 'crNo', 'issueDate', 'expiryDate', 'crFilaName','dataClassification', 'purposeOfUse', 'companyType'];

const ispoiOrgstateFilled = requiredFields.every(key => {
  if ((key === 'file_upload') || (key === 'othersIndustry')) {
    return true; // Skip validation for otherCity field
  }
  
  return poiOrgstate[key] !== '';
});

if(poiOrgstate.companyType == "Others"){
  poiOrgstate.companyType = poiOrgstate.othersIndustry;
}

// Usage:
if (ispoiOrgstateFilled) {
  
     
  finalSbtPOI()
 
} else {
  
  // Some required key values are not filled
}

    }




    const optionsCrType = [
      { value: 'Consumer & Industrial Products', label: 'Consumer & Industrial Products' },
      { value: 'Energy & Resources', label: 'Energy & Resources' },
      { value: 'Financial Services', label: 'Financial Services' },
      { value: 'Life Sciences & Health Care', label: 'Life Sciences & Health Care' },
      { value: 'Public Sector', label: 'Public Sector' },
      { value: 'Technology, Media & Telecommunications', label: 'Technology, Media & Telecommunications' },
      { value: 'Others', label: 'Others' },
    ];
    // Render options
    const renderedOptionsCrType = optionsCrType.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));

    
    return (
      <>
      <Box sx={{ width: '100%' }}>
        <TabContext value={value}>

        <TabList  onChange={handleChange} aria-label="Personal / Org Information Tabs" TabIndicatorProps={{style: {
              backgroundColor: "#6DCCDD"} }} sx={{"& .MuiTab-root.Mui-selected": {color: '#000'}, borderBottom: 1, borderColor: 'divider' }}>

            
              <Tab disabled={personalInfoDisabled && true} sx={{color:'#000'}} label="PERSONAL INFO" value='personalInfo' {...a11yProps(0)}  />
              <Tab disabled={billingAddrDisabled && true} sx={{color:'#000'}} label="BILLING ADDRESS" value='billingAddr' {...a11yProps(1)} />
              {
                showOrganizationInfo && <Tab disabled={organizationInfoDisabled && true} sx={{color:'#000'}} label="ORGANIZATION INFO" value='organizationInfo' {...a11yProps(2)} />

              }
              
            </TabList>
            

          
          <TabPanel value='personalInfo' index={0} >
          
<Box onSubmit={handleSubmitpoiPersonalInfo(onpoiPersonalInfoSubmit)} id="poipersonalinfosubmitform" component="form" autoComplete='off' sx={{ mt: 1 }}>
              <Grid container direction="row" rowSpacing={1} spacing={5}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssTextField {...registerpoiPersonalInfo('familyName', {
                          required: 'Family Name is required'
                        })}  margin="normal" fullWidth autoFocus id="family" label="Family Name" name="familyName" value={poiPIstate.familyName} onChange= 
                         {handleInputChange} onFocus={handleInputFocus} />
                         {errorspoiPersonalInfo.familyName && (
                      <FormHelperText error>
                        {errorspoiPersonalInfo.familyName.message}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssTextField 
                  {...registerpoiPersonalInfo('firstName', {
                    required: 'First Name is required'
                  })}
                  margin="normal" fullWidth id="first" label="First Name" name="firstName" value={poiPIstate.firstName} onChange= 
                         {handleInputChange} onFocus={handleInputFocus} />
                         {errorspoiPersonalInfo.firstName && (
                      <FormHelperText error>
                        {errorspoiPersonalInfo.firstName.message}
                      </FormHelperText>
                    )}

                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssTextField 
                  {...registerpoiPersonalInfo('middleName')}
                  margin="normal" fullWidth id="middle" label="Middle Name" name="middleName" 
                  value={poiPIstate.middleName} onChange= 
                         {handleInputChange} onFocus={handleInputFocus} />
                         {errorspoiPersonalInfo.middleName && (
                      <FormHelperText error>
                        {errorspoiPersonalInfo.middleName.message}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssFormControl margin="normal" fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Nationality</InputLabel>
                    <Select 
                    {...registerpoiPersonalInfo('nationality', {
                      required: 'Nationality is required'
                    })}
                    placeholder='Select Nationality'

                    labelId="demo-simple-select-label" id="demo-simple-select" label="Select Nationality" 
                    name="nationality" value={poiPIstate.nationality}
                     onChange= {handleInputChange} onFocus={handleInputFocus} 
                    MenuProps={MenuProps} >
                      {
                       nationalitiesItems
                      }
                           



                    </Select>
                    {errorspoiPersonalInfo.nationality && (
                      <FormHelperText error>
                        {errorspoiPersonalInfo.nationality.message}
                      </FormHelperText>
                    )}
                  </CssFormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Grid container direction="row" rowSpacing={0} spacing={{xs: 2, sm:5, md: 2, lg:2, xl:2}} >
                    <Grid item xs={12} sm={6} md={5} lg={5} xl={5}>
                      <CssFormControl margin="normal" fullWidth>
                        <InputLabel id="demo-simple-select-label">Proof of ID</InputLabel>
                        <Select 
                        {...registerpoiPersonalInfo('idProof', {
                          required: 'ID Proof is required'
                        })}
                        
                        placeholder='Select Proof'
                        labelId="demo-simple-select-label" id="demo-simple-select" label="Proof of ID" 
                        name="idProof"
                        value={poiPIstate.idProof}
                     onChange= {handleInputChange} onFocus={handleInputFocus} 
                        MenuProps={MenuProps} >
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
                    <Grid item xs={12} sm={6} md={7} lg={7} xl={7}>
                      <CssTextField 
                      {...registerpoiPersonalInfo('idProofNo', {
                        required: 'ID Number is required',
                        pattern: {
                          value: idProofRegex,
                          message: 'Invalid ID Proof',
                        },
                        minLength: {
                          value: idProofMin, // Set the minimum length
                          message: 'ID Proof Number should be at least '+idProofMin+' characters',
                        },
                        maxLength: {
                          value: idProofMax, // Set the maximum length
                          message: 'ID Proof Number should not exceed '+idProofMax+' characters',
                        },

                      })}

                      value={poiPIstate.idProofNo}
                     onChange= {handleInputChange} onFocus={handleInputFocus} 

                      margin="normal" fullWidth id="idProofNo" label="ID Number" 

                      

                      name="idProofNo" />
                       {errorspoiPersonalInfo.idProofNo && (
                      <FormHelperText error>
                        {errorspoiPersonalInfo.idProofNo.message}
                      </FormHelperText>
                    )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssTextField
                  {...registerpoiPersonalInfo('placeOfIssuance', {
                    required: 'Place of issuance is required',
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: 'Invalid Place of Issuance (letters only)',
                    },
                  })}

                  value={poiPIstate.placeOfIssuance}
                 onChange= {handleInputChange} onFocus={handleInputFocus} 

                   margin="normal" fullWidth id="issuance" label="Place of Issuance" name="placeOfIssuance" />
                   {errorspoiPersonalInfo.placeOfIssuance && (
                      <FormHelperText error>
                        {errorspoiPersonalInfo.placeOfIssuance.message}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssFormControl components={['DatePicker']} margin="normal" fullWidth  variant="outlined">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      
                      <DatePicker 
                      {...registerpoiPersonalInfo('dateOfIssue', {
                        required: 'Date Of Issue is required'
                      })}
                      maxDate={today}
                      views={['year', 'month', 'day']}

                      
                      value={dayjs(poiPIstate.dateOfIssue, 'MM-DD-YYYY')}
                      onChange={changeDateValue}
                      
                      name="dateOfIssue"
                      label="Date of issue" 
                      renderInput={(params) => <TextField {...params} />} // If you're using TextField

                      

                       />
                       {errorspoiPersonalInfo.dateOfIssue && (
                      <FormHelperText error>
                        {errorspoiPersonalInfo.dateOfIssue.message}
                      </FormHelperText>
                    )}
                    </LocalizationProvider>
                  </CssFormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssFormControl components={['DatePicker']} margin="normal" fullWidth  variant="outlined">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                      {...registerpoiPersonalInfo('dateOfExpiry', {
                        required: 'Date Of Expiry is required'
                      })}
                      minDate={today}
                      views={['year', 'month', 'day']}
                      value={dayjs(poiPIstate.dateOfExpiry, 'MM-DD-YYYY')}
                      
                      onChange={changeDateValueExpiry}
                      
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
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssFormControl components={['DatePicker']} margin="normal" fullWidth  variant="outlined">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                      {...registerpoiPersonalInfo('dateOfBirth', {
                        required: 'Date Of Birth is required'
                      })}
                      value={dayjs(poiPIstate.dateOfBirth, 'MM-DD-YYYY')}
                      
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
                </Grid>


                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <CssFormControl margin="normal" fullWidth>
                        <InputLabel id="demo-simple-select-label">Purpose of the use</InputLabel>
                        <Select 
                        {...registerpoiPersonalInfo('purposeOfUse', {
                          required: 'Purpose of the use is required'
                        })}
                        
                        placeholder='Select Proof'
                        labelId="demo-simple-select-purposeOfUse-label" id="demo-simple-select-purposeOfUse" label="Purpose of the use" 
                        name="purposeOfUse"
                        value={poiPIstate.purposeOfUse}
                     onChange= {handleInputChange} onFocus={handleInputFocus} 
                        MenuProps={MenuProps} >
                          
                          <MenuItem value="Personal">Personal</MenuItem>
                          <MenuItem value="Commercial">Commercial</MenuItem>
                        </Select>
                        {errorspoiPersonalInfo.purposeOfUse && (
                      <FormHelperText error>
                        {errorspoiPersonalInfo.purposeOfUse.message}
                      </FormHelperText>
                    )}
                      </CssFormControl>
                    </Grid>


              </Grid>

              {
          !allowPOIcsbt && 

          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', mt:3, }}>
          <div className={styles.stepperBtn} ></div>
            <Button size='large' variant='contained' className={styles.stepperBtn}  type='submit' >Next</Button>
          </Grid>
        }
            </Box>

            
          </TabPanel>
          <TabPanel value='billingAddr' index={1}  >
            <Box onSubmit={handleSubmitpoiBillingAddr(onpoiBillingAddrSubmit)} id="poibillingaddrsubmit_form" component="form" autoComplete='off' sx={{ mt: 1 }}>
              <Grid container direction="row" rowSpacing={1} spacing={5}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssTextField margin="normal" fullWidth autoFocus id="building" label="Building Number"
                   name="buildingNumber" 

                   {...registerpoiBillingAddr('buildingNumber', {
                    required: 'Building Number is required'
                  })}  
                   value={poiBIstate.buildingNumber} onChange= 
                   {handleInputChangeBillingAddr} onFocus={handleInputFocusBillingAddr}

                  
                  />

                    {errorspoiBillingAddr.buildingNumber && (
                      <FormHelperText error>
                        {errorspoiBillingAddr.buildingNumber.message}
                      </FormHelperText>
                    )}

                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssTextField margin="normal" fullWidth id="street" label="Street / Road" 

                   name="street" 

                   {...registerpoiBillingAddr('street', {
                    required: 'Street is required'
                  })}  
                   value={poiBIstate.street} onChange= 
                   {handleInputChangeBillingAddr} onFocus={handleInputFocusBillingAddr}
                  />
                   {errorspoiBillingAddr.street && (
                      <FormHelperText error>
                        {errorspoiBillingAddr.street.message}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssTextField margin="normal" fullWidth id="postal" label="Postal / Zip Code" 
                  name="zipCode" 
                  type="number"
                  {...registerpoiBillingAddr('zipCode', {
                   required: 'zipCode is required',
                   minLength: {
                    value: 3, // Set the minimum length
                    message: 'Zip code should be at least 3 digits',
                  },
                  maxLength: {
                    value: 5, // Set the maximum length
                    message: 'Zip code should not exceed 5 digits',
                  },
                 })}  
                  value={poiBIstate.zipCode} onChange= 
                  {handleInputChangeBillingAddr} onFocus={handleInputFocusBillingAddr}
                 />
                  {errorspoiBillingAddr.zipCode && (
                     <FormHelperText error>
                       {errorspoiBillingAddr.zipCode.message}
                     </FormHelperText>
                   )}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssTextField margin="normal" fullWidth id="postbox" label="P.O.Box" 
                   name="postBox" 
                   type="number"
                   {...registerpoiBillingAddr('postBox', {
                    required: 'postBox is required',
                    minLength: {
                      value: 3, // Set the minimum length
                      message: 'Postbox Number should be at least 3 digits',
                    },
                    maxLength: {
                      value: 5, // Set the maximum length
                      message: 'Postbox Number should not exceed 5 digits',
                    },
                  })}  
                   value={poiBIstate.postBox} onChange= 
                   {handleInputChangeBillingAddr} onFocus={handleInputFocusBillingAddr}
                  />
                   {errorspoiBillingAddr.postBox && (
                      <FormHelperText error>
                        {errorspoiBillingAddr.postBox.message}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={onOtherCity ?3:6} md={onOtherCity ?3:6} lg={onOtherCity ?3:6} xl={onOtherCity ?3:6}>
                  <CssFormControl margin="normal" fullWidth>
                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="City"  MenuProps={MenuProps}
                    name="city" 

                    {...registerpoiBillingAddr('city', {
                     required: 'city is required'
                   })}  
                    value={poiBIstate.city} onChange= 
                    {handleInputChangeBillingAddr} onFocus={handleInputFocusBillingAddr}
                    >
                       {cities.map((city, index) => (
                          <MenuItem key={index} value={city.value}>{city.label}</MenuItem>
                        ))}
                    </Select>
                    {errorspoiBillingAddr.city && (
                      <FormHelperText error>
                        {errorspoiBillingAddr.city.message}
                      </FormHelperText>
                    )}
                  </CssFormControl>
                </Grid>
                      {
                        onOtherCity && 
                        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                  <CssTextField margin="normal" fullWidth id="postbox" label="Other City" 
                   name="otherCity" 

                   {...registerpoiBillingAddr('otherCity', {
                    required: 'otherCity is required'
                  })}  
                   value={poiBIstate.otherCity} onChange= 
                   {handleInputChangeBillingAddr} onFocus={handleInputFocusBillingAddr}
                  />
                   {errorspoiBillingAddr.otherCity && (
                      <FormHelperText error>
                        {errorspoiBillingAddr.otherCity.message}
                      </FormHelperText>
                    )}
                </Grid>
                      }

                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssFormControl margin="normal" fullWidth>
                    <InputLabel id="demo-simple-select-label">Country</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Country"  MenuProps={MenuProps}
                    name="country" 

                    {...registerpoiBillingAddr('country', {
                     required: 'country is required'
                   })}  
                    value={poiBIstate.country} onChange= 
                    {handleInputChangeBillingAddr} onFocus={handleInputFocusBillingAddr}
                    >
                      <MenuItem value="Saudi Arabia (KSA)">Saudi Arabia (KSA)</MenuItem>
                    </Select>
                    {errorspoiBillingAddr.country && (
                      <FormHelperText error>
                        {errorspoiBillingAddr.country.message}
                      </FormHelperText>
                    )}
                  </CssFormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} hidden>
                  <CssTextField margin="normal" fullWidth id="othercity" label="Others City" name="othercity" />
                </Grid>
              </Grid>

              {
          !allowPOIcsbt && 

          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', mt:3, }}>
          <Button onClick={backToPersonalInfo} type='button' size='large' variant='contained' className={styles.stepperBtn} >Back</Button>
            <Button size='large' variant='contained' className={styles.stepperBtn}  type='submit' >Next</Button>
          </Grid>
        }
        
            </Box>
          </TabPanel>
          <TabPanel value='organizationInfo' index={2} >
            <Box onSubmit={handleSubmitpoiOrgInfo(onpoiOrgInfoSubmit)} id="poiorginfosubmit_form" component="form" autoComplete='off' sx={{ mt: 1 }}>
              <Grid container direction="row" rowSpacing={1} spacing={5}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssTextField margin="normal" fullWidth autoFocus id="company" label="Company Name" 
                  name="companyName"
                     

                     {...registerpoiOrgInfo('companyName', {
                      required: 'Company name is required'
                    })}  
                     value={poiOrgstate.companyName} onChange= 
                     {handleInputChangepoiOrgInfo} onFocus={handleInputFocuspoiOrgInfo}
                  
                  />

                    {errorspoiOrgInfo.companyName && (
                      <FormHelperText error>
                        {errorspoiOrgInfo.companyName.message}
                      </FormHelperText>
                    )}

                </Grid>
                <Grid item xs={12} sm={onOtherIndustry?3:6} md={onOtherIndustry?3:6} lg={onOtherIndustry?3:6} xl={onOtherIndustry?3:6}>
                  <CssFormControl margin="normal" fullWidth>
                    <InputLabel id="demo-simple-select-label">Industry</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Industry" 
                     MenuProps={MenuProps}
                     name="companyType"
                     

                     {...registerpoiOrgInfo('companyType', {
                      required: 'Company type is required'
                    })}  
                     value={poiOrgstate.companyType} onChange= 
                     {handleInputChangepoiOrgInfo} onFocus={handleInputFocuspoiOrgInfo}


                     >
                      {renderedOptionsCrType}
                    </Select>

                    {errorspoiOrgInfo.companyType && (
                      <FormHelperText error>
                        {errorspoiOrgInfo.companyType.message}
                      </FormHelperText>
                    )}

                  </CssFormControl>
                </Grid>

                {
                  onOtherIndustry && 
                  <Grid item xs={12} sm={3} md={3} lg={3} xl={3} >
                  <CssTextField margin="normal" fullWidth id="otherindustry" label="Others Industry" 

                    name="othersIndustry"
                    {...registerpoiOrgInfo('othersIndustry', {
                      required: 'Industry is required'
                    })}  
                    value={poiOrgstate.othersIndustry} onChange= 
                    {handleInputChangepoiOrgInfo} onFocus={handleInputFocuspoiOrgInfo}
                  
                  />
                 {errorspoiOrgInfo.othersIndustry && (
                      <FormHelperText error>
                        {errorspoiOrgInfo.othersIndustry.message}
                      </FormHelperText>
                    )}

                </Grid>
                }
               
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssTextField margin="normal" fullWidth id="commercial" label="Commercial Registration (CR)" 
                  
                  name="crNo"
                  {...registerpoiOrgInfo('crNo', {
                    required: 'Company Register Number is required'
                  })}  
                  value={poiOrgstate.crNo} onChange= 
                  {handleInputChangepoiOrgInfo} onFocus={handleInputFocuspoiOrgInfo}
                  
                  />

{errorspoiOrgInfo.crNo && (
                      <FormHelperText error>
                        {errorspoiOrgInfo.crNo.message}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  
                    {
                      labelFile ?

                      <CssTextField margin="normal" fullWidth id="commercial" label="File Upload" 
                  
                      name="crFilaName"
                      {...registerpoiOrgInfo('crFilaName')}  
                      value={poiOrgstate.crFilaName} 
    
                      
                      InputProps={{
                        readOnly:true,
                        endAdornment: (
                          
                          <Close onClick={removeDefaultFile} style={{ cursor: 'pointer' }} />
                          
                        
                        ),
                        startAdornment: <AttachFileIcon />,
                      }}
                      
                      />
                      :

                      (

                        <>
                        <CssFormControl margin="normal" fullWidth  variant="outlined">
                        <Controller
                      id="file_upload_select"
                    name="file_upload"
                    control={controlpoiOrgInfo}
                    rules={{
                      required: 'File upload is required'
                    }}
                    
                    render={({ field,fieldState }) => (
                      <>
                      
                         <MuiFileInput className={styles.fileLabel}  label="File Upload" placeholder='Allowed - 
                     *.jpeg, *.jpg, *.png, *.pdf' 
                     value={poiOrgstate.file_upload} 
                     onChange={(e) => {
                      field.onChange(e);
                      
                      handleInputChangepoiOrgInfoFileUp(e);
                    }}

                     />
                     {fieldState.invalid && (
                                <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                                )}

                      </>

                      )}
                      />
                        </CssFormControl>
                        </>
                      )
                    }
                    
                   
                    
                  
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssFormControl components={['DatePicker']} margin="normal" fullWidth  variant="outlined">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                      {...registerpoiOrgInfo('issueDate', {
                        required: 'Issue Date is required'
                      })}
                      value={dayjs(poiOrgstate.issueDate, 'MM-DD-YYYY')}
                      
                      onChange={changeDateValueIssueDate}
                      maxDate={today}
                      
                      name="issueDate"
                      label="Issue Date" 
                      renderInput={(params) => <TextField {...params} />} // If you're using TextField
                      
                       />
                       {errorspoiOrgInfo.issueDate && (
                      <FormHelperText error>
                        {errorspoiOrgInfo.issueDate.message}
                      </FormHelperText>
                    )}
                    </LocalizationProvider>
                  </CssFormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssFormControl components={['DatePicker']} margin="normal" fullWidth  variant="outlined">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                      {...registerpoiOrgInfo('expiryDate', {
                        required: 'Expiry Date is required'
                      })}
                      value={dayjs(poiOrgstate.expiryDate, 'MM-DD-YYYY')}
                      
                      onChange={changeDateValueExpirydate}
                      minDate={today}
                      
                      name="expiryDate"
                      label="Expiry Date" 
                      renderInput={(params) => <TextField {...params} />} // If you're using TextField
                      
                       />
                       {errorspoiOrgInfo.expiryDate && (
                      <FormHelperText error>
                        {errorspoiOrgInfo.expiryDate.message}
                      </FormHelperText>
                    )}
                    </LocalizationProvider>
                  </CssFormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <CssFormControl margin="normal" fullWidth>
                      <InputLabel id="demo-simple-select-label">Data Classification</InputLabel>
                      <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Data Classification" 
                      
                      name="dataClassification"
                     

                      {...registerpoiOrgInfo('dataClassification', {
                       required: 'Data classification is required'
                     })}  
                      value={poiOrgstate.dataClassification} onChange= 
                      {handleInputChangepoiOrgInfo} onFocus={handleInputFocuspoiOrgInfo}

                      MenuProps={MenuProps} >
                        <MenuItem value="Public">Public</MenuItem>
                        <MenuItem value="Restricted">Restricted</MenuItem>
                        <MenuItem value="Confidential">Confidential</MenuItem>
                        <MenuItem value="Extremely Confidential">Extremely Confidential</MenuItem>
                      </Select>
                      {errorspoiOrgInfo.dataClassification && (
                      <FormHelperText error>
                        {errorspoiOrgInfo.dataClassification.message}
                      </FormHelperText>
                    )}
                    </CssFormControl>
                    <InfoIcon onClick={handleOpen} sx={{fontSize: '40px', color: "#015578",  ml: 1, my: 2, cursor:'pointer'}} />
                    
                  </Box>
                </Grid>
                {/* START Data Classification Info Modal */}
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">Data Classification</Typography>
                    <Typography id="modal-modal-description" component="p" color={'#6b6f82'} sx={{ mt: 2 }}>Based on the Cloud Computing 
                      Regulatory Framework, issued by the Saudi Communication, Information, and Technology Commission; Cloud customers need to 
                      choose the appropriate classification of their data as follows:
                    </Typography>
                    <Accordion sx={{mt:3}} expanded={expanded === 'panel1'} onChange={handleAccChange('panel1')}>
                      <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
                        <Typography variant="h6" component="h4" fontWeight={400} color={'#6b6f82'} fontSize={16}><BlurCircularOutlinedIcon sx= 
                         {{fontSize: '25px', color: "#6b6f82", marginRight: '15px', position:'relative', display:"inline-block", top:'6px'}} /> 
                         Extremely Confidential
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography component="p" color={'#6b6f82'} paddingLeft={1}>
                          Data is classified as (Extremely Confidential) if unauthorized access to this data or its disclosure or its content 
                           leads to serious and exceptional damage that cannot be remedied or repaired on:
                        </Typography>
                        <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                          <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> National interests, including breaching agreements and treaties, 
                           harming the Kingdom&apos;s reputation, diplomatic relations and political affiliations, or the operational efficiency of 
                          security or military operations, the national economy, national infrastructure, or government business.
                        </Typography>
                        <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                          <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> The performance of government agencies, which is harmful to the 
                           national interest.
                        </Typography>
                        <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                          <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> Broader individual health and safety and the privacy of senior 
                           officials. Environmental or natural resources
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleAccChange('panel2')}>
                      <AccordionSummary aria-controls="panel2bh-content" id="panel2bh-header">
                        <Typography variant="h6" component="h4" fontWeight={400} color={'#6b6f82'} fontSize={16}><DetailsOutlinedIcon sx= 
                         {{fontSize: '25px', color: "#6b6f82", marginRight: '15px', position:'relative', display:"inline-block", top:'6px'}} /> 
                         Confidential
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography component="p" color={'#6b6f82'} paddingLeft={1}>
                         Data is classified as (Confidential) if unauthorized access to this data or its disclosure or its content leads to 
                          serious and exceptional damage that cannot be remedied or repaired on:
                        </Typography>
                        <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                          <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> National interests, including partially harming the Kingdom&apos;s 
                           reputation, diplomatic relations and political affiliations, or the operational efficiency of security or military 
                            operations, the national economy, national infrastructure, or government business.
                        </Typography>
                        <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                          <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> Causes a financial loss at the organizational level that leads to 
                           bankruptcy, the inability of the entities to perform their duties, a serious loss of competitiveness, or both.
                        </Typography>
                        <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                          <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> Causes serious harm or injury that affects the life of a group of 
                           individuals.
                        </Typography>
                        <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                          <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> Leads to long-term damage to environmental or natural resources. 
                           Investigating major cases as specified by law, such as terrorism financing cases.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleAccChange('panel3')}>
                      <AccordionSummary aria-controls="panel3bh-content" id="panel3bh-header">
                        <Typography variant="h6" component="h4" fontWeight={400} color={'#6b6f82'} fontSize={16}><FilterCenterFocusOutlinedIcon 
                         sx={{fontSize: '25px', color: "#6b6f82", marginRight: '15px', position:'relative', display:"inline-block", top:'6px'}} /> 
                         Restricted
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography component="p" color={'#6b6f82'} paddingLeft={1}>
                          Data is classified as (Restricted): If unauthorized access to or disclosure of this data or its content leads to:
                        </Typography>
                        <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                          <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> A limited negative impact on the work of government agencies or 
                           economic activities in the Kingdom, or on the work of a specific person
                        </Typography>
                        <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                          <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> Limited damage to any entity&apos;s assets and limited loss on its 
                           financial and competitive position. Limited damage in the short term to environmental or natural resources.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleAccChange('panel4')}>
                      <AccordionSummary aria-controls="panel4bh-content" id="panel4bh-header">
                        <Typography variant="h6" component="h4" fontWeight={400} color={'#6b6f82'} fontSize={16}><PublicOutlinedIcon sx= 
                         {{fontSize: '25px', color: "#6b6f82", marginRight: '15px', position:'relative', display:"inline-block", top:'6px'}} /> 
                         Public
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography component="p" color={'#6b6f82'} paddingLeft={1}>
                          Data is classified as (Public) when unauthorized access to or disclosure of this data or its content does not result in 
                          any of the effects mentioned above - in the event that there is no effect on the following:
                        </Typography>
                        <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                          <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> National interest
                        </Typography>
                        <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                          <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> Entity activities
                        </Typography>
                        <Typography component="p" color={'#6b6f82'} paddingLeft={3} paddingTop={2}>
                          <FiberManualRecordIcon sx={{fontSize: '12px'}}  /> Interests of individuals Environmental resources
                        </Typography>
                        <Typography component="p" color={'#6b6f82'} paddingLeft={1} paddingTop={2}>
                          For more information regarding the Cloud Computing Regulatory Framework please visit CITC website.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Modal>
                {/* END Data Classification Info Modal */}
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <CssFormControl margin="normal" fullWidth>
                    <InputLabel id="demo-simple-select-label">Purpose</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Purpose" 


                  name="purposeOfUse"
                     

                     {...registerpoiOrgInfo('purposeOfUse', {
                      required: 'Purpose of use is required'
                    })}  
                     value={poiOrgstate.purposeOfUse} onChange= 
                     {handleInputChangepoiOrgInfo} onFocus={handleInputFocuspoiOrgInfo}


                     
                     MenuProps={MenuProps} >
                      <MenuItem value="Resale">Resale</MenuItem>
                      <MenuItem value="Live support system">Live support system</MenuItem>
                      <MenuItem value="Plants/Factories">Plants/Factories</MenuItem>
                      <MenuItem value="Others">Others</MenuItem>
                    </Select>
                    {errorspoiOrgInfo.purposeOfUse && (
                      <FormHelperText error>
                        {errorspoiOrgInfo.purposeOfUse.message}
                      </FormHelperText>
                    )}
                  </CssFormControl>
                </Grid> 
              </Grid>

              {
          !allowPOIcsbt && 

          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between', mt:3, }}>
          <Button onClick={backToBillingAddr} type='button' size='large' variant='contained' className={styles.stepperBtn} >Back</Button>
            <Button size='large' variant='contained' className={styles.stepperBtn}  type='submit' >Next</Button>
          </Grid>
        }
            </Box>
          </TabPanel>
          

        
        </TabContext>
        </Box>
        
        
      </>
    );
  };
  
  export default PersonalOrgInfoSubmit;