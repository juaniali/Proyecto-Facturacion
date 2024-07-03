
const { conn } = require('../db/dbConnection');
const jwt = require('jsonwebtoken');
//const crypt = require('bcryptjs');
const crypt = require('bcrypt');
const jwtconfig = require('./../config/jwtconfig');

module.exports = {

  crearRegistro: async(req,res)=>{
    const {email, password} = req.body;
    //const salt = crypt.genSaltSync(8);
    try{
      const passToString = password.toString();
      const emailToString = email.toString();
      const encriptado = crypt.hashSync(passToString, 8);
  
      const [creado] = await conn.query(
        `INSERT INTO usuarios (email,password) VALUES (?,?)`, 
        [emailToString,encriptado]
      );

      res.redirect('/');
    }catch(error){
      console.error("Error al crear registro:",error);
    }
  },

  login: async(req,res)=>{
    
    const {email, password} = req.body;
    const  passToString = password.toString();
    try{
      const [[valido]] = await conn.query(`SELECT * FROM usuarios WHERE email = ?`, email);
    
      if(valido === undefined){
        res.status(404).send('Usuario no encontrado');
  
      }else if(  !(crypt.compareSync( passToString, valido.password))  ){//Si la contraseña no coincide
        res.status(401).send( {auth:false, token:null} );
  
      }else{//Configuracion del token
        const token = jwt.sign( 
          {id:valido.id}, 
          jwtconfig.secretKey, 
          {expiresIn: jwtconfig.tokenExpiresIn} 
        );
        res.status(201).send( {auth:true, token} );
      }

    }catch(error){
      console.error("Error al iniciar sesion:",error);
      res.status(500).send("Error al iniciar sesion");
    }
  },

  logout: async(req,res)=>{
    
  }

}