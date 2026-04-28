import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { useState } from 'react';
import { estilos } from '../../estilos/estilos';

export default function CadastroUsuario({ route, navigation }) {
  const itemEditar = route.params?.item;
  const [nome, setNome] = useState(itemEditar?.nome || '');
  const [email, setEmail] = useState(itemEditar?.email || '');

  const mostrarAviso = (msg) => {
    Platform.OS === 'web' ? alert(msg) : Alert.alert("Atenção", msg);
  };

  const salvar = async () => {
    // Validação de Nome: Apenas letras e espaços, mínimo 3
    const nomeValido = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome);
    if (!nome || nome.trim().length < 3 || !nomeValido) {
      mostrarAviso("O nome deve ter pelo menos 3 letras e não conter números.");
      return;
    }

    // Validação de E-mail
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!email || !emailValido) {
      mostrarAviso("Insira um endereço de e-mail válido.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/usuarios${itemEditar ? '/' + itemEditar.id : ''}`, {
        method: itemEditar ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome.trim(), email: email.trim() }),
      });

      const data = await response.json();
      if (!response.ok) {
        mostrarAviso(data.mensagem);
        return;
      }
      navigation.goBack();
    } catch (error) {
      mostrarAviso("Erro ao conectar com o servidor.");
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{itemEditar ? 'Editar Usuário' : 'Novo Usuário'}</Text>
      
      <View style={estilos.inputGroup}>
        <Text style={estilos.label}>Nome Completo (apenas letras)</Text>
        <TextInput 
          style={estilos.input} 
          value={nome} 
          onChangeText={(t) => setNome(t.replace(/[0-9]/g, ''))} // Bloqueia números na digitação
          placeholder="Ex: João Silva"
        />
      </View>

      <View style={estilos.inputGroup}>
        <Text style={estilos.label}>E-mail</Text>
        <TextInput 
          style={estilos.input} 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address" 
          autoCapitalize="none"
          placeholder="email@exemplo.com"
        />
      </View>

      <TouchableOpacity style={estilos.btnPrincipal} onPress={salvar}>
        <Text style={estilos.btnTexto}>SALVAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[estilos.btnPrincipal, {backgroundColor: '#718096', marginTop: 10}]} onPress={() => navigation.goBack()}>
        <Text style={estilos.btnTexto}>CANCELAR</Text>
      </TouchableOpacity>
    </View>
  );
}