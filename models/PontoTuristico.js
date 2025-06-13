const mongoose = require('mongoose');

const pontoTuristicoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  localizacao: {
    type: String,
    required: true
  },
  foto: {
    type: String,
    default: ''
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PontoTuristico', pontoTuristicoSchema);