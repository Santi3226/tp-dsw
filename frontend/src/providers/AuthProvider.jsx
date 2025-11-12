import { useState } from "react";
import { AuthContext } from '../contexts/auth';
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../helpers/api";

function isExpired(expiration) {
  return Date.now() / 1000 > expiration;
}

function getUser(jwt) {
  if (!jwt) {
    return null;
  }
  try {
    const decoded = jwtDecode(jwt);

    if (isExpired(decoded.exp)) {
      return null;
    }
    return {
      id: decoded.id,
      paciente: decoded.paciente,
      role: decoded.role,
      email: decoded.email,
    };
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
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
      const response = await axiosInstance.post(
        "/usuario/login",
        userData
      );
      localStorage.setItem("token", response.data.token);
      setUser(getUser(response.data.token));
      setWasAuthenticated(true);
    } catch (error) {
        console.error("Error en AuthProvider:", error);
        if (error.response && error.response.data && error.response.data.message) {
            setErrorLogin(error.response.data.message);
        } else {
            setErrorLogin("Error de red o del servidor. Por favor, inténtalo de nuevo.");
        }
         throw error;
    }
  };

  const regist = async (userData) => {
    setErrorLogin(null);
    const userPatientData = {
    email: userData.email,
    contraseña: userData.contraseña,
    role: "user",
    paciente: {
      nombre: userData.nombre,
      apellido: userData.apellido,
      dni: userData.dni,
      telefono: userData.telefono,
      direccion: userData.domicilio,
      fechaNacimiento: userData.fechaNacimiento
    },
    }
    try {
      const response = await axiosInstance.post(
        "/usuario",
        userPatientData
      );
      localStorage.setItem("token", response.data.token);
      setUser(getUser(response.data.token));
      setWasAuthenticated(true);
      alert("Usuario creado Correctamente!");
      
    } catch (error) {
        console.error("Error en AuthProvider:", error);
        if (error.response && error.response.data && error.response.data.message) {
            setErrorLogin(error.response.data.message);
        } else {
            setErrorLogin("Error de red o del servidor. Por favor, inténtalo de nuevo.");
        }
         throw error;
    }
  };

   const modify = async (userData) => {
    setErrorLogin(null);
    const usuarioData = 
    {
    //Usuario data
    id:userData.id,
    email: userData.email,
    contraseña: userData.contraseña,
    paciente: userData.paciente.id,
    //Paciente data
    nombre: userData.paciente.nombre,
    apellido: userData.paciente.apellido,
    dni: userData.paciente.dni,
    telefono: userData.paciente.telefono,
    direccion: userData.paciente.direccion,
    fechaNacimiento: userData.paciente.fechaNacimiento
    };
    try {
      const routeUsuario = "/usuario/"+usuarioData.id;
      const response = await axiosInstance.put(
        routeUsuario,
        usuarioData
      );
      localStorage.setItem("token", response.data.token);
      setUser(getUser(response.data.token));
      setWasAuthenticated(true);
      alert("Usuario modificado Correctamente!");
    } catch (error) {
        console.error("Error en AuthProvider:", error);
        if (error.response && error.response.data && error.response.data.message) {
            setErrorLogin(error.response.data.message);
        } else {
            setErrorLogin("Error de red o del servidor. Por favor, inténtalo de nuevo.");
        }
         throw error;
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
    modify,
    regist,
    logout,
    wasAuthenticated,
    errorLogin,
  };


  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
