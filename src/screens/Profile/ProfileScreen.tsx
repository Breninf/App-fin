import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button, useTheme, Dialog, Portal } from "react-native-paper";
import { useAuth } from "../../auth/authContext";

export default function ProfileScreen() {
  const { user, logout, deleteAccount } = useAuth();
  const { colors } = useTheme();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const showDialog = () => setShowDeleteConfirm(true);
  const hideDialog = () => setShowDeleteConfirm(false);

  const handleDelete = async () => {
    setLoading(true);
    hideDialog(); // Fecha o diálogo imediatamente
    try {
      await deleteAccount();
      // Se for bem-sucedido, o app será redirecionado pelo AuthContext.
    } catch (error: any) {
      // Em caso de falha na exclusão do DB, exibe alerta.
      Alert.alert("Erro", error.message || "Não foi possível apagar a conta. Tente novamente.");
      setLoading(false); // Tira o loading se o logout não ocorreu
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{user.name}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
      )}

      {/* Opção Sair */}
      <Button 
        mode="outlined" 
        onPress={logout} 
        style={styles.button}
        disabled={loading}
      >
        Sair da Conta
      </Button>

      {/* Opção Apagar Conta Permanentemente */}
      <Button
        mode="contained"
        onPress={showDialog}
        style={[styles.button, styles.deleteButton]}
        labelStyle={{ color: '#fff' }}
        buttonColor={colors.error}
        disabled={loading}
        loading={loading}
      >
        {loading ? "Apagando..." : "Apagar Conta Permanentemente"}
      </Button>

      {/* Diálogo de Confirmação */}
      <Portal>
        <Dialog visible={showDeleteConfirm} onDismiss={hideDialog}>
          <Dialog.Title>Confirmação de Exclusão</Dialog.Title>
          <Dialog.Content>
            <Text>Você tem certeza que deseja apagar sua conta? Todos os seus dados (transações e histórico) serão perdidos permanentemente.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} disabled={loading}>Cancelar</Button>
            <Button onPress={handleDelete} loading={loading} buttonColor={colors.error}>
              Apagar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 45,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  userInfo: {
    marginBottom: 40,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  button: {
    marginTop: 15,
    paddingVertical: 4,
  },
  deleteButton: {
    marginTop: 30,
  }
});