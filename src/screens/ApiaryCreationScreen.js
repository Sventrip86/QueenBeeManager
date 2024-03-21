import React, {useState} from "react";
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { collection, addDoc } from "firebase/firestore";




const ApiaryCreationScreen = () => {

    const [apiaryName, setApiaryName] = useState('')
    const [location, setLocation] = useState('')


    const handleCreateApiary = async () => {
        if (!apiaryName || !location) {
            // Handle validation error
            return;
          }
          try {
            await addDoc(collection(FIRESTORE_DB, "apiaries"), {
              name: apiaryName,
              location: location,
              creationDate: new Date().toISOString(),
              userId: FIREBASE_AUTH.currentUser.uid, 
            });
            // Handle successful apiary creation
          } catch (error) {
            // Handle errors
            console.error(error.message);
          }
        };



    return (
    <View style={styles.container}>
      <TextInput
        placeholder="Apiary Name"
        value={apiaryName}
        onChangeText={setApiaryName}
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      {/* Add other fields here */}
      <Button title="Create Apiary" onPress={handleCreateApiary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default ApiaryCreationScreen;