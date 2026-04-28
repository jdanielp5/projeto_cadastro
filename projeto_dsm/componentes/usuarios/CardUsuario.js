import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const API_URL = 'http://localhost:3000/usuarios';

export default function CardUsuario({ item, onExcluir, navigation }) {
  const excluir = async () => {
    await fetch(`${API_URL}/${item.id}`, { method: 'DELETE' });
    onExcluir();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.detalhe}>✉️ {item.email}</Text>
      <View style={styles.botoes}>
        <TouchableOpacity style={styles.btnEditar} onPress={() => navigation.navigate('CadastroUsuario', { item })}>
          <Text style={styles.btnTexto}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnExcluir} onPress={excluir}>
          <Text style={styles.btnTexto}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginVertical: 6, marginHorizontal: 16, elevation: 3 },
  nome: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  detalhe: { fontSize: 13, color: '#666', marginTop: 2 },
  botoes: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, gap: 8 },
  btnEditar: { backgroundColor: '#f0a500', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6 },
  btnExcluir: { backgroundColor: '#e03e3e', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6 },
  btnTexto: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
});