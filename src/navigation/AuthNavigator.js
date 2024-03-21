import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";


const Stack = createNativeStackNavigator();


const AuthNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />


        </Stack.Navigator>
    )
}


export default AuthNavigator;