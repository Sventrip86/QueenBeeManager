import { useState } from "react";
import React from "react";
import { FIRESTORE_DB } from "../config/firebaseConfig";
import { View, StyleSheet, ScrollView } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { TextInput, Button, Switch, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from "../config/firebaseConfig";



const HiveVisitCreationScreen = ({route}) => {
    const apiaryId = route.params?.apiaryId;

    const { hiveId } = route.params;
    const [eggs, setEggs] = useState(false);
    const [queen, setQueen] = useState(false);
    const [covata, setCovata] = useState('');
    const [cupoliniReali, setCupoliniReali] = useState(false);
    const [celleReali, setCelleReali] = useState(false);
    const [notes, setNotes] = useState('');
    const navigation = useNavigation();


    const handleSubmit = async () => {
        if(!hiveId){
            console.error('No hiveId provided');
            return;
        }
        let parsedCovata = covata && !isNaN(parseFloat(covata)) ? parseFloat(covata) : 0;

        try {
            await addDoc(collection(FIRESTORE_DB, 'hives', hiveId, 'visits'), {
                eggs,
                queen,
                covata: parsedCovata,
                cupoliniReali,
                celleReali,
                notes,
                userId: FIREBASE_AUTH.currentUser.uid,
                visitedAt: new Date().toISOString(),
            });
            navigation.navigate("Hives", { apiaryId });
            // Optional: Navigate back or to another screen
          } catch (error) {
            console.error(error);
          }
        };
    
    
    return(
        <View style={styles.container}>
            <Button 
            mode="contained"
            onPress={()=> navigation.navigate("HiveDetailScreen", { hiveId: hiveId })}
                        >Go to the views history</Button>
            
        
        <ScrollView  contentContainerStyle={styles.contentContainer}>   
        
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
                <Button mode="contained" onPress={handleSubmit}>Create Visit</Button>
            </ScrollView>
            </View>
)
}


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


export default HiveVisitCreationScreen;