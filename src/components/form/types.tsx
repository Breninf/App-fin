export type AppInputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secure?: boolean;
  keyboard?: "default" | "email-address" | "numeric";
  marginBottom?: number;
};
