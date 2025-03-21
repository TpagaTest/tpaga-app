import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 5,
    paddingVertical: 8,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonColor: {
    backgroundColor: "#007AFF",
  },
  pressed: {
    opacity: 0.7,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  lightText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  darkText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
});

export default styles;
