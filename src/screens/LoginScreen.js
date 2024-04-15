import React, { useState } from "react";
import {  View, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput, Text } from "react-native-paper";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      if (email !== "" && password !== "") {
        // Check for empty text fields
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      } else {
        // TODO Display a warning message to the user for empty fields
      }
    } catch (error) {
      console.error(error.message);
      // TODO Display an error message to the user for wrong cred
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QueenBeeManager Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        left={<TextInput.Icon icon="email" />}
        theme={{ colors: { primary: '#FFC914' }}}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        secureTextEntry
        mode="outlined"
        onChangeText={setPassword}
        left={<TextInput.Icon icon="key" />}
        

        theme={{ colors: { primary: '#FFC914' }}}
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        labelStyle={styles.buttonLabel}
        buttonColor={'#663399'}

      >
        Login
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("SignUp")}
        style={styles.button}
        labelStyle={styles.buttonLabel}
        buttonColor={'#663399'}
      >
        Non hai un account? Registrati
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: "100%",
    height: "30%", // Set this to adjust image size
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#688E50",
  },
  input: {
    width: "80%",
    marginBottom: 10,
  },
  button: {
    width: "80%",
    marginTop: 10,
  },
  buttonLabel: {
    color: "white", // For contained buttons
  },
});

export default LoginScreen;
