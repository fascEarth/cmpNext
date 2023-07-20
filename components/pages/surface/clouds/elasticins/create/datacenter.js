import * as React from 'react';
import { useState } from 'react';
import styles from '../../../../../../pages/surface/clouds/elasticins/create/index.module.css';

import { Skeleton } from '@mui/material';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';


const Datacenter = ({showCinsdatacenter,datacenterData,platformData,setreqParams  }) => {
  
    return (
        <>
        
      {/* Start Datacenter/Region Here */}
      {showCinsdatacenter &&      
      <Card sx={{mt:2, borderRadius:'7px'}}>
      <CardContent sx={{ padding: '24px'}}>
        <Typography component="h4" variant="h5" align="left" fontSize={20}>Datacenter/Region</Typography>
        <Typography component="p" variant="p" color={'#6b6f82'} align="left" sx={{pt: 1}}>Decide the best region for your instance, check our 
          latency report to find suitable datacenter for your current region. 
          </Typography>
        <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>

        {datacenterData.list.map((item, index) => 
            (
              <Grid key={index} onClick={() =>  {
                
                item.availabilty &&  setreqParams(prevState => ({ "platformid":platformData.defaultId,"datacenterid": item.id }))
              } } item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card sx={{position:'relative', borderRadius:'7px', overflow: 'initial',}} className={styles.cardActive}>
              <CardContent sx={{ padding: '16px !important'}}>
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                  <Avatar variant="square" sx={{ width: '75px', height: '75px' }} alt="riyadh" 
                    src={"/images/pages/surface/clouds/elasticins/create/"+item.image}></Avatar>
                  <Typography component="h4" variant="h5" align="left" fontSize={16} sx={{pl:3}}>{item.value}</Typography>

                  {
                        item.availabilty ? (
                          <Box component="img" width={35} height={35} align="center" className={styles.cardActiveCheck} alt="ActiveCheck" 
                    src="/images/pages/surface/clouds/elasticins/create/ActiveCheck.png" />
                        ) : (
                          <Typography component="span" align="right" fontSize={14} color={'red'} className={styles.commingSoon}>Coming 
                    Soon</Typography>
                        )
                      }

                  
                </Box>
              </CardContent>
            </Card>
          </Grid>
            )
        )}
          
        </Grid>
      </CardContent>
    </Card>
      }
      
      {/* END Datacenter/Region Here */}
      {/* Start Datacenter/Region Skeleton Here */}
      {!showCinsdatacenter &&
      <Card sx={{mt:2, borderRadius:'7px'}} >
        <CardContent sx={{ padding: '24px'}}>
          <Stack spacing={1}>
            <Skeleton variant="text" width={'20%'} height={25} />
            <Skeleton variant="text" width={'40%'} height={25} />
          </Stack>
          <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Card sx={{position:'relative', borderRadius:'7px', overflow: 'initial',}}>
                <CardContent sx={{ padding: '16px !important'}}>
                  <Box sx={{ display: 'flex', alignItems: 'center', }}>
                    <Skeleton variant="circular" width={70} height={70} />
                    <Skeleton variant="text" width={'50%'} height={25} sx={{ ml: 3}} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Card sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                <CardContent sx={{ padding: '16px !important'}}>
                  <Box sx={{ display: 'flex', alignItems: 'center', }}>
                    <Skeleton variant="circular" width={70} height={70} />
                    <Skeleton variant="text" width={'50%'} height={25} sx={{ ml: 3}} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      }
      {/* END Datacenter/Region Skeleton Here */}
        </>
    );
};

export default Datacenter;