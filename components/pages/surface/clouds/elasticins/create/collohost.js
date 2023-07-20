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

import InfoIcon from '@mui/icons-material/Info';
import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';


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

// Instance FormControl Custom Style
const InstanceFormControl = styled(FormControl)({
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

const CollobHost = ({  }) => {

    return (
        <>
         {/* Start Instance Here */}
      <Card sx={{mt:2, borderRadius:'7px', position: 'relative', overflow: 'initial'}}>
        <CardContent sx={{ padding: '24px'}}>
          <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={4} lg={4} xl={4}>
              <Typography component="h4" variant="h5" align="left" fontSize={20}>Instance Label / Hostname
              <Box className={styles.InstanceInfoIcon}>
                <InfoIcon sx={{ width: '30px', height: '30px' }} ></InfoIcon>
                <Card sx={{mt:2, borderRadius:'7px', overflow: 'initial'}} className={styles.InstanceInfoDetail}>
                  <CardContent sx={{ padding: '24px'}}>
                    <Typography component="p" variant="p" align="left" fontSize={16}>Hostname must contain only alphanumeric characters and 
                    hyphens.</Typography>
                    <Typography component="p" variant="p" align="left" pt={1} fontSize={16}>Length can be 3 to 15 characters long.</Typography>
                  </CardContent>
                </Card>
              </Box>
              </Typography>
              
              <CssTextField margin="normal" fullWidth value='Ubuntu-338556' id="instance" name="instance" />
            </Grid>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={4} lg={4} xl={4}>
              <Typography component="h4" variant="h5" align="left" fontSize={20}>Team</Typography>
              <InstanceFormControl margin="normal" fullWidth >
                <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                  {MenuProps}>
                  <MenuItem value="">Select Team</MenuItem>
                  <MenuItem value={1}>Default</MenuItem>
                  <MenuItem value={2}>Admin</MenuItem>
                </Select>
              </InstanceFormControl>
            </Grid>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={4} lg={4} xl={4}>
              <Typography component="h4" variant="h5" align="left" fontSize={20}>Tags</Typography>
              <InstanceFormControl margin="normal" fullWidth >
                <Select defaultValue="" id="grouped-select"  displayEmpty inputProps={{ 'aria-label': 'Without label' }} MenuProps= 
                  {MenuProps}>
                  <MenuItem value="">Select Tags</MenuItem>
                  <MenuItem value={1}>Default</MenuItem>
                  <MenuItem value={2}>Network</MenuItem>
                </Select>
              </InstanceFormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* END Instance Here */}
      {/* Start Instance Skeleton Here */}
      <Card sx={{mt:2, borderRadius:'7px', position: 'relative', overflow: 'initial'}} hidden>
        <CardContent sx={{ padding: '24px'}}>
          <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={4} lg={4} xl={4}>
              <Skeleton variant="text" width={'100%'} height={25} />
              <Skeleton variant="rounded" width={'100%'} height={58} sx={{mt:2}} />
            </Grid>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={4} lg={4} xl={4}>
              <Skeleton variant="text" width={'100%'} height={25} />
              <Skeleton variant="rounded" width={'100%'} height={58} sx={{mt:2}} />
            </Grid>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={4} lg={4} xl={4}>
              <Skeleton variant="text" width={'100%'} height={25} />
              <Skeleton variant="rounded" width={'100%'} height={58} sx={{mt:2}} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* END Instance Skeleton Here */}
        
        </>
    );
};

export default CollobHost;