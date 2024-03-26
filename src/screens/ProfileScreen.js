import React, {useEffect, useState} from 'react';
import { View,  StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../config/firebaseConfig';
import { Text, Button } from 'react-native-paper';
import { FIRESTORE_DB } from '../config/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';





const ProfileScreen = () => {

    const navigate = useNavigation();
    const [totApiaries, setTotApiaries] = useState(0);
    const [totHives, setTotHives] = useState(0);
   

useEffect(()=>{
    const auth = getAuth()
    const userId = auth.currentUser?.uid

    const fetchApiariesAndHives = async () => {
      if (userId) {
                const apiariesQuery = query(collection(FIRESTORE_DB, 'apiaries'), where('userId', '==', userId));
                const apiariesSnapshot = await getDocs(apiariesQuery);
                setTotApiaries(apiariesSnapshot.size);


                let totHives = 0;
                for (const apiaryDoc of apiariesSnapshot.docs) {
                  const hivesQuery = query(collection(FIRESTORE_DB, 'hives'), where('apiaryId', '==', apiaryDoc.id));
                  const hivesSnapshot = await getDocs(hivesQuery);
                  totHives += hivesSnapshot.size;
                }
                setTotHives(totHives);
              }
            
        }

        fetchApiariesAndHives();
  },
   []);

 

    const handleLogout = () => {
        signOut(FIREBASE_AUTH).then(() => {
            navigate.navigate('Login')
        }).catch((error) => {
        console.error(error)
        });
    };


  return (
    <View style={styles.container}>
      <Text style={styles.text} variant='headlineMedium'>Profile</Text>
      <Text style={styles.text} variant='headlineSmall'>TOTAL APIARIES: {totApiaries}</Text>
      <Text style={styles.text} variant='headlineSmall'>TOTAL HIVES: {totHives}</Text>
      <Text style={styles.text} variant='headlineSmall'>TOTAL VISITS: </Text>

      <Button 
      mode='contained' 
      onPress={handleLogout}>Log Out</Button>

    </View>
  );
};

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

export default ProfileScreen;