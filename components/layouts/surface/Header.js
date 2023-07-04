import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../../utils/context/authContext';
import Cookies from 'js-cookie';
import { styled, useTheme,alpha } from '@mui/material/styles';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Menu from '@mui/material/Menu';
import styles from './SideMenu.module.css';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const drawerWidth = 230;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer ,
  //zIndex: theme.zIndex.drawer +1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: 'linear-gradient(45deg, #013850, #0773a5)', color: '#fff',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


// ** Appbar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(0),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '60ch',
    },
  },
}));


const StyledMenu = styled((props) => (
  <Menu elevation={0} anchorOrigin={{ 
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 7,
    marginTop: theme.spacing(1),
    minWidth: 130,
    color: '#000',
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 10px 15px -3px, rgba(0, 0, 0, 0.02) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '10px 0',
    },
  },
  '& .MuiMenuItem-root': {
    '& .MuiSvgIcon-root': {
      fontSize: 22,
      color: '#757575',
      marginRight: theme.spacing(1.5),
    },
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const SurfaceHeader = ({ handleDrawerClose,handleDrawerOpen, open }) => {
  const theme = useTheme();
  const { logout } = useAuth();
  function logoutSurHead(){
    Cookies.remove('userRole');
    logout();
    
  }


  // Appbar
const [anchorEl, setAnchorEl] = useState(null);
const isMenuOpen = Boolean(anchorEl);
const handleProfileMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleMenuClose = () => {
  setAnchorEl(null);
};
const menuId = 'primary-search-account-menu';
const renderMenu = (
  <StyledMenu sx={{top:'52px'}} anchorEl={anchorEl} anchorOrigin={{vertical: 'top', horizontal: 'right',}}
    id={menuId} keepMounted transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={isMenuOpen} onClose={handleMenuClose} >
    <MenuItem onClick={handleMenuClose} sx={{color:'#757575'}}><Person2OutlinedIcon /> Profile</MenuItem>
    <MenuItem onClick={logoutSurHead} sx={{color:'#757575'}}><LogoutOutlinedIcon />  Logout</MenuItem>
  </StyledMenu>
);
 

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar>
        <DrawerHeader  className={styles.drawerheaderleft}>
      {
            !open && 
            <span onClick={handleDrawerOpen} style={{ display: 'inline-block', height: '35px', width: '35px', backgroundColor: 'transparent' }}></span>
      
      }

     

        
      </DrawerHeader>

        <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'flex'}, marginTop:'3px' }}>
              <IconButton size="large" aria-label="show 17 new notifications" sx={{color: '#fff'}}>
                <NotificationsIcon />
              </IconButton>
              <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick= 
              {handleProfileMenuOpen} sx={{color: '#fff'}}>
                <AccountCircle />
              </IconButton>
            </Box>
          
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
};

export default SurfaceHeader;
