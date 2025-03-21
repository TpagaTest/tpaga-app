import React, { useContext, useEffect } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles";
import { Login } from "../types/User";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation()
  const { login }: any = useContext(AuthContext);

  useEffect(()=> {console.log("login screen")}, [])
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleForm = async (values: Login, { setSubmitting }: any) => {
    try {
      await login(values.email, values.password);
      navigation.navigate("Menu", { screen: "Home" }); 
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
    setSubmitting(false);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleForm}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <>
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
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <Pressable
              onPress={() => handleSubmit()}
              style={({ pressed }) => [
                styles.button,
                styles.buttonColor,
                pressed && styles.pressed,
                !isValid && styles.disabledButton,
              ]}
              disabled={!isValid}
            >
              <Text style={styles.lightText}>Login</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Signup")}
              style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            >
              <Text style={styles.darkText}>Sign Up</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;
