import React from 'react';
import { View,  StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';


const ApiaryScreen = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
     <Text variant="titleMedium">ApiaryScreen</Text>
      <Button mode="contained" title="Create apiary" onPress={() => navigation.navigate('ApiaryCreationScreen')} >Create Apiary </Button>
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