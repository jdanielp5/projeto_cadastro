import { View, Text, FlatList, TouchableOpacity, Button, Alert, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { estilos } from '../../estilos/estilos';

export default function ListarUsuarios({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);

  const carregar = async () => {
    const res = await fetch('http://localhost:3000/usuarios');
    setUsuarios(await res.json());
  };

  useEffect(() => {
    const sub = navigation.addListener('focus', carregar);
    return sub;
  }, [navigation]);

  const remover = async (id) => {
    const acao = async () => {
      await fetch(`http://localhost:3000/usuarios/${id}`, { method: 'DELETE' });
      carregar();
    };

    if (Platform.OS === 'web') {
      if (confirm("Deseja excluir?")) acao();
    } else {
      Alert.alert("Excluir", "Deseja remover?", [{text: "Não"}, {text: "Sim", onPress: acao}]);
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Gerenciar Usuários</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={estilos.card}>
            <View style={{ flex: 1 }}>
              <Text style={estilos.nomeItem}>{item.nome}</Text>
              <Text style={estilos.infoItem}>{item.email}</Text>
            </View>
            <View style={estilos.areaBotoes}>
              <TouchableOpacity onPress={() => navigation.navigate('CadastroUsuario', { item })}>
                <Text style={{ color: '#4F46E5', fontWeight: 'bold', marginRight: 10 }}>EDITAR</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => remover(item.id)}>
                <Text style={{ color: '#EF4444', fontWeight: 'bold' }}>EXCLUIR</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={estilos.fab} onPress={() => navigation.navigate('CadastroUsuario')}>
        <Text style={estilos.fabTexto}>+</Text>
      </TouchableOpacity>
    </View>
  );
}