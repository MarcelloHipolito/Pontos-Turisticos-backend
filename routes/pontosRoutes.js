const express = require('express');
const router = express.Router();
const pontosController = require('../controllers/pontosController');
const multer = require('multer');

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Rotas
router.post('/', upload.single('foto'), pontosController.criarPonto);
router.get('/', pontosController.listarPontos);
router.put('/:id/foto', upload.single('foto'), pontosController.atualizarFoto);

module.exports = router;