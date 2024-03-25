import React, {useState, useEffect } from 'react';
import { View,  StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where,getDocs } from 'firebase/firestore';
import { FIREBASE_AUTH } from '../config/firebaseConfig';
import { FIRESTORE_DB } from '../config/firebaseConfig';
import { List,  Dialog, Portal, Paragraph, Text  } from 'react-native-paper';



const ApiaryScreen = () => {
    const navigation = useNavigation();
    const [apiaries, setApiaries] = useState([]);
    const [isDialogVisible, setIsDialogVisible] = useState(false)
    

  useEffect(() => {
    const fetchApiaries = async () => {
      const q = query(collection(FIRESTORE_DB, "apiaries"), where("userId", "==", FIREBASE_AUTH.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const apiariesData = [];
      querySnapshot.forEach((doc) => {
        apiariesData.push({ id: doc.id, ...doc.data() });
      });
      setApiaries(apiariesData);
      if (apiariesData.length === 0) {
        // Show dialog if no apiaries are found
        setIsDialogVisible(true);
      }
    
      console.log(apiariesData);
    };
    

    fetchApiaries();
  }, []);

  const handleDialogDismiss = () => {
    setIsDialogVisible(false);
    navigation.navigate('ApiaryCreationScreen'); // Navigate to creation screen
  };

  return (
    <View style={styles.container}>
     <Text variant="headlineMedium">Your apiaries </Text>
      <ScrollView contentContainerStyle={styles.contentContainer}>
    {apiaries.map(apiary => (
      <List.Item
        key={apiary.id}
        title={apiary.name}
        description={`Location: ${apiary.location}`}
        left={props => <List.Icon {...props} icon="bee-flower" />}
        onPress={() => navigation.navigate('Hives', { screen: 'Hives', params: { apiaryId: apiary.id } })}
        
        />
    ))}
      <Button mode="contained" title="Create apiary" onPress={() => navigation.navigate('ApiaryCreationScreen')} >Create Apiary </Button>

  </ScrollView>
  <Portal>
          <Dialog visible={isDialogVisible} onDismiss={handleDialogDismiss}>
            <Dialog.Title>No Apiaries</Dialog.Title>
            <Dialog.Content>
              <Paragraph>You don't have any apiaries yet. Let's create one!</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleDialogDismiss}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

    </View>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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