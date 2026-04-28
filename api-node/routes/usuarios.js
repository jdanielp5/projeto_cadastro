const express = require('express');
const router = express.Router();
const { lerBanco, salvarBanco } = require('../database');

// Validação de e-mail usando Regex
const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validação de Nome (Apenas letras e espaços)
const validarNome = (nome) => {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  return regex.test(nome);
};

// LISTAR
router.get('/', (req, res) => {
  const db = lerBanco();
  res.json(db.usuarios);
});

// CADASTRAR
router.post('/', (req, res) => {
  const { nome, email } = req.body;

  if (!nome || nome.trim().length < 3) {
    return res.status(400).json({ mensagem: 'O nome deve ter pelo menos 3 caracteres' });
  }

  if (!validarNome(nome)) {
    return res.status(400).json({ mensagem: 'O nome não deve conter números ou caracteres especiais' });
  }

  if (!email || !validarEmail(email)) {
    return res.status(400).json({ mensagem: 'Por favor, insira um e-mail válido (ex: usuario@dominio.com)' });
  }

  const db = lerBanco();
  const proximoId = db.usuarios.length > 0 ? Math.max(...db.usuarios.map(u => u.id)) + 1 : 1;

  const novoUsuario = { id: proximoId, nome: nome.trim(), email: email.trim() };
  db.usuarios.push(novoUsuario);
  
  salvarBanco(db);
  res.status(201).json(novoUsuario);
});

// ATUALIZAR
router.put('/:id', (req, res) => {
  const db = lerBanco();
  const id = parseInt(req.params.id);
  const index = db.usuarios.findIndex((u) => u.id === id);
  
  if (index === -1) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

  const { nome, email } = req.body;

  if (nome) {
    if (nome.trim().length < 3 || !validarNome(nome)) {
      return res.status(400).json({ mensagem: 'O nome deve ter 3 letras e não conter números' });
    }
  }

  if (email && !validarEmail(email)) {
    return res.status(400).json({ mensagem: 'Formato de e-mail inválido' });
  }

  db.usuarios[index] = {
    ...db.usuarios[index],
    nome: nome ? nome.trim() : db.usuarios[index].nome,
    email: email ? email.trim() : db.usuarios[index].email
  };

  salvarBanco(db);
  res.json(db.usuarios[index]);
});

// EXCLUIR
router.delete('/:id', (req, res) => {
  const db = lerBanco();
  const id = parseInt(req.params.id);
  const novosUsuarios = db.usuarios.filter(u => u.id !== id);
  
  if (db.usuarios.length === novosUsuarios.length) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }

  db.usuarios = novosUsuarios;
  salvarBanco(db);
  res.json({ mensagem: 'Usuário removido com sucesso' });
});

module.exports = router;