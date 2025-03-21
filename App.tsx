import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext, AuthProvider } from "./src/context/AuthContext";

import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AddTransactionScreen from "./src/screens/AddTransactionScreen";
import LogoutScreen from "./src/screens/LogoutScreen";
import TransactionDetailScreen from "./src/screens/TransactionScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
  </HomeStack.Navigator>
);

const HomeNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Menu"
      component={HomeStackNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Add Transaction"
      component={AddTransactionScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="plus-circle" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Logout"
      component={LogoutScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="logout" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);


const AppNavigator = () => {
  const { user, loading } = useContext<any>(AuthContext);
  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
