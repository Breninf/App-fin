// src/screens/home/styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logout: {
    color: "red",
    fontWeight: "600",
  },

  // Saldo
  balanceCard: {
    backgroundColor: "#1E90FF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  balanceTitle: {
    color: "#fff",
    fontSize: 18,
  },
  balanceValue: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  // Receitas
  incomeBox: {
    padding: 16,
    backgroundColor: "#E7FFE7",
    borderRadius: 10,
    marginBottom: 10,
  },
  incomeLabel: { color: "#008000", fontSize: 16 },
  incomeValue: {
    color: "#008000",
    fontSize: 20,
    fontWeight: "bold",
  },

  // Despesas
  expenseBox: {
    padding: 16,
    backgroundColor: "#FFECEC",
    borderRadius: 10,
    marginBottom: 20,
  },
  expenseLabel: { color: "#CC0000", fontSize: 16 },
  expenseValue: {
    color: "#CC0000",
    fontSize: 20,
    fontWeight: "bold",
  },
});
