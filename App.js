import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './src/config/firebaseConfig';



export default function App() {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

// Listen to the Firebase Auth state and set the user status
useEffect(() => {
  const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
    setIsAuthenticated(!!user);
  });

  return () => unsubscribe(); // Cleanup subscription
}, []);

return (
  <PaperProvider>

  <NavigationContainer>
    {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
  </NavigationContainer>
  </PaperProvider>

);
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
