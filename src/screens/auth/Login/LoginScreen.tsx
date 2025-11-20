import { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  Image,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import EmailInput from "./form/EmailInput";
import PasswordInput from "./form/PasswordInput";

import { AuthStackParamList } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const logo = require("../../../assets/logo.png");

// Tipagem correta da navegação
type LoginScreenProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // AQUI ESTAVA O ERRO ❗
  const navigation = useNavigation<LoginScreenProp>();

  const handleLogin = () => {
    // Aqui você chama a função de login do AuthService 
    // loginUser(email, password)...
    alert(`Email: ${email}\nSenha: ${password}`);
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
        <Image source={logo} style={styles.logo} />
        <Text style={styles.welcomeText}>Bem vindo ao App Fin!</Text>

        <EmailInput value={email} onChangeText={setEmail} />
        <PasswordInput value={password} onChangeText={setPassword} />

        <Button mode="contained" onPress={handleLogin} style={{ marginTop: 16 }}>
          Entrar
        </Button>

        <Button
          mode="outlined"
          onPress={() => navigation.navigate("Register")}
          style={styles.registerButton}
        >
          Registrar-se
        </Button>
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
  logo: {
    width: 125,
    height: 125,
    marginBottom: 16,
    alignSelf: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
  },
  registerButton: {
    marginTop: 16,
    width: "100%",
  },
});
