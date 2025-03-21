import axios from "axios";
import { refreshLogin } from './authService';
import { getToken, getRefreshToken } from './transactionService';

export const API_BASE_URL = "http://172.18.16.1:3000/api"; //TODO change to global vars

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const err = error.response ? error.response.data : error;

    if (err.message.includes("expired")) {
      try {
        console.log("trying to refresh")
        const reToken = await getRefreshToken();
        if (!reToken) return;
        await refreshLogin();
        const newToken = await getToken();
        
        return apiClient({
          ...error.config,
          headers: { ...error.config.headers, Authorization: `Bearer ${newToken}` },
        });
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
