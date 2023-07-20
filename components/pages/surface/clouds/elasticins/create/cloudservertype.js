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


import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';


const CloudServerType = ({ showCinscloudservertype,cloudservertypeData,datacenterData,platformData,setreqParams }) => {

     // ** Type of Cloud Server Tab Function
  const [value, setValue] = useState('1')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  

    return (
        <>
        
        {/* Start Type of Cloud Server Here */}
        {showCinscloudservertype && 
      <Card sx={{mt:2, borderRadius:'7px'}}>
        <CardContent sx={{ padding: '24px' }}>
          <Typography component="h4" variant="h5" align="left" fontSize={20}>Type of Cloud Server</Typography>
          <Typography component="p" variant="p" color={'#6b6f82'} align="left" sx={{pt: 1}}>Dedicated CPU instances are best for production 
          workloads and high intensive workloads</Typography>
          <TabContext value={value} >
            <TabList onChange={handleChange} className={styles.tabContainer} aria-label='simple tabs example' TabIndicatorProps={{style: {
            backgroundColor: "#6DCCDD"} }} sx={{"& .MuiTab-root.Mui-selected": {color: '#015578', backgroundColor: '#e1f3f6'} }}>
              <Tab value='1' label='Shared Server' />
              <Tab value='2' label='Reserved Server' disabled />
              <Tab value='3' label='Private Server' disabled />
            </TabList>
            <TabPanel value='1' sx={{ padding: '24px 0px', mt: '35px' }} >
              <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                    <CardContent sx={{ padding: '24px' }}>
                      <Box component="img" align="center" alt="High Intensive" className={`${styles.CarouselImg} ${styles.CarouselImgMargin}`} 
                        src="/images/pages/surface/clouds/elasticins/create/CloudServer/highintensive.png" />
                      <Typography component="h4" variant="h5" align="center" fontSize={18} sx={{ mt: '25px'}}>High Intensive</Typography>
                      <Typography component="p" variant="p" color={'#6b6f82'} fontSize={14} align="center" sx={{pt: 1}}>All day high work- 
                       loads</Typography>
                      <Box color={'#6b6f82'} sx={{ mt: '55px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Starting from <Box color={'#000'} fontWeight={400} ml={1}>SR 399.00/mo</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard} ${styles.CardAnimation}`}>
                    <CardContent sx={{ padding: '24px' }}>
                      <Box component="img" align="center" alt="Intensive" className={`${styles.CarouselImg} ${styles.CarouselImgMargin}`} 
                        src="/images/pages/surface/clouds/elasticins/create/CloudServer/intensive.png" />
                      <Typography component="h4" variant="h5" align="center" fontSize={18} sx={{ mt: '25px'}}>Intensive</Typography>
                      <Typography component="p" variant="p" color={'#6b6f82'} fontSize={14} align="center" sx={{pt: 1}}>Production 
                       Workloads</Typography>
                      <Box color={'#6b6f82'} sx={{ mt: '55px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Starting from <Box color={'#000'} fontWeight={400} ml={1}>SR 299.00/mo</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard} ${styles.CardAnimation} 
                    ${styles.CarouselActiveSelect}`}>
                    <CardContent sx={{ padding: '24px' }}>
                      <Box component="img" width={35} height={35} align="center" className={styles.CarouselActiveCheck} alt="ActiveCheck" 
                      src="/images/pages/surface/clouds/elasticins/create/ActiveCheck.png" />
                      <Box component="img" align="center" alt="Moderate Intensive" className={`${styles.CarouselImg} ${styles.CarouselImgMargin}`} 
                        src="/images/pages/surface/clouds/elasticins/create/CloudServer/moderateintensive.png" />
                      <Typography component="h4" variant="h5" align="center" fontSize={18} sx={{ mt: '25px'}}>Moderate Intensive</Typography>
                      <Typography component="p" variant="p" color={'#6b6f82'} fontSize={14} align="center" sx={{pt: 1}}>Medium Duty 
                        Workloads</Typography>
                       <Box color={'#6b6f82'} sx={{ mt: '55px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Starting from <Box color={'#000'} fontWeight={400} ml={1}>SR 153.75/mo</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value='2'>
              <Typography>
                Chocolate bar carrot cake candy canes sesame snaps. Cupcake pie gummi bears jujubes candy canes. Chupa chups
                sesame snaps halvah.
              </Typography>
            </TabPanel>
            <TabPanel value='3'>
              <Typography>
                Danish tiramisu jujubes cupcake chocolate bar cake cheesecake chupa chups. Macaroon ice cream tootsie roll
                carrot cake gummi bears.
              </Typography>
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
        }
      {/* END Type of Cloud Server Here */}
      
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