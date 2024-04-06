    import React, {useState} from "react";
    import { Text, View, StyleSheet, Image } from "react-native";
    import { signInWithEmailAndPassword } from 'firebase/auth';
    import { FIREBASE_AUTH } from "../config/firebaseConfig";
    import { useNavigation } from "@react-navigation/native";
    import { Button, TextInput, Icon } from 'react-native-paper';



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
            <Text style={styles.title}>Benvenuto su QueenBeeManager</Text>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    left={<TextInput.Icon icon="email" />}
                    theme={{ colors: { primary: 'green' }}}
                    />
                    <TextInput
                    placeholder="Password"
                    style={styles.input}
                    value={password}
                    secureTextEntry
                    mode="outlined"
                    onChangeText={setPassword}
                    left={<TextInput.Icon icon="key" />}

                    theme={{ colors: { primary: 'green' }}}
                    />
                    <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.button}
                labelStyle={styles.buttonLabel}
            >
                Login
            </Button>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('SignUp')}
                style={styles.button}
                labelStyle={styles.buttonLabel}
            >
                Non hai un account? Registrati
            </Button>

            </View>
        )
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
        },
        logo: {
            width: '100%',
            height: '30%', // Set this to adjust image size
            marginBottom: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            color: 'green', // Use your theme color
        },
        input: {
            width: '80%',
            marginBottom: 10,
        },
        button: {
            width: '80%',
            marginTop: 10,
        },
        buttonLabel: {
            color: 'white', // For contained buttons
        },
    });
    


    export default LoginScreen;