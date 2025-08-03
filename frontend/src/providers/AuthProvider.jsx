import { useState } from "react";
import axios from "axios";
import { AuthContext } from '../contexts/auth';
import { jwtDecode } from "jwt-decode";

function isExpired(expiration) {
  return Date.now() / 1000 > expiration;
}

function getUser(jwt) {
  try {
    const decoded = jwtDecode(jwt);
    
    if (isExpired(decoded.exp)) {
      return null;
    }

    return {
      user: decoded.user,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    return error;
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser(localStorage.getItem("token")));
  const [wasAuthenticated, setWasAuthenticated] = useState(false);
  const [errorLogin, setErrorLogin] = useState(null);

  const isAuthenticated = () => {
    return !!getUser(localStorage.getItem('token'))
  }

  const login = async (userData) => {
    setErrorLogin(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/usuario/login",
        userData
      );
      localStorage.setItem("token", response.data.token);
      setUser(getUser(response.data.token));
      setWasAuthenticated(true);
    } catch (error) {
      console.log("error", error);
      setErrorLogin(error.response.data.message || "Error al iniciar sesión");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const authValue = {
    isAuthenticated,
    user,
    login,
    logout,
    wasAuthenticated,
    errorLogin,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
