import React, {useState} from "react";
import { View, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../config/firebaseConfig";
import { FIREBASE_AUTH } from "../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput, Dialog, Portal, Snackbar } from 'react-native-paper';





const ApiaryCreationScreen = () => {

    const [apiaryName, setApiaryName] = useState('')
    const [location, setLocation] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation();
    const [visibleSnack, setVisibleSnack] = useState(false);

    const openSnackBar = () => setVisibleSnack(!visibleSnack)
    const onDismissSnackBar = () => setVisibleSnack(false)


    const handleCreateApiary = async () => {
        setIsLoading(true)
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
            openSnackBar();

            setTimeout(()=> {
              navigation.navigate("ApiaryScreen");
            }
           ,3000);
            //console.log("Apiary created successfully!");
      //Alert.alert("Success", "Apiary created successfully!"); // Success feedback
            // Handle successful apiary creation
          } catch (error) {
            // Handle errors
            console.error("Error creating apiary: ", error);
            Alert.alert("Error", "Failed to create apiary."); 
          } finally {
            setIsLoading(false)
          }
        };



    return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome apiario"
        value={apiaryName}
        onChangeText={setApiaryName}
        mode="outlined"
        theme={{ colors: { primary: 'green' }}}
        style={styles.input}
      />
      <TextInput
        placeholder="Posizione"
        value={location}
        onChangeText={setLocation}
        mode="outlined"
        theme={{ colors: { primary: 'green' }}}
        left={<TextInput.Icon icon="compass" />}
        style={styles.input}
      />
      <Button 
       style={styles.button}
       labelStyle={styles.buttonLabel}
       mode="contained" onPress={handleCreateApiary} >Crea Apiario</Button>

  <Snackbar 
          visible={visibleSnack}
          onDismiss={onDismissSnackBar}
        
          style={{ backgroundColor: 'green' }} 
          >
          Apiario creato con successo!
        </Snackbar>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green', // Use your theme color
},
input: {
    width: '80%',
    marginBottom: 10,
},
button: {
    width: '80%',
    marginTop: 10,
},
buttonLabel: {
    color: 'white', // For contained buttons
},
});

export default ApiaryCreationScreen;