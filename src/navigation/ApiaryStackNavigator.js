// New import
import ApiaryCreationScreen from '../screens/ApiaryCreationScreen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ApiaryScreen from '../screens/ApiaryScreen';
 

const ApiaryStack = createNativeStackNavigator();

const ApiaryStackNavigator = () => {
  return (
    <ApiaryStack.Navigator>
      <ApiaryStack.Screen name="ApiaryScreen" component={ApiaryScreen} options={{ headerShown: false }} />
      <ApiaryStack.Screen name="ApiaryCreationScreen" component={ApiaryCreationScreen}    />
    </ApiaryStack.Navigator>
  );
};


export default ApiaryStackNavigator;