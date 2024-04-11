import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView , TouchableOpacity} from 'react-native';
import { Card, Button, Paragraph, IconButton, List, Text , Chip} from 'react-native-paper';
import { collection, query, where, getDocs, collectionGroup } from 'firebase/firestore';
import { FIRESTORE_DB } from '../config/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';


const HiveScreen = ({ navigation, route }) => {
  const [hives, setHives] = useState([]);
  const apiaryId = route.params.apiaryId;

    const fetchHives = async () => {
      const q = query(collection(FIRESTORE_DB, 'hives'), where('apiaryId', '==', apiaryId));
      const querySnapshot = await getDocs(q);
      const hivesData = [];
      querySnapshot.forEach((doc) => {
        hivesData.push({ id: doc.id, ...doc.data() });
      });
      setHives(hivesData);
    };

 
  useFocusEffect(
    useCallback(() => {
        fetchHives();

        // No cleanup action needed; if there was, it would go here
        return () => {};
    }, [apiaryId])
);

  return (
    <View style={styles.container}>
       <Text variant="displaySmall" style={styles.title}>Le tue arnie</Text>
      
      <ScrollView>
      {hives.map(hive => (
        <TouchableOpacity
      key={hive.id}
      onPress={() => navigation.navigate('HiveVisitCreationScreen', { hiveId: hive.id })}
      style={styles.hiveItem}
    >
      <View style={styles.listItemContainer}>
        <View style={styles.headerContainer}>
        <List.Icon icon="hexagon-multiple" />
        <Text style={styles.hiveName}>{hive.name}</Text>
        </View>
        

        <View style={styles.hiveInfo}>
          <View style={styles.chipsContainer}>
          <Text >Ultima visita: </Text>

            <View style={styles.lastVisit}>
            <Chip icon={hive.eggs ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Uova</Chip>
            <Chip icon={hive.queen ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Regina</Chip>
            <Chip style={styles.chipStyle} textStyle={styles.chipText}>Covata: {hive.covata}</Chip>
            <Chip icon={hive.celleReali ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Celle Reali</Chip>
            <Chip icon={hive.cupoliniReali ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Cupolini Reali</Chip>
            </View>
           
           
          </View>
        </View>
      </View>
    </TouchableOpacity>
    ))}
    <Button
        mode="contained"
       
        onPress={() => navigation.navigate('HiveCreationScreen', { apiaryId })}>
          
        Aggiungi Arnia
      </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10, 
  },
  hiveItem: {
    backgroundColor: '#FFD670', 
    borderRadius: 8, 
    borderWidth: 1,
    borderColor: '#4C2E05', 
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10, 
    elevation: 2, 
  },
  title: {
    textAlign: 'center',
    fontSize: 25, 
    fontWeight: 'bold',
    marginBottom: 20, // Adds more space above the ScrollView
  },
  listItemContainer: {
    flexDirection: 'column',
  },
  hiveInfo: {
    marginLeft: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Ensures icon and text are aligned
    marginBottom: 10, // Adds spacing between header and chips
  },
  lastVisit: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hiveName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  chipsContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  chipStyle: {
    margin: 4,
    backgroundColor: '#f0f0f0', // Consider a background color for chips for distinction
  },
  chipText: {
    fontSize: 14,
  },
});



export default HiveScreen;
