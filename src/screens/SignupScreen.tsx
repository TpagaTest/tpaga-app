import React, { useContext } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles";
import { Signup } from "../types/User";
import { Error } from "../types/Error";
import { useNavigation } from "@react-navigation/native";

const SignupScreen = () => {
  const { signup }: any = useContext(AuthContext);
  const navigation = useNavigation();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleForm = async (values: Signup, { setSubmitting }: any) => {
    try {
      await signup(values.email, values.password, values.name);
      navigation.navigate("Menu", { screen: "Home" }); 
    } catch (error: Error) {
      Alert.alert("Error", error.message);
    }
    setSubmitting(false);
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleForm}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <>
            <Text>Name:</Text>
            <TextInput
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              style={styles.input}
            />
            {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <Text>Email:</Text>
            <TextInput
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <Text>Password:</Text>
            <TextInput
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry
              style={styles.input}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => [
                styles.button,
                styles.buttonColor,
                pressed && styles.pressed,
                !isValid && styles.disabledButton,
              ]}
              disabled={!isValid}
            >
              <Text style={styles.lightText}>Sign Up</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            >
              <Text style={styles.darkText}>Back to Login</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignupScreen;
