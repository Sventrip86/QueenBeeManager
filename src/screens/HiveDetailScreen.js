// HiveDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Paragraph, IconButton , Chip} from 'react-native-paper';
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
            <Card key={hive.id} style={styles.cardHive} mode="outlined">
            <Card.Title title={`Arnia: ${hive.name}`} subtitle={`Data di Creazione: ${hive.creationDate}`} />
            <Card.Content>
              <Paragraph style={styles.header}>Dettagli Arnia</Paragraph>
              <Chip icon={hive.eggs ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Uova: {hive.eggs ? 'Presenti' : 'Assenti'}</Chip>
              <Chip icon={hive.queen ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Regina: {hive.queen ? 'Presente' : 'Assente'}</Chip>
              <Chip style={styles.chipStyle} textStyle={styles.chipText}>Covata: {hive.covata}</Chip>
              <Chip icon={hive.celleReali ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Celle Reali: {hive.celleReali ? 'Sì' : 'No'}</Chip>
              <Chip icon={hive.cupoliniReali ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Cupolini Reali: {hive.cupoliniReali ? 'Sì' : 'No'}</Chip>
              <Chip style={styles.chipStyle} textStyle={styles.chipText}>Note: {hive.notes}</Chip>
            </Card.Content>
          </Card>

          )}




      {visits.map(visit => (
          <Card key={hive.id} style={styles.cardVisit} mode="outlined">
          <Card.Title title={`Arnia: ${hive.name}`} subtitle={`Data visita: ${visit.visitedAt}`} />
          <Card.Content>
            <Paragraph style={styles.header}>Dettagli visita</Paragraph>
            <Chip icon={visit.eggs ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Uova: {visit.eggs ? 'Presenti' : 'Assenti'}</Chip>
            <Chip icon={visit.queen ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Regina: {visit.queen ? 'Presente' : 'Assente'}</Chip>
            <Chip style={styles.chipStyle} textStyle={styles.chipText}>Covata: {visit.covata}</Chip>
            <Chip icon={visit.celleReali ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Celle Reali: {visit.celleReali ? 'Sì' : 'No'}</Chip>
            <Chip icon={visit.cupoliniReali ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Cupolini Reali: {visit.cupoliniReali ? 'Sì' : 'No'}</Chip>
            <Chip style={styles.chipStyle} textStyle={styles.chipText}>Note: {visit.notes}</Chip>
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
      marginVertical: 20
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
    cardHive: {
        margin: 10,
        elevation: 4,
        borderRadius: 8,
        backgroundColor: '#FFD670'
      },
      cardVisit:{
        margin: 10,
        elevation: 4,
        borderRadius: 8
      },
      header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      chipStyle: {
        marginVertical: 4,
        paddingHorizontal: 5,
        justifyContent: 'flex-start',
      },
      chipText: {
        fontSize: 16,
      },
  });

export default HiveDetailScreen;
