// src/screens/home/components/HeaderHome.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";

interface Props {
  username: string;
  onLogout: () => void;
}

export default function HeaderHome({ username, onLogout }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Olá, {username }👋</Text>

      <TouchableOpacity onPress={onLogout}>
        <Text style={styles.logout}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
