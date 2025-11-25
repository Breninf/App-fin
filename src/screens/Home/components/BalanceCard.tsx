// src/screens/home/components/BalanceCard.tsx
import { View, Text } from "react-native";
import { styles } from "../styles";

interface Props {
  balance: number;
}

export default function BalanceCard({ balance }: Props) {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Saldo atual</Text>
      <Text style={styles.balanceValue}>R$ {balance.toFixed(2)}</Text>
    </View>
  );
}
