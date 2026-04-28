const express = require('express');
const router = express.Router();
const { lerBanco, salvarBanco } = require('../database');

// LISTAR
router.get('/', (req, res) => {
  const db = lerBanco();
  res.json(db.produtos);
});

// CADASTRAR
router.post('/', (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || nome.trim().length < 2) {
    return res.status(400).json({ mensagem: 'O nome do produto deve ter pelo menos 2 caracteres' });
  }

  const precoNumerico = parseFloat(preco);
  if (isNaN(precoNumerico) || precoNumerico <= 0) {
    return res.status(400).json({ mensagem: 'O preço deve ser um número válido maior que zero' });
  }

  const db = lerBanco();
  const proximoId = db.produtos.length > 0 ? Math.max(...db.produtos.map(p => p.id)) + 1 : 1;

  const novoProduto = { id: proximoId, nome: nome.trim(), preco: precoNumerico };
  db.produtos.push(novoProduto);
  
  salvarBanco(db);
  res.status(201).json(novoProduto);
});

// ATUALIZAR
router.put('/:id', (req, res) => {
  const db = lerBanco();
  const id = parseInt(req.params.id);
  const index = db.produtos.findIndex((p) => p.id === id);
  
  if (index === -1) return res.status(404).json({ mensagem: 'Produto não encontrado' });

  const { nome, preco } = req.body;

  if (preco !== undefined) {
    const precoNumerico = parseFloat(preco);
    if (isNaN(precoNumerico) || precoNumerico <= 0) {
      return res.status(400).json({ mensagem: 'Preço inválido (não deve conter letras)' });
    }
    db.produtos[index].preco = precoNumerico;
  }

  if (nome) {
    if (nome.trim().length < 2) {
      return res.status(400).json({ mensagem: 'Nome do produto muito curto' });
    }
    db.produtos[index].nome = nome.trim();
  }

  salvarBanco(db);
  res.json(db.produtos[index]);
});

// EXCLUIR
router.delete('/:id', (req, res) => {
  const db = lerBanco();
  const id = parseInt(req.params.id);
  const novosProdutos = db.produtos.filter(p => p.id !== id);
  
  if (db.produtos.length === novosProdutos.length) {
    return res.status(404).json({ mensagem: 'Produto não encontrado' });
  }

  db.produtos = novosProdutos;
  salvarBanco(db);
  res.json({ mensagem: 'Produto removido com sucesso' });
});

module.exports = router;