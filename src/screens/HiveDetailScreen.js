// HiveDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Paragraph, IconButton , Chip, List, Text} from 'react-native-paper';
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

      {visits.map(visit => (
        <TouchableOpacity
            key={visit.id}
            style={styles.hiveItem}
          >
            <View style={styles.listItemContainer}>
              <View style={styles.headerContainer}>
                <List.Icon icon="hexagon-multiple" />
                <Text style={styles.hiveName}>{hive.name}</Text>
              </View>
              <View style={styles.hiveInfo}>
                <View style={styles.chipsContainer}>
                  <Text >Data visita: {visit.visitedAt}</Text>

                  <View style={styles.lastVisit}>
                    <Chip icon={visit.eggs ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Uova</Chip>
                    <Chip icon={visit.eggs ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Uova</Chip>
                    <Chip icon={visit.queen ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Regina</Chip>
                    <Chip style={styles.chipStyle} textStyle={styles.chipText}>Covata: {visit.covata}</Chip>
                    <Chip icon={visit.celleReali ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Celle Reali</Chip>
                    <Chip icon={visit.cupoliniReali ? 'check' : 'close'} style={styles.chipStyle} textStyle={styles.chipText}>Cupolini Reali</Chip>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>








          
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
        alignItems: 'center', // icon and text same line
        marginBottom: 10,
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
        backgroundColor: '#f0f0f0',
      },
      chipText: {
        fontSize: 14,
      },
  });

export default HiveDetailScreen;
