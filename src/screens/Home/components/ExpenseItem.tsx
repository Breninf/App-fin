// src/screens/home/components/ExpenseItem.tsx
import { View, Text } from "react-native";
import { styles } from "../styles";

export default function ExpenseItem({ amount }: { amount: number }) {
  return (
    <View style={styles.expenseBox}>
      <Text style={styles.expenseLabel}>Despesas</Text>
      <Text style={styles.expenseValue}>R$ {amount.toFixed(2)}</Text>
    </View>
  );
}
