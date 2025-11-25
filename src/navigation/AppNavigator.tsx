import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/Login/LoginScreen";
import RegisterScreen from "../screens/auth/Register/RegisterScreen";
import AppTabs from "./AppTabs"; // ← adicionar
import { useAuth } from "../auth/authContext";
import AddModal from "../screens/Add/AddModal";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Tabs" component={AppTabs} />
          <Stack.Screen
            name="Add"
            component={AddModal}
            options={{ presentation: "modal" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
