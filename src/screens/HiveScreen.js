import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, Paragraph, IconButton, List } from 'react-native-paper';
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
      <Button
        mode="contained"
       
        onPress={() => navigation.navigate('HiveCreationScreen', { apiaryId })}>
          
        Aggiungi Arnia
      </Button>
      <ScrollView>
      {hives.map(hive => (
      <List.Item
        key={hive.id}
        title={hive.name}
        style={styles.hiveItem}
        left={props => <List.Icon {...props} icon="hexagon-multiple" />}
        onPress={() => navigation.navigate('HiveVisitCreationScreen', { hiveId: hive.id })}

        
        
        />
    ))}
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
});

export default HiveScreen;
