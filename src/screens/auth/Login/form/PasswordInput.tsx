import { useState } from "react";
import { TextInput } from "react-native-paper";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function PasswordInput({ value, onChangeText }: Props) {
  const [showPass, setShowPass] = useState(false);

  return (
    <TextInput
      label="Senha"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={!showPass}
      mode="outlined"
      left={<TextInput.Icon icon="lock" />}
      right={
        <TextInput.Icon
          icon={showPass ? "eye-off" : "eye"}
          onPress={() => setShowPass(!showPass)}
        />
      }
      style={{
        marginBottom: 16,
        borderRadius: 12,       // bordas arredondadas em todos os cantos
      }}
    />
  );
}
