import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Login from "../../pages/dcc/login";
import Register from "../../pages/dcc/register";
import ForgotPassword from "../../pages/dcc/fpwd";
import Signup from "../../pages/signup";
import MinstanceList from "../../pages/surface/clouds/elasticins/manage/list";
import MinstanceDetail from "../../pages/surface/clouds/elasticins/manage/detail/[slug]";
import Cintstance from "../../pages/surface/clouds/elasticins/create";
import ListOfNetwork from "../../pages/surface/networks/privatenet/list";
import PrivateDetail from "../../pages/surface/networks/privatenet/detail/[slug]";
import InternetBandWidth from "../../pages/surface/networks/internetbw";
import CurrentUsage from "../../pages/surface/billing/currentusage";
import Invoices from "../../pages/surface/billing/invoice";
import BillingSettings from "../../pages/surface/billing/bsettings";
import Account from "../../pages/surface/settings/account";
import Security from "../../pages/surface/settings/security";
import Support from "../../pages/surface/misc/support";
import PublicIP from "../../pages/surface/networks/publicips";
import Firewall from "../../pages/surface/networks/networksecurity/firewall";
import NATRules from "../../pages/surface/networks/networksecurity/nat";
import SecurityGroup from "../../pages/surface/networks/networksecurity/securitygroup";
const routes = {
  "/dcc/login": { page: Login, roles: [] },
  "/dcc/register": { page: Register, roles: [] },
  "/dcc/fpwd": { page: ForgotPassword, roles: [] },
  "/signup": { page: Signup, roles: ["signupadmin"] },
  "/surface/clouds/elasticins/create": {
    page: Cintstance,
    roles: ["owner", "administrator", "manager"],
  },
  "/surface/clouds/elasticins/manage/list": {
    page: MinstanceList,
    roles: ["owner", "administrator", "operator", "manager"],
  },
  "/surface/clouds/elasticins/manage/detail": {
    page: MinstanceDetail,
    roles: ["owner", "administrator", "operator", "manager"],
  },

  "/surface/networks/privatenet/list": {
    page: ListOfNetwork,
    roles: ["owner", "administrator"],
  },

  "/surface/networks/privatenet/detail": {
    page: PrivateDetail,
    roles: ["owner", "administrator"],
  },

  "/surface/networks/publicips": {
    page: PublicIP,
    roles: ["owner", "administrator"],
  },
  "/surface/networks/networksecurity/firewall": {
    page: Firewall,
    roles: ["owner", "administrator"],
  },
  "/surface/networks/networksecurity/nat": {
    page: NATRules,
    roles: ["owner", "administrator"],
  },

  "/surface/networks/networksecurity/securitygroup": {
    page: SecurityGroup,
    roles: ["owner", "administrator"],
  },

  "/surface/networks/internetbw": {
    page: InternetBandWidth,
    roles: ["owner", "administrator"],
  },

  "/surface/billing/currentusage": {
    page: CurrentUsage,
    roles: ["owner", "administrator", "billing admin"],
  },

  "/surface/billing/invoice": {
    page: Invoices,
    roles: ["owner", "administrator", "billing admin"],
  },

  "/surface/billing/bsettings": {
    page: BillingSettings,
    roles: ["owner", "administrator", "billing admin"],
  },

  "/surface/settings/account": {
    page: Account,
    roles: ["owner", "administrator", "operator", "manager", "billing admin"],
  },

  "/surface/settings/security": {
    page: Security,
    roles: ["owner", "administrator", "operator", "manager", "billing admin"],
  },

  "/surface/misc/support": {
    page: Support,
    roles: ["owner", "administrator", "operator", "manager", "billing admin"],
  },
};

export const getRouteInfo = (pathname) => {
  const routeKeys = Object.keys(routes);

  for (let i = 0; i < routeKeys.length; i++) {
    const route = routeKeys[i];

    if (pathname.startsWith(route)) {
      const { page, roles } = routes[route];

      return { page, roles };
    }
  }

  return null;
};

export const useAuthRoute = () => {
  const router = useRouter();
  const mainstoredRole = Cookies.get("userRole");
  const user = mainstoredRole ? JSON.parse(mainstoredRole) : null;
  const { pathname } = router;
  const { roles } = getRouteInfo(pathname) || {};

  useEffect(() => {
    if (user) {
      if (pathname == "/") {
        if (user.role == "signupadmin") {
          router.push("/signup");
        } else if (
          user.role == "owner" ||
          user.role == "administrator" ||
          user.role == "manager" ||
          user.role == "operator"
        ) {
          router.push("/surface/clouds/elasticins/manage/list");
        } else if (user.role == "billing admin") {
          router.push("/surface/billing/currentusage");
        }
      }
    }

    if (!user && pathname == "/") {
      router.push("/dcc/login");
    }

    if (user && pathname.startsWith("/dcc")) {
      if (user.role == "signupadmin") {
        router.push("/signup");
      } else if (
        user.role == "owner" ||
        user.role == "administrator" ||
        user.role == "manager" ||
        user.role == "operator"
      ) {
        router.push("/surface/clouds/elasticins/manage/list");
      } else if (user.role == "billing admin") {
        router.push("/surface/billing/currentusage");
      }
    }
  }, [user, pathname, router]);

  useEffect(() => {
    if (roles && roles.length > 0 && !roles.includes(user?.role)) {
      router.push("/");
    }
  }, [user, roles, router]);

  return { pathname };
};
