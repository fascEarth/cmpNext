import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SurfaceHeader from './Header';
import Image from 'next/image';

import styles from './SideMenu.module.css';
import Link from 'next/link';

import useMediaQuery from '@mui/material/useMediaQuery';

// ** Nav Styles
const DetaNav = styled(List) ({
  '& .MuiListItemButton-root': {
    '&:hover': {
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, .035)',
      borderRadius: '5px',
    },
    '&.Mui-selected': {
      width: '100%',
      color: '#fff',
      background: 'linear-gradient(45deg,#013850,#0773a5)',
      borderRadius: '5px',
    },
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 20,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

const drawerWidth = 230;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const SideMenu = ({ currentPage, children, setBackgrd }) => {

 


  
  const [selectedIndex, setSelectedIndex] = useState(currentPage);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const isSm = useMediaQuery(theme.breakpoints.only('sm'));
    const isMd = useMediaQuery(theme.breakpoints.only('md'));
    const isLg = useMediaQuery(theme.breakpoints.only('lg'));
    const isXl = useMediaQuery(theme.breakpoints.only('xl'));

    const [open, setOpen] = useState(true);
    const [nestedOpen, setNestedOpen] = useState(true);

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleNestedClick = () => {
        setNestedOpen(!nestedOpen);
      };
      

      const boxStyles = {
        
        display: { xs: 'none', sm: 'none', md: 'block' },
        
      };

      

      const CommonMmenu = () => (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', pl:1, pr:1, // Hide overflow by default
            '&:hover': {
              overflow: 'auto', // Show overflow when hovering over the side menu
            },
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f5f5f5',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#bdbdbd',
              borderRadius: '4px',
              '&:hover': {
                background: '#a5a5a5',
              },
            },
          }}
        >
        <Divider />
          { open && 
            <Divider textAlign="left" sx={{fontSize: '14px', color: '#969696', mt: 2,}}>CLOUD SERVICES</Divider>
          }
          <DetaNav component="nav" aria-labelledby="nested-list-subheader">
            <List className={styles.listContainer}>
              <ListItemButton onClick={handleNestedClick} id="collapsableEI" >
                <ListItemIcon>
                  <Box component="img" width={20} height={20} align="center" alt="elastic-instance" 
                    src="/images/pages/common/navicon/darkicon/ElasticInstance.svg" />
                </ListItemIcon>
                <ListItemText primary="Elastic Instance" />
                {nestedOpen ? <ExpandMoreIcon />: <ChevronRightIcon />}
              </ListItemButton>
              <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link className={styles.NavLink} href="/surface/clouds/elasticins/manage/list">
                  <ListItemButton sx={{ pl: '16px' }} selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event,           0)}>             
                    <ListItemIcon sx={{paddingLeft: '6px'}}>
                      { selectedIndex === 0 ? <Box component="img" width={7} height={7} align="center" alt="elastic-instance" 
                            src="/images/pages/common/navicon/lighticon/dot.svg" />
                            :
                            <Box component="img" width={7} height={7} align="center" alt="elastic-instance" 
                            src="/images/pages/common/navicon/darkicon/dot.svg" /> 
                      } 
                    </ListItemIcon>
                    <ListItemText primary="Manage Instance" sx={{paddingLeft: '6px'}} />
                  </ListItemButton>
                  </Link>
                  <Link className={styles.NavLink} href="/surface/clouds/elasticins/create">
                  <ListItemButton sx={{ pl: '16px' }} selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                    <ListItemIcon sx={{paddingLeft: '6px'}}>
                      { selectedIndex === 1 ? <Box component="img" width={7} height={7} align="center" alt="Create-instance" 
                            src="/images/pages/common/navicon/lighticon/dot.svg" />
                            :
                            <Box component="img" width={7} height={7} align="center" alt="Create-instance" 
                            src="/images/pages/common/navicon/darkicon/dot.svg" /> 
                      } 
                    </ListItemIcon>
                    <ListItemText primary="Create Instance" sx={{paddingLeft: '6px'}} />
                  </ListItemButton>
                  </Link>
                </List>
              </Collapse>
            </List>
            { open && 
              <Divider textAlign="left" sx={{fontSize: '14px', color: '#969696', mt: 2, mb: 1}}>NETWORK SERVICES</Divider>
            }
            <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
              <ListItemIcon>
                { selectedIndex === 2 ? <Box component="img" width={20} height={20} align="center" alt="Networks" 
                  src="/images/pages/common/navicon/lighticon/PrivateNetworks.svg" />
                  :
                  <Box component="img" width={20} height={20} align="center" alt="Networks" 
                  src="/images/pages/common/navicon/darkicon/PrivateNetworks.svg" /> 
                }
              </ListItemIcon>
              <ListItemText primary="Private Networks" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
              <ListItemIcon>
                { selectedIndex === 3 ? <Box component="img" width={20} height={20} align="center" alt="Bandwidth" 
                  src="/images/pages/common/navicon/lighticon/InternetBandwidth.svg" />
                  :
                  <Box component="img" width={20} height={20} align="center" alt="Bandwidth" 
                  src="/images/pages/common/navicon/darkicon/InternetBandwidth.svg" /> 
                }
              </ListItemIcon>
              <ListItemText primary="Internet Bandwidth" />
            </ListItemButton>
            { open && 
              <Divider textAlign="left" sx={{fontSize: '14px', color: '#969696', mt: 2, mb: 1}}>BILLING</Divider>
            }
            <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
              <ListItemIcon>
                { selectedIndex === 4 ? <Box component="img" width={20} height={20} align="center" alt="CurrentUsage" 
                  src="/images/pages/common/navicon/lighticon/CurrentUsage.svg" />
                  :
                  <Box component="img" width={20} height={20} align="center" alt="CurrentUsage" 
                  src="/images/pages/common/navicon/darkicon/CurrentUsage.svg" /> 
                }
              </ListItemIcon>
              <ListItemText primary="Current Usage" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 5} onClick={(event) => handleListItemClick(event, 5)}>
              <ListItemIcon>
                { selectedIndex === 5 ? <Box component="img" width={20} height={20} align="center" alt="Invoice" 
                      src="/images/pages/common/navicon/lighticon/Invoice.svg" />
                      :
                      <Box component="img" width={20} height={20} align="center" alt="Invoice" 
                      src="/images/pages/common/navicon/darkicon/Invoice.svg" /> 
                    }
              </ListItemIcon>
              <ListItemText primary="Invoice" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 6} onClick={(event) => handleListItemClick(event, 6)}>
              <ListItemIcon>
                { selectedIndex === 6 ? <Box component="img" width={20} height={20} align="center" alt="Billing" 
                      src="/images/pages/common/navicon/lighticon/Payment.svg" />
                      :
                      <Box component="img" width={20} height={20} align="center" alt="Billing" 
                      src="/images/pages/common/navicon/darkicon/Payment.svg" /> 
                    }
              </ListItemIcon>
              <ListItemText primary="Billing Settings" />
            </ListItemButton>
            { open && 
              <Divider textAlign="left" sx={{fontSize: '14px', color: '#969696', mt: 2, mb: 1}}>SETTINGS</Divider>
            }
            <ListItemButton selected={selectedIndex === 7} onClick={(event) => handleListItemClick(event, 7)}>
              <ListItemIcon>
                { selectedIndex === 7 ? <Box component="img" width={20} height={20} align="center" alt="Account" 
                      src="/images/pages/common/navicon/lighticon/Account.svg" />
                      :
                      <Box component="img" width={20} height={20} align="center" alt="Account" 
                      src="/images/pages/common/navicon/darkicon/Account.svg" /> 
                    }
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 8} onClick={(event) => handleListItemClick(event, 8)}>
              <ListItemIcon>
                { selectedIndex === 8 ? <Box component="img" width={20} height={20} align="center" alt="Security" 
                      src="/images/pages/common/navicon/lighticon/Shield.svg" />
                      :
                      <Box component="img" width={20} height={20} align="center" alt="Security" 
                      src="/images/pages/common/navicon/darkicon/Shield.svg" /> 
                    }
              </ListItemIcon>
              <ListItemText primary="Security" />
            </ListItemButton>
            { open && 
              <Divider textAlign="left" sx={{fontSize: '14px', color: '#969696', mt: 2, mb: 1}}>MISC</Divider>
            }
            <ListItemButton selected={selectedIndex === 9} onClick={(event) => handleListItemClick(event, 9)}>
              <ListItemIcon> 
                { selectedIndex === 9 ? <Box component="img" width={20} height={20} align="center" alt="Support" 
                      src="/images/pages/common/navicon/lighticon/Support.svg" />
                      :
                      <Box component="img" width={20} height={20} align="center" alt="Support" 
                      src="/images/pages/common/navicon/darkicon/Support.svg" /> 
                    }
              </ListItemIcon>
              <ListItemText primary="Support" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 10} onClick={(event) => handleListItemClick(event, 10)}>
              <ListItemIcon>
                <Box component="img" width={20} height={20} align="center" alt="FAQ" 
                src="/images/pages/common/navicon/darkicon/Faq.svg" />
              </ListItemIcon>
              <ListItemText primary="FAQ" />
            </ListItemButton>
          </DetaNav>
        </Box>
      );


      const [mobileOpen, setMobileOpen] = useState(false);

      const handleDrawerToggle = () => {
        
        setMobileOpen(!mobileOpen);
      };


  return (
   
    <Box  sx={{ display: 'flex' }}>
      <SurfaceHeader handleDrawerToggle={handleDrawerToggle} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} open={open} />
      
      <MuiDrawer
          anchor={'left'}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          
          ModalProps={{
            keepMounted: false, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            
          }}
        >
           <Box  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: 1, }} >
        <DrawerHeader>
        <Image src="/images/pages/common/cloud-icon.png" alt="Logo"  width={40} height={40} />
        <Image src="/images/pages/common/deta-cloud-logo.png" className={styles.logoimage} alt="Logo"  width= 
               {150} height={25} />
                
          </DrawerHeader>

        </Box>
        
          <CommonMmenu />
           </MuiDrawer>
           
      <Drawer variant="permanent" open={open} sx={boxStyles}>
        <Box  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: 1, }} >
        <DrawerHeader>
            {
              open ?
              <Image src="/images/pages/common/deta-cloud-logo.png" className={styles.logoimage} alt="Logo" onClick={handleDrawerClose} width= 
               {150} height={25} />
              :
              <Image src="/images/pages/common/cloud-icon.png" alt="Logo" onClick={handleDrawerOpen} width={40} height={40} />
            }
            {
              open &&
              <IconButton sx={{ left: '6px' }} onClick={handleDrawerClose}>{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} 
              </IconButton>
            }
          </DrawerHeader>

        </Box>
        <CommonMmenu />
      </Drawer>
      
      <Box component="main"  sx={setBackgrd ? {  position: 'relative',
    width: '100%',
    height: '185px', flexGrow: 1, p: 3, background: 'linear-gradient(45deg, #013850, #0773a5) !important' }  :{ flexGrow: 1, p: 3} }  >
        <DrawerHeader />
        
        <div >{children}</div>
      </Box>
    </Box>

  );
};

export default SideMenu;