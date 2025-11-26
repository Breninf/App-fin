import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from "../../../auth/authService";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

interface Props {
  transaction: Transaction;
}

export default function TransactionHistoryItem({ transaction }: Props) {
  const { colors } = useTheme();
  const isIncome = transaction.type === 'income';
  const displayAmount = `R$ ${transaction.amount.toFixed(2)}`;
  
  // Extrai apenas o dia (DD) da data YYYY-MM-DD
  const day = transaction.date.split('-')[2]; 

  return (
    <View style={styles.container}>
      {/* Ícone de transação */}
      <View style={[styles.iconContainer, { backgroundColor: isIncome ? colors.primaryContainer : colors.errorContainer }]}>
        <Ionicons 
            name={isIncome ? "arrow-up-circle-outline" : "arrow-down-circle-outline"} 
            size={24} 
            color={isIncome ? colors.primary : colors.error} 
        />
      </View>
      
      {/* Detalhes da transação */}
      <View style={styles.details}>
        <Text style={styles.description}>{transaction.description}</Text>
        <Text style={styles.date}>Dia: {day}</Text>
      </View>

      {/* Valor formatado */}
      <Text style={[styles.amount, { color: isIncome ? colors.primary : colors.error }]}>
        {displayAmount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 8,
    borderRadius: 20,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});