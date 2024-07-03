const express = require('express');
const router = express.Router();
const controladores = require('../controllers/productController');
const auth = require('./../config/auth');
const multer = require ("multer");
const storage = multer.diskStorage({
    destination: (req, file , cb) =>{cb(null, "pubic/img/ ")},
    filename:(req, file, cb) =>{console.log(file),cb(null, Date.now() + "_" + file.originalname)
    }
})
const uploadFile = multer({storage})


router.get('/pages/carga-datos', auth, controladores.getListado);
router.post('/pages/carga-datos',controladores.crearRegistro);
router.get('/modificar/:num', controladores.getModificar);
router.patch('/modificar', controladores.actualizar);
router.delete('/pages/carga-datos', controladores.delete);
router.get('/', controladores.index);

module.exports = router;

