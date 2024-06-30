const express = require('express');
const router = express.Router();
const controladores = require('../controllers/productController');

router.get('/pages/carga-datos', controladores.getListado);
router.post('/pages/carga-datos', controladores.crearRegistro);
router.get('/modificar/:num', controladores.getModificar);
router.patch('/modificar', controladores.actualizar);
router.delete('/pages/carga-datos', controladores.delete);
router.get('/', controladores.index);

module.exports = router;

