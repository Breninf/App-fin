// src/screens/Home/HomeScreen.tsx
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { useAuth } from "../../auth/authContext";
import HeaderHome from "./components/HeaderHome";
import BalanceCard from "./components/BalanceCard";
import ExpenseItem from "./components/ExpenseItem";
import IncomeItem from "./components/IncomeItem";
import TransactionHistoryItem from "./components/TransactionHistoryItem"; // NOVO COMPONENTE
import useHomeData from "./hooks/useHomeData"; // HOOK ATUALIZADO
import { styles } from "./styles";
import { useTheme } from "react-native-paper";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  // Incluindo 'transactions' e 'loading' do hook atualizado
  const { balance, incomes, expenses, transactions, loading } = useHomeData(); 
  const { colors } = useTheme();

  if (loading) {
    return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={{ marginTop: 10, color: '#888' }}>Carregando dados...</Text>
        </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        // O Header agora contém o saldo e o resumo de receitas/despesas
        ListHeaderComponent={() => (
          <>
            <HeaderHome username={user?.name || "Usuário"} onLogout={logout} />
            <BalanceCard balance={balance} />
            <IncomeItem amount={incomes} />
            <ExpenseItem amount={expenses} />
            
            {/* Título do Histórico Mensal */}
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 15 }}>
                Histórico Mensal
            </Text>
          </>
        )}
        data={transactions} // Dados de transações
        renderItem={({ item }) => <TransactionHistoryItem transaction={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
            <Text style={{ textAlign: 'center', color: '#888', marginTop: 10 }}>
                Nenhuma transação registrada neste mês.
            </Text>
        )}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}