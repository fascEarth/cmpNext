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

import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';

import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import FormControl from '@mui/material/FormControl';

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

// Choose an image FormControl Custom Style
const CssFormControl = styled(FormControl)({
    '& label.Mui-focused': {
      color: 'none',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'none',
    },
    '& .MuiOutlinedInput-root': {
      "& fieldset": {
        border: '0',
        borderRadius: "0",
      },
      '&:hover fieldset': {
        border:"0px solid",
        borderColor: 'none',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'none',
      },
    },
  });

const ImageCategory = ({  }) => {

      // ** Choose an image Tab Function
  const [ChooseImgvalue, setChooseImgValue] = useState('Operating')
  const handleChooseImgChange = (event, newChooseImgValue) => {
    setChooseImgValue(newChooseImgValue)
  }

    return (
        <>
        <Card sx={{mt:2, borderRadius:'7px'}}>
        <CardContent sx={{ padding: '24px'}}>
          <Typography component="h4" variant="h5" align="left" fontSize={20}>Choose an image</Typography>
          <TabContext value={ChooseImgvalue} >
            <TabList onChange={handleChooseImgChange} className={styles.tabContainer} aria-label='simple tabs example' TabIndicatorProps={{style: {
            backgroundColor: "#6DCCDD"} }} sx={{"& .MuiTab-root.Mui-selected": {color: '#015578', backgroundColor: '#e1f3f6'} }}>
              <Tab value='Operating' label='Operating System' />
              <Tab value='Market' label='Market Place' disabled />
              <Tab value='Custom' label='Custom Images' disabled />
            </TabList>
            <TabPanel value='Operating'>
              <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}} className={styles.cardActive}>
                    <CardContent sx={{ padding: '16px !important', textAlign: 'center'}}>
                      <Box component="img" width={50} height={50} align="center" alt="ubundu" 
                      src="/images/pages/surface/clouds/elasticins/create/chooseImages/ubundu.png" />
                      <Typography component="h6" variant="h6" align="center" fontSize={16} pt={1}>Ubuntu</Typography>
                      <Box component="img" width={35} height={35} align="center" className={styles.cardActiveCheck} alt="ActiveCheck" 
                      src="/images/pages/surface/clouds/elasticins/create/ActiveCheck.png" />
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <CssFormControl fullWidth size="small">
                        <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                          {MenuProps}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value={1}>22.04 (LTS) x64</MenuItem>
                          <MenuItem value={2}>20.04 (LTS) x64</MenuItem>
                        </Select>
                      </CssFormControl>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}} >
                    <CardContent sx={{ padding: '16px !important', textAlign: 'center'}}>
                      <Box component="img" width={50} height={50} align="center" alt="Centos" 
                      src="/images/pages/surface/clouds/elasticins/create/chooseImages/centos.png" />
                      <Typography component="h6" variant="h6" align="center" fontSize={16} pt={1}>Centos</Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <CssFormControl fullWidth size="small">
                        <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                          {MenuProps}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value={1}>22.04 (LTS) x64</MenuItem>
                          <MenuItem value={2}>20.04 (LTS) x64</MenuItem>
                        </Select>
                      </CssFormControl>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                    <CardContent sx={{ padding: '16px !important', textAlign: 'center'}}>
                      <Box component="img" width={50} height={50} align="center" alt="Fedora" 
                      src="/images/pages/surface/clouds/elasticins/create/chooseImages/fedora.png" />
                      <Typography component="h6" variant="h6" align="center" fontSize={16} pt={1}>Fedora</Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <CssFormControl fullWidth size="small">
                        <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                         {MenuProps}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value={1}>22.04 (LTS) x64</MenuItem>
                          <MenuItem value={2}>20.04 (LTS) x64</MenuItem>
                        </Select>
                      </CssFormControl>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                    <CardContent sx={{ padding: '16px !important', textAlign: 'center'}}>
                      <Box component="img" width={50} height={50} align="center" alt="RockyLinux" 
                      src="/images/pages/surface/clouds/elasticins/create/chooseImages/rockyLinux.png" />
                      <Typography component="h6" variant="h6" align="center" fontSize={16} pt={1}>RockyLinux</Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <CssFormControl fullWidth size="small">
                        <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                          {MenuProps}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value={1}>22.04 (LTS) x64</MenuItem>
                          <MenuItem value={2}>20.04 (LTS) x64</MenuItem>
                        </Select>
                      </CssFormControl>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                    <CardContent sx={{ padding: '16px !important', textAlign: 'center'}}>
                      <Box component="img" width={50} height={50} align="center" alt="Debian" 
                      src="/images/pages/surface/clouds/elasticins/create/chooseImages/debian.png" />
                      <Typography component="h6" variant="h6" align="center" fontSize={16} pt={1}>Debian</Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <CssFormControl fullWidth size="small">
                        <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                          {MenuProps}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value={1}>22.04 (LTS) x64</MenuItem>
                          <MenuItem value={2}>20.04 (LTS) x64</MenuItem>
                        </Select>
                      </CssFormControl>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                    <CardContent sx={{ padding: '16px !important', textAlign: 'center'}}>
                      <Box component="img" width={50} height={50} align="center" alt="AlmaLinux" 
                      src="/images/pages/surface/clouds/elasticins/create/chooseImages/almaLinux.png" />
                      <Typography component="h6" variant="h6" align="center" fontSize={16} pt={1}>AlmaLinux</Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <CssFormControl fullWidth size="small">
                        <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                          {MenuProps}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value={1}>22.04 (LTS) x64</MenuItem>
                          <MenuItem value={2}>20.04 (LTS) x64</MenuItem>
                        </Select>
                      </CssFormControl>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                    <CardContent sx={{ padding: '16px !important', textAlign: 'center'}}>
                      <Box component="img" width={50} height={50} align="center" alt="ArchLinux" 
                      src="/images/pages/surface/clouds/elasticins/create/chooseImages/archLinux.png" />
                      <Typography component="h6" variant="h6" align="center" fontSize={16} pt={1}>ArchLinux</Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <CssFormControl fullWidth size="small">
                        <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                          {MenuProps}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value={1}>22.04 (LTS) x64</MenuItem>
                          <MenuItem value={2}>20.04 (LTS) x64</MenuItem>
                        </Select>
                      </CssFormControl>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                    <CardContent sx={{ padding: '16px !important', textAlign: 'center'}}>
                      <Box component="img" width={50} height={50} align="center" alt="Rancher" 
                      src="/images/pages/surface/clouds/elasticins/create/chooseImages/rancher.png" />
                      <Typography component="h6" variant="h6" align="center" fontSize={16} pt={1}>Rancher</Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <CssFormControl fullWidth size="small">
                        <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                          {MenuProps}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value={1}>22.04 (LTS) x64</MenuItem>
                          <MenuItem value={2}>20.04 (LTS) x64</MenuItem>
                        </Select>
                      </CssFormControl>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                    <CardContent sx={{ padding: '16px !important', textAlign: 'center'}}>
                      <Box component="img" width={50} height={50} align="center" alt="MS Windows" 
                      src="/images/pages/surface/clouds/elasticins/create/chooseImages/mswindows.png" />
                      <Typography component="h6" variant="h6" align="center" fontSize={16} pt={1}>MS Windows</Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <CssFormControl fullWidth size="small">
                        <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                          {MenuProps}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value={1}>22.04 (LTS) x64</MenuItem>
                          <MenuItem value={2}>20.04 (LTS) x64</MenuItem>
                        </Select>
                      </CssFormControl>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value='Market'>
              <Typography>Market Place</Typography>
            </TabPanel>
            <TabPanel value='Custom'>
              <Typography>Custom Images</Typography>
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
      {/* END Choose an image Here */}
      {/* Start Choose an image Skeleton Here */}
      <Card sx={{mt:2, borderRadius:'7px'}} hidden>
        <CardContent sx={{ padding: '24px'}}>
          <Stack spacing={1}>
            <Skeleton variant="text" width={'20%'} height={25} />
            <Skeleton variant="text" width={'100%'} height={80} sx={{borderRadius: '12px'}} />
          </Stack>
          <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                <CardContent sx={{ padding: '16px !important'}}>
                  <Skeleton variant="circular" width={50} height={50} sx={{margin: '0 auto'}} />
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt:1}} />
                </CardContent>
                <Divider />
                <CardActions>
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt:1, mb:1}} />
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                <CardContent sx={{ padding: '16px !important'}}>
                  <Skeleton variant="circular" width={50} height={50} sx={{margin: '0 auto'}} />
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt:1}} />
                </CardContent>
                <Divider />
                <CardActions>
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt:1, mb:1}} />
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                <CardContent sx={{ padding: '16px !important'}}>
                  <Skeleton variant="circular" width={50} height={50} sx={{margin: '0 auto'}} />
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt:1}} />
                </CardContent>
                <Divider />
                <CardActions>
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt:1, mb:1}} />
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                <CardContent sx={{ padding: '16px !important'}}>
                  <Skeleton variant="circular" width={50} height={50} sx={{margin: '0 auto'}} />
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt:1}} />
                </CardContent>
                <Divider />
                <CardActions>
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt:1, mb:1}} />
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                <CardContent sx={{ padding: '16px !important'}}>
                  <Skeleton variant="circular" width={50} height={50} sx={{margin: '0 auto'}} />
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt:1}} />
                </CardContent>
                <Divider />
                <CardActions>
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt:1, mb:1}} />
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                <CardContent sx={{ padding: '16px !important'}}>
                  <Skeleton variant="circular" width={50} height={50} sx={{margin: '0 auto'}} />
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt:1}} />
                </CardContent>
                <Divider />
                <CardActions>
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt:1, mb:1}} />
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                <CardContent sx={{ padding: '16px !important'}}>
                  <Skeleton variant="circular" width={50} height={50} sx={{margin: '0 auto'}} />
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt:1}} />
                </CardContent>
                <Divider />
                <CardActions>
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt:1, mb:1}} />
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <Card variant="outlined" sx={{position:'relative', borderRadius:'7px', overflow: 'initial'}}>
                <CardContent sx={{ padding: '16px !important'}}>
                  <Skeleton variant="circular" width={50} height={50} sx={{margin: '0 auto'}} />
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt:1}} />
                </CardContent>
                <Divider />
                <CardActions>
                  <Skeleton variant="text" width={'100%'} height={25} sx={{mt:1, mb:1}} />
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* END Choose an image Skeleton Here */}
        </>
    );
};

export default ImageCategory;