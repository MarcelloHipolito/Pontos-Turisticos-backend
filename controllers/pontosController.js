const PontoTuristico = require('../models/PontoTuristico');
const fs = require('fs');
const path = require('path');

// Criar novo ponto turístico
exports.criarPonto = async (req, res) => {
  try {
    const { nome, descricao, localizacao } = req.body;
    let foto = '';
    
    if (req.file) {
      foto = `/uploads/${req.file.filename}`;
    }

    const novoPonto = new PontoTuristico({
      nome,
      descricao,
      localizacao,
      foto
    });

    await novoPonto.save();
    res.status(201).json(novoPonto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Listar todos os pontos
exports.listarPontos = async (req, res) => {
  try {
    const pontos = await PontoTuristico.find().sort({ criadoEm: -1 });
    res.json(pontos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar foto do ponto
exports.atualizarFoto = async (req, res) => {
  try {
    const ponto = await PontoTuristico.findById(req.params.id);
    
    if (!ponto) {
      return res.status(404).json({ message: 'Ponto turístico não encontrado' });
    }

    if (req.file) {
      // Remove a foto antiga se existir
      if (ponto.foto) {
        const fotoPath = path.join(__dirname, '../public', ponto.foto);
        if (fs.existsSync(fotoPath)) {
          fs.unlinkSync(fotoPath);
        }
      }
      
      ponto.foto = `/uploads/${req.file.filename}`;
      await ponto.save();
    }

    res.json(ponto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};