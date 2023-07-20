import * as React from 'react';
import { useState } from 'react';
import styles from '../../../../../../pages/surface/clouds/elasticins/create/index.module.css';

import { Skeleton } from '@mui/material';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';


import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

import CardHeader from '@mui/material/CardHeader';

import Carousel from 'better-react-carousel'


// Carousel Styles 
const MyDot = ({ isActive }) => (
    <span
      style={{
        width: isActive ? '10px' : '6px',
        height: isActive ? '10px' : '6px',
        display: 'inline-block',
        background: '#015578',
        marginTop: '25px',
        borderRadius: '30px',
      }}
    ></span>
  )


const SizingPolicyGroup = ({ showCinssizingPolicyGroup, sizingPolicyGroupData,cloudservertypeData,datacenterData,platformData,setreqParams }) => {

     // ** Profile Tab Function
  const [Profilevalue, setProfileValue] = useState('General')
  const handleProfileChange = (event, newProfileValue) => {
    setProfileValue(newProfileValue)
  }


    return (
        <>
        
        {/* Start Profile Here */}
        {showCinssizingPolicyGroup && 
      <Card sx={{mt:2, borderRadius:'7px'}}>
        <CardContent sx={{ padding: '24px'}}>
          <Typography component="h4" variant="h5" align="left" fontSize={20}>Profile</Typography>
          <Typography component="p" variant="p" color={'#6b6f82'} align="left" sx={{pt: 1}}>High performance virtual machines with a good balance 
            of memory and dedicated hyper-threads from best in class Intel processors.</Typography>
          <TabContext value={Profilevalue} >
            <TabList onChange={handleProfileChange} className={styles.tabContainer} aria-label='simple tabs example' TabIndicatorProps={{style: {
            backgroundColor: "#6DCCDD"} }} sx={{"& .MuiTab-root.Mui-selected": {color: '#015578', backgroundColor: '#e1f3f6'} }}>
              <Tab value='General' label='General Purpose' />
              <Tab value='CPU' label='CPU Optimized' disabled />
              <Tab value='Memory' label='Memory Optimized' disabled />
              <Tab value='Storage' label='Storage Optimized' disabled />
            </TabList>
            <TabPanel value='General' sx={{ padding: '24px 0px' }}>
              <Carousel containerStyle={{display:"grid"}} cols={5} rows={1} gap={15}  mobileBreakpoint={768} scrollSnap={true} showDots={true} 
                hideArrow={true} loop={true} dot={MyDot}>
                <Carousel.Item sx={{ overflow: 'auto'}}>
                  <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard} ${styles.cardActive}`}>
                    <CardHeader className={styles.ProfileCardHeader} title={ <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 
                      'center', fontSize: '20px', fontWeight: '450' }}> SAR 169.13 <Box sx={{ ml: '5px', mt: '5px', fontSize: '12px', fontWeight: 
                      '400'}}> /mo</Box> </Box> }  />
                    <CardContent sx={{ padding: '24px' }}>
                      <Box component="img" width={35} height={35} align="center" className={styles.cardActiveCheck} alt="ActiveCheck" 
                      src="/images/pages/surface/clouds/elasticins/create/ActiveCheck.png" />
                      <Box color={'#000'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      2 <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> vCPUs</Box>
                      </Box>
                      <Box color={'#000'} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      4GB <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> Memory</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Carousel.Item>
                <Carousel.Item sx={{ overflow: 'auto'}}>
                  <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                    <CardHeader className={styles.ProfileCardHeader} title={ <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 
                      'center', fontSize: '20px', fontWeight: '450' }}> SAR 169.13 <Box sx={{ ml: '5px', mt: '5px', fontSize: '12px', fontWeight: 
                      '400'}}> /mo</Box> </Box> }  />
                    <CardContent sx={{ padding: '24px' }}>
                      <Box color={'#000'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      2 <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> vCPUs</Box>
                      </Box>
                      <Box color={'#000'} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      4GB <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> Memory</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Carousel.Item>
                <Carousel.Item sx={{ overflow: 'auto'}}>
                  <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                    <CardHeader className={styles.ProfileCardHeader} title={ <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 
                      'center', fontSize: '20px', fontWeight: '450' }}> SAR 169.13 <Box sx={{ ml: '5px', mt: '5px', fontSize: '12px', fontWeight: 
                      '400'}}> /mo</Box> </Box> }  />
                    <CardContent sx={{ padding: '24px' }}>
                      <Box color={'#000'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      2 <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> vCPUs</Box>
                      </Box>
                      <Box color={'#000'} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      4GB <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> Memory</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Carousel.Item>
                <Carousel.Item sx={{ overflow: 'auto'}}>
                  <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                    <CardHeader className={styles.ProfileCardHeader} title={ <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 
                      'center', fontSize: '20px', fontWeight: '450' }}> SAR 169.13 <Box sx={{ ml: '5px', mt: '5px', fontSize: '12px', fontWeight: 
                      '400'}}> /mo</Box> </Box> }  />
                    <CardContent sx={{ padding: '24px' }}>
                      <Box color={'#000'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      2 <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> vCPUs</Box>
                      </Box>
                      <Box color={'#000'} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      4GB <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> Memory</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Carousel.Item>
                <Carousel.Item sx={{ overflow: 'auto'}}>
                  <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                    <CardHeader className={styles.ProfileCardHeader} title={ <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 
                      'center', fontSize: '20px', fontWeight: '450' }}> SAR 169.13 <Box sx={{ ml: '5px', mt: '5px', fontSize: '12px', fontWeight: 
                      '400'}}> /mo</Box> </Box> }  />
                    <CardContent sx={{ padding: '24px' }}>
                      <Box color={'#000'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      2 <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> vCPUs</Box>
                      </Box>
                      <Box color={'#000'} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      4GB <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> Memory</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Carousel.Item>
                <Carousel.Item sx={{ overflow: 'auto'}}>
                  <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                    <CardHeader className={styles.ProfileCardHeader} title={ <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 
                      'center', fontSize: '20px', fontWeight: '450' }}> SAR 169.13 <Box sx={{ ml: '5px', mt: '5px', fontSize: '12px', fontWeight: 
                      '400'}}> /mo</Box> </Box> }  />
                    <CardContent sx={{ padding: '24px' }}>
                      <Box color={'#000'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      2 <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> vCPUs</Box>
                      </Box>
                      <Box color={'#000'} sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', }}>
                      4GB <Box color={'#000'} fontSize={'12px'} fontWeight={400} ml={'5px'} mt={'5px'}> Memory</Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Carousel.Item>
              </Carousel>
            </TabPanel>
            <TabPanel value='CPU'>
              <Typography>CPU</Typography>
            </TabPanel>
            <TabPanel value='Memory'>
              <Typography>Storage</Typography>
            </TabPanel>
            <TabPanel value='Storage'>
              <Typography>Storage</Typography>
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
        }
      {/* END Profile Here */}
      {/* Start Profile Skeleton Here */}
      {!showCinssizingPolicyGroup && 
      <Card sx={{mt:2, borderRadius:'7px'}} >
        <CardContent sx={{ padding: '24px'}}>
          <Stack spacing={1}>
            <Skeleton variant="text" width={'20%'} height={25} />
            <Skeleton variant="text" width={'60%'} height={25} />
            <Skeleton variant="text" width={'100%'} height={80} sx={{borderRadius: '12px'}} />
          </Stack>
          <Carousel containerStyle={{display:"grid"}} cols={5} rows={1} gap={15}  mobileBreakpoint={768} scrollSnap={true} showDots={false} 
            hideArrow={true} loop={true}>
            <Carousel.Item sx={{ overflow: 'auto'}}>
              <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                <CardHeader className={styles.ProfileCardHeader} title={ <Skeleton variant="text" width={'100%'} height={25} /> }  />
                <CardContent sx={{ padding: '24px' }}>
                  <Skeleton variant="text" width={'100%'} height={25} />
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt: '25px'}} />
                </CardContent>
              </Card>
            </Carousel.Item>
            <Carousel.Item sx={{ overflow: 'auto'}}>
              <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                <CardHeader className={styles.ProfileCardHeader} title={ <Skeleton variant="text" width={'100%'} height={25} /> }  />
                <CardContent sx={{ padding: '24px' }}>
                  <Skeleton variant="text" width={'100%'} height={25} />
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt: '25px'}} />
                </CardContent>
              </Card>
            </Carousel.Item>
            <Carousel.Item sx={{ overflow: 'auto'}}>
              <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                <CardHeader className={styles.ProfileCardHeader} title={ <Skeleton variant="text" width={'100%'} height={25} /> }  />
                <CardContent sx={{ padding: '24px' }}>
                  <Skeleton variant="text" width={'100%'} height={25} />
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt: '25px'}} />
                </CardContent>
              </Card>
            </Carousel.Item>
            <Carousel.Item sx={{ overflow: 'auto'}}>
              <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                <CardHeader className={styles.ProfileCardHeader} title={ <Skeleton variant="text" width={'100%'} height={25} /> }  />
                <CardContent sx={{ padding: '24px' }}>
                  <Skeleton variant="text" width={'100%'} height={25} />
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt: '25px'}} />
                </CardContent>
              </Card>
            </Carousel.Item>
            <Carousel.Item sx={{ overflow: 'auto'}}>
              <Card variant='outlined' sx={{mt:2, borderRadius:'7px'}} className={`${styles.CarouselCard}`}>
                <CardHeader className={styles.ProfileCardHeader} title={ <Skeleton variant="text" width={'100%'} height={25} /> }  />
                <CardContent sx={{ padding: '24px' }}>
                  <Skeleton variant="text" width={'100%'} height={25} />
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt: '25px'}} />
                </CardContent>
              </Card>
            </Carousel.Item>
          </Carousel>
        </CardContent>
      </Card>
      }
      {/* END Profile Skeleton Here */}

        </>
    );
};

export default SizingPolicyGroup;