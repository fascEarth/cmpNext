// ** React Imports
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import SurfaceLayout from '../../../../../components/layouts/surface/Layout';

// ** MUI Components
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Skeleton } from '@mui/material';
import Stack from '@mui/material/Stack';

// ** MUI ICON Components
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CloseIcon from '@mui/icons-material/Close';

// ** Custom CSS 
import styles from './index.module.css';

import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect } from 'react';
import Platform from '../../../../../components/pages/surface/clouds/elasticins/create/platform';
import Datacenter from '../../../../../components/pages/surface/clouds/elasticins/create/datacenter';
import CloudServerType from '../../../../../components/pages/surface/clouds/elasticins/create/cloudservertype';
import SizingPolicyGroup from '../../../../../components/pages/surface/clouds/elasticins/create/sizingpolicygroup';
import ImageCategory from '../../../../../components/pages/surface/clouds/elasticins/create/imagecategory';
import Storages from '../../../../../components/pages/surface/clouds/elasticins/create/storages';
import CollobHost from '../../../../../components/pages/surface/clouds/elasticins/create/collohost';
import PrivateNetworks from '../../../../../components/pages/surface/clouds/elasticins/create/privatenetwork';
import Network from '../../../../../components/pages/surface/clouds/elasticins/create/network';
import Authentication from '../../../../../components/pages/surface/clouds/elasticins/create/authentication';

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


function Cintstance() {
  


  const [cindata, setcinData] = useState(null);
  const [cachedInfo, setCachedInfo] = useState(null);


  const [showCinsPlatforms, setshowCinsPlatforms] = useState(false);
  const [showCinsdatacenter, setshowCinsdatacenter] = useState(false);
  const [showCinscloudservertype, setshowCinscloudservertype] = useState(false);
  const [showCinssizingPolicyGroup, setshowCinssizingPolicyGroup] = useState(false);

  const [reqParams, setreqParams] = useState({});


  const [platformData, setplatformData] = useState("");
  const [datacenterData, setdatacenterData] = useState("");
  const [cloudservertypeData, setcloudservertypeData] = useState("");
  const [sizingPolicyGroupData, setsizingPolicyGroupData] = useState("");


  useEffect(() => {
    const getTypeArray = (type,data) => {
      return data
        .filter((item) => item.type === type)
        .map((item) => item)
        .flat();
    };

    const fetchData = async () => {
      try {
        const cookies = Cookies.get('userData');        

        if (!cookies) {
          // Handle case when 'userData' cookie is not found
          return;
        }

        const cachedInfo = JSON.parse(cookies);
        const finalData = {
          data: reqParams,
          tenantId: cachedInfo.tenant_id,
          userSerialId: cachedInfo.user_serial_id,
          endPoint: 'getcinsAll',
        };

        const response = await axios.post(
          '/api/surface/clouds/elasticins/create',
          finalData
        ); // call the new API route
          console.log(response.data);
        setcinData(response.data);
        setCachedInfo(cachedInfo);
        if(Object.keys(reqParams).length >0){
          console.log(reqParams);
          
          if(Object.keys(reqParams).length == 1){
            setdatacenterData(response.data.list[0]);
            //goDatacenter(response.data.list[0]);
            setshowCinsdatacenter(true);
          }else if(Object.keys(reqParams).length == 2){
            
          }
        }else{
          const platformsArray = getTypeArray('platforms',response.data)[0];
            setplatformData(platformsArray);
            setshowCinsPlatforms(true);
          if(platformsArray){            
              platformsArray.list.map(function(elem){
                if(platformsArray.defaultId == elem.id && elem.availabilty){
                  const datacenterArray = elem.list[0];
                  setdatacenterData(elem.list[0]);
                  setshowCinsdatacenter(datacenterArray); 
                  

                  if(datacenterArray){
                    datacenterArray.list.map(function(dcaelem){
                      if(datacenterArray.defaultId == dcaelem.id && dcaelem.availabilty){
                        const cloudservertypeArray = dcaelem.list[0];
                        setcloudservertypeData(cloudservertypeArray);
                        setshowCinscloudservertype(true);
                        
                        

                        if(cloudservertypeArray){
                          cloudservertypeArray.list.map(function(cstaelem){
                            if(cloudservertypeArray.defaultId == cstaelem.id && cstaelem.availabilty){
                              const serverTypeArray = cstaelem;
                              console.log(serverTypeArray);
                              if(serverTypeArray){
                                serverTypeArray.list.map(function(staElem){
                                  if(serverTypeArray.defaultId == staElem.id && staElem.availabilty){
                                    const sizingPolicyGroupArray = staElem.list[0];
                                    setsizingPolicyGroupData(sizingPolicyGroupArray);
                                    setshowCinssizingPolicyGroup(true);
                                    console.log(sizingPolicyGroupArray);
                                  }
                                })
                              }
                            }
                          })
                        }


                      }
                    })
                  }
                  return;     
                }
              });                                                  
          }

        }
      } catch (error) {
        // Handle any errors that occur during data fetching
        console.error(error);
      }
    };

    fetchData();
  }, [reqParams]);

  

  
  return (
    <SurfaceLayout currentPage={1} setBackgrd={true} >
      
      {/* Start Breadcrumbs Here */}
      <Breadcrumbs aria-label="breadcrumb">
        <Typography component="h4" variant="h5" align="left" color="#fff" fontSize={20}>Create Elastic Instance</Typography>
      </Breadcrumbs>
      {/* END Breadcrumbs Here */}
      {/* Start Breadcrumbs Skeleton Here */}
      <Stack spacing={1} sx={{ display: 'none'}}>
        <Skeleton variant="text" width={'22%'} height={25} />
      </Stack>
      {/* END Breadcrumbs Skeleton Here */}
      
      {/* Start Platform Here */}
      <Platform showCinsPlatforms={showCinsPlatforms} platformData={platformData} setplatformData={setplatformData} setshowCinsdatacenter={setshowCinsdatacenter} setreqParams={setreqParams} />
      
      {/* Start Datacenter/Region Here */}
      <Datacenter showCinsdatacenter={showCinsdatacenter} datacenterData={datacenterData} platformData={platformData} setreqParams={setreqParams}  />

      {/* Start Type of Cloud Server Here */}
      <CloudServerType  showCinscloudservertype={showCinscloudservertype} cloudservertypeData={cloudservertypeData} datacenterData={datacenterData} platformData={platformData} setreqParams={setreqParams} />

      {/* Start Profile Here */}
      <SizingPolicyGroup showCinssizingPolicyGroup={showCinssizingPolicyGroup} sizingPolicyGroupData={sizingPolicyGroupData} cloudservertypeData={cloudservertypeData} datacenterData={datacenterData} platformData={platformData} setreqParams={setreqParams} />

      {/* Start Choose an image Here */}
      <ImageCategory />

      {/* Start Add Storage Here */}
      <Storages />

      {/* Start Instance Here */}
      <CollobHost />

      {/* Start Private Network Here */}
      <PrivateNetworks />

      {/* Start Network Bandwidth Speed Here */}
      <Network />

      {/* Start Authentication Here */}
      <Authentication />

      {/* Start Fixed Footer Here */}
      <Box className={styles.Footer} >
        <Grid container direction="row" justifyContent="center" alignItems='center' rowSpacing={1} spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Grid container direction="row" rowSpacing={1} spacing={0}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <Typography component="h4" variant="h5" align="center" alignItems='center' fontSize={20} color={'#fff'} 
                sx={{mt: '20px'}}>Summary</Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                <Typography component="p" variant="p" color={'#6DCCDD'} fontSize={14} align="left" sx={{pt: 1, pb:2}}>Operating System</Typography>
                <Typography component="h4" variant="h5" align="left" alignItems={'left'} fontSize={16} color={'#fff'} className={styles.textnowrap} 
                title={'Ubuntu 22.04 (LTS) x64'}>Ubuntu 22.04 (LTS) x64</Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                <Typography component="p" variant="p" color={'#6DCCDD'} fontSize={14} align="left" sx={{pt: 1, pb:2, pl: 2}}>Location</Typography>
                <Box sx={{display: 'flex', pl: 2}}>
                  <Box component="img" width={20} height={20} mr={1} align="center" alt="ubundu" 
                    src="/images/pages/surface/clouds/elasticins/create/riyadh.png" />
                  <Typography component="h4" variant="h5" align="left" alignItems={'left'} fontSize={16} color={'#fff'} 
                  className={styles.textnowrap}>Riyadh</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Grid container direction="row" rowSpacing={1} spacing={0}>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={4} align="center" alignItems='center'>
                <Typography component="p" variant="p" color={'#6DCCDD'} fontSize={14} align="left" sx={{pt: 1, pb: 2}}>Specification</Typography>
                <Typography component="h4" variant="h5" align="left" alignItems={'left'} fontSize={16} color={'#fff'} 
                className={styles.textnowrap}>2vCPU/4GB/20G</Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={4} align="center" alignItems='center'>
                <Typography component="p" variant="p" color={'#6DCCDD'} fontSize={14} align="left" sx={{pt: 1, pb:2}}>Estimated Cost</Typography>
                <Typography component="h4" variant="h5" align="left" alignItems={'left'} fontSize={16} color={'#fff'} sx={{display: 'flex'}}
                className={styles.textnowrap}><Box sx={{fontSize: '10px', pr:1, marginTop: '7px'}}>SAR</Box> 178.33 <Box sx={{fontSize: '10px', 
                pl:1, marginTop: '7px'}}>/Month</Box> 
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} align="center" alignItems='center'>
                <Button size="md" variant="solid" sx={{ color:'#fff', backgroundImage: 'linear-gradient(45deg, #0288d1, #26c6da) !important', 
                mt: 2, }}>Deploy</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* END Fixed Footer Here */}
      {/* Start Fixed Footer Skeleton Here */}
      < Card hidden >
       <Box className={styles.Footer} >
        <Grid container direction="row" justifyContent="center" alignItems='center' rowSpacing={1} spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Grid container direction="row" rowSpacing={1} spacing={0}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <Typography component="h4" variant="h5" align="center" alignItems='center' fontSize={20} color={'#fff'} 
                sx={{mt: '20px'}}><Skeleton variant="text" width={'80%'} height={25} /></Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                <Typography component="p" variant="p" color={'#6DCCDD'} fontSize={14} align="left" sx={{pt: 1, pb:2}}><Skeleton variant="text" 
                width={'80%'} height={25} /></Typography>
                <Typography component="h4" variant="h5" align="left" alignItems={'left'} fontSize={16} color={'#fff'}><Skeleton variant="text" 
                width={'80%'} height={25} /></Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                <Typography component="p" variant="p" color={'#6DCCDD'} fontSize={14} align="left" sx={{pt: 1, pb:2, pl: 2}}><Skeleton 
                variant="text" width={'80%'} height={25} /></Typography>
                <Box sx={{display: 'flex', pl: 2}}>
                  <Skeleton variant="rounded" width={30} height={30} sx={{mr:1}} />
                  <Typography component="h4" variant="h5" align="left" alignItems={'left'}><Skeleton variant="text" width={'70px'} height={25} /> 
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Grid container direction="row" rowSpacing={1} spacing={0}>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={4} align="center" alignItems='center'>
                <Typography component="p" variant="p" color={'#6DCCDD'} fontSize={14} align="left" sx={{pt: 1, pb: 2}}><Skeleton 
                variant="text" width={'80%'} height={25} /></Typography>
                <Typography component="h4" variant="h5" align="left" alignItems={'left'}><Skeleton variant="text" 
                 width={'80%'} height={25} /></Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={4} align="center" alignItems='center'>
                <Typography component="p" variant="p" color={'#6DCCDD'} fontSize={14} align="left" sx={{pt: 1, pb:2}}><Skeleton 
                variant="text" width={'80%'} height={25} /></Typography>
                <Typography component="h4" variant="h5" align="left" alignItems={'left'}><Skeleton variant="text" width={'80%'} height={25} /> 
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} align="center" alignItems='center'>
                <Skeleton variant="rounded" width={'80%'} height={45} sx={{mt:2}} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box> 
      </Card>
      {/* END Fixed Footer Skeleton Here */}

    </SurfaceLayout>
  );
};



export default Cintstance;
