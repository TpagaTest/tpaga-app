import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../context/AuthContext";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";

const Tab = createBottomTabNavigator();

const LogoutScreen = () => {
  const { logout }: any = useContext(AuthContext);

  return (
    <View style={[styles.container, {alignItems: "center"}]}>
      <Text>Are you sure you want to log out?</Text>
      <Pressable
        onPress={logout}
        style={[styles.button, styles.buttonColor]}
      >
        <Text style={styles.lightText}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default LogoutScreen;
