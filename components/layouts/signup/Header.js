import { useState, useEffect } from "react";

import Link from 'next/link';

import styles from './Header.module.css';
import { useAuth } from '../../../utils/context/authContext';
import Cookies from 'js-cookie';
import axios from 'axios';
function SignupHeader() {
  const { logout } = useAuth();
  const cookies = Cookies.get("userData");
  
  const [scaches, setscaches] = useState([]);
  useEffect(() => {
    const scachData = cookies ? JSON.parse(cookies) : true;
    if (scachData) {
      setscaches(scachData)
    }
  }, [cookies]);

  async function logoutSurHead() {

    
    const newData = { userName: scaches.email, accessToken: scaches.accessToken, social_login: "0" };
    const finalData = { data: newData, endPoint: "logoutUser" };
    try {
      const { data } = await axios.post("/api/logout", finalData); // call the new API route
      console.log(data)
      if(data.status_code == "700"){
        Cookies.remove("userRole");
        logout();
      }
    } catch (error) {
      
      toast.error("An error occurred");
    }

    
  }

  
  /*function logoutSurHead(){
    Cookies.remove('userRole');
    logout();
    
  }*/
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
