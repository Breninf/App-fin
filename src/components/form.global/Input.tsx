import { useState } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
//import { Ionicons } from "@expo/vector-icons";
import { styles } from "./Input.styles";
import { InputProps } from "./types";

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secure = false,
  error,
  icon,
  keyboardType = "default",
  autoCapitalize = "none",
  ...rest
}: InputProps) {
  const [hide, setHide] = useState(secure);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputWrapper, error && styles.inputError]}>

        {icon && (
          <Ionicons
            name={icon}
            size={20}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={hide}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          {...rest}
        />

        {secure && (
          <TouchableOpacity onPress={() => setHide(!hide)}>
            <Ionicons
              name={hide ? "eye-off" : "eye"}
              size={20}
              style={styles.rightIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

// Isso ainda seria o paperprovider?