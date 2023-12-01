import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ClientIPContext = createContext();

export const ClientIPProvider = ({ children }) => {
  const [clientIP, setClientIP] = useState(null);

  useEffect(() => {
    const fetchClientIP = async () => {
      try {
        const response = await axios.get(
          "https://api.ipify.org?format=json&ipv=4"
        );

        const data = response.data;
        setClientIP(data.ip || null);
      } catch (error) {
        console.error("Error fetching client IP:", error.message);
      }
    };

    fetchClientIP();
  }, []);

  return (
    <ClientIPContext.Provider value={{ clientIP }}>
      {children}
    </ClientIPContext.Provider>
  );
};

export const useClientIP = () => {
  return useContext(ClientIPContext);
};
