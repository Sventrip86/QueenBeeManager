import React, {useState} from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";


const SignUpScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


const handleSignUp = () => {
    
}


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