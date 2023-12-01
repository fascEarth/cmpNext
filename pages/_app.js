import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "../styles/globals.css";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import theme from "../styles/theme";
import { AuthProvider, useAuth } from "../utils/context/authContext";
import { useAuthRoute } from "../utils/configs/routes";
import CommonHead from "../components/layouts/common/Head";
import { ToastContainer } from "react-toastify";
import SessionTimeout from "../components/tools/sessionTimeOut/sessionTimeOut";
import { createContext, useState } from "react";
import SideMenu from "../components/layouts/surface/SideMenu";

import DrawerMenus from "../components/layouts/surface/DrawerMenus";


import { ClientIPProvider } from "../utils/context/ClientIPContext";

export const DrawerContext = createContext();



function MyApp({ Component, pageProps }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState(true);

  const { pathname } = useAuthRoute();
  const router = useRouter();
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  if (router.pathname.includes("dcc")) {
    return <Component {...pageProps} />;
  }
  if (pathname == "/") {
    if (user) {
      if (user.role === "signupadmin") {
        router.push("/signup");
        return null;
      } else if (
        user.role === "owner" ||
        user.role === "administrator" ||
        user.role === "operator" ||
        user.role === "manager"
      ) {
        router.push("/surface/clouds/elasticins/manage/list");
        return null;
      } else if (user.role === "billing admin") {
        router.push("/surface/billing/currentusage");
        return null;
      }
    }
  }
  const resetSession = () => {
    return logout();
  };
  // console.log(logout, "sessionLogOut");
  console.log(user, "userrrrr");
  const isDrawerVisible = () => {
    if (
      pathname == "/surface/clouds/elasticins/create" ||
      pathname == "/surface/clouds/elasticins/manage/list" ||
      pathname == "/surface/clouds/elasticins/manage/detail/[slug]" ||
      pathname == "/surface/networks/privatenet/list" ||
      pathname == "/surface/networks/privatenet/detail/[slug]" ||
      pathname == "/surface/networks/publicips" ||
      pathname == "/surface/networks/networksecurity/firewall" ||
      pathname == "/surface/networks/networksecurity/nat" ||
      pathname == "/surface/networks/networksecurity/securitygroup" ||
      pathname == "/surface/networks/internetbw" ||
      pathname == "/surface/billing/currentusage" ||
      pathname == "/surface/billing/invoice" ||
      pathname == "/surface/billing/bsettings" ||
      pathname == "/surface/settings/account" ||
      pathname == "/surface/settings/security" ||
      pathname == "/surface/misc/support"
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
    
      {user ? (
        <SessionTimeout
          isSessionExpired={isSessionExpired}
          setIsSessionExpired={setIsSessionExpired}
          resetSession={resetSession}
        />
      ) : null}

      {!isSessionExpired ? (
        <DrawerContext.Provider
          value={{
            open,
            setOpen,
            mobileOpen,
            setMobileOpen,
            nestedOpen,
            setNestedOpen,
          }}
        >
          {user && (
            <div style={{ display: "flex" }}>
              <CssBaseline />
              {isDrawerVisible() && <DrawerMenus />}
              <main style={{ flexGrow: 1, maxWidth: "100%" }}>
                <Component {...pageProps} />
              </main>
            </div>
          )}
        </DrawerContext.Provider>
      ) : null}
    </>
  );
}

export default function App(props) {
  return (
    <>
      {/* <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
  />*/}
  <ClientIPProvider>
      <AuthProvider>
        <CommonHead />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MyApp {...props} />
          <ToastContainer />
        </ThemeProvider>
      </AuthProvider>
      </ClientIPProvider>
    </>
  );
}
