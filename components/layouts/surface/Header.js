import React, { useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../../utils/context/authContext";
import Cookies from "js-cookie";
import { styled, useTheme, alpha } from "@mui/material/styles";
import { Button, Divider } from "@mui/material";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Menu from "@mui/material/Menu";
import styles from "./SideMenu.module.css";
import Image from "next/image";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { useClientIP } from "../../../utils/context/ClientIPContext";

import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";

import axios from "axios";
import { DrawerContext } from "../../../pages/_app";

const drawerWidth = 230;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, aisxs, aissm }) => ({
  zIndex: theme.zIndex.drawer,
  //zIndex: theme.zIndex.drawer +1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: "linear-gradient(45deg, #013850, #0773a5)",
  color: "#fff",
  ...(open && {
    marginLeft: drawerWidth,
    width:
      aisxs == "true" || aissm == "true"
        ? "100%"
        : `calc(100% - ${drawerWidth}px)`, // Apply the condition here
    //width: `calc(100% - ${drawerWidth}px)`,
    //width:"100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// ** Appbar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "auto",
  },
}));
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#00e676",
    color: "#00e676",
    boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "0.2px solid currentColor",
      content: '""',
    },
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60ch",
    },
  },
}));

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 7,
    marginTop: theme.spacing(1),
    minWidth: 130,
    color: "#000",

    [theme.breakpoints.down("600")]: {
      // TR 01
      top: "0 !important",
      marginTop: "7px",
    },
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 10px 15px -3px, rgba(0, 0, 0, 0.02) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "10px 0",
    },
  },
  "& .MuiMenuItem-root": {
    "& .MuiSvgIcon-root": {
      fontSize: 22,
      color: "#757575",
      marginRight: theme.spacing(1.5),
    },
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const SurfaceHeader = ({
  currentPage,
  handleDrawerToggle,
  handleDrawerClose,
  handleDrawerOpen,
  // open,
}) => {
  const { clientIP } = useClientIP();

  const [enableCreateIns, setenableCreateIns] = useState(currentPage !== 1);

  const theme = useTheme();

  const isxs = useMediaQuery(theme.breakpoints.only("xs"));
  const issm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  const cookies = Cookies.get("userData");
  const cachData = cookies ? JSON.parse(cookies) : true;
  const [scaches, setscaches] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    const scachData = cookies ? JSON.parse(cookies) : true;
    if (scachData) {
      setscaches(scachData);
    }
  }, [cookies]);

  async function logoutSurHead() {
    Cookies.remove("userRole");
    logout();
    const newData = {
      userName: scaches.email,
      accessToken: scaches.accessToken,
      social_login: "0",
      ipAddress: clientIP,
    };
    const finalData = { data: newData, endPoint: "logoutUser" };
    try {
      const { data } = await axios.post("/api/logout", finalData); // call the new API route
      console.log(data);
      if (data.status_code == "700") {
        // Cookies.remove("userRole");
        //logout();
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  }

  useEffect(() => {
    if (isxs || issm) {
      handleDrawerClose();
    }
  }, [isxs, issm]);

  // Appbar
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreenClick = () => {
    if (!isFullScreen) {
      // Enter full screen
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      // Exit full screen if currently in full-screen mode
      if (
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      ) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }

    setIsFullScreen(!isFullScreen);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <StyledMenu
      sx={{ top: "30px" }}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link className={styles.NavLink} href="/surface/settings/account">
        <MenuItem onClick={handleMenuClose} sx={{ color: "#757575" }}>
          <Person2OutlinedIcon />{" "}
          <Box component="div">
            {cachData.email}
            <Box component="div" sx={{ color: "#0072A3", fontSize: "0.9rem" }}>
              {cachData.role_name}
            </Box>
          </Box>{" "}
        </MenuItem>

        <Divider />
      </Link>
      <MenuItem onClick={logoutSurHead} sx={{ color: "#757575" }}>
        <LogoutOutlinedIcon /> Logout
      </MenuItem>
    </StyledMenu>
  );
  const { open } = useContext(DrawerContext);
  return (
    <>
      <CssBaseline />

      <AppBar
        position="fixed"
        open={open}
        aisxs={isxs.toString()}
        aissm={issm.toString()}
        sx={{ zIndex: "3 !important" }}
      >
        <Toolbar>
          <DrawerHeader className={styles.drawerheaderleft}>
            {(isxs || issm) && (
              <Image
                onClick={handleDrawerToggle}
                src="/images/pages/common/cloud-icon.png"
                alt="Logo"
                width={40}
                height={40}
              />
            )}

            {!open && (
              <span
                className={styles.headerSpan}
                style={{
                  display: "inline-block",
                  height: "35px",
                  width: "35px",
                  backgroundColor: "transparent",
                }}
              ></span>
            )}
          </DrawerHeader>

          {/* <Search
            style={{
              marginLeft: !open && !isxs && !issm ? "10px" : "0",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Explore Detacloud"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex" }, marginTop: "3px" }}>
            {enableCreateIns ? (
              <Link
                className={styles.NavLink}
                href="/surface/clouds/elasticins/create"
                passHref
                style={{
                  display:
                    cachData.role_name == "operator" ||
                    cachData.role_name == "billing admin"
                      ? "none"
                      : "block",
                }}
                title="link to c- instance page"
              >
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  sx={{ color: "#fff" }}
                >
                  <Box
                    component="img"
                    width={24}
                    height={24}
                    align="center"
                    alt="createvm"
                    src="/images/pages/common/createvm.png"
                  />
                </IconButton>
              </Link>
            ) : (
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                sx={{ cursor: "not-allowed", color: "#fff" }}
                style={{
                  display:
                    cachData.role_name == "operator" ||
                    cachData.role_name == "billing admin"
                      ? "none"
                      : "block",
                }}
              >
                <Box
                  component="img"
                  width={24}
                  height={24}
                  align="center"
                  alt="createvm"
                  src="/images/pages/common/createvm.png"
                />
              </IconButton>
            )}

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{ color: "#fff" }}
              onClick={handleFullScreenClick}
              title="Maximization page"
            >
              <AspectRatioIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{ color: "#fff" }}
              title={"notification"}
            >
              <NotificationsIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ color: "#fff" }}
              title={"profile"}
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <AccountCircle />
              </StyledBadge>
              {/* </Badge> */}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
};

export default SurfaceHeader;
