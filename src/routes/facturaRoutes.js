const express = require('express');
const router = express.Router();
const controladores = require('./../controllers/facturaController');
const auth = require('./../config/auth');

// get
router.get('/pages/balance', controladores.getFacturas);
router.get('/listado', controladores.getDetallesByIdFactura);
router.get('/', controladores.index);

// cargar
router.post('/cargar', controladores.crearFactura);
router.post('/cargar', controladores.crearDetalle);

// modificar
router.patch('/', controladores.actualizarFactura);
router.patch('/', controladores.actualizarDetalle);

// borrar
router.delete('/', controladores.deleteFactura);
router.delete('/', controladores.deleteDetalle);

module.exports = router;