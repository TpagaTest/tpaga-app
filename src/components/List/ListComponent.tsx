import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";
import { Transaction, TransactionListType } from "../../types/Transaction";
import { AuthContext } from "../../context/AuthContext";
import { getTransactions } from "../../services/transactionService";
import { Error } from "../../types/Error";
import { useNavigation } from "@react-navigation/native";
import io from "socket.io-client";
import { API_BASE_URL } from '../../services/apiClient';
const socket = io(API_BASE_URL);

const TransactionList = () => {
  const { loading } = useContext<any>(AuthContext);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigation = useNavigation();
  
  useEffect(() => {
    console.log('loading transactions')
    fetchTransactions();
  }, []);

  useEffect(() => {
    fetchTransactions();

    socket.on("transactionAdded", (newTransaction) => {
      setTransactions((prev) => [newTransaction, ...prev]);
    });

    return () => {
      socket.off("transactionAdded");
    };
  }, []);

  const fetchTransactions = async () => {
    if (loading || page > totalPages) return setPage(page-1);
    try {
      const response: TransactionListType = await getTransactions(page)
      setTransactions((prevData) => {
        const newData = [...prevData, ...response.data];
        return Array.from(new Map(newData.map(item => [item.id, item])).values());
      });
      setTotalPages(response.totalPages);
      setPage(page + 1);
    } catch (error: Error) {
      Alert.alert('Error', error.message)
    }
  };

  const renderItem = ({ item }: { item: Transaction }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("TransactionDetail", { transactionId: item.id })}
    >
      <View style={styles.item} key={item.id}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.amount}>${item.amount}</Text>
        <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={transactions}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => (item.id ? item.id.toString() : `index-${index}`)}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      onEndReached={fetchTransactions}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator size="large" color="#fff" /> : null}
    />
  );
};


export default TransactionList;