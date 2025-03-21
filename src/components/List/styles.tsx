import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    listContainer: {
      padding: 2,
    },
    item: {
      padding: 15,
      marginVertical: 8,
      backgroundColor: "#f9f9f9",
      borderRadius: 8,
      elevation: 2,
    },
    description: {
      fontSize: 16,
      fontWeight: "bold",
    },
    amount: {
      fontSize: 14,
      color: "green",
    },
    date: {
      fontSize: 12,
      color: "gray",
    },
  });
  
export default styles;