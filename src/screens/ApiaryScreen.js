import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Icon } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FIREBASE_AUTH } from "../config/firebaseConfig";
import { FIRESTORE_DB } from "../config/firebaseConfig";
import {
  List,
  Text,
  IconButton,
  Menu,
} from "react-native-paper";
import { useSelectedApiary } from "../components/SelectedApiaryContex";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import CustomModal from "../components/CustomModal";
import { Badge } from 'react-native-paper';


const ApiaryScreen = () => {
  const navigation = useNavigation();
  const [apiaries, setApiaries] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedApiary, setSelectedApiary] = useState(false);
  const [isDialogSelectApiaryVisible, setDialogSelectApiaryVisible] = useState(false);
  const [apiariesAvailable, setApiariesAvailable] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // toggle menu visible for all the apiaries in the list 
  const toggleMenu = (apiaryId) => setMenuVisible((prev) => ({ ...prev, [apiaryId]: !prev[apiaryId] }));

  // fetch apiaries form Firestore and update apiaries state 
  const fetchApiaries = async () => {
    setIsLoading(true); // display loading ActivityIndicator
    try {
      const q = query(
        collection(FIRESTORE_DB, "apiaries"),
        where("userId", "==", FIREBASE_AUTH.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const apiariesData = [];
      querySnapshot.forEach((doc) => {
        apiariesData.push({ id: doc.id, ...doc.data() });
      });
      setApiaries(apiariesData); // set state apiaries passing  apiariesData 

      //check if there are no apiaries then display alert modal 
      if (apiariesData.length === 0) {
        setIsDialogVisible(true);
        setApiariesAvailable(false);
      } else {
        setApiariesAvailable(true);
      }
    } catch (error) {
      // TODO i need to display a dialog or alert to the user *************
      console.error("Error fetching apiaries: ", error);
    } finally {
      setIsLoading(false); // hide loading ActivityIndicator
    }
  };

  // call fetchApiaries() on every screen focus
  useFocusEffect(
    useCallback(() => {
      fetchApiaries();
    }, [])
  );
  
  // check if there are apiaries available but no selected apiary when component updates
  useEffect(() => {
    if (apiariesAvailable && !selectedApiary) {
      setDialogSelectApiaryVisible(true);
    }
  }, [apiariesAvailable, selectedApiary, apiaries]);


  const { setSelectedApiaryId } = useSelectedApiary();

    // dismiss dialog and navigate to ApiaryCreationScreen cose there are no apiaries
  const handleDialogDismiss = () => {
    setIsDialogVisible(false);
    navigation.navigate("ApiaryCreationScreen");
  };

  const handleDialogSelectApiary = () => {
    setDialogSelectApiaryVisible(false);
  };

    // handle the selection of an apiary
  const handleSelectApiary = (apiaryId) => {
    setSelectedApiaryId(apiaryId);
    setSelectedApiary(apiaryId);
    navigation.navigate("HivesTab", { screen: "Arnie", params: { apiaryId } });
  };

  // handle deletion of the apiary and its hives
  const handleDeleteApiary = async (apiaryId) => {
    try {
      const hivesRef = collection(FIRESTORE_DB, "apiaries", apiaryId, "hives");
      const querySnapshot = await getDocs(hivesRef);
      await Promise.all(querySnapshot.docs.map((doc) => deleteDoc(doc.ref)));
      await deleteDoc(doc(FIRESTORE_DB, "apiaries", apiaryId));
      await fetchApiaries();
    } catch (error) {
      console.error("Error deleting apiary: ", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* show ActivityIndicator before fetch terminates */}
      {isLoading ? (
        <ActivityIndicator animating={true} color={MD2Colors.yellow700} size="large" />
      ) : (
        <>
          <Text variant="headlineMedium" style={styles.title}>I TUOI APIARI</Text>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {/* map apiaries and render a list with List.Item */}
            {apiaries.map((apiary) => (
              <List.Item
                key={apiary.id}
                title={apiary.name}
                description={`Posizione: ${apiary.location} Creato il ${apiary.creationDateString}`}
                onPress={() => handleSelectApiary(apiary.id)}
                style={selectedApiary === apiary.id ? styles.selectedItem : styles.listItem}
                right={() => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                      {/* testing badge component */}
                      <Badge style={{ backgroundColor: 'green', margin: 2}}>test</Badge>
                      <Badge style={{ backgroundColor: 'red', margin: 2}}>4</Badge>

                    <Menu
                      visible={menuVisible[apiary.id]}
                      onDismiss={() => toggleMenu(apiary.id)}
                      anchor={
                        <IconButton
                          icon="dots-vertical"
                          onPress={() => toggleMenu(apiary.id)}
                        />
                      }
                    >
                      <Menu.Item
                        leadingIcon="pencil"
                        onPress={() => handleUpdateApiary(apiary.id)}   // ********* TODO 
                        title="Modifica"
                      />
                      <Menu.Item
                        leadingIcon="delete"
                        onPress={() => handleDeleteApiary(apiary.id)}
                        title="Elimina"
                      />
                    </Menu>
                  </View>
                )}
              />
            ))}
            {/* button for the creation of a new apiary that navigate to the ApiaryCreationScreen */}
            <Button
              mode="contained"
              onPress={() => {
                navigation.navigate("ApiaryCreationScreen");
              }}
            >
              Crea Apiario
            </Button>
          </ScrollView>

              {/* two CustomModal for no apiaries found and no apiaries selected */}
              
          <CustomModal
            visible={isDialogSelectApiaryVisible}
            onDismiss={handleDialogSelectApiary}
            icon="alert-circle"
            iconColor="red"
            message="Nessun apiario selezionato! Seleziona un apiario dalla lista"
            buttonText="OK"
            onButtonPress={handleDialogSelectApiary}
          />

          <CustomModal
            visible={isDialogVisible}
            onDismiss={handleDialogSelectApiary}
            icon="dots-vertical"
            iconColor="red"
            message="Nessun apiario presente. Non esistono apiari, creane subito uno!"
            buttonText="OK"
            onButtonPress={handleDialogDismiss}
          />
        </>
      )}
    </View>
  );
};


// Define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  contentContainer: {
    // width: '100%',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  selectedItem: {
    backgroundColor: "#FFD670", // Light yellow for selected apiary
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 10,
    marginHorizontal: 10, // Added horizontal margin
  },
  listItem: {
    backgroundColor: "#fff", // Background color for non-selected apiaries
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalInnerContent: {
    alignItems: "center",
    justifyContent: "space-around",
    height: 200,
  },
  iconStyle: {
    marginBottom: 10,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ApiaryScreen;
