import { View, Text, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { estilos } from '../../estilos/estilos';

const API_URL = 'http://localhost:3000/produtos';

export default function ListarProdutos({ navigation }) {
  const [produtos, setProdutos] = useState([]);

  const carregarProdutos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      setProdutos(data); 
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarProdutos);
    return unsubscribe;
  }, [navigation]);

  const confirmarExclusao = (id) => {
    if (Platform.OS === 'web') {
      if (confirm("Deseja realmente excluir este produto?")) executarExclusao(id);
    } else {
      Alert.alert("Excluir", "Deseja remover este produto?", [
        { text: "Cancelar" },
        { text: "Confirmar", onPress: () => executarExclusao(id) }
      ]);
    }
  };

  const executarExclusao = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProdutos(produtos.filter(p => p.id !== id));
      }
    } catch (error) {
      alert("Erro ao conectar à API");
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Gerenciar Estoque</Text>
      
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={estilos.card}>
            <View style={{ flex: 1 }}>
              <Text style={estilos.nomeItem}>{item.nome}</Text>
              <Text style={estilos.infoItem}>
                R$ {parseFloat(item.preco).toFixed(2).replace('.', ',')}
              </Text>
            </View>
            
            <View style={estilos.areaBotoes}>
              <TouchableOpacity onPress={() => navigation.navigate('CadastroProduto', { item })}>
                <Text style={{ color: '#4F46E5', fontWeight: 'bold', marginRight: 15 }}>EDITAR</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => confirmarExclusao(item.id)}>
                <Text style={{ color: '#EF4444', fontWeight: 'bold' }}>EXCLUIR</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={estilos.fab} onPress={() => navigation.navigate('CadastroProduto')}>
        <Text style={estilos.fabTexto}>+</Text>
      </TouchableOpacity>
    </View>
  );
}