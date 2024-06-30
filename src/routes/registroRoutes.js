const express = require('express');
const router = express.Router();
const controlador = require('./../controllers/regisroController');

router.get("/registrarse", controlador.getRegistros);

router.post("/pages/registrarse", controlador.postRegistro);

router.delete("/pages/registrarse", controlador.deleteRegistro);

module.exports = router;