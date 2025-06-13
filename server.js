require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const pontosRoutes = require('./routes/pontosRoutes');

const app = express();

// Configuração do CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Melhor prática: defina a URL exata do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Rotas
app.use('/api/pontos', pontosRoutes);

// Rota de status
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'API funcionando', 
    database: mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado',
    timestamp: new Date() 
  });
});

// Conexão com MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ponto-turistico';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Conectado ao MongoDB com sucesso!');
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`\n=== SERVIDOR OPERACIONAL ===`);
      console.log(`🔗 URL Local: http://localhost:${PORT}`);
      console.log(`📌 Endpoint de pontos: http://localhost:${PORT}/api/pontos`);
      console.log(`📌 Endpoint de status: http://localhost:${PORT}/api/status`);
      console.log(`📁 Uploads: http://localhost:${PORT}/uploads/nome-da-imagem.jpg\n`);
    });
  })
  .catch(err => {
    console.error('\n❌ ERRO DE CONEXÃO:', err.message);
    console.log('\n👉 SOLUÇÃO:');
    console.log('1. Verifique se o MongoDB está rodando (mongod)');
    console.log('2. Confira a string de conexão no arquivo .env');
    console.log('3. Teste a conexão com o MongoDB Compass ou Studio 3T\n');
    process.exit(1);
  });

// Criar pasta de uploads se não existir
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`📁 Pasta de uploads criada em: ${uploadsDir}`);
}