const express = require('express');
const router = express.Router();
const controladores = require('./../controllers/facturaController');
const auth = require('./../config/auth');

// get
router.get('/listado', controladores.getFacturas);
router.get('/detalles', controladores.getDetallesByIdFactura);
router.get('/', controladores.index);

// cargar
router.post('/factura', controladores.crearFactura);
router.post('/detalle', controladores.crearDetalle);

// modificar
//router.patch('/', controladores.actualizarFactura);
//router.patch('/', controladores.actualizarDetalle);

// borrar
//router.delete('/', controladores.deleteFactura);
//router.delete('/', controladores.deleteDetalle);

module.exports = router;