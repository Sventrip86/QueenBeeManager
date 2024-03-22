import React, {useState} from "react";
import { Text, View, StyleSheet,  } from "react-native";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from "../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput } from 'react-native-paper';



const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
          if (email !== '' && password !== '') {
            await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            // Handle successful login, like navigating to the home screen
          } else {
            // Handle error, like showing a message that email and password are required
          }
        } catch (error) {
          // Handle any other error, like wrong password or network issues
          console.error(error.message);
          // Optionally, display an error message to the user
        }
      };
      


    return(
        <View style={styles.container}>
            <Text>Login screen</Text>
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
                <Button mode="outlined" onPress={handleLogin} >Login </Button>
      <Button

        mode="outlined"
        onPress={() => navigation.navigate('SignUp')}
      >       Don't have an account? Sign Up
</Button>

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
    
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 10,
    },
  });
  


export default LoginScreen;