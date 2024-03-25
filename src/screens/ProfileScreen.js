import React from 'react';
import { View,  StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../config/firebaseConfig';
import { Text, Button } from 'react-native-paper';


const ProfileScreen = () => {

    const navigate = useNavigation();

    const handleLogout = () => {
        signOut(FIREBASE_AUTH).then(() => {
            navigation.navigate('Login')
        }).catch((error) => {
            // Handle errors
        });
    };


  return (
    <View style={styles.container}>
      <Text style={styles.text} variant='headlineMedium'>Profile</Text>
      <Button 
      mode='contained' 
      onPress={handleLogout}>Log Out</Button>

    </View>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: 'blue',
  },
});

export default ProfileScreen;