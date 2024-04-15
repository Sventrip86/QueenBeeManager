import React, { useState } from "react";
import {  View, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  TextInput, 
  Text
} from "react-native-paper";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      if (email !== "" && password !== "") {
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      } else {
        // Handle error, like showing a message that email and password are required
      }
    } catch (error) {
      // Handle any other error, such as email already in use
      console.error(error.message);
      // Optionally, display an error message to the user
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrati su QueenBeeManager</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        left={<TextInput.Icon icon="email" />}
        theme={{ colors: { primary: "#FCC602" } }}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        secureTextEntry
        mode="outlined"
        onChangeText={setPassword}
        left={<TextInput.Icon icon="key" />}
        theme={{ colors: { primary: "#FCC602" } }}
      />
      <Button
        buttonColor={"#663399"}
        style={styles.button}
        labelStyle={styles.buttonLabel}
        mode="contained"
        onPress={handleSignUp}
      >
        Registrati
      </Button>
      <Button
        buttonColor={"#663399"}
        style={styles.button}
        labelStyle={styles.buttonLabel}
        mode="contained"
        title="Already registered? Log in"
        onPress={() => navigation.navigate("Login")}
      >
        Sei già registrato? Accedi{" "}
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
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#688E50", // Asparagus
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

export default SignUpScreen;
