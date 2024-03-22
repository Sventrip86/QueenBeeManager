import React, {useState} from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from "../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";



const SignUpScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();


    const handleSignUp = async () => {
        try {
          if (email !== '' && password !== '') {
            await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            // Handle successful signup, like showing a welcome message or redirecting to login
          } else {
            // Handle error, like showing a message that email and password are required
          }
        } catch (error) {
          // Handle any other error, such as email already in use
          console.error(error.message);
          // Optionally, display an error message to the user
        }
      };
      


    return(
        <View>
            <Text>SignUp screen</Text>
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                />
                   <TextInput
                placeholder="Password"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                />
                <Button title="signUp" onPress={handleSignUp} />
      <Button
        title="Already registered? Log in"
        onPress={() => navigation.navigate('Login')}
      />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    input: {
      width: 200,
      height: 40,
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 10,
    },
  });
  


export default SignUpScreen;