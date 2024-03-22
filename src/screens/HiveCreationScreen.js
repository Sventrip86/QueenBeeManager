import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Switch, List } from 'react-native-paper';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const HiveCreationScreen = ({  route }) => {
  const [name, setName] = useState('');
  const [eggs, setEggs] = useState(false);
  const [queen, setQueen] = useState(false);
  const [covata, setCovata] = useState('');
  const [cupoliniReali, setCupoliniReali] = useState(false);
  const [celleReali, setCelleReali] = useState(false);
  const [notes, setNotes] = useState('');
  const navigation = useNavigation();


  const handleSubmit = async () => {
    const apiaryId = route.params?.apiaryId;
    if (!apiaryId) {
      console.error('No apiaryId provided');
      return; // Optionally, show an error message to the user
    }
        try {
      await addDoc(collection(FIRESTORE_DB, 'hives'), {
        name,
        eggs,
        queen,
        covata: parseFloat(covata), // Convert to float
        cupoliniReali,
        celleReali,
        notes,
        apiaryId, // Passed from the Apiary screen
        userId: FIREBASE_AUTH.currentUser.uid,
        creationDate: new Date().toISOString(),
       
      });
      // Handle successful creation
      navigation.navigate("Hives", { apiaryId });
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TextInput
        label="Hive Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <List.Item
        title="Eggs"
        right={() => <Switch value={eggs} onValueChange={setEggs} />}
      />
      <List.Item
        title="Queen"
        right={() => <Switch value={queen} onValueChange={setQueen} />}
      />
      <TextInput
        label="Covata"
        value={covata}
        onChangeText={setCovata}
        keyboardType="numeric"
        style={styles.input}
      />
      <List.Item
        title="Cupolini Reali"
        right={() => <Switch value={cupoliniReali} onValueChange={setCupoliniReali} />}
      />
      <List.Item
        title="Celle Reali"
        right={() => <Switch value={celleReali} onValueChange={setCelleReali} />}
      />
      <TextInput
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSubmit}>Create Hive</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 20, 
  },
  input: {
    marginBottom: 10,
  },
});

export default HiveCreationScreen;
