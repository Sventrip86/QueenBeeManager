import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ApiaryStackNavigator from './ApiaryStackNavigator';
import HiveStackNavigator from './HiveStackNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelectedApiary } from '../components/SelectedApiaryContex'
import { TouchableOpacity, View } from 'react-native';




const Tab = createBottomTabNavigator();



const AppNavigator = () => {
  const { selectedApiaryId } = useSelectedApiary();

  const renderTabBarButton = (props) => {
    if (!selectedApiaryId) {
      // If no apiary is selected, return a disabled TouchableOpacity
      return (
        <TouchableOpacity {...props} disabled style={{ opacity: 0.3 }} />
      );
    }
    // If an apiary is selected, return a normal TouchableOpacity
    return <TouchableOpacity {...props} />;
  };

  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#157F1F',
    }}
    >
      <Tab.Screen 
        name="Apiaries" 
        component={ApiaryStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="beehive-outline" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="HivesTab" 
        component={HiveStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => ( <MaterialCommunityIcons name="hexagon-multiple" color={color} size={size} />
          ),                   tabBarButton: renderTabBarButton,


        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="beekeeper" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
