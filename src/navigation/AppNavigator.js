import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ApiaryStackNavigator from './ApiaryStackNavigator';
import HiveStackNavigator from './HiveStackNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Apiaries" 
        component={ApiaryStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bee" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="HivesTab" 
        component={HiveStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="hexagon-multiple" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
