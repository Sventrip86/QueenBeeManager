import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView , TouchableOpacity} from 'react-native';
import { Card, Button, Paragraph, IconButton, List, Text , Chip} from 'react-native-paper';
import { collection, query, where, getDocs } from 'firebase/firestore';
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
        <List.Icon icon="hexagon-multiple"  />
        <View style={styles.hiveInfo}>
          <Text style={styles.hiveName}>{hive.name}</Text>
          <View style={styles.chipsContainer}>
            <Chip icon={hive.eggs ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Uova</Chip>
            <Chip icon={hive.queen ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Regina</Chip>
            <Chip style={styles.chipStyle} textStyle={styles.chipText}>Covata: {hive.covata}</Chip>
            <Chip icon={hive.celleReali ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Celle Reali</Chip>
            <Chip icon={hive.cupoliniReali ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Cupolini Reali</Chip>
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
    paddingHorizontal: 10, // Added horizontal padding
  },
  card: {
    marginVertical: 8,
  },
  hiveItem: {
    backgroundColor: '#fff', // Background color for hive items
    borderRadius: 8,
    borderWidth: 1, // Add border width
    borderColor: 'black', // Add border color
    marginVertical: 10,
    marginHorizontal: 10, // Add horizontal margin
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4, // Spacing between each row
  },
  paragraph: {
    marginRight: 8, // Space between label and icon or next element
  },
  title: {
    textAlign: 'center'
  }, 
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hiveInfo: {
    flex: 1,
    marginLeft: 10,
  },
  hiveName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  chipStyle: {
    margin: 4,
  },
  chipText: {
    fontSize: 14,
  },
});

export default HiveScreen;
