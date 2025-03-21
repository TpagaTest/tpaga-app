import React from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles";
import { createTransaction } from '../services/transactionService';
import { useNavigation } from "@react-navigation/native";
import { NewTransaction } from "../types/Transaction";
import { Error } from "../types/Error";


const TransactionSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .required("Amount is required"),
  description: Yup.string()
    .trim()
    .required("Description is required"),
});

const AddTransactionScreen = () => {
  const navigation = useNavigation();

  const addTransaction = async (values: NewTransaction, { resetForm }: any) => {
    try {
      await createTransaction(values)
      resetForm();
      navigation.navigate("Menu", { screen: "Home" });
    } catch (error: Error) {
      Alert.alert('Error', error.message)
    }
  };
  return (
    <Formik
      initialValues={{ amount: "", description: "" }}
      validationSchema={TransactionSchema}
      onSubmit={addTransaction}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text>Amount:</Text>
          <TextInput
            value={values.amount}
            onChangeText={handleChange("amount")}
            onBlur={handleBlur("amount")}
            keyboardType="numeric"
            inputMode="decimal"
            style={[styles.input, touched.amount && errors.amount && { borderColor: "red", borderBottomWidth: 2 }]}
          />
          {touched.amount && errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}

          <Text>Description:</Text>
          <TextInput
            value={values.description}
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
            style={[styles.input, touched.description && errors.description && { borderColor: "red", borderBottomWidth: 2 }]}
          />
          {touched.description && errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

          <Pressable
            onPress={() => handleSubmit()}
            style={[
              styles.button,
              styles.buttonColor,
              (errors.amount || errors.description || !values.amount || !values.description.trim()) && styles.disabledButton,
            ]}
            disabled={!!(errors.amount || errors.description || !values.amount || !values.description.trim())}
          >
            <Text style={styles.lightText}>Add Transaction</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default AddTransactionScreen;
