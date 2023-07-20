
import * as React from 'react';
import { useState } from 'react';
import styles from '../../../../../../pages/surface/clouds/elasticins/create/index.module.css';
import { styled } from '@mui/material/styles';
import { Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';

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

// ** Switch Function
const PinkSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: '#6DCCDD',
      '&:hover': {
        backgroundColor: 'rgb(109, 204, 221, 0.08)',
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#6DCCDD',
    },
  }));
  
  const label = { inputProps: { 'aria-label': 'Color switch demo' } };

  

const Network = ({  }) => {

    return (
        <>
        {/* Start Network Bandwidth Speed Here */}
      <Card sx={{mt:2, borderRadius:'7px', position: 'relative', overflow: 'initial'}}>
        <CardContent sx={{ padding: '24px'}}>
          <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={9} lg={7} xl={7}>
              <Typography component="h4" variant="h5" align="left" fontSize={20}>Network</Typography>
              <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className={styles.IpRequired}>Public / Elastic IP Required</Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Box align="center" alignItems='center' mt={'13px'}>No <PinkSwitch {...label} defaultChecked color="secondary" /> Yes</Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Box align="center" className={styles.IpRequired}>110.73</Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={3} lg={5} xl={5}>
              <Typography component="h4" variant="h5" align="left" fontSize={20}>Bandwidth Speed</Typography>
              <CssTextField margin="normal" fullWidth value='2 Mbps' id="bandwidth" name="bandwidth" aria-readonly />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* END Network Bandwidth Speed Here */}
      {/* Start Network Bandwidth Speed Skeleton Here */}
      <Card sx={{mt:2, borderRadius:'7px', position: 'relative', overflow: 'initial'}} hidden>
        <CardContent sx={{ padding: '24px'}}>
          <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={9} lg={7} xl={7}>
              <Skeleton variant="text" width={'30%'} height={25} />
              <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box className={styles.IpRequired}><Skeleton variant="text" width={'100%'} height={25} /></Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Box align="center" alignItems='center' mt={'16px'}><Skeleton variant="text" width={'100%'} height={25} /></Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Box align="center" className={styles.IpRequired}><Skeleton variant="text" width={'100%'} height={25} /></Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={3} lg={5} xl={5}>
              <Skeleton variant="text" width={'50%'} height={25} />
              <Skeleton variant="rounded" width={'100%'} height={58} sx={{mt:2}} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* END Network Bandwidth Speed Skeleton Here */}
        </>
    );
};

export default Network;