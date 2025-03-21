import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getTransaction } from "../services/transactionService"; // API Call Function
import { AuthContext } from "../context/AuthContext";
import { Transaction } from "../types/Transaction";
import styles from "./styles";

const TransactionDetailScreen = () => {
  const route = useRoute();
  const { loading }: any = useContext(AuthContext);
  const { transactionId } = route.params as { transactionId: number };
  const [transaction, setTransaction] = useState<Transaction>();

  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
    try {
      const response: any = await getTransaction(transactionId);
      setTransaction(response);
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="red" />;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Description: {transaction?.description}</Text>
      <Text style={styles.text}>Amount: ${transaction?.amount}</Text>
      <Text style={styles.text}>Date: {new Date(transaction?.createdAt || '').toLocaleString()}</Text>
    </View>
  );
};

export default TransactionDetailScreen;
