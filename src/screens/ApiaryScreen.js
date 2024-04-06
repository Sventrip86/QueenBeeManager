  import React, {useState, useEffect, useCallback } from 'react';
  import { View,  StyleSheet, ScrollView } from 'react-native';
  import { Button } from 'react-native-paper';
  import { useFocusEffect, useNavigation } from '@react-navigation/native';
  import { collection, query, where,getDocs, deleteDoc, doc } from 'firebase/firestore';
  import { FIREBASE_AUTH } from '../config/firebaseConfig';
  import { FIRESTORE_DB } from '../config/firebaseConfig';
  import { List,  Dialog, Portal, Paragraph, Text , IconButton, Menu } from 'react-native-paper';



  const ApiaryScreen = () => {
      const navigation = useNavigation();
      const [apiaries, setApiaries] = useState([]);
      const [isDialogVisible, setIsDialogVisible] = useState(false)
      const [ selectedApiary, setSelectedApiary ] = useState(false)
      const [ isDialogSelectApiaryVisible, setDialogSelectApiaryVisible ] = useState(false)
      const [isApiarySelected, setIsApiarySelected] = useState(false);
      const [apiariesAvailable, setApiariesAvailable] = useState(false);
      const [menuVisible, setMenuVisible] = useState({});


      const toggleMenu = (apiaryId) => setMenuVisible(prev => ({ ...prev, [apiaryId]: !prev[apiaryId] }));



      

    
      const fetchApiaries = async () => {
        const q = query(collection(FIRESTORE_DB, "apiaries"), where("userId", "==", FIREBASE_AUTH.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const apiariesData = [];
        querySnapshot.forEach((doc) => {
          apiariesData.push({ id: doc.id, ...doc.data() });
        });
        setApiaries(apiariesData);

                  // Show dialog if no apiaries are found

        if (apiariesData.length === 0) {
          setIsDialogVisible(true);
          setApiariesAvailable(false);

        } else {
          setApiariesAvailable(true);
      }
  };
    
      useFocusEffect(
        useCallback(() => {
                fetchApiaries();
                    }, [])
    );


    const handleDialogDismiss = () => {
      setIsDialogVisible(false);
      navigation.navigate('ApiaryCreationScreen'); // Navigate to creation screen
    };

    const handleDialogSelectApiary = () => {
      setDialogSelectApiaryVisible(false) 
    }

    const handleSelectApiary = (apiaryId) => {

      setSelectedApiary(apiaryId);
      setIsApiarySelected(true);
      navigation.navigate('HivesTab', { screen: 'Hives', params: { apiaryId } });
    }

    const handleDeleteApiary = async (apiaryId) => {
      try {
        // First, delete all hives within the apiary
        const hivesRef = collection(FIRESTORE_DB, 'apiaries', apiaryId, 'hives');
        const querySnapshot = await getDocs(hivesRef);
        await Promise.all(querySnapshot.docs.map((doc) => deleteDoc(doc.ref)));
    
        // Then, delete the apiary document
        await deleteDoc(doc(FIRESTORE_DB, 'apiaries', apiaryId));
    
        await fetchApiaries();  // refresh the list 
        // display dialog select apiary check
        if (apiaries.length === 0) {
          setIsDialogVisible(true); // No apiaries left, show dialog to create new one
        } // elseif the user delete the selected apiary logic TODO
       
      } catch (error) {
        console.error('Error deleting apiary: ', error);
      }
    };
    

    const handleUpdateApiary = (apiaryId) => {

    }

     // Show dialog when the screen first loads and apiaries are available but no selected
     useEffect(() => {
      if (apiariesAvailable && !selectedApiary) {
          setDialogSelectApiaryVisible(true);
      }
  }, [apiariesAvailable, selectedApiary]);

    return (
      <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.text}>I tuoi apiari </Text>
        <ScrollView contentContainerStyle={styles.contentContainer}>
      {apiaries.map(apiary => (
        <List.Item
          key={apiary.id}
          title={apiary.name}
          description={`Posizione: ${apiary.location}`}
          left={props => <List.Icon {...props} icon="bee-flower" />}
          onPress={() => handleSelectApiary(apiary.id)}

          style={selectedApiary === apiary.id ? styles.selectedItem : styles.listItem}
          right={() => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Menu
                visible={menuVisible[apiary.id]}
                onDismiss={() => toggleMenu(apiary.id)}
                anchor={
                  <IconButton
                    icon="dots-vertical"
                    onPress={() => toggleMenu(apiary.id)}
                  />
                }>
                <Menu.Item  leadingIcon='pencil' onPress={() => handleUpdateApiary(apiary.id)} title="Modifica" />
                <Menu.Item leadingIcon='delete' onPress={() => handleDeleteApiary(apiary.id)} title="Elimina" />
              </Menu>
            </View>
          )}
          />
      ))}
        <Button mode="contained" title="Create apiary" onPress={() => {

          navigation.navigate('ApiaryCreationScreen')} 
          }    
          >Create Apiary </Button>
        
    </ScrollView>
    <Portal>
            <Dialog visible={isDialogVisible} onDismiss={handleDialogDismiss}>
              <Dialog.Title>Nessun apiario presente</Dialog.Title>
              <Dialog.Content>
                {/* <Paragraph>You don't have any apiaries yet. Let's create one!</Paragraph> */}
                <Paragraph>Non esistono apiari, creane subito uno! </Paragraph>

              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={handleDialogDismiss}>OK</Button>
              </Dialog.Actions>
            </Dialog>

            <Dialog visible={isDialogSelectApiaryVisible} onDismiss={handleDialogSelectApiary}>
            <Dialog.Icon icon="alert" />

              <Dialog.Title>Nessun apiario selezionato!</Dialog.Title>
              <Dialog.Content>
             {/* <Paragraph>You don't have any apiary selected. Please select one!</Paragraph> */}
             <Paragraph>Seleziona un apiario dalla lista</Paragraph> 
          </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={handleDialogSelectApiary}>OK</Button>
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
      paddingTop: 20,
      paddingHorizontal: 10
    },
    contentContainer: {
     // width: '100%',
    
    },
    text: {
      fontSize: 20,
      marginBottom: 20,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    selectedItem:{
      backgroundColor: '#ADD8E6', // Light blue for selected items
      borderRadius: 8,
      borderWidth: 1, // Added border width
      borderColor: 'black', // Added border color
      marginVertical: 10,
      marginHorizontal: 10, // Added horizontal margin
    }, 
    listItem: {
      backgroundColor: '#fff', // Background color for non-selected items
      borderRadius: 8,
      borderWidth: 1, // Added border width
      borderColor: 'black', // Added border color
      marginVertical: 10,
      marginHorizontal: 10, 
    }
  });

  export default ApiaryScreen;