import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from '../../../../../../pages/surface/clouds/elasticins/create/index.module.css';

import { Skeleton } from '@mui/material';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';


import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';



const CloudServerType = ({ setcinCloudServerTypeId,setcinPlacementGroupsId,showCinscloudservertype, cloudservertypeData, datacenterData, platformData, setreqParams, setsizingPolicyGroupData, sizingPolicyGroupData }) => {
  

  // ** Type of Cloud Server Tab Function
  const [value, setValue] = useState("out-1");
  const [valueGrid, setvalueGrid] = useState(0);

  
  

  useEffect(() => {    
    
    
    if(cloudservertypeData){
      setcinCloudServerTypeId(cloudservertypeData.defaultId);
      setValue("out-"+cloudservertypeData.defaultId);
      cloudservertypeData.list.map(function(elem){
        if(elem.id == cloudservertypeData.defaultId){
          
          setvalueGrid(elem.defaultId);
          setcinPlacementGroupsId(elem.defaultId);
          if(elem.list){
            elem.list.map(function(sspelem){
              if(sspelem.id == elem.defaultId){
                
                setsizingPolicyGroupData(sspelem.list[0]);
                return;
              }
            })
          }
          
        }
      })
    }
    
    
    

}, [cloudservertypeData]);

  const handleChange = (event, newValue) => {

    cloudservertypeData.defaultId = newValue.split("-")[1];
    setcinCloudServerTypeId(cloudservertypeData.defaultId);
    setValue(newValue);

    setreqParams(prevState => ({ "platformid":platformData.defaultId,"datacenterid": datacenterData.defaultId, "cloudservertypeid":cloudservertypeData.defaultId }))
    
  };
  const handleChangeGrid = (newValue) => {
    
    if(newValue != "none"){
      
      cloudservertypeData.list.map(function(elem, index){
        if(elem.id == cloudservertypeData.defaultId){
          cloudservertypeData.list[index].defaultId = newValue;
          setvalueGrid(newValue);
          setcinPlacementGroupsId(cloudservertypeData.list[index].defaultId);
          setreqParams(prevState => ({ "platformid":platformData.defaultId,"datacenterid": datacenterData.defaultId, "cloudservertypeid":cloudservertypeData.defaultId, "cloudserverid":cloudservertypeData.list[index].defaultId }))
      cloudservertypeData.list[index].list.map(function(kelem, kindex){
        if(cloudservertypeData.list[index].defaultId == kelem.id){
          
          setsizingPolicyGroupData(cloudservertypeData.list[index].list[kindex].list[0]);
          
          return;
        }
        
      });
        }
        
      
      
      
      });
      

    }
    
  };

  return (
    <>
      {/* Start Type of Cloud Server Here */}
      {showCinscloudservertype &&
        <Card sx={{ mt: 2, borderRadius: '7px' }}>
          <CardContent sx={{ padding: '24px' }}>
            <Typography  className={styles.cardLabel} component="h4" variant="h5" align="left" fontSize={20}>Type of Cloud Server</Typography> {/* TR 01 class name */}
            <Typography component="p" variant="p" color={'#6b6f82'} align="left" sx={{ pt: 1 }}>Dedicated CPU instances are best for production workloads and high intensive workloads</Typography>
            {
              cloudservertypeData && value && 
              <TabContext value={value}>
                <TabList onChange={handleChange} className={styles.tabContainer} aria-label='simple tabs example' TabIndicatorProps={{ style: { backgroundColor: "#6DCCDD" } }} sx={{ "& .MuiTab-root.Mui-selected": { color: '#015578', backgroundColor: '#e1f3f6' },'& .MuiTabs-scroller':{overflowX:{xs:'scroll !important',md:'hidden !important'}} }}> {/* TR 01*/}
                  {cloudservertypeData.list &&
                    cloudservertypeData.list.map(function (elem) {
                      
                      
                      return elem.availabilty && elem.availabilty != "false"  ? (
                        <Tab key={"out-" + elem.id} value={"out-" + elem.id} label={elem.value} />
                      ) : (
                        <Tab key={"out-" + elem.id} value={"out-" + elem.id} label={elem.value} disabled sx={{cursor:"not-allowed !important",pointerEvents: 'auto !important'}} /> // TR 01 Bug fixing
                      );
                    })}
                </TabList>

                {cloudservertypeData.list &&
                  cloudservertypeData.list.map(function (elem, index) {
                    
                    const isInitialElement = index === 0;
                    const sxProp = isInitialElement ? { padding: {xs:'0 0 24px 0',md:'24px 0'}, mt: '35px' } : {};
                    return (
                      <TabPanel key={"out-" + elem.id} value={"out-" + elem.id} sx={sxProp} >
                        <Grid sx={{ mt: '0px', borderRadius: '7px' }} container direction="row" rowSpacing={2} spacing={3}>
                          {elem.availabilty &&
                            elem.list &&
                            elem.list.map(function (celem) {
                              return (
                                <Grid className={styles.cloudserverGrid}   onClick={() => handleChangeGrid(celem.availabilty ? celem.id : 'none')}  key={celem.id} value={celem.id} item xs={12} sm={4} md={4} lg={4} xl={4} sx={{cursor:celem.availabilty?'pointer':'not-allowed !important'}}> {/* TR 01 Bug fixing*/}
                                  <Card variant='outlined' sx={{ mt: 2, borderRadius: '7px' }} className={`${styles.CarouselCard} ${styles.CardAnimation} ${valueGrid == celem.id && styles.CarouselActiveSelect} `}>
                                    <CardContent sx={{ padding: '24px' }}>
                                    {
                                      valueGrid == celem.id && 
                                      <Box component="img" width={35} height={35} align="center" className={styles.CarouselActiveCheck} alt="ActiveCheck" src="/images/pages/surface/clouds/elasticins/create/ActiveCheck.png" />
                                    }
                                      
                                      
                                      <Box component="img" align="center" alt="High Intensive" className={`${styles.CarouselImg} ${styles.CarouselImgMargin}`} src={"/images/pages/surface/clouds/elasticins/create/CloudServer/" + celem.others.image} />
                                      <Typography component="h4" variant="h5" align="center" fontSize={18} sx={{ mt: '25px' }}>{celem.value}</Typography>
                                      <Typography component="p" variant="p" color={'#6b6f82'} fontSize={14} align="center" sx={{ pt: 1 }}>{celem.others.desc}</Typography>
                                      <Box className={styles.startingPricePlan} color={'#6b6f82'} sx={{ mt:{xs:'30px',md:'55px'}, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        Starting from <Box color={'#000'} fontWeight={400} ml={1}>{celem.others.prise}</Box>
                                      </Box>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              );
                            })}
                        </Grid>

                        {!elem.list &&
                          <Typography>
                            No Data Found
                          </Typography>
                        }

                      </TabPanel>
                    );
                  })}
              </TabContext>
            }
          </CardContent>
        </Card>
      }
      {/* END Type of Cloud Server Here */}

      {/* Start Type of Cloud Server Skeleton Here */}
      {/* Start Type of Cloud Server Skeleton Here */}
      {!showCinscloudservertype && 
      <Card sx={{mt:2, borderRadius:'7px'}} >
        <CardContent sx={{ padding: '24px' }}>
          <Stack spacing={1}>
            <Skeleton variant="text" width={'20%'} height={25} />
            <Skeleton variant="text" width={'60%'} height={25} />
            <Skeleton variant="text" width={'100%'} height={80} sx={{borderRadius: '12px'}} />
          </Stack>
          <Grid sx={{mt:'20px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                <CardContent sx={{ padding: '24px' }}>
                  <Skeleton variant="rounded" width={'100%'} height={165} className={`${styles.CarouselImg} ${styles.CarouselImgMargin}`} />
                  <Box display="flex" alignItems="center"><Skeleton variant="text" align="center"  width={'100%'} height={25} sx={{ mt: '25px'}} /></Box>
                  <Box display="flex" alignItems="center"><Skeleton variant="text" align="center"  width={'100%'} height={25} sx={{pt: 1}} /></Box>
                  <Box display="flex" alignItems="center"><Skeleton variant="text" align="center"  width={'100%'} height={25} sx={{mt: '55px'}} /></Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                <CardContent sx={{ padding: '24px' }}>
                  <Skeleton variant="rounded" width={'100%'} height={165} className={`${styles.CarouselImg} ${styles.CarouselImgMargin}`} />
                  <Box display="flex" alignItems="center"><Skeleton variant="text" align="center"  width={'100%'} height={25} sx={{ mt: '25px'}} /></Box>
                  <Box display="flex" alignItems="center"><Skeleton variant="text" align="center"  width={'100%'} height={25} sx={{pt: 1}} /></Box>
                  <Box display="flex" alignItems="center"><Skeleton variant="text" align="center"  width={'100%'} height={25} sx={{mt: '55px'}} /></Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                <CardContent sx={{ padding: '24px' }}>
                  <Skeleton variant="rounded" width={'100%'} height={165} className={`${styles.CarouselImg} ${styles.CarouselImgMargin}`} />
                  <Box display="flex" alignItems="center"><Skeleton variant="text" align="center"  width={'100%'} height={25} sx={{ mt: '25px'}} /></Box>
                  <Box display="flex" alignItems="center"><Skeleton variant="text" align="center"  width={'100%'} height={25} sx={{pt: 1}} /></Box>
                  <Box display="flex" alignItems="center"><Skeleton variant="text" align="center"  width={'100%'} height={25} sx={{mt: '55px'}} /></Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      } 
      {/* END Type of Cloud Server Skeleton Here */}
    </>
  );
};

export default CloudServerType;
