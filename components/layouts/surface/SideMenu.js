import { useState, useEffect, useRef, useContext } from "react";
import Cookies from "js-cookie";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SurfaceHeader from "./Header";
import Image from "next/image";

import styles from "./SideMenu.module.css";
import Link from "next/link";

import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";

import { AuthProvider, useAuth } from "../../../utils/context/authContext";
import { useRouter } from "next/router";
import { DrawerContext } from "../../../pages/_app";

// ** Nav Styles
export const DetaNav = styled(List)({
  "& .MuiListItemButton-root": {
    "&:hover": {
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, .035)",
      borderRadius: "5px",
    },
    "&.Mui-selected": {
      width: "100%",
      color: "#fff",
      background: "linear-gradient(45deg,#013850,#0773a5)",
      borderRadius: "5px",
    },
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 20,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

export const drawerWidth = 250;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideMenu = ({ currentPage, children, setBackgrd }) => {
  const [enableMImanageinstance, setenableMImanageinstance] = useState(true);
  const [enableMIcreateinstance, setenableMIcreateinstance] = useState(true);
  const [enableMIprivatenetworks, setenableMIprivatenetworks] = useState(true);
  const [enableMIpublicips, setenableMIpublicips] = useState(true);
  const [enableMIinternetbandwidth, setenableMIinternetbandwidth] =
    useState(true);
  const [enableMIcurrentusage, setenableMIcurrentusage] = useState(true);
  const [enableMIinvoice, setenableMIinvoice] = useState(true);
  const [enableMIbsettings, setenableMIbsettings] = useState(true);
  const [enableMIaccount, setenableMIaccount] = useState(true);
  const [enableMIsecurity, setenableMIsecurity] = useState(true);
  const [enableMIsupport, setenableMIsupport] = useState(true);

  const [enableMIfirewall, setenableMIfirewall] = useState(true);
  const [enableMInat, setenableMInat] = useState(true);
  const [enableMIsecurityGroup, setenableMIsecurityGroup] = useState(true);

  const cookiesRole = Cookies.get("userRole");
  useEffect(() => {
    const cachDataRole = cookiesRole ? JSON.parse(cookiesRole) : false;
    if (cachDataRole) {
      setenableMImanageinstance(false);
      setenableMIcreateinstance(false);
      setenableMIprivatenetworks(false);
      setenableMIpublicips(false);
      setenableMIinternetbandwidth(false);
      setenableMIcurrentusage(false);
      setenableMIinvoice(false);
      setenableMIbsettings(false);
      setenableMIaccount(false);
      setenableMIsecurity(false);
      setenableMIsupport(false);

      setenableMIfirewall(false);
      setenableMIsecurityGroup(false);
      setenableMInat(false);
      console.log(cachDataRole.role);

      if (cachDataRole.role === "owner") {
        setenableMImanageinstance(true);
        setenableMIcreateinstance(true);
        setenableMIprivatenetworks(true);
        setenableMIpublicips(true);
        setenableMIinternetbandwidth(true);
        setenableMIcurrentusage(true);
        setenableMIinvoice(true);
        setenableMIbsettings(true);
        setenableMIaccount(true);
        setenableMIsecurity(true);
        setenableMIsupport(true);
        setenableMIfirewall(true);
        setenableMInat(true);
        setenableMIsecurityGroup(true);
      } else if (cachDataRole.role === "administrator") {
        setenableMImanageinstance(true);
        setenableMIcreateinstance(true);
        setenableMIprivatenetworks(true);
        setenableMIpublicips(true);
        setenableMIinternetbandwidth(true);
        setenableMIcurrentusage(true);
        setenableMIinvoice(true);
        setenableMIbsettings(true);
        setenableMIaccount(true);
        setenableMIsecurity(true);
        setenableMIsupport(true);
        setenableMIfirewall(true);
        setenableMIsecurityGroup(true);
        setenableMInat(true);
      } else if (cachDataRole.role === "operator") {
        setenableMImanageinstance(true);
        setenableMIaccount(true);
        setenableMIsecurity(true);
        setenableMIsupport(true);
      } else if (cachDataRole.role === "manager") {
        setenableMImanageinstance(true);
        setenableMIcreateinstance(true);
        setenableMIaccount(true);
        setenableMIsecurity(true);
        setenableMIsupport(true);
      } else if (cachDataRole.role === "billing admin") {
        setenableMIcurrentusage(true);
        setenableMIinvoice(true);
        setenableMIbsettings(true);
        setenableMIaccount(true);
        setenableMIsecurity(true);
        setenableMIsupport(true);
      }
    }
  }, [cookiesRole]);

  // Network Services Side Menu Dropdown
  const handleIPManageNestedClick = () => {
    setNestedIPManageOpen(!nestedIPManageOpen);
    setOpen(true);
    if (!open) {
      setNestedIPManageOpen(true);
    }
  };
  const [nestedIPManageOpen, setNestedIPManageOpen] = useState(true);

  // Network Security Side Menu Dropdown
  const handleNetworkSecurityNestedClick = () => {
    setNestedNetworkSecurityOpen(!nestedNetworkSecurityOpen);
    setOpen(true);
    if (!open) {
      setNestedNetworkSecurityOpen(true);
    }
  };
  const [nestedNetworkSecurityOpen, setNestedNetworkSecurityOpen] =
    useState(true);

  const [selectedIndex, setSelectedIndex] = useState(currentPage);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);

    // scrollPosition();
  };

  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  const {
    open,
    setOpen,
    mobileOpen,
    setMobileOpen,
    nestedOpen,
    setNestedOpen,
  } = useContext(DrawerContext);
  const router = useRouter();
  const cookies = Cookies.get("userMenuOpen");
  // useEffect(() => {
  //   if (cookies) {
  //     setOpen(true);
  //   } else {
  //     setOpen(false);
  //   }
  // }, []);
  // const drawerRef = useRef();

  // const getDrawer = Cookies.get("Drawer");
  // const scrollPosition = () => {
  //   Cookies.set("Drawer", drawerRef.current.scrollTop);
  // };
  // useEffect(() => {
  //   if (getDrawer) {
  //     drawerRef.current.scrollTop = getDrawer;
  //   }
  // }, [router.pathname]);

  // console.log("ERR", drawerRef?.current?.scrollTop);
  const [isloading, setisloading] = useState(false);
  const [isloadingLogo, setisloadingLogo] = useState(false);

  const handleDrawerOpen = () => {
    // Cookies.set("userMenuOpen", true);
    setOpen(true);
    setisloading(true);
    const timer = setTimeout(() => {
      setisloading(false);
    }, 50);
    return () => {
      clearTimeout(timer);
    };
  };
  const handleDrawerClose = () => {
    // Cookies.set("userMenuOpen", false);
    setOpen(false);
    setisloadingLogo(true);
    const timer = setTimeout(() => {
      setisloadingLogo(false);
    }, 50);
    return () => {
      clearTimeout(timer);
    };
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SurfaceHeader
        currentPage={currentPage}
        handleDrawerToggle={handleDrawerToggle}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
      />

      <Box
        component="main"
        sx={
          setBackgrd
            ? {
                position: "relative",
                width: "100%",
                height: "185px",
                flexGrow: 1,
                p: 3,
                background:
                  "linear-gradient(45deg, #013850, #0773a5) !important",
              }
            : { flexGrow: 1, p: 3 }
        }
      >
        <DrawerHeader />

        <Box sx={{ minHeight: "100vh" }}>{children}</Box>
        {/* footer */}
        {currentPage != 1 && (
          <Box component="footer" className={styles.CommonFooter}>
            <Box component="div" className={styles.FooterContent}>
              <Typography
                component="h4"
                variant="h5"
                align="left"
                fontSize={16}
              >
                © 2023 DETASAD All rights reserved.
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SideMenu;
