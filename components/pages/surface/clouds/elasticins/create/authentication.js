
import * as React from 'react';
import { useState } from 'react';
import styles from '../../../../../../pages/surface/clouds/elasticins/create/index.module.css';
import { styled } from '@mui/material/styles';
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
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import OutlinedInput from '@mui/material/OutlinedInput';
import InfoIcon from '@mui/icons-material/Info';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';

// Instance FormControl Custom Style
const PasswordFormControl = styled(FormControl)({
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

const Authentication = ({  }) => {

      // ** Authentication Tab Function
  const [Authvalue, setAuthValue] = useState('Password')
  const handleAuthChange = (event, newAuthValue) => {
    setAuthValue(newAuthValue)
  }

  //Password Show
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    return (
        <>
        {/* Start Authentication Here */}
      <Card sx={{mt:2, borderRadius:'7px',}}>
        <CardContent sx={{ padding: '24px'}}>
          <Typography component="h4" variant="h5" align="left" fontSize={20}>Authentication</Typography>
          <TabContext value={Authvalue} >
            <TabList onChange={handleAuthChange} className={styles.tabContainer} aria-label='simple tabs example' TabIndicatorProps={{style: {
            backgroundColor: "#6DCCDD"} }} sx={{"& .MuiTab-root.Mui-selected": {color: '#015578', backgroundColor: '#e1f3f6'} }}>
              <Tab value='Password' label='Password' />
              <Tab value='SSH' label='SSH Key' disabled />
            </TabList>
            <TabPanel value='Password'>
              <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
                <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={6} lg={6} xl={6}>
                  <PasswordFormControl margin="normal" fullWidth variant="outlined" sx={{mt: '45px'}}>
                    <InputLabel htmlFor="outlined-adornment-password">Create Root Password </InputLabel>
                    <OutlinedInput id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown= 
                           {handleMouseDownPassword} edge="end" > {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Create Root Password"
                    />
                  </PasswordFormControl>
                </Grid>
                <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box sx={{ display: 'flex'}}>
                    <InfoIcon sx={{ fontSize: '35px', color: '#015578', mt: '55px'}} />
                    <List>
                      <Typography component="h6" variant="h5" align="left" fontSize={14} sx={{paddingLeft: '18px', color: '#000', 
                      fontWeight: '400'}}>PASSWORD REQUIREMENTS</Typography>
                      <ListItem sx={{color: '#6b6f82', fontSize: '10px!important', pt: 0, pb: 0}}>
                        <ListItemText><FiberManualRecordIcon sx={{ fontSize: '10px'}} /> Must be at least 8 characters long</ListItemText>
                      </ListItem>
                      <ListItem sx={{color: '#6b6f82', fontSize: '10px!important', pt: 0, pb: 0}}>
                        <ListItemText><FiberManualRecordIcon sx={{ fontSize: '10px'}} /> Must contain 1 uppercase letter</ListItemText>
                      </ListItem>
                      <ListItem sx={{color: '#6b6f82', fontSize: '10px!important', pt: 0, pb: 0}}>
                        <ListItemText><FiberManualRecordIcon sx={{ fontSize: '10px'}} /> Must contain 1 number</ListItemText>
                      </ListItem>
                      <ListItem sx={{color: '#6b6f82', fontSize: '10px!important', pt: 0, pb: 0}}>
                        <ListItemText><FiberManualRecordIcon sx={{ fontSize: '10px'}} /> Must contain 1 special character</ListItemText>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value='SSH'>
              <Typography>SSH</Typography>
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
      {/* END Authentication Here */}
      {/* Start Authentication Skeleton Here */}
      <Card sx={{mt:2, borderRadius:'7px',}} hidden>
        <CardContent sx={{ padding: '24px'}}>
          <Stack spacing={0}>
            <Skeleton variant="text" width={'20%'} height={25} />
            <Skeleton variant="text" width={'100%'} height={80} sx={{borderRadius: '12px'}} />
          </Stack>
          <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={3}>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={6} lg={6} xl={6}>
              <Skeleton variant="rounded" width={'100%'} height={58} sx={{mt:5}} />
            </Grid>
            <Grid item sx={{pt: '0 !important' }} xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box sx={{ display: 'flex'}}>
                <Skeleton variant="circular" width={40} height={40} sx={{mt: '50px'}} />
                <List>
                  <ListItem sx={{color: '#6b6f82', fontSize: '10px!important', pt: 0, pb: 0}}>
                    <ListItemText><Skeleton variant="text" width={'300px'} height={25} /></ListItemText>
                  </ListItem>
                  <ListItem sx={{color: '#6b6f82', fontSize: '10px!important', pt: 0, pb: 0}}>
                    <ListItemText><Skeleton variant="text" width={'300px'} height={25} /></ListItemText>
                  </ListItem>
                  <ListItem sx={{color: '#6b6f82', fontSize: '10px!important', pt: 0, pb: 0}}>
                     <ListItemText><Skeleton variant="text" width={'300px'} height={25} /></ListItemText>
                  </ListItem>
                  <ListItem sx={{color: '#6b6f82', fontSize: '10px!important', pt: 0, pb: 0}}>
                    <ListItemText><Skeleton variant="text" width={'300px'} height={25} /></ListItemText>
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* END Authentication Skeleton Here */}
        </>
    );
};

export default Authentication;