import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import HomeScreen from "../screens/Home/HomeScreen";
import ChartScreen from "../screens/Chart/ChartScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 70 + insets.bottom,
            paddingBottom: insets.bottom + 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: { fontSize: 12 },
          tabBarActiveTintColor: "#4CAF50",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Chart"
          component={ChartScreen}
          options={{
            tabBarLabel: "Gráfico",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="stats-chart-outline" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Perfil",
            tabBarIcon: ({ size, color }) => (
              <Ionicons
                name="person-circle-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>

      {/* Botão flutuante */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Add")}
        style={styles.fab}
      >
        <Ionicons name="add" size={32} color="#FFF" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 145,
    alignSelf: "center",
    backgroundColor: "#4CAF50",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  
});
