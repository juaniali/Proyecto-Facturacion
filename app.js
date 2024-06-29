const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000 || 8080 || process.env.PORT;

const rutas = require('./src/routes/productRoutes');

const override = require('method-override'); // Permite sobreescribir el method 'POST' de los forms

app.set('view engine','ejs');
app.set( 'views',(__dirname+ '/src/views'));

//Middlewares se ejecuta entre la llegada del pedido y la salida de la respuesta
app.use( cors() );
app.use( express.static(__dirname+ `/public`));     //permite usar los archivos dentro de la carpeta public
app.use( express.urlencoded({extended: true}) );    //permite convertir informacion urlencoded de los formularios a un objeto de Js
app.use( override('_method') );    //permite configurar el paquete override

//app.use( '/' ,rutas);  //utiliza el paquete local de mainRoutes como objeto para utilizarlas

app.get("/", (req,res) =>{
  res.sendFile(__dirname+'/index.html');
})

//ESTE MIDDLEWARE VA AL FINAL!
app.use( (req, res, next)=>{ //pagina de error 404 personalizada
  res.status(404).send(`
    <h1 style="color:red">Error 404</h1>
    <a href="/"> <-- Volver</a>
  `);
});

//Escuchar servidor
app.listen( port, ()=>{
  console.log(`Servidor en el puerto: ${port}`);
});