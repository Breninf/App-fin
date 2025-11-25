import { View, Text, Button } from "react-native";
import { useAuth } from "../../auth/authContext";

export default function ProfileScreen() {
  const { logout } = useAuth();
  
  return (
    <View>
      <Text>Perfil</Text>
      <Button title="Sair" onPress={logout} />
    </View>
  );
}
