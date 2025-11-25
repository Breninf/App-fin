import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { PaperProvider } from "react-native-paper";
import { paperTheme } from "./src/theme/paperTheme";
import { AuthProvider } from "./src/auth/authContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PaperProvider theme={paperTheme}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
