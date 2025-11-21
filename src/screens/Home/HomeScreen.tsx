import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "../../auth/authContext";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home - Autenticação OK! 🎉</Text>

      <Text style={styles.info}>Usuário logado:</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Text style={styles.id}>ID: {user?.id}</Text>

      <Button
        mode="contained"
        onPress={logout}
        style={{ marginTop: 20 }}
      >
        Sair
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 10,
  },
  email: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  id: {
    marginTop: 5,
    color: "#555",
  },
});
