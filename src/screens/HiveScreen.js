import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, Paragraph, IconButton, List } from 'react-native-paper';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../config/firebaseConfig';

const HiveScreen = ({ navigation, route }) => {
  const [hives, setHives] = useState([]);
  const apiaryId = route.params.apiaryId;

  useEffect(() => {
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
        onPress={() => navigation.navigate('HiveCreationScreen', { apiaryId })}>
        Add Hive
      </Button>
      <ScrollView>
      {hives.map(hive => (
      <List.Item
        key={hive.id}
        title={hive.name}
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
    padding: 20,
  },
  card: {
    marginVertical: 8,
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
