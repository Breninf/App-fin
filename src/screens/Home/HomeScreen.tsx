// src/screens/home/HomeScreen.tsx
import { View, FlatList } from "react-native";
import { useAuth } from "../../auth/authContext";
import HeaderHome from "./components/HeaderHome";
import BalanceCard from "./components/BalanceCard";
import ExpenseItem from "./components/ExpenseItem";
import IncomeItem from "./components/IncomeItem";
import useHomeData from "./hooks/useHomeData";
import { styles } from "./styles";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { balance, incomes, expenses } = useHomeData();

  return (
    <View style={styles.container}>
      <HeaderHome username={user?.name || "Usuário"} onLogout={logout} />

      <BalanceCard balance={balance} />

      <FlatList
        ListHeaderComponent={() => (
          <>
            <IncomeItem amount={incomes} />
            <ExpenseItem amount={expenses} />
          </>
        )}
        data={[]} // por enquanto vazio até integrar transações reais
        renderItem={() => null}
      />
    </View>
  );
}
