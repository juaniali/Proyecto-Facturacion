const express = require('express');
const router = express.Router();
const controladores = require('./../controllers/facturaController');
const auth = require('./../config/auth');

router.get('/listado', controladores.getFacturas);
router.post('/cargar',controladores.crearFactura);

module.exports = router;