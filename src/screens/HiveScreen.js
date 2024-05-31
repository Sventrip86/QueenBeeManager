import React, { useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {

  Button,

  List,
  Text,
  Chip,
} from "react-native-paper";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../config/firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";

const HiveScreen = ({ navigation, route }) => {
  const [hives, setHives] = useState([]); // empty array initial state
  const apiaryId = route.params.apiaryId; // passed from ApiaryScreen

  const fetchHives = async () => {
    try {
      // feching hives
      const q = query(
        collection(FIRESTORE_DB, "hives"),
        where("apiaryId", "==", apiaryId)
      );
      const querySnapshot = await getDocs(q);
      const hivesData = [];

      // querySnapshot.forEach((doc) => {
      //   // each doc pushed into hivesData array of obj with id and all data
      //   hivesData.push({ id: doc.id, ...doc.data() });
      // });
      for (const doc of querySnapshot.docs) {
        const hive = { id: doc.id, ...doc.data() };

        // reference the visits subcollection for the hive
        const visitCollectionRef = collection(FIRESTORE_DB, "hives", hive.id, "visits");
        // query to get the last visit based on visitedAt field
        const visitQuery = query(
          visitCollectionRef,
          orderBy("visitedAt", "desc"),
          limit(1)
        );
        // get the documents from the visit query
        const visitSnapshot = await getDocs(visitQuery);
        if (!visitSnapshot.empty) {
          // store the first array element in last visit
          const lastVisit = visitSnapshot.docs[0].data();
          console.log("Last visit data for hive", hive.id, ":", lastVisit);
          //
          hive.lastVisitDate = lastVisit.visitedAt;
          hive.lastVisitData = lastVisit;
        }
        // add the hive object to the hives data array
        hivesData.push(hive);
      }
      setHives(hivesData); // set state
    } catch (error) {
      console.log("error fetching hives and last visit", error);
    }
  };

  // screen focus rerender and refetch just if apiaryId changes
  useFocusEffect(
    useCallback(() => {
      fetchHives();
      console.log("fetching");
      // clean up function ?? TODO ??
      // return () => {  };
    }, [apiaryId])
  );

  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.title}>
        Le tue arnie
      </Text>

      <ScrollView>
        {hives.map((hive) => (
          <TouchableOpacity
            key={hive.id}
            onPress={() =>
              navigation.navigate("HiveVisitCreationScreen", {
                hiveId: hive.id,
              })
            }
            style={styles.hiveItem}
          >
            <View style={styles.listItemContainer}>
              <View style={styles.headerContainer}>
                <List.Icon icon="hexagon-multiple" />
                <Text style={styles.hiveName}>{hive.name}</Text>
              </View>

              <View style={styles.hiveInfo}>
                <View style={styles.chipsContainer}>
                  <Text>Ultima visita: {hive.lastVisitDate || "NA"}</Text>

                  <View style={styles.lastVisit}>
                    <Chip
                      icon={hive.lastVisitData?.eggs ? "check" : "close"}
                      style={styles.chipStyle}
                      textStyle={styles.chipText}
                    >
                      Uova
                    </Chip>
                    <Chip
                      icon={hive.lastVisitData?.queen ? "check" : "close"}
                      style={styles.chipStyle}
                      textStyle={styles.chipText}
                    >
                      Regina
                    </Chip>
                    <Chip style={styles.chipStyle} textStyle={styles.chipText}>
                      Covata: {hive.lastVisitData?.covata}
                    </Chip>
                    <Chip
                      icon={hive.celleReali ? "check" : "close"}
                      style={styles.chipStyle}
                      textStyle={styles.chipText}
                    >
                      Celle Reali
                    </Chip>
                    <Chip
                      icon={
                        hive.lastVisitData?.cupoliniReali ? "check" : "close"
                      }
                      style={styles.chipStyle}
                      textStyle={styles.chipText}
                    >
                      Cupolini Reali
                    </Chip>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate("HiveCreationScreen", { apiaryId })
          }
        >
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
    backgroundColor: "#FFD670",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4C2E05",
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    elevation: 2,
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20, // Adds more space above the ScrollView
  },
  listItemContainer: {
    flexDirection: "column",
  },
  hiveInfo: {
    marginLeft: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center", // icon and text same line
    marginBottom: 10,
  },
  lastVisit: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  hiveName: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  chipsContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    marginTop: 5,
  },
  chipStyle: {
    margin: 4,
    backgroundColor: "#f0f0f0",
  },
  chipText: {
    fontSize: 14,
  },
});

export default HiveScreen;
