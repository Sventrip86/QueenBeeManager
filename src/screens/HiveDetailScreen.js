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
                <Paragraph style={styles.paragraph}>Nome: {hive.name}</Paragraph>
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Data creazione: {hive.creationDate}</Paragraph>
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Uova: </Paragraph>
                <IconButton
                  icon={hive.eggs ? 'check' : 'close'}
                  size={20}
                  iconColor={hive.eggs ? 'green' : 'red'}
                  style={styles.iconButton}

                />
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Regina: </Paragraph>
                <IconButton
                  icon={hive.queen ? 'check' : 'close'}
                  size={20}
                  iconColor={hive.queen ? 'green' : 'red'}
                  style={styles.iconButton}

                />
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Cupolini Reali: </Paragraph>
                <IconButton
                  icon={hive.cupoliniReali ? 'check' : 'close'}
                  size={20}
                  iconColor={hive.cupoliniReali ? 'green' : 'red'}
                  style={styles.iconButton}

                />
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Celle Reali: </Paragraph>
                <IconButton
                  icon={hive.celleReali ? 'check' : 'close'}
                  size={20}
                  iconColor={hive.celleReali ? 'green' : 'red'}
                  style={styles.iconButton}

                />
              </View>
              
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Note: {hive.notes}</Paragraph>
              </View>
            </Card.Content>
          </Card>
          )}




      {visits.map(visit => (
        <Card key={visit.id} style={styles.card}>
          <Card.Content>
            {/* Display visit details */}
            <Paragraph>Visitato il: {visit.visitedAt}</Paragraph>
             
            <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Uova: </Paragraph>
                <IconButton
                  icon={visit.eggs ? 'check' : 'close'}
                  size={20}
                  iconColor={visit.eggs ? 'green' : 'red'}
                  style={styles.iconButton}

                />
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Regina: </Paragraph>
                <IconButton
                  icon={visit.queen ? 'check' : 'close'}
                  size={20}
                  iconColor={visit.queen ? 'green' : 'red'}
                  style={styles.iconButton}

                />
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Cupolini Reali: </Paragraph>
                <IconButton
                  icon={visit.cupoliniReali ? 'check' : 'close'}
                  size={20}
                  iconColor={visit.cupoliniReali ? 'green' : 'red'}
                  style={styles.iconButton}
                />
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Celle Reali: </Paragraph>
                <IconButton
                  icon={visit.celleReali ? 'check' : 'close'}
                  size={20}
                  iconColor={visit.celleReali ? 'green' : 'red'}
                  style={styles.iconButton}

                />
              </View>
              
              <View style={styles.row}>
                <Paragraph style={styles.paragraph}>Note: {visit.notes}</Paragraph>
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
      backgroundColor: '#f0f0f0', // Light grey background for card
      elevation: 2,
    },
    cardHive: {
      marginVertical: 8,
      backgroundColor: '#FFD670', // Light grey background for hive card
      elevation: 2,

    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4, // Spacing between each row
    },
    paragraph: {
      flex: 1, 
      marginRight: 8, // Space between text and icon
      fontSize: 20,
    },
    iconButton: {
      flexShrink: 1, 
    },
  });

export default HiveDetailScreen;
