
const { conn } = require('../db/dbConnection');
const jwt = require('jsonwebtoken');
const crypt = require('bcrypt');
const jwtconfig = require('./../config/jwtconfig');

module.exports = {

  crearRegistro: async (req, res) => {
    const { email, password } = req.body;
    try {
      const passToString = password.toString();
      const emailToString = email.toString();
      const encriptado = crypt.hashSync(passToString, 8);

      const [creado] = await conn.query(
        `INSERT INTO usuarios (correo,clave) VALUES (?,?)`,
        [emailToString, encriptado]
      );

      res.redirect('/');
    } catch (error) {
      console.error("Error al crear registro:", error);
    }
  },

  login: async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('Email y contraseña son requeridos');
    }

    try {
      const [[valido]] = await conn.query(`SELECT * FROM usuarios WHERE correo = ?`, email);
      if (!valido) {
        res.status(404).send('Usuario no encontrado');
      }
    
      const isPasswordValid = crypt.compareSync(password, valido.clave);
      if (!isPasswordValid) {//Si la contraseña no coincide
        return res.status(401).send({ auth: false, token: null });
      }

      const userId = valido.id_usuario
      const token = jwt.sign(
        { userId: userId },
        jwtconfig.secretKey,
        { expiresIn: jwtconfig.tokenExpiresIn }
      );
      res.status(201).send({ auth: true, token });

    } catch (error) {
      console.error("Error al iniciar sesion:", error);
      res.status(500).send("Error al iniciar sesion");
    }
  },

  logout: async (req, res) => {

  }

}