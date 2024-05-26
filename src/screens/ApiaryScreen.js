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
  Dialog,
  Portal,
  Paragraph,
  Text,
  IconButton,
  Menu,
  Modal,
} from "react-native-paper";
import { useSelectedApiary } from "../components/SelectedApiaryContex";
import * as Linking from "expo-linking";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import CustomModal from "../components/CustomModal";

const ApiaryScreen = () => {
  const navigation = useNavigation();
  const [apiaries, setApiaries] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedApiary, setSelectedApiary] = useState(false);
  const [isDialogSelectApiaryVisible, setDialogSelectApiaryVisible] =
    useState(false);
  const [isApiarySelected, setIsApiarySelected] = useState(false);
  const [apiariesAvailable, setApiariesAvailable] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = (apiaryId) =>
    setMenuVisible((prev) => ({ ...prev, [apiaryId]: !prev[apiaryId] }));

  const fetchApiaries = async () => {
    setIsLoading(true);
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
      setApiaries(apiariesData);
      console.log(apiariesData);

      // Show dialog if no apiaries are found

      if (apiariesData.length === 0) {
        setIsDialogVisible(true);
        setApiariesAvailable(false);
      } else {
        setApiariesAvailable(true);
      }
    } catch (error) {
      console.error("Error fetching apiaries: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchApiaries();
    }, [])
  );

  const { setSelectedApiaryId } = useSelectedApiary();

  const handleDialogDismiss = () => {
    setIsDialogVisible(false);
    navigation.navigate("ApiaryCreationScreen"); // Navigate to creation screen
  };

  const handleDialogSelectApiary = () => {
    setDialogSelectApiaryVisible(false);
  };

  const handleSelectApiary = (apiaryId) => {
    setSelectedApiaryId(apiaryId);

    setSelectedApiary(apiaryId);
    setIsApiarySelected(true);

    navigation.navigate("HivesTab", { screen: "Arnie", params: { apiaryId } });
  };

  const handleDeleteApiary = async (apiaryId) => {
    try {
      // First, delete all hives within the apiary
      const hivesRef = collection(FIRESTORE_DB, "apiaries", apiaryId, "hives");
      const querySnapshot = await getDocs(hivesRef);
      await Promise.all(querySnapshot.docs.map((doc) => deleteDoc(doc.ref)));

      // Then, delete the apiary document
      await deleteDoc(doc(FIRESTORE_DB, "apiaries", apiaryId));

      await fetchApiaries(); // refresh the list
      // display dialog select apiary check
      if (apiaries.length === 0) {
        setIsDialogVisible(true); // No apiaries left, show dialog to create new one
      } // elseif the user delete the selected apiary logic TODO
    } catch (error) {
      console.error("Error deleting apiary: ", error);
    }
  };

  //************** TODO implement logic for updating the apiary
  const handleUpdateApiary = (apiaryId) => {};


  // ****** Open in Google Maps TODO

  // Show modal when the screen first loads and apiaries are available but no selected
  useEffect(() => {
    if (apiariesAvailable && !selectedApiary) {
      setDialogSelectApiaryVisible(true);
    }
  }, [apiariesAvailable, selectedApiary]);




  return (
    <View style={styles.container}>
      {/* if its fetching display the loading indicator otherwise display the list of apiaries  */}
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color={MD2Colors.green700}
          size="large"
        />
      ) : (
        <>
     
          <Text variant="headlineMedium" style={styles.title}>
            I tuoi apiari
          </Text>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {apiaries.map((apiary) => (
              <List.Item
                key={apiary.id}
                title={apiary.name}
                description={`Posizione: ${apiary.location} Creato il ${apiary.creationDateString}`}
                // left={(props) => <List.Icon {...props} icon="bee-flower" />}
                onPress={() => handleSelectApiary(apiary.id)}
                style={
                  selectedApiary === apiary.id
                    ? styles.selectedItem
                    : styles.listItem
                }
                right={() => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* <Button 
          onPress={() => null}
          mode="outlined">Google Maps</Button>       */}
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
                        onPress={() => handleUpdateApiary(apiary.id)}
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
            <Button
              mode="contained"
              title="Create apiary"
              onPress={() => {
                navigation.navigate("ApiaryCreationScreen");
              }}
            >
              Crea Apiario
            </Button>
          </ScrollView>

          {/**************    MODALS    ***********/}

          <CustomModal
            visible={isDialogSelectApiaryVisible}
            onDismiss={handleDialogSelectApiary}
            icon="alert-circle"
            iconColor='red'
            message="Nessun apiario selezionato! Seleziona un apiario dalla lista"
            buttonText="OK"
            onButtonPress={handleDialogSelectApiary}
          />

<CustomModal
            visible={isDialogVisible}
            onDismiss={handleDialogSelectApiary}
            icon="dots-vertical"
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
