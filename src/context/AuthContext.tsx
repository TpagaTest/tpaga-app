import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authLogin, authMe, authSignup, refreshLogin, setTokens } from "../services/authService";
import { Tokens, User } from "../types/User";

export const AuthContext = createContext();

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        try {
          const response = await authMe(token);
          setUser(response.user);
        } catch (error) {
          console.log("err", error)
          await refreshLogin();
        }
      }
      setLoading(false);
    };
    checkLoginStatus();
  }, []);


  const login = async (email: string, password: string) => {
    console.log('loggin in', email)
    const response: Tokens = await authLogin( email, password );
    console.log('loggin in res', response)
    setTokens(response);
    const me = await authMe(response.accessToken );
    setUser(me.user);
    setLoading(false);
  };

  const signup = async (email: string, password: string, name: string) => {
    const response: Tokens = await authSignup( email, password, name );
    setTokens(response);
    const me = await authMe(response.accessToken );
    setUser(me.user);
    setLoading(false);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("refreshToken");
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
