import React, { useContext, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContext";
import TransactionList from "../components/List/ListComponent";
import styles from "./styles";


const HomeScreen = ({ navigation }: any) => {
  const { user, loading } = useContext<any>(AuthContext);

  useEffect(() => {
    if (!loading && !user) {
      navigation.replace("Login");
    }
  }, [loading, user]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={{padding: 2}}>Welcome, {user?.name}!</Text>
      <TransactionList navigation={navigation}></TransactionList>
    </View>
  );
};

export default HomeScreen;
