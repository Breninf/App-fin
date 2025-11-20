import { TextInputProps } from "react-native";

export interface InputProps extends TextInputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secure?: boolean;
  error?: string | null;
  icon?: any;
}
