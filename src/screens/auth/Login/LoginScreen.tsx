import { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  Platform,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AppInput from "../../../components/form/AppInput";

import { AuthStackParamList } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../../../auth/authContext";

const logo = require("../../../assets/logo.png");

// Tipagem da navigation
type LoginScreenProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<LoginScreenProp>();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      // Navegação automática pela mudança de user no AuthContext
    } catch (error: any) {
      alert(error.message || "Erro ao fazer login");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      extraScrollHeight={Platform.OS === "ios" ? 20 : 30}
    >
      <Image source={logo} style={styles.logo} />

      <Text style={styles.welcomeText}>Bem vindo ao App Fin!</Text>

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

      <Button
        mode="contained"
        onPress={handleLogin}
        style={{ marginTop: 16 }}
      >
        Entrar
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate("Register")}
        style={styles.registerButton}
      >
        Registrar-se
      </Button>
    </KeyboardAwareScrollView>
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
