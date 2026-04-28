const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuarios');
const produtosRoutes = require('./routes/produtos');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Registro das rotas separadas
app.use('/usuarios', usuariosRoutes);
app.use('/produtos', produtosRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`);
  console.log(`Endpoint Usuários: http://localhost:${PORT}/usuarios`);
  console.log(`Endpoint Produtos: http://localhost:${PORT}/produtos`);
});