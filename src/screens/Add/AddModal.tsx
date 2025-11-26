// src/screens/Add/AddModal.tsx
import { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { Button, RadioButton, TextInput, useTheme } from "react-native-paper";
import { useAuth } from "../../auth/authContext";
import { useNavigation } from "@react-navigation/native";
import { TransactionType } from "../../auth/authService"; // Importando o novo tipo

export default function AddModal() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { addTransaction } = useAuth();

  const [type, setType] = useState<TransactionType>("income"); // Estado para Receita/Despesa
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    const parsedAmount = parseFloat(amount);
    
    if (!description.trim() || parsedAmount <= 0 || isNaN(parsedAmount)) {
      alert("Por favor, preencha a descrição e um valor positivo.");
      return;
    }

    setLoading(true);
    try {
      await addTransaction(type, description, parsedAmount);
      
      alert(`${type === 'income' ? 'Receita' : 'Despesa'} registrada com sucesso!`);
      
      // Fecha o modal.
      navigation.goBack();
      
    } catch (error) {
      console.error("Erro ao registrar transação:", error);
      alert("Erro ao registrar transação. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Registrar Transação</Text>

        {/* Seleção de Tipo (Receita/Despesa) */}
        <View style={styles.radioGroup}>
          <RadioButton.Group onValueChange={(newValue) => setType(newValue as TransactionType)} value={type}>
            <View style={styles.radioButton}>
              <RadioButton value="income" color={colors.primary} />
              <Text>Receita</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton value="expense" color={colors.error} />
              <Text>Despesa</Text>
            </View>
          </RadioButton.Group>
        </View>

        {/* Descrição */}
        <TextInput
          label="Descrição (Ex: Salário, Aluguel)"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          style={styles.input}
        />

        {/* Valor */}
        <TextInput
          label="Valor"
          value={amount}
          onChangeText={(text) => setAmount(text.replace(/[^0-9.,]/g, "").replace(",", "."))} 
          keyboardType="numeric"
          mode="outlined"
          left={<TextInput.Icon icon="currency-usd" />}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleSave}
          loading={loading}
          disabled={loading}
          style={[styles.saveButton, { backgroundColor: type === 'income' ? colors.primary : colors.error }]}
        >
          Salvar {type === 'income' ? "Receita" : "Despesa"}
        </Button>

        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 15 }}>
          <Text style={{ textAlign: 'center', color: colors.primary }}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    paddingVertical: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
      marginTop: 20,
      paddingVertical: 4,
  }
});