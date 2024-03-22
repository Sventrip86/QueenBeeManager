import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HiveScreen from "../screens/HiveScreen";
import HiveCreationScreen from "../screens/HiveCreationScreen"; 

const HiveStack = createNativeStackNavigator();

const HiveStackNavigator = () => {
  return (
<HiveStack.Navigator initialRouteName="Hives">

      <HiveStack.Screen name="Hives" component={HiveScreen}  options={{ headerShown: false }} />
      <HiveStack.Screen name="HiveCreationScreen" component={HiveCreationScreen}  />
    </HiveStack.Navigator>
  );
};

export default HiveStackNavigator;
