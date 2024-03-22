import React, {useState, useEffect } from 'react';
import { View,  StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { collection, query, where,getDocs } from 'firebase/firestore';
import { FIREBASE_AUTH } from '../config/firebaseConfig';
import { FIRESTORE_DB } from '../config/firebaseConfig';
import { List } from 'react-native-paper';



const ApiaryScreen = () => {
    const navigation = useNavigation();
    const [apiaries, setApiaries] = useState([]);

  useEffect(() => {
    const fetchApiaries = async () => {
      const q = query(collection(FIRESTORE_DB, "apiaries"), where("userId", "==", FIREBASE_AUTH.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const apiariesData = [];
      querySnapshot.forEach((doc) => {
        apiariesData.push({ id: doc.id, ...doc.data() });
      });
      setApiaries(apiariesData);
      console.log(apiariesData);
    };

    fetchApiaries();
  }, []);

  return (
    <View style={styles.container}>
     <Text variant="titleMedium">Your apiaries </Text>
      <ScrollView contentContainerStyle={styles.contentContainer}>
    {apiaries.map(apiary => (
      <List.Item
        key={apiary.id}
        title={apiary.name}
        description={`Location: ${apiary.location}`}
        left={props => <List.Icon {...props} icon="bee-flower" />}
        onPress={() => {/* Handle item press, navigate to details, etc. */}}
      />
    ))}
      <Button mode="contained" title="Create apiary" onPress={() => navigation.navigate('ApiaryCreationScreen')} >Create Apiary </Button>

  </ScrollView>

    </View>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
   
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: 'blue',
    marginBottom: 20,
  },
});

export default ApiaryScreen;