import Link from 'next/link';
import styles from './Header.module.css';
import { useAuth } from '../../../utils/context/authContext';
import Cookies from 'js-cookie';
function SignupHeader() {

  const { logout } = useAuth();
  function logoutSurHead(){
    Cookies.remove('userRole');
    logout();
    
  }
  return (
 
          <header className="bg-gray-800 py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-white font-bold text-xl">Signup</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
              <Link className="text-white" passHref legacyBehavior href="/signup">
              Home
                </Link>
              </li>
              
              <li>
              <a className="text-white" onClick={logoutSurHead}>Logout</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

     

  
   
  );
}

export default SignupHeader;
