import '../styles/globals.css';
import  { useRouter } from "next/router";
import { ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import theme from '../styles/theme';
import { AuthProvider,useAuth } from '../utils/context/authContext';
import { useAuthRoute } from '../utils/configs/routes';
import CommonHead from '../components/layouts/common/Head';

function MyApp({ Component, pageProps }) {
  const { user } = useAuth();
  const { pathname } = useAuthRoute();
  const router = useRouter();
  if (pathname === '/dcc/login') {
    return <Component {...pageProps} />;
  }
  if (pathname === '/') {          
    if (user) {      
      if (user.role === 'signupadmin') {        
        router.push('/signup');
        return null;
      } else if (user.role === 'admin' || user.role === 'operator' || user.role === 'customer') {        
        router.push('/surface/clouds/elasticins/manage/list');
        return null;       
      }
    }
  }
  return <Component {...pageProps} />;
}

export default function App(props) {

  return (
    <AuthProvider>
      <CommonHead />
      <ThemeProvider theme={theme}>
        <CssBaseline />        
        <MyApp {...props} />    
      </ThemeProvider>
    </AuthProvider>
  );
  
}
