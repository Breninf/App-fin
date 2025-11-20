import { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import EmailInput from "../Login/form/EmailInput";
import PasswordInput from "../Login/form/PasswordInput";
import { AuthStackParamList } from "../../../navigation/types";

type RegisterScreenNavigation =
  NativeStackNavigationProp<AuthStackParamList, "Register">;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigation>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("As senhas não conferem!");
      return;
    }

    // Chame seu registro real aqui
    alert(`Registrando usuário: ${email}`);

    navigation.navigate("Login"); // <- 100% tipado e sem erro
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Criar Conta</Text>

        <EmailInput value={email} onChangeText={setEmail} />
        <PasswordInput value={password} onChangeText={setPassword} />
        <PasswordInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Button
          mode="contained"
          onPress={handleRegister}
          style={styles.registerButton}
        >
          Cadastrar
        </Button>

        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          Já tem conta? Faça login
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  registerButton: {
    marginTop: 16,
    width: "100%",
  },
  loginLink: {
    marginTop: 16,
    textAlign: "center",
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
});
