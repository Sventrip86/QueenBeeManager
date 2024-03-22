import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HiveScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HiveScreen</Text>
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

export default HiveScreen;