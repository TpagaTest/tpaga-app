import { apiClient } from "./apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  console.log('getting token')
  return await AsyncStorage.getItem("authToken");
}

export const getRefreshToken = async () => {
  console.log('getting refresh token')
  return await AsyncStorage.getItem("refreshToken");
}

export const createTransaction = async (data) => {
  try {
    const token = await getToken();
    const response = await apiClient.post("/transactions", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getTransaction = async (id) => {
  try {
    const token = await getToken();
    const response = await apiClient.get(`/transactions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const getTransactions = async (page) => {
  try {
    const token = await getToken();
    const response = await apiClient.get(`/transactions?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
