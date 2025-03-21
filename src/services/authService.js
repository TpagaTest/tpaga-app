import { apiClient } from "./apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tokens } from '../types/User'

export const authLogin = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    console.log('failed', error)
    throw error.response ? error.response.data : error.message;
  }
};

export const authSignup = async (email, password, name) => {
  try {
    const response = await apiClient.post("/auth/signup", { email, password, name });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const authMe = async (token) => {
  try {
    const response = await apiClient.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const authRefreshToken = async (token) => {
  try {
    const response = await apiClient.get("/auth/refresh", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }

};

export const setTokens = async ({accessToken, refreshToken} : Tokens) => {
  console.log('setting tokens')
  await AsyncStorage.setItem("authToken", accessToken);
  await AsyncStorage.setItem("refreshToken", refreshToken);
}

export const refreshLogin = async () => {
  try {
    const reToken = await AsyncStorage.getItem("refreshToken");
    if (!reToken) return;
    const response = await authRefreshToken(reToken);
    setTokens(response);
    const user = await authMe(response.accessToken);
    setUser(user.user);
  } catch (error) {
    console.log('it failed', error)
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("refreshToken");
  }
}
