import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
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
import Image from "next/image";
import MuiDrawer from "@mui/material/Drawer";

import styles from "./SideMenu.module.css";
import Link from "next/link";

import { useRouter } from "next/router";
import { DetaNav, Drawer, DrawerHeader } from "./SideMenu";
import { useTheme } from "@mui/material/styles";
import { DrawerContext } from "../../../pages/_app";

export default function DrawerMenus() {
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
  const {
    open,
    setOpen,
    mobileOpen,
    setMobileOpen,
    nestedOpen,
    setNestedOpen,
  } = useContext(DrawerContext);

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

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);

    // scrollPosition();
  };

  const boxStyles = {
    display: { xs: "none", sm: "none", md: "block" },
  };

  //   const [open, setOpen] = useState(true);
  const router = useRouter();
  // const cookies = Cookies.get("userMenuOpen");
  useEffect(() => {
    Cookies.set("userMenuOpen", true);
    handleDrawerOpen();
  }, []);
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
  const [selectedMenu, setselectedMenu] = useState("");
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
    }, 30);
    return () => {
      clearTimeout(timer);
    };
  };

  const handleNestedClick = () => {
    setNestedOpen(!nestedOpen);
    setOpen(true);
    if (!open) {
      setNestedOpen(true);
    }
  };
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const DRAWER_MENUS = [
    {
      title: "CLOUD SERVICES",
      visible: enableMImanageinstance || enableMIcreateinstance,
      dropDown: [
        {
          name: "Elastic Instance",
          icon: "/images/pages/common/navicon/darkicon/ElasticInstance.svg",
          nestedDropDown: [
            {
              title: "Manage Instance",
              to: "/surface/clouds/elasticins/manage/list",
              visible: enableMImanageinstance,
            },
            {
              title: "Create Instance",
              to: "/surface/clouds/elasticins/create",
              visible: enableMIcreateinstance,
            },
          ],
        },
      ],
    },
    {
      title: "NETWORK SERVICES",
      visible:
        enableMIprivatenetworks ||
        enableMIpublicips ||
        enableMIinternetbandwidth ||
        enableMIfirewall ||
        enableMInat,
      dropDown: [
        {
          name: "IP Management",
          icon: "/images/pages/common/navicon/darkicon/ipmanagement.svg",
          nestedDropDown: [
            {
              title: "Private Networks",
              to: "/surface/networks/privatenet/list",
              visible: enableMIprivatenetworks,
            },
            {
              title: "Public IPs",
              to: "/surface/networks/publicips",
              visible: enableMIpublicips,
            },
          ],
        },
        {
          name: "Network Security",
          icon: "/images/pages/common/navicon/darkicon/PrivateNetworks.svg",
          nestedDropDown: [
            {
              title: "Firewall",
              to: "/surface/networks/networksecurity/firewall",
              visible: enableMIfirewall,
            },
            {
              title: "NAT",
              to: "/surface/networks/networksecurity/nat",
              visible: enableMInat,
            },
            {
              title: "Security Group",
              to: "/surface/networks/networksecurity/securitygroup",
              visible: enableMIsecurityGroup,
            },
          ],
        },
        {
          name: "Internet Bandwidth",
          nestedDropDown: [],
          to: "/surface/networks/internetbw",
          visible: enableMIinternetbandwidth,
          icon: "/images/pages/common/navicon/darkicon/InternetBandwidth.svg",
          selectedIcon:
            "/images/pages/common/navicon/lighticon/InternetBandwidth.svg",
        },
      ],
    },
    {
      title: "BILLING",
      visible: enableMIcurrentusage || enableMIinvoice || enableMIbsettings,
      dropDown: [
        {
          name: "Current Usage",
          nestedDropDown: [],
          to: "/surface/billing/currentusage",
          visible: enableMIcurrentusage,
          icon: "/images/pages/common/navicon/darkicon/CurrentUsage.svg",
          selectedIcon:
            "/images/pages/common/navicon/lighticon/CurrentUsage.svg",
        },
        {
          name: "Invoices",
          nestedDropDown: [],
          to: "/surface/billing/invoice",
          visible: enableMIinvoice,
          icon: "/images/pages/common/navicon/darkicon/Invoice.svg",
          selectedIcon: "/images/pages/common/navicon/lighticon/Invoice.svg",
        },
        {
          name: "Billing Settings",
          nestedDropDown: [],
          to: "/surface/billing/bsettings",
          visible: enableMIbsettings,
          icon: "/images/pages/common/navicon/darkicon/Payment.svg",
          selectedIcon: "/images/pages/common/navicon/lighticon/Payment.svg",
        },
      ],
    },
    {
      title: "SETTINGS",
      visible: enableMIaccount || enableMIsecurity,
      dropDown: [
        {
          name: "Account",
          nestedDropDown: [],
          to: "/surface/settings/account",
          visible: enableMIaccount,
          icon: "/images/pages/common/navicon/darkicon/Account.svg",
          selectedIcon: "/images/pages/common/navicon/lighticon/Account.svg",
        },
        {
          name: "Security",
          nestedDropDown: [],
          to: "/surface/settings/security",
          visible: enableMIsecurity,
          icon: "/images/pages/common/navicon/darkicon/Shield.svg",
          selectedIcon: "/images/pages/common/navicon/lighticon/Shield.svg",
        },
      ],
    },
    {
      title: "MISC",
      visible: true,
      dropDown: [
        {
          name: "Support",
          nestedDropDown: [],
          to: "/surface/misc/support",
          visible: enableMIsupport,
          icon: "/images/pages/common/navicon/darkicon/Support.svg",
          selectedIcon: "/images/pages/common/navicon/lighticon/Support.svg",
        },
        {
          name: "FAQ",
          nestedDropDown: [],
          to: "",
          visible: true,
          icon: "/images/pages/common/navicon/darkicon/Faq.svg",
          selectedIcon: "/images/pages/common/navicon/darkicon/Faq.svg",
        },
      ],
    },
  ];

  const [menuStates, setMenuStates] = useState(
    DRAWER_MENUS.map((menu) => ({
      // isOpen: true,
      subMenuStates: menu.dropDown.map(() => true),
    }))
  );

  // const toggleMenu = (index) => {
  //   const updatedStates = [...menuStates];
  //   updatedStates[index].isOpen = !updatedStates[index].isOpen;
  //   setMenuStates(updatedStates);
  // };

  const toggleSubMenu = (menuIndex, subMenuIndex) => {
    const updatedStates = [...menuStates];
    updatedStates[menuIndex].subMenuStates[subMenuIndex] =
      !updatedStates[menuIndex].subMenuStates[subMenuIndex];
    setMenuStates(updatedStates);
  };

  const getSelectedDrawerItem = (array, pathname) => {
    if (
      pathname === "/surface/clouds/elasticins/manage/detail/[slug]" ||
      pathname === "/surface/clouds/elasticins/manage/list"
    ) {
      return "Manage Instance";
    }
    if (
      pathname === "/surface/networks/privatenet/detail/[slug]" ||
      pathname === "/surface/networks/privatenet/list"
    ) {
      return "Private Networks";
    }
    return array.find((item) => item.to === pathname)?.title;
  };
  return (
    <>
      <Drawer variant="permanent" open={open} sx={boxStyles}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: 1,
          }}
        >
          <DrawerHeader>
            {open && (
              <Image
                hidden={!open}
                src="/images/pages/common/deta-cloud-logo.png"
                className={styles.logoimage}
                alt="Logo"
                onClick={handleDrawerClose}
                width={170}
                height={30}
                style={{
                  display: isloading ? "none" : "block",
                }}
              />
            )}
            {!open && (
              <Image
                hidden={open}
                src="/images/pages/common/cloud-icon.png"
                alt="Logo"
                onClick={handleDrawerOpen}
                width={40}
                height={40}
                style={{
                  display: isloadingLogo ? "none" : "block",
                }}
              />
            )}
            {open && (
              <IconButton sx={{ left: "6px" }} onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            )}
          </DrawerHeader>
        </Box>
        {/* <CommonMmenu /> */}
        <Box
          // ref={drawerRef}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            pl: 1,
            pr: 1, // Hide overflow by default
            "&:hover": {
              overflowY: "auto", // Show overflow when hovering over the side menu
            },
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f5f5f5",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#bdbdbd",
              borderRadius: "4px",
              "&:hover": {
                background: "#a5a5a5",
              },
            },
          }}
        >
          <Divider />

          <DetaNav component="nav" aria-labelledby="nested-list-subheader">
            {DRAWER_MENUS.map((item, index) => {
              const menuState = menuStates[index];
              // if (!item.visible) {
              //   return null;
              // }

              return (
                <div key={index}>
                  {item.visible && (
                    <>
                      {open && (
                        <Divider
                          textAlign="left"
                          sx={{
                            fontSize: "14px",
                            color: "#969696",
                            mt: 2,
                            mb: 1,
                          }}
                        >
                          {item.title}
                        </Divider>
                      )}

                      <List className={styles.listContainer}>
                        {item.dropDown.map((dropDownItem, dropDownIndex) => {
                          const subMenuState =
                            menuState.subMenuStates[dropDownIndex];

                          return (
                            <div key={dropDownIndex}>
                              {dropDownItem.nestedDropDown.length > 0 ? (
                                <ListItemButton
                                  key={dropDownIndex}
                                  {...(!open && {
                                    style: { width: "50px", height: "50px" },
                                  })}
                                  onClick={() => {
                                    if (!open) {
                                      setOpen(!open);
                                    } else {
                                      toggleSubMenu(index, dropDownIndex);
                                    }
                                  }}
                                  id="collapsableEI"
                                >
                                  <ListItemIcon>
                                    <Box
                                      component="img"
                                      width={20}
                                      height={20}
                                      align="center"
                                      alt="elastic-instance"
                                      src={dropDownItem.icon}
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    hidden={!open}
                                    primary={dropDownItem.name}
                                  />
                                  {open &&
                                    (subMenuState ? (
                                      <ExpandMoreIcon />
                                    ) : (
                                      <ChevronRightIcon />
                                    ))}
                                </ListItemButton>
                              ) : (
                                <Link
                                  className={styles.NavLink}
                                  href={dropDownItem.to}
                                  passHref
                                >
                                  <ListItemButton
                                    {...(!open && {
                                      style: {
                                        width: "50px",
                                        height: "50px",
                                      },
                                    })}
                                    selected={
                                      router.pathname === dropDownItem.to
                                    }
                                    onClick={(event) =>
                                      handleListItemClick(event, 3)
                                    }
                                  >
                                    <ListItemIcon>
                                      {router.pathname === dropDownItem.to ? (
                                        <Box
                                          component="img"
                                          width={20}
                                          height={20}
                                          align="center"
                                          alt="Bandwidth"
                                          src={dropDownItem.selectedIcon}
                                        />
                                      ) : (
                                        <Box
                                          component="img"
                                          width={20}
                                          height={20}
                                          align="center"
                                          alt="Bandwidth"
                                          src={dropDownItem.icon}
                                        />
                                      )}
                                    </ListItemIcon>
                                    <ListItemText
                                      hidden={!open}
                                      primary={dropDownItem.name}
                                    />
                                  </ListItemButton>
                                </Link>
                              )}
                              <Collapse
                                in={subMenuState}
                                timeout="auto"
                                unmountOnExit
                              >
                                {dropDownItem.nestedDropDown.map(
                                  (nestedDropDownItem, nestedDropDownIndex) => {
                                    const selected = getSelectedDrawerItem(
                                      dropDownItem.nestedDropDown,
                                      router.pathname
                                    );

                                    return (
                                      <div key={nestedDropDownIndex}>
                                        <List component="div" disablePadding>
                                          {nestedDropDownItem.visible && (
                                            <Link
                                              className={styles.NavLink}
                                              href={nestedDropDownItem.to}
                                              passHref
                                            >
                                              <ListItemButton
                                                {...(!open && {
                                                  style: {
                                                    width: "50px",
                                                    height: "50px",
                                                  },
                                                })}
                                                sx={{
                                                  pl: "16px",
                                                }}
                                                selected={
                                                  nestedDropDownItem.title ===
                                                  selected
                                                }
                                                onClick={(event) =>
                                                  handleListItemClick(event, 0)
                                                }
                                              >
                                                <ListItemIcon
                                                  sx={{
                                                    paddingLeft: "6px",
                                                  }}
                                                >
                                                  {nestedDropDownItem.title ===
                                                  selected ? (
                                                    <Box
                                                      component="img"
                                                      width={7}
                                                      height={7}
                                                      align="center"
                                                      alt="elastic-instance"
                                                      src="/images/pages/common/navicon/lighticon/dot.svg"
                                                    />
                                                  ) : (
                                                    <Box
                                                      component="img"
                                                      width={7}
                                                      height={7}
                                                      align="center"
                                                      alt="elastic-instance"
                                                      src="/images/pages/common/navicon/darkicon/dot.svg"
                                                    />
                                                  )}
                                                </ListItemIcon>

                                                <ListItemText
                                                  hidden={!open}
                                                  primary={
                                                    nestedDropDownItem.title
                                                  }
                                                  sx={{
                                                    paddingLeft: "6px",
                                                  }}
                                                />
                                              </ListItemButton>
                                            </Link>
                                          )}
                                        </List>
                                      </div>
                                    );
                                  }
                                )}
                              </Collapse>
                            </div>
                          );
                        })}
                      </List>
                    </>
                  )}
                </div>
              );
            })}
          </DetaNav>
        </Box>
      </Drawer>

      <MuiDrawer
        anchor={"left"}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: false, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "block", md: "none" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: 1,
          }}
        >
          <DrawerHeader>
            {/* <Image
              hidden={mobileOpen}
              src="/images/pages/common/cloud-icon.png"
              alt="Logo"
              width={40}
              height={40}
            /> */}
            <Image
              hidden={!mobileOpen}
              src="/images/pages/common/deta-cloud-logo.png"
              className={styles.logoimage}
              alt="Logo"
              width={150}
              height={25}
            />
            {mobileOpen && (
              <IconButton sx={{ left: "6px" }} onClick={handleDrawerToggle}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            )}
          </DrawerHeader>
        </Box>
        <Box
          // ref={drawerRef}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            pl: 1,
            pr: 1, // Hide overflow by default
            "&:hover": {
              overflowY: "auto", // Show overflow when hovering over the side menu
            },
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f5f5f5",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#bdbdbd",
              borderRadius: "4px",
              "&:hover": {
                background: "#a5a5a5",
              },
            },
          }}
        >
          <Divider />

          <DetaNav component="nav" aria-labelledby="nested-list-subheader">
            {DRAWER_MENUS.map((item, index) => {
              const menuState = menuStates[index];
              // if (!item.visible) {
              //   return null;
              // }

              return (
                <div key={index}>
                  {item.visible && (
                    <>
                      <Divider
                        textAlign="left"
                        sx={{
                          fontSize: "14px",
                          color: "#969696",
                          mt: 2,
                          mb: 1,
                        }}
                      >
                        {item.title}
                      </Divider>

                      <List className={styles.listContainer}>
                        {item.dropDown.map((dropDownItem, dropDownIndex) => {
                          const subMenuState =
                            menuState.subMenuStates[dropDownIndex];

                          return (
                            <span key={dropDownIndex}>
                              {dropDownItem.nestedDropDown.length > 0 ? (
                                <ListItemButton
                                  key={dropDownIndex}
                                  onClick={() => {
                                    toggleSubMenu(index, dropDownIndex);
                                  }}
                                  id="collapsableEI"
                                >
                                  <ListItemIcon>
                                    <Box
                                      component="img"
                                      width={20}
                                      height={20}
                                      align="center"
                                      alt="elastic-instance"
                                      src={dropDownItem.icon}
                                    />
                                  </ListItemIcon>
                                  <ListItemText primary={dropDownItem.name} />
                                  {subMenuState ? (
                                    <ExpandMoreIcon />
                                  ) : (
                                    <ChevronRightIcon />
                                  )}
                                </ListItemButton>
                              ) : (
                                <Link
                                  className={styles.NavLink}
                                  href={dropDownItem.to}
                                  passHref
                                >
                                  <ListItemButton
                                    selected={
                                      router.pathname === dropDownItem.to
                                    }
                                    onClick={(event) =>
                                      handleListItemClick(event, 3)
                                    }
                                  >
                                    <ListItemIcon>
                                      {router.pathname === dropDownItem.to ? (
                                        <Box
                                          component="img"
                                          width={20}
                                          height={20}
                                          align="center"
                                          alt="Bandwidth"
                                          src={dropDownItem.selectedIcon}
                                        />
                                      ) : (
                                        <Box
                                          component="img"
                                          width={20}
                                          height={20}
                                          align="center"
                                          alt="Bandwidth"
                                          src={dropDownItem.icon}
                                        />
                                      )}
                                    </ListItemIcon>
                                    <ListItemText primary={dropDownItem.name} />
                                  </ListItemButton>
                                </Link>
                              )}
                              <Collapse
                                in={subMenuState}
                                timeout="auto"
                                unmountOnExit
                              >
                                {dropDownItem.nestedDropDown.map(
                                  (nestedDropDownItem, nestedDropDownIndex) => {
                                    return (
                                      <span key={nestedDropDownIndex}>
                                        <List component="div" disablePadding>
                                          {nestedDropDownItem.visible && (
                                            <Link
                                              className={styles.NavLink}
                                              href={nestedDropDownItem.to}
                                              passHref
                                            >
                                              <ListItemButton
                                                sx={{
                                                  pl: "16px",
                                                }}
                                                selected={
                                                  router.pathname ===
                                                  nestedDropDownItem.to
                                                }
                                                onClick={(event) =>
                                                  handleListItemClick(event, 0)
                                                }
                                              >
                                                <ListItemIcon
                                                  sx={{
                                                    paddingLeft: "6px",
                                                  }}
                                                >
                                                  {router.pathname ===
                                                  nestedDropDownItem.to ? (
                                                    <Box
                                                      component="img"
                                                      width={7}
                                                      height={7}
                                                      align="center"
                                                      alt="elastic-instance"
                                                      src="/images/pages/common/navicon/lighticon/dot.svg"
                                                    />
                                                  ) : (
                                                    <Box
                                                      component="img"
                                                      width={7}
                                                      height={7}
                                                      align="center"
                                                      alt="elastic-instance"
                                                      src="/images/pages/common/navicon/darkicon/dot.svg"
                                                    />
                                                  )}
                                                </ListItemIcon>

                                                <ListItemText
                                                  primary={
                                                    nestedDropDownItem.title
                                                  }
                                                  sx={{
                                                    paddingLeft: "6px",
                                                  }}
                                                />
                                              </ListItemButton>
                                            </Link>
                                          )}
                                        </List>
                                      </span>
                                    );
                                  }
                                )}
                              </Collapse>
                            </span>
                          );
                        })}
                      </List>
                    </>
                  )}
                </div>
              );
            })}
          </DetaNav>
        </Box>
      </MuiDrawer>
    </>
  );
}
