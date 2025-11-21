import { useState } from "react";
import { TextInput } from "react-native-paper";

export interface AppInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  icon?: string;            // ícone da esquerda
  password?: boolean;       // ativa modo senha
  style?: any;              // caso queira customizar depois
}

export default function AppInput({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  autoCapitalize = "none",
  icon,
  password = false,
  style,
}: AppInputProps) {
  const [showPass, setShowPass] = useState(false);

  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      secureTextEntry={password && !showPass}
      left={icon ? <TextInput.Icon icon={icon} /> : undefined}
      right={
        password ? (
          <TextInput.Icon
            icon={showPass ? "eye-off" : "eye"}
            onPress={() => setShowPass(!showPass)}
          />
        ) : undefined
      }
      style={[
        {
          marginBottom: 16,
          borderRadius: 12,
        },
        style,
      ]}
    />
  );
}
