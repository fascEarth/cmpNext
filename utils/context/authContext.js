import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const mainstoredRole = Cookies.get("userRole");
    const storedRole = mainstoredRole ? JSON.parse(mainstoredRole) : null;

    if (storedRole) {
      setUser(storedRole);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("userRole");
    Cookies.remove("userData");
    Cookies.remove("welcomeCard");
    Cookies.remove("userMenuOpen");

    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
