import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ApiaryStackNavigator from './ApiaryStackNavigator';
import HiveStackNavigator from './HiveStackNavigator';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Apiaries" component={ApiaryStackNavigator} />
      <Tab.Screen name="Hives" component={HiveStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
