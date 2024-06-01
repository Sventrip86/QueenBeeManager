import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../config/firebaseConfig";
import { FIREBASE_AUTH } from "../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  TextInput,
  Dialog,
  Portal,
  Snackbar,
  HelperText,
} from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import { getCreationDate } from '../utils/formattedDate'


import * as Location from "expo-location";

const ApiaryCreationScreen = () => {
  const [position, setPosition] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [apiaryName, setApiaryName] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [visibleSnack, setVisibleSnack] = useState(false);

  const openSnackBar = () => setVisibleSnack(!visibleSnack);
  const onDismissSnackBar = () => setVisibleSnack(false);

  const [ helperText, setHelperText ] = useState('')

  const handleCreateApiary = async () => {
    setIsLoading(true);
    if (!apiaryName || !location) {
      // Handle validation error
      return;
    }
    try {
      await addDoc(collection(FIRESTORE_DB, "apiaries"), {
        name: apiaryName,
        location: location,
        position: JSON.stringify(position),
        creationDate: new Date().toISOString(),
        creationDateString: getCreationDate(),
        userId: FIREBASE_AUTH.currentUser.uid,
      });
      openSnackBar();

      setTimeout(() => {
        navigation.navigate("ApiaryScreen");
      }, 2000);
      //console.log("Apiary created successfully!");
      //Alert.alert("Success", "Apiary created successfully!"); // Success feedback
      // Handle successful apiary creation
    } catch (error) {
      // Handle errors
      console.error("Error creating apiary: ", error);
      Alert.alert("Error", "Failed to create apiary.");
    } finally {
      setIsLoading(false);
    }
  };

  // Snippet from Expo Location ------>   https://docs.expo.dev/versions/latest/sdk/location/
  // request permission on location and save the position as state

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let position = await Location.getCurrentPositionAsync({});
      setPosition(position);

      // destructuring position to get coord props
      const { latitude, longitude } = position.coords;
      setLocation(`Lat: ${latitude}  Lon: ${longitude}`);
    })();
  }, []);

  // conditional text location variable 
  let locationText = "Waiting permission...";
  if (errorMsg) {
    locationText = errorMsg;
  } else if (position) {
    locationText = `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`;
  }

  // check  for errors in name in textInput
  const hasError = () => {
    return !apiaryName
  }


  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Crea nuovo apiario
      </Text>
      <TextInput
        placeholder="Nome apiario"
        autoFocus={true}
        value={apiaryName}
        onChangeText={setApiaryName}
        mode="outlined"
        theme={{ colors: { primary: "green" } }}
        style={styles.input}
      />
      <HelperText type="error" visible={hasError()}>
      Name is required
      </HelperText>
      <Text style={styles.paragraph}>Posizione: {locationText}</Text>
      
      {position && (
        <MapView
          initialRegion={{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        >
       
          <Marker
            coordinate={{
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }}
            title={"Your Location"}
            description={locationText}
          />
        </MapView>
      )}

      <Button
        style={styles.button}
        labelStyle={styles.buttonLabel}
        mode="contained"
        onPress={handleCreateApiary}
        disabled={isLoading}
        loading={isLoading}
      >
        Crea Apiario
      </Button>

      <Snackbar
        visible={visibleSnack}
        onDismiss={onDismissSnackBar}
        style={{ backgroundColor: "green" }}
      >
        Apiario creato con successo!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "green", // Use your theme color
  },
  input: {
    width: "80%",
    marginBottom: 10,
  },
  button: {
    width: "80%",
    marginTop: 10,
  },
  buttonLabel: {
    color: "white", // For contained buttons
  },
  map: {
    width: "80%",
    height: "40%",
  },
  paragraph: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
});

export default ApiaryCreationScreen;
