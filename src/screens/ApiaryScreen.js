import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ApiaryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ApiaryScreen</Text>
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

export default ApiaryScreen;