// HiveDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Paragraph, IconButton } from 'react-native-paper';
import { doc, getDoc, collection, query, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../config/firebaseConfig';

const HiveDetailScreen = ({ route }) => {
  const { hiveId } = route.params;
  const [ hive, setHive] = useState(null)
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    // Fetch the hive's visit history
    const fetchHiveAndVisits = async () => {
        //fetch hive
        const hiveRef = doc(FIRESTORE_DB, 'hives' , hiveId)
        const hiveDoc = await getDoc(hiveRef);
        if (hiveDoc.exists()) {
          setHive({ id: hiveDoc.id, ...hiveDoc.data() });
        }
        //fetch visits
      const q = query(collection(FIRESTORE_DB, 'hives', hiveId, 'visits'));
      const querySnapshot = await getDocs(q);
      const visitsData = [];
      querySnapshot.forEach((doc) => {
        visitsData.push({ id: doc.id, ...doc.data() });
      });
      setVisits(visitsData);
    };

    fetchHiveAndVisits();
  }, [hiveId]);

  return (
    <ScrollView style={styles.container}>
        {hive && (
<Card key={hive.id} style={styles.cardHive} mode='contained'>
            <Card.Content>
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Name: {hive.name}</Paragraph>
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Creation Date: {hive.creationDate}</Paragraph>
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Last Update: {hive.lastUpdate}</Paragraph>
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Eggs: </Paragraph>
                <IconButton
                  icon={hive.eggs ? 'check' : 'close'}
                  size={20}
                  color={hive.eggs ? 'green' : 'red'}
                />
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Queen: </Paragraph>
                <IconButton
                  icon={hive.queen ? 'check' : 'close'}
                  size={20}
                  color={hive.queen ? 'green' : 'red'}
                />
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Cupolini Reali: </Paragraph>
                <IconButton
                  icon={hive.cupoliniReali ? 'check' : 'close'}
                  size={20}
                  color={hive.cupoliniReali ? 'green' : 'red'}
                />
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Celle Reali: </Paragraph>
                <IconButton
                  icon={hive.celleReali ? 'check' : 'close'}
                  size={20}
                  color={hive.celleReali ? 'green' : 'red'}
                />
              </View>
              
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Notes: {hive.notes}</Paragraph>
              </View>
            </Card.Content>
          </Card>
          )}




      {visits.map(visit => (
        <Card key={visit.id} style={styles.card}>
          <Card.Content>
            {/* Display visit details */}
            <Paragraph>Visited At: {visit.visitedAt}</Paragraph>
          
             
            <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Eggs: </Paragraph>
                <IconButton
                  icon={hive.eggs ? 'check' : 'close'}
                  size={20}
                  color={hive.eggs ? 'green' : 'red'}
                />
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Queen: </Paragraph>
                <IconButton
                  icon={hive.queen ? 'check' : 'close'}
                  size={20}
                  color={hive.queen ? 'green' : 'red'}
                />
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Cupolini Reali: </Paragraph>
                <IconButton
                  icon={hive.cupoliniReali ? 'check' : 'close'}
                  size={20}
                  color={hive.cupoliniReali ? 'green' : 'red'}
                />
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Celle Reali: </Paragraph>
                <IconButton
                  icon={hive.celleReali ? 'check' : 'close'}
                  size={20}
                  color={hive.celleReali ? 'green' : 'red'}
                />
              </View>
              
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Notes: {hive.notes}</Paragraph>
              </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
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
  cardHive: {
    marginVertical: 8,
 
    
  },
});

export default HiveDetailScreen;
