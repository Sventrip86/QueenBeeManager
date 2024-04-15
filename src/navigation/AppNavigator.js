import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ApiaryStackNavigator from "./ApiaryStackNavigator";
import HiveStackNavigator from "./HiveStackNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelectedApiary } from "../components/SelectedApiaryContex";
import { TouchableOpacity, View } from "react-native";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { selectedApiaryId } = useSelectedApiary();

  const renderTabBarButton = (props) => {
    if (!selectedApiaryId) {
      // If apiary no selected, return disabled TouchableOpacity
      return <TouchableOpacity {...props} disabled style={{ opacity: 0.3 }} />;
    }
    // If apiary selected, return normal TouchableOpacity
    return <TouchableOpacity {...props} />;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#157F1F",
      }}
    >
      <Tab.Screen
        name="Apiaries"
        component={ApiaryStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="beehive-outline"
              color={color}
              size={size}
            />
          ),
          tabBarLabel: "Apiari",
        }}
      />
      <Tab.Screen
        name="HivesTab"
        component={HiveStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="hexagon-multiple"
              color={color}
              size={size}
            />
          ),
          tabBarButton: renderTabBarButton,
          tabBarLabel: "Arnie",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="beekeeper"
              color={color}
              size={size}
            />
          ),
          tabBarLabel: "Profilo",
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
