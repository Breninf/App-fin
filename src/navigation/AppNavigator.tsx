import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/Login/LoginScreen";
import RegisterScreen from "../screens/auth/Register/RegisterScreen";
import { AuthStackParamList } from "./types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}