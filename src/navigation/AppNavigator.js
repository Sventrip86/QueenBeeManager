import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ApiaryScreen from '../screens/ApiaryScreen';
import HiveScreen from '../screens/HiveScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Apiaries" component={ApiaryScreen} />
      <Tab.Screen name="Hives" component={HiveScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
