const fs = require('fs');
const path = require('path');

// Ajustado para garantir que o caminho aponte para o local correto
const dbPath = path.join(__dirname, '..', 'projeto_dsm', 'db.json');

const lerBanco = () => {
    try {
        if (!fs.existsSync(dbPath)) {
            const inicial = { usuarios: [], produtos: [] };
            fs.writeFileSync(dbPath, JSON.stringify(inicial, null, 2));
            return inicial;
        }
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Erro ao ler o banco:", err);
        return { usuarios: [], produtos: [] };
    }
};

const salvarBanco = (dados) => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(dados, null, 2));
    } catch (err) {
        console.error("Erro ao salvar o banco:", err);
    }
};

module.exports = { lerBanco, salvarBanco };