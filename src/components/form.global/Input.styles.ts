import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  inputError: {
    borderColor: "red",
  },

  leftIcon: {
    marginRight: 8,
    color: "#777",
  },

  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },

  rightIcon: {
    marginLeft: 8,
    color: "#777",
  },

  errorText: {
    marginTop: 4,
    color: "red",
    fontSize: 12,
  },
});
