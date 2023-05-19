import Link from 'next/link';
import styles from './Header.module.css';
import { useAuth } from '../../../utils/context/authContext';
import Cookies from 'js-cookie';
function SurfaceHeader() {
  const { logout } = useAuth();
  function logoutSurHead(){
    Cookies.remove('userRole');
    logout();
    
  }
  return (
 
    <header className="bg-gray-800 py-4">
  <div className="container mx-auto flex justify-between items-center px-4">
    <h1 className="text-white font-bold text-xl">Dashboard</h1>
    <nav>
      <ul className="flex space-x-4">
        <li>
        <Link passHref legacyBehavior href="/">
          <a className="text-white" >Home</a>
          </Link>
        </li>
        
        <li>
        <a onClick={logoutSurHead} className="text-white" >Logout</a>
        </li>
      </ul>
    </nav>
  </div>
</header>




  );
}

export default SurfaceHeader;
