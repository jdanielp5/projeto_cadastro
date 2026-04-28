import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { useState } from 'react';
import { estilos } from '../../estilos/estilos';

export default function CadastroProduto({ route, navigation }) {
  const itemEditar = route.params?.item;
  const [nome, setNome] = useState(itemEditar?.nome || '');
  const [preco, setPreco] = useState(itemEditar?.preco ? String(itemEditar.preco) : '');

  const msg = (t) => Platform.OS === 'web' ? alert(t) : Alert.alert("Aviso", t);

  const salvar = async () => {
    const pLimpo = preco.replace(',', '.');
    const pNum = parseFloat(pLimpo);

    if (!nome.trim()) return msg("O nome do produto é obrigatório.");
    if (isNaN(pNum) || pNum <= 0) return msg("Insira um preço válido.");

    try {
      // CORREÇÃO: URL dinâmica para POST (novo) ou PUT (editar)
      const url = itemEditar 
        ? `http://localhost:3000/produtos/${itemEditar.id}` 
        : `http://localhost:3000/produtos`;

      const metodo = itemEditar ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome.trim(), preco: pNum }),
      });

      if (response.ok) {
        navigation.goBack();
      } else {
        const erro = await response.json();
        msg(erro.mensagem || "Erro ao salvar produto.");
      }
    } catch (e) { 
      msg("Erro de conexão com o servidor."); 
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{itemEditar ? 'Editar Registro' : 'Novo Produto'}</Text>
      
      <View style={estilos.inputGroup}>
        <Text style={estilos.label}>Nome do Produto</Text>
        <TextInput 
          style={estilos.input} 
          value={nome} 
          onChangeText={setNome}
          placeholder="Ex: Teclado Mecânico"
        />
      </View>

      <View style={estilos.inputGroup}>
        <Text style={estilos.label}>Preço (R$)</Text>
        <TextInput 
          style={estilos.input} 
          value={preco} 
          onChangeText={(t) => setPreco(t.replace(/[^0-9.,]/g, ''))}
          keyboardType="numeric" 
          placeholder="0,00"
        />
      </View>

      <TouchableOpacity style={estilos.btnPrincipal} onPress={salvar}>
        <Text style={estilos.btnTexto}>CONFIRMAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={estilos.btnSecundario} onPress={() => navigation.goBack()}>
        <Text style={estilos.btnTextoSecundario}>CANCELAR</Text>
      </TouchableOpacity>
    </View>
  );
}