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
const drawerWidth = 240;

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


const SideMenu = ({ currentPage, children }) => {
  console.log(currentPage);
  const [selectedIndex, setSelectedIndex] = useState(currentPage);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

    const theme = useTheme();
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
      
  return (
   
    <Box sx={{ display: 'flex' }}>
    <SurfaceHeader handleDrawerOpen={handleDrawerOpen} open={open} />
    <Drawer variant="permanent" open={open}  >
    
      <DrawerHeader>
      {
            open ?
            <img  onClick={handleDrawerClose} className={styles.logoimage}  src="/images/pages/common/deta-cloud-logo.png" alt="Logo" />
      
      :
      <img onClick={handleDrawerOpen} height="35" src="/images/pages/common/cloud-icon.png" alt="Logo" />
      
      }

      {
            open &&
            <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
            
            
            
          }

        
      </DrawerHeader>

      <Divider />

          {
            open && <Divider textAlign="left" sx={{fontSize: '14px', color: '#969696', mt: 2,}}>CLOUD SERVICES</Divider>
          }
      

      
      <List>
          <ListItemButton onClick={handleNestedClick}>
            <ListItemIcon>
            <Box component="img" width={20} height={20} align="center" alt="elastic-instance" 
                  src="/images/pages/common/navicon/darkicon/ElasticInstance.svg" />
            </ListItemIcon>
            <ListItemText primary="Elastic Instance" />
            {nestedOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <Link className={styles.NavLink} href="/surface/clouds/elasticins/manage/list">
              <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 
                      0)}>
                        
                <ListItemIcon>
                <Box component="img" width={7} height={7} align="center" alt="elastic-instance" 
                        src="/images/pages/common/navicon/darkicon/dot.svg" />
                </ListItemIcon>
                <ListItemText primary="Manage Instance" />
                
              </ListItemButton>
              </Link>
              <Link className={styles.NavLink} href="/surface/clouds/elasticins/create">
              <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 
                      1)}>
                <ListItemIcon>
                <Box component="img" width={7} height={7} align="center" alt="elastic-instance" 
                        src="/images/pages/common/navicon/darkicon/dot.svg" />
                </ListItemIcon>
                <ListItemText primary="Create Instance" />
              </ListItemButton>
              </Link>
            </List>
          </Collapse>
        </List>
        {
            open && 
        <Divider textAlign="left" sx={{fontSize: '14px', color: '#969696', mt: 2, mb: 1}}>NETWORK SERVICES</Divider>
        }
                <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
                  <ListItemIcon>
                    <Box component="img" width={20} height={20} align="center" alt="Networks" 
                    src="/images/pages/common/navicon/darkicon/PrivateNetworks.svg" />
                  </ListItemIcon>
                  <ListItemText primary="Private Networks" />
                </ListItemButton>
              
                <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
                  <ListItemIcon>
                    <Box component="img" width={20} height={20} align="center" alt="Bandwidth" 
                    src="/images/pages/common/navicon/darkicon/InternetBandwidth.svg" />
                  </ListItemIcon>
                  <ListItemText primary="Internet Bandwidth" />
                </ListItemButton>
                {
            open && 
              <Divider textAlign="left" sx={{fontSize: '14px', color: '#969696', mt: 2, mb: 1}}>BILLING</Divider>
                }
                <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
                  <ListItemIcon>
                    <Box component="img" width={20} height={20} align="center" alt="CurrentUsage" 
                    src="/images/pages/common/navicon/darkicon/CurrentUsage.svg" />
                  </ListItemIcon>
                  <ListItemText primary="Current Usage" />
                </ListItemButton>
              
              
                <ListItemButton selected={selectedIndex === 5} onClick={(event) => handleListItemClick(event, 5)}>
                  <ListItemIcon>
                    <Box component="img" width={20} height={20} align="center" alt="Invoice" 
                    src="/images/pages/common/navicon/darkicon/Invoice.svg" />
                  </ListItemIcon>
                  <ListItemText primary="Invoice" />
                </ListItemButton>

              
                <ListItemButton selected={selectedIndex === 6} onClick={(event) => handleListItemClick(event, 6)}>
                  <ListItemIcon>
                    <Box component="img" width={20} height={20} align="center" alt="Billing" 
                    src="/images/pages/common/navicon/darkicon/Payment.svg" />
                  </ListItemIcon>
                  <ListItemText primary="Billing Settings" />
                </ListItemButton>
                {
            open && 
              <Divider textAlign="left" sx={{fontSize: '14px', color: '#969696', mt: 2, mb: 1}}>SETTINGS</Divider>
                }

                <ListItemButton selected={selectedIndex === 7} onClick={(event) => handleListItemClick(event, 7)}>
                  <ListItemIcon>
                    <Box component="img" width={20} height={20} align="center" alt="Account" 
                    src="/images/pages/common/navicon/darkicon/Account.svg" />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </ListItemButton>
              
              
                <ListItemButton selected={selectedIndex === 8} onClick={(event) => handleListItemClick(event, 8)}>
                  <ListItemIcon>
                    <Box component="img" width={20} height={20} align="center" alt="Security" 
                    src="/images/pages/common/navicon/darkicon/Shield.svg" />
                  </ListItemIcon>
                  <ListItemText primary="Security" />
                </ListItemButton>
              
                {
            open && 
              <Divider textAlign="left" sx={{fontSize: '14px', color: '#969696', mt: 2, mb: 1}}>MISC</Divider>
                }

                <ListItemButton selected={selectedIndex === 9} onClick={(event) => handleListItemClick(event, 9)}>
                  <ListItemIcon> 
                    <Box component="img" width={20} height={20} align="center" alt="Support" 
                    src="/images/pages/common/navicon/darkicon/Support.svg" />
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
              
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <div >{children}</div>
      </Box>
    </Box>
  );
};

export default SideMenu;
