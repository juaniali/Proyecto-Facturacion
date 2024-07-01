
const { conn } = require('../db/dbConnection');
const jwt = require('jsonwebtoken');
const crypt = require('bcryptjs');
const jwtconfig = require('./../config/jwtconfig');

module.exports = {

  crearRegistro: async(req,res)=>{
    const {email, password} = req.body;
    const encriptado = await crypt.hash(password, 8);
    const [creado] = await conn.query(
      `INSERT INTO usuarios (email,password) VALUES (?,?)`, 
      [user,encriptado]
    );
    res.redirect('/login.html');
  },

  login: async(req,res)=>{
    const {email, password} = req.body;
    const [[valido]] = await conn.query(`SELECT * FROM usuarios WHERE email = ?`, email);
    
    if(valido === undefined){
      res.status(404).send('Usuario no encontrado');

    }else if(  !(await crypt.compare( password, valido.password))  ){//Si la contraseña no coincide
      res.status(404).send( {auth:false, token:null} );

    }else{
      const token = jwt.sign( 
        {id:valido.id}, 
        jwtconfig.secrectKey, 
        {expiresIn: jwtconfig.tokenExpiresIn} 
      );
      res.status(201).send( {auth:true, token} );
    }
  },

  logout: async(req,res)=>{
    
  }

}