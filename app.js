const express = require('express');
const cors = require('cors');
const override = require('method-override'); // Permite sobreescribir el method 'POST' de los forms

const app = express();
const port = process.env.PORT || 3000 || 8080;
//const auth = require('./src/config/auth');//------------incorporar en las rutas app.use('/pages',auth, mainRoutes);

  /*ESTO VA EN DONDE SE APLIQUE LA AUTENTICACIION
    const token = localStorage.getItem('jwt-token');
    const res = fetch('',{
      method:'GET',
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
    });
    if(!res.ok){
      window.location.href="";
      throw Error("Problemas en login");
    }
  */



const rutas = require('./src/routes/productRoutes');
const rutasLogin = require('./src/routes/loginRoutes');
const rutasFactura = require('./src/routes/facturaRoutes');

app.set('view engine', 'ejs');
app.set('views', (__dirname + '/src/views'));

// Middlewares se ejecutan entre la llegada del pedido y la salida de la respuesta
app.use(cors());
app.use(express.static(__dirname + '/public')); // Permite usar los archivos dentro de la carpeta public
app.use(express.urlencoded({ extended: true })); // Permite convertir informacion urlencoded de los formularios a un objeto de Js
app.use(express.json());//es necesario para el fetch del login
app.use(override('_method')); // Permite configurar el paquete override

app.use('/login', rutasLogin);
app.use('/factura', rutasFactura);
app.use('/', rutas); // Utiliza el paquete local de mainRoutes como objeto para utilizarlas


/* app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
}); */

// ESTE MIDDLEWARE VA AL FINAL!
/*app.use((req, res, next) => { // Página de error 404 personalizada
  res.status(404).send(`
    <h1 style="color:red">Error 404</h1>
    <a href="/"> <-- Volver</a>
  `);
});*/

// Escuchar servidor
app.listen(port, () => {
  console.log(`Servidor en el puerto: ${port}`);
});
