import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { estilos } from './estilos/estilos'; 

import ListarUsuarios from './componentes/usuarios/ListarUsuarios';
import CadastroUsuario from './componentes/usuarios/CadastroUsuario';
import ListarProdutos from './componentes/produtos/ListarProdutos';
import CadastroProduto from './componentes/produtos/CadastroProduto';

const Stack = createNativeStackNavigator();

function TelaInicial({ navigation }) {
  return (
    <View style={[estilos.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={[estilos.titulo, { fontSize: 50, marginBottom: 40, textAlign: 'center' }]}>Sistema de cadastro</Text>
      
      <TouchableOpacity 
        style={[estilos.btnPrincipal, { width: '80%' }]} 
        onPress={() => navigation.navigate('ListarUsuarios')}
      >
        <Text style={estilos.btnTexto}>GERENCIAR USUÁRIOS</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[estilos.btnPrincipal, { width: '80%', backgroundColor: '#2B6CB0', marginTop: 20 }]} 
        onPress={() => navigation.navigate('ListarProdutos')}
      >
        <Text style={estilos.btnTexto}>GERENCIAR PRODUTOS</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={TelaInicial} options={{ title: 'Menu Principal' }} />
        <Stack.Screen name="ListarUsuarios" component={ListarUsuarios} options={{ title: 'Lista de Usuários' }} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="ListarProdutos" component={ListarProdutos} options={{ title: 'Lista de Produtos' }} />
        <Stack.Screen name="CadastroProduto" component={CadastroProduto} options={{ title: 'Cadastro' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}