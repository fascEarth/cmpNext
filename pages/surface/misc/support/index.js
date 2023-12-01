// ** React Imports
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import SurfaceLayout from '../../../../components/layouts/surface/Layout';
import Link from 'next/link';

// ** MUI Components
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

// ** Custom CSS 
import styles from './index.module.css';

// ** MUI ICON Components
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function Support() { 
    return (
        <SurfaceLayout currentPage={9} setBackgrd={true} >
            
            {/* Start Breadcrumbs Here */}
            <Breadcrumbs aria-label="breadcrumb" >
                <Typography component="h4" variant="h5" align="left" color="#fff" fontSize={20}>Support</Typography>
            </Breadcrumbs>
            {/* END Breadcrumbs Here */}
            {/* Start Breadcrumbs Skeleton Here */}
            <Stack spacing={1} sx={{display: 'none'}}>
                <Skeleton variant="text" animation="wave" width={180} height={25} />
            </Stack>
            {/* END Breadcrumbs Skeleton Here */}

            <Card sx={{mt:2, borderRadius:'7px'}}>
               <CardContent sx={{ padding: '24px'}} className={styles.CardContent}>
                    <Grid sx={{mt:'0px', borderRadius:'7px'}} container direction="row" rowSpacing={2} spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{paddingTop: '0!important'}}>
                            <List>
                                <ListItem>
                                    <ListItemAvatar sx={{position:'relative', top:'-30px'}} className={styles.RoomOutlinedIcon}>
                                        <Avatar sx={{bgcolor: 'rgb(227, 240, 245) !important'}}>
                                            <RoomOutlinedIcon sx={{color: '#015578'}} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="CONTACT INFO" secondary={
                                        <React.Fragment>
                                            <Typography component="span" variant="body2" color="#6c6c6c" mt={1} fontSize={15} display={'block'}>
                                            Detecon Al Saudia DETASAD Co. Ltd.</Typography>
                                            <Typography component="span" variant="body2" color="#6c6c6c" mt={1} fontSize={15} display={'block'}>
                                            P.O.Box 22135, Riyadh 11495, Kingdom of Saudi Arabia.</Typography>
                                        </React.Fragment>
                                    } />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{paddingTop: '0!important'}}>
                            <List>
                                <ListItem>
                                    <ListItemAvatar sx={{position:'relative', top:'-16px'}}>
                                        <Avatar sx={{bgcolor: 'rgb(227, 240, 245) !important'}}>
                                            <LocalPhoneOutlinedIcon sx={{color: '#015578'}} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="PHONE" secondary={
                                        <React.Fragment>
                                            <Typography component="span" variant="body2" color="#6c6c6c" mt={1} fontSize={15} display={'block'}>
                                            +966 92000 1221</Typography>
                                        </React.Fragment>
                                    } />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{paddingTop: '0!important'}}>
                            <List>
                                <ListItem>
                                    <ListItemAvatar sx={{position:'relative', top:'-16px'}}>
                                        <Avatar sx={{bgcolor: 'rgb(227, 240, 245) !important'}}>
                                            <LocalPrintshopOutlinedIcon sx={{color: '#015578'}} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="FAX" secondary={
                                        <React.Fragment>
                                            <Typography component="span" variant="body2" color="#6c6c6c" mt={1} fontSize={15} display={'block'}>
                                            +966 11 249 78 87</Typography>
                                        </React.Fragment>
                                    } />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{paddingTop: '0!important'}}>
                            <List>
                                <ListItem>
                                    <ListItemAvatar sx={{position:'relative', top:'-16px'}}>
                                        <Avatar sx={{bgcolor: 'rgb(227, 240, 245) !important'}}>
                                            <EmailOutlinedIcon sx={{color: '#015578'}} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="EMAIL" secondary={
                                        <React.Fragment>
                                            <Typography component="span" variant="body2" color="#6c6c6c" mt={1} fontSize={15} display={'block'}>
                                            detacloud@detasad.com</Typography>
                                        </React.Fragment>
                                    } />
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        </SurfaceLayout>
    );
};

export default Support;