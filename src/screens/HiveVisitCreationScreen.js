import { useState } from "react";
import React from "react";
import { FIRESTORE_DB } from "../config/firebaseConfig";
import { View, StyleSheet, ScrollView } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { TextInput, Button, Switch, List, Snackbar} from 'react-native-paper';
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
    const [visibleSnack, setVisibleSnack] = useState(false);


    const openSnackBar = () => setVisibleSnack(!visibleSnack)
  
    const onDismissSnackBar = () => setVisibleSnack(false)
  

    const handleSubmit = async () => {
        // check for hive 
        if(!hiveId){
            console.error('No hiveId provided');
            return;
        }

        // TODO not rendering 
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
            // if the creation is succesfull open the snack then navigate back 
            openSnackBar();
            setTimeout(() => {
              navigation.navigate("Hives", { apiaryId });
      
            }, 3000);
          } catch (error) {
            console.error(error);
          }
        };
    
    
    return(
        <View style={styles.container}>
            <Button 
            mode="contained"
            onPress={()=> navigation.navigate("HiveDetailScreen", { hiveId: hiveId })}
                        >Visualizza lo storico visite</Button>
            
        
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
                <Button mode="contained" 
                
                onPress={handleSubmit}>Crea Visita</Button>
            </ScrollView>
            <Snackbar 
        visible={visibleSnack}
        onDismiss={onDismissSnackBar}
       
        style={{ backgroundColor: 'green' }} 
        >
        Visita creata con successo!
      </Snackbar>
            </View>
)
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    contentContainer: {
      backgroundColor: '#FFD670',
      marginVertical: 20
    },
    input: {
      marginBottom: 10,
    },
  });


export default HiveVisitCreationScreen;