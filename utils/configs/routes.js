import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Login from '../../pages/dcc/login';
import Register from '../../pages/dcc/register';
import ForgotPassword from '../../pages/dcc/fpwd';
import Signup from '../../pages/signup';
import MinstanceList from '../../pages/surface/clouds/elasticins/manage/list';
import MinstanceDetail from '../../pages/surface/clouds/elasticins/manage/detail';
import Cintstance from '../../pages/surface/clouds/elasticins/create';
const routes = {
  '/dcc/login': { page: Login, roles: [] },
  '/dcc/register': { page: Register, roles: [] },
  '/dcc/fpwd': { page: ForgotPassword, roles: [] },
  '/signup': { page: Signup, roles: ['signupadmin'] },
  '/surface/clouds/elasticins/create': {
    page: Cintstance,
   //roles: ['admin', 'operator', 'customer'],
   roles:[]
  },
  '/surface/clouds/elasticins/manage/list': {
    page: MinstanceList,
   //roles: ['admin', 'operator', 'customer'],
   roles:[]
  },
  '/surface/clouds/elasticins/manage/detail': {
    page: MinstanceDetail,
   //roles: ['admin', 'operator', 'customer'],
   roles:[]
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
  const mainstoredRole = Cookies.get('userRole');
  const user = mainstoredRole ? JSON.parse(mainstoredRole) : null;
  const { pathname } = router;
  const { roles } = getRouteInfo(pathname) || {};    

  useEffect(() => {

    if(user){      
      if(pathname == "/" && user.role == "signupadmin"){
        router.push('/signup');
      }  
      if(pathname == "/" && user.role == "admin"){
        router.push('/surface/clouds/elasticins/manage/list');
      }
    }
   
    if (!user && pathname == '/') {
      router.push('/dcc/login');
    }

  }, [user, pathname, router]);

  useEffect(() => {
    if (roles && roles.length > 0 && !roles.includes(user?.role)) {      
      router.push('/');
    }
  }, [user, roles, router]);

  return { pathname };
};
