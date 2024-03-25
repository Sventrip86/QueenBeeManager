import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";


const Stack = createNativeStackNavigator();


const AuthNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />


        </Stack.Navigator>
    )
}


export default AuthNavigator;