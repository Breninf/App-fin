// src/screens/home/components/IncomeItem.tsx
import { View, Text } from "react-native";
import { styles } from "../styles";

export default function IncomeItem({ amount }: { amount: number }) {
  return (
    <View style={styles.incomeBox}>
      <Text style={styles.incomeLabel}>Receitas</Text>
      <Text style={styles.incomeValue}>R$ {amount.toFixed(2)}</Text>
    </View>
  );
}
