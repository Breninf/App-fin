import { TextInput } from "react-native-paper";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function EmailInput({ value, onChangeText }: Props) {
  return (
    <TextInput
      label="Email"
      value={value}
      onChangeText={onChangeText}
      keyboardType="email-address"
      autoCapitalize="none"
      mode="outlined"           // contorno completo
      left={<TextInput.Icon icon="email" />}
      style={{
        marginBottom: 16,
        borderRadius: 12,       // bordas redondas em todos os cantos
      }}
    />
  );
}
