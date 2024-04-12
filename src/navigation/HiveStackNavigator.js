import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HiveScreen from "../screens/HiveScreen";
import HiveCreationScreen from "../screens/HiveCreationScreen"; 
import HiveDetailScreen from "../screens/HiveDetailScreen";
import HiveVisitCreationScreen from "../screens/HiveVisitCreationScreen";

const HiveStack = createNativeStackNavigator();

const HiveStackNavigator = () => {
  return (
<HiveStack.Navigator initialRouteName="Hives">

      <HiveStack.Screen name="Arnie" component={HiveScreen}  options={{ headerShown: false }} />
      <HiveStack.Screen name="HiveCreationScreen" component={HiveCreationScreen}  />
      <HiveStack.Screen name="HiveDetailScreen" component={HiveDetailScreen} />
<HiveStack.Screen name="HiveVisitCreationScreen" component={HiveVisitCreationScreen} />


    </HiveStack.Navigator>
  );
};

export default HiveStackNavigator;
