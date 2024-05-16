
const abrirMesa = document.querySelector('#abrir-mesa');
const paginaMesa = document.querySelector('#pagina-mesas');
const ventaMesa = document.querySelector('#venta-mesa');
const buttonAbrirMesa = document.querySelector('#button-abrir-mesa');

const mesas = document.querySelectorAll('.mesa');
const numeroMesa = document.querySelector('#numero-mesa');
let mesaSeleccionada = null;

//Mesas--------------------------------------------
const colorearBoton = function (event){

  if(mesaSeleccionada){
    mesaSeleccionada.style.backgroundColor = '';
  }

  this.style.backgroundColor = 'lightsalmon';
  mesaSeleccionada = this;
  numeroMesa.innerText = this.innerText;
}

mesas.forEach(mesa =>{
  mesa.addEventListener('click', colorearBoton);
});

//Abrir Mesa ------------------------------------------
buttonAbrirMesa.addEventListener('click', (e)=>{
  e.preventDefault();
  abrirMesa.style.display = 'none';
  ventaMesa.style.display = 'flex';
});

//Buscar Procto------------------------------------------
let productos = [];



async function consumirDb(){
  try {
    const db = await fetch('./../db/productos.json');
    const data = await db.json();
    productos = data.productos;
  } catch (error) {
    console.error(error);
  }
}

consumirDb();
const buscar = document.querySelector("#buscar-producto");

const contenedorProductos= document.querySelector("#contenedor-productos");
const fragmento= document.createDocumentFragment();


buscar.addEventListener("keyup", () => {
  const valorBuscado = buscar.value.toLowerCase();
  const resultados =  productos.filter( producto => producto.nombre.toLowerCase().includes(valorBuscado) );
  limpiarProductos();
  mostrarProductos(resultados);
});

function mostrarProductos(productos){
  
  productos.forEach( producto =>{
    let li= document.createElement("li");
    li.className= "tarjeta";
    
    let nombre= document.createElement("p");
    nombre.textContent= producto.nombre;
    li.appendChild(nombre);
    
    let precio= document.createElement("p");
    precio.textContent= producto.precio;
    li.appendChild(precio);

    let imagen= document.createElement("img");
    imagen.src= producto.img;
    imagen.className= "imagen-tarjeta";
    li.appendChild(imagen);

    fragmento.appendChild(li);
  });
  contenedorProductos.appendChild(fragmento);
}

function limpiarProductos(){
  while(contenedorProductos.firstChild){
    contenedorProductos.removeChild(contenedorProductos.firstChild);
  }
}

/*
<ul class="productos-tarjetas">
  <li class="tarjeta" data-nombre="CrossaintJQ" data-cantidad="1" data-precio="1000">
    <p>CrossaintJQ</p>
    <h3>$1000</h3>
    <img class="imagen-tarjeta" src="./../img/petr-magera-Dh9c2VBi8S0-unsplash.jpg" alt="">
  </li>
</ul>
*/