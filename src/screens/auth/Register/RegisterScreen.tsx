import { useState } from "react";
import {
  StyleSheet,
  Text,
  Platform,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AppInput from "../../../components/form/AppInput";

import { AuthStackParamList } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../../../auth/authContext";

type RegisterScreenProp = NativeStackNavigationProp<AuthStackParamList, "Register">;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenProp>();

  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        alert("As senhas não conferem!");
        return;
      }

      await register(email, password);

      alert("Conta criada com sucesso!");
      navigation.navigate("Login");
    } catch (error: any) {
      alert(error.message || "Erro ao criar conta");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      extraScrollHeight={Platform.OS === "ios" ? 20 : 30}
    >
      <Text style={styles.title}>Criar Conta</Text>

      <AppInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        icon="email"
      />

      <AppInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        password
        icon="lock"
      />

      <AppInput
        label="Confirmar senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        password
        icon="lock-check"
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
    </KeyboardAwareScrollView>
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
