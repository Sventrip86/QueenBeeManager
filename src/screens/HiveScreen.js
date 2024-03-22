import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Button } from 'react-native-paper';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const HiveScreen = ({ navigation, route }) => {
  const [hives, setHives] = useState([]);
  const apiaryId = route.params.apiaryId; // Get the apiaryId from navigation params

  useEffect(() => {
    console.log('Route params:', route.params);

    const fetchHives = async () => {
      const q = query(collection(FIRESTORE_DB, 'hives'), where('apiaryId', '==', apiaryId));
      const querySnapshot = await getDocs(q);
      const hivesData = [];
      querySnapshot.forEach((doc) => {
        hivesData.push({ id: doc.id, ...doc.data() });
      });
      setHives(hivesData);
    };

    fetchHives();
  }, [apiaryId]);

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('HiveCreationScreen', { apiaryId })}
      >
        Add Hive
      </Button>
      <ScrollView>
        {hives.map(hive => (
          <List.Item
            key={hive.id}
            title={hive.name}
            description={`Last Update: ${hive.lastUpdate}`}
            onPress={() => {/* Navigate to Hive Details */}}
            // Add more properties as needed
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  // Additional styles if needed
});

export default HiveScreen;
